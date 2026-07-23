# Worked Examples

## Example 1 — Evaluate an expression tree

An expression tree stores operators in internal nodes and operands in leaves.

```python
from dataclasses import dataclass

@dataclass
class ExprNode:
    value: str
    left: "ExprNode | None" = None
    right: "ExprNode | None" = None
```

For binary operators, both subtrees must be evaluated before the operator is applied. That is postorder reasoning.

```python
def evaluate(root: ExprNode) -> float:
    if root.left is None and root.right is None:
        return float(root.value)

    assert root.left is not None and root.right is not None
    left_value = evaluate(root.left)
    right_value = evaluate(root.right)

    if root.value == "+":
        return left_value + right_value
    if root.value == "-":
        return left_value - right_value
    if root.value == "*":
        return left_value * right_value
    if root.value == "/":
        return left_value / right_value

    raise ValueError(f"unknown operator: {root.value}")
```

### Why it works

Each leaf returns its numeric value. Assuming the recursive calls correctly evaluate both operand subtrees, applying the current operator yields the value of the complete expression rooted at the current node.

### Cost

Every node is visited once: `O(n)` time. The call stack uses `O(h)` space.

## Example 2 — Validate a binary search tree

Checking only each node against its immediate children is insufficient. A node deep in the right subtree must still exceed the root.

Correct validation carries the allowed key interval downward.

```python
def is_bst(root, low=None, high=None) -> bool:
    if root is None:
        return True

    if low is not None and root.key <= low:
        return False
    if high is not None and root.key >= high:
        return False

    return (
        is_bst(root.left, low, root.key)
        and is_bst(root.right, root.key, high)
    )
```

### Invariant

Every recursive call receives bounds that describe all ancestor constraints relevant to that subtree.

### Counterexample to local checking

```text
      10
     /  \
    5    15
        /
       6
```

Node `6` is less than its parent `15`, but it is invalid because it lies in the right subtree of `10`.

## Example 3 — Range query in a BST

```python
def range_items(root, low, high, result):
    if root is None:
        return

    if low < root.key:
        range_items(root.left, low, high, result)

    if low <= root.key <= high:
        result.append((root.key, root.value))

    if root.key < high:
        range_items(root.right, low, high, result)
```

The algorithm uses ordering to skip subtrees whose keys cannot fall inside the interval.

Its cost is often written `O(h + k)` for a balanced tree, where `k` is the number of reported entries, though worst-case shape can increase the path component.

## Example 4 — Repair an AVL insertion

Insert keys:

```text
30, 10, 20
```

After inserting `20`:

```text
    30
   /
  10
    \
     20
```

Node `30` is left-heavy, but its left child is right-heavy. This is a left-right case.

Repair:

1. rotate left at `10`;
2. rotate right at `30`.

Result:

```text
    20
   /  \
  10   30
```

The inorder sequence remains `10, 20, 30`, and all balance factors become zero.

## Example 5 — Merge sorted streams with a heap

Suppose several sorted lists must be merged without concatenating and sorting all values again.

```python
import heapq

def merge_sorted(lists: list[list[int]]) -> list[int]:
    heap: list[tuple[int, int, int]] = []
    result: list[int] = []

    for list_index, values in enumerate(lists):
        if values:
            heapq.heappush(heap, (values[0], list_index, 0))

    while heap:
        value, list_index, item_index = heapq.heappop(heap)
        result.append(value)

        next_index = item_index + 1
        if next_index < len(lists[list_index]):
            next_value = lists[list_index][next_index]
            heapq.heappush(heap, (next_value, list_index, next_index))

    return result
```

### State meaning

The heap contains the smallest not-yet-output candidate from each non-exhausted list.

### Correctness idea

Because every source list is sorted, any later element from a list is no smaller than its current candidate. Therefore the smallest heap entry is the smallest remaining value globally.

### Cost

For `N` total values across `k` lists:

```text
time: O(N log k)
auxiliary heap space: O(k)
```

## Example 6 — Top `k` largest values with a min-heap

Maintain a min-heap containing the largest `k` values seen so far.

```python
import heapq

def top_k(values: list[int], k: int) -> list[int]:
    if k < 0:
        raise ValueError("k must be non-negative")

    heap: list[int] = []

    for value in values:
        if len(heap) < k:
            heapq.heappush(heap, value)
        elif k > 0 and value > heap[0]:
            heapq.heapreplace(heap, value)

    return sorted(heap, reverse=True)
```

### Invariant

After processing any prefix, the heap contains the `k` largest values from that prefix, or all values if fewer than `k` have been seen.

### Cost

```text
time: O(n log k)
space: O(k)
```

This is preferable to sorting all `n` values when `k` is small.

## Integrated analysis questions

For each example, identify:

1. the representation invariant;
2. the traversal or path followed;
3. the termination argument;
4. the height or width that controls auxiliary memory;
5. the exact postcondition;
6. whether the algorithm mutates its input;
7. the dominant time cost;
8. which assumption would make the algorithm invalid.
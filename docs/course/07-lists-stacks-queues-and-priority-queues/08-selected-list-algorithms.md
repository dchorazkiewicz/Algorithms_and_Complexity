# Selected List Algorithms

## Algorithms must respect representation

A linked list is not an array with different syntax. Efficient linked-list algorithms use:

- node identity rather than integer position;
- maintained traversal references rather than repeated indexed lookup;
- local relinking rather than shifting elements;
- representation invariants to explain why nodes are not lost;
- explicit mutation contracts when input nodes are reused.

This chapter develops several recurring linked-list techniques and makes their correctness and complexity arguments explicit.

## 1. Find the middle with two speeds

Given a singly linked list, return its middle node.

For even length, this implementation returns the **second** middle.

```python
def middle(head: Node[T] | None) -> Node[T] | None:
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

    return slow
```

### Contract

```text
precondition: head represents a finite acyclic singly linked list
postcondition:
    empty list       → return None
    odd length 2k+1  → return node k from zero-based order
    even length 2k   → return node k, the second middle
side effects: none
```

### Why two speeds work

After `t` loop iterations:

```text
slow has advanced t links
fast has advanced 2t links
```

When `fast` reaches the end or cannot make another two-link step, `slow` has progressed approximately half as far.

Trace for five nodes:

```text
A → B → C → D → E → None

start: slow=A, fast=A
1:     slow=B, fast=C
2:     slow=C, fast=E
stop because E.next is None
return C
```

Trace for four nodes:

```text
A → B → C → D → None

start: slow=A, fast=A
1:     slow=B, fast=C
2:     slow=C, fast=None
return C
```

Hence this contract chooses the second middle for even length.

### Complexity

```text
time: O(n)
auxiliary space: O(1)
```

No length pass and no indexed access are required.

---

## 2. Detect a cycle with Floyd's algorithm

A malformed or intentionally circular structure may never reach `None`.

Floyd's tortoise-and-hare method uses two references moving at different speeds:

```python
def has_cycle(head: Node[T] | None) -> bool:
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

        if slow is fast:
            return True

    return False
```

## Why identity comparison is required

The question is whether two traversals reached the **same node object**, not whether two nodes store equal values.

This is wrong:

```python
if slow.value == fast.value:
    return True
```

A perfectly acyclic list may contain repeated values.

The correct comparison is:

```python
slow is fast
```

## Correctness intuition for cycle detection

If the list is acyclic, `fast` eventually reaches `None`.

If a cycle exists, both references eventually enter the cycle. Once both are inside, consider their relative position around a cycle of length `c`.

Per iteration:

```text
slow advances 1
fast advances 2
```

so `fast` gains one position on `slow` modulo `c`. There are only `c` possible relative offsets. Therefore the relative offset eventually becomes zero and the references meet.

### Complexity

```text
time: O(n)
auxiliary space: O(1)
```

A visited-node set could also detect a cycle in `O(n)` time but would require `O(n)` auxiliary space.

## Finding the cycle entry

After Floyd's algorithm finds a meeting point inside the cycle, the cycle entry can be found by placing one pointer back at `head` and moving both one step at a time.

```python
def cycle_entry(head: Node[T] | None) -> Node[T] | None:
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None

    slow = head
    while slow is not fast:
        assert slow is not None
        assert fast is not None
        slow = slow.next
        fast = fast.next

    return slow
```

The result is the first node on the cycle reachable from the head.

The algebra behind this property is a useful exercise in modular distance reasoning; the important operational point is that no additional set of visited nodes is required.

---

## 3. Reverse a singly linked list

Reversal is the canonical local-relinking algorithm:

```python
def reverse(head: Node[T] | None) -> Node[T] | None:
    previous = None
    current = head

    while current is not None:
        successor = current.next
        current.next = previous
        previous = current
        current = successor

    return previous
```

### Mutation contract

```text
precondition: head represents a finite acyclic list
postcondition:
    returns a head containing exactly the original nodes in reverse order;
    every original next relation is reversed;
    no new data nodes are allocated
side effects: mutates next links of all input nodes
```

### Invariant

At every loop boundary:

- `previous` heads the reversed prefix;
- `current` heads the untouched suffix;
- the two regions contain exactly the original nodes;
- no node is lost or duplicated.

The saved `successor` keeps the untouched region reachable before the current node's link is reversed.

### Complexity

```text
time: O(n)
auxiliary space: O(1)
```

---

## 4. Merge two sorted linked lists

Suppose both input lists are sorted in nondecreasing order.

A mutating merge can reuse their nodes:

```python
def merge_sorted(
    first: Node[int] | None,
    second: Node[int] | None,
) -> Node[int] | None:
    sentinel = Node(0)
    tail = sentinel

    while first is not None and second is not None:
        if first.value <= second.value:
            chosen = first
            first = first.next
        else:
            chosen = second
            second = second.next

        tail.next = chosen
        tail = chosen

    tail.next = first if first is not None else second
    return sentinel.next
```

## Contract

```text
preconditions:
    first and second are finite acyclic lists;
    both are sorted in nondecreasing order;
    the two lists do not share data nodes
postcondition:
    returned list is sorted;
    it contains exactly all original nodes from both inputs;
    equal values from first are chosen before equal values from second;
side effects:
    rewires input nodes; callers must not expect original list partitioning to remain
```

The non-sharing precondition avoids subtle corruption when the two input chains overlap structurally.

## Merge invariant

At the start of each iteration:

- the chain after `sentinel` is sorted;
- it contains exactly the nodes already consumed from the two inputs;
- `tail` is its final node;
- `first` and `second` head the two unconsumed sorted suffixes;
- every consumed value is no greater than every value still eligible to be selected before it.

Choosing the smaller head preserves sortedness.

## Why the remainder can be attached at once

Once one input is empty, the other input is already sorted and every node remaining there is at least as large as the last selected node.

Therefore:

```python
tail.next = first if first is not None else second
```

can attach the whole remaining suffix without further comparisons.

## Complexity

If the input lengths are `n` and `m`:

```text
time: O(n + m)
auxiliary space: O(1) excluding the sentinel node
```

Each data node is consumed once.

## Stable merge

The comparison:

```python
if first.value <= second.value:
```

chooses from `first` when values tie. If each input's internal order is stable, this preserves a consistent left-before-right tie rule.

Changing `<=` to `<` changes tie behaviour.

---

## 5. Remove duplicates from a sorted list

Sorted order makes equal values adjacent.

```python
def remove_sorted_duplicates(head: Node[T] | None) -> Node[T] | None:
    current = head

    while current is not None and current.next is not None:
        if current.value == current.next.value:
            duplicate = current.next
            current.next = duplicate.next
            duplicate.next = None
        else:
            current = current.next

    return head
```

## Why the sorted precondition matters

For:

```text
1 → 1 → 2 → 2 → 2 → 5
```

all duplicates are adjacent, so comparing each node with its successor is sufficient.

For an unsorted list:

```text
1 → 2 → 1
```

this algorithm would leave both `1` values.

Thus the sorted-input assumption is part of correctness, not a performance detail.

## Invariant

Before each iteration:

- all nodes strictly before `current` contain one representative of each encountered run;
- no adjacent duplicates remain in the processed prefix;
- `current` is the final retained node of that processed prefix.

When a duplicate successor is removed, `current` must not advance because the new successor may be another equal value.

## Complexity

```text
time: O(n)
auxiliary space: O(1)
```

---

## 6. Split a list for merge sort

Two-speed traversal can split a list near its middle:

```python
def split_half(head: Node[T]) -> tuple[Node[T], Node[T] | None]:
    slow = head
    fast = head.next

    while fast is not None and fast.next is not None:
        slow = slow.next
        assert slow is not None
        fast = fast.next.next

    second = slow.next
    slow.next = None
    return head, second
```

The operation mutates one link to produce two independent chains.

This technique supports linked-list merge sort:

1. split near the middle;
2. recursively sort each half;
3. merge the two sorted chains.

Because merging linked lists is linear and does not require shifting, merge sort fits linked representation naturally.

## Linked-list merge sort recurrence

For balanced splitting:

\[
T(n) = 2T(n/2) + O(n),
\]

so:

\[
T(n) = O(n \log n).
\]

The recursive call stack uses `O(log n)` auxiliary depth for balanced splits.

Unlike array merge sort, a node-relinking implementation does not need an auxiliary array containing all `n` elements.

---

## 7. Accidental quadratic behaviour from indexed thinking

This code looks like one loop:

```python
for index in range(n):
    node = node_at(head, index)
    process(node.value)
```

But if `node_at` starts at `head`, then the work is:

```text
0 + 1 + 2 + ... + (n - 1)
```

which is:

\[
\Theta(n^2).
\]

Correct linked traversal maintains state:

```python
def process_all(head: Node[T] | None) -> None:
    current = head
    while current is not None:
        process(current.value)
        current = current.next
```

This is `O(n)`.

The general lesson is:

> Never assume a linked list has array-style direct access just because an interface can be written with integer positions.

---

## 8. Josephus-style circular elimination

Circular lists naturally represent repeated rotation.

Suppose people stand in a circle and every `k`-th remaining person is removed until one remains.

With a circular singly linked list and a pointer to the predecessor of the next candidate, removing a known current node requires only local relinking.

Conceptual step:

```text
previous → current → successor
```

remove `current`:

```text
previous.next = successor
current = successor
```

The traversal does not restart at the head after wraparound because circularity represents wraparound directly.

## Termination

A Josephus process should not attempt to terminate by reaching `None`.

Useful termination measures include:

```text
remaining node count decreases by one after every elimination
```

or, in a circular singly linked representation:

```text
stop when current.next is current
```

for a one-node ring.

## Complexity depends on how counting is implemented

If the algorithm advances `k - 1` links for every one of `n - 1` removals, a direct bound is:

```text
O(nk)
```

When `k` is treated as a constant, this becomes `O(n)`.

The structural deletion remains `O(1)` once the victim's predecessor is known. Counting steps dominate.

---

## Representation-aware design checklist

For a linked-list algorithm, ask:

1. Which nodes or regions constitute the current state?
2. Which old links must be saved before mutation?
3. Is node identity important, or only stored value?
4. Does the algorithm reuse input nodes or allocate new ones?
5. Are the input lists allowed to share nodes?
6. Does the algorithm require sorted input, acyclicity, or another structural precondition?
7. Can traversal references be maintained instead of recomputing positions?
8. What measure proves termination if there is a cycle in the representation?
9. Does the complexity include the cost of locating the update position?

## Common failures

- comparing node values instead of node identity in cycle detection;
- losing the remainder of a list by overwriting `next` before saving it;
- failing to state whether an even-length middle means the first or second middle;
- merging by relinking nodes without stating that the inputs are mutated;
- merging structurally overlapping lists without considering aliasing;
- removing only one duplicate from a run because `current` advances too early;
- claiming linked-list index access is `O(1)`;
- using `None` as a circular-list termination condition;
- describing `O(1)` deletion without counting traversal needed to find the victim;
- forgetting that recursive merge sort uses call-stack space even when merge itself is in-place by relinking.

## What you must be able to explain

- Why do two-speed algorithms work without integer positions?
- Why does Floyd cycle detection compare identity?
- Why must two different speeds meet inside a finite cycle?
- Which invariant proves reversal correct?
- Which mutation contract does sorted merge require?
- Why does the merge invariant guarantee sorted output?
- Why is sortedness a required precondition for adjacent duplicate removal?
- How does linked-list merge sort exploit sequential access and relinking?
- How can repeated indexed lookup accidentally create quadratic work?
- Why does a Josephus traversal need a different termination argument from an ordinary finite list?

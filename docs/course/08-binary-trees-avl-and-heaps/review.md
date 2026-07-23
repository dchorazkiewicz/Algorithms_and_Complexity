# Module 08 Review

## Core vocabulary

Explain each term in your own words:

- rooted tree;
- root;
- parent and child;
- sibling;
- leaf and internal node;
- ancestor and descendant;
- path;
- depth;
- height;
- subtree;
- binary tree;
- full, complete, and perfect binary tree;
- traversal;
- binary search tree;
- dictionary;
- balance factor;
- rotation;
- AVL tree;
- heap;
- heap order;
- sift-up and sift-down.

## Conceptual questions

1. Why is a subtree itself a complete problem instance for a recursive function?
2. Why can two trees with equal size have different operation costs?
3. Why is inorder traversal not automatically sorted for an arbitrary binary tree?
4. Which invariant allows BST search to discard one subtree after every comparison?
5. Why does an ordinary BST provide `O(h)` rather than unconditional `O(log n)` operations?
6. Why can a dictionary be implemented by either a tree or a hash table?
7. Which ordered operations make a balanced tree attractive for dictionaries?
8. Why must AVL rotations preserve inorder order?
9. Why can a heap expose the minimum quickly but not search for an arbitrary key quickly?
10. Why is a complete shape important for array-based heaps?

## Tracing tasks

### Traversals

For the tree:

```text
        8
       / \
      3   12
     / \  / \
    1  6 10 14
      / \
     4   7
```

write:

- preorder;
- inorder;
- postorder;
- level order.

Then state the maximum recursion depth used by recursive inorder traversal.

### BST insertion

Insert in order:

```text
40, 20, 60, 10, 30, 50, 70, 25
```

Draw the tree after every insertion. For the search for `25`, list the comparison path.

### BST deletion

From the completed tree above, delete:

1. a leaf;
2. a node with one child after a suitable preceding deletion;
3. a node with two children.

For the two-child case, identify the inorder successor and explain why replacing with it preserves order.

### AVL rotations

Determine the required repair for each insertion sequence:

```text
30, 20, 10
10, 20, 30
30, 10, 20
10, 30, 20
```

Name each case and draw the final tree.

### Heap operations

Starting from an empty min-heap, insert:

```text
7, 3, 9, 1, 6, 2
```

Record the array after every insertion. Then remove the minimum twice and trace each sift-down.

## Debugging tasks

### Local-only BST validation

```python
def valid(node):
    if node is None:
        return True
    if node.left and node.left.key >= node.key:
        return False
    if node.right and node.right.key <= node.key:
        return False
    return valid(node.left) and valid(node.right)
```

Construct a tree accepted by this function that is not a valid BST. Explain which ancestor constraint is missing.

### Lost subtree during rotation

```python
def rotate_right(z):
    y = z.left
    y.right = z
    z.left = None
    return y
```

Identify the subtree that can be lost and write the corrected link updates.

### Wrong heap child

```python
if left < len(heap) and heap[left] < heap[index]:
    swap(index, left)
```

Explain why considering only the left child may leave the heap invalid.

### Incorrect complexity claim

A student states:

> Binary search trees support search in `O(log n)` because every comparison chooses left or right.

Give a counterexample and replace the claim with a correct height-dependent statement.

## Design problems

### Problem 1 — Tree statistics

Design one postorder traversal that computes, in a single pass:

- size;
- height;
- number of leaves;
- whether the tree is height-balanced.

State the returned record and explain why recomputing height separately at every node would be inefficient.

### Problem 2 — Ordered dictionary

Design a BST-based dictionary supporting:

- `put(key, value)`;
- `get(key)`;
- `remove(key)`;
- `items_between(low, high)`.

Specify duplicate-key behaviour, failure behaviour, and the key-ordering requirement.

### Problem 3 — Lowest common ancestor in a BST

Given two existing keys, find their lowest common ancestor without searching both root-to-key paths separately. Use the BST invariant to decide whether both keys lie left, both lie right, or diverge at the current node.

Analyse the cost in terms of height.

### Problem 4 — AVL insertion audit

Implement insertion with stored heights. For every line that changes a child reference, state:

- which invariant may have changed;
- when height must be refreshed;
- which rotation cases may result.

### Problem 5 — Priority scheduler

Design a stable priority queue for jobs with:

- numerical priority;
- submission order;
- payload.

Explain the tuple ordering, empty-queue behaviour, and complexity of insertion and extraction.

### Problem 6 — Compare structures

For each workload, choose an ordinary BST, AVL tree, min-heap, or hash dictionary and justify the choice:

1. repeated extraction of the smallest deadline;
2. frequent range queries by key;
3. equality lookup with no ordering requirement;
4. mostly static ordered data built once from sorted keys;
5. a teaching implementation where rotation mechanics must be visible.

## Mastery checklist

You are ready to continue when you can:

- use tree terminology consistently;
- distinguish size, depth, and height;
- choose linked or array representation from structural requirements;
- trace four standard traversals;
- prove inorder sorting from the BST invariant;
- implement and justify BST search, insertion, and deletion;
- explain a tree-based dictionary contract;
- show how degeneration changes logarithmic-looking code into linear behaviour;
- compute AVL balance factors and select single or double rotations;
- preserve the middle subtree during rotations;
- implement heap insertion and removal;
- distinguish heap order from total sorted order;
- compare BSTs, AVL trees, heaps, and hash tables by operations and guarantees.

## Connection to Module 09

Trees have a unique parent path and no cycles. Graphs remove those restrictions: a vertex may have many incoming paths, edges may form cycles, and traversal must explicitly track visited vertices. Module 09 generalises several ideas from this module—linked representation, DFS, BFS-style exploration, invariants, and worklists—to graph structures.
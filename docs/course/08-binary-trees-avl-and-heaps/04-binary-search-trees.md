# Binary Search Trees

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/binary-search-tree-visualization.css">
<script defer src="/Algorithms_and_Complexity/javascripts/binary-search-tree-visualization.js"></script>

## Ordering turns structure into a search method

A plain binary tree limits each node to two children but says nothing about where values belong. A **binary search tree** adds an ordering invariant that directs search.

For every node with key `k`:

- every key in the left subtree is less than `k`;
- every key in the right subtree is greater than `k`.

This strict form assumes unique keys. If duplicates are allowed, the contract must specify whether equal keys are rejected, counted, stored in one node, or consistently sent to one side.

<div data-bst-viz></div>

## Search

```python
def bst_search(root, key):
    current = root

    while current is not None:
        if key == current.key:
            return current
        if key < current.key:
            current = current.left
        else:
            current = current.right

    return None
```

At each step, the invariant eliminates one complete subtree. If `key < current.key`, no node in the right subtree can contain the key.

### Search invariant

At the start of each iteration:

> if the target exists in the original tree, it exists in the subtree rooted at `current`.

The comparison preserves this statement while reducing the candidate subtree.

## Insertion

Insertion follows the same path as unsuccessful search and attaches a new leaf at the first empty position.

```python
from dataclasses import dataclass

@dataclass
class BSTNode:
    key: int
    value: object
    left: "BSTNode | None" = None
    right: "BSTNode | None" = None


def bst_insert(root: BSTNode | None, key: int, value: object) -> BSTNode:
    if root is None:
        return BSTNode(key, value)

    if key < root.key:
        root.left = bst_insert(root.left, key, value)
    elif key > root.key:
        root.right = bst_insert(root.right, key, value)
    else:
        root.value = value

    return root
```

This version treats an equal key as an update. The dictionary interpretation of that policy is developed in the next chapter.

## Why inorder traversal is sorted

For each node:

1. every key produced by inorder traversal of the left subtree is smaller;
2. the node key follows;
3. every key from the right subtree is larger.

Applying this argument recursively proves that inorder traversal returns all keys in ascending order.

## Finding minimum and maximum

The minimum key is the leftmost node; the maximum is the rightmost.

```python
def bst_minimum(root: BSTNode) -> BSTNode:
    current = root
    while current.left is not None:
        current = current.left
    return current
```

The operation costs `O(h)`, where `h` is tree height.

## Deletion: the difficult update

Deleting a node has three structural cases.

### No children

Remove the leaf by replacing the parent link with `None`.

### One child

Replace the node by its only child. The entire child subtree remains valid in that position.

### Two children

The node cannot simply disappear because two subtrees must remain connected. A standard method replaces its key and value with those of its inorder successor—the smallest node in the right subtree—and then deletes that successor.

```python
def bst_delete(root: BSTNode | None, key: int) -> BSTNode | None:
    if root is None:
        return None

    if key < root.key:
        root.left = bst_delete(root.left, key)
    elif key > root.key:
        root.right = bst_delete(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left

        successor = bst_minimum(root.right)
        root.key = successor.key
        root.value = successor.value
        root.right = bst_delete(root.right, successor.key)

    return root
```

The successor has no left child, so its later deletion reduces to a simpler case.

## Correctness of deletion

The reasoning must establish two properties:

- the requested key is absent afterward;
- all remaining keys still satisfy the ordering invariant.

Replacing by the successor is safe because the successor is greater than every key in the left subtree and no greater than any other key in the right subtree.

## Height controls cost

Search, insertion, minimum, maximum, and deletion all follow one or a small number of root-to-leaf paths:

```text
time: O(h)
```

If the tree is balanced, `h = O(log n)`. If keys are inserted in increasing order into an ordinary BST, the tree becomes a rightward chain and `h = n - 1`, giving `O(n)` operations.

## Common mistakes

- claiming every BST operation is always `O(log n)`;
- leaving duplicate-key policy undefined;
- changing a node key without preserving subtree ordering;
- deleting a two-child node by attaching both subtrees arbitrarily;
- forgetting to reassign `root.left` or `root.right` after recursive insertion or deletion;
- confusing the inorder successor with an arbitrary larger key.

## What you must be able to explain

- Which subtree can be excluded after a comparison?
- Why does unsuccessful search identify the insertion position?
- Why is the inorder successor safe in two-child deletion?
- Why is operation cost `O(h)` rather than automatically `O(log n)`?
- How does duplicate-key policy change the contract?

# AVL Trees and Rotations

## A search tree with a height guarantee

An **AVL tree** is a binary search tree in which every node has balance factor `-1`, `0`, or `1`.

The condition is local, but its consequence is global: tree height remains `O(log n)`. Search, insertion, and deletion therefore have logarithmic worst-case path length.

## AVL node

```python
from dataclasses import dataclass

@dataclass
class AVLNode:
    key: int
    value: object
    left: "AVLNode | None" = None
    right: "AVLNode | None" = None
    height: int = 0
```

```python
def height(node: AVLNode | None) -> int:
    return -1 if node is None else node.height


def update_height(node: AVLNode) -> None:
    node.height = 1 + max(height(node.left), height(node.right))


def balance_factor(node: AVLNode) -> int:
    return height(node.left) - height(node.right)
```

## Single rotations

### Right rotation

A left-heavy node caused by insertion into the left child’s left side requires a right rotation.

```text
        z                 y
       / \               / \
      y   D     →       A   z
     / \                   / \
    A   C                 C   D
```

```python
def rotate_right(z: AVLNode) -> AVLNode:
    y = z.left
    assert y is not None
    middle = y.right

    y.right = z
    z.left = middle

    update_height(z)
    update_height(y)
    return y
```

The middle subtree `C` must move. Every key in `C` is greater than `y` and less than `z`, so it becomes `z.left`.

### Left rotation

```python
def rotate_left(z: AVLNode) -> AVLNode:
    y = z.right
    assert y is not None
    middle = y.left

    y.left = z
    z.right = middle

    update_height(z)
    update_height(y)
    return y
```

## Double rotations

A left-heavy node may have a right-heavy left child. A single right rotation would not restore the correct shape.

The **left-right case** uses:

1. left rotation on the left child;
2. right rotation on the unbalanced node.

The **right-left case** is symmetric.

## Rebalancing function

```python
def rebalance(node: AVLNode) -> AVLNode:
    update_height(node)
    factor = balance_factor(node)

    if factor > 1:
        assert node.left is not None
        if balance_factor(node.left) < 0:
            node.left = rotate_left(node.left)
        return rotate_right(node)

    if factor < -1:
        assert node.right is not None
        if balance_factor(node.right) > 0:
            node.right = rotate_right(node.right)
        return rotate_left(node)

    return node
```

## Insertion

```python
def avl_insert(root: AVLNode | None, key: int, value: object) -> AVLNode:
    if root is None:
        return AVLNode(key, value)

    if key < root.key:
        root.left = avl_insert(root.left, key, value)
    elif key > root.key:
        root.right = avl_insert(root.right, key, value)
    else:
        root.value = value
        return root

    return rebalance(root)
```

The function first performs ordinary BST insertion. During recursion unwinding, each ancestor refreshes metadata and repairs any imbalance.

## Why rotations preserve search order

For a right rotation, keys satisfy:

```text
A < y < C < z < D
```

After changing links, inorder traversal still produces exactly this sequence. Thus the rotation changes shape but not sorted order.

## Deletion

AVL deletion begins as BST deletion. The important difference is that removing a node can reduce subtree height, potentially unbalancing several ancestors. Rebalancing must continue all the way back to the root.

Deletion is therefore more delicate than insertion, but its asymptotic cost remains `O(log n)` because only one ancestor path is revisited and each local repair is constant time.

## Why AVL height is logarithmic

The smallest AVL tree of height `h` consists of:

- one root;
- one minimum AVL subtree of height `h - 1`;
- one minimum AVL subtree of height `h - 2`.

Therefore its minimum node count satisfies a Fibonacci-like recurrence:

```text
N(h) = 1 + N(h - 1) + N(h - 2)
```

This grows exponentially with `h`, so `h` grows logarithmically with `n`.

## Cost

```text
search: O(log n)
insertion: O(log n)
deletion: O(log n)
rotation: O(1)
```

The tree stores `O(n)` nodes and one height field per node.

## Common mistakes

- selecting a rotation from the inserted key alone instead of subtree balance;
- forgetting the middle subtree;
- refreshing the new root before the lower node;
- assuming one rotation is always enough for a zig-zag case;
- rebalancing only the deleted node and not its ancestors;
- preserving balance while accidentally breaking BST order.

## What you must be able to explain

- How do the four imbalance cases differ?
- Why is a double rotation needed for a zig-zag shape?
- Why are height updates bottom-up?
- Why can a constant-time rotation support an `O(log n)` update?
- How does the AVL recurrence imply logarithmic height?
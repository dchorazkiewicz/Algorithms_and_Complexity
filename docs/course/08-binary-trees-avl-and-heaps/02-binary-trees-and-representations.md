# Binary Trees and Their Representations

## A restriction that creates useful structure

A **binary tree** is a rooted ordered tree in which every node has at most two children, called the **left child** and the **right child**.

The word “binary” does not mean that every node has exactly two children. A node may have:

- no children;
- only a left child;
- only a right child;
- both children.

The distinction between left and right matters. A tree containing only a left child is not the same ordered tree as one containing only a right child.

## Recursive definition

A binary tree is either:

1. empty; or
2. a root node together with a left binary subtree and a right binary subtree.

This definition immediately suggests recursive algorithms. To process a binary tree, process the current root and recursively process zero, one, or two smaller binary trees.

## Linked-node representation

```python
from dataclasses import dataclass
from typing import Any

@dataclass
class BinaryNode:
    value: Any
    left: "BinaryNode | None" = None
    right: "BinaryNode | None" = None
```

A variable referring to the root gives access to the whole structure.

The empty tree is represented by `None`. A leaf has both child references equal to `None`.

### Representation invariant

For an ordinary binary tree:

- each child reference is either `None` or points to a valid node;
- following child references never creates a cycle;
- no node is reached through two different parent paths unless the structure is deliberately a shared directed acyclic graph rather than a tree.

The final point is important. Reusing the same mutable node as the child of two parents creates sharing. The picture may still look tree-like, but recursive modification can then affect two apparent branches at once.

## Counting nodes and leaves

```python
def count_nodes(root: BinaryNode | None) -> int:
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)


def count_leaves(root: BinaryNode | None) -> int:
    if root is None:
        return 0
    if root.left is None and root.right is None:
        return 1
    return count_leaves(root.left) + count_leaves(root.right)
```

The two functions differ in what they contribute at the current node. Their recursive shape is otherwise the same.

## Full, complete, perfect, and balanced

These terms are not interchangeable.

A **full** binary tree is one in which every node has either zero or two children.

A **perfect** binary tree has all internal nodes with two children and all leaves at the same depth.

A **complete** binary tree fills every level except possibly the last, and fills the final level from left to right.

A **height-balanced** tree keeps the heights of relevant subtrees close according to a specified rule. AVL trees use a precise balance condition introduced later.

A tree may be full without being complete, complete without being perfect, or balanced without being complete.

## Array representation

A complete binary tree can be stored compactly in an array.

With zero-based indexing, for node index `i`:

```text
left child  = 2i + 1
right child = 2i + 2
parent      = floor((i - 1) / 2), for i > 0
```

This representation is ideal for heaps because their shape is complete.

For a sparse arbitrary binary tree, array storage may waste many positions. Linked nodes are then usually more natural.

## Choosing a representation

Use linked nodes when:

- shape is irregular;
- subtrees are inserted or removed through references;
- empty child positions are common;
- identity and local links matter.

Use an array when:

- the tree is complete or almost complete;
- parent and child positions follow arithmetic formulas;
- compact storage and locality matter;
- structural links need not be stored explicitly.

## Memory and cost

A linked node stores a value and two references. Accessing a known child is `O(1)`, but finding an arbitrary node still depends on traversal or an ordering invariant.

An array representation avoids explicit child references and benefits from contiguous storage. However, inserting into the middle of an arbitrary shape is not naturally supported.

## Mutation and ownership

```python
def mirror(root: BinaryNode | None) -> None:
    if root is None:
        return
    root.left, root.right = root.right, root.left
    mirror(root.left)
    mirror(root.right)
```

This function mutates the tree in place. Its contract must therefore state that the original structure changes.

A non-mutating version would create new nodes. That requires `O(n)` additional node storage but preserves the source tree.

## Common mistakes

- treating “binary” as “exactly two children”;
- confusing complete and full trees;
- using heap index formulas for an arbitrary sparse linked tree;
- assuming `O(1)` child access implies `O(1)` search;
- accidentally sharing one mutable subtree between several parents;
- failing to state whether an operation mutates or copies the tree.

## What you must be able to explain

- Why is a binary tree ordered?
- When is array representation compact?
- What structural property makes heap indexing possible?
- Why does direct access to a child not provide direct access by value?
- How can aliasing break the intended tree model?
# Tree Vocabulary and Recursive Structure

## Why trees need a precise language

A tree is easy to sketch and surprisingly easy to describe imprecisely. Words such as “level”, “height”, “branch”, and “child” are often used casually, but algorithms depend on exact meanings.

Consider a file system. One folder may contain another folder, which may contain files and further folders. To search, count, print, or delete such a structure, we need to know where the structure begins, how one object leads to another, and how far a node is from the beginning or from its deepest descendant.

## A rooted tree

A **rooted tree** is a finite set of nodes connected by parent–child relations with these properties:

- one node is distinguished as the **root**;
- every non-root node has exactly one parent;
- there is a unique path from the root to every node;
- no cycle exists.

The absence of cycles distinguishes a tree from a general graph. If following child references can eventually return to the same node, the structure is not a valid rooted tree.

## Core terms

For a node `v`:

- its **parent** is the node directly above it;
- its **children** are the nodes directly below it;
- nodes with the same parent are **siblings**;
- a node with no children is a **leaf**;
- a node with at least one child is an **internal node**;
- an **ancestor** lies on the path from the root to the node;
- a **descendant** lies below the node;
- the **subtree rooted at `v`** contains `v` and all its descendants.

A subtree is itself a tree. This recursive fact is the reason recursive algorithms fit tree structures so naturally.

## Paths, depth, and height

A **path** is a sequence of nodes connected by edges.

The **depth** of a node is the number of edges from the root to that node. The root has depth `0`.

The **height** of a node is the number of edges on the longest downward path from that node to a leaf. A leaf has height `0` under this convention.

The height of the tree is the height of its root.

These quantities look similar but answer different questions:

- depth asks, “How far is this node from the root?”
- height asks, “How far can we still descend from this node?”

## Recursive definition of height

For a node with children `c1, c2, ..., ck`:

```text
height(node) = 1 + max(height(c1), ..., height(ck))
```

For a leaf:

```text
height(leaf) = 0
```

For an empty tree, many implementations use `-1` so that a leaf becomes `1 + max(-1, -1) = 0`. Other texts define empty-tree height as `0` and leaf height as `1`. Either convention is valid if used consistently.

## Ordered and unordered trees

In an **ordered tree**, the order of children matters. Swapping two children changes the structure.

In an **unordered tree**, only the parent–child relation matters.

Binary trees are normally ordered: left and right are distinct positions even when one is empty.

## Size and shape

The **size** of a tree is its number of nodes. Size does not determine height.

Five nodes may form a compact tree of small height or a long chain of height four. Algorithms whose cost is proportional to height therefore depend on shape, not merely on the number of stored values.

## A Python node model

```python
from dataclasses import dataclass, field

@dataclass
class TreeNode:
    value: str
    children: list["TreeNode"] = field(default_factory=list)
```

The model stores direct child references. The complete tree is reached from the root.

```python
def tree_size(node: TreeNode | None) -> int:
    if node is None:
        return 0
    return 1 + sum(tree_size(child) for child in node.children)
```

The function works because every tree is one root plus several smaller subtrees.

## Correctness idea for recursive tree functions

A typical proof uses structural induction:

1. show the function is correct for an empty tree or leaf;
2. assume it is correct for each child subtree;
3. show the operation combines those correct subtree results into the correct result for the current node.

This is the tree analogue of proving a recursive algorithm correct on smaller problem instances.

## Common mistakes

- treating depth and height as synonyms;
- counting nodes in one definition and edges in another;
- assuming every tree is balanced;
- forgetting that left and right positions are distinct in a binary tree;
- following references without guarding against accidental cycles;
- describing a subtree as only the descendants and forgetting its root.

## What you must be able to explain

- Why is a subtree naturally recursive?
- Why can equal-size trees have different operation costs?
- What is the difference between depth and height?
- Why does a valid rooted tree have exactly one path from the root to a node?
- Which height convention is being used in an implementation?
# Module 08 — Binary Trees, AVL Trees, and Heaps

## Why this module matters

Linear structures organise data in one direction. Trees introduce hierarchy. A node may lead to several smaller structures, and the shape of those connections becomes part of the algorithm.

This matters because many problems are not naturally linear. File systems, expression syntax, decision processes, dictionaries, priority queues, and search indexes all rely on hierarchical organisation. Trees let an algorithm narrow its attention, preserve order, or expose the most important element without scanning an entire collection.

The difficulty is that performance depends on shape. Two trees may contain the same keys and obey the same ordering rule while having very different heights. One may support logarithmic search; another may behave almost like a linked list. This module therefore connects representation, invariant, traversal, balance, and complexity.

## Syllabus scope

This module develops the eighth course-content block:

> Basic tree terminology. Binary trees. Traversing a binary tree. Binary search trees. Using trees to build a dictionary. Tree balancing. AVL trees. Heaps.

## What you should be able to do after this module

After completing the module, you should be able to:

1. define root, parent, child, sibling, leaf, subtree, depth, height, and path;
2. distinguish a general tree, a binary tree, a binary search tree, an AVL tree, and a heap;
3. represent binary trees with linked nodes and with arrays where appropriate;
4. trace preorder, inorder, postorder, and level-order traversal;
5. state and preserve the binary-search-tree ordering invariant;
6. implement search, insertion, and deletion in a BST;
7. explain how a BST can implement a dictionary;
8. show how tree height controls operation cost;
9. compute balance factors and choose AVL rotations;
10. explain heap order, array indexing, sift-up, sift-down, and heap construction;
11. compare BSTs, AVL trees, and heaps by supported operations rather than by appearance alone.

## Concept map

```text
tree
├── terminology and shape
├── binary representation
├── traversal
│   ├── preorder
│   ├── inorder
│   ├── postorder
│   └── level order
├── binary search tree
│   ├── ordered search
│   ├── insertion and deletion
│   └── dictionary interface
├── balancing
│   └── AVL rotations
└── heap
    ├── complete shape
    ├── heap-order invariant
    └── priority-queue operations
```

## Learning path

1. Tree vocabulary and recursive structure.
2. Binary-tree representations.
3. Tree traversals.
4. Binary search trees.
5. Dictionaries built with BSTs.
6. Height, degeneration, and balancing.
7. AVL trees and rotations.
8. Heaps and priority queues.
9. Worked examples.
10. Review.

## Prerequisites

You should already understand recursion, explicit stacks and queues, linked structures, arrays, invariants, asymptotic complexity, and mutation through references.

!!! note "Central study question"
    For every tree algorithm, ask which structural invariant is being used, which subtree is still unresolved, what the height is, and how the operation changes the shape.
# Data Structures and Algorithms

## Representation is part of the algorithm

An algorithm is not executed on abstract values floating without structure. Its inputs, intermediate states, and outputs are represented in memory. A **data structure** is a disciplined way to organise those values together with the relationships and operations that matter.

The same problem can admit very different algorithms depending on the chosen representation. Finding an element in an unsorted array requires a scan, while a balanced search tree can use ordering to discard whole regions. Removing the most recent item is natural with a stack. Processing requests in arrival order is natural with a queue.

The central design question is therefore not only:

> Which algorithm solves the problem?

It is also:

> Which representation makes the required operations precise, efficient, and easy to prove correct?

## Abstract behaviour and concrete representation

A useful distinction is:

- an **abstract data type** specifies values and permitted operations;
- a **data structure** specifies how that abstraction is represented and maintained.

A stack, for example, promises `push`, `pop`, and `peek` with LIFO behaviour. It may be represented by an array or by a linked list. The external contract can remain the same even though memory use, resizing behaviour, and implementation details differ.

This separation helps algorithm design. First identify the operations the problem requires. Then choose a representation whose invariants make those operations efficient.

## Invariants connect structure to correctness

Every non-trivial data structure has a representation invariant.

Examples include:

- valid array positions form a consecutive index range;
- every linked-list node points to the next node or to `None`;
- in a doubly linked list, forward and backward links agree;
- in a binary search tree, every left key is smaller and every right key is larger according to the chosen ordering rule;
- in a heap, every parent has priority over its children;
- in an AVL tree, each node has balance factor `-1`, `0`, or `1`;
- in graph traversal, the visited set records states that must not be explored again.

An update is correct only when it both produces the intended abstract result and restores the invariant. This is why pointer assignments, boundary updates, rotations, and heap repairs must be studied as ordered state transformations rather than isolated lines of code.

## Operation costs depend on what is known

Complexity statements must name the available information.

For an array:

- access by a known index is `O(1)`;
- searching for an unknown value is generally `O(n)`;
- insertion in the middle may require `O(n)` shifts.

For a linked list:

- insertion after a known node is `O(1)`;
- finding that node may still require `O(n)` traversal.

For a binary search tree:

- search, insertion, and deletion take `O(h)`, where `h` is tree height;
- this becomes `O(log n)` for a balanced tree and `O(n)` for a degenerate one.

A precise analysis separates locating the update position from performing the update itself.

## The principal structures in this course

| Structure | Main organising idea | Typical strengths | Typical risks |
|---|---|---|---|
| Array | consecutive indexed positions | direct access, compact traversal | shifts, capacity, boundary errors |
| Linked list | explicit node-to-node links | local insertion and deletion | pointer mistakes, poor locality |
| Stack | last in, first out | recursion simulation, undo, parsing | underflow, wrong end used |
| Queue | first in, first out | scheduling, breadth-wise processing | inefficient front deletion in naive arrays |
| Priority queue / heap | highest-priority item at the root | fast minimum or maximum access | preserving shape and heap order |
| Binary search tree | ordered recursive partition | ordered dictionary operations | degeneration without balancing |
| AVL tree | BST plus height balance | guaranteed logarithmic height | rotation and height-update complexity |
| Graph | vertices connected by edges | arbitrary relationships and reachability | cycles, representation-dependent costs |

## A practical design procedure

When choosing a structure:

1. State the problem contract and the operations that dominate execution.
2. Decide what information is known at each operation: index, node reference, key, priority, or neighbour set.
3. Select a structure whose invariant supports those operations.
4. Analyse both successful and unsuccessful cases.
5. Include memory, update complexity, and implementation risk—not only asymptotic time.
6. Verify that every mutation restores the representation invariant.

The chapters that follow develop these structures through executable traces. Each visualisation exposes the current state, the operation being performed, the exact state change, and the associated cost.
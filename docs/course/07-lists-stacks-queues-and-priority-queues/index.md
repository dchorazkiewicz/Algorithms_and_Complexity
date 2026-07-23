# Module 07 — Lists, Stacks, Queues, and Priority Queues

## Why this module matters

Arrays make positions easy to access, but they are not the only way to represent a sequence. Many algorithms need a structure that grows and shrinks, inserts elements without shifting an entire suffix, or restricts access so that only one end or one priority rule is visible.

This module studies linear dynamic structures as abstract data types and as concrete representations. The central question is not merely how to write `append` or `pop`, but what invariant makes each structure behave correctly, which operations its interface permits, and what cost follows from the chosen representation.

## Syllabus scope

This module develops the seventh course-content block:

> Linear lists. LIFO stacks and FIFO queues, priority queues, doubly linked and circular lists, self-organising lists, skip lists, and selected list algorithms.

## What you should be able to do after this module

After completing the module, you should be able to:

1. distinguish an abstract sequence from its array-based or linked representation;
2. explain the role of nodes, links, head, tail, and sentinel nodes;
3. maintain invariants of singly, doubly, and circular linked lists;
4. compare access, search, insertion, and deletion costs;
5. explain LIFO stack and FIFO queue semantics;
6. implement stacks and queues with appropriate underlying structures;
7. explain how priority queues differ from ordinary queues;
8. describe self-organising lists and skip lists;
9. trace pointer or reference changes during list algorithms;
10. analyse time and auxiliary-space costs honestly.

## Concept map

```text
linear collection
    ├── unrestricted list
    │       ├── singly linked
    │       ├── doubly linked
    │       └── circular
    ├── restricted access
    │       ├── stack: LIFO
    │       └── queue: FIFO
    ├── ordered removal
    │       └── priority queue
    └── adaptive search
            ├── self-organising list
            └── skip list
```

## Learning path

1. Linear lists as abstract sequences.
2. Singly linked lists.
3. Doubly linked and circular lists.
4. Stacks.
5. Queues.
6. Priority queues.
7. Self-organising lists and skip lists.
8. Selected list algorithms.
9. Worked examples.
10. Module review.

## Prerequisites

You should understand records, references, mutation, aliasing, invariants, dynamic structures, and Big O notation.

!!! note "Central study question"
    For every operation, identify which links or endpoints change, which invariant must remain true, and why the advertised cost follows from the representation.

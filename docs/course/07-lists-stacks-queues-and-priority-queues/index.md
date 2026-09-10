# Module 07 — Lists, Stacks, Queues, and Priority Queues

## Why this module matters

Arrays make positions easy to access, but they are not the only way to represent a sequence. Many algorithms need a structure that grows and shrinks, inserts elements without shifting an entire suffix, removes the most recent item, serves requests in arrival order, or selects the next item by priority.

This module studies those structures at two levels at once:

1. as **abstract data types (ADTs)** that define behaviour and legal operations;
2. as **concrete representations** whose memory layout, invariants, mutation rules, and operation costs determine how the ADT behaves in a real program.

The central question is therefore not merely how to call `append`, `pop`, or `push`. For every representation we ask:

- what does the structure promise to its client?
- which links, indices, endpoints, or ordering rules encode that promise?
- which invariant must remain true after every update?
- what must be known before an operation can be called safely?
- what is the true time and auxiliary-space cost, including any search required to find the update position?
- when do Python and C++ expose materially different implementation concerns?

These questions prepare the transition from linear structures to trees, heaps, and graphs in later modules.

## Syllabus scope

This module develops the seventh course-content block:

> Linear linked lists. LIFO stacks and FIFO queues, priority queues, doubly linked and circular lists, self-organising lists, skip lists, and selected list-processing algorithms.

Every item in that block appears explicitly in the learning path below. The module also develops representation invariants, ownership and aliasing, amortised costs, and language-specific implementation choices because those ideas are necessary to use the syllabus structures correctly.

## What you should be able to do after this module

After completing the module, you should be able to:

1. distinguish an ADT from one concrete representation;
2. distinguish logical order from physical memory layout;
3. compare dynamic arrays and linked structures by workload rather than by slogans;
4. define nodes, links, `head`, `tail`, and sentinel nodes precisely;
5. state and preserve invariants for singly, doubly, and circular linked lists;
6. trace pointer or reference changes without losing access to nodes;
7. explain why a constant-time linked-list update may still require linear-time search;
8. explain ownership, aliasing, lifetime, and deletion at an introductory level in Python and C++;
9. define stack semantics independently of any particular container;
10. compare array-backed and linked stack representations;
11. define queue semantics independently of any particular container;
12. explain why `list.pop(0)` is a poor Python queue implementation and why `deque` is appropriate;
13. explain circular-buffer indexing and distinguish logical from physical order;
14. distinguish a priority-queue ADT from heap representation;
15. compare unsorted, sorted, and heap-based priority-queue costs;
16. explain tie policies and stable priority queues;
17. describe move-to-front, transpose, and count-based self-organising lists;
18. explain when self-organisation is legal and when changing order would violate the contract;
19. explain the multi-level structure and expected performance of skip lists;
20. distinguish deterministic worst-case guarantees from expected complexity;
21. implement and justify selected linked-list algorithms such as reversal, merge, cycle detection, and two-pointer traversal;
22. communicate preconditions, mutation, failure behaviour, time cost, and auxiliary-space cost precisely.

## Concept map

```text
abstract sequence / service discipline
        │
        ├── unrestricted linear list
        │       ├── array-backed representation
        │       └── linked representation
        │               ├── singly linked
        │               ├── doubly linked
        │               ├── circular
        │               └── sentinel-based
        │
        ├── restricted access
        │       ├── stack: LIFO
        │       └── queue: FIFO
        │
        ├── ordered removal
        │       └── priority queue
        │               ├── unsorted sequence
        │               ├── sorted sequence
        │               └── heap
        │
        └── adaptive / indexed linked access
                ├── self-organising list
                │       ├── move-to-front
                │       ├── transpose
                │       └── count
                └── skip list
                        ├── ordered base level
                        ├── promotion levels
                        └── expected O(log n) search

representation reasoning
        ├── invariants
        ├── ownership and aliasing
        ├── mutation contracts
        ├── endpoint cases
        ├── amortised cost
        └── Python ↔ C++ differences
```

## Learning path

### 1. Linear lists as abstract sequences

Separate list behaviour from representation. Compare contiguous and linked storage, direct access and traversal, operation contracts, and the workload assumptions behind complexity claims.

### 2. Singly linked lists

Develop nodes and one-directional links from first principles. Study traversal, insertion, deletion, sentinels, reversal, endpoint invariants, and Python/C++ ownership differences.

### 3. Doubly linked and circular lists

Add backward links and circularity. Trace every pointer update, handle empty and one-node cases explicitly, and study sentinel-based designs that reduce special-case logic.

### 4. Stacks

Treat LIFO as an ADT. Compare Python list, linked-node, C++ vector, and standard stack-adaptor implementations. Apply stacks to nested syntax, postponed work, and explicit traversal.

### 5. Queues

Treat FIFO as an ADT. Compare `deque`, linked queues, circular buffers, and C++ queue/deque representations. Study endpoint invariants and breadth-first processing.

### 6. Priority queues

Separate priority semantics from heap representation. Compare implementation strategies, tie policies, decrease/update approaches, lazy deletion, and operation mixes.

### 7. Self-organising lists and skip lists

Study adaptive linear search and probabilistic multi-level indexing. Distinguish empirical workload improvement from probabilistic expected-complexity guarantees.

### 8. Selected list algorithms

Develop algorithms that exploit linked representation directly: middle finding, reversal, cycle detection, sorted merge, duplicate removal, and circular elimination.

### 9. Worked examples

Integrate ADT choice, representation invariant, mutation contract, trace, correctness, and complexity in complete case studies.

### 10. Module review

Test terminology, traces, debugging, design choices, ownership reasoning, complexity analysis, and cross-representation comparison.

## Prerequisites

You should already understand:

- records and compound values;
- references, mutation, copying, and aliasing;
- arrays and dynamic arrays;
- invariants and loop termination;
- recursion and explicit stacks;
- amortised cost at an introductory level;
- Big O notation.

## Diagnostic questions

Before beginning, try to answer these questions without looking ahead:

1. If linked-list deletion is `O(1)`, why can `remove(value)` still be `O(n)`?
2. What information does a `tail` pointer save, and what new invariant does it create?
3. Why can changing one `next` link too early make an entire suffix unreachable?
4. What is the difference between an owning pointer and a non-owning reference to a node?
5. Why is a Python list a good stack but a poor default FIFO queue when removing from index zero?
6. How can a circular array represent a logically ordered queue when the rear index is numerically smaller than the front index?
7. Why is a priority queue not the same thing as a binary heap?
8. Under what contract may a self-organising list move an accessed item to the front?
9. Why does a skip list normally promise expected rather than deterministic logarithmic search?
10. Why can repeatedly calling `node_at(head, i)` turn one apparent traversal into a quadratic algorithm?

Return to these questions after completing the module.

## Mastery checklist

You have mastered this module when you can honestly say:

- [ ] I can define each ADT without naming a concrete container.
- [ ] I can choose between contiguous and linked representations from an operation workload.
- [ ] I can state endpoint and link invariants before implementing an update.
- [ ] I can trace every link changed by insertion and deletion.
- [ ] I can explain what happens to an unlinked node in Python and what ownership means in C++.
- [ ] I can implement and analyse a singly linked list operation without accidental repeated traversal.
- [ ] I can preserve both directions of a doubly linked list.
- [ ] I can explain the stopping condition of a circular traversal.
- [ ] I can choose an appropriate representation for a stack and explain its cost.
- [ ] I can choose an appropriate representation for a queue and explain its cost.
- [ ] I can distinguish queue FIFO order from priority-queue selection order.
- [ ] I can compare unsorted, sorted, and heap-backed priority queues.
- [ ] I can explain stable tie handling in a priority queue.
- [ ] I can distinguish move-to-front, transpose, and count-based self-organisation.
- [ ] I can explain skip-list levels, promotion, and expected complexity.
- [ ] I can trace reversal, merging, and two-speed linked-list algorithms.
- [ ] I can state mutation, failure, correctness, time, and space guarantees precisely.

!!! note "Central study discipline"
    Do not memorise container APIs. For every operation, identify the abstract promise, the concrete representation, the invariant, the exact structural changes, and the cost created by that representation.

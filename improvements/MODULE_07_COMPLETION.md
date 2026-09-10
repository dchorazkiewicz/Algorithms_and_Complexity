# Module 07 — completion audit

## Status

**Completed.** Module 07 has been enriched according to `improvements/COURSE_ENRICHMENT_PLAN.md` and brought to the self-study standard used in the strongest parts of the course.

No files in Module 10 were changed during this stage.

## Scope completed

### `index.md`

- expanded the distinction between ADT and concrete representation;
- added explicit learning outcomes for ownership, invariants, stack/queue semantics, priority queues, self-organising lists, skip lists, and selected linked-list algorithms;
- expanded the concept map, diagnostic questions, and mastery checklist;
- aligned the learning path with the enriched chapters.

### `01-linear-lists-as-abstract-sequences.md`

- expanded ADT contracts independently of representation;
- distinguished logical position from structural node position;
- expanded dynamic-array versus linked-list trade-offs;
- added representation-invariant and mutation-correctness reasoning;
- added workload-based representation selection;
- discussed memory locality and reference/iterator validity;
- added Python `list` versus C++ `std::vector` / `std::list` context;
- added a full accidental-quadratic-traversal analysis.

### `02-singly-linked-lists.md`

- expanded Python reference semantics and structural ownership;
- added a C++ `std::unique_ptr` ownership model and non-owning traversal pointers;
- added operation contracts for insertion, deletion, and reversal;
- expanded `head`, `tail`, and `size` invariants including empty/one-node cases;
- added full traces for insertion and reversal;
- added C++ ownership-transfer examples for push-front and reversal;
- clarified object lifetime versus structural membership and dangling-pointer risks;
- strengthened complexity analysis and common-failure explanations.

### `03-doubly-linked-and-circular-lists.md`

- formalised bidirectional `next`/`previous` invariants;
- added endpoint and one-node invariants;
- expanded insertion and deletion traces;
- covered middle, head, tail, and only-node deletion;
- added C++ discussion separating neighbour links from ownership;
- formalised circular-list traversal and termination;
- expanded sentinel-based circular representation and generic insert/unlink operations;
- added sentinel-specific trade-offs and failure modes.

### `04-stacks.md`

- developed stack as an ADT with explicit contracts;
- compared Python list, linked stack, C++ `std::vector`, and `std::stack` representations;
- distinguished amortised dynamic-array push from linked worst-case link updates;
- expanded underflow policy;
- added a full balanced-delimiter invariant, trace, termination, and complexity analysis;
- connected explicit stacks with runtime call stacks and pending-work algorithms.

### `05-queues.md`

- developed queue as an ADT with explicit FIFO contracts;
- derived the quadratic cost of repeated Python `list.pop(0)`;
- expanded `collections.deque` and linked-queue implementations;
- formalised linked-queue endpoint invariants and final-node removal;
- added a complete circular-buffer representation and implementation;
- explained empty/full ambiguity and wraparound;
- added C++ `std::queue` / `std::deque` context;
- expanded BFS queue invariants and the correctness role of FIFO ordering.

### `06-priority-queues.md`

- explicitly separated priority-queue ADT from heap representation;
- expanded unsorted, sorted, and binary-heap representation trade-offs;
- explained why heap order is not global sorted order;
- added stable tie handling with sequence numbers;
- contrasted Python min-heap conventions with C++ `std::priority_queue` max-priority defaults;
- expanded arbitrary priority updates and item-to-index maps;
- added lazy deletion, its invariant, and correctness reasoning;
- added a complete multiway-merge invariant and `O(N log k)` analysis.

### `07-self-organising-and-skip-lists.md`

- expanded move-to-front, transpose, and count/frequency self-organising rules;
- clarified when reordering is semantically legal;
- added workload-sequence cost analysis and empirical evaluation guidance;
- expanded skip-list invariants, search, random promotion, predecessor arrays, insertion, duplicate policy, and deletion;
- derived expected linear storage from geometric level participation;
- distinguished expected from worst-case and amortised complexity;
- compared skip-list guarantees with AVL-tree guarantees without duplicating Module 08.

### `08-selected-list-algorithms.md`

- expanded two-speed middle finding with explicit even-length contract;
- added full Floyd cycle-detection correctness intuition and cycle-entry algorithm;
- strengthened reversal mutation contract and invariant;
- expanded sorted linked merge with non-sharing precondition, stability, and proof invariant;
- expanded duplicate removal with sorted-input reasoning;
- added list splitting and linked-list merge sort with recurrence analysis;
- expanded accidental quadratic traversal analysis;
- added Josephus-style circular elimination and termination/cost reasoning.

### `09-worked-examples.md`

Expanded into integrated case studies covering:

1. singly linked reversal;
2. postfix evaluation with a stack;
3. browser history with two stacks;
4. round-robin scheduling with a queue;
5. fixed-capacity circular queue;
6. stable priority scheduling;
7. multiway sorted-stream merge;
8. move-to-front under a non-uniform workload;
9. skip-list search tracing;
10. linked-list merge sort.

The examples now explicitly connect contracts, representations, invariants, traces, termination, mutation, and complexity.

### `review.md`

- expanded vocabulary across all syllabus structures;
- added 30 conceptual questions;
- added traces for linked updates, stacks, circular queues, priority queues, and skip lists;
- added debugging tasks covering pointer/link corruption, endpoint bugs, incorrect complexity claims, invalid priority ordering, self-organisation semantics, and skip-list corruption;
- added proof exercises for reversal, queue endpoints, BFS FIFO behaviour, heap-frontier merging, Floyd cycle detection, skip-list storage, and sorted linked merge;
- added complexity exercises and representation-selection tasks;
- added design problems for deques, browser history, circular queues, mutable/stable priority queues, self-organising lists, skip lists, cycle diagnostics, and linked merge sort;
- added explicit Python/C++ comparison questions;
- expanded the final mastery checklist.

## Size after enrichment

The current Module 07 Markdown files total approximately **143 kB** (about **140 KiB**) across the module introduction, nine content chapters, worked examples, and review.

The increase reflects added contracts, invariants, proofs, traces, language comparisons, examples, and exercises rather than duplication for its own sake.

## Syllabus coverage

Module 07 now explicitly covers the complete syllabus block:

> Linear linked lists. LIFO stacks and FIFO queues, priority queues, doubly linked and circular lists, self-organising lists, skip lists, and selected list-processing algorithms.

Each syllabus item has a dedicated section or chapter and is connected to representation invariants, operation costs, and practical implementation reasoning.

## Final assessment

Module 07 now functions as a self-study module rather than a concise overview. A student is expected to be able to:

- separate an ADT from its representation;
- reason about Python references and introductory C++ ownership/pointers;
- preserve singly, doubly, circular, and sentinel-list invariants;
- choose and justify stack, queue, and priority-queue representations;
- distinguish worst-case, amortised, and expected guarantees where relevant;
- explain self-organising and skip-list behaviour;
- trace and justify representative linked-list algorithms;
- analyse mutation, termination, correctness, and complexity without relying on an external lecture.

The next planned enrichment stage is **Module 10 — Computational Complexity and Hard Problems**.

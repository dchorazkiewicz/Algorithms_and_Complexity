# Module 06 — Backtracking, Greedy Methods, and Dynamic Structures

## Why this module matters

Some problems do not yield to a single direct scan, a fixed formula, or one obvious recursive decomposition. We may have to try a decision, observe its consequences, undo it when it leads nowhere, or choose a locally attractive move while accepting that the choice may later need improvement.

This module studies three related ideas:

- **backtracking**, where a partial solution is extended and abandoned when it can no longer lead to a valid result;
- **greedy construction and improvement**, where decisions are made using local information and then evaluated or refined;
- **dynamic data structures**, whose size or shape changes while the algorithm runs.

The common theme is controlled change. The algorithm does not merely process a fixed sequence. It builds, revises, and explores a changing state.

## Syllabus scope

This module develops the sixth course-content block:

> Backtracking algorithms. Systematic and heuristic methods for improving greedy algorithms. Dynamic data structures.

The source syllabus names these topics but does not prescribe one specific set of example problems. The examples in this module are chosen to make the underlying mechanisms visible.

## What you should be able to do after this module

After completing the module, you should be able to:

1. describe a search space in terms of states, choices, and constraints;
2. explain how backtracking extends and restores partial state;
3. identify base cases, dead ends, and pruning conditions;
4. distinguish exhaustive search from pruned search;
5. formulate a greedy rule and state what it optimises locally;
6. explain why a greedy rule needs a correctness argument rather than intuition alone;
7. distinguish systematic improvement from heuristic improvement;
8. recognise when a changing problem state requires a dynamic structure;
9. trace recursive and iterative search procedures;
10. analyse time, auxiliary space, and the effect of pruning.

## Concept map

```text
search or construction problem
    ├── state
    ├── available choices
    ├── constraints
    └── goal condition
            │
            ├── explore alternatives → backtracking
            │       ├── choose
            │       ├── recurse
            │       └── undo
            │
            ├── choose one local best option → greedy method
            │       ├── justify
            │       ├── evaluate
            │       └── improve
            │
            └── changing state representation → dynamic structures
```

## Learning path

1. Search spaces and partial solutions.
2. The backtracking pattern.
3. Pruning and constraint propagation.
4. Greedy construction.
5. Systematic and heuristic improvement.
6. Dynamic data structures.
7. Worked examples.
8. Module review.

## Prerequisites

You should already understand recursion, explicit stacks, lists, sets, dictionaries, correctness arguments, and Big O notation.

!!! note "Central study question"
    For every algorithm in this module, ask: what state is being built, which choices are still available, how do we recognise failure early, and what exactly is restored when we retreat?
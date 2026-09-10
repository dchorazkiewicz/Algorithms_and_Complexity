# Module 06 — completion audit

## Status

**Completed.** Module 06 has been enriched according to `improvements/COURSE_ENRICHMENT_PLAN.md` and brought closer to the depth and self-study standard used in Modules 01–05.

No files in Modules 07 or 10 were changed during this stage.

## Scope completed

### `index.md`

- expanded learning outcomes;
- added explicit search-space, greedy, local-improvement, and dynamic-structure concepts;
- added diagnostic questions and a detailed mastery checklist;
- aligned the learning path with the enriched chapters.

### `01-search-spaces-and-partial-solutions.md`

- distinguished state from execution history;
- formalised states, transitions, partial solutions, goals, and dead ends;
- added branching factor and depth;
- distinguished candidate-space size, explored-state count, and output size;
- expanded the constrained binary-string example with contract, trace, soundness, completeness, termination, and Fibonacci-style growth analysis;
- clarified exhaustive search versus backtracking.

### `02-the-backtracking-pattern.md`

- expanded choose–explore–undo and state-restoration reasoning;
- added a complete contract and correctness analysis for permutations;
- added manual tracing and output-sensitive complexity;
- added a complete N-Queens case study with contract, pseudocode, Python implementation, invariant, trace, correctness, termination, and complexity;
- compared mutable state restoration with immutable state copying.

### `03-pruning-and-constraint-propagation.md`

- strengthened the proof obligation for safe pruning;
- expanded subset-sum pruning and added counterexamples for changed assumptions;
- added lower/upper feasibility reasoning;
- distinguished pruning from constraint propagation and cheaper state evaluation;
- added forward checking;
- expanded branch-and-bound style optimistic bounds;
- separated choice ordering from pruning;
- added guidance for measuring explored and pruned states.

### `04-greedy-construction.md`

- added a complete interval-scheduling contract, pseudocode, implementation, and trace;
- expanded the exchange argument step by step;
- separated feasibility from optimality;
- explained greedy-choice property and optimal substructure;
- expanded counterexample methodology;
- clarified exact greedy algorithms versus greedy heuristics.

### `05-improving-greedy-solutions.md`

- separated exact search, systematic local improvement, heuristics, and dynamic programming;
- formalised solution representation, objective function, neighbourhood, and local/global optimum;
- expanded first-improvement versus best-improvement policies;
- added termination and neighbourhood-cost reasoning;
- clarified how greedy incumbents support branch and bound;
- added heuristic escape mechanisms and evaluation criteria;
- added a guarantee ladder from proven global optimum to feasibility only.

### `06-dynamic-data-structures.md`

- expanded abstract structure versus concrete representation;
- added dynamic-array size/capacity invariants;
- added aggregate amortised analysis for geometric growth;
- contrasted geometric growth with growth by one;
- distinguished amortised and average-case analysis;
- compared contiguous and linked representations;
- expanded ownership, aliasing, state restoration, and representation-specific operation costs;
- strengthened the bridge to Module 07.

### `07-worked-examples.md`

Expanded into integrated case studies covering:

- fixed-size combinations;
- maze path search;
- N-Queens;
- exact greedy interval scheduling;
- heuristic bin packing;
- systematic one-swap improvement;
- dynamic-array amortised growth.

Each case now explicitly discusses guarantees, state, invariants, termination, and/or complexity as appropriate.

### `review.md`

- expanded vocabulary and conceptual questions;
- added traces for permutations, N-Queens, and constrained binary strings;
- added debugging tasks for undo, aliasing, invalid pruning, invalid bounds, greedy claims, local-optimality claims, and amortised-analysis mistakes;
- added proof exercises for soundness/completeness, greedy exchange arguments, and amortised append;
- added design problems for backtracking, graph colouring, mixed-sign subset sum, local improvement, branch and bound, explicit stacks, and dynamic frontiers;
- expanded the final mastery checklist.

## Final assessment

Module 06 now covers the syllabus block:

> Backtracking algorithms. Systematic and heuristic methods for improving greedy algorithms. Dynamic data structures.

The module now treats those topics as a self-study sequence rather than as a concise overview. Important algorithms and methods are accompanied by explicit assumptions, state models, invariants, correctness or guarantee arguments, termination reasoning, complexity analysis, counterexamples, and review problems.

The next planned enrichment stage is **Module 07 — Lists, Stacks, Queues, and Priority Queues**.

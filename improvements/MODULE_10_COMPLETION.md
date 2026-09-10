# Module 10 — completion audit

## Status

**Completed.** Module 10 has been enriched according to `improvements/COURSE_ENRICHMENT_PLAN.md` and brought to the self-study standard used in the strongest parts of the course.

No files outside Module 10 were modified during this enrichment stage, apart from this completion report in `improvements/`.

## Scope completed

### `index.md`

- expanded the two-level distinction between algorithm analysis and problem complexity;
- expanded learning outcomes from basic Big-O use to complete cost-model, recurrence, amortised, and reduction reasoning;
- added a concept map, diagnostic questions, study procedure, and detailed mastery checklist;
- explicitly aligned the learning path with the enriched chapters.

### `01-cost-models-and-input-size.md`

- expanded the role and limitations of cost models;
- distinguished source-language operations from elementary operations;
- added numeric value versus encoded bit length;
- added multidimensional input-size examples;
- distinguished time, auxiliary space, total space, and output-sensitive complexity;
- added explicit output-size lower bounds;
- expanded representation-dependent costs and hidden copying costs;
- added unit-cost versus arbitrary-precision arithmetic discussion;
- added a reusable full analysis template.

### `02-asymptotic-notation.md`

- formalised Big O, Big Omega, and Big Theta with explicit inequalities;
- added step-by-step proofs with concrete constants and thresholds;
- distinguished valid loose bounds from tight bounds;
- justified dropping lower-order terms;
- explained logarithm-base equivalence;
- separated asymptotic notation from best/worst-case terminology;
- distinguished algorithm-specific lower bounds from problem lower bounds;
- added proof patterns and counterexamples to incorrect asymptotic claims.

### `03-counting-iterative-algorithms.md`

- expanded exact loop counting and summation reasoning;
- covered consecutive, rectangular, triangular, logarithmic, mixed, dependent, and harmonic-style loop patterns;
- added `Theta(V+E)` adjacency-list reasoning;
- added sparse-versus-dense graph interpretation;
- added data-dependent total-size parameters;
- added examples where a single visible loop becomes quadratic because its body copies growing data;
- strengthened best/worst-case analysis for early exits;
- added a reusable iterative-analysis procedure.

### `04-recursive-complexity-and-recurrences.md`

- expanded recurrence derivation from source code;
- added full expansion for linear and increasing-work recurrences;
- expanded binary-search and merge-sort derivations;
- added recursion-tree examples for root-, balanced-, and leaf-dominated work;
- added substitution-method reasoning;
- introduced the Master-Theorem pattern with its three principal cases at the course level;
- explained when the Master Theorem does not apply directly;
- expanded naive Fibonacci and memoisation analysis;
- added Quicksort best/worst recurrence shapes;
- separated total recursion-tree work from maximum active stack depth.

### `05-growth-classes-and-scalability.md`

- expanded intuition for constant, logarithmic, linear, linearithmic, polynomial, exponential, and factorial growth;
- added practical doubling behaviour and crossover-point reasoning;
- distinguished theoretical polynomial tractability from practical speed;
- added hardware-speedup intuition for exponential algorithms;
- expanded multidimensional and parameterised viewpoints;
- connected output growth and graph density with effective scalability;
- added a practical algorithm-selection checklist.

### `06-cases-and-amortised-analysis.md`

- formally separated best, worst, average, randomised expected, and amortised analyses;
- expanded average-case linear-search derivation under explicit probability assumptions;
- distinguished input randomness from algorithmic randomness;
- added complete aggregate proof of constant amortised dynamic-array append under geometric capacity growth;
- contrasted geometric growth with capacity growth by one;
- added a complete multipop-stack amortised proof;
- introduced aggregate, accounting, and potential viewpoints;
- added a direct comparison table for average, expected, and amortised guarantees.

### `07-tractability-and-hard-problems.md`

- distinguished problem families from individual instances;
- expanded polynomial-time tractability in terms of encoded input length;
- separated decision, search, and optimisation formulations;
- distinguished exact, approximation, heuristic, parameterised, and restricted-instance approaches;
- clarified why large candidate spaces and large enumeration outputs do not prove NP-hardness;
- added full pseudopolynomial-time reasoning using binary encoding and subset-sum-style `O(nB)` dynamic programming;
- clarified worst-case hardness versus practical instance difficulty;
- introduced reductions as transfers of difficulty.

### `08-p-np-reductions-and-completeness.md`

- expanded decision problems, certificates, verifiers, P, and NP;
- clarified `P subseteq NP` and the meaning of NP;
- formalised polynomial-time many-one reductions and their direction;
- separated NP-hardness from NP-completeness;
- added a complete reduction-proof checklist;
- added a full reduction `Hamiltonian Cycle -> TSP Decision`, including construction, polynomial size/time, both correctness directions, and TSP membership in NP;
- added a full reduction `3-SAT -> CLIQUE`, including graph construction, polynomial bound, both correctness directions, and CLIQUE membership in NP;
- clarified reduction transitivity and what NP-completeness does and does not prove.

### `09-worked-examples.md`

Expanded into integrated examples covering:

1. triangular exact counting;
2. `Theta(n log n)` nested loops;
3. hidden quadratic copying;
4. `Theta(V+E)` graph traversal;
5. expansion of `T(n)=T(n-1)+n`;
6. recursion tree for `2T(n/2)+1`;
7. merge-sort recurrence;
8. three Master-Theorem comparison patterns;
9. dynamic-array amortised analysis;
10. multipop-stack amortised analysis;
11. output-sensitive subset generation;
12. pseudopolynomial subset-sum reasoning;
13. Hamiltonian-cycle verification;
14. Hamiltonian Cycle -> TSP Decision reduction audit;
15. 3-SAT -> CLIQUE reduction audit;
16. reduction-direction diagnosis;
17. loose versus tight asymptotic bounds.

### `review.md`

- expanded vocabulary to include encoding, cost models, lower bounds, recurrence methods, and complete complexity-theory terminology;
- added 42 conceptual questions;
- added extensive iterative-complexity calculations;
- added asymptotic proof exercises requiring constants and thresholds;
- added recurrence-solving exercises;
- added case, expected, and amortised analysis exercises;
- added scalability and pseudopolynomial reasoning tasks;
- expanded false-claim debugging;
- added verifier-design exercises;
- added reduction-direction drills;
- added complete reconstruction exercises for both Hamiltonian Cycle -> TSP Decision and 3-SAT -> CLIQUE;
- added an end-to-end reduction-audit problem;
- expanded the final course mastery checklist.

## Size after enrichment

The current Module 10 Markdown files total approximately **138 kB** (about **135 KiB**) across the module introduction, nine content chapters/worked-examples pages, and review.

The increase reflects added derivations, formal definitions, proofs, recurrence analysis, amortised arguments, reductions, worked examples, and exercises rather than duplication for its own sake.

## Syllabus coverage

Module 10 now explicitly covers the complete syllabus block:

> Time-complexity analysis. Computational complexity. Big O notation. Examples of complexity calculations. Algorithmically difficult problems. N- and NP-complete problems.

The source phrase `N- and NP-complete` is explicitly documented and interpreted using the standard terminology P, NP, NP-hard, and NP-complete rather than silently reproducing non-standard terminology.

## Final assessment

Module 10 now functions as a self-study final module rather than a concise complexity overview. A student is expected to be able to:

- define input size and a cost model before analysis;
- derive tight iterative bounds from counts and summations;
- prove simple asymptotic relations;
- derive and solve representative recurrences;
- separate total recursive work from stack depth;
- distinguish best, worst, average, expected, and amortised guarantees;
- prove basic amortised results;
- distinguish polynomial from pseudopolynomial time;
- distinguish individual algorithm cost from problem-family hardness;
- define and verify certificates for NP problems;
- read polynomial reductions in the correct direction;
- distinguish NP-hard from NP-complete;
- reconstruct two complete introductory NP-completeness reductions;
- state precisely what NP-completeness proves and what remains unknown.

This completes the planned enrichment stages for Modules **06, 07, and 10**.
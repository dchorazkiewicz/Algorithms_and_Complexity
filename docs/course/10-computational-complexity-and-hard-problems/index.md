# Module 10 — Computational Complexity and Hard Problems

## Why this module matters

Correctness answers whether an algorithm solves the stated problem. Complexity asks how the resources required by that algorithm grow as the input grows. Two algorithms may be equally correct and still differ so strongly in growth that one remains useful at scale while the other becomes infeasible.

This module develops complexity at two levels.

The first level is **algorithm analysis**. We define input size, choose a cost model, count operations, simplify the resulting functions asymptotically, and distinguish time, auxiliary space, output cost, best case, worst case, expected cost, and amortised cost.

The second level is **problem complexity**. Instead of asking only whether one implementation is fast, we ask whether an entire family of problems appears to resist efficient exact solution. This leads to decision problems, polynomial verification, polynomial-time reductions, and the classes P, NP, NP-hard, and NP-complete.

The transition between the two levels is essential:

```text
program execution
      ↓
operation count
      ↓
growth function
      ↓
asymptotic class
      ↓
comparison of algorithms
      ↓
tractability of problem families
      ↓
verification and reductions
      ↓
P, NP, NP-hard, NP-complete
```

## Syllabus scope

This module develops the tenth course-content block:

> Time-complexity analysis. Computational complexity. Big O notation. Examples of complexity calculations. Algorithmically difficult problems. N- and NP-complete problems.

The source syllabus uses the phrase **“N- and NP-complete problems”**. Standard complexity theory does not use a class `N` in this context. The course therefore treats that phrase through the established terminology **P**, **NP**, **NP-hard**, and **NP-complete**, while preserving the intended syllabus emphasis on computationally hard problems.

## What you should be able to do after this module

After completing the module, you should be able to:

1. define input size explicitly for arrays, numbers, matrices, graphs, and output-generating problems;
2. distinguish numeric magnitude from representation length, especially for integer inputs;
3. state a cost model before claiming that an operation is constant time;
4. distinguish time complexity, auxiliary space, total memory, and output-sensitive cost;
5. derive operation-count functions for sequential, nested, triangular, logarithmic, and input-dependent loops;
6. use summations to justify non-trivial loop counts;
7. use Big O, Big Omega, and Big Theta as asymptotic bounds rather than informal labels;
8. prove simple asymptotic relations by choosing suitable constants and thresholds;
9. distinguish tight bounds from valid but loose upper bounds;
10. derive recurrences from recursive code;
11. solve standard recurrences by expansion and recursion-tree reasoning;
12. use the Master-Theorem pattern when its assumptions are satisfied and recognise when it does not apply;
13. separate total recursive work from recursion depth and stack-space cost;
14. compare constant, logarithmic, linear, linearithmic, polynomial, exponential, and factorial growth;
15. explain crossover points and why asymptotic superiority does not imply superiority for every practical input size;
16. distinguish best-case, worst-case, average-case, expected, and amortised analyses;
17. prove constant amortised append for geometric dynamic-array growth and analyse a multipop stack sequence;
18. distinguish polynomial from pseudopolynomial time;
19. distinguish decision, search, and optimisation formulations;
20. explain why a large candidate space does not by itself prove computational hardness;
21. define P and NP through polynomial-time solution and verification;
22. define polynomial-time many-one reduction and read its direction correctly;
23. distinguish NP-hardness from NP-completeness;
24. audit a proposed NP-completeness proof for membership, construction, polynomial cost, and both directions of correctness;
25. carry out complete introductory reductions rather than only naming source and target problems;
26. state precisely what an NP-completeness result does and does not prove.

## Concept map

```text
algorithm analysis
├── input model
│   ├── input size
│   ├── representation length
│   └── cost model
├── resource functions
│   ├── time
│   ├── auxiliary space
│   └── output cost
├── asymptotic notation
│   ├── O  : upper bound
│   ├── Ω  : lower bound
│   └── Θ  : tight bound
├── execution patterns
│   ├── iteration
│   ├── summations
│   ├── logarithmic progress
│   └── recursion / recurrences
└── analysis regimes
    ├── best / worst
    ├── average / expected
    └── amortised

problem complexity
├── polynomial tractability
├── decision / search / optimisation
├── certificates and verification
├── P and NP
├── polynomial reductions
├── NP-hard
└── NP-complete
```

## Learning path

### 1. Cost models and input size

Before counting anything, define what the input size means and which operations are treated as elementary. Learn why bit length matters for numeric problems and why output size can impose an unavoidable lower bound.

### 2. Asymptotic notation

Study `O`, `Ω`, and `Θ` formally enough to prove simple bounds. Learn the difference between a tight description and a merely valid upper bound, and separate asymptotic reasoning from engineering constants.

### 3. Counting iterative algorithms

Translate loop structure into exact or summation-based counts. Work with scans, consecutive loops, rectangular and triangular nests, logarithmic loops, mixed patterns, and adjacency-list traversals.

### 4. Recursive complexity and recurrences

Derive recurrence equations from code and solve representative forms by expansion, level-cost reasoning, recursion trees, and the Master-Theorem pattern where appropriate.

### 5. Growth classes and practical scalability

Compare common growth rates, doubling behaviour, constants, crossover points, multidimensional input parameters, and the practical meaning of polynomial versus exponential growth.

### 6. Best, worst, average, expected, and amortised analysis

Separate input-case analysis from probabilistic expectation and from deterministic amortised guarantees. Use dynamic arrays and multipop stacks as complete amortised examples.

### 7. Tractability and hard problems

Move from the cost of one algorithm to the complexity of problem families. Distinguish decision, search, and optimisation formulations; exact, approximation, parameterised, and heuristic approaches; and polynomial from pseudopolynomial time.

### 8. P, NP, reductions, and NP-completeness

Study certificates, verification, P, NP, polynomial reductions, NP-hardness, and NP-completeness. Practise reduction direction and complete the proof obligations on concrete examples.

### 9. Worked examples

Integrate operation counting, summations, recurrence solving, output lower bounds, amortised analysis, verification, and reductions in complete analyses.

### 10. Module review

Finish with calculation exercises, proof tasks, false-claim diagnosis, verifier design, reduction audits, and an end-of-course mastery checklist.

## How to study this module

For every complexity problem, use the following discipline:

1. define the input-size variable or variables;
2. state the representation assumptions;
3. choose the operation or resource being counted;
4. identify the execution pattern;
5. derive a count, sum, or recurrence before simplifying it;
6. distinguish the case or expectation being analysed;
7. state time and space separately;
8. use the tightest justified asymptotic class;
9. identify output lower bounds where relevant;
10. state what assumptions would invalidate the analysis.

For every hardness or reduction problem:

1. state the decision problem precisely;
2. define what a certificate contains if NP membership is claimed;
3. count verification work;
4. choose the reduction direction deliberately;
5. describe the instance transformation explicitly;
6. bound the transformation time and output size polynomially;
7. prove yes-to-yes;
8. prove no-to-no, or equivalently the reverse implication needed for the iff statement;
9. distinguish the conclusion “NP-hard” from “NP-complete”.

## Prerequisites

You should already be able to trace loops and recursion, reason about arrays, linked structures, trees, heaps, and graphs, and read basic Python. Earlier modules have used complexity informally; this module makes that reasoning systematic.

## Diagnostic questions

Before beginning, try to answer these questions:

1. If an algorithm receives an integer `N`, is the input size necessarily `N`?
2. Why is `3n + 7 ∈ O(n²)` true but usually unhelpful?
3. How would you prove `3n + 7 ∈ O(n)` from the definition?
4. Why does a triangular nested loop execute about half as many iterations as an `n × n` loop yet remain quadratic?
5. Why can two recursive calls still lead to linear total time?
6. What is the difference between recursion-tree size and maximum recursion depth?
7. Why is `O(nB)` not necessarily polynomial in the encoded input size?
8. Why is average-case analysis impossible without a probability model?
9. Why is amortised `O(1)` not the same as expected `O(1)`?
10. Why does `2^n` possible candidates not prove NP-hardness?
11. What is the difference between solving a decision problem and verifying a proposed yes-answer?
12. If `A ≤p B`, which problem is being shown to be at least as hard?
13. What two obligations distinguish an NP-completeness proof from an NP-hardness proof?

Return to these questions after completing the module.

## Mastery checklist

You have mastered this module when you can honestly say:

- [ ] I define input size before writing a complexity class.
- [ ] I can explain when a unit-cost assumption is and is not reasonable.
- [ ] I can derive loop counts rather than guessing from indentation depth.
- [ ] I can prove simple `O`, `Ω`, and `Θ` relations from their definitions.
- [ ] I can distinguish a tight bound from a loose bound.
- [ ] I can derive and solve standard recurrences.
- [ ] I can separate total work from recursion depth and stack space.
- [ ] I can explain practical crossover points without confusing them with asymptotic classes.
- [ ] I can distinguish best, worst, average, expected, and amortised cost.
- [ ] I can prove a basic amortised result over a sequence of operations.
- [ ] I can explain polynomial versus pseudopolynomial time.
- [ ] I can distinguish decision, search, and optimisation problems.
- [ ] I can define P, NP, NP-hard, and NP-complete precisely at the course level.
- [ ] I can read a polynomial reduction in the correct direction.
- [ ] I can verify every obligation in a complete reduction proof.
- [ ] I can state what remains unknown about `P` versus `NP` without overstating current results.

!!! note "Central discipline"
    Never write a complexity class before stating what the input size means and which resource is being counted. Never claim NP-hardness before checking the direction and correctness of the reduction.
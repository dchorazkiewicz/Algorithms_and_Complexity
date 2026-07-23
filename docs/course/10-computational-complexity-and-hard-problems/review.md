# Module 10 Review

## Core vocabulary

Explain each term precisely:

- input size;
- cost model;
- dominant operation;
- time complexity;
- auxiliary space;
- output-sensitive complexity;
- Big O;
- Big Omega;
- Big Theta;
- logarithmic growth;
- recurrence;
- recursion tree;
- best case;
- worst case;
- average case;
- expected complexity;
- amortised complexity;
- polynomial time;
- tractability;
- pseudopolynomial time;
- decision problem;
- certificate;
- verifier;
- P;
- NP;
- polynomial-time reduction;
- NP-hard;
- NP-complete.

## Conceptual questions

1. Why must `n` be defined before a complexity class is stated?
2. Why is Big O not the same as an exact running time?
3. Why is `Θ(n)` more informative than `O(n²)` for a linear scan?
4. Why do consecutive loops add while independent nested loops multiply?
5. Why can a nested adjacency-list traversal be `Θ(V + E)`?
6. Why is recursion depth not always equal to total recursive work?
7. Why does merge sort cost `Θ(n log n)`?
8. Why does naive Fibonacci repeat work exponentially?
9. Why does average-case analysis require a probability model?
10. Why is amortised analysis not probabilistic?
11. Why is polynomial time used as a theoretical tractability boundary?
12. Why can a polynomial algorithm still be impractical?
13. Why does an exponential candidate space not prove NP-hardness?
14. Why is efficient verification different from efficient discovery?
15. Why does the direction of a reduction matter?
16. What must be shown to prove NP-completeness?
17. Why does NP-completeness not prove that exponential time is unavoidable?

## Calculation exercises

Determine tight asymptotic bounds.

### Exercise 1

```python
for index in range(n):
    work(index)
```

### Exercise 2

```python
for left in range(n):
    for right in range(left):
        work(left, right)
```

### Exercise 3

```python
step = 1
while step < n:
    step *= 3
```

### Exercise 4

```python
for _ in range(n):
    step = n
    while step > 1:
        step //= 2
```

### Exercise 5

Solve by expansion:

\[
T(n) = T(n-1) + n.
\]

### Exercise 6

Use a recursion tree:

\[
T(n) = 2T(n/2) + 1.
\]

### Exercise 7

Use level costs:

\[
T(n) = 2T(n/2) + n.
\]

## Debugging claims

Explain what is wrong or incomplete.

### Claim 1

> The algorithm has two loops, so it is `O(n²)`.

### Claim 2

> Big O always means worst-case complexity.

### Claim 3

> Recursive binary search uses constant space because each call performs constant work.

### Claim 4

> Dynamic-array append is constant time because append normally writes one element.

### Claim 5

> The problem has `2^n` possible solutions, therefore it is NP-complete.

### Claim 6

> We reduced our new problem to SAT, so our new problem is NP-hard.

### Claim 7

> The certificate can be checked quickly, therefore the problem is in P.

## Design problems

### Problem 1 — Compare representations

Analyse membership testing for an unsorted list, sorted list with binary search, balanced search tree, and hash set. State worst-case and expected assumptions separately.

### Problem 2 — Output lower bound

Design an algorithm that generates every binary string of length `n`. Explain why no explicit-output algorithm can run in polynomial time in `n`.

### Problem 3 — Recursive versus iterative space

Compare recursive and iterative DFS on a path graph with `n` vertices. State time and auxiliary-space costs and identify where the pending work is stored.

### Problem 4 — Amortised sequence

Analyse a stack with a `multipop(k)` operation that removes up to `k` elements. Show that any sequence of `m` pushes and multipops has total `O(m)` pop work.

### Problem 5 — Verification

Specify a polynomial-time verifier for one of:

- graph `k`-colourability;
- subset sum;
- Hamiltonian cycle;
- Boolean satisfiability.

Define the certificate and count the verification work.

### Problem 6 — Reduction audit

For a proposed reduction, write four separate obligations:

1. instance construction;
2. polynomial-time bound;
3. yes-to-yes proof;
4. no-to-no proof.

Then explain what additional argument is required for NP-completeness.

## Mastery checklist

You are ready to complete the course when you can:

- define input size and a cost model before counting;
- derive tight bounds for standard loop patterns;
- write and interpret simple recurrences;
- separate time, stack depth, and output cost;
- use `O`, `Ω`, and `Θ` without treating them as interchangeable;
- distinguish cases and amortised guarantees;
- compare growth classes and crossover effects;
- explain decision, search, and optimisation formulations;
- define P and NP using polynomial-time solution and verification;
- read reduction notation in the correct direction;
- distinguish NP-hard from NP-complete;
- state clearly what complexity theory proves and what remains unknown.

## Course conclusion

The course began with the question “what is an algorithm?” and ends with a stronger set of questions:

- What exactly does the algorithm guarantee?
- Why does it terminate?
- Which invariant explains its correctness?
- How does its resource use grow?
- Which representation supports the required operations?
- Is the difficulty caused by the implementation, or by the problem family itself?

These questions form a durable method for designing, analysing, and communicating algorithms.
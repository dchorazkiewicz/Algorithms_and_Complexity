# Module 10 Review

This review is intended to test whether you can analyse algorithms and reason about computational hardness without relying on memorised labels. Show intermediate reasoning: define the input size, derive counts or recurrences, and state reduction obligations explicitly.

## Core vocabulary

Explain each term precisely and give one example where appropriate:

- input size;
- encoded input length;
- cost model;
- unit-cost model;
- bit complexity;
- dominant operation;
- time complexity;
- auxiliary space;
- total space;
- output-sensitive complexity;
- lower bound;
- Big O;
- Big Omega;
- Big Theta;
- tight bound;
- logarithmic growth;
- linearithmic growth;
- recurrence;
- recursion tree;
- substitution method;
- Master-Theorem pattern;
- best case;
- worst case;
- average case;
- expected complexity;
- amortised complexity;
- aggregate analysis;
- polynomial time;
- tractability;
- pseudopolynomial time;
- decision problem;
- search problem;
- optimisation problem;
- certificate;
- verifier;
- P;
- NP;
- polynomial-time reduction;
- NP-hard;
- NP-complete.

## Conceptual questions

1. Why must `n` be defined before a complexity class is stated?
2. Why can numeric magnitude differ exponentially from encoded input length?
3. Why is copying a list not constant time just because it appears as one expression?
4. What does a cost model abstract away, and what must it preserve?
5. Why can output size impose an unavoidable lower bound?
6. Why is `Θ(n)` more informative than `O(n²)` for a linear scan?
7. Why does Big O not mean worst case?
8. Why is an `Ω` lower bound on one implementation different from a lower bound for every algorithm solving a problem?
9. Why do consecutive loops add while independent nested loops multiply?
10. Why can a triangular loop be quadratic even though it performs about half the work of an `n × n` loop?
11. Why can a nested adjacency-list traversal be `Θ(V+E)`?
12. Why can a one-loop program still take quadratic time?
13. Why does repeated halving produce logarithmic complexity?
14. Why is recursion depth not equal to total recursive work?
15. Why is `2T(n/2)+1` linear while `2T(n/2)+n` is `Θ(n log n)`?
16. What does `n^(log_b a)` represent in the Master-Theorem pattern?
17. When should the Master Theorem not be applied directly?
18. Why can memoisation transform an exponential recursion tree into polynomially many distinct subproblems?
19. Why can Quicksort have different best/worst recurrence shapes?
20. Why can an asymptotically worse algorithm win on small inputs?
21. What is a crossover point?
22. Why does a large hardware speedup produce only a modest increase in feasible `n` for exponential algorithms?
23. Why does average-case analysis require a probability model?
24. How can expected cost arise from an algorithm's own random choices?
25. Why is amortised analysis not probabilistic?
26. Why can a dynamic-array append be worst-case `Θ(n)` and amortised `Θ(1)` simultaneously?
27. Why does geometric capacity growth matter for amortised append?
28. Why does a multipop stack have constant amortised operation cost over a sequence?
29. Why is polynomial time not synonymous with practical efficiency?
30. Why is `O(nB)` potentially pseudopolynomial when `B` is binary encoded?
31. Why does an exponential candidate set not prove NP-hardness?
32. Why are decision, search, and optimisation formulations separated?
33. What is the difference between finding and verifying a certificate?
34. Why is `P ⊆ NP`?
35. Why does NP not mean “not polynomial”?
36. What does `A ≤p B` allow us to conclude about relative difficulty?
37. Why does the direction of a reduction matter?
38. Why must a reduction's target instance have polynomial size?
39. Why must both logical directions of a reduction be proved?
40. What additional fact is needed to upgrade NP-hardness to NP-completeness?
41. Why does NP-completeness not prove an unconditional exponential lower bound?
42. Why can many practical instances of an NP-complete problem still be easy?

## Calculation exercises — iterative algorithms

For every exercise:

1. define the input-size variable;
2. identify the dominant operation;
3. derive an exact count or summation where practical;
4. give a tight asymptotic bound;
5. state auxiliary-space complexity.

### Exercise 1 — linear scan

```python
for index in range(n):
    work(index)
```

### Exercise 2 — consecutive scans

```python
for index in range(n):
    first(index)

for index in range(n):
    second(index)
```

Explain why the result is not quadratic.

### Exercise 3 — full square

```python
for left in range(n):
    for right in range(n):
        work(left, right)
```

### Exercise 4 — triangular loop

```python
for left in range(n):
    for right in range(left):
        work(left, right)
```

Write the exact summation.

### Exercise 5 — repeated multiplication

```python
step = 1
while step < n:
    step *= 3
```

Derive the logarithm from the stopping condition.

### Exercise 6 — mixed linear/logarithmic

```python
for _ in range(n):
    step = n
    while step > 1:
        step //= 2
```

### Exercise 7 — dependent harmonic-style work

```python
for d in range(1, n + 1):
    multiple = d
    while multiple <= n:
        work(d, multiple)
        multiple += d
```

Express total work as a sum involving `n/d`.

### Exercise 8 — hidden copying

```python
result = []
for value in range(n):
    result = result + [value]
```

Do not assume the loop body is constant time.

### Exercise 9 — strings

```python
for word in words:
    for symbol in word:
        process(symbol)
```

Compare analysis using `n = len(words)` with analysis using total character count `L`.

### Exercise 10 — adjacency lists

```python
for vertex in graph:
    for neighbour in graph[vertex]:
        process(vertex, neighbour)
```

State the result in terms of `V` and `E`.

## Asymptotic proof exercises

Use explicit constants and thresholds where requested.

### Exercise 11

Prove

\[
7n+20 \in O(n).
\]

Give one valid pair `(c,n₀)`.

### Exercise 12

Prove

\[
4n^2+3n+8 \in \Theta(n^2).
\]

Prove both upper and lower bounds.

### Exercise 13

Show that

\[
n^2 \notin O(n).
\]

Use the definition rather than an informal growth statement.

### Exercise 14

Explain why

\[
n \in O(n^3)
\]

is true but weak.

### Exercise 15

Order the following by asymptotic growth:

```text
log n
n!
n²
1
2^n
n log n
n³
n
```

## Recurrence exercises

For each recurrence, state the method used and analyse recursion depth separately when meaningful.

### Exercise 16 — linear recursion

\[
T(n)=T(n-1)+1.
\]

### Exercise 17 — increasing per-level work

\[
T(n)=T(n-1)+n.
\]

Solve by expansion.

### Exercise 18 — binary search

\[
T(n)=T(n/2)+1.
\]

### Exercise 19 — leaf-dominated divide and conquer

\[
T(n)=2T(n/2)+1.
\]

Use a recursion tree.

### Exercise 20 — merge-sort pattern

\[
T(n)=2T(n/2)+n.
\]

Use level costs.

### Exercise 21 — four subproblems

\[
T(n)=4T(n/2)+n.
\]

Compare `n` with `n^(log₂4)`.

### Exercise 22 — root-dominated work

\[
T(n)=2T(n/2)+n^2.
\]

Explain why the geometric sum of level costs is `Θ(n²)`.

### Exercise 23 — Master Theorem does not fit directly

\[
T(n)=T(n-1)+n.
\]

Explain why the standard divide-and-conquer form does not apply.

### Exercise 24 — recursion depth versus total work

For naive Fibonacci, explain why total work can be exponential while maximum active stack depth is only linear.

## Case and expectation exercises

### Exercise 25 — linear search

For an array of `n` elements, give best- and worst-case comparison counts.

Then assume the target is guaranteed present and every position is equally likely. Derive the expected comparison count.

### Exercise 26 — changed presence model

Assume the target is present with probability `p`; when present, every position is equally likely. Derive the expected number of comparisons.

### Exercise 27 — randomised Quicksort

Explain the difference between:

```text
expected running time over pivot randomness
```

and

```text
average running time over a distribution of input arrays.
```

## Amortised-analysis exercises

### Exercise 28 — dynamic array

Capacity doubles whenever full. Prove that `n` appends perform `O(n)` total element-copying work.

### Exercise 29 — bad growth policy

Capacity increases by one whenever full. Show that `n` appends can require `Θ(n²)` total copying.

### Exercise 30 — multipop stack

A stack begins empty and supports:

```text
push
pop
multipop(k)
```

Prove that any sequence of `m` operations performs at most `O(m)` successful element removals.

### Exercise 31 — terminology audit

For each statement, classify it as worst-case, expected, or amortised:

1. a randomised algorithm uses `Θ(n log n)` time in expectation;
2. one dynamic-array append may copy `n` elements;
3. `n` dynamic-array appends cost `Θ(n)` total under geometric growth;
4. hash lookup is constant under a specified expected hashing model.

## Scalability exercises

### Exercise 32 — crossover

Compare:

```text
A(n)=1000n
B(n)=n²
```

Find their positive crossover point and state which formula is smaller on either side.

### Exercise 33 — hardware speedup

An exact algorithm takes time proportional to `2^n`. Hardware becomes `1024` times faster. Approximately how much larger can `n` become for the same time budget?

### Exercise 34 — output lower bound

An algorithm must explicitly output all permutations of `n` elements. Explain why polynomial running time in `n` is impossible for explicit enumeration.

## Pseudopolynomial reasoning

### Exercise 35

A dynamic program runs in `O(nB)` where `B` is a positive integer written in binary.

Let

\[
b=\Theta(\log B).
\]

Rewrite the dependence on `B` informally in terms of `b` and explain why the algorithm is not necessarily polynomial in encoded input length.

### Exercise 36

How would the interpretation change if `B` were written in unary? Explain why encoding matters.

## Debugging claims

Explain precisely what is wrong or incomplete.

### Claim 1

> The algorithm has two loops, so it is `O(n²)`.

### Claim 2

> Big O always means worst-case complexity.

### Claim 3

> `3n+7` is not `O(n²)` because it is linear.

### Claim 4

> Recursive binary search uses constant space because each call performs constant work.

### Claim 5

> Merge sort has two recursive calls and logarithmic depth, so its time is `O(log n)`.

### Claim 6

> Dynamic-array append is worst-case `O(1)` because appends are usually cheap.

### Claim 7

> Amortised complexity is average-case complexity over random operation sequences.

### Claim 8

> The problem has `2^n` possible solutions, therefore it is NP-hard.

### Claim 9

> The certificate can be checked quickly, therefore the problem is in P.

### Claim 10

> NP means non-polynomial.

### Claim 11

> We reduced our new problem `B` to SAT, therefore `B` is NP-hard.

### Claim 12

> We proved known NP-complete `A ≤p B`, therefore `B` is NP-complete.

What important additional proof may still be missing?

### Claim 13

> We showed source yes implies target yes, so the reduction is complete.

### Claim 14

> An NP-complete problem must take exponential time on every input.

### Claim 15

> `O(nB)` is polynomial because it contains only multiplication of two variables.

## Verification exercises

For each problem, specify a certificate and a polynomial-time verification strategy.

### Exercise 37 — graph `k`-colourability

Certificate: one colour per vertex. State all checks.

### Exercise 38 — subset sum

Certificate: selected item indices. State how duplicates/indices and target equality are checked.

### Exercise 39 — Hamiltonian cycle

Certificate: a vertex ordering. State all checks and representation assumptions.

### Exercise 40 — SAT

Certificate: a truth assignment. Explain the cost of evaluating all clauses.

### Exercise 41 — CLIQUE

Certificate: `k` vertices. How many pairwise adjacency checks are needed?

## Reduction direction drills

For each goal, choose the useful reduction direction.

### Exercise 42

You know problem `A` is NP-complete and want to prove new problem `B` NP-hard.

Should you construct `A ≤p B` or `B ≤p A`? Explain operationally.

### Exercise 43

Suppose `B ≤p C` and `C` has a polynomial-time algorithm. What can you conclude about `B`?

### Exercise 44

Suppose `A ≤p B` and `A` is NP-hard. What can you conclude about `B`?

### Exercise 45

Suppose `A ≤p B` and `B ≤p C`. Explain why `A ≤p C`.

## Complete reduction exercise — Hamiltonian Cycle to TSP Decision

Reconstruct the proof without looking at the chapter.

### Exercise 46 — construction

Given graph `G=(V,E)` with `n=|V|`, define a complete weighted target graph using only edge weights `1` and `2`, and choose threshold `B`.

### Exercise 47 — polynomial bound

Bound target vertices, target edges, construction time, and encoding size.

### Exercise 48 — source yes → target yes

Show how a Hamiltonian cycle becomes a tour meeting the threshold.

### Exercise 49 — target yes → source yes

Explain why every edge of a target tour meeting the threshold must correspond to an original source edge.

### Exercise 50 — NP membership

Define a certificate for TSP Decision and a polynomial verifier.

## Complete reduction exercise — 3-SAT to CLIQUE

### Exercise 51 — construction

For a formula with `m` clauses, specify:

- the vertices;
- when two vertices are adjacent;
- target clique size `k`.

### Exercise 52 — polynomial bound

How many vertices are created? What is the maximum asymptotic number of possible edges?

### Exercise 53 — formula yes → clique yes

Why can one true literal be chosen from every satisfied clause, and why are chosen vertices pairwise adjacent?

### Exercise 54 — clique yes → formula yes

Why must an `m`-clique contain exactly one literal occurrence from every clause? Why are the selected literal requirements simultaneously satisfiable?

### Exercise 55 — CLIQUE in NP

What certificate is used and how many adjacency checks are needed?

## Reduction-audit problem

A student submits this proof:

> To prove `B` is NP-complete, take an instance of `B`, convert it to 3-SAT, and run a SAT solver. Since 3-SAT is NP-complete, `B` is NP-complete.

Identify every missing or incorrect element. Your answer should discuss:

- reduction direction;
- target/source roles;
- polynomial construction;
- equivalence of yes-instances;
- membership of `B` in NP;
- what conclusion the stated direction could support instead.

## Design and analysis problems

### Problem 1 — Compare membership representations

Analyse membership testing for:

- unsorted array;
- sorted array with binary search;
- balanced BST;
- hash set.

Separate preprocessing/update costs from query costs and state worst-case versus expected assumptions.

### Problem 2 — Output lower bound

Design an algorithm that generates every binary string of length `n`. State output count and explain why no explicit-output implementation can run in polynomial time in `n`.

### Problem 3 — Recursive versus iterative space

Compare recursive and iterative DFS on a path graph with `n` vertices. State time, auxiliary space, and where pending work is stored.

### Problem 4 — Complexity model audit

A Python implementation repeatedly concatenates immutable strings while building a result. Identify which high-level operations must be expanded before claiming linear time.

### Problem 5 — Multidimensional analysis

Analyse an algorithm that processes every vertex and every adjacency-list entry, then performs a binary-heap update for each edge. Express the result in terms of `V` and `E` rather than collapsing immediately to one variable.

### Problem 6 — Restricted hard problems

Explain why proving a general problem NP-hard does not prove that every restricted input class is NP-hard. Give a hypothetical restriction that could plausibly simplify the structure.

### Problem 7 — Exact versus heuristic guarantee

For a route-planning task, distinguish what must be shown to call an algorithm:

- exact;
- approximation with factor `α`;
- heuristic.

### Problem 8 — Build a verifier

Choose one of SAT, CLIQUE, Hamiltonian Cycle, or subset sum. Write pseudocode for the verifier and give a polynomial bound.

### Problem 9 — Build a reduction checklist

For a new target decision problem of your choice, write the complete proof skeleton needed before any NP-completeness claim could be accepted.

## Mastery checklist

You are ready to complete the course when you can honestly say:

- [ ] I define input size and encoding before counting.
- [ ] I state a cost model and recognise non-constant high-level operations.
- [ ] I distinguish time, auxiliary space, total space, and output cost.
- [ ] I derive tight bounds for standard loop patterns from counts or summations.
- [ ] I can prove simple `O`, `Ω`, and `Θ` relations from definitions.
- [ ] I do not confuse Big O with worst case.
- [ ] I can derive a recurrence from recursive code.
- [ ] I can solve standard recurrences by expansion and recursion-tree reasoning.
- [ ] I understand when the Master-Theorem pattern applies and when it does not.
- [ ] I separate total recursive work from recursion depth.
- [ ] I can compare growth classes and explain crossover points.
- [ ] I distinguish best, worst, average, expected, and amortised analyses.
- [ ] I can prove constant amortised append under geometric capacity growth.
- [ ] I can prove a multipop stack sequence has linear total removal work.
- [ ] I understand why polynomial time refers to encoded input length.
- [ ] I can explain pseudopolynomial complexity using a binary-encoded numeric parameter.
- [ ] I distinguish problem instances from problem families.
- [ ] I distinguish decision, search, and optimisation formulations.
- [ ] I can define certificates and polynomial verification.
- [ ] I can define P and NP and explain why `P ⊆ NP`.
- [ ] I do not interpret NP as “not polynomial”.
- [ ] I can read `A ≤p B` in the correct direction.
- [ ] I can distinguish NP-hard from NP-complete.
- [ ] I can audit construction time and target size in a reduction.
- [ ] I can prove both logical directions of a reduction.
- [ ] I can reconstruct Hamiltonian Cycle → TSP Decision.
- [ ] I can reconstruct 3-SAT → CLIQUE.
- [ ] I can state what NP-completeness proves and what remains unknown.

## Course conclusion

The course began with the question “what is an algorithm?” and now ends with a stronger framework:

```text
What problem is being solved?
What exactly does the algorithm guarantee?
Which representation supports its operations?
Why is it correct?
Why does it terminate?
What is the input size?
Which resource is being counted?
How does that resource grow?
What case or expectation is being analysed?
Can another algorithm improve the growth class?
Is the difficulty in this implementation or in the problem family?
Can difficulty be transferred through a polynomial reduction?
```

These questions form a durable method for designing, analysing, comparing, and communicating algorithms beyond any one programming language or one course.
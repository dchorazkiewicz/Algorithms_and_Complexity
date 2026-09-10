# Tractability and Hard Problems

## From difficult instances to difficult problem families

An input may be difficult for accidental reasons: it may be unusually large, badly ordered, dense, or adversarial for one particular implementation. Complexity theory asks a broader question:

> How does the best available exact method scale across an entire family of problem instances?

This changes the level of analysis. Earlier chapters studied cost functions for algorithms. Here we begin to classify computational problems themselves.

## Problems are families of instances

A computational problem is not one concrete input. It is a rule describing what output is required for every valid input instance.

For example:

```text
INSTANCE: a graph G and vertices s and t
QUESTION: is t reachable from s?
```

One graph is an instance. Graph reachability is the problem family.

This distinction matters because complexity classes contain problems, not individual difficult examples.

## Polynomial time as a theoretical tractability boundary

An algorithm runs in polynomial time when its running time is bounded by

\[
O(n^k)
\]

for some fixed constant `k`, where `n` measures the encoded input length.

Polynomial time is not identical to practical efficiency. An `O(n^100)` algorithm is polynomial but generally unusable. Conversely, an exponential algorithm can be useful for very small inputs.

Polynomial time is nevertheless a central theoretical boundary because:

- fixed-degree polynomial growth is fundamentally slower than exponential growth;
- polynomial-time algorithms compose with polynomial-time preprocessing and subroutines;
- polynomial changes in representation do not usually destroy the class;
- many important algorithmic problems admit polynomial exact solutions;
- the class P provides a robust mathematical notion of efficient solvability.

## Input length is crucial

The word “polynomial” refers to the **encoded input length**, not automatically to the numeric value of an input parameter.

If an integer `B` is written in binary, it uses only

\[
\Theta(\log B)
\]

bits.

Therefore an algorithm running in `O(B)` time may be exponential in the number of bits used to encode `B`.

This is the source of pseudopolynomial behaviour.

## Decision, search, and optimisation formulations

The same underlying application may be expressed in several forms.

### Decision problem

Return yes or no.

```text
Is there a travelling-salesperson tour of total cost at most B?
```

### Search problem

Produce a feasible witness if one exists.

```text
Find a tour of total cost at most B.
```

### Optimisation problem

Find the best possible solution.

```text
Find a minimum-cost tour.
```

Complexity classes such as NP are formally defined using decision problems. Search and optimisation versions are closely related for many classical problems, but their distinction should remain explicit.

## Why decision problems are enough for the theory

A yes/no formulation makes reductions and verification precise. It lets us ask whether a proposed certificate proves a yes-answer and whether one decision problem can simulate another.

For many self-reducible problems, repeated decision queries can reconstruct a solution, but that is an additional argument rather than part of the definition of NP.

## Exact algorithms

An exact algorithm always returns a correct optimal or required answer according to the problem definition.

Exact algorithms may be:

- polynomial;
- exponential;
- pseudopolynomial;
- parameterised;
- branch-and-bound procedures whose practical performance varies greatly.

“Exact” describes the guarantee, not the growth class.

## Approximation algorithms

An approximation algorithm returns a feasible solution together with a proven bound on how far its objective value can be from optimal.

For a minimisation problem, one might prove

\[
cost(A(I)) \le \alpha \cdot OPT(I)
\]

for every valid instance `I` and some approximation factor `α ≥ 1`.

This is stronger than an empirical statement that the method “usually works well”.

The detailed theory of approximation is outside the syllabus, but the distinction is important when discussing hard optimisation problems.

## Heuristics

A heuristic uses practical rules to find good solutions quickly but may provide no worst-case quality guarantee.

Examples include:

- local search;
- greedy constructions without a proof of optimality;
- random restarts;
- problem-specific search ordering.

A heuristic can be extremely valuable in practice. Its guarantee must simply be described accurately.

## Parameterised algorithms

A method may have running time such as

\[
O(2^k n^3),
\]

where `k` is a structural parameter.

This is not polynomial when `k` is unrestricted, but it may be practical when `k` is naturally small.

The full theory of fixed-parameter tractability is beyond this course. The useful lesson is that one large input-size measure does not always tell the entire practical story.

## Restricted instances can be easier

A hard general problem may become polynomial on a restricted input family.

Examples of restrictions include:

- trees instead of arbitrary graphs;
- bounded-degree graphs;
- fixed numbers of colours;
- bounded structural parameters;
- special geometric configurations.

A hardness classification of the general problem does not imply that every restricted special case is equally difficult.

## Exponential candidate spaces

Many problems have compact descriptions but enormous sets of possible solutions:

- subsets of `n` items: `2^n`;
- truth assignments to `n` Boolean variables: `2^n`;
- permutations: `n!`;
- `k`-colourings of `n` vertices: `k^n`.

This often explains why brute force is expensive.

However:

> A large candidate space does not prove computational hardness.

Binary search has `n` possible target positions but avoids testing all of them. Many dynamic-programming algorithms avoid enumerating exponentially many naïve combinations. Hardness requires a formal lower-bound argument or a reduction from an already hard problem.

## Enumeration cost and decision complexity are different

Generating every subset necessarily requires exponential output because there are `2^n` subsets.

But the decision question

```text
Does there exist a subset satisfying property P?
```

may or may not be hard. The exponential size of the set of candidates is not itself a complexity classification.

Output-sensitive enumeration and decision-problem hardness should therefore be kept separate.

## Pseudopolynomial time

An algorithm is **pseudopolynomial** when its running time is polynomial in numeric input values but not necessarily polynomial in their encoded length.

### Subset-sum dynamic programming

A standard dynamic-programming approach to subset sum with non-negative integers can run in

\[
O(nB),
\]

where `B` is the target sum.

If `B` is represented in binary, its bit length is

\[
b = \Theta(\log B).
\]

Then `B` may be as large as approximately `2^b`, making `O(nB)` exponential in `b`.

Thus `O(nB)` is not polynomial in the ordinary encoded input length.

## Why unary encoding changes the picture

If `B` were written in unary, its representation would itself require `Θ(B)` symbols. In that artificial representation, `O(nB)` would be polynomial in the input length.

This demonstrates that complexity is defined relative to an encoding and that “polynomial in a number” is not enough.

## Weak versus strong hardness — context only

Pseudopolynomial algorithms are related to the distinction between weak and strong NP-hardness. A weakly NP-hard problem may admit pseudopolynomial algorithms, while strongly NP-hard problems remain hard even when numeric magnitudes are polynomially bounded in an appropriate formal sense.

This distinction is useful context but is not required as a central learning outcome for this syllabus.

## Tractable does not mean trivial

Polynomial algorithms can still require substantial reasoning and sophisticated data structures.

Examples studied earlier include:

- balanced-tree operations;
- graph traversal;
- heap-based algorithms;
- divide-and-conquer sorting.

The classification describes growth, not conceptual simplicity.

## Hard does not mean impossible

When a decision or optimisation problem is computationally hard in the classical sense, useful approaches may still include:

- exact exponential search for small instances;
- pruning and branch and bound;
- dynamic programming on restricted parameters;
- approximation algorithms;
- parameterised algorithms;
- heuristics;
- preprocessing and kernel-like reductions;
- algorithms for special cases.

Complexity theory tells us which guarantees are unlikely to scale under current knowledge. It does not tell us to stop solving practical instances.

## A problem can be hard while many instances are easy

Worst-case hardness concerns the existence of difficult instances of arbitrarily large size. It does not imply that every input is difficult.

A SAT solver may solve many large practical formulas quickly even though SAT is NP-complete. This does not contradict the worst-case classification.

The distinction between worst-case theory and empirical instance difficulty is essential.

## Lower bounds require a model and a claim level

There are several possible statements:

```text
this implementation takes Ω(n²)
this algorithm requires Ω(n²) under these assumptions
any comparison-based algorithm for this problem requires Ω(n log n)
this decision problem is NP-hard
```

These claims have very different strength and require different proofs.

Counting one implementation cannot establish NP-hardness.

## Reduction as a transfer of difficulty

The next chapter formalises the central tool used to compare problem difficulty: a polynomial-time reduction.

Informally, if every instance of problem `A` can be translated efficiently into an equivalent instance of problem `B`, then an efficient solver for `B` would also solve `A` efficiently.

That is why the reduction direction

```text
known hard problem → target problem
```

is used to transfer hardness to the target.

## A guarantee hierarchy

When discussing an algorithm for a hard problem, distinguish statements such as:

```text
exact polynomial-time algorithm
exact pseudopolynomial algorithm
exact exponential algorithm
approximation with proven ratio
parameterised guarantee
heuristic with empirical evidence
```

These are not interchangeable claims.

## Common mistakes

### Mistake 1 — polynomial means fast

Polynomial time is a theoretical class, not a latency guarantee.

### Mistake 2 — exponential candidate space proves NP-hardness

Candidate counting explains brute-force cost but not problem-class hardness.

### Mistake 3 — search, optimisation, and decision are identical by definition

They are related formulations but complexity classes such as NP are defined on decision problems.

### Mistake 4 — `O(nB)` is automatically polynomial

Only if `B` itself contributes proportional encoding length, which binary encoding does not provide.

### Mistake 5 — NP-hard means every instance is hard

Hardness is a worst-case statement about a problem family.

### Mistake 6 — heuristic means incorrect

A heuristic may always return a feasible answer while lacking an optimality guarantee. Correctness and optimality are different properties.

### Mistake 7 — NP-hard means unsolvable

Hard problems can still be solved exactly on modest inputs or approached through restrictions, approximation, parameters, and heuristics.

## What you must be able to explain

- What is the difference between a problem and one instance?
- Why is polynomial time defined in terms of encoded input length?
- Why is polynomial not synonymous with practical?
- How do decision, search, and optimisation formulations differ?
- Why are complexity classes such as NP formulated for decision problems?
- What guarantee distinguishes exact, approximation, and heuristic methods?
- Why does an exponential candidate set not prove hardness?
- Why is explicit exponential output different from NP-hardness?
- Why can `O(nB)` be pseudopolynomial when `B` is binary encoded?
- Why may a hard general problem have easy restricted cases?
- Why does worst-case hardness not imply that every instance is difficult?
- How does a reduction transfer difficulty from one problem to another?

# Tractability and Hard Problems

## From difficult instances to difficult problem families

An input can be difficult for accidental reasons: it may be large, poorly ordered, or adversarial. Complexity theory asks a broader question:

> How does the best known exact algorithm scale across all instances of a problem family?

This moves the discussion from one implementation to the inherent computational demands of a problem.

## Polynomial time as a tractability boundary

Algorithms with running time `O(n^k)` for a fixed constant `k` are called polynomial-time algorithms.

Polynomial time is not synonymous with practical efficiency. An `O(n^100)` algorithm is polynomial but unusable. Still, polynomial growth is stable under composition and is qualitatively different from exponential growth.

For this reason, polynomial time is the conventional theoretical boundary for **tractability**.

## Decision, search, and optimisation problems

A problem may appear in several forms.

### Decision

Does a solution satisfying a condition exist?

```text
Is there a route of total length at most B?
```

### Search

Produce such a solution.

```text
Find a route of total length at most B.
```

### Optimisation

Find the best solution.

```text
Find a shortest route.
```

Complexity classes such as NP are formally defined for decision problems. Search and optimisation versions are related but should not be conflated with the formal definition.

## Exponential search spaces

Many hard problems have compact inputs but enormous candidate spaces:

- subsets: `2^n` candidates;
- truth assignments to `n` Boolean variables: `2^n` candidates;
- permutations: `n!` candidates;
- colour assignments with `k` colours: `k^n` candidates.

A large search space alone does not prove hardness. Some problems admit clever algorithms that avoid enumerating candidates. Hardness claims require reductions or lower-bound arguments, not merely counting possibilities.

## Exact, approximation, and heuristic methods

When exact polynomial-time algorithms are unknown, practical approaches may include:

- exact exponential algorithms with pruning;
- dynamic programming over restricted structure;
- approximation algorithms with proven quality bounds;
- parameterised algorithms efficient for small parameters;
- heuristics without worst-case quality guarantees;
- special-case algorithms for structured inputs.

The guarantee must be stated honestly. “Works well in tests” is not the same as “always optimal”.

## Pseudopolynomial time

An algorithm may be polynomial in a numeric value but exponential in the number of bits used to encode that value.

For example, a dynamic program taking `O(nB)` time is not polynomial in the input length when `B` is represented in binary and may be exponentially large relative to its bit length.

Such algorithms are called **pseudopolynomial**.

## What you must be able to explain

- Why is polynomial time used as a theoretical tractability boundary?
- Why is polynomial not identical to practical?
- How do decision, search, and optimisation formulations differ?
- Why does an exponential candidate set not by itself prove hardness?
- What guarantees distinguish exact, approximation, and heuristic methods?
- Why can `O(nB)` be pseudopolynomial rather than polynomial?
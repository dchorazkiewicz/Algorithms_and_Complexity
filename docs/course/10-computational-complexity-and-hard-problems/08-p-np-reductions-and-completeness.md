# P, NP, Reductions, and NP-Completeness

## Certificates and verification

A decision problem belongs to **NP** when every yes-instance has a certificate that can be verified in polynomial time by a deterministic algorithm.

Examples of certificates:

- a proposed satisfying truth assignment;
- a proposed Hamiltonian cycle;
- a subset whose values sum to a target;
- a colouring using at most `k` colours.

The verifier checks the proposed solution. It does not have to discover it.

## Class P

**P** is the class of decision problems solvable in polynomial time by a deterministic algorithm.

Every problem in P is also in NP: if we can solve the problem efficiently, we can certainly verify a yes-answer efficiently.

\[
P \subseteq NP.
\]

Whether `P = NP` remains unresolved.

## NP does not mean non-polynomial

The name historically refers to nondeterministic polynomial time. It does not mean “not polynomial”. Because `P ⊆ NP`, many problems in NP are polynomial-time solvable.

## Polynomial-time reductions

A polynomial-time reduction from problem `A` to problem `B` transforms every instance `x` of `A` into an instance `f(x)` of `B` such that:

```text
x is a yes-instance of A
if and only if
f(x) is a yes-instance of B
```

and the transformation itself takes polynomial time.

We write:

\[
A \le_p B.
\]

The direction matters. If `A` reduces to `B`, then an efficient algorithm for `B` would give an efficient algorithm for `A`. Thus `B` is at least as hard as `A` under this reduction.

## NP-hard

A problem is **NP-hard** when every problem in NP can be reduced to it in polynomial time.

An NP-hard problem need not itself be a decision problem or belong to NP. Optimisation problems can be NP-hard.

## NP-complete

A decision problem is **NP-complete** when:

1. it belongs to NP;
2. it is NP-hard.

To prove a new problem `B` NP-complete, a typical structure is:

1. show that certificates for `B` can be verified in polynomial time;
2. choose a known NP-complete problem `A`;
3. construct a polynomial-time reduction `A ≤p B`;
4. prove both directions of the yes-instance equivalence.

## Reduction-direction mistake

To show that `B` is hard, reducing `B` to a known hard problem `A` is generally insufficient. That only shows that `B` can be solved using `A`.

The required hardness direction is:

```text
known hard problem A  →  new problem B
```

## Example relationship: Hamiltonian cycle and TSP decision

A Hamiltonian-cycle instance can be transformed into a weighted complete graph where original edges have low cost and non-edges high cost. A sufficiently small tour exists exactly when the original graph has a Hamiltonian cycle.

The important point is not memorising the construction, but seeing the reduction obligations:

- polynomial construction time;
- yes maps to yes;
- no maps to no.

## What an NP-completeness result means

It does not prove that no polynomial algorithm exists. Such a proof would resolve `P` versus `NP`.

It means that a polynomial-time algorithm for one NP-complete problem would yield polynomial-time algorithms for every problem in NP.

## What you must be able to explain

- What is a certificate?
- Why is `P ⊆ NP`?
- Why does NP not mean “not polynomial”?
- What does `A ≤p B` allow us to conclude?
- Why does reduction direction matter?
- What two conditions define NP-completeness?
- Why does NP-completeness not prove unconditional exponential lower bounds?
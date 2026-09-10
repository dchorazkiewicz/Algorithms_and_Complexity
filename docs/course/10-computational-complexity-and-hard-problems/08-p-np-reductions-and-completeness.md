# P, NP, Reductions, and NP-Completeness

!!! note "Terminology used in this course"
    The English syllabus contains the phrase **“N- and NP-complete problems”**, mirroring the wording of the source document. Standard complexity-theory terminology does not define a corresponding class `N` in this context. This course therefore interprets that syllabus item using the established concepts **P**, **NP**, **NP-hard**, and **NP-complete**.

## Decision problems first

The complexity classes in this chapter are defined for **decision problems**: problems whose output is yes or no.

Examples:

```text
PATH:
Given graph G and vertices s,t, is there a path from s to t?

HAMILTONIAN-CYCLE:
Does graph G contain a cycle visiting every vertex exactly once?

3-SAT:
Does a given 3-CNF Boolean formula have a satisfying truth assignment?

TSP-DECISION:
Does a weighted graph contain a tour of total cost at most B?
```

Search and optimisation versions are important in practice, but decision formulations give us the formal language needed for P, NP, and reductions.

## Certificates and verification

A **certificate** is additional information proposed as evidence that a yes-instance really has answer yes.

Examples:

- for SAT: a truth assignment;
- for Hamiltonian cycle: an ordered sequence of vertices;
- for graph `k`-colourability: one colour per vertex;
- for subset sum: a selected subset or indices;
- for TSP decision: a proposed tour.

A **verifier** receives the original instance and certificate and checks whether the certificate proves a yes-answer.

The verifier does not have to discover the certificate.

## Example verifier — Hamiltonian cycle

Suppose the certificate is a sequence

```text
v1, v2, ..., vn
```

for a graph with `n` vertices.

A verifier checks:

1. the certificate contains exactly `n` vertex entries;
2. every graph vertex appears exactly once;
3. every consecutive pair is connected by an edge;
4. `vn` is connected back to `v1`.

With a suitable graph representation and a set for duplicate detection, these checks take polynomial time.

Therefore Hamiltonian cycle has polynomially verifiable yes-certificates.

## Class P

**P** is the class of decision problems solvable in polynomial time by a deterministic algorithm.

Examples of decision problems in P include:

- graph reachability;
- whether an array contains a target;
- whether a graph is connected;
- whether a shortest-path distance is at most a given threshold when standard non-negative-weight shortest-path assumptions hold.

The exact algorithm matters, but membership in P means that **some** deterministic polynomial-time algorithm solves every valid instance.

## Class NP

A decision problem belongs to **NP** when every yes-instance has a certificate of polynomial length that can be verified in polynomial time by a deterministic algorithm.

An equivalent formal definition uses nondeterministic polynomial time, but certificate verification is the most useful viewpoint for this course.

The crucial distinction is:

```text
finding a certificate
versus
checking a proposed certificate
```

NP requires efficient verification, not a known efficient discovery algorithm.

## Why P is contained in NP

If a decision problem can be solved in polynomial time, then a verifier can simply solve the problem itself and ignore any certificate.

Therefore

\[
P \subseteq NP.
\]

Whether the inclusion is strict remains unknown:

\[
P \stackrel{?}{=} NP.
\]

As of current mathematical knowledge, no proof of either `P = NP` or `P ≠ NP` is known.

## NP does not mean “non-polynomial”

The name NP historically refers to **nondeterministic polynomial time**.

It does not mean “not polynomial”. Since

\[
P \subseteq NP,
\]

every problem in P is also in NP.

The statement

```text
problem X is in NP
```

therefore does not imply that X is hard.

## Polynomial-time many-one reductions

A polynomial-time reduction from decision problem `A` to decision problem `B` is a polynomial-time computable transformation `f` such that

\[
x \in A
\iff
f(x) \in B.
\]

We write

\[
A \le_p B.
\]

The transformation converts every instance of `A` into one instance of `B` while preserving the yes/no answer.

## What the reduction direction means

If

\[
A \le_p B,
\]

then an efficient algorithm for `B` would give an efficient algorithm for `A`:

```text
instance x of A
      ↓ polynomial transformation f
instance f(x) of B
      ↓ solve B
answer for A
```

Thus `B` is at least as hard as `A` with respect to polynomial-time reductions.

To show that a new problem `B` is hard, the useful direction is normally

```text
known hard problem A  →  new target problem B
```

not the reverse.

## Why the reverse direction is insufficient for hardness

Suppose we know SAT is hard and show

\[
B \le_p SAT.
\]

This says that SAT can be used to solve `B`. It places an upper relation on `B`; it does not show that SAT can be solved using `B`.

Therefore this direction alone does not transfer SAT's hardness to `B`.

## NP-hard

A problem `B` is **NP-hard** if every problem in NP can be reduced to `B` in polynomial time.

In practice, once a problem `A` is already known NP-hard, showing

\[
A \le_p B
\]

is enough to prove that `B` is NP-hard by transitivity of reductions.

An NP-hard problem need not itself belong to NP. It may even be an optimisation problem rather than a decision problem.

## NP-complete

A decision problem `B` is **NP-complete** when both conditions hold:

1. `B ∈ NP`;
2. `B` is NP-hard.

A standard proof structure is therefore:

```text
Part A — membership:
show B ∈ NP

Part B — hardness:
choose known NP-complete A
construct A ≤p B
prove the construction polynomial
prove x ∈ A iff f(x) ∈ B
```

Leaving out either major part makes an NP-completeness proof incomplete.

## Reduction proof obligations

For a concrete reduction, verify all of the following.

### 1. Source and target instances are defined

State exactly what an input to `A` contains and what an input to `B` contains.

### 2. Construction is explicit

Describe how every component of the target instance is built from the source instance.

### 3. Construction is polynomial

Bound both:

- the time needed to build the target;
- the size of the target instance.

A transformation that produces exponentially many output symbols cannot be a polynomial-time many-one reduction.

### 4. Yes maps to yes

Prove

\[
x \in A \Rightarrow f(x) \in B.
\]

### 5. Target yes implies source yes

Prove

\[
f(x) \in B \Rightarrow x \in A.
\]

Together these establish the required iff relation.

### 6. NP membership is separate

If NP-completeness is claimed, show independently that the target problem belongs to NP.

## Complete reduction 1 — Hamiltonian Cycle to TSP Decision

We now carry out a full reduction rather than only naming the two problems.

### Source problem

**HAMILTONIAN-CYCLE**

Input: an undirected graph

\[
G=(V,E).
\]

Question: does `G` contain a cycle that visits every vertex exactly once and returns to the start?

Hamiltonian Cycle is a standard NP-complete problem.

### Target problem

**TSP-DECISION**

Input:

- a complete weighted graph `G'`;
- a bound `B`.

Question: is there a tour visiting every vertex exactly once and returning to the start with total weight at most `B`?

### Construction

Let

\[
n=|V|.
\]

Create a complete graph `G'` with the same vertex set `V`.

For every unordered pair of distinct vertices `{u,v}`, define weight

\[
w(u,v)=
\begin{cases}
1, & \text{if } \{u,v\}\in E,\\
2, & \text{if } \{u,v\}\notin E.
\end{cases}
\]

Set

\[
B=n.
\]

The resulting TSP instance asks whether there is a tour of total cost at most `n`.

### Polynomial construction

The complete target graph contains `n` vertices and `Θ(n²)` edges.

Checking whether each pair belongs to `E` and assigning weight `1` or `2` can be performed in polynomial time using a suitable representation of the source graph.

The target size is also polynomial in the source size.

### Yes → yes

Assume `G` has a Hamiltonian cycle.

That cycle uses exactly `n` edges, and every one of those edges belongs to `E`. Therefore every corresponding edge in `G'` has weight `1`.

The same vertex order is a TSP tour of total cost

\[
n.
\]

Since `B=n`, the TSP instance is a yes-instance.

### Target yes → source yes

Assume `G'` has a tour of total cost at most `n`.

Every TSP tour on `n` vertices uses exactly `n` edges, including the return edge to the start.

Every edge weight is either `1` or `2`, so every tour has cost at least `n`.

A tour with cost at most `n` must therefore have cost exactly `n`, which is possible only if **all** its edges have weight `1`.

By construction, weight-`1` edges correspond exactly to edges of the original graph `G`.

Thus the same tour is a Hamiltonian cycle in `G`.

### Conclusion

We have proved

\[
G \text{ has a Hamiltonian cycle}
\iff
f(G) \text{ has a TSP tour of cost } \le n.
\]

Hence

\[
HAMILTONIAN\text{-}CYCLE \le_p TSP\text{-}DECISION.
\]

Therefore TSP-DECISION is NP-hard.

### Membership of TSP Decision in NP

A certificate is a proposed tour. A verifier can check in polynomial time that:

- every vertex occurs exactly once;
- the tour returns to the start;
- every required edge is represented;
- the sum of edge weights is at most `B`.

Therefore

\[
TSP\text{-}DECISION \in NP.
\]

Together with NP-hardness, this establishes NP-completeness of the decision version under the standard assumptions of the problem definition.

## Complete reduction 2 — 3-SAT to CLIQUE

This example demonstrates a different style of construction: consistency among selected literal occurrences becomes pairwise adjacency in a graph.

### Source problem

**3-SAT**

Input: a Boolean formula in conjunctive normal form with exactly three literal occurrences per clause:

\[
C_1 \land C_2 \land \cdots \land C_m.
\]

Question: does there exist a truth assignment satisfying every clause?

3-SAT is a standard NP-complete problem.

### Target problem

**CLIQUE**

Input:

- a graph `G`;
- an integer `k`.

Question: does `G` contain a set of `k` vertices in which every pair of selected vertices is connected by an edge?

### Construction

For each literal occurrence in each clause, create one graph vertex.

Thus each clause contributes three vertices. Label a vertex by both its clause and literal, because the same literal appearing in two clauses creates two distinct occurrences.

Do **not** connect vertices from the same clause.

For vertices belonging to different clauses, add an edge exactly when their literals are not contradictory.

For example:

```text
x     is contradictory with ¬x
¬y    is contradictory with y
x     is compatible with x, y, ¬z, ...
```

Set

\[
k=m,
\]

the number of clauses.

### Polynomial construction

The graph has `3m` vertices.

There are at most

\[
\binom{3m}{2}=O(m^2)
\]

candidate vertex pairs to inspect.

For each pair we check clause identity and whether the literals are complementary. Therefore the graph is built in polynomial time and has polynomial size.

### Yes → yes

Assume the 3-CNF formula is satisfiable.

Every clause contains at least one literal that is true under the satisfying assignment. Choose one true literal occurrence from each clause.

This gives exactly `m` chosen vertices.

Consider any two chosen vertices:

- they come from different clauses because we chose one per clause;
- their literals cannot be contradictory, because a single truth assignment cannot make both `x` and `¬x` true.

Therefore every pair is connected by an edge.

The chosen vertices form a clique of size `m`.

Hence the constructed CLIQUE instance is a yes-instance.

### Target yes → source yes

Assume the constructed graph contains a clique of size `m`.

No two vertices from the same clause are connected. Therefore a clique can contain at most one vertex from each clause.

There are exactly `m` clauses and the clique has `m` vertices, so the clique contains exactly one literal occurrence from every clause.

Because every pair of clique vertices is connected, no two selected literals are contradictory. In particular, the clique never selects both `x` and `¬x`.

Assign truth values so that every selected literal becomes true. This is consistent because the selected literals contain no contradictory pair. Variables not constrained by the selected literals may be assigned arbitrarily.

Each clause has one selected literal, and that literal is true. Therefore every clause is satisfied.

Hence the original 3-SAT formula is satisfiable.

### Conclusion

We have proved

\[
\varphi \in 3\text{-}SAT
\iff
f(\varphi) \text{ contains a clique of size } m.
\]

Therefore

\[
3\text{-}SAT \le_p CLIQUE.
\]

This proves CLIQUE is NP-hard.

### Membership of CLIQUE in NP

A certificate is a list of `k` vertices.

A verifier checks:

- exactly `k` distinct vertices are listed;
- every pair among them is an edge.

There are

\[
\binom{k}{2}=O(k^2)
\]

pairs, so verification is polynomial.

Thus CLIQUE belongs to NP, and together with NP-hardness it is NP-complete.

## Why the two reductions are worth comparing

The Hamiltonian-Cycle-to-TSP reduction preserves a **tour structure** and encodes forbidden source edges through larger weights.

The 3-SAT-to-CLIQUE reduction translates **logical consistency** into graph adjacency.

Both follow the same proof architecture:

```text
source instance
→ polynomial construction
→ target instance
→ yes iff yes
```

but the construction idea is problem-specific.

## Reduction correctness is an iff obligation

A frequent incomplete proof shows only:

```text
source yes → target yes
```

This is insufficient. The target construction might accidentally create extra yes-instances that have no corresponding source solution.

The reverse implication prevents such false positives.

## Polynomial output size matters

A reduction is not allowed to hide exponential work inside its construction.

For example, “generate every possible source solution and encode the successful one” is not a useful polynomial reduction if there are exponentially many candidates.

The transformation itself must be efficient.

## Transitivity of polynomial reductions

If

\[
A \le_p B
\]

and

\[
B \le_p C,
\]

then

\[
A \le_p C.
\]

The two polynomial transformations can be composed, and the composition remains polynomial.

This is why reducing one known NP-complete problem to a new target is sufficient for NP-hardness; we do not need to reduce every NP problem individually each time.

## What NP-completeness tells us

If an NP-complete problem had a deterministic polynomial-time algorithm, then every problem in NP would have one.

Thus a polynomial algorithm for any NP-complete problem would imply

\[
P=NP.
\]

This is why NP-complete problems are viewed as representatives of the hardest problems inside NP under polynomial reductions.

## What NP-completeness does not tell us

An NP-completeness proof does **not** establish that:

- every instance is difficult;
- every exact algorithm is exponential;
- no polynomial algorithm can exist;
- heuristics are useless;
- approximation is impossible;
- special cases cannot be easy.

Proving that no polynomial algorithm exists for an NP-complete problem would in particular prove `P ≠ NP`, which remains unresolved.

## NP-hard versus NP-complete

Keep the distinction explicit:

```text
NP-hard:
hardness relation; membership in NP not required

NP-complete:
NP-hard + belongs to NP + decision problem
```

An optimisation version of TSP is commonly described as NP-hard, while the standard threshold decision version is NP-complete.

## A reduction-audit template

Before accepting a proof that target problem `B` is NP-complete, answer:

```text
1. Is B a decision problem?
2. What certificate proves a yes-instance of B?
3. Why is verification polynomial?
4. Which known NP-hard/NP-complete source problem A is used?
5. Is the direction A → B?
6. How is f(x) constructed?
7. Why is the construction polynomial in source input length?
8. Why does source yes imply target yes?
9. Why does target yes imply source yes?
10. What conclusion follows: NP-hard or NP-complete?
```

If any item is missing, the proof needs more work.

## Common mistakes

### Mistake 1 — NP means not polynomial

NP is defined through polynomial verification, and P is contained in NP.

### Mistake 2 — fast verification implies P

Fast verification establishes NP membership, not necessarily polynomial-time solvability.

### Mistake 3 — reducing the target to a known hard problem proves target hardness

For hardness transfer, use the direction from known hard source to target.

### Mistake 4 — proving only yes-to-yes

A reduction must preserve the answer in both directions.

### Mistake 5 — ignoring construction size

An exponentially large target instance invalidates a polynomial-reduction claim.

### Mistake 6 — NP-hard automatically means NP-complete

NP membership must also be proved for the target decision problem.

### Mistake 7 — NP-complete means proven exponential lower bound

That would overstate what is currently known about `P` versus `NP`.

### Mistake 8 — certificates may be exponentially long

NP verification requires certificates bounded by polynomial length in the input size.

## What you must be able to explain

- What is a decision problem?
- What is a certificate and what does a verifier do?
- Why does polynomial-time solvability imply polynomial-time verifiability?
- Why does NP not mean “not polynomial”?
- What does `A ≤p B` mean operationally?
- Why does the reduction direction matter for hardness?
- Why must the target construction itself be polynomial in time and size?
- What two logical directions must a reduction proof establish?
- What is the difference between NP-hard and NP-complete?
- How does the Hamiltonian-Cycle-to-TSP construction encode forbidden edges?
- Why does a TSP tour of cost at most `n` in that construction use only original graph edges?
- How does the 3-SAT-to-CLIQUE construction encode non-contradictory choices?
- Why does a clique of size `m` select exactly one literal from every clause?
- What would a polynomial algorithm for one NP-complete problem imply?
- What does NP-completeness not prove about individual instances or unavoidable exponential time?

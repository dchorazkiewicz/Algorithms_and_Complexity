# Asymptotic Notation

## Why exact formulas are not enough

Suppose one algorithm performs `3n + 7` operations and another performs `n² + 2n`. For small inputs, constants may dominate. For sufficiently large `n`, the growth rate becomes decisive.

Asymptotic notation describes growth while ignoring constant factors and lower-order terms.

## Big O — an asymptotic upper bound

We write

\[
f(n) \in O(g(n))
\]

when there exist constants `c > 0` and `n₀` such that

\[
0 \le f(n) \le c g(n)
\]

for all `n ≥ n₀`.

Thus `3n + 7 ∈ O(n)`, because beyond a suitable threshold it is bounded by a constant multiple of `n`.

Big O does not mean “exactly equal to” and does not automatically mean “worst case”. It is an upper-bound relation. A worst-case running-time function may then be described using Big O.

## Big Omega — a lower bound

We write

\[
f(n) \in \Omega(g(n))
\]

when `f` eventually grows at least as fast as a positive constant multiple of `g`.

For example, `3n + 7 ∈ Ω(n)`.

## Big Theta — a tight asymptotic bound

We write

\[
f(n) \in \Theta(g(n))
\]

when both

\[
f(n) \in O(g(n))
\]

and

\[
f(n) \in \Omega(g(n)).
\]

Therefore `3n + 7 ∈ Θ(n)`.

## Simplification rules

For non-negative cost functions:

- discard constant factors: `7n ∈ Θ(n)`;
- discard lower-order terms: `n² + 10n + 4 ∈ Θ(n²)`;
- sequential costs add, and the fastest-growing term dominates;
- nested independent loops often multiply;
- logarithm bases differ only by a constant factor.

Examples:

```text
5n³ + 2n² + 100 ∈ Θ(n³)
log₂ n ∈ Θ(log₁₀ n)
3n log n + 8n ∈ Θ(n log n)
```

## Sets, not equations

Strictly, `O(n)` denotes a set of functions. Writing `T(n) = O(n)` is conventional shorthand for `T(n) ∈ O(n)`.

A linear function is also in `O(n²)`, because `n ≤ n²` for `n ≥ 1`. But `Θ(n)` is more informative when the linear bound is tight.

## Common mistakes

### Mistake 1 — Big O means exact complexity

`O(n²)` may be a valid but loose upper bound for a linear algorithm.

### Mistake 2 — constants never matter

Constants do not change the asymptotic class, but they can matter substantially for realistic input sizes.

### Mistake 3 — worst case is built into Big O

Best-case, average-case, and worst-case functions can each be expressed with Big O, Omega, or Theta.

### Mistake 4 — every nested loop is quadratic

The number of iterations must be counted. A loop that repeatedly halves a variable is logarithmic even when written inside another loop.

## What you must be able to explain

- What inequality defines Big O?
- Why is `Θ` stronger than `O`?
- Why is a linear function also in `O(n²)`?
- Why can lower-order terms be discarded asymptotically?
- Why do constants still matter in engineering?
- Why is Big O not synonymous with worst case?
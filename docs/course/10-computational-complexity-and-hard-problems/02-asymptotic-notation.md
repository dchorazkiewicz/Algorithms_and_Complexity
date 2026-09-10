# Asymptotic Notation

## Why exact formulas are not enough

Suppose one algorithm performs

\[
3n + 7
\]

operations and another performs

\[
n^2 + 2n.
\]

Exact formulas are useful, but when `n` becomes large the dominant growth rate determines how rapidly the cost increases. Asymptotic notation describes that growth while deliberately ignoring constant factors and lower-order terms.

The notation is not a replacement for counting. The recommended order is:

```text
execution pattern
      ↓
count or recurrence
      ↓
growth function
      ↓
asymptotic bound
```

## Big O — an asymptotic upper bound

We write

\[
f(n) \in O(g(n))
\]

when there exist constants `c > 0` and `n_0` such that

\[
0 \le f(n) \le c g(n)
\]

for every `n ≥ n_0`.

The constants may depend on the functions being compared, but not on `n`.

### Proving that `3n + 7 ∈ O(n)`

We need constants `c` and `n_0` such that

\[
3n + 7 \le cn
\]

for all sufficiently large `n`.

For `n ≥ 1`,

\[
7 \le 7n,
\]

so

\[
3n + 7 \le 10n.
\]

Therefore one valid choice is

```text
c = 10
n_0 = 1
```

and hence

\[
3n + 7 \in O(n).
\]

These constants are not unique. We only need to prove that suitable constants exist.

## A valid but loose upper bound

Because

\[
n \le n^2
\]

for `n ≥ 1`, every linear function is also asymptotically bounded above by a constant multiple of `n²`.

Thus

\[
3n + 7 \in O(n^2)
\]

is true.

But it is less informative than

\[
3n + 7 \in O(n).
\]

This is why a correct Big-O claim can still be a poor description.

## Big Omega — an asymptotic lower bound

We write

\[
f(n) \in \Omega(g(n))
\]

when there exist constants `c > 0` and `n_0` such that

\[
0 \le c g(n) \le f(n)
\]

for all `n ≥ n_0`.

### Proving that `3n + 7 ∈ Ω(n)`

For every `n ≥ 1`,

\[
3n \le 3n + 7.
\]

Choose

```text
c = 3
n_0 = 1
```

and the definition is satisfied. Therefore

\[
3n + 7 \in \Omega(n).
\]

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

Equivalently, there exist positive constants `c_1`, `c_2`, and `n_0` such that

\[
0 \le c_1 g(n) \le f(n) \le c_2 g(n)
\]

for all `n ≥ n_0`.

Since we proved both an upper and a lower linear bound,

\[
3n + 7 \in \Theta(n).
\]

`Θ` expresses that `g(n)` captures the growth rate from both sides up to constant factors.

## Why `Θ` is stronger than `O`

Consider an algorithm whose running time is exactly

\[
T(n) = 5n + 20.
\]

The following statements are all true:

```text
T(n) ∈ O(n)
T(n) ∈ O(n log n)
T(n) ∈ O(n²)
T(n) ∈ O(n³)
```

But

\[
T(n) \in \Theta(n)
\]

identifies the tight asymptotic class.

A good analysis normally reports the tightest useful bound that has been justified.

## `O`, `Ω`, and `Θ` are sets of functions

Strictly, `O(g(n))` denotes a set of functions that eventually grow no faster than a constant multiple of `g(n)`.

Thus

\[
f(n) \in O(g(n))
\]

is mathematically precise.

In algorithm literature one commonly sees shorthand such as

```text
T(n) = O(n)
```

which is conventionally understood as membership in the asymptotic class.

## Simplifying polynomial expressions

For non-negative cost functions, the highest-order term dominates asymptotically.

### Example

\[
f(n) = 5n^3 + 2n^2 + 11n + 100.
\]

For `n ≥ 1`,

\[
2n^2 \le 2n^3,
\]

\[
11n \le 11n^3,
\]

and

\[
100 \le 100n^3.
\]

Therefore

\[
f(n) \le 118n^3.
\]

Also

\[
f(n) \ge 5n^3.
\]

Hence

\[
f(n) \in \Theta(n^3).
\]

The usual rule “drop lower-order terms and constants” is a shortcut justified by inequalities like these.

## Logarithm bases do not matter asymptotically

The change-of-base formula gives

\[
\log_a n = \frac{\log_b n}{\log_b a}.
\]

The denominator is a positive constant, so

\[
\log_a n \in \Theta(\log_b n)
\]

for any fixed bases `a, b > 1`.

Thus complexity analysis usually writes simply

\[
\Theta(\log n).
\]

The base still matters for exact operation counts and implementation constants.

## Products and sums

### Sequential phases add

If one phase costs `Θ(n)` and a later independent phase costs `Θ(n²)`, then

\[
\Theta(n) + \Theta(n^2) = \Theta(n^2).
\]

The larger growth term dominates.

### Nested repeated work can multiply

If an outer process repeats `n` times and performs `Θ(log n)` work each time, the total is

\[
\Theta(n \log n).
\]

The actual iteration count must be derived; indentation alone does not determine complexity.

## Common growth ordering

For sufficiently large `n`, the following familiar classes grow in this order:

\[
1
< \log n
< n
< n\log n
< n^2
< n^3
< 2^n
< n!.
\]

This ordering is asymptotic. It says nothing about which implementation is faster for every small input.

## Big O does not mean worst case

This is one of the most persistent mistakes.

Big O is an **upper-bound relation**. Best-case, worst-case, average-case, and expected running-time functions can all be expressed using `O`, `Ω`, or `Θ`.

For linear search:

```text
best-case time:  Θ(1)
worst-case time: Θ(n)
```

Both are tight asymptotic statements about different cost functions.

The word “worst” comes from the definition of the worst-case function, not from the symbol `O`.

## Big Omega is not automatically a problem lower bound

Another important distinction:

```text
this implementation takes Ω(n)
```

is not necessarily the same as

```text
every possible algorithm for this problem takes Ω(n).
```

The first is a lower bound on one algorithm's cost function. The second is an algorithm-independent lower bound on the problem under a specified model and is much stronger.

## Example: proving `n² + 4n + 1 ∈ Θ(n²)`

### Upper bound

For `n ≥ 1`:

\[
4n \le 4n^2
\]

and

\[
1 \le n^2.
\]

Therefore

\[
n^2 + 4n + 1 \le 6n^2.
\]

So the function is in `O(n²)`.

### Lower bound

Clearly

\[
n^2 \le n^2 + 4n + 1.
\]

So it is in `Ω(n²)`.

Therefore

\[
n^2 + 4n + 1 \in \Theta(n^2).
\]

## Example: why `n² ∉ O(n)`

Suppose, for contradiction, that constants `c` and `n_0` existed with

\[
n^2 \le cn
\]

for all `n ≥ n_0`.

For positive `n`, divide by `n`:

\[
n \le c.
\]

But `n` can exceed any fixed constant `c`. Therefore no such constants exist, and

\[
n^2 \notin O(n).
\]

This illustrates how the formal definition can disprove an asymptotic claim.

## Little-o intuition

The syllabus does not require little-o notation, so it is not a central topic. One useful intuition is nevertheless worth knowing:

```text
f grows strictly slower than g
```

when the ratio `f(n)/g(n)` tends to zero. For example,

\[
n \text{ grows strictly slower than } n^2.
\]

For this course, `O`, `Ω`, and `Θ` remain the required working notation.

## Engineering constants still matter

Asymptotic analysis deliberately hides constants, but implementation decisions still matter for actual performance.

Compare:

```text
A(n) = 1000n
B(n) = n²
```

For `n < 1000`, the quadratic formula can be smaller. For sufficiently large `n`, the linear algorithm eventually wins.

Therefore two separate questions should be kept distinct:

1. which algorithm has better growth?;
2. which implementation is faster on the input sizes that matter now?

Asymptotic notation answers the first question.

## A reliable proof pattern

To prove

\[
f(n) \in O(g(n)),
\]

1. write the required inequality `f(n) ≤ c g(n)`;
2. bound lower-order terms using the dominant term;
3. choose explicit `c` and `n_0`;
4. state that the inequality holds for all `n ≥ n_0`.

To prove `Ω`, reverse the relevant inequality. To prove `Θ`, prove both.

## Common mistakes

### Mistake 1 — treating Big O as exact equality

`O(n²)` may be valid for a linear algorithm but unnecessarily loose.

### Mistake 2 — treating Big O as worst case by definition

The case is defined separately from the asymptotic relation.

### Mistake 3 — discarding constants before understanding the count

The simplification rule is justified only after a correct cost function or bound has been derived.

### Mistake 4 — assuming every nested loop is quadratic

Iteration counts may depend on one another, shrink geometrically, or sum to a different quantity such as `E` in a graph.

### Mistake 5 — confusing an algorithm lower bound with a problem lower bound

Showing one implementation uses `Ω(n)` time does not prove that no other algorithm can do better.

### Mistake 6 — comparing classes only by labels

`O(n)` and `O(n²)` do not by themselves determine actual running time on one finite input.

## What you must be able to explain

- What inequality defines `O(g(n))`?
- What inequality defines `Ω(g(n))`?
- What does `Θ(g(n))` say that `O(g(n))` alone does not?
- How can you choose constants to prove a simple asymptotic relation?
- Why is a linear function also in `O(n²)`?
- Why can a correct Big-O claim still be uninformative?
- Why can polynomial lower-order terms be dropped?
- Why do fixed logarithm bases differ only by a constant factor?
- Why is Big O not synonymous with worst case?
- Why is an `Ω` bound on one algorithm different from a lower bound on the entire problem?
- Why can asymptotically superior algorithms lose on small practical inputs?

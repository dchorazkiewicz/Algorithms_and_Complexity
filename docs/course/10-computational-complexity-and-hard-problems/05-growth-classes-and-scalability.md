# Growth Classes and Practical Scalability

## Growth rate predicts what happens when input expands

Common asymptotic classes form a rough hierarchy:

```text
Θ(1)
Θ(log n)
Θ(n)
Θ(n log n)
Θ(n²)
Θ(n³)
Θ(cⁿ), c > 1
Θ(n!)
```

This ordering is asymptotic. It does not say that every `Θ(n log n)` implementation beats every `Θ(n²)` implementation for every finite input. It says that, beyond sufficiently large input sizes, the faster-growing function eventually dominates any fixed constant-factor advantage of the slower-growing class.

## Constant growth

A `Θ(1)` operation performs a bounded amount of work independent of the collection size under the stated model.

Examples include:

- reading an array element by a known valid index;
- reading the top of an array-backed stack;
- updating one fixed-size field.

The representation assumption matters. “Access an element” is not automatically constant if locating the element requires traversal.

## Logarithmic growth

Logarithmic algorithms repeatedly reduce the remaining problem by a constant factor.

Binary search is the standard example:

```text
n
n/2
n/4
n/8
...
1
```

The number of reductions is `Θ(log n)`.

A useful intuition is that enormous multiplicative changes in input size create only additive changes in the number of steps. If `n` doubles, `log₂ n` increases by one.

## Linear growth

A `Θ(n)` algorithm performs an amount of work proportional to the input size.

A full scan is the standard example. Doubling the input approximately doubles the dominant work.

Linear time is often close to the best possible for problems that must inspect every input element, although proving such a lower bound requires a separate argument.

## Linearithmic growth

`Θ(n log n)` frequently appears when:

- `n` elements each participate in `Θ(log n)` levels;
- divide-and-conquer produces `Θ(n)` work per level over `Θ(log n)` levels;
- `n` operations each cost logarithmic time;
- efficient comparison sorting is performed.

Merge sort is the canonical divide-and-conquer example.

When `n` doubles, `n log n` grows by a factor slightly greater than `2`.

## Quadratic and cubic growth

Quadratic algorithms often arise from examining pairs:

\[
\Theta(n^2).
\]

Cubic algorithms may arise from triples or three-dimensional dynamic processes:

\[
\Theta(n^3).
\]

If `n` grows by a factor of `10`, approximate work grows by:

- `10` for linear;
- about `10` times plus a logarithmic correction for `n log n`;
- `100` for quadratic;
- `1000` for cubic.

This is why moderate polynomial exponents matter in practice even though all fixed powers are theoretically polynomial.

## Polynomial does not mean automatically practical

A running time of

\[
O(n^{100})
\]

is polynomial, but unusable for almost any non-trivial input.

Polynomial time is important mainly as a robust theoretical class:

- fixed-degree polynomials compose into polynomials;
- polynomial overhead remains polynomial;
- the class separates many efficiently solvable problems from problem families for which only exponential-type exact algorithms are known.

Practical efficiency still depends on exponent, constants, memory behaviour, input distribution, implementation quality, and required response time.

## Exponential growth

An exponential function such as

\[
2^n
\]

grows much faster than any fixed-degree polynomial.

If `n` increases by `1`, `2^n` doubles. If `n` increases by `10`, the work is multiplied by `1024`.

Backtracking and exhaustive subset enumeration often expose exponential candidate spaces, although pruning and problem structure may dramatically reduce actual work on some inputs.

## Factorial growth

Enumerating every ordering of `n` distinct elements requires

\[
n!
\]

outputs.

The ratio between consecutive input sizes is

\[
\frac{(n+1)!}{n!}=n+1.
\]

So increasing `n` by just one multiplies the candidate count by a growing factor.

This is why brute-force permutation methods become infeasible extremely quickly.

## Doubling experiments

A useful empirical diagnostic measures how running time changes when input size doubles.

Approximate multiplication factors are:

| Class | Approximate factor when `n` doubles |
|---|---:|
| `Θ(1)` | `1` |
| `Θ(log n)` | slightly above `1` |
| `Θ(n)` | `2` |
| `Θ(n log n)` | slightly above `2` |
| `Θ(n²)` | `4` |
| `Θ(n³)` | `8` |
| `Θ(2ⁿ)` | changes from `2^n` to `2^(2n)`, so the old value is squared |

Measurements can expose mismatches between an analysis and an implementation, but they do not prove an asymptotic class. Cache effects, interpreter warm-up, allocation, compiler optimisation, and measurement noise can distort finite experiments.

## Constants and crossover points

Consider two exact running-time models:

```text
A(n) = 1000n
B(n) = n²
```

To find the non-zero crossover, solve

\[
1000n = n^2.
\]

For positive `n`,

\[
n = 1000.
\]

Thus `B` is numerically smaller for many inputs below the crossover even though `A` has the better asymptotic class.

This illustrates a practical rule:

> asymptotic analysis predicts scaling; finite-input engineering still needs constants and actual workloads.

## Another crossover example

Suppose:

```text
A(n) = 50 n log₂ n
B(n) = n²
```

There is no need to solve the equality symbolically to reason about it. The ratio is

\[
\frac{B(n)}{A(n)}
= \frac{n}{50\log_2 n}.
\]

As `n` grows, this ratio grows without bound, so the quadratic algorithm eventually becomes arbitrarily more expensive.

For concrete deployment, benchmarking can identify where that happens for the implementation at hand.

## Orders of magnitude matter more than processor speedups

Suppose hardware becomes `1000` times faster.

For a linear algorithm, the same time budget may process roughly `1000` times more input.

For an exponential algorithm `2^n`, a factor of `1000` corresponds to only about

\[
\log_2 1000 \approx 10
\]

additional units of `n`.

Large hardware improvements can therefore produce surprisingly small gains in feasible input size for exponential algorithms.

## Input size may be multidimensional

An algorithm may have cost

\[
O(V+E)
\]

for graph input, or

\[
O(rkc)
\]

for matrix multiplication with dimensions `r × k` and `k × c`.

Collapsing all dimensions into one variable may hide useful information.

## Parameterised viewpoints

Some algorithms are expensive in one parameter but efficient when that parameter is small.

For example:

\[
O(2^k n)
\]

is exponential in `k` but linear in `n` for fixed `k`.

This does not make the algorithm polynomial in the combined unrestricted input parameters, but it may make the method useful when `k` is naturally small.

The broader theory of parameterised complexity is beyond this course; the lesson is simply that complexity may depend on several structurally meaningful parameters.

## Output growth can dominate scalability

An algorithm that explicitly emits all `2^n` subsets has exponential output even if internal decision making were free.

Similarly, generating all `n!` permutations is inherently factorial in the number of outputs.

When output itself is enormous, poor scalability is not necessarily evidence of a bad implementation.

## Sparse and dense representations change effective scale

For graph algorithms, `Θ(V+E)` can behave very differently depending on density.

If `E = Θ(V)`, then traversal is effectively linear in `V`.

If `E = Θ(V²)`, then the same expression becomes quadratic in `V`.

A complexity formula with several parameters often communicates practical behaviour better than a single simplified class.

## Growth tables are intuition, not proofs

A small table can make growth differences visible:

| `n` | `n` | `n²` | `2ⁿ` |
|---:|---:|---:|---:|
| 10 | 10 | 100 | 1,024 |
| 20 | 20 | 400 | 1,048,576 |
| 30 | 30 | 900 | 1,073,741,824 |

Such tables are educational, but formal complexity conclusions come from mathematical analysis, not from a few measured values.

## Practical algorithm selection

When choosing between algorithms, ask:

1. what input sizes are expected?;
2. what are the asymptotic classes?;
3. what constants or expensive primitive operations matter?;
4. what memory use is acceptable?;
5. what input distributions or worst-case guarantees matter?;
6. does preprocessing change later query costs?;
7. is exact output required, or is approximation acceptable?;
8. does the representation support the advertised operation costs?

The asymptotic class is one essential part of the decision, not the entire engineering decision.

## Common mistakes

### Mistake 1 — “better Big O is always faster”

Better growth wins eventually, not necessarily on every finite input.

### Mistake 2 — “polynomial means efficient”

Polynomial degree and constants still matter.

### Mistake 3 — “exponential means unusable for every input”

Small inputs, strong pruning, or small structural parameters can make exponential methods useful.

### Mistake 4 — treating empirical doubling as proof

Measurements support diagnosis but do not establish asymptotic bounds.

### Mistake 5 — ignoring output size

An enumeration problem may be expensive because the required output itself is huge.

### Mistake 6 — forcing multidimensional inputs into one parameter

Keeping `V` and `E`, or other dimensions, can provide a clearer model.

## What you must be able to explain

- Why is logarithmic growth unusually scalable?
- What happens to linear, quadratic, and cubic work when input size doubles?
- Why can a worse asymptotic class win for small inputs?
- What is a crossover point?
- Why is polynomial time a broad theoretical category rather than a guarantee of practical speed?
- Why do exponential and factorial growth become infeasible rapidly?
- Why can hardware speedups have limited effect on the feasible `n` for exponential algorithms?
- What can and cannot be concluded from a doubling experiment?
- Why can multidimensional parameters be more informative than one `n`?
- How can output size itself determine scalability?

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

This ordering is asymptotic. It does not say that every `Θ(n log n)` implementation beats every `Θ(n²)` implementation on every small input.

## Constant and logarithmic growth

A constant-time operation performs a bounded amount of work independent of collection size under the stated representation assumptions.

Logarithmic algorithms repeatedly reduce the remaining problem by a constant factor. Binary search is the standard example.

When `n` doubles, a base-two logarithm increases by only one.

## Linear and linearithmic growth

Linear algorithms inspect a constant amount of information per input element.

`Θ(n log n)` often appears when:

- `n` elements each participate in logarithmically many levels;
- sorting comparison-based data efficiently;
- repeatedly using logarithmic data-structure operations for `n` items.

## Polynomial growth

Quadratic and cubic algorithms may be practical for modest inputs but become expensive quickly.

For example, increasing `n` tenfold multiplies approximate work by:

- `10` for linear growth;
- `100` for quadratic growth;
- `1000` for cubic growth.

Polynomial time includes all fixed powers `n^k`, not only small powers.

## Exponential and factorial growth

Exponential search often arises when each decision creates several alternatives and pruning does not substantially reduce the search tree.

Factorial growth appears when enumerating all permutations.

These classes become infeasible at input sizes that would be trivial for polynomial algorithms. The exact threshold depends on constants, hardware, and required response time, but the qualitative difference is fundamental.

## Doubling experiments

A useful empirical diagnostic measures how running time changes when input size doubles.

Approximate multiplication factors:

| Class | Factor when `n` doubles |
|---|---:|
| `Θ(1)` | `1` |
| `Θ(log n)` | slightly above `1` |
| `Θ(n)` | `2` |
| `Θ(n log n)` | slightly above `2` |
| `Θ(n²)` | `4` |
| `Θ(n³)` | `8` |
| `Θ(2ⁿ)` | squares the previous work |

Measurements do not prove an asymptotic class, but they can reveal mismatches between analysis and implementation.

## Constants and crossover points

Suppose:

```text
Algorithm A: 1000n
Algorithm B: n²
```

Algorithm B may be faster while `n < 1000`, despite its worse asymptotic class. A responsible choice considers expected input sizes and implementation constants as well as growth.

## Parameterised viewpoints

Some algorithms are exponential in one parameter but practical when that parameter is small. For example, a procedure may cost `O(2^k n)` where `k` is a limited structural parameter.

This reminds us that input size may be multidimensional.

## What you must be able to explain

- Why is logarithmic growth unusually scalable?
- What happens to quadratic work when input size doubles?
- Why can a worse asymptotic class win on small inputs?
- Why is polynomial time a broad category?
- Why do exponential and factorial algorithms become infeasible rapidly?
- What can and cannot be concluded from a doubling experiment?
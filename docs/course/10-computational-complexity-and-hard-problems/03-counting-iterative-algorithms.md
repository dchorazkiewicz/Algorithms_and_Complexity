# Counting Iterative Algorithms

## Start from the execution pattern

Complexity analysis should follow the control flow rather than visual impressions. The number of loops, the amount of indentation, or the number of source lines does not determine the complexity by itself.

A reliable analysis asks:

1. what is the input-size variable?;
2. which operation represents the main work?;
3. how many times is that operation executed?;
4. does the count depend on the input arrangement?;
5. can the count be written exactly or as a summation?;
6. what tight asymptotic class follows from that count?

## One full scan

```python
def maximum(values: list[int]) -> int:
    if not values:
        raise ValueError("non-empty input required")

    best = values[0]
    for index in range(1, len(values)):
        if values[index] > best:
            best = values[index]
    return best
```

Let

```text
n = len(values).
```

The comparison

```text
values[index] > best
```

runs exactly `n - 1` times for `n ≥ 1`.

Therefore

\[
T(n) = an + b
\]

for suitable constants under a unit-cost model, and

\[
T(n) \in \Theta(n).
\]

The number of assignments to `best` depends on the data, but both the best and worst cases still perform the same `n - 1` comparisons.

## Consecutive phases add

```python
for value in values:
    process(value)

for value in values:
    verify(value)
```

If both bodies take constant time, the work is

\[
n + n = 2n.
\]

Therefore

\[
T(n) \in \Theta(n),
\]

not `Θ(n²)`.

Sequential composition adds costs:

\[
T(n) = T_1(n) + T_2(n).
\]

If one phase is `Θ(n)` and another is `Θ(n²)`, the total is `Θ(n²)` because the larger-order term dominates.

## Independent rectangular nesting multiplies

```python
for left in range(n):
    for right in range(n):
        inspect(left, right)
```

For every one of `n` outer iterations, the inner loop executes `n` times.

Thus the dominant operation executes

\[
n \cdot n = n^2
\]

times, so the complexity is

\[
\Theta(n^2).
\]

The multiplication comes from the independence of the iteration counts, not merely from “two loops”.

## Triangular loops require summation

```python
for left in range(n):
    for right in range(left + 1, n):
        inspect(left, right)
```

The inner loop lengths are:

```text
n - 1,
n - 2,
...
1,
0.
```

So the exact number of calls is

\[
\sum_{k=1}^{n-1} k
= \frac{n(n-1)}{2}.
\]

Expanding,

\[
\frac{n^2-n}{2}.
\]

The dominant term is quadratic, therefore

\[
\Theta(n^2).
\]

The loop performs roughly half the work of a full `n × n` rectangle, but a constant factor of one half does not change the asymptotic class.

## Dependent nested loops can have different classes

Consider:

```python
for left in range(n):
    right = left
    while right < n:
        inspect(left, right)
        right += left + 1
```

For a fixed `left`, the inner-loop count depends on `left`. We cannot safely say “nested, therefore quadratic”. The total requires summing the per-outer-iteration work.

This general principle is more important than memorising any one result:

> When loop bounds depend on another loop variable, derive the count from those bounds.

## Logarithmic loops come from multiplicative progress

```python
size = n
while size > 1:
    size //= 2
```

After `k` iterations,

\[
size \approx \frac{n}{2^k}.
\]

The loop stops when this reaches `1`, so

\[
\frac{n}{2^k} \le 1.
\]

Rearranging,

\[
2^k \ge n,
\]

and therefore

\[
k \ge \log_2 n.
\]

Hence the loop executes

\[
\Theta(\log n)
\]

times.

Doubling produces the same asymptotic class:

```python
step = 1
while step < n:
    step *= 2
```

After `k` iterations, `step = 2^k`, so the stopping threshold is reached after logarithmically many iterations.

## Logarithmic base changes only a constant

If the loop multiplies or divides by `3` instead of `2`, the count is `Θ(log_3 n)`. Since logarithm bases differ by a constant factor, this is still written as

\[
\Theta(\log n).
\]

## Mixed linear-logarithmic patterns

```python
for value in values:
    step = 1
    while step < n:
        inspect(value, step)
        step *= 2
```

The outer loop executes `n` times. For each outer iteration, the inner loop executes `Θ(log n)` times.

Therefore

\[
T(n) = n \cdot \Theta(\log n)
= \Theta(n\log n).
\]

## A triangular-logarithmic example

Suppose:

```python
for size in range(1, n + 1):
    step = size
    while step > 1:
        step //= 2
```

The total work is approximately

\[
\sum_{k=1}^{n} \log k.
\]

Using

\[
\log(n!) = \sum_{k=1}^{n} \log k,
\]

and standard growth of `log(n!)`, the total is

\[
\Theta(n\log n).
\]

For this course, you do not need Stirling's formula to use the result. A simpler upper/lower argument also works:

- every term is at most `log n`, so the sum is `O(n log n)`;
- the last `n/2` terms are at least `log(n/2)`, so the sum is `Ω(n log n)`.

Therefore the sum is tightly `Θ(n log n)`.

## Harmonic-style loops

Consider:

```python
for divisor in range(1, n + 1):
    multiple = divisor
    while multiple <= n:
        process(divisor, multiple)
        multiple += divisor
```

For a fixed `divisor = d`, the inner loop executes approximately

\[
\frac{n}{d}
\]

times.

The total is

\[
\sum_{d=1}^{n} \frac{n}{d}
= n \sum_{d=1}^{n} \frac{1}{d}.
\]

The harmonic sum grows as `Θ(log n)`, so the total is

\[
\Theta(n\log n).
\]

This is another example where “two nested loops” does not imply quadratic work.

## Summation as a translation tool

Common execution patterns often become standard sums:

```text
constant repeated n times          →  Σ 1
linearly growing inner work        →  Σ k
geometrically shrinking process    →  number of levels = log n
work n/d for each d                →  n Σ 1/d
```

The key skill is translating control flow into a mathematical count before simplifying.

## Input-dependent traversals

```python
for row in adjacency:
    for neighbour in row:
        process(neighbour)
```

If `adjacency` is an adjacency-list representation of a directed graph:

- the outer loop visits `V` vertex lists;
- the total number of entries across all inner lists is `E`.

Therefore total work is

\[
\Theta(V + E),
\]

assuming constant work per vertex and adjacency entry.

For an undirected graph, each edge usually appears twice, giving `2E` adjacency entries, which is still `Θ(E)`.

The nested syntax does not imply `Θ(V²)`.

## Sparse versus dense graphs

The expression

\[
\Theta(V + E)
\]

adapts to graph density.

For a sparse graph where `E = Θ(V)`, traversal is `Θ(V)`.

For a dense simple graph where `E = Θ(V²)`, the same traversal becomes `Θ(V²)`.

Retaining both parameters makes the analysis more informative.

## Early exit creates different cases

```python
def contains(values, target):
    for value in values:
        if value == target:
            return True
    return False
```

For `n` values:

- best case: the first element matches, so `Θ(1)`;
- worst case: the target is absent or last, so `Θ(n)`;
- average case: depends on a probability model over target presence and position.

The loop body is identical. The number of iterations depends on the input arrangement.

## Data-dependent inner work

Consider:

```python
def total_characters(words: list[str]) -> int:
    count = 0
    for word in words:
        for _ in word:
            count += 1
    return count
```

Let `n` be the number of words and let

\[
L = \sum |word|.
\]

The natural running time is

\[
\Theta(L),
\]

not necessarily `Θ(n²)` and not even necessarily `Θ(n)`.

Choosing the right size measure can simplify the analysis dramatically.

## Hidden non-constant operations inside loops

Suppose:

```python
result = []
for index in range(n):
    result = result + [index]
```

If list concatenation copies the entire existing `result`, the iteration costs grow like

\[
1 + 2 + 3 + \cdots + n,
\]

leading to

\[
\Theta(n^2).
\]

The loop count alone is only `n`; the body is not constant time.

This is why cost models must expand high-level operations whose work grows with data size.

## Counting with floors and ceilings

Exact logarithmic counts often contain floor or ceiling functions.

For example, repeated halving may execute

\[
\lfloor \log_2 n \rfloor + 1
\]

times depending on the exact stopping condition.

Asymptotically,

\[
\lfloor \log_2 n \rfloor + 1 \in \Theta(\log n).
\]

Do not let exact boundary details hide the growth pattern, but derive them when correctness of the count matters.

## A complete example: pair comparisons with early termination

```python
def first_duplicate(values: list[int]) -> int | None:
    n = len(values)
    for left in range(n):
        for right in range(left + 1, n):
            if values[left] == values[right]:
                return values[left]
    return None
```

The best case can be `Θ(1)` if the first compared pair matches.

The worst case occurs when no duplicate exists or the first duplicate is found only at the end. Then the comparison count is

\[
\frac{n(n-1)}{2},
\]

so worst-case time is

\[
\Theta(n^2).
\]

Average-case analysis requires a probability model over input values and duplicate positions.

## A reliable procedure

For iterative code:

1. define input-size variables;
2. identify whether the loop body is constant time;
3. select a dominant operation;
4. count each loop for a fixed outer state;
5. write a sum when iteration counts vary;
6. simplify the sum or product;
7. state best/worst/expected assumptions where relevant;
8. analyse auxiliary space independently;
9. check whether a different representation changes operation cost.

## Common mistakes

### Mistake 1 — “two loops means quadratic”

Consecutive loops add, logarithmic inner loops multiply differently, and adjacency-list inner lengths sum to `E`.

### Mistake 2 — assuming the body is `Θ(1)`

Copying, sorting, slicing, string operations, and container operations may have input-dependent costs.

### Mistake 3 — ignoring dependent bounds

When an inner range depends on an outer variable, derive a summation.

### Mistake 4 — forgetting the case

Early exits can make best and worst cases asymptotically different.

### Mistake 5 — choosing a poor input-size variable

For nested string processing, total character count may be more meaningful than number of strings.

### Mistake 6 — multiplying where totals should be summed globally

Adjacency-list lengths collectively sum to `E`; they are not independently `V` for every vertex.

## What you must be able to explain

- Why do consecutive loops add rather than multiply?
- Under what condition do rectangular nested loops multiply?
- Why is a triangular loop `Θ(n²)` despite doing about half a square's work?
- How do you derive logarithmic iteration counts from multiplicative progress?
- How can a nested loop be `Θ(n log n)` or `Θ(V + E)` rather than quadratic?
- Why are summations useful for dependent loop bounds?
- How can a one-loop program still be quadratic because of the body cost?
- How do early returns change case analysis?
- Why can total encoded input size be a better parameter than the number of top-level objects?
- What evidence should appear between source code and the final asymptotic class?

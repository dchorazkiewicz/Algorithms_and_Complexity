# Counting Iterative Algorithms

## Start from the execution pattern

Complexity analysis should follow the control flow. Count how often the dominant operation executes as a function of input size.

## One full scan

```python
def maximum(values: list[int]) -> int:
    best = values[0]
    for index in range(1, len(values)):
        if values[index] > best:
            best = values[index]
    return best
```

For `n` elements, the comparison runs `n - 1` times. Therefore the running time is `Θ(n)`.

## Consecutive loops add

```python
for value in values:
    process(value)

for value in values:
    verify(value)
```

The total is `n + n = 2n`, so the complexity is `Θ(n)`, not `Θ(n²)`.

## Independent nested loops multiply

```python
for left in range(n):
    for right in range(n):
        inspect(left, right)
```

The inner operation runs `n · n = n²` times. The complexity is `Θ(n²)`.

## Triangular loops

```python
for left in range(n):
    for right in range(left + 1, n):
        inspect(left, right)
```

The counts are:

```text
(n - 1) + (n - 2) + ... + 1
```

which equals

\[
\frac{n(n-1)}{2} \in \Theta(n^2).
\]

The exact loop bounds differ from the full square, but the asymptotic class remains quadratic.

## Logarithmic loops

```python
size = n
while size > 1:
    size //= 2
```

After `k` iterations, the value is approximately `n / 2^k`. The loop stops when this becomes at most `1`, so `k ∈ Θ(log n)`.

Doubling produces the same class:

```python
step = 1
while step < n:
    step *= 2
```

## Mixed patterns

```python
for value in values:
    step = 1
    while step < n:
        inspect(value, step)
        step *= 2
```

The outer loop runs `n` times and the inner loop `Θ(log n)` times per iteration. Total: `Θ(n log n)`.

## Input-dependent loops

```python
for row in adjacency:
    for neighbour in row:
        process(neighbour)
```

This is not necessarily `Θ(V²)`. Across all adjacency lists, each directed edge entry is processed once. The total is `Θ(V + E)` when vertex setup is included.

## Early exits

```python
def contains(values, target):
    for value in values:
        if value == target:
            return True
    return False
```

- best case: `Θ(1)`;
- worst case: `Θ(n)`;
- average case: depends on a probability model.

## A reliable procedure

1. define the input size;
2. select the dominant operation;
3. count its executions;
4. express the count as a sum if necessary;
5. simplify asymptotically;
6. state the case being analysed.

## What you must be able to explain

- Why do consecutive loops add?
- When do nested loops multiply?
- Why is a triangular loop still quadratic?
- Why does repeated halving produce a logarithm?
- Why can adjacency-list traversal be `Θ(V + E)`?
- How does an early return change best- and worst-case analysis?
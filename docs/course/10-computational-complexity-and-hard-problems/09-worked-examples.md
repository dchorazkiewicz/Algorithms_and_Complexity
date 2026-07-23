# Worked Examples

## Example 1 — A triangular comparison loop

```python
def all_pairs(values: list[int]) -> int:
    count = 0
    for left in range(len(values)):
        for right in range(left + 1, len(values)):
            if values[left] == values[right]:
                count += 1
    return count
```

For `n` values, the comparison count is:

\[
(n-1) + (n-2) + \cdots + 1 = \frac{n(n-1)}{2}.
\]

Therefore time is `Θ(n²)`. Auxiliary space is `Θ(1)`.

## Example 2 — Repeated halving inside a scan

```python
def inspect_scales(values: list[int]) -> int:
    total = 0
    n = len(values)
    for value in values:
        step = n
        while step > 0:
            total += value
            step //= 2
    return total
```

The outer loop executes `n` times. The inner loop executes `Θ(log n)` times per element. Total time is `Θ(n log n)`.

## Example 3 — Divide and conquer

```python
def recursive_sum(values: list[int], left: int, right: int) -> int:
    if right - left <= 1:
        return 0 if left == right else values[left]

    middle = (left + right) // 2
    return (
        recursive_sum(values, left, middle)
        + recursive_sum(values, middle, right)
    )
```

The recurrence is:

\[
T(n) = 2T(n/2) + \Theta(1).
\]

There are `Θ(n)` nodes in the recursion tree, so total time is `Θ(n)`. The maximum active depth is `Θ(log n)`.

This example shows why two recursive calls do not automatically imply `Θ(n log n)` time. The non-recursive work per call is constant, not linear.

## Example 4 — Graph traversal

```python
def reachable(graph: dict[int, list[int]], start: int) -> set[int]:
    visited = {start}
    stack = [start]

    while stack:
        vertex = stack.pop()
        for neighbour in graph[vertex]:
            if neighbour not in visited:
                visited.add(neighbour)
                stack.append(neighbour)

    return visited
```

With adjacency lists, each reachable vertex is processed once and each outgoing edge entry is inspected once. Time is `Θ(V + E)` over the reachable subgraph. Auxiliary space is `O(V)`.

Calling the nested loop quadratic would ignore the fact that adjacency-list lengths sum to `E`.

## Example 5 — Dynamic-array growth

Suppose capacity doubles whenever the array is full. Across `n` append operations, copied element counts are approximately:

```text
1 + 2 + 4 + 8 + ... < 2n
```

The total cost of all appends is `Θ(n)`, even though one resizing append may cost `Θ(n)`. The amortised cost per append is `Θ(1)`.

## Example 6 — Output-sensitive complexity

```python
def all_subsets(values: list[int]) -> list[list[int]]:
    results: list[list[int]] = [[]]
    for value in values:
        results += [subset + [value] for subset in results]
    return results
```

There are `2^n` subsets. Because the algorithm explicitly materialises them, exponential output size is unavoidable. Counting the total number of copied elements gives `Θ(n2^n)` output work in this representation.

## Example 7 — Verification versus discovery

For the decision problem “does this graph contain a Hamiltonian cycle?”, a certificate is an ordering of all vertices.

A verifier checks:

1. every vertex appears exactly once;
2. each consecutive pair is connected;
3. the final vertex connects back to the first.

This can be done in polynomial time with an appropriate graph representation. The fact that verification is efficient does not provide an efficient method for finding the cycle.

## Example 8 — Reduction reasoning checklist

Suppose a known NP-complete problem `A` is reduced to a new decision problem `B`.

A complete argument must establish:

1. the transformation runs in polynomial time;
2. every yes-instance of `A` maps to a yes-instance of `B`;
3. every no-instance of `A` maps to a no-instance of `B`;
4. `B` belongs to NP if NP-completeness, rather than only NP-hardness, is claimed.

## Integrated analysis questions

For every example, state:

- the input-size variables;
- the dominant operation;
- the exact or summation-based count;
- the asymptotic time bound;
- the auxiliary-space bound;
- whether the bound is worst-case, expected, or amortised;
- any representation or probability assumptions;
- whether output size limits possible improvement.
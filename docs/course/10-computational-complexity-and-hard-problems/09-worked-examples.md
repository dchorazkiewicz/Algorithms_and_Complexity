# Worked Examples

This chapter integrates the complete reasoning process used throughout Module 10. Each example begins by defining the input-size variables and ends with an explicit complexity statement and its assumptions.

## Example 1 — Exact counting for a triangular loop

```python
def all_pairs(values: list[int]) -> int:
    count = 0
    for left in range(len(values)):
        for right in range(left + 1, len(values)):
            if values[left] == values[right]:
                count += 1
    return count
```

Let

```text
n = len(values).
```

The dominant operation is the equality comparison.

For fixed `left`, the inner loop executes

```text
n - left - 1
```

times. Therefore the total comparison count is

\[
\sum_{left=0}^{n-1}(n-left-1)
= (n-1)+(n-2)+\cdots+1+0.
\]

Using the triangular-number formula,

\[
\frac{n(n-1)}{2}.
\]

Hence

\[
T(n) \in \Theta(n^2).
\]

Auxiliary space is `Θ(1)`.

The important reasoning step is not “there are two loops”. It is the exact summation.

## Example 2 — A nested loop that is `Θ(n log n)`

```python
def inspect_scales(values: list[int]) -> int:
    total = 0
    n = len(values)

    for value in values:
        step = n
        while step > 1:
            total += value
            step //= 2

    return total
```

The outer loop executes `n` times.

For each element, the inner value follows approximately

```text
n, n/2, n/4, ..., 1.
```

The number of halvings is `Θ(log n)`.

Therefore

\[
T(n) = n\Theta(\log n)
= \Theta(n\log n).
\]

Auxiliary space is `Θ(1)`.

This disproves the rule “two nested loops imply quadratic time”.

## Example 3 — Hidden quadratic copying in one visible loop

```python
def prefixes(values: list[int]) -> list[list[int]]:
    current: list[int] = []
    result: list[list[int]] = []

    for value in values:
        current = current + [value]
        result.append(current)

    return result
```

There is only one explicit loop, but list concatenation copies the current prefix.

The copied lengths are approximately

\[
1+2+3+\cdots+n
= \Theta(n^2).
\]

Moreover, the output itself contains prefixes with total element count

\[
\Theta(n^2).
\]

Thus `Θ(n²)` work is consistent with the required materialised output.

This example shows why high-level operations must be expanded under the cost model.

## Example 4 — Graph traversal and aggregate inner-loop length

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

Let:

```text
V = number of reachable vertices
E = number of outgoing adjacency entries from those vertices
```

Every reachable vertex is removed from the stack at most once because it is marked visited before another copy can be added.

Across the entire run, every adjacency-list entry of a reachable vertex is inspected once.

Therefore

\[
T(V,E) \in \Theta(V+E).
\]

Auxiliary memory for `visited` and the explicit stack is `O(V)`.

The nested loop is not automatically `Θ(V²)` because the inner-list lengths collectively sum to `E`.

## Example 5 — Solving `T(n)=T(n-1)+n`

Suppose a recursive algorithm satisfies

\[
T(n)=T(n-1)+n,
\]

with `T(1)=Θ(1)`.

Expand:

\[
T(n)
= T(n-2)+(n-1)+n
\]

and continuing,

\[
T(n)
= T(1)+2+3+\cdots+n.
\]

The sum is

\[
\frac{n(n+1)}{2}-1,
\]

so

\[
T(n)\in\Theta(n^2).
\]

A recursion depth of `Θ(n)` does not imply linear total time because each level performs a different amount of non-recursive work.

## Example 6 — Recursion tree for `2T(n/2)+1`

Consider

\[
T(n)=2T(n/2)+\Theta(1).
\]

At recursion level `i` there are

\[
2^i
\]

calls, each doing constant non-recursive work.

There are `log₂ n` splitting levels. The total number of calls is proportional to

\[
1+2+4+\cdots+n
=\Theta(n).
\]

Therefore

\[
T(n)\in\Theta(n).
\]

Maximum recursion depth is only

\[
\Theta(\log n).
\]

This is the canonical example showing that two recursive calls do not automatically produce `n log n` time.

## Example 7 — Recursion tree for merge sort

Merge sort satisfies

\[
T(n)=2T(n/2)+\Theta(n).
\]

At level `i`:

- there are `2^i` subproblems;
- each has size `n/2^i`;
- merge work per subproblem is `Θ(n/2^i)`.

Thus total merge work per level is

\[
2^i\Theta(n/2^i)=\Theta(n).
\]

There are `Θ(log n)` levels, giving

\[
T(n)=\Theta(n\log n).
\]

The recursion depth is `Θ(log n)`, though implementation-specific merge buffers may require `Θ(n)` additional memory.

## Example 8 — Master-Theorem comparison

Consider three recurrences.

### A

\[
T(n)=4T(n/2)+n.
\]

Here

\[
n^{\log_2 4}=n^2.
\]

The non-recursive term `n` grows polynomially slower than `n²`, so leaf work dominates:

\[
T(n)=\Theta(n^2).
\]

### B

\[
T(n)=2T(n/2)+n.
\]

Here

\[
n^{\log_2 2}=n.
\]

The per-level work matches the critical term, yielding

\[
T(n)=\Theta(n\log n).
\]

### C

\[
T(n)=2T(n/2)+n^2.
\]

Here `n²` grows polynomially faster than `n`, and the usual regularity condition is satisfied, so root-side work dominates:

\[
T(n)=\Theta(n^2).
\]

The objective is to understand the comparison, not only to memorise three theorem cases.

## Example 9 — Dynamic-array append amortised analysis

Assume a dynamic array doubles capacity when full.

Across `n` appends, copying occurs at capacities approximately

```text
1, 2, 4, 8, ...
```

The number of copied old elements is bounded by

\[
1+2+4+\cdots < 2n.
\]

The `n` writes of newly appended elements add another `n` units of work.

Thus total work over `n` appends is

\[
\Theta(n),
\]

which gives

\[
\Theta(1)
\]

amortised cost per append.

One resizing append may still cost `Θ(n)` in the worst case.

## Example 10 — Multipop stack amortised analysis

A stack supports `push`, `pop`, and `multipop(k)`.

A single `multipop(k)` can remove `k` items, so its individual worst-case cost is `Θ(k)`.

Now consider any sequence of `m` operations starting from an empty stack.

Each successful pop can be charged to a distinct earlier push of the element being removed. Since at most `m` pushes occur, at most `m` total successful pops can occur.

Therefore the total element-processing work across the entire sequence is `O(m)`.

The amortised operation cost is therefore `O(1)`.

No randomness is involved.

## Example 11 — Output-sensitive subset generation

```python
def all_subsets(values: list[int]) -> list[list[int]]:
    results: list[list[int]] = [[]]

    for value in values:
        results += [subset + [value] for subset in results]

    return results
```

For `n` input elements there are

\[
2^n
\]

subsets.

If each subset is explicitly represented as a list, total copied element count over all subsets is

\[
n2^{n-1},
\]

because each of the `n` elements appears in exactly half of all subsets.

Therefore explicit materialisation requires

\[
\Theta(n2^n)
\]

element-level output work under this representation.

This exponential output lower bound does not by itself imply that a related decision problem is NP-hard.

## Example 12 — Pseudopolynomial subset-sum dynamic programming

Suppose non-negative integer values and target `B` are processed by a dynamic program with table dimensions roughly

```text
n × B.
```

The running time is

\[
O(nB).
\]

If `B` is encoded in binary using

\[
b=\Theta(\log B)
\]

bits, then `B` can be exponential in `b`.

So `O(nB)` is not necessarily polynomial in the encoded input length.

The algorithm is called pseudopolynomial.

## Example 13 — Polynomial verification of a Hamiltonian cycle

Input: a graph `G=(V,E)`.

Certificate: an ordering

```text
v1, v2, ..., vn
```

of all vertices.

A verifier checks:

1. there are exactly `n` entries;
2. every vertex appears once;
3. every consecutive pair is connected;
4. the last vertex connects to the first.

All checks are polynomial in the encoded graph and certificate size.

Therefore Hamiltonian Cycle belongs to NP.

The verifier does not tell us how to find a Hamiltonian cycle efficiently.

## Example 14 — Complete reduction audit: Hamiltonian Cycle → TSP Decision

Given `G=(V,E)` with `n=|V|`, build a complete graph on `V` with weight

```text
1 for original edges
2 for non-edges
```

and set threshold

\[
B=n.
\]

### Construction size

The target has `Θ(n²)` weighted edges, so the construction is polynomial.

### Source yes → target yes

A Hamiltonian cycle uses `n` original edges, each weight `1`, producing a tour of cost exactly `n`.

### Target yes → source yes

Any tour uses exactly `n` edges, each of weight at least `1`. Cost at most `n` therefore forces every tour edge to have weight `1`, so every tour edge belongs to `E`.

Thus the tour is a Hamiltonian cycle in the source graph.

The reduction is therefore correct in both directions.

## Example 15 — Complete reduction audit: 3-SAT → CLIQUE

For a 3-CNF formula with `m` clauses:

1. create one vertex for every literal occurrence;
2. do not connect vertices from the same clause;
3. connect vertices from different clauses exactly when their literals are not contradictory;
4. ask whether the graph contains a clique of size `m`.

### Size

There are `3m` vertices and at most `O(m²)` edges.

### Formula satisfiable → clique

Choose one true literal from each clause under a satisfying assignment. Chosen literals cannot contradict one another, so their vertices are pairwise adjacent and form an `m`-clique.

### Clique → formula satisfiable

An `m`-clique contains at most one vertex per clause because same-clause vertices are not adjacent. Since there are `m` clauses, it contains exactly one from each. Pairwise adjacency prevents contradictory selected literals. Assign variables to make the selected literals true; every clause is then satisfied.

Thus the reduction preserves yes/no answers.

## Example 16 — Diagnosing the wrong reduction direction

Suppose someone wants to prove a new problem `B` NP-hard and writes:

\[
B \le_p 3\text{-}SAT.
\]

This does not transfer 3-SAT's hardness to `B`. It only says that a solver for 3-SAT could be used to solve `B` after polynomial translation.

For hardness transfer, the useful direction is

\[
3\text{-}SAT \le_p B.
\]

Then a hypothetical polynomial solver for `B` would also solve 3-SAT in polynomial time.

## Example 17 — A loose bound versus a tight bound

Suppose exact work is

\[
T(n)=7n+5.
\]

It is true that

\[
T(n)\in O(n^2),
\]

because linear growth is eventually below a constant multiple of quadratic growth.

But we can prove both

\[
T(n)\in O(n)
\]

and

\[
T(n)\in\Omega(n),
\]

so

\[
T(n)\in\Theta(n).
\]

The tight bound communicates substantially more information.

## Integrated analysis checklist

For an algorithm-analysis example, state:

```text
input-size variable(s)
representation assumptions
cost model
dominant operation
exact count / sum / recurrence
case or expectation
time bound
auxiliary-space bound
output lower bound if relevant
```

For a reduction example, state:

```text
source decision problem
target decision problem
construction
target size and construction time
source yes → target yes
target yes → source yes
NP membership if NP-completeness is claimed
final conclusion
```

## Integrated questions

1. Which examples require a summation rather than simple multiplication?
2. Which examples demonstrate that nested syntax can mislead complexity guesses?
3. Which examples distinguish total work from recursion depth?
4. Why is dynamic-array append amortised rather than worst-case constant time?
5. Why is `O(nB)` sensitive to how `B` is encoded?
6. Why does exponential output not prove NP-hardness?
7. In both complete reductions, where exactly is polynomial construction established?
8. In both complete reductions, what prevents the target instance from introducing false yes-answers?
9. Why is membership in NP separate from proving NP-hardness?
10. Which examples rely on representation assumptions for their operation costs?

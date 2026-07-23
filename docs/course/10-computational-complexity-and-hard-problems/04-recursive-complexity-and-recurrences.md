# Recursive Complexity and Recurrences

## A recursive call creates work now and work later

The running time of a recursive algorithm is described by a **recurrence**: an equation that relates the cost for size `n` to the cost of smaller instances.

## Linear recursion

```python
def sum_prefix(values: list[int], n: int) -> int:
    if n == 0:
        return 0
    return sum_prefix(values, n - 1) + values[n - 1]
```

Each call performs constant non-recursive work and creates one subproblem of size `n - 1`:

\[
T(n) = T(n-1) + \Theta(1).
\]

Expanding gives `n` constant contributions, so `T(n) ∈ Θ(n)`.

The call-stack depth is also `Θ(n)`.

## Binary search

Binary search keeps one half of the current interval:

\[
T(n) = T(n/2) + \Theta(1).
\]

After `k` levels, the subproblem size is `n/2^k`. The process reaches size `1` after `Θ(log n)` levels. Therefore:

\[
T(n) \in \Theta(\log n).
\]

## Merge sort

Merge sort creates two half-sized subproblems and performs linear merging work:

\[
T(n) = 2T(n/2) + \Theta(n).
\]

At every recursion level, the total merge work is `Θ(n)`, and there are `Θ(log n)` levels. Therefore:

\[
T(n) \in \Theta(n \log n).
\]

## Naive Fibonacci

```python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

The recurrence is

\[
T(n) = T(n-1) + T(n-2) + \Theta(1).
\]

The recursion tree branches repeatedly and recomputes the same values. The running time is exponential. The recursion depth, however, is only linear.

Time and stack space must therefore be analysed separately.

## Recursion-tree reasoning

For divide-and-conquer recurrences, ask:

1. how many subproblems are created;
2. how large each subproblem is;
3. how much non-recursive work occurs per call;
4. how many levels the recursion has;
5. what the total work is at each level.

## Master-theorem pattern

Many recurrences have the form

\[
T(n) = aT(n/b) + f(n),
\]

where:

- `a` is the number of subproblems;
- each subproblem has size `n/b`;
- `f(n)` is the split-and-combine work.

A full statement of the Master Theorem requires careful regularity conditions. At this level, recursion trees are often sufficient and less error-prone.

## Common mistakes

- counting recursion depth as total work;
- ignoring multiple recursive branches;
- treating a recursive call as constant time;
- forgetting the non-recursive work performed at every node;
- claiming logarithmic space when both branches remain active simultaneously without checking the execution order.

## What you must be able to explain

- What recurrence describes one recursive call on `n - 1`?
- Why is binary search logarithmic?
- Why does merge sort perform `Θ(n)` work per level?
- Why is naive Fibonacci exponential despite linear depth?
- What information does a recursion tree expose?
- Why must time and call-stack space be analysed separately?
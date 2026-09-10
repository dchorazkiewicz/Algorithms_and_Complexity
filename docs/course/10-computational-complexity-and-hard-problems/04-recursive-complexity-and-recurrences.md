# Recursive Complexity and Recurrences

## Recursive code creates a cost equation

A recursive algorithm performs some work in the current call and delegates the rest to one or more smaller subproblems. Its running time is therefore naturally described by a **recurrence**.

A recurrence has two parts:

1. the cost of recursive subproblems;
2. the non-recursive work performed by the current call.

The first task is not to guess the final Big-O class. It is to derive the recurrence from the code.

## Deriving a recurrence from code

Consider:

```python
def sum_prefix(values: list[int], n: int) -> int:
    if n == 0:
        return 0
    return sum_prefix(values, n - 1) + values[n - 1]
```

Each non-base call:

- creates one recursive subproblem of size `n - 1`;
- performs a constant amount of work outside that call.

Therefore

\[
T(n) = T(n-1) + \Theta(1),
\]

with base cost

\[
T(0) = \Theta(1).
\]

The recurrence is a mathematical description of the execution structure.

## Method 1 — expansion

Start with

\[
T(n) = T(n-1) + c.
\]

Expand repeatedly:

\[
T(n)
= T(n-2) + 2c
= T(n-3) + 3c
= \cdots
= T(0) + nc.
\]

Therefore

\[
T(n) \in \Theta(n).
\]

The call-stack depth is also `Θ(n)` because at most `n + 1` calls are simultaneously active.

Time and stack space happen to have the same class here, but that is not true in general.

## Recurrences with growing non-recursive work

Suppose

\[
T(n) = T(n-1) + n.
\]

Expansion gives

\[
T(n)
= T(0) + 1 + 2 + \cdots + n.
\]

Using

\[
\sum_{k=1}^{n} k = \frac{n(n+1)}{2},
\]

we obtain

\[
T(n) \in \Theta(n^2).
\]

One recursive call per level does not imply linear total time. The work performed at each level also matters.

## Binary search — one shrinking subproblem

Binary search keeps only one half of the current interval:

\[
T(n) = T(n/2) + \Theta(1).
\]

After `k` expansions,

\[
T(n) = T(n/2^k) + kc.
\]

The base case is reached when

\[
\frac{n}{2^k} \le 1,
\]

so

\[
k \in \Theta(\log n).
\]

Therefore

\[
T(n) \in \Theta(\log n).
\]

If implemented recursively, the stack depth is also `Θ(log n)`. An iterative implementation can reduce auxiliary stack use to `Θ(1)` while preserving logarithmic time.

## Two recursive calls do not determine the answer

Consider:

```python
def recursive_sum(values, left, right):
    if right - left <= 1:
        return 0 if left == right else values[left]

    middle = (left + right) // 2
    return (
        recursive_sum(values, left, middle)
        + recursive_sum(values, middle, right)
    )
```

The recurrence is

\[
T(n) = 2T(n/2) + \Theta(1).
\]

At level `0` there is one call, at level `1` there are two, at level `2` four, and so on. The number of leaves is proportional to `n`, and the entire recursion tree contains `Θ(n)` nodes.

Therefore

\[
T(n) \in \Theta(n).
\]

Two recursive calls do **not** automatically imply `Θ(n log n)` or exponential time.

## Recursion-tree reasoning

For a recurrence

\[
T(n) = aT(n/b) + f(n),
\]

ask:

1. how many calls appear at level `i`?;
2. what is the subproblem size at that level?;
3. what non-recursive work does each call perform?;
4. what is the total work across one level?;
5. how many levels exist?;
6. what is the sum of all level costs?

This separates branching, depth, and per-node work.

## Merge sort — linear work at every level

Merge sort creates two half-sized recursive calls and then merges their results:

\[
T(n) = 2T(n/2) + \Theta(n).
\]

### Level 0

One problem of size `n` performs `Θ(n)` merge work.

### Level 1

Two problems of size `n/2` each perform `Θ(n/2)` work:

\[
2 \cdot \Theta(n/2) = \Theta(n).
\]

### Level i

There are `2^i` subproblems, each of size `n/2^i`. Total level work is

\[
2^i \cdot \Theta(n/2^i) = \Theta(n).
\]

### Number of levels

The problem size reaches `1` after

\[
\Theta(\log n)
\]

levels.

Therefore

\[
T(n) = \Theta(n) \cdot \Theta(\log n)
= \Theta(n\log n).
\]

The recursion depth is only `Θ(log n)`, again demonstrating that depth is not total work.

## A recurrence with increasing level cost

Consider

\[
T(n) = 2T(n/2) + \Theta(n^2).
\]

At level `i`, there are `2^i` subproblems of size `n/2^i`, so total non-recursive work is

\[
2^i \left(\frac{n}{2^i}\right)^2
= \frac{n^2}{2^i}.
\]

The level costs form a decreasing geometric series:

\[
n^2 + \frac{n^2}{2} + \frac{n^2}{4} + \cdots.
\]

The sum is `Θ(n²)`, so

\[
T(n) \in \Theta(n^2).
\]

The root-level non-recursive work dominates.

## A recurrence with leaf-dominated work

Consider

\[
T(n) = 4T(n/2) + \Theta(n).
\]

At level `i`:

- number of calls: `4^i`;
- subproblem size: `n/2^i`;
- work per call: `Θ(n/2^i)`.

Total level work is

\[
4^i \cdot \Theta(n/2^i)
= \Theta(n2^i).
\]

The level cost grows geometrically until the leaves. The number of leaves is

\[
4^{\log_2 n} = n^2.
\]

Therefore

\[
T(n) \in \Theta(n^2).
\]

This is a leaf-dominated recursion tree.

## Method 2 — substitution

The substitution method proves a guessed asymptotic bound by induction.

Suppose we want to prove

\[
T(n) = 2T(n/2) + n \in O(n\log n).
\]

Assume for smaller inputs that

\[
T(n/2) \le c\frac{n}{2}\log\frac{n}{2}.
\]

Then

\[
T(n)
\le 2c\frac{n}{2}\log\frac{n}{2} + n
= cn(\log n - 1) + n
= cn\log n - cn + n.
\]

For sufficiently large `c`, the final terms satisfy

\[
-cn + n \le 0,
\]

so

\[
T(n) \le cn\log n.
\]

A complete induction also checks the base case. The point is that substitution turns an intuition into a proof.

## The Master-Theorem pattern

Many divide-and-conquer recurrences have the form

\[
T(n) = aT(n/b) + f(n),
\]

where:

- `a ≥ 1` is the number of subproblems;
- each subproblem has size `n/b` for constant `b > 1`;
- `f(n)` is the non-recursive work.

The critical comparison is between `f(n)` and

\[
n^{\log_b a},
\]

which represents the scale of leaf-generated work.

At the course level, three common patterns are useful.

### Pattern A — leaves dominate

If `f(n)` grows polynomially slower than `n^{log_b a}`, then the recursive leaves dominate and typically

\[
T(n) = \Theta(n^{\log_b a}).
\]

Example:

\[
T(n) = 4T(n/2) + n
\Rightarrow \Theta(n^2).
\]

### Pattern B — balanced levels

If

\[
f(n) = \Theta(n^{\log_b a}),
\]

then each level contributes comparable work and typically

\[
T(n) = \Theta(n^{\log_b a}\log n).
\]

Example:

\[
T(n) = 2T(n/2) + n
\Rightarrow \Theta(n\log n).
\]

### Pattern C — root-side work dominates

If `f(n)` grows polynomially faster than `n^{log_b a}` and the usual regularity condition holds, then typically

\[
T(n) = \Theta(f(n)).
\]

Example:

\[
T(n) = 2T(n/2) + n^2
\Rightarrow \Theta(n^2).
\]

## When the Master Theorem does not apply directly

Do not force every recurrence into the pattern.

Examples outside the simple form include:

\[
T(n) = T(n-1) + n,
\]

\[
T(n) = T(n/3) + T(2n/3) + n,
\]

and

\[
T(n) = T(\sqrt{n}) + 1.
\]

Expansion, recursion trees, substitution, or other methods may be more appropriate.

The theorem is a tool, not a replacement for understanding the recurrence.

## Naive Fibonacci — branching with repeated work

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

The recursion tree branches repeatedly and recomputes values such as `fibonacci(n-2)` from multiple paths.

The running time is exponential. A simple upper bound is `O(2^n)` because each non-leaf call creates at most two children and the depth is at most `n`.

A tighter analysis relates the tree to Fibonacci growth, but the essential course lesson is:

```text
exponential total number of calls
linear maximum call depth
```

Thus:

- time: exponential;
- auxiliary recursion stack: `Θ(n)`.

## Memoisation changes the recursion graph

If computed Fibonacci values are cached, each argument `0, 1, ..., n` is solved once. The conceptual execution is no longer a huge recursion tree of repeated subproblems.

A memoised implementation has:

- `Θ(n)` distinct subproblems;
- `Θ(1)` additional arithmetic work per subproblem under the unit-cost model;
- therefore `Θ(n)` time;
- `Θ(n)` cache space, plus recursion stack if implemented recursively.

This demonstrates that recurrence structure depends on whether repeated subproblems are recomputed.

## Quicksort and input-dependent recurrence shape

Quicksort illustrates why one algorithm may produce different recurrences on different inputs or pivot choices.

Balanced partitions give approximately

\[
T(n) = 2T(n/2) + \Theta(n)
= \Theta(n\log n).
\]

Maximally unbalanced partitions give

\[
T(n) = T(n-1) + \Theta(n)
= \Theta(n^2).
\]

The partition step remains linear; the recursion shape changes.

Expected analysis of randomised Quicksort belongs to the later chapter on expected complexity.

## Stack space requires execution reasoning

For recursive algorithms, auxiliary stack usage depends on the maximum number of simultaneously active calls.

### Merge sort

Even though the recursion tree contains `Θ(n)` calls overall, calls are executed depth-first. Only one root-to-leaf path plus suspended ancestors is active at a time.

Recursion depth is

\[
\Theta(\log n).
\]

Additional merge buffers may dominate actual auxiliary space, depending on implementation.

### Naive Fibonacci

Total calls are exponential, but maximum active depth is linear:

\[
\Theta(n).
\]

Never use total node count as stack depth.

## Recurrence-analysis checklist

For recursive code:

1. define input size;
2. identify base cases;
3. count recursive calls made by one non-base call;
4. determine each subproblem size;
5. determine non-recursive work per call;
6. write the recurrence;
7. choose expansion, recursion tree, substitution, or Master-Theorem reasoning;
8. solve the time recurrence;
9. analyse maximum active recursion depth separately;
10. include temporary arrays, caches, or output memory separately.

## Common mistakes

### Mistake 1 — counting depth as total work

A recursion tree can contain far more nodes than its height.

### Mistake 2 — treating recursive calls as `Θ(1)`

Each call includes the entire cost of the smaller problem it invokes.

### Mistake 3 — ignoring non-recursive work

`2T(n/2)+1` and `2T(n/2)+n` have different total costs.

### Mistake 4 — multiplying branch factor by depth

Total nodes in a branching recursion tree are not generally `branches × depth`.

### Mistake 5 — applying the Master Theorem to the wrong recurrence

The standard pattern requires equal-sized subproblems `n/b` and additional conditions.

### Mistake 6 — confusing total recursion-tree size with stack memory

Stack space follows maximum active depth, not total calls.

### Mistake 7 — ignoring memoisation

Caching can change exponential repeated recursion into polynomially many distinct subproblems.

## What you must be able to explain

- How do you derive a recurrence from recursive code?
- Why does `T(n)=T(n-1)+n` become quadratic?
- Why is binary search logarithmic?
- Why is `2T(n/2)+1` linear rather than `n log n`?
- Why does merge sort perform `Θ(n)` work at every recursion level?
- How do root-dominated, balanced-level, and leaf-dominated recursion trees differ?
- What does substitution prove?
- What quantity `n^{log_b a}` represents in the Master-Theorem pattern?
- When should you avoid applying the Master Theorem mechanically?
- Why is naive Fibonacci exponential while its stack depth is linear?
- How does memoisation change the number of distinct subproblems?
- Why can Quicksort have different recurrences for balanced and unbalanced partitions?

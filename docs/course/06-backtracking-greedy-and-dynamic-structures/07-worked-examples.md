# Worked Examples

This chapter integrates the ideas of Module 06. Each example is analysed as an algorithm rather than presented only as code.

For every case, identify:

- the problem and contract;
- the state representation;
- the choices or neighbourhood;
- the invariant;
- pruning or selection rules;
- the correctness or guarantee argument;
- termination;
- time and auxiliary-space cost.

---

# Example 1 — Generate combinations of fixed size

## Problem

Given a list `values` and integer `k`, generate every size-`k` combination while preserving source order.

For:

```text
values = [10, 20, 30, 40]
k = 2
```

the required outputs are:

```text
[10,20] [10,30] [10,40] [20,30] [20,40] [30,40]
```

The pair `[20,10]` is not a separate combination.

## Contract

**Input:** list `values`, integer `k`.

**Precondition:** `0 <= k <= len(values)`.

**Output:** every subset of exactly `k` source positions, represented in increasing source-index order, exactly once.

**Side effects:** none outside the returned result.

## State

Maintain:

- `current`: values selected so far;
- `start`: smallest source index still allowed for the next choice.

The invariant is:

> `current` contains values selected from strictly increasing source indices, all smaller than `start`.

This eliminates duplicate reorderings by construction.

## Backtracking implementation

```python
def combinations(values: list[int], k: int) -> list[list[int]]:
    if not 0 <= k <= len(values):
        raise ValueError("k must satisfy 0 <= k <= len(values)")

    results: list[list[int]] = []
    current: list[int] = []

    def build(start: int) -> None:
        if len(current) == k:
            results.append(current.copy())
            return

        missing = k - len(current)
        last_start = len(values) - missing

        for index in range(start, last_start + 1):
            current.append(values[index])
            build(index + 1)
            current.pop()

    build(0)
    return results
```

## Why `last_start` is safe pruning

Suppose `missing` more values are required. If we choose an index larger than

```text
len(values) - missing
```

then fewer than `missing - 1` positions remain afterward. Completion becomes impossible.

Thus the loop does not merely improve performance; it removes branches that provably cannot reach size `k`.

## Trace for `n = 4`, `k = 2`

```text
[] start=0
├── [10] start=1
│   ├── [10,20] ✓
│   ├── [10,30] ✓
│   └── [10,40] ✓
├── [20] start=2
│   ├── [20,30] ✓
│   └── [20,40] ✓
└── [30] start=3
    └── [30,40] ✓
```

There is no top-level branch beginning with `40`: after choosing it, no second element would remain.

## Correctness

**Soundness:** every recorded result has length `k`, and increasing indices prevent repeated source positions.

**Completeness:** every size-`k` subset has a unique increasing sequence of source indices. The recursion considers each such sequence unless a branch lacks enough remaining positions; but such a branch cannot correspond to a size-`k` subset.

**Uniqueness:** strictly increasing indices give one representation for each combination.

## Termination and cost

Every recursive child increases `len(current)` by one, so depth is at most `k`.

There are

\[
\binom{n}{k}
\]

outputs, each of length `k`. Returning explicit copies therefore requires at least

\[
\Omega\left(k\binom{n}{k}\right)
\]

output work.

Working recursion state is `O(k)` excluding the output list.

---

# Example 2 — Find one path through a maze

## Problem

Given a rectangular grid where `0` means open and `1` means blocked, find one path from `start` to `goal` using four-directional movement.

## Contract

**Input:** non-empty rectangular grid, valid start and goal coordinates.

**Output:** one simple path from start to goal, or `None` if none exists.

**Postcondition when a path is returned:**

- first position is `start`;
- last position is `goal`;
- every consecutive pair is orthogonally adjacent;
- every position is open;
- no position is repeated.

## State

Two different state components have different meanings:

- `path` — the current root-to-state branch;
- `visited` — cells whose future continuations have already been explored.

This distinction determines what must be undone.

```python
def maze_path(
    grid: list[list[int]],
    start: tuple[int, int],
    goal: tuple[int, int],
) -> list[tuple[int, int]] | None:
    if not grid or not grid[0]:
        raise ValueError("grid must be non-empty")

    rows = len(grid)
    columns = len(grid[0])

    if any(len(row) != columns for row in grid):
        raise ValueError("grid must be rectangular")

    path: list[tuple[int, int]] = []
    visited: set[tuple[int, int]] = set()

    def search(row: int, column: int) -> bool:
        position = (row, column)

        if not (0 <= row < rows and 0 <= column < columns):
            return False
        if grid[row][column] == 1 or position in visited:
            return False

        path.append(position)
        visited.add(position)

        if position == goal:
            return True

        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            if search(row + dr, column + dc):
                return True

        path.pop()
        return False

    return path.copy() if search(*start) else None
```

## Why `path` is undone but `visited` is not

`path` means “the cells on the current candidate route”. When a branch fails, its final cells no longer belong to the next sibling route, so they must be removed.

`visited` means “this cell's reachable continuation has already been explored”. In a static maze, returning to the same cell later cannot reveal a new geometric continuation that was absent before. Retaining `visited` avoids repeated exploration.

This example shows that the rule is not:

> undo every mutation.

The rule is:

> undo every mutation whose meaning belongs only to the abandoned branch.

## Correctness idea

Every recursive transition moves to an adjacent open cell. A cell is added to the path only after bounds, obstacle, and visited checks.

If the goal is reached, `path` therefore satisfies the required path postcondition.

For completeness, from every reachable visited cell the algorithm examines all four possible outgoing moves. Since already visited cells need not be explored again, a reachable goal cannot remain behind an unexamined legal transition.

## Termination

A cell enters `visited` at most once. There are `R · C` cells, so at most that many successful state entries occur. Each considers at most four directions.

## Complexity

```text
time:  O(R · C)
space: O(R · C)
```

The recursion depth and path length can also reach `O(R · C)` in the worst case.

This is a useful contrast with tree-like backtracking: memoising or marking equivalent states can transform repeated path exploration into graph exploration.

---

# Example 3 — N-Queens: pruning and state restoration

## Problem

Find one placement of `n` queens with no attacks.

The full implementation appears in the backtracking chapter. Here the focus is on the interaction between representation and pruning.

## State invariant

At entry to `search(row)`:

```text
len(placement) = row
columns = exactly the used columns
diag_down = exactly the used row-column diagonals
diag_up = exactly the used row+column diagonals
placement is conflict-free
```

Each candidate column is tested against propagated occupancy state.

## Why this is better than rescanning

Without occupancy sets, testing `(row, column)` may scan up to `row` previous queens.

With sets, each conflict test uses a constant number of expected-`O(1)` membership operations.

The search remains exponential in the worst case, but the work per candidate is reduced.

## Pruning argument

A candidate conflicting with an already placed queen cannot belong to any valid extension because earlier queens remain fixed along the branch.

Thus skipping that column preserves completeness.

## Failure-mode exercise

Suppose backtracking performs:

```python
placement.pop()
columns.remove(column)
# forgot to remove the two diagonal markers
```

The resulting state may still generate only conflict-free placements, but valid columns in sibling branches can be incorrectly rejected. This is a completeness failure caused by stale propagated state.

---

# Example 4 — Greedy interval selection

## Problem

Choose a maximum number of mutually compatible activities.

```python
def maximum_compatible(activities):
    ordered = sorted(activities, key=lambda item: item.finish)
    result = []
    finish = float("-inf")

    for activity in ordered:
        if activity.start >= finish:
            result.append(activity)
            finish = activity.finish

    return result
```

## Why the result is exact

The selection rule chooses the compatible activity with earliest finish time.

Let an optimal schedule begin with `A` and let greedy choose `G`. Since

```text
finish(G) <= finish(A)
```

replacing `A` by `G` leaves every later activity feasible. Therefore some optimum begins with the greedy choice.

Applying the same argument to the remaining compatible activities establishes optimality recursively.

## Complexity

Sorting dominates:

```text
O(n log n)
```

followed by a linear scan.

## Contrast question

If the objective changed from “maximum number of activities” to “maximum total activity value”, would the same greedy proof still hold?

No conclusion follows automatically. The objective changed, so the exchange argument must be rebuilt or a counterexample may exist.

---

# Example 5 — Greedy bin packing as a heuristic

## Problem

Pack item weights into capacity-limited bins while trying to minimise the number of bins.

```python
def first_fit_decreasing(weights: list[int], capacity: int) -> list[list[int]]:
    if capacity <= 0:
        raise ValueError("capacity must be positive")
    if any(weight < 0 or weight > capacity for weight in weights):
        raise ValueError("every item must fit into one bin")

    bins: list[list[int]] = []
    remaining: list[int] = []

    for weight in sorted(weights, reverse=True):
        for index, free in enumerate(remaining):
            if weight <= free:
                bins[index].append(weight)
                remaining[index] -= weight
                break
        else:
            bins.append([weight])
            remaining.append(capacity - weight)

    return bins
```

## Guarantee

The procedure always returns a feasible packing under the precondition that each item individually fits.

This chapter does **not** claim that it always minimises the number of bins.

The precise result is:

```text
feasible packing produced by a deterministic greedy heuristic
```

A claim of optimality would require a separate proof or exact verification.

## Lower-bound comparison

A simple lower bound on the number of bins is

\[
\left\lceil \frac{\sum_i weight_i}{capacity} \right\rceil.
\]

If the heuristic uses exactly this many bins, the solution is proven optimal for that instance because no packing can use fewer.

If it uses more, the lower bound alone does not tell us whether the heuristic is suboptimal; the true optimum may also be larger than the bound.

This illustrates how bounds can evaluate heuristic quality without pretending to prove more than they do.

---

# Example 6 — Systematic one-swap improvement

## Problem

Given a permutation and a cost function, repeatedly replace the current permutation by the best strictly better one-swap neighbour.

```python
def improve_order(order: list[int], cost) -> list[int]:
    current = order.copy()

    while True:
        best = current
        best_cost = cost(current)

        for left in range(len(current)):
            for right in range(left + 1, len(current)):
                candidate = current.copy()
                candidate[left], candidate[right] = candidate[right], candidate[left]
                candidate_cost = cost(candidate)

                if candidate_cost < best_cost:
                    best = candidate
                    best_cost = candidate_cost

        if best == current:
            return current

        current = best
```

## Neighbourhood

For length `n`, the one-swap neighbourhood contains at most

\[
\binom{n}{2}
\]

candidates.

Every iteration examines all of them, so the returned solution has no strictly better one-swap neighbour.

## What is guaranteed

Guaranteed:

```text
one-swap local optimality
```

Not guaranteed:

```text
global optimality
```

unless a separate theorem about the particular objective proves that every one-swap local optimum is global.

## Termination

The number of permutations is finite. Every accepted update strictly reduces cost. Therefore the procedure cannot revisit an accepted state and must terminate.

## Cost

One neighbourhood scan creates `O(n²)` candidates.

If copying and evaluating each candidate both cost `O(n)`, a scan can cost `O(n³)`.

The total running time also depends on the number of accepted improvement iterations, which may be problem-specific.

---

# Example 7 — Dynamic-array growth as sequence analysis

## Problem

Analyse `n` appends to a dynamic array whose capacity doubles whenever full.

Suppose capacities grow:

```text
1 → 2 → 4 → 8 → ...
```

At each resize, all current elements are copied or moved.

## Aggregate analysis

The resize-copy costs before reaching `n` elements are bounded by:

\[
1 + 2 + 4 + \cdots < 2n.
\]

The `n` insertions themselves add `n` more units of work.

So total append work is `O(n)`, giving amortised `O(1)` per append.

## Contrast: growth by one

If capacity grew by one each time, total copying would be:

\[
1 + 2 + \cdots + (n-1) = \Theta(n^2).
\]

Thus amortised append would become `Θ(n)`.

The implementation policy changes the asymptotic sequence cost.

---

# Integrated comparison

| Example | Search/decision style | Exact? | Main guarantee | Characteristic cost issue |
|---|---|---|---|---|
| combinations | backtracking | yes | all size-`k` combinations exactly once | output-sensitive `C(n,k)` |
| maze path | graph-style DFS/backtracking | yes for reachability | returns a valid path if one exists | each cell explored once |
| N-Queens | constrained backtracking | yes | valid solution if one exists | explored-state count |
| interval scheduling | greedy | yes | maximum number of compatible activities | sorting dominates |
| bin packing FFD | greedy heuristic | not generally exact | feasible packing | quality versus lower bound |
| one-swap improvement | systematic local search | locally exact | no better one-swap neighbour | neighbourhood evaluation |
| dynamic-array append | dynamic representation | not optimisation | amortised constant append | rare expensive resizes |

## Final analysis questions

For each example, be able to answer:

1. What exactly is the complete algorithmic state?
2. What is the representation invariant?
3. Which choices or neighbours are generated?
4. Which conditions reject a candidate?
5. Is rejection pruning, constraint propagation, or ordinary feasibility checking?
6. What is undone, and why?
7. Which state is intentionally retained across branches?
8. What proves termination?
9. Is the result globally exact, locally optimal, heuristic, or merely feasible?
10. What dominates running time?
11. What dominates auxiliary memory?
12. Does output size impose a lower bound?
13. Which assumptions are required by the proof?
14. How would changing one assumption invalidate or alter the argument?

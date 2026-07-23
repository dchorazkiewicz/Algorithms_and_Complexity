# Worked Examples

## Example 1 — Generate combinations of fixed size

Given `values` and integer `k`, generate every size-`k` combination.

```python
def combinations(values: list[int], k: int) -> list[list[int]]:
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

`start` prevents reordering the same combination. The bound `last_start` prunes branches that do not contain enough remaining values.

The invariant is that `current` contains increasing source indices, so duplicates caused by order cannot appear.

## Example 2 — Find one path through a maze

Represent open cells by `0` and blocked cells by `1`.

```python
def maze_path(grid: list[list[int]], start: tuple[int, int], goal: tuple[int, int]):
    rows = len(grid)
    columns = len(grid[0])
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

Here `visited` is deliberately not undone. The algorithm is searching a static maze, and revisiting a cell cannot reveal a new continuation that was not already explored from that cell. `path`, however, represents the current branch and must be restored.

This example shows that undo decisions depend on the meaning of each piece of state.

## Example 3 — Greedy interval selection

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

The proof uses an exchange argument: an earliest-finishing first choice can replace the first activity in an optimal solution without reducing the number of later compatible activities.

## Example 4 — Greedy bin packing as a heuristic

```python
def first_fit_decreasing(weights: list[int], capacity: int) -> list[list[int]]:
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

The method is fast and often good, but this chapter does not claim that it always uses the minimum number of bins. It is a heuristic construction whose quality should be compared with optimal answers on small instances or with lower bounds.

## Example 5 — Systematic one-swap improvement

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

Every iteration examines the complete one-swap neighbourhood. Cost strictly decreases when the state changes, so cycles are impossible if cost values come from a finite set over the finite set of permutations.

## Integrated analysis questions

For each example, identify:

1. the complete state;
2. the choices or neighbours;
3. the feasibility condition;
4. what is undone and what is retained;
5. the termination measure;
6. the correctness guarantee;
7. whether the result is exact or heuristic;
8. the dominant time and auxiliary-space costs.
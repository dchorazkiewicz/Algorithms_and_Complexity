# Pruning and Constraint Propagation

## Exploring less without losing solutions

Backtracking becomes useful when it can reject hopeless branches before they are fully expanded. This is called **pruning**.

A pruning rule must be justified carefully. It may remove a branch only when no completion of that branch can satisfy the goal.

## Feasibility pruning

In subset sum, suppose all remaining numbers are non-negative and the current sum already exceeds the target. Adding more values cannot repair the branch, so it may be abandoned.

```python
def subset_sum(values: list[int], target: int) -> list[int] | None:
    chosen: list[int] = []

    def search(index: int, current_sum: int) -> bool:
        if current_sum == target:
            return True
        if index == len(values) or current_sum > target:
            return False

        chosen.append(values[index])
        if search(index + 1, current_sum + values[index]):
            return True
        chosen.pop()

        return search(index + 1, current_sum)

    return chosen.copy() if search(0, 0) else None
```

The rule `current_sum > target` is valid only because the values are assumed non-negative. With negative values, a later choice could reduce the sum.

## Constraint propagation

Sometimes one choice immediately restricts later choices. In the queens problem, placing a queen rules out its column and diagonals. Recording these restrictions allows constant-time safety checks.

```python
def solve_queens(n: int) -> list[int] | None:
    placement: list[int] = []
    columns: set[int] = set()
    diag_down: set[int] = set()   # row - column
    diag_up: set[int] = set()     # row + column

    def place(row: int) -> bool:
        if row == n:
            return True

        for column in range(n):
            if column in columns:
                continue
            if row - column in diag_down:
                continue
            if row + column in diag_up:
                continue

            placement.append(column)
            columns.add(column)
            diag_down.add(row - column)
            diag_up.add(row + column)

            if place(row + 1):
                return True

            placement.pop()
            columns.remove(column)
            diag_down.remove(row - column)
            diag_up.remove(row + column)

        return False

    return placement.copy() if place(0) else None
```

The sets are not decorative optimisations. They are part of the maintained state and must be restored exactly.

## Bounding

For optimisation problems, a branch can be pruned when even its best possible completion cannot beat the best solution already found.

This requires a bound:

```text
optimistic value achievable from this state
```

If the optimistic bound is already worse than the current best, the branch is irrelevant.

## Ordering choices

Choice order does not change correctness when every valid alternative is eventually considered. It can change performance dramatically.

Useful heuristics include:

- try the most constrained choice first;
- try the choice most likely to succeed first;
- try a choice likely to produce a strong incumbent solution early.

These heuristics do not remove branches by themselves. They change when branches are explored.

## Correctness obligation

For every pruning condition, state the implication:

```text
if the condition holds,
then no completion of this partial state can be a required solution
```

Without this implication, pruning is merely a guess and may destroy completeness.

## What you must be able to explain

- Which assumption makes a pruning rule valid?
- What information is propagated after a choice?
- How does bounding differ from feasibility checking?
- Why can ordering improve performance without changing correctness?
- How would you construct a counterexample to an invalid pruning rule?
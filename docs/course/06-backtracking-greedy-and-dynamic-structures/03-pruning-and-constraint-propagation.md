# Pruning and Constraint Propagation

## Exploring less without losing required solutions

Backtracking becomes useful when it can reject hopeless branches before they are fully expanded. This is called **pruning**.

A pruning rule is not merely a performance trick. It is a correctness-sensitive statement about the search space:

> if the pruning condition holds, no completion of the current partial state can be a required solution.

If that implication is not justified, the algorithm may silently lose valid answers.

This chapter separates four ideas that are often confused:

- feasibility pruning;
- constraint propagation;
- optimisation bounds;
- choice-ordering heuristics.

Only the first three remove work. Choice ordering changes the order in which work is performed.

## Pruning and correctness

Suppose a complete search without pruning is known to be sound and complete.

Adding a pruning rule preserves **soundness** automatically if the remaining search procedure is unchanged: the algorithm still outputs only valid solutions.

The main danger is **completeness**. A bad pruning rule may discard a branch containing a valid solution.

Therefore the standard proof obligation is:

```text
pruning condition
      ↓
no valid completion exists
```

For optimisation problems the statement becomes:

```text
pruning condition
      ↓
no completion can improve the best solution already known
```

## Feasibility pruning: subset sum with non-negative values

Consider the decision problem:

> Does some subset of the input values sum exactly to `target`?

Assume every input value is non-negative.

### Contract

**Input:** list `values` and integer `target`.

**Precondition:** every value is non-negative and `target >= 0`.

**Output:** one subset summing to `target`, or `None` if none exists.

```python
def subset_sum(values: list[int], target: int) -> list[int] | None:
    if target < 0 or any(value < 0 for value in values):
        raise ValueError("this pruning rule requires non-negative values")

    chosen: list[int] = []

    def search(index: int, current_sum: int) -> bool:
        if current_sum == target:
            return True

        if index == len(values):
            return False

        if current_sum > target:
            return False

        chosen.append(values[index])
        if search(index + 1, current_sum + values[index]):
            return True
        chosen.pop()

        return search(index + 1, current_sum)

    return chosen.copy() if search(0, 0) else None
```

## Why `current_sum > target` is safe here

All future values are non-negative. Therefore every continuation has final sum at least `current_sum`.

If

\[
current\_sum > target,
\]

then no later inclusion decision can reduce the sum back to the target.

The pruning proof depends directly on the precondition.

## Counterexample when the assumption changes

Suppose negative values are allowed:

```text
values = [8, -3]
target = 5
```

After choosing `8`, we have `current_sum = 8 > 5`. A rule that immediately prunes this branch would reject it. But adding `-3` produces the valid sum `5`.

This illustrates a general principle:

> A pruning rule is valid under assumptions, not in isolation.

Whenever the input model changes, pruning arguments must be rechecked.

## Stronger feasibility bounds

The rule `current_sum > target` uses only a lower-bound argument. We can also reason about what remains available.

Let `remaining_sum` be the sum of all unprocessed non-negative values. If

\[
current\_sum + remaining\_sum < target,
\]

then even choosing every remaining value cannot reach the target.

So the branch may also be pruned.

This produces two safe bounds:

```text
current_sum > target
current_sum + remaining_sum < target
```

The first says we have already gone too far. The second says we can no longer go far enough.

## Constraint propagation

Sometimes one choice immediately restricts many later choices. **Constraint propagation** records those consequences now rather than rediscovering them repeatedly.

In `n` queens, placing a queen at `(row, column)` makes unavailable:

- `column`;
- diagonal identifier `row - column`;
- diagonal identifier `row + column`.

Maintaining sets of occupied resources allows each future candidate to be tested quickly.

```python
def solve_queens(n: int) -> list[int] | None:
    placement: list[int] = []
    columns: set[int] = set()
    diag_down: set[int] = set()
    diag_up: set[int] = set()

    def place(row: int) -> bool:
        if row == n:
            return True

        for column in range(n):
            down = row - column
            up = row + column

            if column in columns or down in diag_down or up in diag_up:
                continue

            placement.append(column)
            columns.add(column)
            diag_down.add(down)
            diag_up.add(up)

            if place(row + 1):
                return True

            placement.pop()
            columns.remove(column)
            diag_down.remove(down)
            diag_up.remove(up)

        return False

    return placement.copy() if place(0) else None
```

The occupancy sets are not decorative caches. They are part of the maintained search state and their exact meaning belongs in the invariant.

## Propagation versus repeated checking

Without the sets, a candidate queen could be checked by scanning every earlier queen. If `row` queens are already placed, that safety test costs `O(row)`.

With sets, each column and diagonal lookup is expected `O(1)`, reducing repeated local checking.

This changes the **cost per explored state**, even if the high-level search tree remains the same.

That distinction is important:

```text
search-tree reduction  ≠  cheaper state evaluation
```

Pruning can reduce the number of states. Propagated bookkeeping can reduce the work spent at each state. A technique may do one, the other, or both.

## Forward checking

A stronger form of propagation asks not only whether the current choice violates a constraint, but whether it leaves at least one possible choice for important future variables.

For example, after placing a queen, we could compute candidate columns for the next row. If none remain, we know immediately that the branch will fail and can stop before making the next recursive call.

This is sometimes called **forward checking**.

The same idea appears in scheduling, graph colouring, and constraint-satisfaction problems:

1. make one assignment;
2. update future domains;
3. detect an empty domain early;
4. undo the updates when backtracking.

The benefit is earlier failure detection. The cost is additional bookkeeping.

## Bounding in optimisation problems

For optimisation, a partial state may still have feasible completions but none capable of beating the current best solution.

A **bound** estimates the best value that any completion of a branch could possibly achieve.

For a maximisation problem:

```text
optimistic upper bound for this branch <= current best
```

implies that the branch cannot improve the incumbent and may be pruned.

For a minimisation problem the inequality reverses.

The word **optimistic** is important. A bound used for pruning must be at least as good as any actually achievable completion. If the bound underestimates a branch's potential in a maximisation problem, valid improvements may be discarded.

## Example of an optimisation bound

Suppose items have positive values and we are constructing a subset under some capacity constraint. Let:

- `current_value` be the value already selected;
- `remaining_value` be the sum of values of every unprocessed item, ignoring capacity.

Then

\[
current\_value + remaining\_value
\]

is an optimistic upper bound: no completion can be worth more than taking everything remaining.

If this bound is no better than the best feasible solution already found, the branch cannot win.

The bound may be loose, but it is safe.

## Choice ordering is not pruning

Choice ordering changes **which child is explored first**.

Examples:

- most constrained variable first;
- least constraining value first;
- largest item first;
- candidate most likely to improve the incumbent first.

If all legal alternatives are eventually explored, changing their order does not change the set of solutions.

It may still improve performance substantially:

- a solution may be found earlier;
- a better incumbent may strengthen later optimisation pruning;
- failure may be exposed near the top of the search tree.

But ordering alone removes nothing.

## Search-order heuristic versus pruning rule

Consider graph colouring.

**Heuristic:** choose the uncoloured vertex with the fewest currently legal colours.

This changes the order in which variables are assigned. It does not remove any colour from any vertex by itself.

**Pruning rule:** if an uncoloured vertex has zero legal colours, abandon the branch.

This removes the branch because no full colouring can extend it.

Keeping these two ideas separate makes correctness arguments much clearer.

## A small state-count comparison

Consider binary strings of length `4` without consecutive ones.

A generate-then-filter approach constructs all

\[
2^4 = 16
\]

complete strings.

A constrained generator never extends a prefix ending in `1` with another `1`. It therefore omits entire invalid subtrees such as those beginning with `11`.

The exact visited-node count depends on whether we count the root and internal prefixes, but the principle is stable:

```text
without pruning/constraint-aware generation:
    visit every binary prefix in the full tree

with constraint-aware generation:
    visit only prefixes that are still valid
```

This is the right way to analyse pruning: identify which states disappear and why.

## Measuring pruning effectiveness

A useful empirical diagnostic is to instrument the search:

```python
visited = 0
pruned = 0
```

Increment `visited` on each search-state entry and `pruned` whenever a branch is rejected early.

For teaching and experimentation, compare:

- same instance without pruning;
- same instance with one pruning rule;
- same instance with additional propagation;
- same instance with changed choice ordering.

This separates algorithmic effects that may otherwise be hidden by small examples.

## Common invalid arguments

### “This branch looks bad”

A branch being unlikely to succeed is not enough for exact search. Exact pruning requires proof that it cannot contain a required solution.

### “This greedy estimate is probably close”

A heuristic estimate is not automatically a valid optimisation bound. Safe pruning requires an optimistic bound in the correct direction.

### “The current partial solution is worse than the best”

That may be insufficient. A partial solution might improve later. What matters is the best possible completion, not the current partial value alone.

### “Most constrained first removes impossible branches”

Not by itself. It only changes which variable is processed first. A separate feasibility test removes impossible branches.

## A proof checklist for every pruning rule

Before accepting a pruning condition, state explicitly:

1. the assumptions on the input and state;
2. the pruning condition;
3. what future completions remain possible;
4. why none of those completions can satisfy or improve the goal;
5. whether the argument preserves completeness;
6. whether changed assumptions would invalidate the reasoning.

## What you must be able to explain

- Why is pruning a correctness-sensitive operation?
- Which assumption makes `current_sum > target` safe for non-negative subset sum?
- How does a negative number provide a counterexample?
- How does constraint propagation differ from pruning?
- How can propagated state reduce work per explored node?
- What is forward checking?
- What makes an optimisation bound safe?
- Why is an optimistic bound required?
- Why can choice ordering improve speed without changing correctness?
- How would you construct a counterexample to an invalid pruning rule?
- Why should pruning effectiveness be discussed in terms of explored states rather than vague claims such as “much faster”?

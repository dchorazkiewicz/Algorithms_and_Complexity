# Greedy Construction

## Choosing without reconsidering

A greedy algorithm constructs a solution step by step and, at each step, selects an option that appears best according to a local rule.

The attraction is obvious: instead of exploring many alternatives, the algorithm commits to one. The danger is equally important: a locally attractive choice need not belong to a globally optimal solution.

Therefore a greedy method has three separate parts:

1. the **feasibility rule** — which choices remain legal;
2. the **selection rule** — which legal choice is preferred;
3. the **correctness argument** — why repeated local choices produce a required global result.

## Example: interval scheduling

Given activities with start and finish times, choose as many mutually compatible activities as possible.

A successful greedy rule is:

> repeatedly choose the compatible activity that finishes earliest.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Activity:
    start: int
    finish: int


def select_activities(activities: list[Activity]) -> list[Activity]:
    ordered = sorted(activities, key=lambda activity: activity.finish)
    selected: list[Activity] = []
    current_finish = float("-inf")

    for activity in ordered:
        if activity.start >= current_finish:
            selected.append(activity)
            current_finish = activity.finish

    return selected
```

The local objective is not “choose the shortest activity” or “choose the earliest starting activity.” It is “leave the greatest remaining time after the current choice.”

## Exchange argument

Let an optimal solution begin with some compatible activity `A`. Let `G` be the activity with the earliest finish time.

Because `G` finishes no later than `A`, replacing `A` with `G` does not make any later activity incompatible. Thus there exists an optimal solution beginning with the greedy choice.

After choosing `G`, the remaining problem has the same form: select a maximum compatible subset among activities starting after `G` finishes.

This establishes the greedy-choice property and optimal substructure.

## A greedy rule that fails

For coin values `[1, 3, 4]` and target `6`, repeatedly taking the largest possible coin gives:

```text
4 + 1 + 1
```

Three coins are used, but the optimal solution is:

```text
3 + 3
```

The example shows why examples that succeed cannot prove a greedy rule. A single counterexample can refute it.

## Greedy state

A greedy algorithm still maintains state:

- the partial solution;
- the resources already consumed;
- the remaining candidates;
- the feasibility condition.

The difference from backtracking is that rejected alternatives are normally not revisited.

## Complexity

For interval scheduling, sorting dominates the cost:

```text
sorting: O(n log n)
scan:    O(n)
total:   O(n log n)
```

If the input is already ordered by finish time, the selection phase is linear.

## What you must be able to explain

- What exactly is optimised by the local rule?
- Why is the choice feasible?
- Why can the choice be part of some optimal solution?
- What subproblem remains after the choice?
- Which counterexample disproves a tempting alternative rule?
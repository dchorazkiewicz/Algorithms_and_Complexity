# Greedy Construction

## Choosing without reconsidering

A greedy algorithm constructs a solution step by step and, at each step, commits to a choice that is best according to a local rule.

The attraction is clear: instead of exploring a large search tree, the algorithm follows one path. The danger is equally important: a locally attractive choice need not belong to any globally optimal solution.

A greedy method therefore needs more than code. It needs four clearly separated components:

1. a **feasibility rule** — which choices are currently legal;
2. a **selection rule** — which legal choice is preferred;
3. a **remaining-subproblem argument** — what problem remains after the choice;
4. a **correctness argument** — why committing to that local choice does not destroy global optimality.

Without the fourth part, “greedy” is only a heuristic description.

## Greedy versus backtracking

Backtracking says:

```text
choose → explore → undo → try another choice
```

A greedy algorithm usually says:

```text
choose the preferred feasible option → commit → continue
```

The difference is not that greedy algorithms have no state or no proof obligations. The difference is that rejected alternatives are normally never revisited.

That makes the selection rule the central theorem of the algorithm.

## Complete example: interval scheduling

### Problem

Given activities with start and finish times, select a maximum-cardinality subset of pairwise compatible activities.

Two activities are compatible if they do not overlap. We assume that an activity beginning exactly when another ends is allowed.

### Contract

**Input:** a finite list of activities `(start, finish)`.

**Preconditions:**

- `start <= finish` for every activity;
- times are comparable.

**Output:** a subset of pairwise compatible activities with maximum possible cardinality.

**Side effects:** the input list is not modified.

### Tempting local rules

Several plausible rules exist:

- choose the activity that starts earliest;
- choose the shortest activity;
- choose the activity with the fewest overlaps;
- choose the activity that finishes earliest.

Only the last of these has the standard simple correctness proof for the maximum-number-of-activities objective.

## Greedy rule

> Among activities compatible with those already selected, choose the activity with the earliest finishing time.

The intuition is that an early finish leaves as much future time as possible. Intuition alone is not enough, so we prove an exchange property.

## Pseudocode

```text
SELECT-ACTIVITIES(activities)
    sort activities by nondecreasing finish time
    selected ← empty list
    current_finish ← -∞

    for each activity in sorted order
        if activity.start ≥ current_finish
            append activity to selected
            current_finish ← activity.finish

    return selected
```

## Python implementation

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Activity:
    start: int
    finish: int


def select_activities(activities: list[Activity]) -> list[Activity]:
    if any(activity.start > activity.finish for activity in activities):
        raise ValueError("activity start must not exceed finish")

    ordered = sorted(activities, key=lambda activity: activity.finish)
    selected: list[Activity] = []
    current_finish = float("-inf")

    for activity in ordered:
        if activity.start >= current_finish:
            selected.append(activity)
            current_finish = activity.finish

    return selected
```

## Manual trace

Consider:

```text
A = (1, 4)
B = (3, 5)
C = (0, 6)
D = (5, 7)
E = (3, 9)
F = (5, 9)
G = (6, 10)
H = (8, 11)
I = (8, 12)
J = (2, 14)
K = (12, 16)
```

Sorted by finish time, the scan begins:

```text
A (1,4)   → select, current_finish = 4
B (3,5)   → reject, starts before 4
C (0,6)   → reject
D (5,7)   → select, current_finish = 7
E (3,9)   → reject
F (5,9)   → reject
G (6,10)  → reject
H (8,11)  → select, current_finish = 11
I (8,12)  → reject
J (2,14)  → reject
K (12,16) → select
```

One resulting optimal schedule is:

```text
A, D, H, K
```

The trace explains the implementation. The proof must explain why no schedule with more activities exists.

## Exchange argument

Let `G` be an activity with the earliest finish time among all activities.

Take any optimal schedule `O`. Let `A` be the first activity in `O`.

Because `G` has earliest finish time,

\[
finish(G) \le finish(A).
\]

Replace `A` by `G`.

Every activity scheduled after `A` starts at or after `finish(A)`. Since `G` finishes no later than `A`, all those later activities remain compatible with `G`.

Therefore the replacement does not reduce the number of selected activities.

So there exists an optimal solution whose first activity is exactly the greedy choice `G`.

After choosing `G`, the remaining task is again an interval-scheduling problem restricted to activities whose start is at least `finish(G)`.

This produces the recursive reasoning:

1. some optimal solution begins with the greedy choice;
2. after fixing that choice, solving the remaining compatible activities optimally completes an optimal solution.

The algorithm implements this recurrence iteratively by scanning the finish-time order.

## What the exchange argument really proves

It does **not** prove that every optimal solution begins with the greedy choice.

It proves something weaker and sufficient:

> at least one optimal solution can be transformed into another optimal solution that begins with the greedy choice.

That is enough to justify committing to the greedy choice without exploring alternatives.

## Greedy-choice property and optimal substructure

Two ideas are often used in greedy proofs.

### Greedy-choice property

A locally selected choice can belong to some globally optimal solution.

For interval scheduling, earliest finish satisfies this through the exchange argument.

### Optimal substructure

After committing to the choice, the rest of an optimal solution solves the remaining subproblem optimally.

If the remainder were not optimal, replacing it by a better remainder would improve the full solution, contradicting optimality.

These ideas are related but not identical.

## A greedy rule that fails: coin change

Suppose coin denominations are:

```text
1, 3, 4
```

and the objective is to make value `6` using the fewest coins.

The greedy rule “take the largest coin that does not exceed the remaining amount” gives:

```text
4 + 1 + 1
```

which uses three coins.

But:

```text
3 + 3
```

uses two coins.

One counterexample is enough to disprove a universal optimality claim.

The failure also shows that a rule can work for familiar coin systems and still fail for the general problem.

## Counterexample method

To test an unproved greedy rule, search for a small instance where the local choice blocks a better global arrangement.

A useful process is:

1. state the rule precisely;
2. identify what it optimises locally;
3. ask what future flexibility the rule may destroy;
4. construct a small case where a slightly worse local choice enables a better total solution.

Counterexamples do not replace proof when the rule is correct, but they are efficient tools for disproving incorrect rules.

## Greedy state and invariant

For interval scheduling, a useful loop invariant is:

> after processing the first `i` activities in finish-time order, `selected` is a compatible schedule, and `current_finish` is the finish time of its last selected activity.

This proves feasibility throughout the scan.

Optimality requires the separate exchange argument. A loop invariant showing that the result is valid does not by itself show that it is maximum.

## Termination

Sorting terminates for finite input. The selection loop processes each of `n` activities exactly once, so it performs a finite number of iterations.

## Complexity

For unsorted input:

```text
sorting: O(n log n)
scan:    O(n)
total:   O(n log n)
```

The returned schedule may contain up to `n` activities, so output storage is `O(n)`. Apart from the sorted copy and output, the scan itself uses constant additional state.

If the activities are already sorted by finish time, the selection phase is `O(n)`.

## Greedy algorithm or heuristic?

Use the terminology carefully.

A **greedy strategy** describes a local-choice construction pattern.

If a proof shows that the strategy always returns an optimum for the stated problem, it is an exact greedy algorithm.

If no such guarantee exists and the strategy is used because it often gives good solutions quickly, it is more accurate to call it a greedy heuristic.

The same code can have different status under different assumptions or objectives.

## Proof checklist for a greedy algorithm

Before claiming optimality, answer:

1. What is the exact optimisation objective?
2. What choices are feasible?
3. What local quantity does the greedy rule minimise or maximise?
4. Can some optimal solution be transformed to contain the greedy choice?
5. Why does the transformation preserve feasibility?
6. Why does it preserve objective value?
7. What subproblem remains?
8. Why does optimality of the remainder imply optimality of the whole solution?
9. Are there hidden assumptions under which the argument fails?

## What you must be able to explain

- How does a greedy algorithm differ from backtracking?
- What exactly is optimised by the local rule?
- Why is feasibility not the same as optimality?
- What does an exchange argument establish?
- Why is “there exists an optimal solution containing the greedy choice” sufficient?
- What is optimal substructure?
- How can a single counterexample refute a greedy rule?
- Why should a greedy method without an optimality proof be described as a heuristic rather than an exact optimiser?

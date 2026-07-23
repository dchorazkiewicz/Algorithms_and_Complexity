# Systematic and Heuristic Improvement

## Improvement begins with a failure model

A greedy algorithm is not improved by adding random conditions until examples pass. Improvement begins by asking why the current rule fails.

Suppose an algorithm repeatedly chooses the largest available coin. For some coin systems this is optimal. For others, such as `[1, 3, 4]`, it fails for target `6`. The useful observation is not merely that the answer is wrong. The useful observation is that the early choice `4` consumes too much value while leaving a remainder that requires two additional coins.

This chapter distinguishes two broad approaches named in the syllabus:

- **systematic improvement**, based on explicit analysis, guarantees, or an organised search through alternatives;
- **heuristic improvement**, based on rules that often help but are not guaranteed to produce the optimum.

## 1. Systematic improvement

A systematic method changes the algorithm in a way that can be explained and checked.

Typical strategies include:

1. strengthening the state so the algorithm remembers information it previously ignored;
2. testing several candidate choices rather than committing immediately;
3. adding a provably safe exchange or dominance rule;
4. combining greedy construction with backtracking or bounded search;
5. replacing an invalid greedy rule with a rule supported by a proof.

### Limited lookahead

For the coin example, one possible improvement is to compare the immediate greedy choice with a small number of alternatives.

```python
def greedy_coin_count(coins: list[int], target: int) -> int | None:
    ordered = sorted(coins, reverse=True)
    count = 0
    remaining = target

    for coin in ordered:
        use = remaining // coin
        count += use
        remaining -= use * coin

    return count if remaining == 0 else None
```

This algorithm is fast, but not always optimal. A systematic exact improvement is to search all feasible first choices and keep the best complete result.

```python
def minimum_coin_count(coins: list[int], target: int) -> int | None:
    best: int | None = None

    def search(remaining: int, used: int) -> None:
        nonlocal best

        if remaining == 0:
            if best is None or used < best:
                best = used
            return

        if remaining < 0:
            return

        if best is not None and used >= best:
            return

        for coin in coins:
            search(remaining - coin, used + 1)

    search(target, 0)
    return best
```

The second algorithm sacrifices speed for correctness. Its pruning rule is systematic: once `used >= best`, that branch cannot improve the best known solution.

## 2. Analysing counterexamples

A counterexample should be treated as data about the algorithm.

For each failure, record:

- the input;
- the greedy choice made first;
- the globally better alternative;
- the property ignored by the greedy rule;
- whether the failure can be detected early;
- whether a safe repair is possible.

A collection of counterexamples can reveal a pattern. For example, a rule may fail whenever a large choice creates an expensive remainder.

## 3. Exchange-based repair

Sometimes a greedy algorithm can be repaired by changing the selection rule until an exchange argument becomes possible.

For interval scheduling:

- earliest start is tempting but not safe;
- shortest duration is tempting but not safe;
- earliest finish supports a valid exchange argument.

The improvement is systematic because the new rule is chosen to support proof, not because it happened to pass more tests.

## 4. Heuristic improvement

A **heuristic** is a rule intended to improve practical behaviour without guaranteeing the best result for every input.

Common examples include:

- choosing the most constrained variable first;
- exploring the most promising branch first;
- preferring candidates with the best score-to-cost ratio;
- stopping after a time or iteration limit;
- restarting from several initial states;
- accepting a near-optimal result when exact search is too expensive.

In backtracking, the “most constrained first” heuristic may expose contradictions earlier. It changes search order, not the set of legal solutions.

In optimisation, a heuristic may deliberately return a non-optimal result. Its quality must then be evaluated empirically or with an approximation guarantee if one exists.

## 5. A scoring heuristic

Suppose tasks have a benefit and a cost. A simple heuristic is to sort by benefit-to-cost ratio.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Task:
    benefit: int
    cost: int


def choose_by_ratio(tasks: list[Task], budget: int) -> list[Task]:
    ordered = sorted(
        tasks,
        key=lambda task: task.benefit / task.cost,
        reverse=True,
    )

    chosen: list[Task] = []
    spent = 0

    for task in ordered:
        if spent + task.cost <= budget:
            chosen.append(task)
            spent += task.cost

    return chosen
```

The code is clear, but the rule is not automatically optimal for indivisible tasks. It is a heuristic unless a proof applies to the precise problem model.

## 6. Measuring improvement

A change can improve one property while worsening another.

Possible criteria include:

- solution quality;
- running time;
- memory use;
- number of explored states;
- predictability;
- implementation complexity;
- ease of proving correctness.

Therefore “better” must be defined before an algorithm is modified.

## 7. Exact, approximate, and heuristic outcomes

Keep these categories separate:

- **exact algorithm** — always returns an optimal or complete answer under its contract;
- **approximation algorithm** — has a proven bound on how far its answer may be from optimal;
- **heuristic algorithm** — is designed to work well in practice but may have no universal quality guarantee.

The syllabus names heuristic improvement, but that does not justify presenting a heuristic result as mathematically optimal.

## What you must be able to explain

- Why is passing more examples not sufficient evidence of improvement?
- Which part of a counterexample reveals the weakness of a greedy rule?
- What makes an improvement systematic?
- What makes a method heuristic?
- Which property is being improved: correctness, solution quality, time, or memory?
- When does a hybrid greedy-and-search method remain exact?
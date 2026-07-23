# Search Spaces and Partial Solutions

## Why some problems must be explored

Suppose we must place four queens on a chessboard so that no two attack each other. The input is small, but the difficulty is not a calculation. The difficulty is choosing a combination of positions that satisfies several constraints at once.

A direct formula is not obvious. Instead, we construct a candidate one decision at a time.

This changes the way we describe the algorithm. We need more than input and output. We need a model of the intermediate possibilities.

## States, choices, and goals

A **state** records the information needed to continue the construction.

For the queens problem, a useful state may contain:

- which row is being processed;
- which columns already contain queens;
- which diagonals are already occupied;
- the positions chosen so far.

A **choice** is one legal next action. In one row, each currently safe column is a possible choice.

A **goal state** is a state that represents a complete valid solution.

A **dead end** is a partial state that cannot be extended to a goal.

These four concepts turn a vague instruction such as “try possibilities” into an algorithmic model.

## The search tree

The possible decisions form a conceptual tree.

```text
empty board
├── queen in column 0
│   ├── next safe choice
│   └── next safe choice
├── queen in column 1
│   ├── next safe choice
│   └── next safe choice
└── ...
```

Each node is a partial state. Each edge represents one decision. Leaves may be complete solutions or dead ends.

The tree does not have to be stored explicitly. It is often generated during recursion. The call stack records the current path, while the mutable state records the decisions on that path.

## Partial solutions

A **partial solution** satisfies all constraints that can already be checked, but is not yet complete.

This distinction matters. A partial state should not merely be incomplete; it should remain potentially extendable.

For example, when building a permutation of distinct values, a partial solution may contain values without repetition. The moment a value repeats, the state violates a constraint and should be rejected immediately.

## A small example: binary strings without consecutive ones

Construct all binary strings of length `n` that do not contain `11`.

For `n = 3`, the valid results are:

```text
000 001 010 100 101
```

A state can be represented by the prefix built so far.

From prefix `01`, appending `1` is illegal because it would create `11`. Appending `0` is legal.

```python
def valid_binary_strings(n: int) -> list[str]:
    results: list[str] = []

    def build(prefix: str) -> None:
        if len(prefix) == n:
            results.append(prefix)
            return

        build(prefix + "0")

        if not prefix or prefix[-1] != "1":
            build(prefix + "1")

    build("")
    return results
```

The function does not generate every binary string and filter afterward. It avoids creating an invalid prefix in the first place.

## Correctness idea

The argument has two directions.

**Soundness:** every produced string has length `n` and no consecutive ones, because `1` is appended only when the previous symbol is not `1`.

**Completeness:** every valid string can be followed from the root by choosing its symbols in order. No valid branch is removed.

Both directions are essential. An algorithm may produce only valid answers and still miss some of them.

## Cost

The number of visited states depends on the structure of the search space. For this example it grows exponentially, although fewer than all `2^n` strings are generated.

The crucial lesson is:

> The cost of a search algorithm is determined not only by input size, but by how many partial states it explores.

## What you must be able to explain

- What information belongs in a search state?
- What is the difference between a partial solution and an arbitrary prefix?
- What makes a state a dead end?
- Why do soundness and completeness require separate arguments?
- Why can pruning reduce work without changing the set of solutions?
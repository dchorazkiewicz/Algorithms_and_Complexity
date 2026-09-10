# Search Spaces and Partial Solutions

## Why some problems must be explored

Suppose we must place four queens on a chessboard so that no two attack each other. The difficulty is not evaluating one formula. The difficulty is constructing a combination of decisions that satisfies several constraints simultaneously.

A direct solution may not be obvious. Instead, an algorithm builds a candidate one decision at a time and reasons about intermediate states. This requires a vocabulary richer than only input and output.

For a constructive search problem we should identify:

- the **state** that contains all information needed to continue;
- the **partial solution** represented by that state;
- the **choices** available from it;
- the **constraints** that every valid continuation must satisfy;
- the **goal condition** that recognises a complete answer;
- the **dead-end condition** that proves a state cannot lead to an answer.

This is the foundation of backtracking and many other search algorithms.

## From a problem statement to a search-space model

A search space is the set of candidate states that an algorithm may consider while constructing or locating a solution.

It is useful to distinguish four levels:

```text
problem instance
    ↓
state representation
    ↓
legal transitions / choices
    ↓
goal states
```

For the `n`-queens problem:

- **problem instance:** board size `n`;
- **state:** rows already processed plus occupied columns and diagonals;
- **choice:** place the next queen in one safe column;
- **goal:** queens have been placed in all `n` rows.

A good state representation contains enough information to decide what can happen next, but avoids irrelevant history.

## State versus history

The complete sequence of previous operations is usually not required.

For example, if two different execution histories produce exactly the same set of occupied columns and diagonals before processing the same row, then the future legal choices are identical. For search purposes, those histories represent the same relevant state.

This distinction matters because algorithms reason about **what remains possible**, not necessarily about every event that happened earlier.

## Partial solutions

A **partial solution** is an incomplete candidate that already respects the constraints that can be checked at its current stage.

For permutations of distinct values, a prefix such as `[3, 1]` is a valid partial solution if neither element has been used twice. A prefix `[3, 3]` violates the distinctness constraint and should not be considered a valid partial solution.

For `n` queens, a placement in the first `k` rows is a partial solution only if the queens placed so far do not attack one another.

This gives an important discipline:

> Reject a state as soon as a violated constraint proves that no extension can repair it.

That principle becomes pruning in the next chapters.

## Choices and transitions

A **choice** transforms one state into another.

If `S` is the current state and `c` is a legal choice, we can think of the transition abstractly as

\[
S' = T(S, c).
\]

The algorithm does not need to store an explicit mathematical function `T`, but it must implement the same idea: apply a choice, obtain a new state, and know what information changed.

In mutable backtracking implementations, the transition is often performed in place. Then the algorithm must also know how to reverse it exactly.

## Goal states and dead ends

A **goal state** is complete and satisfies the required postcondition.

A **dead end** is different from an incomplete state. A dead end is an incomplete state for which we can justify:

> no legal sequence of future choices can produce a goal state.

Examples:

- in `n` queens, the next row has no safe column;
- in a positive-number subset-sum problem, the current sum already exceeds the target;
- in graph colouring, a vertex has no colour compatible with already fixed neighbours.

The justification matters. Declaring a branch a dead end without proof risks deleting valid solutions.

## The conceptual search tree

Many constructive searches can be visualised as a tree:

```text
initial state
├── choice A
│   ├── choice A1
│   └── choice A2
├── choice B
│   ├── choice B1
│   └── choice B2
└── choice C
```

Each node represents a state. Each edge represents one decision. Leaves may be:

- complete solutions;
- dead ends;
- states stopped by a search policy or resource limit.

The tree is usually **conceptual**. It does not have to exist as a stored tree data structure. Recursive calls or an explicit stack can generate one path at a time.

## Branching factor and depth

Two quantities are useful when reasoning about cost:

- **branching factor** `b`: the number of choices available from a state;
- **depth** `d`: the maximum number of decisions on a root-to-leaf path.

If every state had exactly `b` children for `d` levels, the number of nodes would be on the order of

\[
1 + b + b^2 + \cdots + b^d = O(b^d).
\]

Real search spaces are rarely perfectly regular. Constraints often reduce the branching factor as depth increases. Nevertheless, `b^d` explains why even modest branching can create enormous search spaces.

For permutations of `n` distinct elements, the branching factors are

```text
n, n-1, n-2, ..., 1
```

and the number of complete leaves is `n!`, not `n^n`.

## Candidate count, explored states, and output size

These quantities must not be confused:

1. **candidate space size** — how many candidates exist conceptually;
2. **explored-state count** — how many states the particular algorithm actually visits;
3. **output size** — how many answers must be produced.

A pruning rule may greatly reduce the explored-state count without changing the candidate space or output set. Conversely, if a problem requires outputting exponentially many solutions, no algorithm can avoid spending at least proportional time writing those outputs.

## Example: binary strings without consecutive ones

Construct all binary strings of length `n` that do not contain `11`.

For `n = 3`, the valid results are:

```text
000 001 010 100 101
```

A state can be represented by the prefix built so far.

From prefix `01`, appending `1` is illegal because it would create `11`. Appending `0` is legal.

### Contract

**Input:** integer `n`.

**Precondition:** `n >= 0`.

**Output:** every binary string of length `n` that contains no substring `11`, exactly once.

**Side effects:** none outside the returned list.

```python
def valid_binary_strings(n: int) -> list[str]:
    if n < 0:
        raise ValueError("n must be non-negative")

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

The algorithm does not first generate all `2^n` strings and then filter them. It prevents an invalid prefix from being created.

## Manual trace for `n = 3`

```text
""
├── "0"
│   ├── "00"
│   │   ├── "000" ✓
│   │   └── "001" ✓
│   └── "01"
│       └── "010" ✓
└── "1"
    └── "10"
        ├── "100" ✓
        └── "101" ✓
```

The branches `011` and `11` are never generated because they would violate the local constraint immediately.

## Correctness

The proof has two obligations.

### Soundness

Every produced string has length `n`, because a result is recorded only when the prefix length is exactly `n`.

No produced string contains `11`, because the algorithm appends `1` only when the current prefix is empty or ends in `0`.

Therefore every output is valid.

### Completeness

Take any valid binary string `x` of length `n`. Follow its symbols from left to right.

- Whenever the next symbol is `0`, the algorithm always has the `0` branch.
- Whenever the next symbol is `1`, validity of `x` implies the previous symbol is not `1`, so the algorithm includes the `1` branch.

Thus the complete path corresponding to `x` is never removed, and every valid string is eventually produced.

Soundness and completeness are separate. An algorithm may output only valid answers and still miss some valid answers.

## Termination

Every recursive call increases `len(prefix)` by exactly one. The prefix length is bounded above by `n`. Therefore every root-to-leaf path has at most `n` recursive extensions, so all branches terminate.

## Complexity and Fibonacci growth

Let `F(n)` be the number of valid length-`n` binary strings without consecutive ones. Such a string either:

- starts with `0`, followed by any valid string of length `n-1`; or
- starts with `10`, followed by any valid string of length `n-2`.

Therefore the output count follows a Fibonacci-type recurrence:

\[
F(n) = F(n-1) + F(n-2).
\]

The algorithm performs work proportional to the number of generated valid prefixes and outputs. Its running time is therefore exponential in `n`, but smaller than blindly generating all `2^n` strings. The recursion depth is `O(n)` excluding storage for the returned outputs.

## Exhaustive search versus backtracking

An **exhaustive search** systematically considers all candidates in a defined space.

**Backtracking** is a structured form of exhaustive exploration that builds candidates incrementally and abandons a branch when the current partial state cannot lead to a required solution.

Backtracking can still be exponential. Its advantage is not a magical polynomial guarantee. Its advantage is that problem constraints can prevent large useless regions from being explored.

## Representation questions

Before writing a search procedure, answer:

1. What is the minimum state needed to continue correctly?
2. Which part of the state is the partial solution?
3. Which choices are legal from this state?
4. Which constraints can already be checked?
5. What exactly defines completion?
6. What proves that a state is a dead end?
7. How large can the branching factor become?
8. What is the maximum depth?
9. Is the algorithm looking for one solution, the best solution, or all solutions?
10. Does output size itself impose a lower bound on running time?

## Common mistakes

- treating the search tree as though it must be stored explicitly;
- storing unnecessary history instead of sufficient state;
- calling every incomplete state a dead end;
- discussing `O(b^d)` without defining `b` and `d`;
- confusing the number of conceptual candidates with the number of explored states;
- proving soundness but forgetting completeness;
- claiming that pruning makes an exponential problem polynomial without analysing the remaining search space.

## What you must be able to explain

- What information belongs in a search state?
- What is the difference between state and execution history?
- What is the difference between a partial solution and an arbitrary prefix?
- What makes a state a dead end?
- What do branching factor and depth describe?
- Why are candidate count, explored-state count, and output size different quantities?
- Why do soundness and completeness require separate arguments?
- Why can backtracking reduce work while remaining exponential in the worst case?

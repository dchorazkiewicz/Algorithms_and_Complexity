# The Backtracking Pattern

## Choose, explore, undo

Backtracking is a disciplined way to explore alternatives. It builds one partial solution, follows it as far as useful, and returns to an earlier decision when the current branch fails or has been fully explored.

Its characteristic structure is:

```text
choose
explore
undo
```

The final step distinguishes mutable-state backtracking from ordinary recursion over immutable inputs. The algorithm changes state before a recursive call and must restore exactly the previous state before trying a sibling choice.

A useful mental model is:

```text
state before choice
      ↓ apply
state for child branch
      ↓ explore
state after child returns
      ↓ undo
state identical to state before choice
```

If the final equality fails, sibling branches no longer represent independent alternatives.

## A generic template

```python
def search(state) -> None:
    if is_complete(state):
        record(state)
        return

    for choice in available_choices(state):
        apply(choice, state)

        if remains_promising(state):
            search(state)

        undo(choice, state)
```

The template hides several obligations. Before implementing it, answer:

1. What exactly is the state?
2. Which invariant must hold at entry to every recursive call?
3. When is the state complete?
4. Which choices are legal?
5. Which states are promising?
6. How does every recursive call make progress?
7. Which mutations must be undone?
8. In what order must they be undone?
9. Is the search looking for one solution or all solutions?
10. How will the explored-state count be analysed?

## Example 1: permutations

Generate all permutations of distinct input values.

### Contract

**Input:** a list `values` containing pairwise distinct values.

**Output:** every permutation of `values`, exactly once.

**Postcondition:** every result has the same length and elements as the input, with no repetition or omission.

**Side effects:** the input list is not modified.

A useful mutable state contains:

- `current`: the prefix already chosen;
- `used[index]`: whether the input element at that index is already present in `current`.

```python
def permutations(values: list[int]) -> list[list[int]]:
    results: list[list[int]] = []
    current: list[int] = []
    used = [False] * len(values)

    def build() -> None:
        if len(current) == len(values):
            results.append(current.copy())
            return

        for index, value in enumerate(values):
            if used[index]:
                continue

            used[index] = True
            current.append(value)

            build()

            current.pop()
            used[index] = False

    build()
    return results
```

## State invariant

At the beginning of every call to `build`:

- `current` contains exactly the values whose indices are marked `True` in `used`;
- every marked index appears exactly once in `current`;
- every unmarked index remains available;
- `len(current)` equals the number of `True` entries in `used`.

The choose operations preserve the invariant for the child call. The undo operations restore the invariant for the parent state.

## Why undo order matters

Suppose one choice performs:

```text
1. mark index as used
2. append its value to current
```

The logical inverse should restore the state consistently. In this example either mutation can technically be reversed first because no code observes the intermediate state, but a safer general rule is:

> Undo compound changes in reverse order of application.

This mirrors stack discipline and reduces the chance that one restoration step depends on information already destroyed by another.

## Why copying is needed at a solution

`current` is one mutable working list reused by all branches. Storing it directly would store multiple references to the same object.

```python
results.append(current)       # wrong for this design
results.append(current.copy())  # snapshot of the current solution
```

Backtracking often reuses mutable state precisely to avoid copying at every branch. That makes snapshotting at the output boundary essential.

## Manual trace for `[1, 2, 3]`

A shortened trace is:

```text
[]
├── choose 1 → [1]
│   ├── choose 2 → [1, 2]
│   │   └── choose 3 → [1, 2, 3] ✓
│   │       undo 3 → [1, 2]
│   └── undo 2 → [1]
│       choose 3 → [1, 3]
│       └── choose 2 → [1, 3, 2] ✓
└── undo 1 → []
    choose 2 → ...
```

The important event is not only reaching a leaf. After each child returns, the parent state is exactly what it was before that child choice.

## Termination

Every recursive call increases `len(current)` by one. The length is bounded by `len(values)`. Therefore every branch has finite depth at most `n`.

## Correctness

### Soundness

A result is recorded only when `len(current) == n`. The invariant guarantees that `current` contains distinct input elements. Therefore every result is a valid permutation.

### Completeness

Take any permutation `p` of the input. At depth `k`, the next value of `p` has not yet been used, so the corresponding branch is available. Following those branches reconstructs `p`. Because every unused index is considered, no permutation is omitted.

### Uniqueness

Because each input index can be chosen only once per path and every sequence of index choices is unique, no permutation is generated twice when the input elements are distinct.

## Complexity

There are `n!` complete outputs. Writing each length-`n` permutation already requires `Ω(n · n!)` output work if full copies are returned.

The recursion depth is `O(n)`. The working state uses `O(n)` space excluding output storage. This illustrates an important distinction:

- search overhead;
- recursion/working-state space;
- output cost.

## Common failure: incomplete undo

```python
current.pop()
# forgot: used[index] = False
```

The next sibling branch sees an index incorrectly marked as unavailable. The algorithm may still output only valid permutations, but completeness is destroyed.

That is a useful warning: a state-restoration bug does not always produce obviously invalid output. It may silently remove valid solutions.

---

# Example 2: N-Queens

The queens problem demonstrates backtracking with nontrivial constraints and explicit bookkeeping state.

## Problem

Place `n` queens on an `n × n` chessboard so that no two queens share:

- a row;
- a column;
- a descending diagonal;
- an ascending diagonal.

We place exactly one queen per row, so row conflicts are eliminated by construction.

## Contract

**Input:** integer `n`.

**Precondition:** `n >= 0`.

**Output:** one valid placement represented as a list where `placement[row]` is the chosen column, or `None` if no placement exists.

**Postcondition when a list is returned:**

- its length is `n`;
- all columns are distinct;
- all values `row - column` are distinct;
- all values `row + column` are distinct.

**Side effects:** none outside local working state.

## State representation

At recursive depth `row`, maintain:

- `placement`: chosen columns for rows `0 .. row-1`;
- `columns`: occupied columns;
- `diag_down`: occupied values of `row - column`;
- `diag_up`: occupied values of `row + column`.

The diagonal identifiers work because squares on the same diagonal share one of these expressions.

## Pseudocode

```text
SEARCH(row)
    if row = n
        return success

    for each column from 0 to n-1
        if column or either diagonal is occupied
            continue

        add queen at (row, column)
        mark column and diagonals

        if SEARCH(row + 1) succeeds
            return success

        remove queen
        unmark column and diagonals

    return failure
```

## Python implementation

```python
def solve_queens(n: int) -> list[int] | None:
    if n < 0:
        raise ValueError("n must be non-negative")

    placement: list[int] = []
    columns: set[int] = set()
    diag_down: set[int] = set()
    diag_up: set[int] = set()

    def search(row: int) -> bool:
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

            if search(row + 1):
                return True

            placement.pop()
            columns.remove(column)
            diag_down.remove(down)
            diag_up.remove(up)

        return False

    return placement.copy() if search(0) else None
```

## State invariant

At entry to `search(row)`:

- `len(placement) == row`;
- there is exactly one queen in every earlier row;
- `columns` contains exactly the columns used by `placement`;
- `diag_down` contains exactly the occupied descending-diagonal identifiers;
- `diag_up` contains exactly the occupied ascending-diagonal identifiers;
- no two queens in `placement` attack each other.

This invariant is stronger than “the code seems consistent”. It states what every state variable means.

## Trace fragment for `n = 4`

One branch begins:

```text
row 0: choose column 0
placement = [0]

row 1:
  column 0 blocked by column
  column 1 blocked by diagonal
  choose column 2
placement = [0, 2]

row 2:
  every column is blocked
  dead end

undo row 1 choice
placement = [0]

row 1: choose column 3
placement = [0, 3]
...
```

The important observation is that after `[0, 2]` fails, the algorithm restores not only `placement` but also all three occupancy sets before trying column `3`.

## Correctness

### Soundness

A queen is placed only when its column and both diagonals are unoccupied. The invariant therefore guarantees that every maintained partial placement is conflict-free. A solution is accepted only after all `n` rows have been processed, so any returned placement is valid.

### Completeness

For each row, the algorithm considers every column not excluded by already placed queens. Any valid full solution has one safe column in each row relative to its earlier rows. Therefore the path corresponding to any valid solution is never removed by the safety checks.

If the procedure returns failure after trying every safe choice, no valid completion exists from that state.

## Termination

Every recursive call advances from `row` to `row + 1`. Since `row <= n`, recursion depth is at most `n`. Every loop has exactly `n` candidate columns, so each finite call also finishes.

## Complexity

A coarse upper bound considers at most `n` choices at each of `n` levels, giving `O(n^n)` candidate paths. The actual space is much smaller because each column can be used only once and diagonal constraints prune many branches. A tighter simple bound based only on distinct columns is `O(n!)` candidate placements before considering diagonal pruning.

Safety checks using sets are expected `O(1)` each. Working memory is `O(n)` for placement, occupancy sets, and recursion depth, excluding any stored outputs.

The key lesson is that the complexity of backtracking is controlled by the number of states actually explored, not merely by the cost of one recursive call.

## Searching for one solution versus all solutions

The implementation above returns after the first solution. To enumerate all solutions:

- record a copy at `row == n`;
- do not return immediately after a successful child;
- continue restoring and exploring sibling branches.

This changes output size and therefore changes the unavoidable running-time lower bound.

## When immutable state is an alternative

Backtracking does not require mutation. One could pass fresh copies:

```python
search(
    row + 1,
    placement + [column],
    columns | {column},
    diag_down | {down},
    diag_up | {up},
)
```

This makes sibling independence easier to reason about but allocates more objects. Mutable choose–undo style is often more efficient, while immutable style can be simpler and safer for small educational examples.

The representation choice is part of algorithm design.

## What you must be able to explain

- Why is undo necessary in mutable-state backtracking?
- What invariant connects the visible partial solution with bookkeeping state?
- Why can incomplete undo destroy completeness without producing invalid outputs?
- Why must a stored solution often be copied?
- How does a decreasing or increasing measure prove termination?
- Why is `O(number of explored states)` often a better starting point than guessing a polynomial expression?
- How do one-solution and all-solutions searches differ in control flow and output cost?
- What are the trade-offs between copying state and mutating then undoing it?

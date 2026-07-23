# The Backtracking Pattern

## Choose, explore, undo

Backtracking is a disciplined way to explore alternatives. It builds one partial solution, follows it as far as useful, and returns to an earlier decision when the current branch fails or has been fully explored.

Its characteristic structure is:

```text
choose
explore
undo
```

The final step is what distinguishes backtracking from ordinary recursion over immutable inputs. The algorithm modifies a shared or local state and must restore that state before trying the next alternative.

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

The template contains five design questions:

1. What exactly is the state?
2. When is it complete?
3. Which choices are available?
4. Which states are promising?
5. How is each choice undone exactly?

## Example: permutations

To generate all permutations of distinct values, maintain:

- a current arrangement;
- a Boolean or set-based record of used elements.

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

The two undo operations must reverse the two apply operations in the opposite order.

## Why copying is needed at the goal

`current` is mutated throughout the search. Appending the same list object to `results` would make every stored result refer to one later-mutated object.

Therefore:

```python
results.append(current.copy())
```

stores a snapshot.

## State invariant

At the start of every call to `build`:

- `current` contains exactly the values whose indices are marked in `used`;
- no index is represented more than once;
- the length of `current` equals the number of `True` entries in `used`.

Choosing preserves the invariant. Undoing restores the exact state that existed before the choice.

## Termination

Each recursive call increases `len(current)` by one. The length cannot exceed `len(values)`. Therefore every branch has finite depth.

## Complexity

There are `n!` complete permutations. Any algorithm that explicitly outputs all of them requires at least proportional output work. The recursion uses `O(n)` depth, excluding the output list.

## Common failure: incomplete undo

```python
current.pop()
# forgot: used[index] = False
```

The program then carries information from one branch into another. This is not a minor cleanup bug. It corrupts the meaning of the search state.

## What you must be able to explain

- Why is undo necessary?
- Which operations must be reversed?
- Why does the order of undo matter?
- What invariant connects `current` and `used`?
- Why is storing a copy different from storing the mutable working list?
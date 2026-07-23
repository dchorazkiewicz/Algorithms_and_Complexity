# Linear Search

## The simplest honest search strategy

When a sequence is not ordered and no auxiliary index exists, the algorithm has little information. It cannot safely skip an element merely because earlier values were smaller or larger. The direct strategy is therefore to inspect candidates one by one.

This is **linear search**. Its importance is not that the code is difficult. Its importance is that it shows how a precise contract, a processed-prefix invariant, early termination, and worst-case analysis fit together.

## 1. First-occurrence search

```python
def first_index(values: list[int], target: int) -> int | None:
    for index, value in enumerate(values):
        if value == target:
            return index

    return None
```

The function returns as soon as a match is found. Because indices are examined from left to right, the returned index is the first occurrence.

## 2. State and processed prefix

At the start of an iteration with index `i`, the sequence is divided into:

```text
values[0:i]     processed prefix
values[i:]      unprocessed suffix
```

The useful invariant is:

> The target does not occur in the processed prefix `values[0:i]`.

Initially, the prefix is empty, so the statement is true. If `values[i]` is not the target, extending the processed prefix by that element preserves the invariant. If `values[i]` is the target, all earlier elements are known not to match, so `i` is the first occurrence.

## 3. Full trace

For:

```text
values = [6, 4, 9, 4]
target = 4
```

| Step | `index` | `value` | Processed prefix before test | Result |
|---:|---:|---:|---|---|
| 1 | 0 | 6 | `[]` | continue |
| 2 | 1 | 4 | `[6]` | return `1` |

The later occurrence at index `3` is irrelevant because the contract asks for the first occurrence.

## 4. Absence

For target `5`, every element is inspected. When the loop ends, the processed prefix is the entire sequence. The invariant then states that the target does not occur anywhere in the input, so returning `None` is correct.

This illustrates a common proof pattern:

- early return establishes a successful postcondition;
- normal loop completion establishes the failure case.

## 5. Termination

The loop iterates over a finite sequence. Each iteration processes one new position. Therefore at most `n` iterations occur.

A numerical termination measure is:

```text
len(values) - index
```

It decreases as the index advances.

## 6. Time and space complexity

Let `n = len(values)`.

- Best case: the target is at index `0`, so one comparison is made: `O(1)`.
- Worst case: the target is absent or at the final position: `O(n)`.
- Auxiliary space: only a constant number of variables: `O(1)`.

When complexity is stated without qualification, linear search is usually described by its worst-case time `O(n)`.

## 7. Search without early return

A Boolean version can record a result:

```python
def contains_without_early_return(values: list[int], target: int) -> bool:
    found = False

    for value in values:
        if value == target:
            found = True

    return found
```

This is correct, but it keeps scanning after success. In the worst case both versions are `O(n)`, yet the early-return version may perform substantially less work on particular inputs.

Big O does not describe every practical difference. It describes growth up to asymptotic bounds.

## 8. Last occurrence

```python
def last_index(values: list[int], target: int) -> int | None:
    result = None

    for index, value in enumerate(values):
        if value == target:
            result = index

    return result
```

Now early return would be wrong because a later match may exist. The invariant becomes:

> `result` is the last occurrence of the target in the processed prefix, or `None` if the target has not occurred there.

The code is similar, but the meaning of the state is different.

## 9. Searching backwards

Another last-occurrence implementation starts at the end:

```python
def last_index_backward(values: list[int], target: int) -> int | None:
    for index in range(len(values) - 1, -1, -1):
        if values[index] == target:
            return index

    return None
```

This regains early termination. The traversal direction is chosen to match the contract.

## 10. Recursive linear search

```python
def contains_from(values: list[int], target: int, index: int = 0) -> bool:
    if index == len(values):
        return False

    if values[index] == target:
        return True

    return contains_from(values, target, index + 1)
```

The recursive state is the start of the unprocessed suffix. The measure `len(values) - index` decreases by one. Time is `O(n)`, but call-stack space is `O(n)` in the worst case, unlike the iterative version’s `O(1)` auxiliary space.

## 11. Common errors

### Returning after the first non-match

```python
def broken_contains(values: list[int], target: int) -> bool:
    for value in values:
        if value == target:
            return True
        return False
```

Only the first element is examined. The failure result belongs after the loop.

### Using the value as an index

```python
for value in values:
    if values[value] == target:
        ...
```

This confuses an element with its position.

### Losing the first-occurrence guarantee

Updating `result` after every match returns the last occurrence, not the first.

## 12. What you must be able to explain

- why unordered input prevents safe skipping;
- how the processed-prefix invariant proves first-occurrence search;
- why absence is known only after all candidates are eliminated;
- how traversal direction follows the contract;
- why iterative and recursive linear search have the same time but different auxiliary-space costs.

## Practice

1. Trace first-occurrence search for an absent target.
2. Write `count_occurrences` and state its invariant.
3. Write a search returning all matching indices.
4. Search records by a selected key without copying them.
5. Produce a counterexample for the misplaced `return False` bug.

The next chapter asks what becomes possible when the sequence is sorted.
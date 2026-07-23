# Traversing and Updating Arrays

## Why traversal is the basic array pattern

Direct access is useful when the index is already known. Many algorithms, however, must inspect an entire collection: compute a total, find an extreme value, count matches, verify a property, or transform every component. These operations use **traversal**.

A traversal is not merely a loop over syntax. It is a controlled movement through an index range or sequence of components while maintaining state that summarises the part already processed.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to design value-based and index-based traversals, explain processed prefixes and suffixes, update components safely, distinguish in-place from out-of-place transformations, and analyse traversal cost.

---

## 1. Complete traversal

A complete traversal visits every component exactly once.

```python
def total(values: list[int]) -> int:
    result = 0
    for value in values:
        result += value
    return result
```

The state meaning is:

```text
result = sum of the components processed so far
```

After all `n` components have been processed, the state describes the whole array.

```text
Time: O(n)
Auxiliary space: O(1)
```

---

## 2. Value-based versus index-based traversal

Use a value-based loop when only the component values matter:

```python
for value in values:
    print(value)
```

Use indices when position matters or when components must be replaced:

```python
for index in range(len(values)):
    values[index] *= 2
```

Use `enumerate` when both are needed:

```python
for index, value in enumerate(values):
    if value < 0:
        print("negative value at", index)
```

The representation should match the problem. Adding indices to a value-only task creates noise; omitting indices from a positional task makes the solution awkward or incorrect.

---

## 3. Processed prefix

During a left-to-right traversal, it is useful to divide the array into two conceptual regions:

```text
[ processed prefix | unprocessed suffix ]
```

For:

```python
values = [4, 7, 2, 9, 5]
```

while processing index `3`:

```text
[4, 7, 2 | 9, 5]
```

The loop state should describe the processed prefix. For maximum-finding:

```text
maximum = greatest value in the processed prefix
```

This interpretation is the basis of loop invariants and correctness arguments.

---

## 4. Reading neighbouring components

Some algorithms compare adjacent elements:

```python
def is_non_decreasing(values: list[int]) -> bool:
    for index in range(1, len(values)):
        if values[index] < values[index - 1]:
            return False
    return True
```

The loop begins at `1` because `values[index - 1]` must be valid.

For an array of length `n`, there are `n - 1` adjacent pairs. This is a common source of off-by-one mistakes.

The early return may stop the best-case execution quickly, but the worst-case running time remains `O(n)`.

---

## 5. Updating every component

Problem:

> Add a fixed offset to every array component.

```python
def add_offset_in_place(values: list[int], offset: int) -> None:
    for index in range(len(values)):
        values[index] += offset
```

Postcondition:

```text
for every valid index i:
    values[i] = old(values[i]) + offset
```

The function modifies the original list. Its auxiliary space is `O(1)`.

---

## 6. In-place versus out-of-place transformation

An **in-place** algorithm updates the original structure:

```python
def square_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] *= values[index]
```

An **out-of-place** algorithm constructs a new result:

```python
def squared(values: list[int]) -> list[int]:
    result: list[int] = []

    for value in values:
        result.append(value * value)

    return result
```

Both require `O(n)` time. Their effects differ:

```text
in-place:
    modifies input
    O(1) auxiliary state beyond the input

out-of-place:
    preserves input
    O(n) output storage
```

The contract must say which behaviour is intended.

---

## 7. Building a filtered array

Filtering keeps selected values:

```python
def positive_values(values: list[int]) -> list[int]:
    result: list[int] = []

    for value in values:
        if value > 0:
            result.append(value)

    return result
```

The output length is not known in advance, but it cannot exceed the input length.

```text
Time: O(n)
Output space: O(k), where k is the number of retained values
```

The original indices are not preserved automatically. If positions matter, the output may need records or `(index, value)` pairs.

---

## 8. Prefix accumulation

Sometimes each output component depends on all earlier input components.

```python
def prefix_sums(values: list[int]) -> list[int]:
    result: list[int] = []
    running_total = 0

    for value in values:
        running_total += value
        result.append(running_total)

    return result
```

For:

```text
[3, 1, 4, 2]
```

we obtain:

```text
[3, 4, 8, 10]
```

Invariant after processing index `i`:

```text
running_total = sum(values[0:i+1])
result[j] = sum(values[0:j+1]) for every j ≤ i
```

This example shows that traversal may produce a structure, not only one scalar result.

---

## 9. Traversing from right to left

Some problems naturally process a suffix:

```python
def suffix_maxima(values: list[int]) -> list[int]:
    if not values:
        return []

    result = [0] * len(values)
    current_maximum = values[-1]

    for index in range(len(values) - 1, -1, -1):
        if values[index] > current_maximum:
            current_maximum = values[index]
        result[index] = current_maximum

    return result
```

For:

```text
[4, 2, 7, 3]
```

result:

```text
[7, 7, 7, 3]
```

The state now describes the processed suffix rather than a prefix.

---

## 10. Safe mutation during traversal

Replacing existing components while iterating over stable indices is usually straightforward.

Changing the collection length during traversal is more dangerous:

```python
for value in values:
    if value < 0:
        values.remove(value)
```

Removing a component shifts later components. The iterator's progress and the changed positions may cause elements to be skipped.

Safer designs include:

- build a filtered output list;
- traverse indices from right to left when deleting;
- use an explicit write index for in-place compaction.

The operation changes not only values but also structure, so the traversal strategy must account for shifting.

---

## 11. Complete example: in-place compaction

Problem:

> Move all non-zero values to the beginning of the list, preserve their order, fill the remaining positions with zero, and keep the length unchanged.

```python
def compact_nonzero(values: list[int]) -> None:
    write_index = 0

    for value in values:
        if value != 0:
            values[write_index] = value
            write_index += 1

    for index in range(write_index, len(values)):
        values[index] = 0
```

For:

```text
[0, 4, 0, 2, 7, 0]
```

result:

```text
[4, 2, 7, 0, 0, 0]
```

The first traversal preserves the order of non-zero values. The second fills unused positions.

```text
Time: O(n)
Auxiliary space: O(1)
```

The algorithm demonstrates two positions:

- the current read position, implicit in the traversal;
- `write_index`, the next destination for a retained value.

---

## What you must be able to explain

You should be able to explain:

- the difference between value-based and index-based traversal;
- what a processed prefix or suffix means;
- why neighbour comparison begins at index `1`;
- the contract difference between in-place and out-of-place transformations;
- why changing array length during traversal is dangerous;
- how a read index and write index support compaction;
- why a complete traversal is `O(n)`.

## Practice

1. Write an in-place function that replaces every value greater than `100` by `100`.
2. Write an out-of-place function returning the absolute values.
3. Trace `prefix_sums` for `[-2, 5, 1, -4]`.
4. Write a function detecting the first adjacent duplicate.
5. Explain why removing elements from left to right can skip values.
6. Design a right-to-left traversal computing suffix sums.

## Summary

Traversal connects array structure with algorithm state. A loop processes a prefix or suffix, and the maintained variables describe what has already been learned or produced. Index choice, mutation policy, and direction all follow from the operation being performed.
# `for` Loops and Definite Iteration

## Why definite iteration deserves careful study

A `for` loop is often introduced as the easy kind of loop. It appears to remove many decisions: Python chooses the next element automatically, advances the iteration, and stops when the sequence is exhausted.

That convenience is useful, but it can hide important algorithmic questions. A student may write a loop that executes without error and still process the wrong elements, skip a boundary, start too early, stop too late, or confuse element values with their indices.

Definite iteration means that the set of iterations is determined by a finite iterable or range. The loop mechanism handles movement through that set, but the programmer remains responsible for choosing the correct set.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to choose between element-based and index-based iteration, interpret Python ranges precisely, diagnose off-by-one errors, and justify which elements a loop processes.

---

## 1. Iterating over values

The most direct Python loop processes values themselves:

```python
def count_negative(values: list[int]) -> int:
    count = 0

    for value in values:
        if value < 0:
            count += 1

    return count
```

The loop header:

```python
for value in values:
```

means that each element of `values` becomes the current `value` exactly once, in sequence order.

For:

```text
[5, -2, 0, -7]
```

the loop binds `value` successively to:

```text
5, -2, 0, -7
```

This form is appropriate when the algorithm needs the element but not its position.

---

## 2. Iterating over indices

Sometimes position matters.

> Return the index of the first negative value, or `-1` if no negative value exists.

```python
def first_negative_index(values: list[int]) -> int:
    for index in range(len(values)):
        if values[index] < 0:
            return index

    return -1
```

Now the loop processes indices:

```text
0, 1, 2, ..., len(values) - 1
```

The index is used to access the corresponding value:

```python
values[index]
```

This form is useful when the algorithm must return a position, compare neighbouring positions, modify an element in place, or access more than one element through a positional relationship.

---

## 3. `enumerate` expresses value and position together

Python provides `enumerate` when both position and value are needed:

```python
def first_negative_index(values: list[int]) -> int:
    for index, value in enumerate(values):
        if value < 0:
            return index

    return -1
```

This version avoids repeated indexing and makes the roles explicit:

- `index` is the current position;
- `value` is the element stored there.

The two implementations express the same high-level algorithm. The `enumerate` form is often clearer when no other indexed access is required.

---

## 4. Understanding `range`

The call:

```python
range(start, stop, step)
```

produces an arithmetic progression beginning at `start`, advancing by `step`, and stopping **before** `stop`.

Examples:

```python
list(range(5))          # [0, 1, 2, 3, 4]
list(range(2, 6))       # [2, 3, 4, 5]
list(range(1, 8, 2))    # [1, 3, 5, 7]
list(range(5, 0, -1))   # [5, 4, 3, 2, 1]
```

The excluded upper boundary is central. Many loop errors arise from reasoning as though `stop` were included.

---

## 5. The half-open interval model

Python ranges and list slices use **half-open intervals**:

```text
[start, stop)
```

This means:

```text
start ≤ index < stop
```

For a list of length `n`, valid indices are:

```text
0 ≤ index < n
```

Therefore:

```python
range(len(values))
```

produces every valid index exactly once.

The half-open convention has useful algebraic properties. The number of unit-step positions in `range(start, stop)` is `stop - start` when `stop ≥ start`. Adjacent intervals compose cleanly:

```text
[0, k) and [k, n)
```

cover `[0, n)` without overlap or gaps.

---

## 6. Off-by-one errors

An **off-by-one error** occurs when a boundary differs from the intended boundary by one.

Consider the task:

> Sum all elements of a list.

Incorrect:

```python
def sum_values(values: list[int]) -> int:
    total = 0

    for index in range(len(values) - 1):
        total += values[index]

    return total
```

For a list of length `4`, the range is:

```text
0, 1, 2
```

Index `3` is omitted. The function sums every element except the last.

A trace of the iteration set exposes the problem immediately.

Correct:

```python
for index in range(len(values)):
```

A reliable habit is to write down the exact first and last index the loop should process before writing the range.

---

## 7. Starting from the second element

Some algorithms initialise state from the first element and then process the remainder.

```python
def maximum(values: list[int]) -> int:
    if not values:
        raise ValueError("values must not be empty")

    current_maximum = values[0]

    for index in range(1, len(values)):
        if values[index] > current_maximum:
            current_maximum = values[index]

    return current_maximum
```

The range begins at `1` because index `0` has already been incorporated into the initial state.

Processing index `0` again would not usually change the answer, but it would obscure the reasoning and perform redundant work.

The conceptual partition is:

```text
initially processed: [0]
loop processes:      [1, n)
```

---

## 8. Neighbour comparisons

To compare adjacent elements, the current index must have a predecessor.

> Return `True` if the list contains a decreasing adjacent pair.

```python
def has_decrease(values: list[int]) -> bool:
    for index in range(1, len(values)):
        if values[index] < values[index - 1]:
            return True

    return False
```

The loop begins at `1` because `index - 1` must be valid.

For an empty list or a one-element list, the range is empty. The function returns `False`, which is consistent: no adjacent pair exists.

---

## 9. Processing all pairs is different from processing neighbours

A nested loop may compare every pair of distinct positions:

```python
def has_duplicate(values: list[int]) -> bool:
    for left in range(len(values)):
        for right in range(left + 1, len(values)):
            if values[left] == values[right]:
                return True

    return False
```

The inner range begins at `left + 1`, so:

- a position is never compared with itself;
- each unordered pair is considered once;
- reversed duplicate comparisons are avoided.

This loop structure performs approximately:

```text
n(n - 1) / 2
```

comparisons in the worst case, giving `O(n²)` time.

The iteration set itself therefore determines complexity.

---

## 10. Modifying a list while iterating

Iterating directly over a list while changing its length can produce confusing behaviour.

Problematic:

```python
values = [1, 2, 3, 4]

for value in values:
    if value % 2 == 0:
        values.remove(value)
```

Removing an element shifts later elements while the loop's internal position advances. Some values may be skipped.

Safer approaches include building a new list:

```python
def without_even(values: list[int]) -> list[int]:
    result: list[int] = []

    for value in values:
        if value % 2 != 0:
            result.append(value)

    return result
```

or iterating over a copy when mutation is specifically required.

The broader lesson is that the iteration structure and the data structure being modified interact. Later modules will analyse these interactions in greater depth.

---

## 11. A `for` loop still needs a correctness argument

Python guarantees that a finite list iteration ends. It does not guarantee that the algorithm computes the intended result.

For the maximum algorithm, the central invariant is:

```text
Before each iteration at index i,
current_maximum is the greatest value in values[0:i].
```

Initialisation establishes the claim for the first element. Each iteration extends the processed prefix by one value and updates the maximum if necessary. At completion, the processed prefix is the whole list.

The loop construct supplies traversal. The algorithm designer supplies the meaningful state and update.

---

## 12. Complexity of definite iteration

A single full traversal of `n` elements generally gives:

```text
O(n) time
```

Two consecutive traversals give:

```text
O(n) + O(n) = O(n)
```

Two nested full traversals give:

```text
O(n²)
```

A loop over every second index still gives `O(n)` because it performs approximately `n/2` iterations.

The exact constants matter for implementation performance, but asymptotic analysis focuses on growth.

---

## 13. Common mistakes

### Confusing values with indices

```python
for value in values:
    print(values[value])
```

This treats each value as though it were a valid index.

### Including an invalid upper index

```python
for index in range(len(values) + 1):
```

The final index equals `len(values)`, which is outside the list.

### Omitting the final valid index

```python
range(len(values) - 1)
```

skips the last element.

### Beginning too early

A neighbour comparison at index `0` may accidentally use Python's negative indexing and compare the first element with the last.

### Mutating sequence length during direct iteration

The loop's traversal and the data layout may become misaligned.

### Assuming finite traversal implies correctness

A loop can terminate perfectly while processing the wrong set of indices.

---

## 14. What you must be able to explain

After this chapter, you should be able to:

- choose value-based, index-based, or `enumerate` iteration;
- explain half-open intervals;
- determine the exact sequence produced by a range;
- identify off-by-one errors;
- justify starting at index `0` or `1`;
- design neighbour and pair loops;
- explain why changing a list during iteration is dangerous;
- infer complexity from the iteration set.

## 15. Practice

### Exercise 1 — Last positive index

Write a function that returns the last index containing a positive value, or `-1` if none exists. Decide whether to scan forward or backward and justify the range.

### Exercise 2 — Sorted order

Write a function that returns `True` when a list is non-decreasing. Explain why the loop starts at index `1`.

### Exercise 3 — Pair count

Count how many pairs `(i, j)` satisfy `i < j` and `values[i] == values[j]`. State the number of possible pairs in the worst case.

### Exercise 4 — Repair the boundary

Find and repair the errors:

```python
def sum_except_first(values: list[int]) -> int:
    total = 0
    for index in range(1, len(values) - 1):
        total += values[index]
    return total
```

### Exercise 5 — Explain the iteration set

For each range below, list the produced values and describe a plausible algorithmic use:

```python
range(5)
range(2, 7)
range(6, 0, -1)
range(0, 10, 2)
```

## 16. Summary

A `for` loop handles movement through a finite iteration set, but the correctness of that set remains an algorithmic responsibility. Careful reasoning about indices, values, ranges, and boundaries prevents many errors that otherwise look like mysterious implementation bugs.

The next chapter turns to `while` loops, where progress and termination are no longer supplied automatically by traversal of a finite sequence.
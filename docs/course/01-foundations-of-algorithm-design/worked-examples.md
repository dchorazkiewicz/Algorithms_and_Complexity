# Worked Examples: From Specification to Python

## Why worked examples matter

Definitions become useful only when they guide real decisions. This chapter combines the ideas from Module 01 into complete solution workflows.

Each example follows the same structure:

1. problem statement;
2. contract;
3. representation of the central idea;
4. state design;
5. pseudocode;
6. Python implementation;
7. manual trace;
8. correctness argument;
9. termination argument;
10. complexity analysis;
11. boundary cases and common mistakes.

The examples are deliberately small. Their purpose is to establish a disciplined method that later applies to searching, sorting, recursion, trees, graphs, and more complex data structures.

---

# Example 1 — Maximum of three values

## Problem

> Given three integers, return the greatest value.

## Contract

```text
Input:
    first, second, third — integers

Precondition:
    all three inputs are comparable integers

Postcondition:
    result is equal to one of the inputs
    result >= first
    result >= second
    result >= third

Side effects:
    none
```

The postcondition says more than “return a large value.” It requires the result to be one of the actual inputs and at least as large as every input.

## Central idea

Use the first value as the current candidate, then compare the remaining values with it.

## State meaning

```text
maximum = the greatest value among the inputs processed so far
```

## Pseudocode

```text
ALGORITHM maximum_of_three(first, second, third)
    maximum ← first

    IF second > maximum THEN
        maximum ← second
    END IF

    IF third > maximum THEN
        maximum ← third
    END IF

    RETURN maximum
END ALGORITHM
```

## Python

```python
def maximum_of_three(first: int, second: int, third: int) -> int:
    maximum = first

    if second > maximum:
        maximum = second

    if third > maximum:
        maximum = third

    return maximum
```

## Trace

Input:

```text
first = 4, second = 9, third = 7
```

| Step | `maximum` before | Condition | `maximum` after |
|---:|---:|---|---:|
| Initialisation | — | — | 4 |
| Compare second | 4 | `9 > 4` true | 9 |
| Compare third | 9 | `7 > 9` false | 9 |

Result: `9`.

## Correctness

After initialisation, `maximum` is the greatest value among the first processed input, namely `first`.

After comparing `second`, `maximum` is the greatest of `first` and `second`.

After comparing `third`, `maximum` is the greatest of all three inputs.

Therefore the returned value satisfies the postcondition.

## Termination

The algorithm contains a fixed finite number of comparisons and assignments. It always terminates.

## Complexity

```text
Time: O(1)
Auxiliary space: O(1)
```

The input size is fixed at three values.

## Common mistake

Using `maximum = 0` is incorrect for inputs such as `(-4, -9, -2)` because zero is not one of the inputs.

---

# Example 2 — Count values greater than a threshold

## Problem

> Given a finite sequence of integers and a threshold, return the number of elements strictly greater than the threshold.

## Contract

```text
Input:
    values — a finite sequence of integers
    threshold — an integer

Precondition:
    none beyond type and finiteness assumptions

Postcondition:
    result equals the number of indices i such that
    0 <= i < length(values) and values[i] > threshold

Side effects:
    values is not modified
```

## State meaning

```text
count = the number of processed values greater than threshold
```

## Pseudocode

```text
ALGORITHM count_greater(values, threshold)
    count ← 0

    FOR EACH value IN values DO
        IF value > threshold THEN
            count ← count + 1
        END IF
    END FOR

    RETURN count
END ALGORITHM
```

## Python

```python
def count_greater(values: list[int], threshold: int) -> int:
    count = 0

    for value in values:
        if value > threshold:
            count += 1

    return count
```

## Trace

Input:

```text
values = [3, 10, 7, 12, 10]
threshold = 9
```

| Value | Greater than 9? | `count` before | `count` after |
|---:|:---:|---:|---:|
| 3 | No | 0 | 0 |
| 10 | Yes | 0 | 1 |
| 7 | No | 1 | 1 |
| 12 | Yes | 1 | 2 |
| 10 | Yes | 2 | 3 |

Result: `3`.

## Correctness

Initially no values have been processed, so `count = 0` is correct.

For each new value:

- if it is greater than the threshold, incrementing adds exactly one newly qualifying element;
- otherwise leaving `count` unchanged is correct.

After all values are processed, `count` equals the required number for the entire sequence.

## Termination

The sequence is finite and each element is processed once.

## Complexity

For `n = len(values)`:

```text
Time: O(n)
Auxiliary space: O(1)
```

## Boundary cases

- empty sequence → result `0`;
- every value greater → result `n`;
- no value greater → result `0`;
- values equal to threshold do not count because the comparison is strict.

---

# Example 3 — First index of a target

## Problem

> Given a finite sequence and a target, return the first matching index or `-1` if no match exists.

## Contract

```text
Postcondition:
    if target occurs, result is the smallest valid index i
    such that values[i] = target

    otherwise result = -1
```

## Pseudocode

```text
ALGORITHM first_index(values, target)
    FOR index ← 0 TO length(values) - 1 DO
        IF values[index] = target THEN
            RETURN index
        END IF
    END FOR

    RETURN -1
END ALGORITHM
```

## Python

```python
def first_index(values: list[int], target: int) -> int:
    for index in range(len(values)):
        if values[index] == target:
            return index

    return -1
```

## Why early return is correct

Indices are examined in increasing order. Therefore the first matching index encountered is necessarily the smallest matching index.

## Trace

```text
values = [8, 3, 5, 3]
target = 3
```

| Index | Value | Match? | Action |
|---:|---:|:---:|---|
| 0 | 8 | No | continue |
| 1 | 3 | Yes | return 1 |

The later match at index `3` is never examined because the required answer is already known.

## Correctness

If the algorithm returns index `i`, then `values[i] = target`. Since all earlier indices were checked and did not match, `i` is the first occurrence.

If the algorithm returns `-1`, every valid index was checked and none matched, so the target is absent.

## Complexity

```text
Best case: O(1)
Worst case: O(n)
Auxiliary space: O(1)
```

---

# Example 4 — Minimum and maximum in one pass

## Problem

> Given a non-empty finite sequence of integers, return both its minimum and maximum.

## Contract

```text
Precondition:
    length(values) > 0

Postcondition:
    minimum is an element of values
    maximum is an element of values
    minimum <= every element
    maximum >= every element

Side effects:
    values is not modified
```

## State meanings

```text
minimum = the smallest processed value
maximum = the greatest processed value
```

## Pseudocode

```text
ALGORITHM minimum_and_maximum(values)
    minimum ← values[0]
    maximum ← values[0]

    FOR index ← 1 TO length(values) - 1 DO
        value ← values[index]

        IF value < minimum THEN
            minimum ← value
        END IF

        IF value > maximum THEN
            maximum ← value
        END IF
    END FOR

    RETURN (minimum, maximum)
END ALGORITHM
```

## Python

```python
def minimum_and_maximum(values: list[int]) -> tuple[int, int]:
    if not values:
        raise ValueError("values must not be empty")

    minimum = values[0]
    maximum = values[0]

    for value in values[1:]:
        if value < minimum:
            minimum = value

        if value > maximum:
            maximum = value

    return minimum, maximum
```

## Implementation note

`values[1:]` creates a new list in Python. A version avoiding that additional allocation is:

```python
def minimum_and_maximum(values: list[int]) -> tuple[int, int]:
    if not values:
        raise ValueError("values must not be empty")

    minimum = values[0]
    maximum = values[0]

    for index in range(1, len(values)):
        value = values[index]

        if value < minimum:
            minimum = value

        if value > maximum:
            maximum = value

    return minimum, maximum
```

## Correctness

Both state meanings are true for the one-element processed prefix. Each new value can only lower the minimum, raise the maximum, or leave them unchanged. After the full sequence is processed, both postconditions hold.

## Complexity

Index-based version:

```text
Time: O(n)
Auxiliary space: O(1)
```

Slicing version:

```text
Time: O(n)
Auxiliary space: O(n) because of the slice
```

The high-level algorithm is the same, but implementation details affect memory cost.

---

# Example 5 — Reverse a sequence in place

## Problem

> Reverse a mutable sequence without creating another sequence of the same size.

## Contract

```text
Precondition:
    values is a finite mutable sequence

Postcondition:
    for every valid index i,
    values[i] = old(values[length(values) - 1 - i])

Side effects:
    values is modified
```

## State design

Use two indices:

```text
left = first position not yet fixed
right = last position not yet fixed
```

Swap the two values, then move both indices inward.

## Pseudocode

```text
ALGORITHM reverse_in_place(values)
    left ← 0
    right ← length(values) - 1

    WHILE left < right DO
        temporary ← values[left]
        values[left] ← values[right]
        values[right] ← temporary

        left ← left + 1
        right ← right - 1
    END WHILE
END ALGORITHM
```

## Python

```python
def reverse_in_place(values: list[int]) -> None:
    left = 0
    right = len(values) - 1

    while left < right:
        values[left], values[right] = values[right], values[left]
        left += 1
        right -= 1
```

## Trace

Input:

```text
[1, 2, 3, 4, 5]
```

| Step | `left` | `right` | Sequence after swap |
|---:|---:|---:|---|
| Initial | 0 | 4 | `[1, 2, 3, 4, 5]` |
| 1 | 0 | 4 | `[5, 2, 3, 4, 1]` |
| 2 | 1 | 3 | `[5, 4, 3, 2, 1]` |

The loop stops when `left = 2` and `right = 2`.

## Correctness idea

After each iteration:

- positions before `left` contain their final reversed values;
- positions after `right` contain their final reversed values;
- the unprocessed region lies between `left` and `right`.

When the indices meet or cross, no unfixed pair remains.

## Termination

`left` increases and `right` decreases. The distance between them shrinks by two each iteration, so the loop terminates.

## Complexity

```text
Time: O(n)
Auxiliary space: O(1)
```

---

# Example 6 — Validate and average

## Problem

> Given a non-empty list of scores from `0` to `100`, return the arithmetic mean. Reject invalid input.

## Contract

```text
Precondition for successful computation:
    length(scores) > 0
    every score satisfies 0 <= score <= 100

Postcondition:
    result = sum(scores) / length(scores)

Failure behaviour:
    raise ValueError when the input is empty or contains an invalid score

Side effects:
    scores is not modified
```

## Decomposition

Separate validation from computation.

```python
def validate_scores(scores: list[float]) -> None:
    if not scores:
        raise ValueError("scores must not be empty")

    for score in scores:
        if score < 0 or score > 100:
            raise ValueError("scores must be between 0 and 100")


def average_score(scores: list[float]) -> float:
    validate_scores(scores)

    total = 0.0
    for score in scores:
        total += score

    return total / len(scores)
```

## Why decomposition helps

`validate_scores` has one responsibility: establish the domain conditions.

`average_score` can then rely on those conditions when dividing by the length and interpreting values as valid scores.

## Correctness

Validation ensures the list is non-empty and all values are in the permitted range. The accumulation loop computes the sum of all scores. Division by the number of scores therefore produces the arithmetic mean.

## Complexity

Validation scans the list once and summation scans it once:

```text
O(n) + O(n) = O(n)
```

Auxiliary space remains `O(1)`.

---

# Cross-example lessons

The examples use different control structures, but the reasoning pattern is stable.

## Contracts prevent accidental problem changes

- “first occurrence” requires preserving earlier equal values;
- “non-empty” justifies initialisation from the first element;
- “in place” requires mutation and limits extra memory;
- “strictly greater” excludes equality;
- failure behaviour determines whether a sentinel or exception is used.

## State meanings guide implementation

- `count` represents the number of qualifying processed elements;
- `best_index` identifies the best processed candidate;
- `minimum` and `maximum` summarise a processed prefix;
- `left` and `right` delimit unfinished work;
- `total` represents a partial sum.

## Correctness follows the structure

- sequence establishes prerequisites for later steps;
- selection handles logically distinct cases;
- iteration extends a processed region;
- decomposition composes smaller contracts.

## Complexity follows operations and representation

A short line may hide allocation or a library algorithm. Analyse the implementation actually used, not only the number of source lines.

---

# What you must be able to do

After studying these examples, you should be able to take a similarly small problem and produce:

1. a precise contract;
2. a central idea in prose;
3. state-variable meanings;
4. pseudocode;
5. Python implementation;
6. trace table;
7. correctness argument;
8. termination argument;
9. time and auxiliary-space analysis;
10. boundary-case analysis.

The final chapter of Module 01 now tests whether those skills can be used independently rather than followed passively.
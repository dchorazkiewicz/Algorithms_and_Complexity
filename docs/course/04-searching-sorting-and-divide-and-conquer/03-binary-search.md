# Binary Search

## Why ordering changes the problem

Linear search treats every unexamined position as a possible answer. A sorted sequence contains additional information: after comparing the target with one element, the algorithm can often eliminate an entire region.

Binary search is therefore not merely “a faster search loop”. It is an algorithm built on a stronger precondition.

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/binary-search-visualization.css">
<div data-binary-search-viz></div>
<script src="/Algorithms_and_Complexity/javascripts/binary-search-visualization.js"></script>

## 1. Contract

```text
Function: binary_search(values, target)

Precondition:
    values is sorted in nondecreasing order.

Postcondition:
    result is an index of target if target occurs;
    otherwise result is None.

Side effects:
    values is not modified.
```

Without the sorted-input precondition, discarding half of the sequence is not justified.

## 2. The active interval

Use a half-open interval `[left, right)` containing every position that may still hold the target.

Initially:

```text
left = 0
right = len(values)
```

At every step:

```text
middle = (left + right) // 2
```

Then compare `values[middle]` with the target.

- If equal, return `middle`.
- If `values[middle] < target`, eliminate `[left, middle]` by setting `left = middle + 1`.
- If `values[middle] > target`, eliminate `[middle, right)` by setting `right = middle`.

## 3. Python implementation

```python
def binary_search(values: list[int], target: int) -> int | None:
    left = 0
    right = len(values)

    while left < right:
        middle = (left + right) // 2

        if values[middle] == target:
            return middle
        if values[middle] < target:
            left = middle + 1
        else:
            right = middle

    return None
```

## 4. Interval invariant

The central invariant is:

> If the target occurs in the sequence, then at least one occurrence lies in `values[left:right]`.

Initially the active interval is the entire sequence. Each update removes only positions that cannot contain the target, using sortedness.

If the loop ends with `left == right`, the interval is empty. Since every possible position has been eliminated, the target is absent.

## 5. Trace

For:

```text
values = [2, 5, 8, 12, 16, 23, 38]
target = 16
```

| `left` | `right` | `middle` | `values[middle]` | Action |
|---:|---:|---:|---:|---|
| 0 | 7 | 3 | 12 | discard left half |
| 4 | 7 | 5 | 23 | discard right half |
| 4 | 5 | 4 | 16 | return `4` |

The active interval shrinks from length `7` to `3`, then `1`.

## 6. Termination

A termination measure is:

```text
right - left
```

It is a non-negative integer. Every non-returning iteration strictly decreases it. Therefore the loop terminates.

## 7. Complexity

Each comparison reduces the active interval to at most about half its previous size:

```text
n, n/2, n/4, n/8, ...
```

After approximately `log2(n)` reductions, the interval is empty or has one element.

- Time: `O(log n)`.
- Auxiliary space: `O(1)` for the iterative version.

A recursive version has `O(log n)` call-stack space.

## 8. Duplicates

The implementation returns some occurrence, not necessarily the first.

To find the first occurrence, do not stop after a match. Record the candidate and continue searching the left part:

```python
def first_binary_index(values: list[int], target: int) -> int | None:
    left = 0
    right = len(values)
    result = None

    while left < right:
        middle = (left + right) // 2

        if values[middle] < target:
            left = middle + 1
        else:
            if values[middle] == target:
                result = middle
            right = middle

    return result
```

The contract determines the boundary-search variant.

## 9. Common errors

### Wrong loop boundary

Mixing closed intervals `[left, right]` with half-open updates causes missed elements or invalid indices.

### Forgetting `+ 1`

After proving `values[middle] < target`, position `middle` cannot remain active. Setting `left = middle` may prevent progress.

### Applying binary search to unsorted input

The code may still return a plausible answer for selected examples, but the elimination argument is invalid.

### Sorting for one search without cost analysis

Sorting costs more than one linear scan in many one-off cases. Binary search is especially valuable when sorted order already exists or many searches reuse it.

## 10. Recursive formulation

```python
def binary_search_recursive(
    values: list[int], target: int, left: int, right: int
) -> int | None:
    if left >= right:
        return None

    middle = (left + right) // 2

    if values[middle] == target:
        return middle
    if values[middle] < target:
        return binary_search_recursive(values, target, middle + 1, right)
    return binary_search_recursive(values, target, left, middle)
```

The recursive subproblem is the smaller active interval.

## 11. What you must be able to explain

- why sortedness permits elimination;
- why `[left, right)` is convenient;
- how the interval invariant supports correctness;
- why the interval length proves termination;
- why halving leads to logarithmic time;
- why first-occurrence search needs a modified contract and control flow.

## Practice

1. Trace an unsuccessful binary search.
2. Produce a counterexample for binary search on unsorted input.
3. Implement last-occurrence binary search.
4. Compare the total cost of one search after sorting with one linear search.
5. Explain the difference between iterative and recursive auxiliary space.

The next chapter turns from locating values to constructing order.
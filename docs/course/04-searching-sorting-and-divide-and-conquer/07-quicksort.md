# Quicksort

## Sorting by partitioning around a pivot

Quicksort chooses a **pivot**, rearranges the active interval so that smaller elements lie on one side and larger elements on the other, then recursively sorts the two resulting regions.

The key operation is not the recursive call. It is **partitioning**. If partitioning is understood precisely, the recursive structure becomes natural.

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/quicksort-visualization.css">
<div data-quicksort-viz></div>
<script src="/Algorithms_and_Complexity/javascripts/quicksort-visualization.js"></script>

## 1. Partition contract

For an interval `values[left:right]`, a partition procedure should establish a boundary such that elements are grouped according to their relation to the pivot.

One useful postcondition is:

```text
all elements in values[left:pivot_index] ≤ pivot
values[pivot_index] = pivot
all elements in values[pivot_index + 1:right] > pivot
```

Different partition schemes use different boundary conventions. Their implementations must not be mixed.

## 2. Lomuto-style partition

```python
def partition(values: list[int], left: int, right: int) -> int:
    pivot = values[right - 1]
    boundary = left

    for index in range(left, right - 1):
        if values[index] <= pivot:
            values[boundary], values[index] = values[index], values[boundary]
            boundary += 1

    values[boundary], values[right - 1] = values[right - 1], values[boundary]
    return boundary
```

The active interval is half-open: `[left, right)`. The final element is selected as pivot.

## 3. Partition invariant

Before each iteration:

```text
values[left:boundary]      contains processed elements ≤ pivot
values[boundary:index]     contains processed elements > pivot
values[index:right - 1]    is unprocessed
values[right - 1]          stores the pivot
```

When the current element is at most the pivot, it is swapped into the left region and the boundary advances. Otherwise it joins the processed greater-than region.

After the scan, placing the pivot at `boundary` establishes its final partition position.

## 4. Trace

Partition:

```text
[7, 2, 9, 4, 5]
pivot = 5
```

A possible progression is:

```text
[7, 2, 9, 4, 5]   boundary = 0
[2, 7, 9, 4, 5]   boundary = 1
[2, 4, 9, 7, 5]   boundary = 2
[2, 4, 5, 7, 9]   pivot placed at index 2
```

The left region contains values at most `5`; the right region contains values greater than `5`.

## 5. Recursive Quicksort

```python
def quicksort(values: list[int], left: int = 0, right: int | None = None) -> None:
    if right is None:
        right = len(values)

    if right - left <= 1:
        return

    pivot_index = partition(values, left, right)
    quicksort(values, left, pivot_index)
    quicksort(values, pivot_index + 1, right)
```

The pivot is excluded from both recursive calls because partitioning has already placed it correctly relative to the two regions.

## 6. Correctness

Use induction on interval length.

- Base case: intervals of length `0` or `1` are already sorted.
- Partition step: the pivot is placed between elements not greater than it and elements greater.
- Recursive assumption: the left and right smaller intervals are sorted correctly.
- Final conclusion: the entire interval is sorted because every left element is no greater than the pivot and every right element is greater.

Swapping preserves the multiset of elements, so the result is a permutation of the input.

## 7. Termination

The measure is interval length `right - left`.

After partitioning, the pivot is excluded. Both recursive intervals are strictly smaller than the original interval. Therefore recursive descent reaches intervals of size at most one.

Boundary mistakes that include the pivot again can prevent progress.

## 8. Complexity

Partitioning one interval of length `n` takes `O(n)` time.

### Balanced partitions

If the pivot repeatedly divides the interval into similar sizes:

```text
T(n) = 2T(n/2) + O(n)
```

leading to `O(n log n)` time.

### Unbalanced partitions

If the pivot is repeatedly the smallest or largest element:

```text
T(n) = T(n - 1) + O(n)
```

leading to `O(n²)` time and recursion depth `O(n)`.

For many practical pivot strategies, expected running time is `O(n log n)`, but worst-case time remains quadratic unless stronger safeguards are used.

## 9. Pivot selection

Common strategies include:

- first element;
- last element;
- middle position;
- random pivot;
- median-of-three heuristic.

The pivot need not be the true median. Better selection aims to reduce the probability of consistently poor partitions.

## 10. Equal values

Inputs with many duplicates can produce poor behaviour under a two-way partition scheme. Three-way partitioning creates regions:

```text
less than pivot | equal to pivot | greater than pivot
```

This can improve handling of repeated keys. It is an extension of the same partition principle.

## 11. Stability and memory

Simple in-place Quicksort is generally unstable because swaps may reverse equal-key elements.

It uses no auxiliary array, but recursion consumes stack space:

- balanced recursion: typically `O(log n)` stack depth;
- worst case: `O(n)` stack depth.

Thus “in-place” does not mean “zero additional memory”.

## 12. Common errors

- mixing inclusive and half-open interval conventions;
- including the pivot in a recursive interval;
- assuming partition fully sorts either side;
- claiming worst-case `O(n log n)`;
- claiming stability for a swap-based implementation;
- proving only sortedness and forgetting permutation preservation.

## 13. What you must be able to explain

- the partition postcondition;
- the meaning of the partition invariant;
- why the pivot is excluded from recursive calls;
- why partitioning plus recursive sorting establishes global order;
- why balance determines recursion depth and running time;
- why pivot choice affects performance but not the abstract sorting contract.

## Practice

1. Trace partitioning with duplicates.
2. Draw the recursion intervals for a sorted input with last-element pivots.
3. Produce a boundary bug that causes infinite recursion.
4. Compare balanced and unbalanced recursion trees.
5. Explain why a partitioned array is not yet fully sorted.

The next chapter avoids moving source records by sorting an index array.
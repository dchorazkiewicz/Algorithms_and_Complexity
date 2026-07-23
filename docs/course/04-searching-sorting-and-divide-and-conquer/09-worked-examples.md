# Worked Examples

## Example 1 — Choosing between linear and binary search

Suppose a program receives one list of `n` unsorted measurements and performs one search.

Sorting first and then using binary search costs approximately:

```text
O(n log n) + O(log n) = O(n log n)
```

One linear search costs:

```text
O(n)
```

For one query, sorting first is not an improvement.

If the same data will be searched many times, the decision changes. After one sorting cost, each later query can use binary search. The complete workload, not one operation in isolation, should guide the design.

## Example 2 — First occurrence in sorted data

Problem:

> Return the first index of `target` in a sorted list, or `None`.

```python
def first_index_sorted(values: list[int], target: int) -> int | None:
    left = 0
    right = len(values)

    while left < right:
        middle = (left + right) // 2

        if values[middle] < target:
            left = middle + 1
        else:
            right = middle

    if left < len(values) and values[left] == target:
        return left
    return None
```

The loop finds the first position whose value is not less than the target. The final check distinguishes presence from absence.

Invariant:

```text
all positions before left contain values < target;
no possible first occurrence lies at or after right without also lying in [left, right).
```

Time is `O(log n)` and auxiliary space is `O(1)`.

## Example 3 — Stable insertion sort of records

```python
from dataclasses import dataclass

@dataclass
class Result:
    student: str
    score: int


def stable_sort_by_score(results: list[Result]) -> None:
    for boundary in range(1, len(results)):
        current = results[boundary]
        index = boundary

        while index > 0 and results[index - 1].score > current.score:
            results[index] = results[index - 1]
            index -= 1

        results[index] = current
```

The comparison is strict. Equal-score records are not shifted past each other, so original relative order is preserved.

Worst-case time is `O(n²)`. For nearly sorted records, only a few shifts may be required.

## Example 4 — Detecting a broken sort

```python
def broken_sort(values: list[int]) -> list[int]:
    return sorted(set(values))
```

The result is ordered, but duplicates are removed. For input:

```text
[3, 1, 3]
```

output is:

```text
[1, 3]
```

The permutation postcondition fails. This example shows why tests must check multiplicities, not only sortedness.

## Example 5 — Quicksort trace

Input:

```text
[8, 3, 7, 4, 9, 2, 6]
```

With final-element pivot `6`, partitioning may produce:

```text
[3, 4, 2, 6, 9, 7, 8]
```

The pivot is final at index `3`. Recursive subproblems are:

```text
[3, 4, 2]
[9, 7, 8]
```

Partitioning has not sorted either subproblem. It has established the cross-region relation needed for recursion.

## Example 6 — Worst-case Quicksort shape

For sorted input and last-element pivots:

```text
[1, 2, 3, 4, 5]
```

Each pivot is the largest element. Recursive sizes become:

```text
5, 4, 3, 2, 1
```

Partition work is:

```text
4 + 3 + 2 + 1
```

which is quadratic. Recursion depth is also linear.

Randomised pivot selection does not remove the theoretical worst case, but makes consistently bad partitions less likely for non-adversarial inputs.

## Example 7 — Sorting an index array

```python
from dataclasses import dataclass

@dataclass
class Product:
    code: str
    price: float
    description: str


def price_order(products: list[Product]) -> list[int]:
    return sorted(
        range(len(products)),
        key=lambda index: (products[index].price, products[index].code),
    )
```

Contract:

```text
result is a permutation of all valid product indices;
products[result[i]] is not greater by the selected key than products[result[i + 1]];
products is unchanged.
```

The records may be large, but only integer positions are reordered.

## Example 8 — Algorithm selection

Choose a method for each situation.

### Small, nearly sorted input

Insertion sort is a reasonable educational and practical choice because it is simple, stable, in-place, and adaptive.

### Large unsorted array, general-purpose sorting

A quadratic elementary method is inappropriate. An `O(n log n)` library sort is normally preferred. Quicksort remains important for understanding partition-based design and practical sorting families.

### Large records with several views

Use index arrays so that name order, date order, and score order can coexist without repeatedly moving records.

### One target in unsorted data

Use linear search rather than sorting solely to enable binary search.

### Many searches in stable data

Sort once or build a dedicated index, then use a logarithmic or more specialised lookup method.

## Example 9 — Testing a sorting implementation

A useful test suite includes:

```python
cases = [
    [],
    [5],
    [1, 2, 3, 4],
    [4, 3, 2, 1],
    [3, 1, 3, 2, 1],
    [-2, 5, 0, -2],
]
```

For each case, verify:

1. output is nondecreasing;
2. output has the same length;
3. every value has the same multiplicity;
4. mutation behaviour matches the contract;
5. stability is checked with equal-key records when required.

Tests provide evidence and find counterexamples. They do not replace the invariant and correctness argument.

## Integrated checklist

For every search or sort in this module, ask:

- What exactly is the contract?
- What data property does the algorithm exploit?
- What region is processed, active, sorted, or partitioned?
- What is the invariant?
- Why does the method terminate?
- What are best and worst cases?
- What extra memory and data movement are required?
- Are duplicates and equal keys handled as required?
- Is the source mutated?
- Would an index array or preprocessing step improve the complete workload?
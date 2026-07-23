# Sorting Problems and Properties

## Sorting is more than “put values in order”

A sorting algorithm must satisfy two essential conditions:

1. the output is ordered according to the chosen comparison;
2. the output contains exactly the same elements as the input.

The second condition is easy to overlook. A function returning `[1, 2, 3]` for every input produces a sorted sequence, but it is not a sorting algorithm.

## 1. The sorting contract

For ascending integer order:

```text
Precondition:
    values is a finite sequence of integers.

Postcondition:
    output is nondecreasing;
    output is a permutation of the original input.
```

For an in-place algorithm:

```text
Postcondition:
    values itself is nondecreasing;
    values contains exactly the original elements.
```

The contract must also state whether a new sequence is returned or the original is modified.

## 2. Sortedness

A sequence is nondecreasing when:

```text
for every valid i, values[i] ≤ values[i + 1]
```

Checking only the first and last elements is insufficient. Local order between every adjacent pair implies global nondecreasing order.

```python
def is_sorted(values: list[int]) -> bool:
    for index in range(len(values) - 1):
        if values[index] > values[index + 1]:
            return False
    return True
```

This verifies order but not permutation preservation.

## 3. Permutation preservation

A sorted result must preserve multiplicities. If the input contains three copies of `7`, the output must contain three copies of `7`.

For tests, one may compare frequency maps or compare against a trusted sort. For a proof, each algorithm must show that its operations preserve the multiset of elements. Swapping two positions, for example, changes order but not membership or multiplicity.

## 4. Stability

A sorting algorithm is **stable** when elements with equal keys preserve their original relative order.

Suppose records are sorted by score:

```text
(Ada, 90), (Ben, 75), (Cara, 90)
```

A stable result keeps Ada before Cara among score-90 records.

Stability matters when sorting is performed in stages. If records are first sorted by name and then stably sorted by department, names remain ordered within each department.

## 5. In-place sorting

An algorithm is commonly called **in-place** when it rearranges the input using only a small amount of additional storage, often `O(1)` auxiliary space.

This term needs care. A recursive in-place partitioning algorithm may use no auxiliary array but still consume call-stack space. The representation and cost model must be stated clearly.

## 6. Adaptiveness

An adaptive sorting algorithm benefits from existing order. Insertion sort, for example, can be close to linear on nearly sorted input because few shifts are required.

Selection sort performs almost the same number of comparisons regardless of initial order, so it is not adaptive in the same sense.

## 7. Comparison-based sorting

Selection sort, insertion sort, bubble sort, merge sort, and Quicksort determine order through comparisons.

For arbitrary keys under the comparison model, no comparison sort can guarantee better than `O(n log n)` worst-case comparison complexity. This result is developed more formally in complexity study. Here it explains why quadratic elementary sorts do not scale and why `O(n log n)` methods are important.

## 8. Data movement versus comparisons

Two algorithms with the same asymptotic time may behave differently because they perform different amounts of data movement.

Moving large records can be expensive. An index array can reduce movement by sorting small integer indices instead of the records themselves.

Algorithm analysis should therefore ask:

- how many comparisons are made?
- how many swaps or assignments are made?
- how much auxiliary storage is used?
- does the input structure make movement expensive?

## 9. Internal and external sorting

This course primarily studies **internal sorting**, where data fits in memory. When data is larger than available memory, external storage behaviour becomes central and different algorithms are preferred. That is outside the immediate syllabus scope, but it reinforces that algorithm choice depends on the computational environment.

## 10. Sorting records by keys

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    score: int
```

Possible orders include:

```text
ascending by score
ascending by name
score descending, then name ascending
```

“Sorted” has no meaning until the key and order relation are specified.

## 11. Properties are trade-offs, not decorations

A method may be:

- stable but require additional memory;
- in-place but unstable;
- fast on average but quadratic in the worst case;
- simple for small inputs but unsuitable for large ones;
- efficient for arrays but inappropriate for linked structures.

There is no universally best sorting algorithm independent of requirements.

## 12. What you must be able to explain

- why sortedness alone is not sufficient;
- what permutation preservation means;
- when stability matters;
- what in-place operation does and does not guarantee;
- how adaptiveness uses existing order;
- why comparisons and data movement should be analysed separately;
- why the sorting key belongs to the specification.

## Practice

1. Write a postcondition for descending in-place sorting.
2. Give an example where an unstable sort changes a meaningful order.
3. Explain how to test permutation preservation with duplicates.
4. Compare sorting integer indices with sorting large records.
5. Decide which properties matter for sorting exam results by grade and surname.

The next chapter compares three elementary sorting strategies.
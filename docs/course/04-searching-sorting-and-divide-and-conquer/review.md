# Module 04 Review

## 1. Core vocabulary

Explain each term without relying only on code:

- search contract;
- first occurrence;
- processed prefix;
- active interval;
- sorted-input precondition;
- sorted permutation;
- stability;
- in-place sorting;
- adaptiveness;
- comparison-based sorting;
- divide and conquer;
- pivot;
- partition;
- balanced and unbalanced recursion;
- index array.

## 2. Concept questions

1. Why can linear search operate on unsorted data?
2. Why is binary search invalid without ordering?
3. What does a half-open interval `[left, right)` contain?
4. Why does binary search take logarithmic time?
5. Why is sortedness alone not a sufficient sorting postcondition?
6. What information does stability preserve?
7. How can a sort be in-place and still use stack memory?
8. Why is insertion sort adaptive?
9. Why does selection sort perform relatively few swaps?
10. What does one bubble-sort pass establish?
11. Why is divide and conquer not automatically efficient?
12. Why can Quicksort take quadratic time?
13. Why does partitioning not fully sort the array?
14. What does an index array preserve?
15. When can an index array become stale?

## 3. Tracing tasks

### Linear search

Trace first-occurrence search on:

```text
[5, 1, 4, 1, 9], target = 1
```

Then trace an unsuccessful search for `7`.

### Binary search

Trace successful and unsuccessful searches on:

```text
[2, 4, 7, 9, 13, 18, 21]
```

Record `left`, `right`, `middle`, and the eliminated region.

### Insertion sort

Trace:

```text
[6, 3, 5, 2]
```

After every outer iteration, identify the sorted prefix.

### Quicksort partition

Using final-element pivot, partition:

```text
[8, 2, 5, 1, 5, 3]
```

Record the boundary and the meaning of every region.

## 4. Debugging tasks

### Broken linear search

```python
def contains(values, target):
    for value in values:
        if value == target:
            return True
        return False
```

Explain the bug and provide a counterexample.

### Broken binary search

```python
while left < right:
    middle = (left + right) // 2
    if values[middle] < target:
        left = middle
```

Explain why progress may stop.

### Broken insertion sort

```python
while index > 0 and values[index - 1] > values[index]:
    values[index] = values[index - 1]
    index -= 1
```

Explain which value is lost and how to preserve it.

### Broken Quicksort recursion

```python
pivot = partition(values, left, right)
quicksort(values, left, pivot + 1)
quicksort(values, pivot, right)
```

Explain why the pivot may remain in recursive subproblems.

## 5. Contract-writing tasks

Write precise preconditions, postconditions, and side effects for:

1. membership search;
2. first occurrence in an unsorted list;
3. last occurrence in a sorted list;
4. stable in-place sorting of records by key;
5. returning a sorted copy without mutation;
6. building an index array by two keys;
7. partitioning a half-open array interval.

## 6. Correctness tasks

### Linear search

State and justify a processed-prefix invariant for first occurrence.

### Binary search

State an active-interval invariant and explain each interval update.

### Selection sort

Prove that after `k` outer iterations, the first `k` positions contain the `k` smallest elements in order.

### Insertion sort

Prove preservation of the sorted-prefix invariant.

### Quicksort

Give an induction-style correctness argument separating partition correctness from recursive correctness.

### Index array

Explain how to prove both permutation of indices and logical key order.

## 7. Termination tasks

Identify a decreasing measure for:

- linear search;
- binary search;
- insertion-sort inner loop;
- recursive maximum by division;
- Quicksort recursion.

For each, state why it is bounded below and strictly decreases.

## 8. Complexity tasks

Analyse time and auxiliary space for:

1. linear search in best and worst cases;
2. iterative binary search;
3. recursive binary search;
4. selection sort;
5. insertion sort on sorted and reverse-sorted input;
6. bubble sort with early exit;
7. balanced Quicksort;
8. worst-case Quicksort;
9. creating and sorting an index array.

Explain why equal Big O classes do not imply equal numbers of swaps, comparisons, or memory accesses.

## 9. Algorithm-selection scenarios

Choose and justify a strategy:

1. one search in unsorted data;
2. one million searches in stable data;
3. sorting a nearly ordered short list;
4. ordering large records in several independent ways;
5. sorting data requiring stability;
6. sorting an array where worst-case guarantees are essential;
7. locating the first duplicate key in sorted data.

## 10. Implementation problems

1. Implement `count_occurrences` by linear scan.
2. Implement first and last occurrence with binary search.
3. Implement descending insertion sort.
4. Implement stable insertion sort for records.
5. Implement selection sort and count comparisons and swaps.
6. Implement three-way partitioning for duplicate-heavy input.
7. Implement Quicksort with a random pivot.
8. Build an index array and use it for binary search by key.
9. Verify a sorting result without calling the language’s sorting function.

## 11. Capstone problem

A university stores records:

```python
from dataclasses import dataclass

@dataclass
class StudentResult:
    identifier: int
    surname: str
    score: int
```

Design a system that:

- preserves the original record order;
- provides a surname order;
- provides score descending, surname ascending order;
- supports repeated search by identifier;
- reports all students with a selected score;
- documents which structures become invalid after record updates.

Your solution must include:

1. contracts;
2. representation choices;
3. index-array construction;
4. a search strategy for each query;
5. correctness arguments;
6. termination arguments;
7. time and space analysis;
8. tests covering duplicates, absence, empty input, and equal keys.

## 12. Mastery check

You are ready to continue when you can:

- derive linear and binary search from their contracts;
- explain why sortedness changes what can be eliminated;
- distinguish sorting correctness from sorting properties;
- trace and compare elementary sorting algorithms;
- explain divide and conquer through valid smaller subproblems;
- trace partitioning and Quicksort recursion;
- explain balanced and unbalanced complexity;
- use index arrays without confusing logical and physical positions;
- choose an algorithm based on the complete workload rather than one operation.

The next module studies functions, side effects, stack frames, and more advanced forms of recursion.
# Module 04 — Searching, Sorting, and Divide and Conquer

## Why this module matters

Many algorithms become easier once data is organised. Searching asks where a required value is. Sorting changes the order of data so that later work becomes simpler. Divide and conquer breaks a large problem into smaller problems, solves them, and combines the results.

These ideas are closely connected. Binary search is fast only because the input is ordered. Sorting algorithms are compared not only by whether they eventually produce sorted output, but also by time, memory use, stability, and the way they move data. Quicksort combines sorting with recursive partitioning and therefore provides a natural bridge between array algorithms and divide-and-conquer reasoning.

## Syllabus scope

This module develops the fourth course-content block:

> Linear and binary search. Sorting methods and their properties. Complexity of sorting algorithms. Divide and conquer. Quicksort. Index arrays. Recursive algorithms.

The order of study is deliberate. We begin with searching because it makes the value of ordering visible. We then study sorting as a family of design choices rather than as one operation. Only after those foundations do we introduce divide and conquer, Quicksort, and index arrays.

## What you should be able to do after this module

After completing the module, you should be able to:

1. formulate contracts for search and sorting problems;
2. implement and trace linear search;
3. explain the sorted-input precondition of binary search;
4. derive binary search from interval elimination;
5. identify loop state and invariants in both search methods;
6. distinguish sorting correctness from sorting properties;
7. explain stability, in-place operation, adaptiveness, and comparison-based sorting;
8. analyse simple sorting algorithms using Big O notation;
9. explain the divide-and-conquer pattern;
10. trace partitioning in Quicksort;
11. explain best-, average-, and worst-case behaviour at an introductory level;
12. use an index array to represent an order without rearranging source records;
13. compare iterative and recursive formulations;
14. select a method based on data properties and required guarantees.

## Concept map

```text
searching
├── linear search
│   ├── no ordering requirement
│   ├── processed prefix
│   └── O(n)
└── binary search
    ├── sorted-input precondition
    ├── active interval
    └── O(log n)

sorting
├── correctness: output is ordered and is a permutation of input
├── properties: stable, in-place, adaptive
├── elementary methods
│   ├── selection sort
│   ├── insertion sort
│   └── bubble sort
└── divide and conquer
    └── Quicksort
        ├── choose pivot
        ├── partition
        ├── recurse
        └── combine implicitly

indirect ordering
└── index arrays
```

## Learning path

### 1. Searching as a computational problem

Define what a search result means, how absence is represented, and why duplicate values force a precise contract.

### 2. Linear search

Develop linear search from the idea of inspecting an unprocessed suffix. Study first occurrence, last occurrence, early return, correctness, termination, and cost.

### 3. Binary search

Derive binary search from the sorted-input precondition and the idea of repeatedly discarding half of the active interval.

### 4. Sorting problems and properties

Separate the postcondition “sorted permutation” from secondary properties such as stability, in-place operation, adaptiveness, and data movement.

### 5. Elementary sorting algorithms

Study selection sort, insertion sort, and bubble sort as contrasting strategies. Trace their state and compare their costs.

### 6. Divide and conquer

Learn the divide–solve–combine pattern, recursive subproblems, base cases, recursion trees, and recurrence intuition.

### 7. Quicksort

Study pivots, partitioning, recursive calls, correctness, termination, and the difference between balanced and unbalanced partitions.

### 8. Index arrays

Learn how to sort references or indices instead of moving the source data, and when indirect ordering is useful.

### 9. Worked examples and review

Apply the complete reasoning process to search variants, sorting choices, partition traces, and index-based ordering.

## Prerequisites

You should already be able to:

- reason about array indices and half-open ranges;
- trace loops and recursive calls;
- formulate preconditions and postconditions;
- use loop invariants and termination measures;
- distinguish copying from mutation;
- give simple time- and space-complexity arguments.

## Diagnostic questions

1. What should a search function return when a value is absent?
2. Why is “the index of the target” ambiguous when duplicates are allowed?
3. What property of the input makes binary search possible?
4. Is a sorted output automatically a correct sorting result?
5. What does stability preserve?
6. Why can an algorithm be in-place and still use recursive stack space?
7. What makes a partition balanced or unbalanced?
8. Why might an index array be preferable to rearranging records?

Return to these questions after completing the module.

## Mastery checklist

- [ ] I can write precise contracts for search and sorting.
- [ ] I can trace linear and binary search.
- [ ] I can explain binary search using an interval invariant.
- [ ] I can distinguish sortedness from permutation preservation.
- [ ] I can explain stability and in-place operation.
- [ ] I can trace selection, insertion, and bubble sort.
- [ ] I can compare their time and memory costs.
- [ ] I can explain divide and conquer.
- [ ] I can trace Quicksort partitioning.
- [ ] I can explain why Quicksort can degrade to quadratic time.
- [ ] I can construct and use an index array.

!!! note "Study objective"
    Do not memorise implementations as isolated code. For every method, identify the contract, the state, the information eliminated or established at each step, the correctness argument, the termination argument, and the cost.
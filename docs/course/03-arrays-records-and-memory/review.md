# Module 03 Review

This review checks whether you understand arrays and records as representations, not merely whether you can call Python list methods.

## 1. Core definitions

Explain each term in your own words:

1. aggregate data structure;
2. array;
3. component;
4. index;
5. direct access;
6. contiguous representation;
7. logical length;
8. capacity;
9. traversal;
10. in-place algorithm;
11. out-of-place algorithm;
12. record;
13. field;
14. aliasing;
15. shallow copy;
16. deep copy;
17. mutation;
18. rebinding.

## 2. Conceptual questions

1. Why does a known array index support direct access?
2. Why is the largest valid zero-based index equal to `n - 1`?
3. Why is linear search still `O(n)` even though each indexed read is `O(1)`?
4. Why can insertion at the front require `O(n)` work?
5. Why must insertion shifting proceed from right to left?
6. Why does deletion preserving order shift components left?
7. What is the difference between a fixed-size array and a dynamic array?
8. Why are Python lists not identical to arrays of values in C++?
9. Why can two equal-looking nested lists have different aliasing behaviour?
10. Why is a record clearer than a positional tuple in many algorithms?
11. When is a dictionary more appropriate than a fixed record?
12. Why must a contract mention whether input is modified?

## 3. Index and bounds exercises

For each length, list the valid indices:

1. `n = 0`
2. `n = 1`
3. `n = 5`
4. `n = 12`

Then explain whether each expression is valid for `values` of length `6`:

```python
values[0]
values[5]
values[6]
values[-1]
values[len(values) - 1]
values[len(values)]
```

Distinguish the abstract zero-based array model from Python's support for negative indices.

## 4. Tracing

Trace the array after every mutation:

```python
values = [3, 8, 2, 7]
values[1] = 5
values[3] = values[0] + values[2]
values[0], values[2] = values[2], values[0]
```

Trace:

```python
values = [1, 0, 4, 0, 2]
write_index = 0

for value in values:
    if value != 0:
        values[write_index] = value
        write_index += 1

for index in range(write_index, len(values)):
    values[index] = 0
```

State what `write_index` means after every iteration.

## 5. Complexity table

Complete the table for the standard array model:

| Operation | Expected cost |
|---|---|
| read known index | |
| write known index | |
| full traversal | |
| linear search | |
| replace component | |
| insert at front | |
| insert at end with free capacity | |
| delete at front preserving order | |
| shallow copy of `n` references | |
| reverse in place | |

Explain the reason for each answer.

## 6. Debugging

### Problem A — invalid bound

```python
def print_all(values: list[int]) -> None:
    for index in range(len(values) + 1):
        print(values[index])
```

Identify and repair the error.

### Problem B — incorrect insertion direction

```python
def shift_right(values: list[int], position: int) -> None:
    for index in range(position, len(values) - 1):
        values[index + 1] = values[index]
```

Explain which original values are destroyed and repair the direction.

### Problem C — hidden aliasing

```python
matrix = [[0, 0, 0]] * 4
matrix[0][1] = 9
```

Predict the result and explain the object graph.

### Problem D — accidental mutation

```python
def sorted_copy(values: list[int]) -> list[int]:
    values.sort()
    return values
```

Explain why the name and behaviour conflict. Write one truly non-mutating version and one clearly named in-place version.

## 7. Contract writing

Write complete contracts for:

1. returning the first component of a non-empty array;
2. replacing every negative value by zero in place;
3. returning a new reversed array;
4. inserting a value at a valid position;
5. deleting the component at a valid position;
6. finding a record by identifier;
7. transposing a rectangular matrix.

Include preconditions, postconditions, side effects, and failure behaviour.

## 8. Implementation problems

### Problem 1 — range normalisation

Write an in-place function that replaces every component below `lower` by `lower` and every component above `upper` by `upper`.

### Problem 2 — stable partition

Return a new list containing all negative values first and all non-negative values second, preserving relative order within each group.

### Problem 3 — remove duplicates

Return the first occurrence of each value while preserving original order. First write an `O(n²)` version using only lists. Explain how an auxiliary set changes expected complexity.

### Problem 4 — cyclic left rotation

Rotate a list left by `k` positions. Provide an out-of-place version and state its complexity.

### Problem 5 — matrix row sums

Return one sum for each row of a rectangular matrix. Validate rectangularity.

### Problem 6 — records

Define an `Employee` record and write functions that:

- return the employee with the highest salary;
- compute the average salary;
- apply an in-place percentage increase;
- return a new list containing employees from one department.

State mutation and copying behaviour precisely.

## 9. Reasoning problems

1. Prove informally that in-place reversal places every component at index `n - 1 - i`.
2. Give a loop invariant for stable compaction.
3. Explain why manual insertion into a new array preserves all old components exactly once.
4. Explain why an unordered deletion can be `O(1)` while stable deletion is `O(n)`.
5. Show how row-major indexing maps `(r, c)` to one linear index.
6. Explain why a shallow copy is sufficient for a flat list of immutable integers but insufficient for nested mutable rows.

## 10. Capstone problem — inventory analysis

Define:

```python
@dataclass
class InventoryItem:
    code: str
    name: str
    quantity: int
    unit_price: float
```

Design a small module that:

1. validates record invariants;
2. finds an item by code;
3. computes total inventory value;
4. returns the item with the greatest total value;
5. removes zero-quantity items while preserving order;
6. returns a new list sorted only later in Module 04—do not implement sorting here;
7. explains which operations are direct access and which require traversal;
8. states time and auxiliary-space complexity;
9. explains where aliases may occur;
10. provides tests for empty input, duplicate codes, zero quantity, and invalid prices.

## Mastery check

You are ready for Module 04 when you can:

- explain array structure independently of Python syntax;
- connect indexing to regular memory representation;
- analyse traversal, insertion, deletion, and copying;
- design safe in-place and out-of-place operations;
- explain aliasing with an object graph;
- represent entities as records with invariants;
- combine arrays and records in complete algorithms.

## Final perspective

Arrays are powerful because their representation is regular. That regularity gives direct access and efficient traversal, but it also makes ordered structural changes expensive. Records solve a different problem by giving names and structure to heterogeneous fields. Together, arrays and records form the basis for the searching and sorting algorithms developed in the next module.
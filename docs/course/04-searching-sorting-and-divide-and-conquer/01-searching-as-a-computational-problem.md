# Searching as a Computational Problem

## Why search must be specified before it is implemented

Searching sounds simple: given a collection and a target, determine whether the target occurs. The apparent simplicity hides several decisions.

If the target appears more than once, should the algorithm return the first occurrence, the last occurrence, or any occurrence? If the target is absent, should it return `-1`, `None`, or a Boolean value? May the input be reordered? Is equality sufficient, or is the search based on a key extracted from a record?

Until these questions are answered, there is no single search problem—only a family of related problems.

## 1. Search membership, position, and retrieval

Three common search tasks are:

### Membership

> Does the target occur?

```python
def contains(values: list[int], target: int) -> bool:
    ...
```

### Position

> At which index does the target occur?

```python
def find_index(values: list[int], target: int) -> int | None:
    ...
```

### Retrieval by key

> Which record has the required key?

```python
from dataclasses import dataclass

@dataclass
class Student:
    identifier: int
    name: str


def find_student(students: list[Student], identifier: int) -> Student | None:
    ...
```

These contracts return different kinds of information. A Boolean result cannot report a position. An index result identifies a position but not necessarily the object’s intended logical meaning. A returned record may expose mutable state.

## 2. Duplicates make the result ambiguous

Consider:

```text
values = [4, 7, 2, 7, 9]
target = 7
```

Valid matching indices are `1` and `3`. A contract saying only

```text
Postcondition: values[result] = target
```

allows either answer. That may be acceptable, but it must be deliberate.

To request the first occurrence:

```text
Postcondition:
    result is None if target does not occur;
    otherwise values[result] = target and
    target does not occur at any index smaller than result.
```

To request the last occurrence, reverse the final condition.

## 3. Representing absence

Returning `-1` is common because `-1` lies outside the normal range `0 .. n - 1`. In Python, however, `values[-1]` is a valid access to the final element. This creates a risk: code that forgets to check the result may silently inspect the wrong element.

Using `None` makes absence explicit:

```python
index = find_index(values, target)
if index is None:
    print("not found")
else:
    print(values[index])
```

Neither representation is universally correct. The contract and calling code must agree.

## 4. Input domain and equality

A search assumes that the target can be compared with collection elements. For integers, equality is clear. For records, the relevant comparison may use one field:

```python
student.identifier == target_identifier
```

For floating-point values, exact equality may be unsuitable. For text, case sensitivity and normalisation matter. Search correctness depends on the chosen equivalence relation.

## 5. May the search modify the input?

A normal linear search does not need to modify its input. A method that sorts the collection before searching changes the problem:

- the source order may be lost;
- indices may no longer refer to original positions;
- sorting introduces additional cost;
- repeated searches may or may not justify the preprocessing.

The contract should therefore state whether mutation is allowed.

## 6. Search and ordering

Linear search assumes only that the input is finite and comparable. Binary search needs a stronger precondition: elements must be ordered according to the same relation used by the search.

This is a central algorithmic lesson:

> Stronger information about the input can support a faster algorithm.

The speedup is not free. The order must already exist or be created and maintained.

## 7. A complete contract

For the first occurrence of an integer:

```text
Function: first_index(values, target)

Precondition:
    values is a finite sequence of integers.

Postcondition:
    if target does not occur in values, result is None;
    otherwise 0 ≤ result < len(values),
    values[result] = target,
    and for every index j with 0 ≤ j < result,
    values[j] ≠ target.

Side effects:
    values is not modified.
```

The contract does not say whether the implementation uses a loop, recursion, a library function, or an index structure.

## 8. Search complexity depends on the model

For an unsorted array of length `n`, a comparison-based search may need to inspect every element in the worst case. This leads to `O(n)` time.

For a sorted random-access array, binary search uses order to discard large parts of the remaining interval, giving `O(log n)` time.

For a hash table, expected lookup may be `O(1)` under additional representation assumptions. That belongs to later data-structure study. The important point here is that complexity belongs to an algorithm operating on a representation—not to the abstract word “search”.

## 9. What you must be able to explain

You should be able to explain:

- why duplicates make a search contract ambiguous;
- the difference between membership, position, and retrieval;
- how absence is represented;
- why comparison semantics belong to the specification;
- why binary search needs a stronger precondition than linear search;
- why sorting before one search is not automatically an improvement.

## Practice

1. Write contracts for membership, first position, last position, and any position.
2. Design a search for a student record by identifier.
3. Explain why returning `-1` is potentially dangerous in Python.
4. State a contract for case-insensitive text search.
5. Decide whether a search may reorder its input and justify the decision.

The next chapter develops linear search as the direct method for an unordered sequence.
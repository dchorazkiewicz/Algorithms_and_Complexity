# Index Arrays

## Ordering without moving the source data

Sorting normally rearranges values. That may be undesirable when values are large records, when several alternative orders must coexist, or when original positions carry meaning.

An **index array** stores positions rather than records. Sorting the indices creates a logical order while leaving source data unchanged.

## 1. Basic construction

```python
values = [40, 10, 30, 20]
indices = list(range(len(values)))
indices.sort(key=lambda index: values[index])
```

After sorting:

```text
indices = [1, 3, 2, 0]
```

Reading `values[index]` in this order produces:

```text
10, 20, 30, 40
```

The source remains:

```text
[40, 10, 30, 20]
```

## 2. Index-array contract

```text
Precondition:
    values is a finite sequence.

Postcondition:
    indices is a permutation of 0 .. len(values) - 1;
    values[indices[0]], values[indices[1]], ...
    are in the required order;
    values is unchanged.
```

Correctness therefore has two parts:

1. every source position appears exactly once;
2. indirect traversal follows the requested order.

## 3. Records and sorting keys

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    score: int

students = [
    Student("Cara", 88),
    Student("Ada", 95),
    Student("Ben", 88),
]

by_score = sorted(
    range(len(students)),
    key=lambda index: (-students[index].score, students[index].name),
)
```

The index array expresses “score descending, then name ascending” without copying or rearranging student records.

## 4. Multiple simultaneous orders

The same data can have several index arrays:

```python
by_name = sorted(range(len(students)), key=lambda i: students[i].name)
by_score = sorted(range(len(students)), key=lambda i: students[i].score)
```

This is useful when users switch between views. Reordering the records for every view would destroy the previous order and move more data.

## 5. Cost model

Creating indices requires `O(n)` additional space.

Sorting them has the comparison cost of the chosen sorting algorithm, commonly `O(n log n)`. Each comparison follows an index to access a key.

Benefits may include:

- moving small integers instead of large records;
- preserving original storage order;
- maintaining multiple orders;
- separating logical view from physical layout.

Costs include:

- extra memory for indices;
- indirect access;
- responsibility for keeping indices valid when source data changes.

## 6. Stability and tie-breaking

If the underlying sort is stable and the key values are equal, original index order is preserved.

An explicit tie-breaker can define a total order:

```python
key=lambda i: (students[i].score, students[i].name, i)
```

Including `i` guarantees deterministic ordering even when all other keys are equal.

## 7. Source mutation and invalidation

If source elements are updated, the index array may no longer represent sorted order. If elements are inserted or deleted, stored positions may refer to different records or become invalid.

An index array is therefore not self-maintaining. Its contract depends on the state of the source collection.

Possible strategies:

- rebuild after changes;
- update indices incrementally;
- use stable identifiers instead of positions;
- store references when language and lifetime rules make that safe.

## 8. Materialising the ordered view

Sometimes a physically reordered copy is eventually required:

```python
ordered_students = [students[index] for index in by_score]
```

This costs `O(n)` additional time and space. The index array lets the program delay or avoid that cost.

## 9. Binary search over an index array

If indices are sorted by a key, binary search can operate on the logical order:

```python
def search_score(students: list[Student], indices: list[int], target: int) -> int | None:
    left = 0
    right = len(indices)

    while left < right:
        middle = (left + right) // 2
        student_index = indices[middle]
        score = students[student_index].score

        if score == target:
            return student_index
        if score < target:
            left = middle + 1
        else:
            right = middle

    return None
```

The sortedness precondition applies to the sequence of keys observed through `indices`, not to physical record order.

## 10. Relation to later data structures

Index arrays are a simple example of separating:

- physical storage;
- logical order;
- access structure.

Trees, hash tables, database indexes, and graph representations develop this principle further.

## 11. Common errors

- sorting values and calling the result an index array;
- failing to ensure indices form a full permutation;
- confusing a position in the index array with a source position;
- using a stale index after source mutation;
- claiming no additional memory;
- forgetting that indirect access may affect practical performance.

## 12. What you must be able to explain

- how an index array represents logical order;
- why source data remains unchanged;
- how to verify permutation and ordering properties;
- when moving indices is cheaper than moving records;
- why source updates can invalidate an index;
- how binary search can use an indirect order.

## Practice

1. Build name and score index arrays for the same records.
2. State a contract for an index array sorted by two keys.
3. Show how deleting a source element invalidates positions.
4. Use an index array to print records without copying them.
5. Compare the memory and movement costs of direct and indirect sorting.

The next chapter combines the module’s ideas in complete worked examples.
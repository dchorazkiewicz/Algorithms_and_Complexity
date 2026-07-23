# Records and Structured Entities

## Why records are different from arrays

An array groups many values of the same logical kind and distinguishes them by position. A record groups several named pieces of information that together describe one entity.

A student may have an identifier, a name, and a score. These components have different meanings and possibly different types. Storing them only by position makes the representation harder to understand and easier to misuse.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to define a record, distinguish field access from array indexing, design records with meaningful invariants, and represent records in Python and C++.

---

## 1. Positional representation can hide meaning

A student represented as a tuple:

```python
student = (1042, "Marta", 87.5)
```

requires the reader to remember:

```text
position 0 = identifier
position 1 = name
position 2 = score
```

The representation is compact, but its meaning is external to the value.

A record names the fields:

```text
Student
    identifier
    name
    score
```

Now the structure communicates the role of each component.

---

## 2. Definition of a record

A **record** is an aggregate value composed of named fields. Different fields may have different types, and together they describe one logical object or event.

Example:

```text
Measurement
    timestamp: integer
    sensor_name: string
    value: floating-point number
    valid: Boolean
```

Arrays use integer indices. Records use field names.

```text
array access:   values[3]
record access:  measurement.value
```

---

## 3. Python records with `dataclass`

```python
from dataclasses import dataclass


@dataclass
class Student:
    identifier: int
    name: str
    score: float
```

Creating a value:

```python
student = Student(identifier=1042, name="Marta", score=87.5)
```

Accessing fields:

```python
print(student.name)
student.score = 90.0
```

Named construction reduces accidental field-order mistakes.

---

## 4. C++ records with `struct`

```cpp
#include <string>

struct Student {
    int identifier;
    std::string name;
    double score;
};
```

Usage:

```cpp
Student student{1042, "Marta", 87.5};
student.score = 90.0;
```

The abstract record idea is the same. Concrete copying, memory layout, construction, and ownership rules depend on the language and field types.

---

## 5. Record invariants

A useful record may require relationships that field types alone do not express.

For `Student`:

```text
identifier > 0
name is not empty
0 ≤ score ≤ 100
```

These conditions form a **record invariant**: a property expected to hold for every valid record state.

Python can validate on construction:

```python
from dataclasses import dataclass


@dataclass
class Student:
    identifier: int
    name: str
    score: float

    def __post_init__(self) -> None:
        if self.identifier <= 0:
            raise ValueError("identifier must be positive")
        if not self.name:
            raise ValueError("name must not be empty")
        if not 0 <= self.score <= 100:
            raise ValueError("score must be between 0 and 100")
```

The invariant is stronger than the separate type annotations.

---

## 6. Arrays of records

Records and arrays are often combined:

```python
students = [
    Student(1042, "Marta", 87.5),
    Student(1057, "Piotr", 72.0),
    Student(1081, "Alicja", 91.0),
]
```

The array gives ordered access to many students. Each record gives named access to one student's fields.

Example: average score.

```python
def average_score(students: list[Student]) -> float:
    if not students:
        raise ValueError("students must not be empty")

    total = 0.0

    for student in students:
        total += student.score

    return total / len(students)
```

```text
Time: O(n)
Auxiliary space: O(1)
```

---

## 7. Searching records by key

```python
def find_student(
    students: list[Student], identifier: int
) -> Student | None:
    for student in students:
        if student.identifier == identifier:
            return student

    return None
```

The identifier acts as a key. Because the array is unsorted and has no auxiliary index, worst-case search is `O(n)`.

Direct array access by position remains `O(1)`, but searching by a field value is not direct access.

---

## 8. Updating a field

```python
def add_bonus(student: Student, bonus: float) -> None:
    new_score = student.score + bonus

    if not 0 <= new_score <= 100:
        raise ValueError("updated score would be invalid")

    student.score = new_score
```

This function mutates one record. The contract should state the side effect.

When the record is stored inside a Python list, the list position still refers to the same record object. The mutation is visible through all aliases to that object.

---

## 9. Returning records from algorithms

A record can make a multi-part result clearer than a tuple.

```python
@dataclass(frozen=True)
class RangeSummary:
    minimum: int
    maximum: int
    total: int


def summarise(values: list[int]) -> RangeSummary:
    if not values:
        raise ValueError("values must not be empty")

    minimum = values[0]
    maximum = values[0]
    total = 0

    for value in values:
        if value < minimum:
            minimum = value
        if value > maximum:
            maximum = value
        total += value

    return RangeSummary(minimum, maximum, total)
```

The result has named components and cannot be modified because `frozen=True` is used.

```text
Time: O(n)
Auxiliary space: O(1)
```

---

## 10. Record layout in memory

A low-level record representation places fields at fixed offsets within the record. Fields may have different sizes, and compilers may insert padding to satisfy alignment requirements.

Conceptually:

```text
Student record
+----------------+
| identifier     |
+----------------+
| name object    |
+----------------+
| score          |
+----------------+
```

The exact layout is language- and implementation-dependent. The algorithmic point is that field access uses a known field position in the record layout, just as array access uses a known index in a repeated layout.

---

## 11. Records versus dictionaries

Python dictionaries can also represent named data:

```python
student = {
    "identifier": 1042,
    "name": "Marta",
    "score": 87.5,
}
```

This is flexible, but field names are ordinary runtime keys. A `dataclass` gives a more explicit fixed structure, clearer type annotations, and better support for tooling.

A dictionary is preferable when the set of keys is dynamic. A record is preferable when the structure is known and stable.

---

## What you must be able to explain

You should be able to explain:

- why records use named fields;
- how records differ from arrays and tuples;
- how field invariants strengthen types;
- why an array of records supports direct access by position but not necessarily by identifier;
- how record mutation can be visible through aliases;
- why records are useful as structured return values;
- when a dictionary is more appropriate than a fixed record.

## Practice

1. Define a `Book` record with ISBN, title, author, and page count.
2. State sensible invariants for the record.
3. Write a function returning the longest book from a non-empty list.
4. Explain whether the function returns the record itself or a copy.
5. Design a record representing a search result with `found`, `index`, and `comparisons`.
6. Compare a tuple, dictionary, and `dataclass` representation for the same entity.

## Summary

Records organise heterogeneous information by meaning rather than position. Named fields make contracts and algorithms clearer, while invariants define which record states are valid. Arrays and records complement one another: arrays organise many entities, and records organise the components of each entity.
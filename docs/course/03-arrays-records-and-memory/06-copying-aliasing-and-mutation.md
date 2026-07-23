# Copying, Aliasing, and Mutation

## Why this topic causes so many hidden bugs

Two variables may appear to contain the same list, but there are two very different possibilities:

1. they refer to the same mutable object;
2. they refer to two independent objects with equal contents.

The distinction determines whether an update in one place changes data observed somewhere else. This is not a minor Python detail. It affects contracts, correctness, testing, and memory cost.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to distinguish assignment from copying, explain aliasing, identify shallow-copy limitations, describe mutation through shared references, and choose an appropriate copy strategy.

---

## 1. Assignment may copy a reference, not the object

```python
original = [4, 7, 2]
alias = original
```

There is one list object and two names referring to it.

```text
original ─┐
          ├──► [4, 7, 2]
alias ────┘
```

After:

```python
alias[1] = 99
```

both names observe:

```text
[4, 99, 2]
```

The assignment did not duplicate the list. It duplicated access to the same object.

---

## 2. Definition of aliasing

**Aliasing** occurs when two or more references provide access to the same mutable object.

Aliasing is not automatically an error. It is sometimes intentional and useful. The problem is hidden aliasing: code assumes independent data when the state is actually shared.

A function that mutates its input affects every alias:

```python
def set_first_to_zero(values: list[int]) -> None:
    if values:
        values[0] = 0
```

```python
a = [5, 8]
b = a
set_first_to_zero(b)
print(a)  # [0, 8]
```

The side effect is visible through `a` because `a` and `b` refer to one list.

---

## 3. Creating a shallow copy

Common shallow-copy forms include:

```python
copy_1 = original.copy()
copy_2 = original[:]
copy_3 = list(original)
```

For a flat list of immutable integers, these usually behave as an independent outer list:

```python
original = [4, 7, 2]
copy = original.copy()
copy[1] = 99
```

Now:

```text
original = [4, 7, 2]
copy     = [4, 99, 2]
```

Creating the copy requires `O(n)` time and `O(n)` additional reference storage.

---

## 4. Shallow copy does not recursively duplicate nested objects

```python
original = [[1, 2], [3, 4]]
copy = original.copy()
```

The outer lists are different, but corresponding elements refer to the same inner lists.

```text
original ─► [ ref ─┐, ref ─┐ ]
                   │       │
copy     ─► [ ref ─┘, ref ─┘ ]
                   ▼       ▼
                [1, 2]  [3, 4]
```

After:

```python
copy[0][1] = 99
```

both structures display the changed inner list:

```text
original = [[1, 99], [3, 4]]
copy     = [[1, 99], [3, 4]]
```

This is the central limitation of shallow copying.

---

## 5. Deep copy

A **deep copy** recursively duplicates nested mutable components.

```python
from copy import deepcopy

copy = deepcopy(original)
```

After a successful deep copy, modifying a nested component in `copy` does not affect `original`.

Deep copying is more expensive. If the entire object graph contains `n` relevant components, time and extra space are generally proportional to the copied structure.

Deep copying is not always appropriate. Shared subobjects may be intentional, some resources cannot meaningfully be duplicated, and a full copy may be wasteful.

---

## 6. Mutation versus rebinding

These operations are different:

```python
values[0] = 10
```

mutates the list object.

```python
values = [10, 20, 30]
```

rebinds the local variable `values` to another object.

Consider:

```python
def replace_first(values: list[int]) -> None:
    values[0] = 10
```

The caller sees the mutation.

```python
def replace_list(values: list[int]) -> None:
    values = [10, 20, 30]
```

The caller's variable is not rebound. Only the local name changes.

Understanding this distinction is essential for reading Python function side effects.

---

## 7. Mutable default arguments

Aliasing can persist across calls when a mutable object is used as a default parameter:

```python
def collect(value: int, result: list[int] = []) -> list[int]:
    result.append(value)
    return result
```

The default list is created once, not once per call.

```python
collect(1)  # [1]
collect(2)  # [1, 2]
```

Safer design:

```python
def collect(value: int, result: list[int] | None = None) -> list[int]:
    if result is None:
        result = []

    result.append(value)
    return result
```

This example shows how object lifetime and aliasing can affect behaviour even when array operations look simple.

---

## 8. Aliasing in arrays of records

```python
from dataclasses import dataclass


@dataclass
class Student:
    name: str
    score: float


student = Student("Marta", 80.0)
group = [student, student]
```

Both array positions refer to the same record object.

```python
group[0].score = 95.0
```

Now both positions display score `95.0`.

If independent records are intended, each position must receive a separate object.

---

## 9. Repetition syntax can create shared nested rows

A common matrix bug is:

```python
matrix = [[0] * 3] * 4
```

The outer list contains four references to the same row.

```python
matrix[0][1] = 7
```

changes column `1` in every displayed row.

Correct independent rows:

```python
matrix = [[0] * 3 for _ in range(4)]
```

The two expressions look similar, but their object graphs are different.

---

## 10. Function contracts must specify mutation

Compare two contracts.

### Pure transformation

```python
def doubled(values: list[int]) -> list[int]:
    return [2 * value for value in values]
```

```text
Postcondition:
    result[i] = 2 × values[i]
    input values is unchanged
```

### In-place transformation

```python
def double_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] *= 2
```

```text
Postcondition:
    values[i] = 2 × old(values[i])
Side effect:
    input list is modified
```

The functions perform related transformations but have different interfaces and aliasing consequences.

---

## 11. C++ comparison

In C++, assigning one `std::vector<int>` to another normally copies the elements:

```cpp
std::vector<int> original{4, 7, 2};
std::vector<int> copy = original;
```

The vectors are independent.

A reference creates aliasing:

```cpp
std::vector<int>& alias = original;
```

C++ makes this distinction explicit in the type syntax. Python assignment uses reference semantics for objects by default.

Records in C++ also usually use value-copy semantics unless pointers or references are stored. The language comparison demonstrates why algorithm descriptions should distinguish abstract values from concrete reference behaviour.

---

## 12. Choosing a strategy

Before copying or mutating, ask:

- Must the caller's object remain unchanged?
- Are nested components mutable?
- Is shared state intentional?
- How expensive is copying?
- Can the algorithm return a new result instead?
- Do multiple components refer to one logical entity by design?

There is no universal rule that copying is always safer or mutation is always better. The contract and data size determine the appropriate choice.

---

## What you must be able to explain

You should be able to explain:

- why `alias = original` does not copy a Python list;
- what aliasing means;
- why shallow copies may still share nested objects;
- the difference between mutation and rebinding;
- why mutable default parameters are dangerous;
- why `[[0] * columns] * rows` creates shared rows;
- how copy cost affects complexity;
- why mutation policy belongs in the contract.

## Practice

1. Draw the object graph after `a = [[1], [2]]; b = a.copy()`.
2. Predict the result after modifying `b[0][0]`.
3. Rewrite a mutating function as a pure transformation.
4. Create a matrix with five independent rows.
5. Explain how Python and C++ vector assignment differ.
6. Design a contract for a function that may reuse the input list as output.

## Summary

Array variables do not always denote independent data. Python assignment commonly creates aliases, shallow copies duplicate only the outer container, and nested mutable objects may remain shared. Correct algorithms must make mutation and copying explicit because these choices affect observable behaviour, correctness, and memory cost.
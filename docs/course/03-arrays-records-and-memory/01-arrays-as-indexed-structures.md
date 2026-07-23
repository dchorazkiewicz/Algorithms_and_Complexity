# Arrays as Indexed Aggregate Structures

## Why arrays appear so early in algorithm design

Many problems do not involve one isolated value. They involve a collection: daily measurements, examination scores, identifiers, pixels, transactions, or intermediate results produced by another algorithm. Once several related values must be processed, the representation of the collection becomes part of the solution.

An array is one of the simplest and most important ways to organise such data. It gives every component a stable integer position. That position allows an algorithm to say not only “process all values,” but also “read the third value,” “replace the component at index `i`,” or “compare neighbouring components.”

The central idea is not a Python method. It is the relationship between a finite ordered collection and its index set.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to define an array abstractly, determine valid indices, explain direct access, distinguish values from positions, and describe how Python lists and C++ arrays or vectors realise related but not identical models.

---

## 1. From separate variables to one aggregate value

Suppose we record five temperatures:

```python
day_1 = 17
day_2 = 21
day_3 = 19
day_4 = 24
day_5 = 22
```

This representation is possible, but it does not scale. A loop cannot naturally ask for “the next variable,” and an algorithm written for five days would need to be rewritten for one hundred days.

A collection representation is better:

```python
temperatures = [17, 21, 19, 24, 22]
```

The five values now form one aggregate object. Their positions can be described by integers:

```text
index:        0   1   2   3   4
value:       17  21  19  24  22
```

The algorithm can process the collection independently of its concrete length.

---

## 2. Abstract definition of an array

At the algorithmic level, an **array** is a finite ordered collection of components, usually of one logical type, where each component is identified by an index from a fixed consecutive range.

For an array of length `n` using zero-based indexing, the valid index set is:

```text
0, 1, 2, ..., n - 1
```

The component at index `i` is commonly written as:

```text
A[i]
```

An array therefore combines three ideas:

- a finite number of components;
- an order among those components;
- direct identification of each component by an index.

The index is not part of the stored value. It is the component's position in the structure.

---

## 3. Length and valid indices

If:

```python
values = [8, 3, 5, 9]
```

then:

```python
len(values) == 4
```

The valid indices are:

```text
0, 1, 2, 3
```

The largest valid index is:

```text
len(values) - 1
```

This relationship is responsible for many boundary errors. A loop such as:

```python
for index in range(len(values)):
    print(values[index])
```

uses exactly the indices `0` through `len(values) - 1` because the upper bound of `range` is excluded.

The expression:

```python
values[len(values)]
```

is outside the array. In Python it raises `IndexError`.

### Empty arrays

For an empty sequence:

```python
values = []
```

we have:

```text
length = 0
valid index set = empty
```

There is no first component and no last component. Any algorithm that reads `values[0]` must therefore require non-empty input or handle the empty case explicitly.

---

## 4. Index versus value

Consider:

```python
values = [40, 10, 70]
```

At index `1`, the stored value is `10`.

These are different kinds of information:

```text
index = 1
value = 10
```

A search algorithm may return either one depending on its contract.

```python
def first_index_of(values: list[int], target: int) -> int:
    for index, value in enumerate(values):
        if value == target:
            return index
    return -1
```

For:

```python
first_index_of([40, 10, 70], 10)
```

the result is `1`, not `10`.

Confusing positions with stored values leads to incorrect interfaces and incorrect updates.

---

## 5. Direct access

The expression:

```python
values[2]
```

requests the component at a known position. Under the standard array model, the algorithm does not need to inspect positions `0` and `1` first.

This is called **direct access** or **random access**. The word *random* does not mean probabilistic. It means that any valid component can be accessed directly when its index is known.

Under the usual RAM cost model:

```text
read A[i]      O(1)
write A[i]     O(1)
```

This constant-time access is one of the array's defining advantages.

Direct access does not imply that finding an unknown position is constant-time. If we know the index, access is direct. If we know only a target value and the array is unsorted, we may need to scan the whole array.

---

## 6. Reading and updating components

Reading:

```python
current = values[index]
```

Updating:

```python
values[index] = new_value
```

An update changes one component while preserving the positions of all others.

Example:

```python
scores = [72, 68, 91, 77]
scores[1] = 75
```

After the assignment:

```text
[72, 75, 91, 77]
```

The array length is unchanged. This differs from insertion, which introduces a new component and may shift existing values.

---

## 7. Homogeneity and logical type

Classical arrays are homogeneous: all components have the same type and size. This makes their memory representation regular.

C++ expresses this directly:

```cpp
std::array<int, 5> values{17, 21, 19, 24, 22};
```

Every component is an `int`.

Python lists can technically contain values of different runtime types:

```python
mixed = [17, "twenty-one", True]
```

However, most algorithms assume a consistent logical type because operations such as comparison or addition require compatible values.

```python
def maximum(values: list[int]) -> int:
    ...
```

The annotation communicates that the algorithm expects integers. The abstract array model remains homogeneous even though Python's container is more flexible.

---

## 8. Array, Python list, and C++ vector

These terms should not be treated as exact synonyms.

### Abstract array

A conceptual indexed structure with consecutive positions and direct access.

### Python `list`

A dynamic mutable sequence of references to Python objects. It supports direct indexing and can grow or shrink.

### C++ built-in array or `std::array`

A fixed-size sequence whose element type and length are part of the concrete representation.

### C++ `std::vector`

A dynamic contiguous sequence with a logical size and an allocated capacity.

They share many algorithmic operations, but language-specific details affect copying, memory, bounds, growth, and performance.

---

## 9. Traversal is different from access

Direct access retrieves one known component. Traversal processes many or all components.

```python
def total(values: list[int]) -> int:
    result = 0
    for value in values:
        result += value
    return result
```

For `n` components, every value is read once:

```text
Time: O(n)
Auxiliary space: O(1)
```

The existence of `O(1)` indexed access does not make a full traversal constant-time. The number of accessed components still matters.

---

## 10. A complete introductory example

Problem:

> Replace every negative component by zero without changing the array length.

```python
def clamp_negatives(values: list[int]) -> None:
    for index in range(len(values)):
        if values[index] < 0:
            values[index] = 0
```

Contract:

```text
Precondition:
    values is a finite list of integers.

Postcondition:
    len(values) is unchanged.
    For every valid index i:
        values[i] = max(old(values[i]), 0).

Side effect:
    values is modified in place.
```

The algorithm needs indices because it updates components. A value-only loop would give access to each value but would not directly identify where to store the replacement.

For input:

```text
[4, -2, 0, -7, 3]
```

state changes are:

```text
[4, -2, 0, -7, 3]
[4,  0, 0, -7, 3]
[4,  0, 0,  0, 3]
```

Time is `O(n)` and auxiliary space is `O(1)`.

---

## What you must be able to explain

After this chapter, you should be able to explain:

- why an array is an aggregate structure;
- why positions and values are different;
- why valid indices are `0` through `n - 1`;
- why access by a known index is `O(1)`;
- why searching by value may still be `O(n)`;
- why replacing a component does not change length;
- why a Python list is related to but not identical with a classical array;
- when an algorithm needs values and when it needs indices.

## Practice

1. Write the index-value diagram for `[6, 2, 9, 4]`.
2. Explain why `values[len(values)]` is invalid.
3. Write a function that replaces every odd integer by its negative.
4. State a contract for a function returning the final component.
5. Explain the difference between returning the largest value and returning its index.
6. For a list of length `n`, count how many components a complete traversal reads.

## Summary

An array organises a finite ordered collection through consecutive integer indices. Known positions support direct access, while operations over many components require traversal. The abstract array model must be separated from concrete containers such as Python lists and C++ vectors, because implementation details influence memory behaviour and operation cost.
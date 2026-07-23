# Worked Examples

This chapter combines the module's concepts into complete problems. Each example includes a contract, design reasoning, Python implementation, correctness idea, and complexity analysis.

---

## Example 1 — Reverse an array in place

### Problem

Reverse the order of the components without creating another array.

### Design

The first and last components exchange places, then the second and second-last, and so on. Two indices move toward the centre.

```python
def reverse_in_place(values: list[int]) -> None:
    left = 0
    right = len(values) - 1

    while left < right:
        values[left], values[right] = values[right], values[left]
        left += 1
        right -= 1
```

### Contract

```text
Precondition:
    values is a finite list.

Postcondition:
    len(values) is unchanged.
    For every valid index i:
        values[i] = old(values[len(values) - 1 - i]).

Side effect:
    values is modified in place.
```

### Correctness idea

Before each iteration, components outside the interval `[left, right]` are already in their final reversed positions. Swapping the endpoints places two more components correctly. When `left >= right`, no unresolved pair remains.

```text
Time: O(n)
Auxiliary space: O(1)
```

---

## Example 2 — Rotate right by `k` positions

### Problem

Return a new array in which every component moves `k` positions to the right, wrapping around the end.

```python
def rotated_right(values: list[int], k: int) -> list[int]:
    if not values:
        return []

    k %= len(values)
    result = [0] * len(values)

    for index, value in enumerate(values):
        new_index = (index + k) % len(values)
        result[new_index] = value

    return result
```

For:

```text
values = [10, 20, 30, 40, 50]
k = 2
```

result:

```text
[40, 50, 10, 20, 30]
```

The modulo operation converts any non-negative rotation count to an equivalent value in the valid range.

```text
Time: O(n)
Output space: O(n)
```

---

## Example 3 — Insert into a sorted array

### Problem

Insert a value into a non-decreasing array and preserve sorted order.

```python
def insert_sorted(values: list[int], item: int) -> list[int]:
    position = 0

    while position < len(values) and values[position] <= item:
        position += 1

    result = [0] * (len(values) + 1)

    for index in range(position):
        result[index] = values[index]

    result[position] = item

    for index in range(position, len(values)):
        result[index + 1] = values[index]

    return result
```

### Contract

```text
Precondition:
    values is sorted in non-decreasing order.

Postcondition:
    result is sorted in non-decreasing order.
    result contains every old input component and one additional occurrence of item.
```

The first loop finds the insertion position. The later loops copy the prefix and suffix around the new component.

```text
Time: O(n)
Output space: O(n)
```

---

## Example 4 — Delete all occurrences while preserving order

```python
def without_value(values: list[int], target: int) -> list[int]:
    result: list[int] = []

    for value in values:
        if value != target:
            result.append(value)

    return result
```

Postcondition:

```text
result contains exactly the input components unequal to target,
in their original relative order.
```

```text
Time: O(n)
Output space: O(n) in the worst case
```

The algorithm is stable because retained values are appended in traversal order.

---

## Example 5 — Find the second largest distinct value

### Problem

Return the second largest distinct value from a list containing at least two distinct integers.

```python
def second_largest_distinct(values: list[int]) -> int:
    if len(values) < 2:
        raise ValueError("at least two values are required")

    largest: int | None = None
    second: int | None = None

    for value in values:
        if largest is None or value > largest:
            if value != largest:
                second = largest
                largest = value
        elif value != largest and (second is None or value > second):
            second = value

    if second is None:
        raise ValueError("at least two distinct values are required")

    return second
```

State meaning:

```text
largest = greatest distinct value processed so far
second  = second greatest distinct value processed so far, if it exists
```

```text
Time: O(n)
Auxiliary space: O(1)
```

This example shows how an array scan can maintain more than one summary value.

---

## Example 6 — Transpose a rectangular matrix

A matrix represented by independent row lists:

```python
def transpose(matrix: list[list[int]]) -> list[list[int]]:
    if not matrix:
        return []

    column_count = len(matrix[0])

    for row in matrix:
        if len(row) != column_count:
            raise ValueError("matrix must be rectangular")

    result = [
        [0 for _ in range(len(matrix))]
        for _ in range(column_count)
    ]

    for row_index in range(len(matrix)):
        for column_index in range(column_count):
            result[column_index][row_index] = matrix[row_index][column_index]

    return result
```

For an `r × c` matrix:

```text
Time: O(r × c)
Output space: O(r × c)
```

The rectangularity precondition matters because row lengths determine whether every indexed access is valid.

---

## Example 7 — Process an array of records

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class Product:
    code: str
    name: str
    price: float


@dataclass(frozen=True)
class PriceSummary:
    cheapest: Product
    most_expensive: Product
    average_price: float


def summarise_prices(products: list[Product]) -> PriceSummary:
    if not products:
        raise ValueError("products must not be empty")

    cheapest = products[0]
    most_expensive = products[0]
    total = 0.0

    for product in products:
        if product.price < cheapest.price:
            cheapest = product
        if product.price > most_expensive.price:
            most_expensive = product
        total += product.price

    return PriceSummary(
        cheapest=cheapest,
        most_expensive=most_expensive,
        average_price=total / len(products),
    )
```

The array provides traversal; records provide named field access; the returned record groups three related results.

```text
Time: O(n)
Auxiliary space: O(1)
```

---

## Example 8 — Detect aliasing in a matrix construction

Incorrect:

```python
def broken_matrix(rows: int, columns: int) -> list[list[int]]:
    return [[0] * columns] * rows
```

Correct:

```python
def zero_matrix(rows: int, columns: int) -> list[list[int]]:
    if rows < 0 or columns < 0:
        raise ValueError("dimensions must be non-negative")

    return [[0] * columns for _ in range(rows)]
```

The correct version creates a new row object on every iteration. The broken version repeats references to one row.

---

## Integrated design questions

For each example, ask:

1. What is the abstract structure?
2. Which indices are valid?
3. Is the input modified?
4. Does the algorithm preserve order?
5. What state summarises the processed region?
6. Are aliases possible?
7. Which operations dominate the cost?
8. Would the same algorithm have different implementation details in C++?

## Summary

Array algorithms are shaped by index ranges, traversal direction, mutation policy, order requirements, and memory representation. Records add named structure to the values being processed. Complete reasoning connects all of these choices to the contract and complexity.
# Worked Examples

## Why worked examples matter

A definition becomes useful only when it can guide a complete solution. This chapter combines the module's ideas in several problems. Each example follows the same sequence:

1. state the problem;
2. write the contract;
3. choose state or recursive meaning;
4. implement in Python;
5. explain correctness;
6. explain termination;
7. analyse complexity;
8. identify boundary cases.

The purpose is not to memorise the functions. The purpose is to recognise a reusable design process.

---

## Example 1 — Count values in a closed interval

### Problem

> Given a list of integers and two bounds `lower` and `upper`, count how many values satisfy `lower ≤ value ≤ upper`.

### Contract

```text
Precondition:
    lower ≤ upper

Postcondition:
    result equals the number of elements value in values
    satisfying lower ≤ value ≤ upper

Side effects:
    values is not modified
```

### State meaning

```text
count = number of matching elements in the processed prefix
```

### Python

```python
def count_in_range(values: list[int], lower: int, upper: int) -> int:
    if lower > upper:
        raise ValueError("lower must not exceed upper")

    count = 0

    for value in values:
        if lower <= value <= upper:
            count += 1

    return count
```

### Correctness

Initially the processed prefix is empty and `count == 0`. Each new value either satisfies the predicate and increases the count by one, or does not and leaves the count unchanged. At completion, the processed prefix is the whole list.

### Termination and complexity

The finite list is traversed once.

```text
Time: O(n)
Auxiliary space: O(1)
```

### Boundary cases

- empty list → `0`;
- `lower == upper` → counts occurrences of one value;
- invalid reversed bounds → `ValueError`.

---

## Example 2 — First non-decreasing violation

### Problem

> Return the first index `i` such that `values[i] < values[i - 1]`, or `-1` if the list is non-decreasing.

### Contract

```text
Postcondition:
    result = -1 if every adjacent pair is non-decreasing;
    otherwise result is the smallest index i > 0 with values[i] < values[i - 1]
```

### State meaning

Before inspecting index `i`:

```text
values[0:i] is non-decreasing
```

### Python

```python
def first_order_violation(values: list[int]) -> int:
    for index in range(1, len(values)):
        if values[index] < values[index - 1]:
            return index

    return -1
```

### Correctness

The loop checks adjacent pairs from left to right. If a violation is returned, every earlier pair has already been verified, so the returned index is the first violation. If no return occurs, every adjacent pair satisfies the required order.

### Complexity

```text
Best case: O(1)
Worst case: O(n)
Auxiliary space: O(1)
```

---

## Example 3 — Integer logarithm by repeated division

### Problem

> For integers `number ≥ 1` and `base ≥ 2`, return the largest integer `k` such that `base^k ≤ number`.

### Idea

Repeatedly divide by `base` and count how many divisions are possible before the quotient becomes smaller than `base`.

### Python

```python
def integer_log(number: int, base: int) -> int:
    if number < 1:
        raise ValueError("number must be at least 1")
    if base < 2:
        raise ValueError("base must be at least 2")

    exponent = 0
    remaining = number

    while remaining >= base:
        remaining //= base
        exponent += 1

    return exponent
```

### Invariant

```text
number = remaining · base^exponent + discarded remainder information,
and exponent counts completed divisions
```

A simpler interpretation is that after `exponent` divisions, `remaining` equals the integer quotient after removing `exponent` base factors.

### Termination

For `remaining ≥ base ≥ 2`:

```text
remaining // base < remaining
```

The positive measure strictly decreases.

### Complexity

```text
O(log_base number) time
O(1) space
```

---

## Example 4 — Iterative Euclid algorithm

### Problem

> Compute the greatest common divisor of two non-negative integers, not both zero.

### Contract

```text
Precondition:
    first ≥ 0
    second ≥ 0
    first > 0 or second > 0

Postcondition:
    result is the greatest positive integer dividing both original inputs
```

### Python

```python
def gcd_iterative(first: int, second: int) -> int:
    if first < 0 or second < 0:
        raise ValueError("arguments must be non-negative")
    if first == 0 and second == 0:
        raise ValueError("at least one argument must be positive")

    while second != 0:
        first, second = second, first % second

    return first
```

### Invariant

```text
gcd(first, second) equals the gcd of the original inputs
```

The transformation preserves the set of common divisors.

### Termination

The second value becomes a remainder strictly smaller than the previous positive second value.

---

## Example 5 — Recursive Euclid algorithm

```python
def gcd_recursive(first: int, second: int) -> int:
    if first < 0 or second < 0:
        raise ValueError("arguments must be non-negative")
    if first == 0 and second == 0:
        raise ValueError("at least one argument must be positive")

    if second == 0:
        return first

    return gcd_recursive(second, first % second)
```

The recursive meaning is direct:

```text
gcd(a, b) = gcd(b, a mod b)
```

Time complexity is logarithmic under the standard analysis. Stack depth is also logarithmic in the magnitude of the arguments.

---

## Example 6 — Exponentiation by repeated multiplication

### Iterative version

```python
def power_iterative(base: int, exponent: int) -> int:
    if exponent < 0:
        raise ValueError("exponent must be non-negative")

    result = 1

    for _ in range(exponent):
        result *= base

    return result
```

Invariant:

```text
result = base^k after k completed iterations
```

Complexity:

```text
O(exponent) time
O(1) space
```

### Recursive version

```python
def power_recursive(base: int, exponent: int) -> int:
    if exponent < 0:
        raise ValueError("exponent must be non-negative")

    if exponent == 0:
        return 1

    return base * power_recursive(base, exponent - 1)
```

Complexity:

```text
O(exponent) time
O(exponent) stack space
```

---

## Example 7 — Exponentiation by squaring

A better recursive reduction uses parity.

```python
def power_fast(base: int, exponent: int) -> int:
    if exponent < 0:
        raise ValueError("exponent must be non-negative")

    if exponent == 0:
        return 1

    half = power_fast(base, exponent // 2)

    if exponent % 2 == 0:
        return half * half

    return base * half * half
```

The exponent is approximately halved at each call.

```text
Time: O(log exponent)
Stack space: O(log exponent)
```

This example shows that recursive design is not only a stylistic alternative. A better reduction can improve asymptotic complexity.

---

## Example 8 — Palindrome check with two indices

### Problem

> Return `True` if a list reads the same forward and backward.

### Python

```python
def is_palindrome(values: list[int]) -> bool:
    left = 0
    right = len(values) - 1

    while left < right:
        if values[left] != values[right]:
            return False

        left += 1
        right -= 1

    return True
```

### Invariant

```text
All positions outside the interval [left, right]
have already been matched with their mirror positions.
```

### Termination measure

```text
right - left + 1
```

The active interval shrinks by two per successful iteration.

### Complexity

```text
O(n) time
O(1) auxiliary space
```

---

## Example 9 — Recursive palindrome check

```python
def is_palindrome_recursive(
    values: list[int],
    left: int = 0,
    right: int | None = None,
) -> bool:
    if right is None:
        right = len(values) - 1

    if left >= right:
        return True

    if values[left] != values[right]:
        return False

    return is_palindrome_recursive(values, left + 1, right - 1)
```

The recursive subproblem is the interior interval.

The interval length strictly decreases. Time is `O(n)` and stack space is `O(n)`.

---

## Example 10 — Classify values into a record-like result

Compound output can preserve several related statistics.

```python
from dataclasses import dataclass


@dataclass
class Classification:
    negative: int
    zero: int
    positive: int


def classify(values: list[int]) -> Classification:
    negative = 0
    zero = 0
    positive = 0

    for value in values:
        if value < 0:
            negative += 1
        elif value == 0:
            zero += 1
        else:
            positive += 1

    return Classification(negative, zero, positive)
```

Invariant:

```text
negative + zero + positive = number of processed elements,
and each counter records its corresponding class
```

This example connects iteration, selection, primitive counters, and compound output.

---

## What the examples have in common

Although the problems differ, each solution answers the same structural questions:

- What is the input domain?
- What result is required?
- Which state summarises progress?
- What is initially true?
- How is one smaller or later state produced?
- Why is the meaning preserved?
- Why must the process stop?
- What is the cost?

That repeated structure is the real content of the module.
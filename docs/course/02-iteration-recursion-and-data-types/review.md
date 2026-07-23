# Module 02 Review — Iteration, Recursion, and Data Types

## What this review checks

This review does not ask whether you can copy a familiar loop or recursive function. It checks whether you understand:

- repeated state transformation;
- definite and condition-controlled iteration;
- loop boundaries;
- invariants;
- termination measures;
- recursive reduction;
- base and recursive cases;
- iterative–recursive trade-offs;
- primitive and compound data types;
- the construction of correct algorithms.

---

## 1. Core vocabulary

You should be able to define and distinguish:

- iteration;
- definite iteration;
- condition-controlled iteration;
- loop state;
- accumulator;
- counter;
- processed prefix;
- loop invariant;
- termination condition;
- termination measure;
- partial correctness;
- total correctness;
- recursion;
- base case;
- recursive case;
- recursive progress;
- call stack;
- primitive data type;
- compound data type;
- mutability;
- aliasing.

A definition should explain the role of the concept, not merely repeat its name.

---

## 2. Concept questions

1. Why is iteration more than repeated syntax?
2. What is the difference between a loop condition and a loop invariant?
3. Why can a loop preserve an invariant and still fail to terminate?
4. Why can a terminating loop still be incorrect?
5. What does a termination measure need to satisfy?
6. Why does a `for` loop over a finite list terminate automatically at the traversal level?
7. What causes an off-by-one error?
8. Why does `range(len(values))` cover all valid list indices?
9. Why can changing a list's length during iteration be dangerous?
10. Why is a base case not enough to ensure recursive termination?
11. How does recursive correctness resemble mathematical induction?
12. Where is state stored in iteration and recursion?
13. Why can recursive and iterative implementations have equal time but different auxiliary-space complexity?
14. Why is naive recursive Fibonacci inefficient?
15. Why are type annotations not complete contracts?
16. How can aliasing affect correctness?
17. Why can copying a list change complexity?
18. Why can a representation choice change the algorithm's performance?

---

## 3. Trace exercises

### Exercise 1 — Accumulator

Trace:

```python
def sum_positive(values: list[int]) -> int:
    total = 0

    for value in values:
        if value > 0:
            total += value

    return total
```

for:

```text
[-2, 5, 0, 3, -1]
```

State the invariant.

### Exercise 2 — `while` state

Trace:

```python
number = 73
count = 0

while number > 0:
    number //= 10
    count += 1
```

Explain what `count` and `number` mean after each iteration.

### Exercise 3 — Euclid

Trace iterative Euclid for:

```text
first = 252
second = 105
```

Record the pair before and after every iteration.

### Exercise 4 — Recursive calls

Trace calls and returns for:

```python
def power(base: int, exponent: int) -> int:
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)
```

using `power(3, 4)`.

### Exercise 5 — Two indices

Trace the palindrome algorithm for:

```text
[4, 7, 9, 7, 4]
```

and:

```text
[4, 7, 8, 9]
```

---

## 4. Boundary and range problems

For each task, write the exact Python range and justify both boundaries.

1. Process every index of a list.
2. Process every index except `0`.
3. Compare each value with its predecessor.
4. Compare every unordered pair of distinct indices exactly once.
5. Scan indices backward from the final index to zero.
6. Process every second index beginning at zero.
7. Process the closed mathematical interval from `lower` through `upper`.

---

## 5. Find and repair the error

### Problem 1 — Missing final element

```python
def sum_values(values: list[int]) -> int:
    total = 0
    for index in range(len(values) - 1):
        total += values[index]
    return total
```

### Problem 2 — Infinite loop

```python
def reduce(number: int) -> int:
    count = 0
    while number > 0:
        count += 1
    return count
```

### Problem 3 — Wrong movement

```python
index = 0
while index < len(values):
    print(values[index])
    index -= 1
```

### Problem 4 — Unreachable base case

```python
def factorial(n: int) -> int:
    if n == 0:
        return 1
    return n * factorial(n)
```

### Problem 5 — Overshooting

```python
def countdown(n: int) -> None:
    if n == 0:
        return
    countdown(n - 2)
```

Explain the failure for odd input.

### Problem 6 — Aliasing

```python
def cleared(values: list[int]) -> list[int]:
    result = values
    result.clear()
    return result
```

Explain the side effect on the caller's list.

---

## 6. Invariant exercises

Write a useful invariant for each algorithm.

1. Sum all elements processed so far.
2. Count elements equal to `target`.
3. Find the first occurrence of `target`.
4. Compute the maximum of a non-empty list.
5. Verify that a list is non-decreasing.
6. Reverse a list in place using `left` and `right` indices.
7. Compute a product using repeated multiplication.
8. Classify processed values as negative, zero, or positive.

For each invariant, explain:

- why it is initially true;
- why one iteration preserves it;
- how it implies the postcondition at completion.

---

## 7. Termination exercises

Identify a bounded decreasing measure.

1. `index` increases from `0` toward `n`.
2. `counter` decreases toward `0`.
3. A positive number is divided by `2`.
4. Euclid's second argument becomes a remainder.
5. A two-index interval shrinks from both sides.
6. A recursive function calls itself with `n - 1`.
7. A recursive list search advances its starting index.
8. Exponentiation by squaring calls itself with `exponent // 2`.

Explain why each measure cannot decrease forever.

---

## 8. Iteration and recursion transformations

### Exercise 1

Write iterative and recursive versions of the sum of integers from `1` through `n`.

### Exercise 2

Convert recursive countdown to a `while` loop.

### Exercise 3

Convert iterative Euclid to recursion.

### Exercise 4

Implement recursive list reversal using indices or decomposition. Compare its auxiliary space with an iterative two-index solution.

### Exercise 5

Implement deep traversal of a nested list recursively and then with an explicit stack.

For each pair, compare:

- state representation;
- termination reasoning;
- time complexity;
- auxiliary space;
- clarity.

---

## 9. Data-type questions

1. Why is a Boolean a better output than `0` or `1` for a yes-or-no predicate?
2. When is a tuple preferable to a list?
3. Why does a named record improve algorithm readability?
4. What is the difference between rebinding an integer variable and mutating a list?
5. What happens when two names refer to the same list?
6. Why is a string algorithm operating on a compound value?
7. Why can floating-point equality be unreliable?
8. How do list and set membership costs differ under the usual model?
9. Why does a shallow copy not fully separate nested data?
10. Which semantic requirements cannot be expressed by `list[int]` alone?

---

## 10. Construction problems

For every problem below, provide:

- contract;
- examples and edge cases;
- chosen state or recursive meaning;
- Python implementation;
- correctness argument;
- termination argument;
- time and auxiliary-space complexity.

### Problem 1 — Sum of digits

Return the sum of decimal digits of a non-negative integer.

### Problem 2 — First repeated adjacent value

Return the first index at which a value equals its predecessor, or `-1`.

### Problem 3 — Count maximum occurrences

For a non-empty list, return how many times the greatest value occurs.

### Problem 4 — Integer power

Compute `base^exponent` for a non-negative exponent using both repeated multiplication and exponentiation by squaring.

### Problem 5 — Sequence palindrome

Implement iterative and recursive forms.

### Problem 6 — Greatest common divisor

Implement iterative and recursive Euclid algorithms.

### Problem 7 — Nested depth

Given a recursively nested list structure, return its maximum nesting depth.

### Problem 8 — Classification record

Return a record containing negative, zero, positive, even, and odd counts. Define how zero contributes.

---

## 11. Complexity table

Complete and justify:

| Algorithm | Time | Auxiliary space |
|---|---:|---:|
| Full list scan | ? | ? |
| Nested all-pairs comparison | ? | ? |
| Repeated division by 2 | ? | ? |
| Iterative factorial | ? | ? |
| Recursive factorial | ? | ? |
| Recursive linear search | ? | ? |
| Naive recursive Fibonacci | ? | ? |
| Exponentiation by squaring | ? | ? |
| Iterative palindrome | ? | ? |
| Recursive palindrome | ? | ? |

---

## 12. Capstone problem

Design a function:

```python
def analyse_digits(number: int) -> DigitAnalysis:
    ...
```

where `DigitAnalysis` is a dataclass containing:

- number of digits;
- sum of digits;
- largest digit;
- number of even digits;
- whether the decimal representation is a palindrome.

Requirements:

1. `number` is non-negative;
2. zero has one digit;
3. do not convert the number to a string in the primary solution;
4. use iteration for the main implementation;
5. explain the state meaning of every field;
6. provide a termination measure;
7. analyse time and auxiliary space;
8. identify how the design would change for a recursive implementation.

---

## 13. Mastery checklist

You are ready to continue when you can honestly say:

- [ ] I can read a loop as a sequence of state transformations.
- [ ] I can choose correct range boundaries.
- [ ] I can diagnose off-by-one errors.
- [ ] I can design a condition-controlled loop.
- [ ] I can state a useful loop invariant.
- [ ] I can identify a bounded decreasing termination measure.
- [ ] I can distinguish partial and total correctness.
- [ ] I can design reachable recursive base cases.
- [ ] I can trace recursive calls and returns.
- [ ] I can compare iterative and recursive state and space.
- [ ] I can distinguish primitive and compound data types.
- [ ] I can explain mutability and aliasing.
- [ ] I can build a correct algorithm from a contract.

## 14. Final perspective

Iteration and recursion are not merely ways to repeat instructions. They are disciplined methods for transforming or reducing a problem while preserving meaning and making progress.

The essential questions remain:

- What does the current state represent?
- What becomes smaller, larger, or more complete?
- Why is the required relationship preserved?
- Why must the process stop?
- What resources are consumed?

These questions prepare the transition to Module 03, where algorithms operate on arrays, records, and concrete memory representations.
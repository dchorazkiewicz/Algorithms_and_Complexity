# Module 01 Review — Foundations of Algorithm Design

## Purpose of this review

This review is not a vocabulary quiz alone. It checks whether you can connect specification, state, representation, control flow, correctness, termination, and complexity.

You should be able to explain your answers without relying only on familiar Python syntax.

---

## 1. Core concepts

Explain each term in your own words and give one example:

1. computational problem;
2. problem instance;
3. algorithm;
4. program;
5. execution;
6. program state;
7. expression;
8. statement;
9. assignment;
10. control flow;
11. precondition;
12. postcondition;
13. side effect;
14. failure behaviour;
15. definiteness;
16. effectiveness;
17. finiteness;
18. correctness;
19. generality;
20. efficiency.

For every pair below, explain the difference:

- problem and instance;
- algorithm and program;
- program and execution;
- expression and statement;
- assignment and equality;
- returned result and side effect;
- precondition and validation;
- test and proof;
- partial correctness and total correctness;
- algorithm and representation.

---

## 2. Reading state transitions

Initial state:

```text
x = 3
y = 8
z = 0
```

Instructions:

```text
z ← x + y
x ← z - x
y ← z - y
```

Answer:

1. What is the state after each instruction?
2. What are the final values?
3. What relationship does the procedure establish between the final values and the initial values?
4. Which old values are lost?

---

## 3. Assignment is not equality

Explain why:

```text
count ← count + 1
```

is valid pseudocode but:

```text
count = count + 1
```

is not a valid mathematical equation for ordinary numbers.

Then describe the three operational stages of the assignment.

---

## 4. Contracts

Write contracts for the following problems.

### A. Absolute value

Return the absolute value of an integer.

### B. First element

Return the first element of a sequence.

Decide how empty input is handled.

### C. Index of a target

Return the first matching index or a failure result.

### D. Average

Return the arithmetic mean of a sequence of real numbers.

### E. In-place increment

Add one to every element of a mutable integer sequence.

For each contract include:

- input;
- precondition;
- postcondition;
- side effects;
- failure behaviour.

---

## 5. Weak and strong conditions

For a function that returns the minimum of a non-empty integer list, evaluate each proposed precondition.

1. `values is a list`;
2. `values is a non-empty list of integers`;
3. `values contains at least two positive integers`;
4. `values is sorted`;
5. `length(values) > 0`.

Classify each as:

- insufficient;
- appropriate;
- unnecessarily strong;
- relevant only with additional type assumptions.

Then evaluate these postconditions:

1. `result is an integer`;
2. `result <= every element of values`;
3. `result is an element of values and result <= every element of values`;
4. `result = values[0]`.

---

## 6. Representation comparison

Represent the problem “count values equal to zero” in four forms:

1. structured natural language;
2. pseudocode;
3. Python;
4. trace table for `[0, 4, 0, -2]`.

Then explain what each form makes easy to see and what it hides.

---

## 7. Pseudocode translation

Translate into Python:

```text
ALGORITHM last_index(values, target)
    result ← -1

    FOR index ← 0 TO length(values) - 1 DO
        IF values[index] = target THEN
            result ← index
        END IF
    END FOR

    RETURN result
END ALGORITHM
```

Explain why the algorithm returns the last occurrence rather than the first.

---

## 8. Find the defect

### A. Missing progress

```python
def contains(values: list[int], target: int) -> bool:
    index = 0

    while index < len(values):
        if values[index] == target:
            return True

    return False
```

Identify the defect, give a failing input, and repair the function.

### B. Invalid initial state

```python
def minimum(values: list[int]) -> int:
    result = 0

    for value in values:
        if value < result:
            result = value

    return result
```

State the domain on which it works and redesign it for every non-empty integer list.

### C. Wrong tie rule

```python
def first_index_of_maximum(values: list[int]) -> int:
    best_index = 0

    for index in range(1, len(values)):
        if values[index] >= values[best_index]:
            best_index = index

    return best_index
```

Give a counterexample and explain which problem the function actually solves.

### D. Side effect mismatch

```python
def doubled(values: list[int]) -> list[int]:
    for index in range(len(values)):
        values[index] *= 2
    return values
```

Explain why the name and return type do not reveal the full contract. Write two clearer alternatives:

- one producing a new list;
- one modifying the input in place.

---

## 9. Correctness reasoning

For:

```python
def count_even(values: list[int]) -> int:
    count = 0

    for value in values:
        if value % 2 == 0:
            count += 1

    return count
```

Write:

1. the state meaning of `count`;
2. the initialisation argument;
3. the preservation argument for even and odd values;
4. the completion argument;
5. the termination argument;
6. time and auxiliary-space complexity.

---

## 10. Structured design problem

Design a function:

> Given a non-empty list of integers, return the difference between its maximum and minimum.

Complete every stage:

1. contract;
2. boundary cases;
3. state meanings;
4. structured prose;
5. pseudocode;
6. Python;
7. trace for `[7, 2, 9, 4]`;
8. correctness argument;
9. termination argument;
10. complexity.

Do not use Python's built-in `min` or `max`.

---

## 11. Decomposition problem

Design a small score-processing program with these requirements:

- input is a non-empty list of scores;
- every score must be between `0` and `100`;
- return the average;
- return the minimum and maximum;
- return how many scores are passing under threshold `50`;
- do not modify the input.

Propose function boundaries. For each function state:

- responsibility;
- precondition;
- postcondition;
- side effects;
- complexity.

Then explain how the contracts compose in the main function.

---

## 12. Property diagnosis

For each procedure, identify the principal violated or missing property.

1. “Continue until the output seems accurate.”
2. “Check the first item and return it as the maximum.”
3. “Keep adding one while `x != 0`.”
4. “Sort the list instantly.”
5. A program works for ten tests but no general argument is available.
6. A procedure returns the correct result but may run forever.
7. The output is described only as “some useful value.”

Possible concepts include:

- definiteness;
- effectiveness;
- finiteness;
- generality;
- correctness;
- specification completeness.

---

## 13. Complexity basics

Analyse time and auxiliary space.

### A

```python
def first(values: list[int]) -> int:
    return values[0]
```

### B

```python
def total(values: list[int]) -> int:
    result = 0
    for value in values:
        result += value
    return result
```

### C

```python
def copy_values(values: list[int]) -> list[int]:
    result = []
    for value in values:
        result.append(value)
    return result
```

### D

```python
def contains_pair(values: list[int], target: int) -> bool:
    for first in values:
        for second in values:
            if first + second == target:
                return True
    return False
```

For each analysis state:

- input-size measure;
- important operation;
- best and worst case when they differ;
- auxiliary memory.

---

## 14. Capstone problem

Design an algorithm for the following specification:

> Given a finite sequence of integers, return the first index at which the running sum becomes strictly negative. Return `-1` if the running sum never becomes negative.

Example:

```text
[4, -1, -2, -5, 8] -> 3
```

because the running sums are:

```text
4, 3, 1, -4, 4
```

Your solution must include:

1. precise contract;
2. explanation of the term “running sum”;
3. state variables and meanings;
4. pseudocode;
5. Python;
6. trace;
7. correctness argument;
8. termination argument;
9. complexity;
10. tests for empty input, immediate failure, no failure, and later failure.

---

## 15. Oral self-check

Without looking back, answer aloud:

1. Why must an algorithm be separated from its program?
2. What is state?
3. Why is initialisation a logical claim?
4. How do preconditions and postconditions divide responsibility?
5. Why is testing not proof?
6. What makes pseudocode useful?
7. Why does a trace describe an execution rather than the whole algorithm?
8. How do sequence, selection, iteration, and decomposition support reasoning?
9. What is the difference between correctness and efficiency?
10. How can one character such as `>` versus `>=` change the problem solved?

---

## 16. Mastery criteria

Module 01 is mastered when you can independently:

- formulate a precise problem and contract;
- identify state and state transitions;
- distinguish expressions, statements, and assignments;
- choose representations deliberately;
- write consistent pseudocode;
- design with sequence, selection, iteration, and decomposition;
- trace execution;
- explain correctness and termination;
- analyse basic time and auxiliary-space complexity;
- identify boundary cases, invalid inputs, side effects, and failure behaviour;
- translate an algorithm into Python without changing its specification.

If any of these still depends on memorising one example, return to the relevant chapter before continuing.

---

## 17. Transition to Module 02

Module 01 established the language of algorithm design. Module 02 develops the first major control mechanisms in depth:

- iterative loops;
- loop termination conditions;
- recursion;
- construction of correct algorithms;
- primitive and compound data types.

The concepts from Module 01 remain active. Every loop and recursive function will still require a contract, meaningful state, a termination argument, a correctness argument, and a complexity analysis.
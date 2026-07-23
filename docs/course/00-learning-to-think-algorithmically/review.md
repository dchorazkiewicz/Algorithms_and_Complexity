# Module 00 Review

Module 00 introduced the language and habits needed to study the formal syllabus. This review is not a checklist of pages. It is a test of whether you can explain and use the central ideas without relying on memorised code.

## 1. Core vocabulary

You should be able to define and distinguish the following terms.

### Computational problem

A general task describing a class of valid inputs and the required output for each valid input.

### Problem instance

One concrete input belonging to the problem domain.

### Algorithm

A finite and sufficiently precise method that transforms every valid input into the required output.

### Program

An implementation of one or more algorithms in a programming language.

### Execution

One concrete run of a program for a particular input and environment.

### State

The information whose current values matter at a particular point in the computation.

### Expression

A construct evaluated to produce a value.

### Statement

An instruction that changes state or controls execution.

### Side effect

An observable change beyond returning a value, such as modifying input, printing, writing a file, or changing global state.

### Test

An execution for a selected input whose observed behaviour is compared with expected behaviour.

### Counterexample

One valid input that disproves a general claim.

### Correctness

The property that every valid input leads to termination and a result satisfying the specification.

### Termination

The property that the algorithm eventually stops for every valid input.

### Time complexity

The growth of the number of relevant operations as the input size grows.

### Auxiliary-space complexity

The growth of additional memory used by the algorithm, excluding the input under the stated convention.

## 2. Distinctions you must understand

Explain each pair in your own words.

1. computational problem versus problem instance;
2. algorithm versus program;
3. program versus execution;
4. example versus test;
5. test versus proof of correctness;
6. correctness versus efficiency;
7. returned output versus side effect;
8. expression versus statement;
9. Python syntax versus algorithmic idea;
10. recognition versus mastery.

## 3. Reading exercise

Read the function without running it.

```python
def count_changes(values: list[int]) -> int:
    if not values:
        return 0

    changes = 0
    previous = values[0]

    for value in values[1:]:
        if value != previous:
            changes += 1
        previous = value

    return changes
```

Answer:

1. What problem does the function appear to solve?
2. What is the input?
3. What is the output?
4. What does `changes` mean after processing a prefix?
5. What does `previous` mean?
6. Why is empty input handled before reading `values[0]`?
7. What side effects occur?
8. What is the result for `[2, 2, 5, 5, 3]`?
9. Trace `changes` and `previous` for that input.
10. What is the time complexity?
11. What hidden memory cost is introduced by `values[1:]`?
12. How could the implementation avoid that cost?

## 4. Design exercise

Design a function:

> Given a non-empty list of integers, return the index of the first negative value. If no negative value exists, return `None`.

Do not begin with code. Produce:

1. a precise problem statement;
2. input and output definitions;
3. assumptions and failure behaviour;
4. ordinary examples;
5. boundary cases;
6. the state needed during execution;
7. structured natural-language steps;
8. a Python implementation;
9. tests;
10. a correctness argument;
11. a termination argument;
12. time and auxiliary-space complexity.

## 5. Counterexample exercise

For each claim, either justify it or provide a counterexample.

### Claim A

Initialising a minimum to zero works for every non-empty list of integers.

### Claim B

If a program passes ten tests, it is correct for every valid input.

### Claim C

Every function containing one loop has `O(n)` time complexity.

### Claim D

A loop terminates whenever its condition contains a variable that changes.

### Claim E

Two Python functions with different syntax cannot implement the same algorithm.

## 6. Debugging exercise

The following function is intended to return the first index of the greatest value:

```python
def first_index_of_maximum(values: list[int]) -> int:
    best_index = 0

    for index in range(1, len(values)):
        if values[index] >= values[best_index]:
            best_index = index

    return best_index
```

Answer:

1. Which requirement is violated?
2. Give the smallest useful counterexample.
3. Trace the execution.
4. Explain the role of equality.
5. Repair the function.
6. Explain why the repair works.

## 7. Correctness exercise

Consider:

```python
def sum_nonnegative(values: list[int]) -> int:
    total = 0

    for value in values:
        if value >= 0:
            total += value

    return total
```

Complete the reasoning.

### State meaning

After processing the first `k` elements, `total` equals ...

### Initialisation

Before the loop, why is the claim true?

### Preservation

Why does the claim remain true when the current value is non-negative?

Why does it remain true when the current value is negative?

### Completion

Why does the final claim imply the returned result is correct?

### Termination

Why must the loop stop?

## 8. Complexity exercise

Compare:

```python
def squares(values: list[int]) -> list[int]:
    result = []
    for value in values:
        result.append(value * value)
    return result
```

and:

```python
def square_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] = values[index] * values[index]
```

State for each:

- input;
- output;
- side effects;
- time complexity;
- auxiliary-space complexity;
- whether the two interfaces solve exactly the same problem.

## 9. Questions for oral explanation

Answer these aloud without reading your notes.

1. Why is one successful execution not enough to establish correctness?
2. How does a variable's conceptual meaning help prove a loop correct?
3. Why must initialisation be justified?
4. What is a progress measure?
5. Why is Big O not the same as measured execution time?
6. How can a language feature create a hidden cost?
7. Why should a data structure be studied as a representation with invariants rather than as a library class?
8. How does a counterexample support algorithm design?
9. What does it mean to improve a solution based on feedback?
10. How would you communicate a technical failure precisely?

## 10. Readiness checklist

You are ready for Module 01 when you can honestly say:

- [ ] I can distinguish problem, instance, algorithm, program, and execution.
- [ ] I can identify input, output, state, and side effects in a short Python function.
- [ ] I can state the meaning of a counter or accumulator.
- [ ] I can justify an initial value.
- [ ] I can trace a loop manually.
- [ ] I can construct a boundary case and a counterexample.
- [ ] I understand why tests do not replace a correctness argument.
- [ ] I can explain why a simple loop terminates.
- [ ] I define input size before stating complexity.
- [ ] I can distinguish `O(1)` auxiliary space from `O(n)` additional storage.
- [ ] I can diagnose a solution that solves a slightly different problem.
- [ ] I can explain an algorithm without relying on Python syntax.

## 11. Transition to Module 01

Module 00 established the learning method. Module 01 begins the official syllabus sequence and develops the first formal foundations:

- imperative computation;
- preconditions and postconditions;
- forms of algorithm representation;
- properties of algorithms;
- pseudocode;
- sequence, selection, iteration, and decomposition.

Continue with [Module 01 — Foundations of Algorithm Design](../01-foundations-of-algorithm-design/index.md).

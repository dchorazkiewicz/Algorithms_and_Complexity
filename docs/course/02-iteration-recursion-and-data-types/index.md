# Module 02 — Iteration, Recursion, and Data Types

## Why this module matters

The first module established how algorithms are specified, represented, structured, and justified. Module 02 now develops two of the most important mechanisms for expressing repeated computation: **iteration** and **recursion**.

Both mechanisms allow a finite description to process input whose size is not known in advance. A loop can process every element of a list regardless of whether the list contains ten values or ten million. A recursive function can reduce a problem to a smaller instance of the same kind until a simple base case is reached.

The module also introduces the distinction between **primitive** and **compound data types**. Repetition does not operate in a vacuum: every algorithm manipulates values, and the type and structure of those values determine which operations are meaningful, how data is represented, and what costs are incurred.

## Syllabus scope

This module develops the second course-content block:

> Iterative loops and their termination conditions. Recursion. Constructing a correct algorithm. Primitive and compound data types.

The sequence is deliberate. We begin with loops because they make repeated state changes visible. We then study termination because repetition is useful only when it eventually stops. Recursion is introduced as a different way to express repeated structure. The module closes by connecting both control mechanisms to data types and to a disciplined method of constructing correct algorithms.

## What you should be able to do after this module

After completing the module, you should be able to:

1. explain the difference between iteration and recursion;
2. identify the state changed by a loop;
3. distinguish definite iteration from condition-controlled iteration;
4. formulate a loop termination condition;
5. explain why a loop terminates using a decreasing measure;
6. identify and repair infinite loops and off-by-one errors;
7. define a recursive problem using a base case and a recursive case;
8. trace recursive calls and returns;
9. explain why a recursive definition terminates;
10. compare iterative and recursive solutions to the same problem;
11. distinguish primitive from compound data types;
12. explain how data type choices affect algorithm design;
13. construct a simple correct algorithm from specification to implementation;
14. give introductory correctness, termination, time, and space arguments.

## Concept map

```text
repeated computation
        │
        ├── iteration
        │      ├── loop state
        │      ├── initialisation
        │      ├── condition
        │      ├── update
        │      ├── invariant
        │      └── termination measure
        │
        └── recursion
               ├── problem reduction
               ├── base case
               ├── recursive case
               ├── call stack
               └── progress toward the base case

values manipulated by both approaches
        │
        ├── primitive types
        │      ├── integers
        │      ├── real numbers
        │      ├── booleans
        │      └── characters
        │
        └── compound types
               ├── sequences
               ├── records
               ├── tuples
               └── nested structures
```

## Learning path

### 1. Iteration as repeated state transformation

Learn how a loop repeatedly transforms state and how to read the four essential components: initialisation, condition, body, and update.

### 2. `for` loops and definite iteration

Study loops whose number of iterations is determined by a finite sequence or range. Learn indexing, processed prefixes, and common boundary errors.

### 3. `while` loops and condition-controlled iteration

Study loops whose number of repetitions depends on the changing state. Learn how to design conditions and updates that express the intended process.

### 4. Loop termination and correctness

Learn how to justify that a loop stops, how to use a decreasing measure, and how invariants connect the current state to the final result.

### 5. Recursion

Learn how a problem can be defined in terms of smaller instances of itself. Study base cases, recursive cases, progress, and the call stack.

### 6. Iteration versus recursion

Compare equivalent solutions, examine trade-offs, and learn when recursive structure clarifies a problem and when iteration is operationally simpler.

### 7. Primitive and compound data types

Study the categories of values manipulated by algorithms, their operations, their constraints, and their influence on algorithm design.

### 8. Constructing a correct algorithm

Combine specification, examples, state design, invariants, termination, implementation, testing, and complexity into a repeatable workflow.

### 9. Worked examples and review

Apply the complete method to counting, searching, digit processing, Euclid's algorithm, exponentiation, and recursive decomposition.

## Prerequisites

You should already be able to:

- identify input, output, state, and side effects;
- write simple preconditions and postconditions;
- read assignments and conditional statements;
- trace a short imperative program;
- understand sequence and selection;
- read basic Python functions.

## Diagnostic questions

Before beginning, try to answer:

1. What must change during every iteration of a terminating `while` loop?
2. Why can a loop condition be true initially and still guarantee termination?
3. What is the difference between a loop invariant and a termination condition?
4. Why does a recursive function need a base case?
5. What does it mean for a recursive call to make progress?
6. Why can a mathematically valid recursive definition still be a poor implementation?
7. Is a Python `list` a primitive or compound value?
8. How can the same problem be solved both iteratively and recursively?

Return to these questions after completing the module.

## Mastery checklist

You have mastered this module when you can honestly say:

- [ ] I can identify all components of a loop.
- [ ] I can explain what information a loop state represents.
- [ ] I can trace both `for` and `while` loops.
- [ ] I can detect an off-by-one error.
- [ ] I can identify a decreasing termination measure.
- [ ] I can state and use a simple loop invariant.
- [ ] I can define a recursive solution with a base and recursive case.
- [ ] I can trace recursive calls and returns.
- [ ] I can explain why a recursive process terminates.
- [ ] I can compare iterative and recursive complexity.
- [ ] I can distinguish primitive and compound data types.
- [ ] I can construct and justify a small correct algorithm.

!!! note "Study objective"
    Do not stop when a loop or recursive function produces the right answer for one example. The objective is to explain the state, progress, correctness, termination, boundary cases, and cost.
# Imperative Computation

## 1. Why this topic matters

An algorithm is not only a final formula or a block of source code. In the imperative model, it is a controlled sequence of operations that transforms one program state into another.

Understanding that transformation is fundamental because later course topics depend on it:

- a loop repeatedly changes state;
- a recursive call creates a new execution context;
- a sorting algorithm rearranges a data structure through a sequence of updates;
- a graph traversal maintains a set of visited vertices;
- a complexity analysis counts how often relevant operations are executed.

The imperative model therefore provides the operational foundation for the rest of the course.

## 2. Core definitions

### 2.1 Computational problem

A **computational problem** describes a class of inputs and the result required for every valid input.

Example:

> Given two integers, return the greater value.

The problem does not yet specify whether the solution should use a conditional statement, a library function, arithmetic manipulation, or another method.

A complete problem description should identify:

- the input domain;
- the required output;
- relevant constraints;
- invalid cases;
- whether the input may be modified.

### 2.2 Problem instance

A **problem instance** is one concrete input belonging to the problem domain.

For the maximum-of-two problem, the following are different instances:

```text
(8, 3)
(-4, 12)
(5, 5)
```

The algorithm should solve every valid instance, not only one selected example.

### 2.3 Algorithm

An **algorithm** is a finite and sufficiently precise procedure for transforming valid input into the required output.

An algorithm is more general than one program because the same algorithmic idea may be implemented in different programming languages.

### 2.4 Program

A **program** is an implementation of one or more algorithms in a programming language.

A program includes details that are not necessarily part of the abstract algorithm:

- concrete data types;
- syntax;
- library interfaces;
- error-handling mechanisms;
- input and output operations;
- memory-management rules;
- compiler or interpreter behaviour.

### 2.5 Execution

An **execution** is one concrete run of a program for a particular input.

The distinction is:

```text
problem        — what must be solved
algorithm      — the method of solution
program        — an implementation of the method
execution      — one run for one concrete input
```

## 3. The imperative model

### 3.1 Definition

In **imperative computation**, a solution is expressed as a sequence of commands that inspect or modify program state.

The model focuses on two questions:

1. What is the current state?
2. Which command determines the next state?

An imperative computation can be viewed as a sequence of state transitions:

```text
state_0 → state_1 → state_2 → ... → state_final
```

### 3.2 Program state

The **program state** is the collection of values relevant to the computation at a particular moment.

For a simple algorithm, state may consist of variable-value bindings:

```text
first = 8
second = 3
maximum = undefined
```

After executing an assignment, the state changes:

```text
maximum = 8
```

For more advanced algorithms, state may include:

- the contents of an array;
- the current node of a linked list;
- the call stack;
- a queue of pending vertices;
- a set of visited vertices;
- the structure of a tree;
- values stored in files or external systems.

### 3.3 State is an abstraction

The complete physical state of a computer is enormous. Algorithm analysis normally ignores details that are irrelevant to the problem.

For example, when tracing a maximum-finding algorithm, the useful state may be only:

```text
current_index
current_maximum
```

A good trace records enough information to explain the algorithm, but not every machine-level detail.

## 4. Values, variables, and expressions

### 4.1 Value

A **value** is a piece of data, such as:

```text
7
-3
TRUE
"algorithm"
[4, 8, 1]
```

Values may be classified by data type. The detailed distinction between primitive and compound data types is developed in Module 02.

### 4.2 Variable

A **variable** is a named component of program state.

At a conceptual level, a variable associates a name with a current value:

```text
count = 4
```

The value associated with the variable may change during execution.

### 4.3 Expression

An **expression** is evaluated to produce a value.

Examples:

```text
left + right
count + 1
value > maximum
length(values)
```

Expressions do not necessarily modify state. Their evaluation supplies values used by statements.

### 4.4 Statement

A **statement** is an instruction that participates in computation.

Examples include:

- assignment;
- conditional selection;
- loop control;
- function call;
- return;
- input or output;
- explicit failure.

Some statements modify state directly. Others determine which statement executes next.

## 5. Assignment

### 5.1 Meaning of assignment

Assignment evaluates an expression and stores the resulting value in a variable or data-structure component.

Repository pseudocode uses `←`:

```text
maximum ← first
```

This means:

1. read the current value of `first`;
2. store that value as the new value of `maximum`.

### 5.2 Assignment is not mathematical equality

The statement

```text
count ← count + 1
```

is valid imperative pseudocode.

It does not claim that a number equals itself plus one. It means:

1. read the old value of `count`;
2. add one;
3. replace the old stored value with the result.

If `count` was `4`, then the new state contains:

```text
count = 5
```

### 5.3 Assignment as a state transition

Suppose the initial state is:

```text
x = 2
y = 7
```

After:

```text
x ← y + 1
```

we obtain:

```text
x = 8
y = 7
```

The value of `y` was read but not modified.

### 5.4 Destructive update

Assignment usually replaces the previous value associated with a variable.

```text
x ← 10
x ← 20
```

After the second assignment, the current value of `x` is `20`. The previous value `10` is unavailable unless it was copied elsewhere.

This is why swapping two variables requires care.

Incorrect attempt:

```text
a ← b
b ← a
```

For initial state `a = 3`, `b = 9`, the first assignment destroys the original value of `a`. The final state becomes `a = 9`, `b = 9`.

Correct version:

```text
temporary ← a
a ← b
b ← temporary
```

## 6. Sequential composition

A **sequence** executes statements in order.

```text
width ← 5
height ← 4
area ← width * height
RETURN area
```

The order matters because later statements may depend on earlier state changes.

Consider:

```text
x ← 2
y ← x + 1
x ← 10
```

The final state is:

```text
x = 10
y = 3
```

The assignment to `y` used the value of `x` that existed at that moment.

Changing the order changes the result:

```text
x ← 2
x ← 10
y ← x + 1
```

Now the final value of `y` is `11`.

## 7. Control flow

**Control flow** determines the order in which statements are executed.

The basic structured forms are:

1. sequence;
2. selection;
3. iteration;
4. function or procedure call.

This page introduces them as elements of imperative computation. Their systematic use is developed later in this module.

### 7.1 Selection

Selection chooses a path based on a boolean condition.

```text
IF first ≥ second THEN
    maximum ← first
ELSE
    maximum ← second
END IF
```

Only one branch is executed.

### 7.2 Iteration

Iteration repeats a block while a condition holds or for each element in a collection.

```text
total ← 0
FOR EACH value IN values DO
    total ← total + value
END FOR
```

The loop repeatedly changes the state of `total`.

### 7.3 Function and procedure calls

A function call transfers control to another named computation and later returns a result.

```text
maximum ← maximum_of_two(first, second)
```

Decomposition into functions allows a complex algorithm to be built from smaller operations with explicit responsibilities.

## 8. Input, output, and side effects

### 8.1 Input

The **input** is the data supplied to an algorithm.

Input is a logical concept. It does not need to come from a keyboard. It may be supplied through:

- function parameters;
- a file;
- a network message;
- an existing data structure;
- another algorithm.

### 8.2 Output

The **output** is the result produced by the algorithm.

It may be:

- a returned scalar value;
- an index;
- a boolean decision;
- a new data structure;
- a modified input structure;
- an explicitly reported failure.

### 8.3 Side effect

A **side effect** is an observable change beyond returning a value.

Examples:

- modifying an input list;
- changing a global variable;
- printing text;
- writing to a file;
- updating an external service.

Side effects are part of state transformation and must be documented when they affect the algorithm contract.

Detailed analysis of function interaction with external state belongs to Module 05.

## 9. Execution traces

### 9.1 Purpose of a trace

A **manual execution trace** records the important state after each relevant step.

Tracing helps to:

- understand the algorithm;
- verify examples;
- detect incorrect assignments;
- identify missing branches;
- reason about loops;
- discover boundary cases;
- prepare for correctness analysis.

### 9.2 Example: maximum of two values

Pseudocode:

```text
ALGORITHM maximum_of_two(first, second)
    maximum ← first

    IF second > maximum THEN
        maximum ← second
    END IF

    RETURN maximum
END ALGORITHM
```

Trace for `first = 8`, `second = 3`:

| Step | `first` | `second` | `maximum` | Event |
|---:|---:|---:|---:|---|
| Initial | 8 | 3 | undefined | input is available |
| 1 | 8 | 3 | 8 | assign `first` to `maximum` |
| 2 | 8 | 3 | 8 | test `3 > 8`, false |
| 3 | 8 | 3 | 8 | return `maximum` |

Trace for `first = -4`, `second = 12`:

| Step | `first` | `second` | `maximum` | Event |
|---:|---:|---:|---:|---|
| Initial | -4 | 12 | undefined | input is available |
| 1 | -4 | 12 | -4 | initialise `maximum` |
| 2 | -4 | 12 | -4 | test `12 > -4`, true |
| 3 | -4 | 12 | 12 | update `maximum` |
| 4 | -4 | 12 | 12 | return `maximum` |

The two executions follow the same algorithm but take different branches.

### 9.3 Trace granularity

A trace should record state at meaningful steps. Excessively detailed traces become unreadable; traces that omit changed variables fail to explain the algorithm.

For a loop, a useful table normally includes:

- iteration number;
- current element or index;
- relevant state before the body;
- relevant state after the body;
- result of the loop condition.

## 10. Determinism

A deterministic algorithm produces the same observable result and follows the same logical choices whenever it starts from the same relevant state.

Most introductory algorithms in this course are deterministic.

Randomised algorithms, concurrent programs, external input, or unspecified iteration order may produce different executions. Such behaviour must be stated explicitly when introduced.

Determinism does not mean that all valid inputs produce the same output. It means that a fixed input and fixed relevant environment determine the execution.

## 11. Abstraction levels

The same computation can be described at different levels.

### 11.1 Problem-level description

> Return the greater of two values.

### 11.2 Algorithm-level description

```text
IF first ≥ second THEN
    RETURN first
ELSE
    RETURN second
END IF
```

### 11.3 Python implementation

```python
def maximum_of_two(first: int, second: int) -> int:
    if first >= second:
        return first
    return second
```

### 11.4 C++ implementation

```cpp
int maximum_of_two(int first, int second) {
    if (first >= second) {
        return first;
    }
    return second;
}
```

### 11.5 Machine-level execution

The processor executes lower-level instructions generated or interpreted from the source code.

The course primarily reasons at the algorithm and source-code levels. Machine-level details are introduced only when they materially affect memory representation or efficiency.

## 12. Equivalent implementations

Two programs may implement the same algorithm even when their syntax differs.

Python:

```python
def increment(value: int) -> int:
    return value + 1
```

C++:

```cpp
int increment(int value) {
    return value + 1;
}
```

Both implement the same mapping from an integer input to an output one greater than the input.

However, language semantics can matter. Python integers are not bounded like ordinary fixed-width C++ integer types. If overflow is relevant, the implementations may not have identical behaviour over all mathematical integers. A precise contract must define the intended domain.

## 13. A complete introductory example

### 13.1 Problem

Given a finite sequence of integers, calculate its sum.

### 13.2 State design

The algorithm needs:

- the input sequence `values`;
- an accumulator `total`;
- the current element during traversal.

### 13.3 Pseudocode

```text
ALGORITHM sum_sequence(values)
    total ← 0

    FOR EACH value IN values DO
        total ← total + value
    END FOR

    RETURN total
END ALGORITHM
```

### 13.4 Trace

Input:

```text
values = [4, -2, 7, 1]
```

| Iteration | Current `value` | `total` before | `total` after |
|---:|---:|---:|---:|
| Initial | — | — | 0 |
| 1 | 4 | 0 | 4 |
| 2 | -2 | 4 | 2 |
| 3 | 7 | 2 | 9 |
| 4 | 1 | 9 | 10 |

Final result: `10`.

### 13.5 Python

```python
def sum_sequence(values: list[int]) -> int:
    total = 0
    for value in values:
        total = total + value
    return total
```

### 13.6 C++

```cpp
#include <vector>

int sum_sequence(const std::vector<int>& values) {
    int total{0};
    for (const int value : values) {
        total = total + value;
    }
    return total;
}
```

### 13.7 Important observation

The algorithm is not the Python `for` syntax or the C++ range-based `for` syntax. The algorithmic idea is:

1. initialise an accumulator to the additive identity;
2. process every element exactly once;
3. add the current element to the accumulator;
4. return the accumulated sum.

## 14. Relation to correctness

Imperative computation explains how state changes. Correctness asks whether those state changes satisfy the problem specification.

For the sum algorithm, an important claim is:

> After processing the first `k` elements, `total` equals the sum of those `k` elements.

This is a loop invariant. It connects intermediate states with the final required result.

Preconditions, postconditions, invariants, and termination arguments are developed systematically on later pages.

## 15. Relation to complexity

Complexity analysis counts or bounds the resources used by the state-transition process.

For `sum_sequence` with `n` elements:

- the loop body executes `n` times;
- each iteration performs constant-time work under the chosen arithmetic model;
- time complexity is `O(n)`;
- auxiliary space is `O(1)`.

This statement depends on assumptions. For example, arithmetic on arbitrarily large integers may not remain constant time as the numbers grow. Introductory analysis normally states the adopted cost model.

## 16. Common misconceptions and errors

### 16.1 Confusing an algorithm with source code

Python or C++ syntax is one representation of an algorithm, not the algorithm itself.

### 16.2 Confusing assignment with equality

```text
x ← x + 1
```

is a state update, not a mathematical equation.

### 16.3 Ignoring statement order

Imperative statements execute in an order, and changing that order may change the result.

### 16.4 Losing an overwritten value

A value must be preserved before destructive update when it is needed later.

### 16.5 Treating input as keyboard input only

Function parameters and existing structures are also input.

### 16.6 Ignoring side effects

A function that returns the correct value but unexpectedly modifies its input does not satisfy a side-effect-free contract.

### 16.7 Tracing only the final value

A trace should show the intermediate state changes that explain how the result was obtained.

### 16.8 Solving only one instance

Hard-coding a result for one example is not a general algorithm.

## 17. Self-check questions

1. What is the difference between a computational problem and a problem instance?
2. How does an algorithm differ from a program?
3. What does program state contain?
4. Why is assignment not mathematical equality?
5. What is destructive update?
6. Why does the order of imperative statements matter?
7. What is control flow?
8. Which basic control-flow forms appear in structured algorithms?
9. What is the difference between output and a side effect?
10. What information should a useful execution trace contain?
11. Can two different programs implement the same algorithm? Explain.
12. Which assumptions are needed to classify the sum algorithm as `O(n)` time and `O(1)` auxiliary space?

## 18. Problems

### Problem 1 — Trace an assignment sequence

Trace the following program state:

```text
x ← 4
y ← x + 3
x ← y * 2
y ← x - y
```

Record the values of `x` and `y` after each statement.

### Problem 2 — Find the error in a swap

Explain why the following sequence does not correctly swap two values:

```text
left ← right
right ← left
```

Provide a correct imperative version.

### Problem 3 — Identify state

For an algorithm that counts negative values in a sequence, identify:

- input;
- output;
- changing state;
- control flow;
- possible side effects.

### Problem 4 — Rewrite at another abstraction level

Express the problem “return the absolute value of an integer” as:

1. structured natural language;
2. pseudocode;
3. Python;
4. C++.

### Problem 5 — Manual loop trace

Trace the accumulator state for:

```text
values = [3, 1, 4, 1, 5]
```

using `sum_sequence`.

### Problem 6 — Boundary cases

List useful test cases for an algorithm that returns the greater of two integers. Explain what each test checks.

### Problem 7 — Side effects

Compare these two interfaces conceptually:

```text
result ← sorted_copy(values)
```

and

```text
sort_in_place(values)
```

Describe the difference in output and side effects.

## 19. Summary

Imperative computation represents an algorithm as an ordered process that reads and changes state.

The essential ideas are:

- a problem defines what must be solved;
- an algorithm defines a general method;
- a program implements the method;
- an execution applies the program to a concrete input;
- state records the information relevant at a moment of execution;
- expressions produce values;
- statements perform actions or direct control flow;
- assignment updates state and is not equality;
- sequence order matters;
- selection and iteration choose or repeat state transitions;
- input, output, and side effects must be distinguished;
- manual traces expose intermediate states;
- correctness and complexity are analyses of the resulting computation process.

The next topic formalises the expected relationship between the initial and final state using **preconditions and postconditions**.
# Module 01 Theory — Foundations of Algorithm Design

## 1. Module scope

> **Required**
>
> This module covers imperative computation, algorithm preconditions and postconditions, forms of algorithm representation, properties of algorithms, pseudocode, and basic techniques for structuring algorithms.

The purpose of this module is to establish a common method for describing, analysing, and implementing simple algorithms before more advanced data structures and algorithms are introduced.

---

## 2. Problem, algorithm, program, and execution

> **Explanation**

These terms describe different levels of the same software-development process.

### 2.1 Problem

A **problem** describes what must be achieved.

A problem statement should identify:

- the available input;
- the expected output;
- relevant constraints;
- exceptional or invalid cases.

Example problem:

> Given two integers, return the greater value.

The problem states the required result, but it does not yet prescribe the exact sequence of operations.

### 2.2 Algorithm

An **algorithm** is a finite, unambiguous sequence of operations that transforms valid input into the required output.

The same algorithmic idea may be written in different forms:

- structured natural language;
- pseudocode;
- Python;
- C++;
- another programming language.

The programming language may change while the algorithm remains conceptually the same.

### 2.3 Program

A **program** is an implementation of one or more algorithms in a programming language.

A program also includes language-specific and environment-specific concerns, such as:

- types;
- functions;
- libraries;
- input and output;
- exceptions or error codes;
- memory management;
- compilation or interpretation.

### 2.4 Execution

An **execution** is one concrete run of a program for particular input values.

For example, a maximum-finding program may be executed with:

```text
first = 8
second = 3
```

A different execution may use:

```text
first = -4
second = 12
```

The algorithm is the same, but the program state and the produced result differ.

### 2.5 Relationship

```text
problem
   ↓
algorithmic idea
   ↓
algorithm representation
   ↓
program implementation
   ↓
execution for concrete input
```

---

## 3. Imperative computation

> **Required**

In the imperative model, an algorithm is described as a sequence of commands that read or modify program state.

### 3.1 Program state

The **state** of a computation is the collection of values relevant at a particular moment.

For a simple algorithm, the state may contain variables such as:

```text
first = 8
second = 3
maximum = undefined
```

After an assignment, the state changes:

```text
maximum = 8
```

An imperative algorithm can therefore be understood as a sequence of state transitions.

### 3.2 Assignment

Assignment stores a new value in a variable.

Repository pseudocode uses the symbol `←`:

```text
maximum ← first
```

This should be read as:

> Evaluate the expression on the right and store the result in the variable on the left.

Assignment is not a mathematical equality. The following operation is valid in an imperative algorithm:

```text
counter ← counter + 1
```

It means that the new value of `counter` is one greater than its previous value.

### 3.3 State trace

> **Example**

Consider the following commands:

```text
first ← 8
second ← 3
maximum ← first
IF second > maximum THEN
    maximum ← second
END IF
```

The state changes as follows:

| Step | `first` | `second` | `maximum` |
|---:|---:|---:|---:|
| Initial | undefined | undefined | undefined |
| `first ← 8` | 8 | undefined | undefined |
| `second ← 3` | 8 | 3 | undefined |
| `maximum ← first` | 8 | 3 | 8 |
| Evaluate `second > maximum` | 8 | 3 | 8 |
| Condition is false | 8 | 3 | 8 |

The final result is `8`.

---

## 4. Input and output

> **Explanation**

### 4.1 Input

The **input** consists of values supplied to the algorithm.

Examples include:

- two integers;
- a sequence of values;
- a searched key;
- a graph;
- the root of a tree.

Input should be described independently of interactive console input. A function parameter is input even when the program never asks the user to type anything.

### 4.2 Output

The **output** is the information produced by the algorithm.

Output may be:

- a returned value;
- a modified data structure;
- a boolean decision;
- an index;
- a collection of results;
- an explicitly reported failure.

### 4.3 Side effects

A **side effect** is an observable change outside the returned result, for example:

- modifying an input list;
- changing global state;
- writing to a file;
- printing to the console.

This module records side effects in the algorithm contract. Their detailed analysis belongs primarily to Module 05.

---

## 5. Algorithm contracts

> **Required**

An algorithm contract defines the conditions under which an algorithm may be used and what it guarantees.

Each major algorithm in this repository uses the following structure:

```text
Input:
Output:
Preconditions:
Postconditions:
Side effects:
Failure behavior:
```

### 5.1 Preconditions

A **precondition** is a condition that must hold before the algorithm begins.

Examples:

- the sequence is sorted;
- the divisor is not zero;
- the index is within valid bounds;
- the graph representation is internally consistent;
- the input collection is not empty.

The caller is responsible for satisfying the precondition unless the algorithm explicitly validates it.

### 5.2 Postconditions

A **postcondition** describes what must be true after the algorithm finishes successfully.

Examples:

- the returned value is the greatest input value;
- the returned index identifies the searched value;
- the output sequence contains the same elements in sorted order;
- every reachable graph vertex has been visited.

A postcondition describes the required result, not the exact implementation.

### 5.3 Example contract

> **Example**

```text
Algorithm: maximum_of_two

Input:
    Two integers: first and second.

Output:
    One integer.

Preconditions:
    first and second are valid integers.

Postconditions:
    The returned value is greater than or equal to first.
    The returned value is greater than or equal to second.
    The returned value is equal to first or second.

Side effects:
    None.

Failure behavior:
    Invalid non-integer input is rejected by the surrounding program.
```

The contract remains valid regardless of whether the implementation uses Python, C++, pseudocode, or another language.

### 5.4 Preconditions are not implementation steps

The statement:

```text
Precondition: values is sorted
```

does not mean that the algorithm sorts `values`. It means that sorted order must already hold before the algorithm starts.

### 5.5 Postconditions are stronger than examples

An example such as:

```text
maximum_of_two(8, 3) = 8
```

shows only one execution. A postcondition describes every valid execution.

---

## 6. Forms of algorithm representation

> **Required**

The same solution can be represented at several levels of precision.

### 6.1 Structured natural language

```text
Compare the two input values.
Return the first value when it is not smaller than the second value.
Otherwise return the second value.
```

Advantages:

- accessible to beginners;
- useful during initial reasoning;
- independent of a programming language.

Limitations:

- may be ambiguous;
- may omit edge cases;
- may hide control flow.

### 6.2 Pseudocode

```text
ALGORITHM maximum_of_two(first, second)
    IF first >= second THEN
        RETURN first
    ELSE
        RETURN second
    END IF
END ALGORITHM
```

Advantages:

- explicit control flow;
- independent of a particular language;
- suitable for manual tracing and analysis;
- close enough to code for later implementation.

Limitations:

- requires agreed conventions;
- is not normally executable;
- may still omit language-level concerns.

The repository-wide pseudocode rules are defined in `shared/pseudocode_conventions.md`.

### 6.3 Source code

Python and C++ implementations add language-specific syntax and type behavior.

Source code must still implement the same contract as the pseudocode.

### 6.4 Choosing a representation

Use:

- natural language to explain the intent;
- a contract to specify valid input and guaranteed output;
- pseudocode to expose the algorithmic structure;
- source code to produce an executable implementation;
- a manual trace to demonstrate one concrete execution.

These forms complement one another. None of them alone replaces all the others.

---

## 7. Properties of algorithms

> **Required**

The syllabus requires understanding the properties of algorithms. In this course, the following properties are used when evaluating a solution.

### 7.1 Defined input

The algorithm identifies the data it requires.

The input domain should be clear enough to determine which values are valid.

### 7.2 Defined output

The algorithm identifies the result it produces.

The output must be related to the problem statement and described by the postcondition.

### 7.3 Definiteness

Every operation must be sufficiently precise to determine what happens next.

Ambiguous instruction:

```text
Process the values appropriately.
```

More definite instruction:

```text
Add every value greater than zero to the running total.
```

### 7.4 Finiteness

The algorithm must terminate after a finite number of steps for every input satisfying its preconditions.

A loop without a valid stop condition is not a complete correct algorithm.

### 7.5 Effectiveness

Each operation must be executable using the assumed computational model.

An instruction such as “immediately choose the globally optimal solution” is not effective unless a concrete method for making that choice is given.

### 7.6 Correctness

For every input satisfying the precondition, the algorithm must terminate and produce a result satisfying the postcondition.

Correctness has two parts:

1. **partial correctness** — when the algorithm terminates, the result is correct;
2. **termination** — the algorithm eventually finishes.

A full proof is not required for every introductory example, but the reasoning must identify why the produced result satisfies the contract.

### 7.7 Generality

An algorithm should solve a class of valid inputs, not only one example.

This code fragment:

```text
RETURN 8
```

solves the example `maximum_of_two(8, 3)` but not the general problem.

### 7.8 Efficiency

Two correct algorithms may require different amounts of time or memory.

Efficiency does not replace correctness. The initial priority is:

1. define the problem;
2. design a correct algorithm;
3. test the algorithm;
4. analyse its resource use;
5. improve it when necessary.

---

## 8. Basic structuring techniques

> **Required**

Structured algorithms are built from a small number of control patterns.

### 8.1 Sequence

A **sequence** executes operations in order.

```text
width ← 5
height ← 4
area ← width * height
RETURN area
```

The later operation may depend on values produced by earlier operations.

### 8.2 Selection

A **selection** chooses one execution path based on a condition.

```text
IF temperature < 0 THEN
    RETURN "freezing"
ELSE
    RETURN "not freezing"
END IF
```

The condition must evaluate to a boolean value.

### 8.3 Iteration

An **iteration** repeats operations while a condition holds or for each value in a finite collection.

```text
sum ← 0
FOR EACH value IN values DO
    sum ← sum + value
END FOR
RETURN sum
```

Detailed loop construction, invariants, and termination conditions are developed in Module 02.

### 8.4 Decomposition

**Decomposition** divides a larger solution into smaller named operations or functions.

Instead of writing one long block:

```text
validate input
calculate result
format result
report result
```

we can separate responsibilities:

```text
validated_data ← validate(raw_data)
result ← calculate(validated_data)
RETURN format_result(result)
```

Decomposition improves:

- readability;
- testability;
- reuse;
- local reasoning;
- communication about errors.

### 8.5 Composition

A practical algorithm often combines all four techniques:

- a sequence establishes initial state;
- a selection handles alternatives;
- an iteration processes multiple values;
- decomposition separates responsibilities.

---

## 9. Edge cases and invalid input

> **Explanation**

An **edge case** is a valid input near a structural boundary of the problem.

Examples:

- an empty sequence;
- a sequence with one value;
- equal input values;
- negative values;
- the smallest valid index;
- the largest valid index.

An **invalid input** violates the contract.

Examples:

- an out-of-range index;
- division by zero;
- an unsorted sequence supplied to an algorithm that requires sorted input;
- a missing tree root when a non-empty tree is required.

### 9.1 Edge case versus invalid case

An empty sequence may be:

- a valid edge case for a summation algorithm, with result `0`;
- an invalid case for a minimum-finding algorithm unless failure behavior is defined.

The distinction comes from the contract, not from the data alone.

### 9.2 Failure behavior

When invalid input is possible, the material must state what happens.

Possible policies include:

- reject the input with an exception;
- return a sentinel value;
- return an optional result;
- require the caller to satisfy the precondition and perform no validation.

Paired Python and C++ examples should use equivalent policies whenever practical.

---

## 10. Introductory correctness reasoning

> **Explanation**

Correctness reasoning connects the algorithm to its contract.

For a simple selection algorithm, reasoning can be performed by cases.

### 10.1 Example: maximum of two values

```text
IF first >= second THEN
    RETURN first
ELSE
    RETURN second
END IF
```

Case 1:

```text
first >= second
```

The algorithm returns `first`. Therefore the result is equal to one input and is not smaller than the other input.

Case 2:

```text
first < second
```

The algorithm returns `second`. Therefore the result is equal to one input and is greater than the other input.

In both cases, the result satisfies the postcondition.

### 10.2 Testing is not proof

Tests can reveal errors, but a finite test set cannot normally establish correctness for every possible input.

Both are needed:

- reasoning explains why the algorithm should work generally;
- tests verify representative executions and implementation details.

---

## 11. Introductory resource analysis

> **Explanation**

Detailed complexity analysis is developed in Module 10. From the beginning, however, every algorithm should identify its basic resource behavior.

### 11.1 Constant work

The `maximum_of_two` algorithm performs one comparison and one return decision regardless of the numeric values.

Its running time is described as:

```text
O(1)
```

It uses a constant amount of auxiliary storage:

```text
O(1)
```

### 11.2 Input-dependent work

An algorithm that examines every element of a sequence of length `n` performs work proportional to `n`:

```text
O(n)
```

At this stage, students should identify:

- the input-size variable;
- the repeated operation;
- whether the number of repetitions grows with input size;
- any additional storage created by the algorithm.

The repository-wide analysis rules are defined in `shared/complexity_reference.md`.

---

## 12. A complete introductory specification

> **Example**

### Problem

Given a finite sequence of integers, count how many values are positive.

### Contract

```text
Algorithm: count_positive

Input:
    A finite sequence values of integers.

Output:
    A non-negative integer.

Preconditions:
    values is a valid finite sequence.

Postconditions:
    The returned value equals the number of elements in values that are greater than zero.

Side effects:
    None.

Failure behavior:
    Invalid non-sequence input is rejected by the surrounding program.
```

### Pseudocode

```text
ALGORITHM count_positive(values)
    count ← 0

    FOR EACH value IN values DO
        IF value > 0 THEN
            count ← count + 1
        END IF
    END FOR

    RETURN count
END ALGORITHM
```

### Structural analysis

- sequence: initialise `count`, process values, return result;
- iteration: visit every element;
- selection: increment only for positive values;
- state: `count` stores the number found so far.

### Edge cases

| Input | Expected result | Reason |
|---|---:|---|
| `[]` | `0` | No values are positive. |
| `[0]` | `0` | Zero is not greater than zero. |
| `[4]` | `1` | The only value is positive. |
| `[-2, 0, 3, 8]` | `2` | Exactly `3` and `8` are positive. |
| `[-5, -1]` | `0` | No value is positive. |

### Correctness idea

After processing any prefix of the sequence, `count` equals the number of positive values in that processed prefix.

When the entire sequence has been processed, the processed prefix is the complete sequence. Therefore `count` satisfies the postcondition.

This statement is an introductory form of a loop invariant. Loop invariants are developed further in Module 02.

### Complexity

For a sequence of length `n`:

- every value is inspected once;
- time complexity is `O(n)`;
- auxiliary space complexity is `O(1)`.

---

## 13. Common mistakes

> **Explanation**

### 13.1 Describing examples instead of the general problem

Incorrect approach:

```text
For input 8 and 3, return 8.
```

Correct approach:

```text
For any two valid integers, return a value satisfying the maximum postcondition.
```

### 13.2 Treating assignment as equality

```text
counter ← counter + 1
```

is a state update, not a mathematical equation.

### 13.3 Omitting preconditions

Binary search without a sorted-input precondition is underspecified.

### 13.4 Writing a postcondition that repeats the implementation

Weak postcondition:

```text
The algorithm returns the value selected by the IF statement.
```

Useful postcondition:

```text
The returned value is the maximum of the two inputs.
```

### 13.5 Hiding failure behavior

If an algorithm cannot process an empty sequence, the contract must state whether emptiness is forbidden or how failure is reported.

### 13.6 Mixing algorithm logic with user interaction

Core algorithm:

```text
result ← maximum_of_two(first, second)
```

User interaction belongs in a separate layer that reads, parses, validates, and displays data.

### 13.7 Optimising before establishing correctness

A faster incorrect algorithm does not solve the problem.

---

## 14. Python and C++ considerations

> **Explanation**

The algorithm contract is shared, but implementations differ in language-level details.

### Python

- values have runtime types;
- type hints document intended use but are not normally enforced by the interpreter;
- integers have arbitrary precision for practical course purposes;
- exceptions are commonly used for invalid operations;
- mutable objects may be shared through references.

### C++

- variable and parameter types are part of the compiled program;
- integer types have fixed implementation-defined ranges;
- parameters may be copied or passed by reference;
- `const` expresses non-modification intent;
- ownership and object lifetime must be considered explicitly in later data-structure modules.

### Shared rule

Paired examples must preserve:

- the same input domain;
- the same postcondition;
- equivalent failure behavior;
- equivalent test cases;
- the same algorithmic idea.

They do not need to have identical syntax or line-by-line structure.

---

## 15. Summary

> **Required**

After this module, the student should understand that:

- a problem states what must be achieved;
- an algorithm defines a finite and unambiguous method;
- a program implements the method in a language;
- an execution applies the program to concrete input;
- imperative computation changes program state through commands;
- input, output, preconditions, postconditions, side effects, and failure behavior form an algorithm contract;
- natural language, pseudocode, and code are complementary representations;
- sequence, selection, iteration, and decomposition are basic structuring techniques;
- correctness requires both a valid result and termination;
- edge cases and invalid cases must be distinguished by the contract;
- simple resource analysis should accompany every algorithm.

---

## 16. Review status

- [x] First complete theory draft created.
- [ ] Terminology review completed.
- [ ] Examples reviewed for consistency with repository pseudocode conventions.
- [ ] Instructor review completed.
- [ ] Theory approved for student use.

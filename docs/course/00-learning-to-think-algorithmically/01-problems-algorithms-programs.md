# Problems, Algorithms, Programs, and Executions

## 1. A simple situation

Suppose you are given a sequence of daily temperatures:

```text
[17, 21, 19, 24, 22]
```

You are asked to report the highest temperature.

At first this seems trivial. A person can look at the values and answer `24`. But the course is not interested only in this one list. It is interested in the general task:

> Given any finite non-empty sequence of comparable temperature values, return the greatest value in the sequence.

That sentence already contains several important ideas:

- there is an **input**: a finite sequence of values;
- the input must be **non-empty**;
- the values must be **comparable**;
- there is a required **output**: the greatest input value;
- the method must work for every valid sequence, not only for the example above.

This difference between one example and a general task is the first important distinction in algorithmic thinking.

## 2. Computational problem

A **computational problem** describes a class of valid inputs and the output required for each valid input.

A useful problem statement should answer four questions:

1. What data is supplied?
2. Which supplied data is valid?
3. What result must be produced?
4. Are there any constraints on how the result is produced or on whether the input may be modified?

For the maximum-temperature problem:

```text
Input:
    A finite non-empty sequence of comparable values.

Output:
    The greatest value in the sequence.
```

This is still not an algorithm. It tells us what must be achieved, not how to achieve it.

### A problem is not one example

The following are three different valid inputs:

```text
[17, 21, 19, 24, 22]
[-5, -2, -11]
[8]
```

The required outputs are:

```text
24
-2
8
```

A solution that works only for the first sequence does not solve the computational problem.

## 3. Problem instance

A **problem instance** is one concrete input belonging to the problem domain.

For the maximum-temperature problem:

```text
[17, 21, 19, 24, 22]
```

is one instance, while:

```text
[-5, -2, -11]
```

is another.

The distinction matters because examples and tests operate on instances, while correctness concerns the entire problem class.

A test can show that a program produces the right answer for one instance. It cannot by itself prove that the program is correct for every valid instance.

## 4. Algorithm

An **algorithm** is a finite and sufficiently precise method that transforms every valid input into the required output.

For the maximum-temperature problem, one algorithm is:

1. Treat the first value as the largest value seen so far.
2. Examine every remaining value from left to right.
3. Whenever the current value is greater than the largest value seen so far, replace the stored largest value.
4. After all values have been examined, return the stored value.

This description is general. It does not mention one particular sequence and does not depend on Python syntax.

### Why the first element is important

A common incorrect idea is to initialise the maximum to zero:

```python
def maximum_temperature(values: list[int]) -> int:
    maximum = 0
    for value in values:
        if value > maximum:
            maximum = value
    return maximum
```

This works for:

```text
[17, 21, 19, 24, 22]
```

but fails for:

```text
[-5, -2, -11]
```

It returns `0`, even though `0` is not an input value and the correct answer is `-2`.

The mistake is not a Python syntax error. It is an algorithm-design error. The initial state does not represent a valid fact about the input.

A better algorithm starts with the first input value:

```python
def maximum_temperature(values: list[int]) -> int:
    maximum = values[0]

    for value in values[1:]:
        if value > maximum:
            maximum = value

    return maximum
```

Now the stored `maximum` is always a value that actually appeared in the input.

## 5. Program

A **program** is an implementation of one or more algorithms in a programming language.

The Python function above is a program fragment implementing the maximum-finding algorithm.

The program contains details that belong to Python rather than to the abstract algorithm:

- `def` introduces a function;
- `list[int]` is a type annotation;
- `values[0]` reads the first list element;
- `values[1:]` creates a slice containing the remaining elements;
- indentation defines the bodies of the loop and conditional;
- `return` produces the function result.

The underlying algorithmic idea is not identical to those details. Another language could implement the same method differently.

### A program may hide extra costs

The Python expression:

```python
values[1:]
```

normally creates a new list. This means the implementation uses additional time and memory that are not necessary for the abstract maximum-finding algorithm.

A version that avoids copying is:

```python
def maximum_temperature(values: list[int]) -> int:
    maximum = values[0]

    for index in range(1, len(values)):
        if values[index] > maximum:
            maximum = values[index]

    return maximum
```

Both functions implement the same high-level algorithm. Their implementation details are not identical.

This illustrates a principle that will recur throughout the course:

> The algorithmic idea and the cost of a concrete implementation must be related, but they must not be confused.

## 6. Execution

An **execution** is one concrete run of a program for one concrete input.

Consider:

```python
result = maximum_temperature([17, 21, 19, 24, 22])
```

During this execution, the important state changes as follows:

| Step | Current value | `maximum` before | `maximum` after |
|---:|---:|---:|---:|
| Initialisation | 17 | — | 17 |
| 1 | 21 | 17 | 21 |
| 2 | 19 | 21 | 21 |
| 3 | 24 | 21 | 24 |
| 4 | 22 | 24 | 24 |

The output is `24`.

For another execution:

```python
result = maximum_temperature([-5, -2, -11])
```

we obtain:

| Step | Current value | `maximum` before | `maximum` after |
|---:|---:|---:|---:|
| Initialisation | -5 | — | -5 |
| 1 | -2 | -5 | -2 |
| 2 | -11 | -2 | -2 |

The output is `-2`.

The program is the same. The input instance and state history are different.

## 7. The four levels together

The distinction can be summarised as follows:

```text
computational problem
    Find the greatest value in any valid non-empty sequence.

problem instance
    [17, 21, 19, 24, 22]

algorithm
    Keep the greatest value seen so far while scanning the sequence.

program
    A Python function implementing that method.

execution
    One run of the Python function for one concrete sequence.
```

These levels answer different questions:

| Level | Main question |
|---|---|
| Problem | What must be computed? |
| Instance | Which concrete input are we considering? |
| Algorithm | What general method computes the result? |
| Program | How is the method expressed in a language? |
| Execution | What happens for this particular input? |

## 8. Correctness is a statement about all valid inputs

A program is not correct merely because it works for several examples.

For the maximum-finding algorithm, the central reasoning is:

> After processing any prefix of the sequence, `maximum` stores the greatest value in that prefix.

This claim is initially true because the first processed prefix contains only `values[0]`, and `maximum` is set to that value.

When the next value is processed:

- if it is greater than `maximum`, replacing `maximum` makes the claim true for the larger prefix;
- otherwise the existing `maximum` remains the greatest value in the larger prefix.

When the loop ends, the processed prefix is the entire sequence. Therefore `maximum` is the greatest value in the whole input.

This is an informal correctness argument. Later modules will introduce preconditions, postconditions, invariants, and termination arguments more systematically.

## 9. Efficiency is a different question

Correctness asks whether the required result is produced.

Efficiency asks how many resources are used.

For a sequence of length `n`, the algorithm examines each element once. Its running time grows linearly with `n`, so we describe the time complexity as:

```text
O(n)
```

The index-based Python implementation stores only a small fixed number of additional values, so its auxiliary-space complexity is:

```text
O(1)
```

The slicing implementation still has `O(n)` time, but the slice introduces `O(n)` additional memory.

A correct algorithm may have an inefficient implementation. An efficient implementation may still be incorrect. Both questions must be answered.

## 10. What you must be able to explain

After reading this chapter, you should be able to explain without looking back:

1. why a computational problem is not the same as a problem instance;
2. why an algorithm is not the same as Python code;
3. why one program may have many executions;
4. why testing several inputs is not a proof of correctness;
5. why initialising a maximum to zero is wrong for unrestricted integer input;
6. why `values[1:]` changes the memory cost of the Python implementation;
7. why scanning every element gives linear time complexity.

## 11. Short practice

### Exercise 1

For the task “count the negative numbers in a finite sequence”, write:

- the computational problem;
- two different problem instances;
- an algorithm in structured natural language;
- a Python function;
- one execution trace.

### Exercise 2

Explain why the following function does not solve the general maximum problem:

```python
def maximum_value(values: list[int]) -> int:
    return 24
```

### Exercise 3

Give an input for which this implementation fails:

```python
def minimum_value(values: list[int]) -> int:
    minimum = 0
    for value in values:
        if value < minimum:
            minimum = value
    return minimum
```

Then explain the design error, not only the incorrect output.

## 12. Summary

A computational problem describes a class of valid inputs and required outputs. A problem instance is one concrete input. An algorithm is a general method. A program implements the method in a language. An execution is one run of the program.

This vocabulary is not decorative. It prevents several common mistakes:

- treating one successful example as proof;
- confusing syntax with the algorithmic idea;
- designing an initial state that is invalid for part of the input domain;
- ignoring language-specific operation costs;
- discussing efficiency before establishing correctness.

The next chapter uses this distinction to show how a short Python function can be read as a sequence of state changes rather than as a collection of keywords.

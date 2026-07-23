# Designing a Solution Step by Step

## 1. Programming should not be the first step

When students receive a programming task, many immediately begin typing. That can work for very small exercises, but it becomes unreliable as soon as the problem contains non-trivial assumptions, boundary cases, or data-structure choices.

A better process separates understanding from implementation.

This chapter develops a repeatable method:

1. restate the problem precisely;
2. identify the input and required output;
3. list assumptions and invalid cases;
4. construct small examples and boundary cases;
5. decide what information must be remembered during execution;
6. describe the algorithm in words;
7. write a clear Python implementation;
8. trace and test the implementation;
9. explain correctness and estimate cost;
10. revise the solution when weaknesses are discovered.

We will use one problem throughout.

## 2. The problem

> Given a non-empty list of integers, return the index of the first occurrence of the greatest value.

Examples:

```text
[4, 9, 2, 9, 5]  →  1
[-3, -7, -1]      →  2
[8]                →  0
```

The phrase **first occurrence** matters. In the first list, the greatest value `9` appears at indices `1` and `3`, but the required result is `1`.

## 3. Step 1 — Restate the task

A useful restatement is:

> Scan the list, keep the best value found so far and the index where it first appeared, and return that index after the scan finishes.

This restatement begins to suggest an algorithm, but it still leaves questions open:

- Is the list allowed to be empty?
- Are indices zero-based?
- What happens when the maximum appears several times?
- May the list be modified?

Good design begins by answering those questions explicitly.

## 4. Step 2 — Define input and output

```text
Input:
    A non-empty list of integers named values.

Output:
    An integer index.

Indexing convention:
    Zero-based indexing.

Required result:
    The smallest index i such that values[i] is greater than or equal to every element of values.

Side effects:
    The input list is not modified.
```

This description is already more precise than the original sentence.

## 5. Step 3 — Identify assumptions and invalid cases

The main assumption is:

```text
len(values) > 0
```

Without this assumption, there is no greatest element and no valid index.

We have two possible interface designs:

1. document non-emptiness as a precondition and assume the caller obeys it;
2. validate the input and raise an exception when the list is empty.

For an introductory Python implementation, explicit validation is helpful:

```python
if not values:
    raise ValueError("values must not be empty")
```

The detailed theory of preconditions, postconditions, and failure behaviour belongs to Module 01. Here we simply establish the habit of making the decision visible.

## 6. Step 4 — Build examples before coding

Examples reveal requirements that prose may hide.

### Ordinary case

```text
[4, 9, 2, 7] → 1
```

### Maximum repeated

```text
[4, 9, 2, 9] → 1
```

This checks the word “first”.

### All values equal

```text
[5, 5, 5] → 0
```

### One element

```text
[8] → 0
```

### All values negative

```text
[-3, -7, -1] → 2
```

### Invalid case

```text
[] → error
```

These examples should exist before implementation because they influence the design.

## 7. Step 5 — Decide what state is needed

While scanning the list, the algorithm must remember:

- the index of the best value seen so far;
- the best value itself, or enough information to retrieve it;
- the current index.

We can store only the best index and use it to access the best value:

```text
best_index = index of the first maximum among processed elements
```

Initially, only the first element has been processed, so:

```text
best_index = 0
```

This initial state is valid because the first element is trivially the maximum of the one-element prefix.

## 8. Step 6 — Describe the algorithm in words

1. Reject an empty list.
2. Set `best_index` to `0`.
3. Examine each index from `1` to the final index.
4. If the current value is strictly greater than the value at `best_index`, replace `best_index` with the current index.
5. Return `best_index`.

The comparison must be strict:

```text
current value > best value
```

not:

```text
current value >= best value
```

Using `>=` would replace the earlier index when an equal maximum appears later, producing the last occurrence instead of the first.

## 9. Step 7 — Implement in Python

```python
def first_index_of_maximum(values: list[int]) -> int:
    """Return the index of the first greatest value in a non-empty list."""
    if not values:
        raise ValueError("values must not be empty")

    best_index = 0

    for index in range(1, len(values)):
        if values[index] > values[best_index]:
            best_index = index

    return best_index
```

The implementation follows the design directly:

- validation handles the invalid domain;
- `best_index = 0` establishes the initial fact;
- the loop processes every remaining element;
- the strict comparison preserves the first occurrence;
- the return statement produces the required index.

## 10. Step 8 — Trace the algorithm

Input:

```text
values = [4, 9, 2, 9, 5]
```

| Index | Current value | Best index before | Best value before | Update? | Best index after |
|---:|---:|---:|---:|:---:|---:|
| Initial | 4 | — | — | initialise | 0 |
| 1 | 9 | 0 | 4 | Yes | 1 |
| 2 | 2 | 1 | 9 | No | 1 |
| 3 | 9 | 1 | 9 | No, values are equal | 1 |
| 4 | 5 | 1 | 9 | No | 1 |

The function returns `1`.

The trace explains the effect of the strict comparison at index `3`.

## 11. Step 9 — Test deliberately

```python
def _test_first_index_of_maximum() -> None:
    assert first_index_of_maximum([4, 9, 2, 7]) == 1
    assert first_index_of_maximum([4, 9, 2, 9]) == 1
    assert first_index_of_maximum([5, 5, 5]) == 0
    assert first_index_of_maximum([8]) == 0
    assert first_index_of_maximum([-3, -7, -1]) == 2

    try:
        first_index_of_maximum([])
    except ValueError:
        pass
    else:
        raise AssertionError("empty input should be rejected")
```

These tests were selected from the examples and boundary cases identified before implementation.

A large number of random tests may be useful later, but thoughtful tests are more valuable than many redundant tests.

## 12. Step 10 — Explain correctness

A concise correctness argument uses the meaning of `best_index`:

> Before each loop iteration, `best_index` is the index of the first greatest value among all elements processed so far.

### Initialisation

Before the loop, only `values[0]` is considered processed. Index `0` is therefore the first greatest index of that one-element prefix.

### Preservation

Suppose the claim is true before processing `values[index]`.

- If `values[index]` is strictly greater than the previous best value, the current index becomes the unique first index of the new greatest value.
- If it is smaller, the previous best remains correct.
- If it is equal, keeping the previous index preserves the first occurrence.

Therefore the claim remains true after the iteration.

### Completion

When the loop ends, every element has been processed. The claim therefore applies to the entire list, so the returned index is correct.

## 13. Explain termination

The loop iterates over:

```python
range(1, len(values))
```

For a finite list, this range contains a finite number of indices. Each iteration consumes one index, and no index is revisited. Therefore the loop terminates.

This may seem obvious, but termination must become an explicit part of reasoning before we study more complicated loops and recursion.

## 14. Estimate complexity

Let:

```text
n = len(values)
```

The loop examines `n - 1` elements. Each iteration performs constant-time indexing and comparison under the introductory model.

Therefore:

```text
Time complexity: O(n)
Auxiliary space: O(1)
```

The input list is not copied or modified.

## 15. Diagnose a plausible wrong solution

Consider:

```python
def first_index_of_maximum(values: list[int]) -> int:
    best_index = 0

    for index in range(1, len(values)):
        if values[index] >= values[best_index]:
            best_index = index

    return best_index
```

For:

```text
[4, 9, 2, 9]
```

this function returns `3`.

The algorithm does find an index containing a maximum, but it violates the stronger requirement that the first maximum be returned.

This example illustrates an important lesson:

> A solution can be correct for a similar problem and still be incorrect for the stated problem.

The difference may be one symbol, but the underlying specification is different.

## 16. A reusable design template

For small algorithmic problems, use the following template.

### Problem

What must be computed?

### Input

What data is supplied, and what values are valid?

### Output

What exact result must be returned or produced?

### Examples

What ordinary and boundary cases reveal the intended behaviour?

### State

What information must be remembered while processing the input?

### Initialisation

What initial values make the intended state meanings true?

### Update

How does each step extend the processed part of the input while preserving those meanings?

### Completion

Why does the final state imply the required output?

### Termination

Why can the process not continue forever?

### Complexity

How many times are the important operations executed, and how much additional memory is used?

This template is an introductory form of the more formal design methods developed later in the course.

## 17. What you must be able to explain

After this chapter, you should be able to:

- delay coding until the task and boundary cases are clear;
- turn an informal statement into explicit input and output requirements;
- choose state variables with precise meanings;
- justify an initial value;
- explain why a comparison uses `>` rather than `>=`;
- build tests from requirements;
- give an informal correctness and termination argument;
- estimate linear time and constant auxiliary space;
- diagnose an implementation that solves a slightly different problem.

## 18. Practice

### Exercise 1 — First minimum

Design a function that returns the index of the first smallest value in a non-empty list.

Follow all ten design steps. Do not begin with code.

### Exercise 2 — Last maximum

Modify the problem so that the last occurrence of the maximum is required. Explain exactly which comparison changes and why.

### Exercise 3 — Count the maximum

Design a function that returns how many times the greatest value occurs. Identify the additional state that is needed when a new maximum is discovered.

### Exercise 4 — Improve a broken design

A student proposes:

```python
def index_of_maximum(values: list[int]) -> int:
    maximum = 0
    maximum_index = 0

    for index, value in enumerate(values):
        if value > maximum:
            maximum = value
            maximum_index = index

    return maximum_index
```

Find an input that exposes the error, explain why the initial state is invalid, and repair the solution.

## 19. Summary

Designing an algorithm is a sequence of decisions, not an act of immediate coding.

A disciplined solution process:

- clarifies the general problem;
- states the input and output;
- exposes assumptions and invalid cases;
- uses examples to reveal hidden requirements;
- gives every state variable a meaning;
- chooses initial values that make those meanings true;
- preserves the meanings during updates;
- validates the result through tracing and tests;
- explains correctness and termination;
- estimates cost;
- revises the solution when a counterexample appears.

The next chapter asks what kind of evidence supports the claim that an algorithm really works.

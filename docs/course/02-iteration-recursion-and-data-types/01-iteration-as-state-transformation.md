# Iteration as Repeated State Transformation

## Why repetition needs a model

Many algorithms perform the same kind of operation more than once. A program may inspect every value in a sequence, repeatedly reduce a number, continue reading until valid input is obtained, or search until a target is found.

It is tempting to describe all of these situations simply by saying: “use a loop.” That phrase names a programming construct, but it does not explain the algorithm. To understand iteration, we need to answer more precise questions:

- What information exists before the loop starts?
- What does one iteration accomplish?
- Which part of the state changes?
- What remains true after every iteration?
- What causes the loop to stop?
- Why does the final state represent the required result?

Iteration is best understood as **repeated state transformation**.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to identify the initial state, loop condition, body, update, processed portion of the input, and final state of a simple iterative algorithm.

---

## 1. A problem that cannot be solved by one fixed expression

Consider the task:

> Given a finite list of integers, compute the sum of its elements.

For the concrete input:

```text
[4, 7, -2, 5]
```

a human may write:

```text
4 + 7 - 2 + 5 = 14
```

But the number of values is not fixed. Another input may contain one element, one thousand elements, or none. We therefore need a finite description that can adapt to the size of the input.

The key idea is to remember a **partial result**.

After processing the first element, remember its contribution. After processing the second, update the remembered result. Continue until every element has been incorporated.

This gives the Python function:

```python
def sum_values(values: list[int]) -> int:
    total = 0

    for value in values:
        total = total + value

    return total
```

The code is short. The algorithmic meaning is richer.

---

## 2. The four essential parts of iteration

Every simple loop can be analysed through four components.

### Initialisation

Before repetition begins, the algorithm establishes an initial state.

```python
total = 0
```

### Repetition rule

The loop determines which items or states will be processed.

```python
for value in values:
```

### Body and update

The body uses the current information to create the next state.

```python
total = total + value
```

### Completion

When no iterations remain, the algorithm uses the final state as the result.

```python
return total
```

These parts must fit together. A correct body cannot repair an initial state that represents the wrong fact. A meaningful initial state is useless if the loop omits part of the input. A loop that maintains the correct result may still be wrong if it never stops.

---

## 3. The meaning of the accumulator

The variable `total` is often called an **accumulator** because it accumulates contributions from successive input elements.

Its intended meaning is:

```text
total = the sum of all input elements processed so far
```

This sentence is more important than the variable name. It allows us to explain every phase of the algorithm.

Before the loop, no elements have been processed, and the sum of no selected values is `0`. Therefore the initialisation is correct.

During an iteration, `value` is the next unprocessed element. Adding it to `total` extends the partial sum to include one more element.

After the loop, every element has been processed. Therefore the partial sum is the sum of the entire input.

This pattern is not specific to summation. The same shape appears in many algorithms:

```text
count = number of matching elements processed so far
product = product of elements processed so far
maximum = greatest element processed so far
found = whether a target has appeared among processed elements
```

A good iterative algorithm gives each state variable a precise meaning.

---

## 4. Iteration creates a sequence of states

For the input:

```text
[4, 7, -2, 5]
```

the execution can be represented as:

```text
total = 0
    ↓ process 4
total = 4
    ↓ process 7
total = 11
    ↓ process -2
total = 9
    ↓ process 5
total = 14
```

The loop is therefore not one action repeated in a vague sense. It creates a sequence of well-defined states:

```text
state₀ → state₁ → state₂ → state₃ → state₄
```

A trace table makes the same process explicit:

| Iteration | Current value | `total` before | `total` after | Processed prefix |
|---:|---:|---:|---:|---|
| Initial | — | — | 0 | `[]` |
| 1 | 4 | 0 | 4 | `[4]` |
| 2 | 7 | 4 | 11 | `[4, 7]` |
| 3 | -2 | 11 | 9 | `[4, 7, -2]` |
| 4 | 5 | 9 | 14 | `[4, 7, -2, 5]` |

The phrase **processed prefix** refers to the part of the sequence already examined from the beginning up to the current position.

---

## 5. The boundary between processed and unprocessed data

A useful mental model divides the input into two regions:

```text
processed | unprocessed
```

At the beginning:

```text
[] | [4, 7, -2, 5]
```

After two iterations:

```text
[4, 7] | [-2, 5]
```

At the end:

```text
[4, 7, -2, 5] | []
```

The loop advances this boundary one element at a time. The state summarises the processed region.

For the sum algorithm:

```text
total = sum(processed region)
```

For a maximum algorithm:

```text
current_maximum = greatest value in processed region
```

For a search algorithm:

```text
found = target occurs in processed region
```

This model becomes essential when studying loop invariants and correctness.

---

## 6. Empty input is not always an error

For summation, the empty list has a natural result:

```python
sum_values([]) == 0
```

This is consistent with the state meaning. Before the loop, no values have been processed and `total` is `0`. The loop executes zero times, so the result remains `0`.

This illustrates a useful fact:

> A loop may execute zero times and still be correct.

Whether empty input is valid depends on the problem.

For a sum, the empty result can naturally be `0`. For a product, the corresponding identity is often `1`. For a maximum, an empty input has no greatest element unless the specification provides a separate convention.

The correct initial state therefore depends on both the operation and the input domain.

---

## 7. Counting is a related but different pattern

Consider:

```python
def count_even(values: list[int]) -> int:
    count = 0

    for value in values:
        if value % 2 == 0:
            count = count + 1

    return count
```

The state meaning is:

```text
count = the number of even values processed so far
```

The loop still advances through the list one element at a time, but not every element changes the state.

If the current value is even, the count increases. If it is odd, the count remains unchanged. In both cases, the meaning of `count` remains true after the current element becomes part of the processed prefix.

This is an important point: **doing nothing in one branch is still part of the algorithm**. The unchanged state must also be justified.

---

## 8. Search may stop before processing the whole input

Not every loop must examine every element.

```python
def contains(values: list[int], target: int) -> bool:
    for value in values:
        if value == target:
            return True

    return False
```

This loop stops early when the target is found.

The algorithm has two completion paths:

1. `return True` when a matching element is encountered;
2. `return False` after every element has been checked without a match.

The meaning of the process is:

```text
before each new element is inspected,
the target has not appeared in the processed prefix
```

If a match appears, the required answer is already known and further processing would be unnecessary.

Early return is therefore not merely a coding shortcut. It expresses a logical fact: the result has become determined.

---

## 9. A loop body should make progress

A useful loop changes the relationship between processed and unprocessed work.

In a `for` loop over a finite list, progress is normally automatic: each iteration selects the next element.

In other loops, progress must be designed explicitly. For example:

```python
remaining = 5

while remaining > 0:
    print(remaining)
    remaining = remaining - 1
```

The update reduces `remaining`. Without it:

```python
remaining = 5

while remaining > 0:
    print(remaining)
```

nothing makes the condition false. The loop repeats forever.

This leads to a central principle:

> Repetition must be accompanied by a form of progress toward completion.

Later chapters will make this principle formal through termination measures.

---

## 10. Complexity emerges from the number of state transitions

Let `n = len(values)`.

The summation loop performs one iteration per input element. Under the introductory cost model, each iteration performs constant-time work: one read, one addition, and one assignment.

Therefore:

```text
Time complexity: O(n)
Auxiliary space: O(1)
```

The amount of additional state does not grow with the input. The algorithm stores only a few scalar values.

The search function has:

```text
Best case: O(1)
Worst case: O(n)
Auxiliary space: O(1)
```

It may stop after the first element, but in the worst case it examines the entire input.

Complexity analysis therefore asks how many state transitions may occur as the input grows.

---

## 11. Common mistakes

### Giving the state variable no precise meaning

A variable such as `x` may hold a number, but unless we know what the number represents, we cannot justify the updates.

### Choosing an invalid initial value

Initialising a maximum to zero fails for all-negative input because zero is not a valid candidate from the domain.

### Forgetting that zero iterations are possible

A loop body may never execute. The state before the loop must already support the valid empty or boundary case.

### Updating the wrong quantity

In a counting algorithm, adding the value instead of adding one changes the problem from counting to summation.

### Ignoring early completion

Some algorithms can return as soon as the answer is known. Failing to recognise this may make the solution less clear or less efficient.

### Failing to make progress

A condition-controlled loop may remain true forever if the body does not move the state toward a stopping condition.

---

## 12. What you must be able to explain

After this chapter, you should be able to:

- describe iteration as repeated state transformation;
- identify initialisation, repetition, update, and completion;
- state the meaning of an accumulator or counter;
- explain the processed-prefix model;
- trace a loop in a table;
- explain why zero iterations may be valid;
- distinguish full traversal from early termination;
- identify whether a loop makes progress;
- estimate linear time and constant auxiliary space for a simple scan.

## 13. Practice

### Exercise 1 — Product

Write a function that multiplies all integers in a list. State the meaning of the accumulator and justify its initial value.

### Exercise 2 — Count negatives

Trace a function that counts negative values for:

```text
[3, -1, 0, -4, 8]
```

Include the processed prefix after each iteration.

### Exercise 3 — Any duplicate neighbour

Design a loop that returns `True` when two adjacent elements are equal. Identify which part of the previous state must be remembered.

### Exercise 4 — First matching index

Write a loop that returns the first index at which `target` occurs, or `-1` if it is absent. Explain why an early return preserves correctness.

### Exercise 5 — Diagnose the state meaning

A student writes:

```python
def count_positive(values: list[int]) -> int:
    count = 0
    for value in values:
        if value > 0:
            count = count + value
    return count
```

Explain which problem this function actually solves and why the update does not preserve the intended meaning of a count.

## 14. Summary

Iteration gives a finite algorithm the ability to process input of variable size. Its essential structure is not merely “a loop.” It is a sequence of state transformations built from a valid initial state, a repeated rule, meaningful updates, visible progress, and a completion condition.

The next chapter focuses on `for` loops, ranges, indexing, and the boundary errors that arise when definite iteration is expressed imprecisely.
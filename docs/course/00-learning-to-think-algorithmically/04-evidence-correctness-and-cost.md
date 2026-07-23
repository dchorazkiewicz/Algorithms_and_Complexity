# Evidence That an Algorithm Works

## 1. A correct-looking output is not enough

Suppose a program prints the expected result for the input:

```text
[4, 9, 2, 7]
```

That observation is useful, but it answers only one question:

> Did this execution produce the expected result for this input?

It does not answer:

- Will the program work for every valid input?
- Will it terminate for every valid input?
- Does it accidentally modify its input?
- How does its running time grow?
- How much additional memory does it use?

Algorithm analysis uses several different kinds of evidence. They complement one another, but they are not interchangeable.

## 2. Examples

An **example** illustrates the intended meaning of a problem or algorithm.

For a function that counts positive values:

```text
[-3, 5, 0, 8, -1] → 2
```

The example helps a reader understand that:

- zero is not counted as positive;
- negative values are ignored;
- the result is a count, not a list of matching values.

Examples are explanatory. They do not establish general correctness.

## 3. Tests

A **test** executes a program for a selected input and compares the observed behaviour with the expected behaviour.

```python
def count_positive(values: list[int]) -> int:
    count = 0
    for value in values:
        if value > 0:
            count += 1
    return count


assert count_positive([-3, 5, 0, 8, -1]) == 2
assert count_positive([]) == 0
assert count_positive([4]) == 1
assert count_positive([-4]) == 0
```

Tests can reveal errors. A failed test is evidence that the implementation is wrong relative to the expected behaviour.

A passed test is weaker evidence. It tells us only that no error was observed for that selected case.

### Good tests are chosen from the specification

Useful test categories include:

- ordinary input;
- smallest valid input;
- empty input, when allowed or explicitly rejected;
- one element;
- all values satisfying the condition;
- no values satisfying the condition;
- repeated values;
- negative values;
- values at domain boundaries;
- invalid input when validation is part of the interface.

Testing is strongest when cases are selected to challenge assumptions rather than to repeat similar successful examples.

## 4. Counterexamples

A **counterexample** is one valid input that disproves a general claim.

Consider the claim:

> Initialising a maximum to zero works for every non-empty list of integers.

The input:

```text
[-5, -2, -11]
```

is a counterexample. The algorithm returns `0`, but the correct maximum is `-2`.

One counterexample is enough to show that a universal claim is false.

This makes counterexample search a powerful design tool. Before trying to prove that an algorithm is correct, try to break it.

Ask:

- What if all values are negative?
- What if the list has one element?
- What if the best value appears more than once?
- What if the result is absent?
- What if the input is already ordered?
- What if the input is ordered in the opposite direction?

## 5. Correctness

An algorithm is **correct** when, for every input satisfying its assumptions, it terminates and produces a result satisfying the required specification.

Correctness therefore contains two obligations:

1. the produced result is right;
2. the algorithm eventually stops.

The first is often called **partial correctness**. The second is **termination**. Together they give total correctness.

At this stage, we use structured informal arguments. Later modules introduce preconditions, postconditions, invariants, and recursive reasoning in more detail.

## 6. A correctness argument for counting positives

Consider:

```python
def count_positive(values: list[int]) -> int:
    count = 0

    for value in values:
        if value > 0:
            count += 1

    return count
```

The central claim is:

> After processing any number of elements, `count` equals the number of positive elements among those processed elements.

### Initial state

Before the loop, zero elements have been processed. The number of positive elements among zero elements is zero, so `count = 0` is correct.

### One iteration

Assume the claim is true before processing the current value.

- If the current value is positive, the number of positive processed elements increases by one, and the algorithm increments `count`.
- If the current value is not positive, the number does not increase, and the algorithm leaves `count` unchanged.

Therefore the claim remains true after the iteration.

### Final state

When the loop finishes, all elements have been processed. The claim then says that `count` equals the number of positive elements in the entire input. That is exactly the required result.

This argument explains every possible execution, not only one trace.

## 7. Termination

A loop terminates when it cannot repeat forever.

For:

```python
for value in values:
```

termination follows from the assumption that `values` is finite. The loop processes one element per iteration and stops after the last element.

For a `while` loop, the argument may require a quantity that moves toward a boundary.

```python
def countdown(start: int) -> list[int]:
    result = []
    current = start

    while current > 0:
        result.append(current)
        current -= 1

    return result
```

If `start` is a non-negative integer, then:

- `current` begins finite;
- each iteration decreases it by one;
- it cannot decrease forever while remaining greater than zero;
- eventually `current == 0`, so the loop stops.

The quantity `current` acts as a progress measure.

### A non-terminating version

```python
def broken_countdown(start: int) -> list[int]:
    result = []
    current = start

    while current > 0:
        result.append(current)

    return result
```

The condition depends on `current`, but `current` never changes. For positive `start`, the condition remains true forever.

The error is not that the loop lacks a condition. The error is that the state does not make progress toward making the condition false.

## 8. Complexity

Complexity analysis studies how resource use grows as the input grows.

The two primary resources in this course are:

- **time complexity** — growth in the number of relevant operations;
- **auxiliary-space complexity** — growth in additional memory used by the algorithm.

Complexity is not the same as measured clock time. Real execution time also depends on hardware, language implementation, compiler, interpreter, cache behaviour, and constant factors.

Complexity describes growth.

## 9. Define input size

A complexity statement is incomplete unless the input size is clear.

For a list-processing function:

```text
n = len(values)
```

For `count_positive`, the loop processes every element once. Under the introductory assumption that comparison and increment are constant-time operations:

```text
Time complexity: O(n)
Auxiliary space: O(1)
```

The function stores only a fixed number of additional values, regardless of list length.

## 10. Compare two correct approaches

Suppose we want to count positive values.

### Direct scan

```python
def count_positive(values: list[int]) -> int:
    count = 0
    for value in values:
        if value > 0:
            count += 1
    return count
```

### Build a filtered list first

```python
def count_positive_with_list(values: list[int]) -> int:
    positive_values = []

    for value in values:
        if value > 0:
            positive_values.append(value)

    return len(positive_values)
```

Both are correct.

The direct scan uses constant auxiliary space:

```text
O(1)
```

The second may store up to `n` positive values:

```text
O(n)
```

The time complexity of both is linear:

```text
O(n)
```

This example shows why correctness and efficiency are separate dimensions.

## 11. Testing, proof, and analysis answer different questions

| Method | Question answered |
|---|---|
| Example | What does the problem or method mean in one concrete case? |
| Test | Does this implementation behave as expected for this selected input? |
| Counterexample | Can one input disprove the general claim? |
| Correctness argument | Why does the algorithm satisfy the specification for every valid input? |
| Termination argument | Why must the execution eventually stop? |
| Complexity analysis | How do resource requirements grow with input size? |

A mature algorithm explanation uses several of these forms together.

## 12. Common misconceptions

### “All tests passed, so the program is proven correct”

Tests cover selected inputs. Unless the valid input domain is tiny and exhaustively tested, passing tests is not a proof.

### “The loop has a condition, so it terminates”

A condition is not enough. The state must move toward making the condition false.

### “The function is `O(n)` because it contains one loop”

The cost of the loop body matters. A loop may call sorting, copy large slices, or perform another non-constant operation.

### “`O(n)` tells us the exact number of operations”

Big O gives an asymptotic upper bound, not an exact count.

### “A faster algorithm is better even if it is harder to understand”

Correctness and clarity come first. Optimisation should address an actual cost and preserve the specification.

## 13. A complete evidence checklist

For an important algorithm, ask:

### Specification

- What inputs are valid?
- What output is required?
- What side effects are permitted?

### Examples and tests

- What ordinary example illustrates the task?
- What boundary cases challenge the design?
- Can I construct a counterexample to a weak assumption?

### Correctness

- What does each important state variable mean?
- Why is the meaning true initially?
- Why does every update preserve it?
- Why does the final state imply the required output?

### Termination

- What finite process is being consumed?
- What quantity makes progress?
- Why can progress not continue forever?

### Complexity

- What is the input-size parameter?
- Which operation dominates the cost?
- How many times can it execute?
- How much additional memory is used?
- Are there hidden language-specific costs?

## 14. What you must be able to explain

After this chapter, you should be able to:

- distinguish examples, tests, counterexamples, and correctness arguments;
- explain why passing tests does not prove general correctness;
- identify the central state claim in a simple loop;
- explain initialisation, preservation, and completion;
- give a progress argument for termination;
- define input size before stating complexity;
- compare two correct solutions by auxiliary-space use;
- recognise hidden costs such as copied lists.

## 15. Practice

### Exercise 1 — Counterexample

A student claims that the following function returns the smallest integer in any non-empty list:

```python
def minimum(values: list[int]) -> int:
    result = 0
    for value in values:
        if value < result:
            result = value
    return result
```

Find a counterexample and explain the violated assumption.

### Exercise 2 — Termination

Explain why this function terminates for every non-negative integer `value`:

```python
def halve_until_zero(value: int) -> int:
    steps = 0
    while value > 0:
        value //= 2
        steps += 1
    return steps
```

Identify the progress measure.

### Exercise 3 — Complexity

Compare the auxiliary-space use of:

```python
def doubled_copy(values: list[int]) -> list[int]:
    result = []
    for value in values:
        result.append(2 * value)
    return result
```

and:

```python
def double_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] *= 2
```

State the side effects as well as the complexity.

### Exercise 4 — Correctness claim

For a function that sums all elements in a list, formulate a sentence describing what the accumulator means after processing the first `k` elements.

## 16. Summary

Algorithmic evidence has several layers.

Examples explain. Tests check selected executions. Counterexamples disprove general claims. Correctness arguments explain why all valid inputs produce valid outputs. Termination arguments explain why the process stops. Complexity analysis explains how resource use grows.

These layers should not be collapsed into one another. A reliable solution is not merely code that produced the expected output once. It is a method whose assumptions, behaviour, correctness, termination, and cost can be explained.

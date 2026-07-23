# Reading Python as an Algorithm

## Why code is difficult to read when you look only at syntax

A beginner often reads a Python function by naming the visible constructions:

- this line defines a function;
- this is a `for` loop;
- this is an `if` statement;
- this variable is increased;
- this line returns a value.

That description is not false. It is simply too shallow to explain the algorithm.

Knowing that a line contains a loop does not tell us **what knowledge the loop accumulates**. Knowing that a function contains a conditional does not tell us **why the condition divides the problem into the correct cases**. Knowing that a variable changes does not tell us **what the variable is supposed to mean at every stage of the execution**.

To read code algorithmically, we must move from syntax to meaning. We must ask:

1. What problem is this function intended to solve?
2. What information enters the function?
3. What result must leave it?
4. Which pieces of information change while the function runs?
5. What does each changing variable represent?
6. Why is each variable initialised in a particular way?
7. Why does each update preserve the intended meaning?
8. What is true when the computation finishes?

This chapter develops a systematic method for answering those questions. We will use Python because its syntax is relatively compact, but the central objective is not to memorise Python. The objective is to learn how to uncover the algorithmic process hidden inside executable code.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to take a short Python function and explain its problem, interface, state, control flow, variable meanings, updates, output, side effects, boundary cases, and introductory complexity. You should also be able to distinguish a syntax-level description from a genuine algorithmic explanation.

---

## 1. Begin with the problem, not with the first line

Consider the following function:

```python
def count_positive(values: list[int]) -> int:
    count = 0

    for value in values:
        if value > 0:
            count = count + 1

    return count
```

A syntax-level reading says:

> The function defines a counter, loops through a list, checks whether each element is positive, increments the counter, and returns it.

An algorithmic reading says:

> The function examines every element of the input sequence. During the scan, `count` stores the number of positive elements among those already processed. When the current element is positive, the count is increased by one; otherwise it is left unchanged. After every element has been processed, `count` therefore equals the number of positive elements in the entire input.

The second explanation is longer because it answers the important questions:

- what is being counted;
- which part of the input has already been considered;
- what the variable means during the process;
- why the update is correct;
- why the final value is the required result.

This difference is fundamental. A programmer who sees only syntax can often reproduce a familiar loop. A student who understands the algorithm can adapt it to count negative values, sum even values, detect a matching element, compute a minimum, or analyse a more complex traversal.

### The intended problem

Before inspecting the implementation in detail, state the problem independently of Python:

```text
Input:
    A finite sequence of integers.

Output:
    The number of elements that are greater than zero.
```

This specification tells us what must be computed. It does not yet say that the input must be represented by a Python list, that a `for` loop must be used, or that the state variable must be called `count`.

The function is one implementation of that problem.

---

## 2. Read the interface as a promise

The first line is:

```python
def count_positive(values: list[int]) -> int:
```

This is more than a piece of syntax. It presents the intended interface between the function and its environment.

It tells us that:

- the function is named `count_positive`;
- it receives one argument, referred to inside the function as `values`;
- the annotation suggests that the argument is expected to be a list of integers;
- the return annotation suggests that the result should be an integer.

The interface gives us a first approximation of the contract:

```text
Input:
    values — a list of integers

Output:
    an integer
```

But that approximation is incomplete. It does not yet state what the returned integer means. It does not say whether the list may be empty. It does not say whether the function modifies the list. It does not specify what happens if an element is not an integer.

Python type annotations are also not a full runtime guarantee. They communicate intended use and support tools, but ordinary Python execution does not automatically reject every violation of the annotation.

### The interface must be interpreted semantically

A useful reading is:

> The function receives a finite sequence represented as a Python list. It is intended to return the number of elements that satisfy the predicate `value > 0`. The function reads the list but does not intentionally modify it.

This explanation connects the interface to the problem rather than merely translating punctuation.

### Returned value and side effects

A function can communicate with its environment in more than one way.

It may:

- return a value;
- modify an input object;
- update global state;
- print text;
- write a file;
- raise an exception;
- call an external service.

For `count_positive`, the intended observable result is the returned integer. The list is not modified, and no text is printed.

We can write:

```text
Returned result:
    the number of positive elements

Intended side effects:
    none
```

This distinction will matter throughout the course. Two functions may produce similar visible outcomes while having very different contracts.

---

## 3. State: the information that matters during execution

An algorithm does not usually jump directly from input to output. It passes through intermediate stages. At each stage, some information represents what has already happened and what remains to be done.

That information is the **state** of the computation at the chosen level of abstraction.

For `count_positive`, the relevant state includes:

- `values` — the complete input sequence;
- `value` — the element currently being processed;
- `count` — the number of positive elements found so far;
- the implicit loop position — how many elements have already been processed.

Not every part of a computer's physical state is useful for understanding this algorithm. We do not need to record the processor registers, the exact memory addresses, or the state of unrelated programs. We select the information necessary to explain the computation.

### A variable is not just a container

It is common to describe a variable as a box that contains a value. That metaphor is sometimes useful, but it is not enough for algorithmic reasoning.

The crucial question is not only:

> What value is stored in `count`?

It is:

> What fact about the processed input is represented by the current value of `count`?

For this function, the intended meaning is:

```text
count = the number of positive elements among the input elements processed so far
```

This sentence is the conceptual centre of the algorithm.

If `count` equals `2`, the number `2` is not meaningful in isolation. It is meaningful because it claims that exactly two positive values have been encountered in the processed part of the sequence.

### State meaning guides correctness

Once the meaning is explicit, every part of the function can be examined against it:

- Does the initial value make the statement true before the loop begins?
- Does each iteration preserve the statement after one additional element is processed?
- When the loop ends, does the statement imply the required output?

This is the beginning of invariant-based reasoning, although the formal treatment of loop invariants belongs later in the course.

---

## 4. Initialisation is the first claim made by the algorithm

The function begins its computation with:

```python
count = 0
```

A superficial reading says that the counter is set to zero.

A better question is:

> Why is zero the correct initial value?

Before the loop begins, no elements have been processed. The number of positive elements among zero processed elements is zero. Therefore:

```text
count = 0
```

makes the intended state meaning true at the beginning.

This gives us a general principle:

> Initialisation must establish the meaning that the algorithm intends to preserve during later steps.

### What would go wrong with another initial value?

Suppose we wrote:

```python
count = 1
```

Before reading any input element, the function would already behave as though one positive value had been found. The state would not correspond to reality.

For the input:

```text
[-3, -2]
```

such a function would return `1`, even though there are no positive values.

The bug is not caused by the loop. The bug exists before the loop starts. This is why reading only the repeated part of an algorithm is insufficient.

### Initial values often come from identities or valid input elements

Many algorithms initialise state using one of two common ideas.

The first is an **identity value**:

- a sum begins at `0` because adding zero changes nothing;
- a product begins at `1` because multiplying by one changes nothing;
- a count begins at `0` because zero items have been counted before processing.

The second is a value taken from the valid input:

- a maximum of a non-empty sequence often begins with the first element;
- a minimum often begins with the first element;
- a current candidate may begin with a valid starting node or record.

Choosing the initial value is therefore part of algorithm design, not a mechanical coding step.

---

## 5. Expressions produce values; statements direct computation

To read Python precisely, it is useful to distinguish **expressions** from **statements**.

An **expression** is evaluated to produce a value.

Examples from our function include:

```python
value > 0
count + 1
```

The expression:

```python
value > 0
```

produces either `True` or `False`.

The expression:

```python
count + 1
```

produces a new integer value. By itself, it does not change `count`.

A **statement** directs the computation. It may change state, choose a branch, repeat a block, or end the function.

Examples include:

```python
count = 0
```

```python
if value > 0:
    count = count + 1
```

```python
return count
```

### Why the distinction matters

Consider:

```python
count + 1
```

This computes a value and then discards it. The variable `count` remains unchanged.

By contrast:

```python
count = count + 1
```

first evaluates `count + 1` and then assigns the result back to `count`.

The right-hand side is evaluated using the old state. The assignment produces a new state.

If `count` was `3`, the operation means:

1. read the old value `3`;
2. compute `3 + 1`, obtaining `4`;
3. replace the previous value associated with `count` by `4`.

This is not the mathematical equation `count = count + 1`. It is an imperative state update.

---

## 6. Read the loop as a growing body of processed information

The loop header is:

```python
for value in values:
```

A syntax-level explanation says that the loop iterates over the list.

An algorithmic explanation is more specific:

> At the beginning of each iteration, one previously unprocessed element becomes the current element `value`. The body then extends the processed part of the input by one element while updating the state so that its intended meaning remains true.

It is useful to imagine the input divided conceptually into two regions:

```text
[ processed elements | unprocessed elements ]
```

At the start, the processed region is empty:

```text
[ | -3, 5, 0, 8, -1 ]
```

After one iteration:

```text
[ -3 | 5, 0, 8, -1 ]
```

After two iterations:

```text
[ -3, 5 | 0, 8, -1 ]
```

The loop advances the boundary until the entire sequence has been processed.

### The loop does not merely repeat code

Repetition is only the visible mechanism. Conceptually, each iteration updates our knowledge about a larger prefix of the input.

Before an iteration, assume:

```text
count = the number of positive elements in the processed prefix
```

The next value must now be incorporated. There are exactly two relevant cases.

---

## 7. The conditional expresses the cases of the problem

The conditional is:

```python
if value > 0:
    count = count + 1
```

This is not merely a branch in control flow. It reflects a logical distinction in the problem.

### Case 1: the current value is positive

If:

```python
value > 0
```

is true, the new element contributes one additional positive value to the processed prefix. Therefore the count must increase by one.

If the previous processed prefix contained three positive values, the larger prefix now contains four.

### Case 2: the current value is not positive

If the condition is false, the new element contributes no positive value. The count should therefore remain unchanged.

The fact that there is no explicit `else` statement does not mean the second case is ignored. Skipping the update is itself the correct behaviour for that case.

### Why zero is excluded

The condition uses:

```python
value > 0
```

not:

```python
value >= 0
```

This difference changes the mathematical predicate being counted.

- `value > 0` counts strictly positive values;
- `value >= 0` counts non-negative values.

A single character can therefore change the computational problem solved by the program.

This is why code reading must connect conditions to definitions. A condition should not be accepted merely because it looks plausible.

---

## 8. Trace the state, not only the output

Use the input:

```text
[-3, 5, 0, 8, -1]
```

A trace should record the information necessary to explain how the final result arises.

| Iteration | Processed prefix | Current `value` | `value > 0` | `count` before | `count` after |
|---:|---|---:|:---:|---:|---:|
| Initial | `[]` | — | — | — | 0 |
| 1 | `[-3]` | -3 | False | 0 | 0 |
| 2 | `[-3, 5]` | 5 | True | 0 | 1 |
| 3 | `[-3, 5, 0]` | 0 | False | 1 | 1 |
| 4 | `[-3, 5, 0, 8]` | 8 | True | 1 | 2 |
| 5 | `[-3, 5, 0, 8, -1]` | -1 | False | 2 | 2 |

The returned result is `2`.

### What the trace proves and what it does not

The trace demonstrates that this execution behaves as expected for one input. It helps us understand the mechanism and may reveal errors.

It does not prove that the function is correct for every possible list of integers.

To justify general correctness, we need an argument based on the meaning of `count`:

1. Before the loop, no elements are processed, so `count = 0` is correct.
2. During each iteration, the update handles the current value correctly in both cases.
3. Therefore, after each iteration, `count` equals the number of positive values in the processed prefix.
4. When the loop ends, the processed prefix is the entire input.
5. Thus the returned count is the number of positive values in the input.

The trace illustrates the argument. The argument explains all valid executions.

---

## 9. The return statement connects the maintained state to the result

The final statement is:

```python
return count
```

A return statement ends the current function execution and supplies a value to the caller.

The important question is:

> Why is `count` now the correct value to return?

During the loop, `count` described only the processed prefix. At termination, there are no unprocessed elements. The processed prefix is the entire sequence. Therefore the state meaning becomes:

```text
count = the number of positive elements in the entire input
```

That is exactly the required output.

This reveals a common structure of iterative algorithms:

1. choose a state meaning that describes partial progress;
2. initialise it correctly for an empty or minimal processed portion;
3. preserve it while extending the processed portion;
4. use the completed state as the final result.

This structure will later appear in searching, sorting, graph traversal, dynamic data structures, and correctness proofs.

---

## 10. Returned result versus side effect

Now compare the original function with:

```python
def report_positive_count(values: list[int]) -> None:
    count = 0

    for value in values:
        if value > 0:
            count = count + 1

    print(count)
```

The second function computes the same numerical quantity internally, but its interface is different.

The original function:

```python
result = count_positive(values)
```

returns the number. The caller can store it, compare it, combine it with another result, or test it.

The reporting function prints the number and returns `None`.

Printing is a **side effect**: an observable interaction with the environment beyond returning a value.

### Why this distinction matters

A returned value is usually easier to reuse and test:

```python
assert count_positive([-3, 5, 0, 8, -1]) == 2
```

A function that only prints requires capturing or inspecting output.

Similarly, a function that modifies its input may be correct under one contract and incorrect under another.

Compare:

```python
def doubled_copy(values: list[int]) -> list[int]:
    result: list[int] = []

    for value in values:
        result.append(2 * value)

    return result
```

with:

```python
def double_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] = 2 * values[index]
```

The first returns a new list and leaves the original unchanged. The second changes the original list and returns `None`.

Neither interface is automatically better. The correct choice depends on the intended contract. The critical point is that the difference must be understood and stated.

---

## 11. Names are part of the explanation

Consider this function:

```python
def f(a: list[int]) -> int:
    x = 0

    for y in a:
        if y > 0:
            x = x + 1

    return x
```

It performs the same operations as `count_positive`, but its names communicate almost nothing.

Now compare:

```python
def count_positive(values: list[int]) -> int:
    positive_count = 0

    for value in values:
        if value > 0:
            positive_count = positive_count + 1

    return positive_count
```

The second version makes the roles of the values easier to infer.

Good names do not replace a correctness argument, but they reduce the mental effort required to connect code with the conceptual model.

A useful name should suggest:

- what kind of information the variable represents;
- whether it is an input, accumulator, index, candidate, result, or temporary value;
- how it participates in the computation.

### Names can still be misleading

A variable called `maximum` is not necessarily the maximum. It may be incorrectly initialised or updated.

Names express intention, not proof. The implementation must still be checked against the intended meaning.

---

## 12. Explicit educational code versus compact idiomatic code

Python allows the function to be written more compactly:

```python
def count_positive(values: list[int]) -> int:
    return sum(1 for value in values if value > 0)
```

This version is concise and valid. Once the underlying mechanism is understood, it may be preferable in production code.

For learning, however, the explicit version exposes the algorithmic structure:

```python
def count_positive(values: list[int]) -> int:
    count = 0

    for value in values:
        if value > 0:
            count = count + 1

    return count
```

It shows:

- the initial state;
- the repeated traversal;
- the predicate;
- the state update;
- the final result.

The compact version hides those stages inside `sum` and a generator expression.

This gives us an important pedagogical rule:

> First expose the mechanism. Compress it only after the mechanism is understood.

Concise code is not automatically clearer code. Clarity depends on the reader's knowledge and on which aspects of the algorithm need to remain visible.

---

## 13. A second example: summing even values

Now consider a structurally similar function:

```python
def sum_even(values: list[int]) -> int:
    total = 0

    for value in values:
        if value % 2 == 0:
            total = total + value

    return total
```

At first glance, this resembles `count_positive`. Both functions:

- traverse the input once;
- test each value;
- maintain an accumulator;
- return the accumulator.

But the meaning of the state is different.

For `sum_even`:

```text
total = the sum of even elements among those processed so far
```

The initial value is again zero, but for a different reason. Here zero is the additive identity. The sum of no selected values is zero.

### Trace

For:

```text
[3, 4, 6, 7, 2]
```

we obtain:

| Iteration | Current value | Even? | `total` before | `total` after |
|---:|---:|:---:|---:|---:|
| Initial | — | — | — | 0 |
| 1 | 3 | No | 0 | 0 |
| 2 | 4 | Yes | 0 | 4 |
| 3 | 6 | Yes | 4 | 10 |
| 4 | 7 | No | 10 | 10 |
| 5 | 2 | Yes | 10 | 12 |

The result is `12`.

### Same control structure, different algorithmic meaning

The two functions share a pattern:

```text
initialise an accumulator
for every element:
    if the element satisfies a condition:
        update the accumulator
return the accumulator
```

But the algorithms are not identical.

- `count_positive` accumulates the number of matching elements;
- `sum_even` accumulates the values of matching elements.

Recognising structural patterns is useful. Treating all similar-looking loops as the same algorithm is a mistake. The state meaning and update rule determine what is actually being computed.

---

## 14. A third example: detecting whether a match exists

Consider:

```python
def contains_negative(values: list[int]) -> bool:
    for value in values:
        if value < 0:
            return True

    return False
```

This function behaves differently from the previous accumulators.

It does not need to count or sum all matching values. The problem asks only whether at least one negative value exists.

The algorithm can stop as soon as a witness is found.

### Reading the two return statements

Inside the loop:

```python
return True
```

means:

> A negative value has been found. The required existential claim is established, so no further input needs to be inspected.

After the loop:

```python
return False
```

means:

> Every element has been inspected and none was negative. Therefore no negative value exists in the input.

The placement of the final `return False` is essential. It is executed only after the loop finishes without finding a witness.

### A common indentation error

This version is wrong:

```python
def contains_negative(values: list[int]) -> bool:
    for value in values:
        if value < 0:
            return True
        return False
```

The function returns after examining only the first element.

For:

```text
[5, 7, -2]
```

it returns `False` immediately after seeing `5`, even though a negative value appears later.

The problem is not merely visual indentation. The control flow no longer represents the intended reasoning. Failure can be concluded only after all candidates have been ruled out.

This example shows why code reading must track **when** a statement becomes justified.

---

## 15. Boundary cases reveal the real contract

A function should not be understood only through a typical example.

For `count_positive`, useful boundary cases include:

### Empty input

```python
count_positive([])
```

The loop executes zero times and the function returns `0`.

This is meaningful: an empty sequence contains zero positive values.

### One positive value

```python
count_positive([4])
```

The result is `1`.

### One non-positive value

```python
count_positive([0])
```

The result is `0`.

### All positive

```python
count_positive([1, 2, 3])
```

The result is `3`.

### No positive values

```python
count_positive([-3, 0, -5])
```

The result is `0`.

### Repeated values

```python
count_positive([2, 2, -1, 2])
```

The result is `3`.

These cases test different assumptions. They help clarify that the function counts occurrences, not distinct values, and that zero is not considered positive.

### Invalid or unexpected input

What should happen for:

```python
count_positive([1, "two", 3])
```

The source function does not define a custom response. Python will eventually fail when comparing the string with zero.

That behaviour may be acceptable in an introductory example, but a production contract may require explicit validation or a different type design.

The important lesson is that invalid-input behaviour is part of the interface whether or not it is written down.

---

## 16. Introductory complexity analysis

Let `n` be the number of input elements.

The loop examines each element exactly once. The test `value > 0` is performed `n` times.

Under the usual introductory cost model for fixed-size integers:

- each comparison takes constant time;
- each increment takes constant time;
- the total running time grows proportionally to `n`.

Therefore the time complexity is:

```text
O(n)
```

The function uses a fixed amount of additional state:

- one counter;
- one current element reference;
- loop-control information.

The amount of auxiliary memory does not grow with `n`, so the auxiliary-space complexity is:

```text
O(1)
```

### Why the analysis follows from the reading method

Once we understand the control flow, complexity becomes easier to analyse.

We know:

- which block repeats;
- how many input elements are processed;
- which operations occur in each iteration;
- which state is retained.

Complexity is therefore not an unrelated formula added after the code. It is a description of the computational process we have already understood.

---

## 17. A reusable method for reading a Python function

When you encounter a new function, do not begin by explaining every token. Use the following sequence.

### Step 1: state the problem

Describe the required input-output relationship without Python syntax.

### Step 2: inspect the interface

Identify parameters, return value, type annotations, possible input modification, and failure behaviour.

### Step 3: identify the state

List the variables and implicit control information that matter during execution.

### Step 4: give every important state variable a meaning

Write a sentence such as:

```text
count = the number of matching elements processed so far
```

### Step 5: justify initialisation

Explain why the initial values make the intended meanings true before processing begins.

### Step 6: explain control flow as problem logic

For each loop or conditional, explain what part of the problem it represents.

### Step 7: explain every update

State why the update preserves or extends the meaning of the state.

### Step 8: trace one representative input

Record meaningful state changes, not only the final output.

### Step 9: examine boundary cases

Consider empty input, minimal input, repeated values, sign changes, missing matches, and invalid data when relevant.

### Step 10: connect final state to output

Explain why the state at termination satisfies the problem specification.

### Step 11: analyse cost

Identify the repeated operations and the additional memory retained.

This method scales. The state may later become an array segment, a stack, a queue, a tree node, a set of visited vertices, or a collection of recursive calls. The questions remain similar.

---

## 18. Common mistakes when reading code

### Naming syntax instead of explaining meaning

Saying “there is a loop and an `if`” does not explain what the loop establishes or why the branch is correct.

### Treating a variable as only its current number

The current value matters because it represents a fact about the processed input.

### Ignoring initialisation

Many incorrect algorithms fail before the first iteration because the initial state does not satisfy the intended meaning.

### Ignoring the false branch

When an `if` body is skipped, the unchanged state must still be justified.

### Reading only the final return

The returned value is correct only because of the state transformations that produced it.

### Confusing a successful test with correctness

One execution can confirm one example. It cannot establish correctness for every valid input.

### Assuming concise code is automatically better

Compression may hide the mechanism that a learner still needs to see.

### Ignoring side effects

A function may return the expected value while also modifying input unexpectedly.

### Ignoring operation costs hidden by Python syntax

Slicing, copying, membership tests, and container operations may have costs that are not visually obvious.

### Assuming similar-looking loops solve the same problem

The state meaning, condition, and update determine the algorithmic meaning.

---

## 19. What you must be able to explain

After studying this chapter, you should be able to answer the following without reading the code line by line mechanically:

1. What problem does `count_positive` solve?
2. What does its interface promise and what does it leave unspecified?
3. What is the relevant state during execution?
4. What does `count` mean after any number of processed elements?
5. Why is `count` initialised to zero?
6. Why does the update preserve the meaning of `count`?
7. Why is doing nothing correct when the current value is not positive?
8. How do expressions differ from statements?
9. Why is `count + 1` different from `count = count + 1`?
10. Why does the final state justify returning `count`?
11. What is the difference between returning a result and printing it?
12. Why might explicit educational code be better than a compressed expression?
13. Which boundary cases clarify the function's contract?
14. Why is the running time `O(n)` and auxiliary space `O(1)`?
15. How would you apply the same reading method to a different function?

---

## 20. Practice

### Exercise 1 — Explain the state meaning

Consider:

```python
def count_nonzero(values: list[int]) -> int:
    count = 0

    for value in values:
        if value != 0:
            count = count + 1

    return count
```

For the input:

```text
[2, -1, 0, 4, 0]
```

write:

1. the problem statement;
2. the meaning of `count`;
3. a full trace table;
4. the reason for the initial value;
5. the correctness argument in words;
6. the time and auxiliary-space complexity.

### Exercise 2 — Compare returned values and side effects

Explain the difference between:

```python
def doubled_copy(values: list[int]) -> list[int]:
    result: list[int] = []

    for value in values:
        result.append(2 * value)

    return result
```

and:

```python
def double_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] = 2 * values[index]
```

For each function, state:

- the returned value;
- the side effects;
- what happens to the original list;
- which contract would make the function appropriate.

### Exercise 3 — Find the control-flow error

Analyse:

```python
def contains_zero(values: list[int]) -> bool:
    for value in values:
        if value == 0:
            return True
        return False
```

Give a counterexample and explain why the placement of `return False` is logically unjustified.

### Exercise 4 — Design an accumulator meaning

Write a function that returns the sum of all negative values in a list.

Before writing code, state:

```text
total = ...
```

as a precise sentence describing the processed prefix.

Then justify the initial value, update rule, final return, and complexity.

### Exercise 5 — Separate expression from statement

For each item, decide whether it is an expression, a statement, or a compound statement:

```python
value < 0
count + 1
count = count + 1
return count
if value < 0:
    count = count + 1
```

Explain the role of each construction in the computation.

### Exercise 6 — Read without executing

Without running the code, determine the result and explain the state changes:

```python
def last_positive(values: list[int]) -> int | None:
    result = None

    for value in values:
        if value > 0:
            result = value

    return result
```

Use:

```text
[-2, 5, 0, 8, -1]
```

Then explain what the function returns when no positive value exists.

### Exercise 7 — Compare two algorithms

Compare:

```python
def count_positive(values: list[int]) -> int:
    count = 0
    for value in values:
        if value > 0:
            count += 1
    return count
```

with:

```python
def count_positive(values: list[int]) -> int:
    return len([value for value in values if value > 0])
```

Do they compute the same mathematical result? Do they necessarily use the same amount of auxiliary memory? Explain.

---

## Summary

Reading Python algorithmically means reconstructing the meaning of the computation rather than merely naming its syntax.

A complete reading identifies:

- the problem being solved;
- the input-output contract;
- the relevant state;
- the meaning of each important variable;
- the reason for initialisation;
- the logic represented by conditions and loops;
- the effect of every update;
- the relationship between final state and returned result;
- side effects and boundary cases;
- the time and memory cost of the execution pattern.

The central habit is to ask what fact the state represents after every step. Once that meaning is clear, the code becomes more than a sequence of commands: it becomes an executable argument about how partial information is transformed into the required result.

The next chapter will reverse the direction. Instead of starting with code and uncovering its meaning, we will begin with an informal problem statement and develop a solution systematically, step by step.
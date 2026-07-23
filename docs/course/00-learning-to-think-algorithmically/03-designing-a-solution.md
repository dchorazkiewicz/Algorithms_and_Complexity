# Designing a Solution Step by Step

## Why good programmers do not begin with code

A programming exercise often creates a misleading sense of urgency. The task appears on the screen, an editor is already open, and the first instinct is to start typing. For very small exercises, this sometimes works. For anything more subtle, it usually means that important decisions are being made accidentally inside the code.

The code then becomes a place where several different questions are mixed together:

- What exactly is the problem?
- Which inputs are valid?
- What should happen in boundary cases?
- What information must be remembered during execution?
- Which comparison expresses the requirement correctly?
- Why should the algorithm work for every valid input?
- How expensive is the chosen method?

When these questions are answered implicitly, mistakes are difficult to diagnose. A wrong result may come from a misunderstanding of the requirement, a poor state representation, an incorrect initial value, a missing case, or a syntactic bug. If the design process is explicit, the location of the problem becomes much easier to identify.

This chapter develops a repeatable method for moving from an informal task to a justified Python solution. We will not jump between unrelated mini-examples. Instead, we will follow one problem from the first sentence to the final correctness and complexity discussion.

The problem is simple enough that the mechanics do not obscure the reasoning:

> Given a non-empty list of integers, return the index of the first occurrence of the greatest value.

The objective is not merely to obtain working code. The objective is to understand how each design decision follows from the requirement.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to turn an informal problem statement into explicit input and output requirements, identify assumptions and edge cases, choose state variables with precise meanings, derive a Python implementation from those meanings, and explain correctness, termination, and complexity.

---

## 1. First understand what is being asked

Consider the input:

```text
[4, 9, 2, 9, 5]
```

The greatest value is `9`, but that value appears twice. The problem does not ask us to return the greatest value itself. It asks us to return the index of its **first occurrence**.

Using zero-based indexing, the two occurrences are at indices `1` and `3`, so the required result is:

```text
1
```

That small phrase—*first occurrence*—changes the algorithm. A solution that returns index `3` does identify a maximum, but it solves a different problem.

This is the first design habit:

> Read every requirement as a constraint on the final behaviour of the algorithm.

Words such as *first*, *last*, *any*, *all*, *distinct*, *sorted*, *non-empty*, or *without modifying the input* are not decorative. They determine which solutions are correct.

### Restating the problem in your own words

A useful restatement is:

> Scan the list from left to right. Remember the index of the greatest value encountered so far. Replace that remembered index only when a strictly greater value appears. Return the remembered index after the scan.

This is not yet code. It is a design sketch. It already reveals several likely ingredients:

- a left-to-right scan;
- a remembered index;
- a comparison with the best value seen so far;
- a strict comparison so that equal values do not replace an earlier occurrence.

A good restatement should expose the logical structure without committing prematurely to language syntax.

---

## 2. Separate the problem from the implementation

Before writing a function, define the required relationship between input and output.

```text
Input:
    A non-empty list of integers called values.

Output:
    The smallest index i such that values[i] is greater than or equal
    to every element of values.

Indexing:
    Zero-based.

Side effects:
    The input list is not modified.
```

This formulation is stronger than the original sentence because it removes ambiguity.

The phrase:

```text
the smallest index i
```

captures the requirement that the first maximum must be returned.

The condition:

```text
values[i] is greater than or equal to every element
```

captures what it means for the value at that index to be a maximum.

The statement about side effects makes clear that the algorithm should inspect the input, not reorder or overwrite it.

### Why this separation matters

Many different implementations could satisfy this specification:

- a direct left-to-right scan;
- a scan using `enumerate`;
- a library-based solution;
- a solution in C++ or another language.

The specification remains the same. It tells us what must be true when the algorithm finishes, independently of how the code is written.

This becomes especially important later in the course. Two algorithms may solve the same problem with different costs. Two programs may look different while implementing the same algorithm. A program may also run successfully while violating a hidden part of the specification.

---

## 3. Make assumptions visible

The list is required to be non-empty.

Why?

Because an empty list has no greatest element and therefore no valid index of a greatest element. Without a separate convention, the problem is undefined for empty input.

The essential precondition is:

```text
len(values) > 0
```

At this stage we have two reasonable design choices.

### Choice A: document the precondition

We may state that callers are responsible for providing a non-empty list. The function assumes valid input.

### Choice B: validate the input

We may check the condition and report failure explicitly:

```python
if not values:
    raise ValueError("values must not be empty")
```

For educational code, explicit validation is useful because it makes the boundary of the problem visible. It prevents an accidental `IndexError` from hiding the real issue.

The important point is not that one choice is always superior. The important point is that the behaviour is deliberate.

> Invalid input should be handled by a conscious interface decision, not by accident.

Module 01 will formalise preconditions and postconditions. Here we are establishing the habit of asking what must be true before the algorithm starts.

---

## 4. Construct examples before writing the algorithm

Examples are part of design, not merely part of testing after the code exists.

A useful set should expose different aspects of the requirement.

### Ordinary input

```text
[4, 9, 2, 7] → 1
```

This checks the basic behaviour.

### Repeated maximum

```text
[4, 9, 2, 9] → 1
```

This checks the word *first*.

### All values equal

```text
[5, 5, 5] → 0
```

Every position contains a maximum, so the smallest valid index is `0`.

### One-element list

```text
[8] → 0
```

This is the smallest valid input. No comparison is needed.

### All values negative

```text
[-3, -7, -1] → 2
```

This checks whether the design incorrectly assumes that the maximum must be non-negative.

### Invalid input

```text
[] → ValueError
```

This checks the chosen failure behaviour.

These examples do more than confirm expected outputs. They help shape the algorithm itself. In particular, repeated maxima tell us that equality must not replace the earlier index.

---

## 5. Decide what information the algorithm must remember

The input may contain many values, but the algorithm does not need to remember everything it has seen.

While scanning the list, it only needs enough information to answer this question:

> Where is the first greatest value among the elements processed so far?

That suggests one state variable:

```text
best_index = the index of the first greatest value among processed elements
```

This sentence is the meaning of the variable. The variable is not merely “an integer.” It represents a fact about the portion of the list already examined.

Once we know `best_index`, we can obtain the corresponding value as:

```python
values[best_index]
```

Therefore we do not need a separate `best_value` variable.

### Why good state design matters

An algorithm is often determined by the information it preserves.

If we store too little, we may be unable to make the next decision. If we store irrelevant information, the solution becomes harder to understand or more expensive. Here, one index is sufficient because it gives us both the position and access to the current best value.

This idea will return throughout the course:

- counters store how many matching elements have been seen;
- accumulators store a partial sum;
- a stack stores unfinished work;
- a visited set stores which graph vertices have already been explored;
- a tree node stores structural relationships;
- a loop invariant describes the meaning of the current state.

The problem is simple, but the design question is fundamental:

> What is the smallest meaningful state that allows the computation to continue correctly?

---

## 6. Choose an initial state that is already true

Before scanning the remaining elements, we initialise:

```python
best_index = 0
```

Why is this valid?

Because before the loop begins, we can regard the first element as the only processed element. Among a one-element prefix, index `0` is trivially the index of the first greatest value.

The intended meaning of `best_index` is therefore true immediately after initialisation.

This is not a minor coding convention. It is the foundation of the later correctness argument.

A bad initialisation would create a false statement about the processed data. For example, storing an arbitrary value such as `-1` would not identify a valid element. Storing a separate maximum value of `0` would be wrong for lists containing only negative values.

> A good initial value is not chosen because it is common or convenient. It is chosen because it makes the state meaning true before repeated processing begins.

---

## 7. Derive the update rule from the requirement

Assume `best_index` correctly identifies the first greatest value among the elements already processed.

Now we inspect a new element at position `index`.

There are three logical possibilities.

### The current value is greater

```python
values[index] > values[best_index]
```

Then the old candidate is no longer greatest. The new element must become the best candidate:

```python
best_index = index
```

### The current value is smaller

Then the old candidate remains greatest, so no update is needed.

### The current value is equal

The current element is also a maximum, but it appears later. Because the problem asks for the **first** occurrence, the old index must be preserved.

This is why the comparison must be strict:

```python
>
```

not:

```python
>=
```

One symbol expresses an important semantic choice.

Using `>=` would solve a related problem:

> Return the index of the last occurrence of the greatest value.

The code difference is tiny. The problem difference is real.

---

## 8. Write the algorithm in structured language

Before Python, we can describe the complete method clearly.

1. Reject the input if the list is empty.
2. Treat index `0` as the first greatest index among the processed elements.
3. Examine the remaining indices from left to right.
4. When the current value is strictly greater than the value at the remembered index, replace the remembered index.
5. When the current value is equal or smaller, keep the remembered index unchanged.
6. After all elements have been examined, return the remembered index.

This description already contains the algorithm. Python will only make it executable.

---

## 9. Translate the design into Python

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

Each line corresponds to a previous design decision.

The validation:

```python
if not values:
    raise ValueError("values must not be empty")
```

implements the chosen failure behaviour.

The initialisation:

```python
best_index = 0
```

establishes the state meaning for the first element.

The loop:

```python
for index in range(1, len(values)):
```

starts at `1` because index `0` has already been incorporated into the initial state.

The strict comparison:

```python
values[index] > values[best_index]
```

preserves the earliest occurrence when equal maxima appear.

The return statement:

```python
return best_index
```

produces the required output once every element has been processed.

The code is short because the reasoning has already been done.

---

## 10. Trace the algorithm by hand

Use:

```text
values = [4, 9, 2, 9, 5]
```

| Stage | Current index | Current value | `best_index` before | Best value before | Decision | `best_index` after |
|---|---:|---:|---:|---:|---|---:|
| Initialisation | 0 | 4 | — | — | first element establishes initial state | 0 |
| Iteration 1 | 1 | 9 | 0 | 4 | `9 > 4`, update | 1 |
| Iteration 2 | 2 | 2 | 1 | 9 | `2 > 9` is false | 1 |
| Iteration 3 | 3 | 9 | 1 | 9 | equality, preserve first occurrence | 1 |
| Iteration 4 | 4 | 5 | 1 | 9 | `5 > 9` is false | 1 |

The function returns:

```text
1
```

The trace is valuable because it makes the effect of equality visible. At index `3`, the current value equals the best value, but `best_index` remains `1`.

### Trace the boundary case

For:

```text
values = [8]
```

`best_index` becomes `0`, and the loop has no iterations because:

```python
range(1, 1)
```

is empty. The function returns `0`, which is correct.

The absence of loop iterations is not a special failure. It is the natural behaviour for the smallest valid input.

---

## 11. Build tests from the requirements

The earlier examples now become deliberate tests.

```python
def test_first_index_of_maximum() -> None:
    assert first_index_of_maximum([4, 9, 2, 7]) == 1
    assert first_index_of_maximum([4, 9, 2, 9]) == 1
    assert first_index_of_maximum([5, 5, 5]) == 0
    assert first_index_of_maximum([8]) == 0
    assert first_index_of_maximum([-3, -7, -1]) == 2
```

We also test invalid input:

```python
try:
    first_index_of_maximum([])
except ValueError:
    pass
else:
    raise AssertionError("empty input should be rejected")
```

Each test has a purpose:

- ordinary behaviour;
- repeated maximum;
- complete equality;
- smallest valid input;
- negative values;
- invalid input.

A long random test suite can be useful, but a small set of well-chosen tests often reveals more about the intended behaviour than many repetitive cases.

Testing does not prove correctness. It checks selected executions. The next step explains why the method works for every valid input.

---

## 12. Explain correctness using the meaning of the state

The central claim is:

> After processing the prefix ending just before the current iteration, `best_index` is the index of the first greatest value in that processed prefix.

This claim connects the changing program state to the final requirement.

### Initialisation

Before the loop, only `values[0]` is treated as processed.

A one-element prefix has one greatest value, located at index `0`. Therefore:

```python
best_index = 0
```

makes the claim true.

### Preservation

Assume the claim is true before processing `values[index]`.

There are three cases.

1. **The current value is greater than the previous best.**  
   Then the current value becomes the unique greatest value in the larger prefix, so assigning `best_index = index` makes the claim true again.

2. **The current value is smaller.**  
   The previous greatest value remains greatest, so leaving `best_index` unchanged preserves the claim.

3. **The current value is equal to the previous best.**  
   The current value is also greatest, but it appears later. Keeping the previous index preserves the first occurrence.

Therefore the claim remains true after every iteration.

### Completion

When the loop finishes, the processed prefix is the entire list.

The claim therefore tells us that `best_index` is the index of the first greatest value in the complete input. Returning it satisfies the specification.

This is an informal loop-invariant argument. Later modules will formalise this style of reasoning.

---

## 13. Explain why the algorithm terminates

Correctness and termination are different obligations.

The loop iterates over:

```python
range(1, len(values))
```

The list is finite, so this range contains a finite number of indices. Each iteration processes exactly one new index, and no index is repeated.

Therefore the loop eventually exhausts the range and terminates.

For this example the argument is simple. The habit is still important. In later chapters, especially with `while` loops, recursion, graph traversal, and backtracking, termination may require a more careful measure of progress.

---

## 14. Analyse the cost

Let:

```text
n = len(values)
```

The algorithm inspects the first element during initialisation and then examines the remaining `n - 1` elements in the loop.

Under the introductory cost model:

- indexing a Python list is treated as constant time;
- comparing two integers is treated as constant time;
- assigning an integer index is treated as constant time.

The total number of loop iterations grows proportionally to `n`, so:

```text
Time complexity: O(n)
```

The algorithm stores only a small fixed amount of additional information:

- `best_index`;
- `index`;
- temporary values used by evaluation.

Therefore:

```text
Auxiliary space: O(1)
```

The input list is neither copied nor modified.

### Can we do asymptotically better?

For unrestricted input, every element may need to be inspected. An unexamined final element could be larger than all previous values. Therefore a correct general algorithm cannot safely stop before obtaining enough information about the entire list.

This observation does not yet constitute a formal lower-bound proof, but it explains why linear scanning is the natural optimal strategy for this problem.

---

## 15. Diagnose a solution that almost works

Consider:

```python
def first_index_of_maximum(values: list[int]) -> int:
    if not values:
        raise ValueError("values must not be empty")

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

It does not fail to find a maximum. It fails to preserve the first occurrence.

The implementation is correct for a different specification:

> Return the index of the last occurrence of the greatest value.

This illustrates a general lesson:

> A program may be internally consistent and still be wrong because it solves a nearby problem rather than the stated one.

When diagnosing an algorithm, do not ask only whether the output “looks reasonable.” Ask whether it satisfies every part of the specification.

---

## 16. Improve the design after feedback

Suppose a reviewer says:

> The function works, but the requirement has changed. We now need both the first maximum index and the number of times the maximum occurs.

The original state is no longer sufficient. `best_index` tells us where the first maximum occurs, but not how many times it appears.

We must extend the state:

```text
best_index = index of the first greatest value among processed elements
count = number of occurrences of that greatest value among processed elements
```

The update logic now has two important cases:

- when a strictly greater value appears, set `best_index` to the new index and reset `count` to `1`;
- when an equal value appears, keep `best_index` and increase `count`.

This example shows what it means to improve a solution based on changed requirements or feedback. We do not patch the code blindly. We reconsider the state meaning and derive new updates from the revised specification.

That skill is explicitly important in the course: a good algorithm designer must be able to explain what changed, why the previous state was insufficient, and how the new design restores correctness.

---

## 17. A reusable workflow for small algorithmic problems

The exact details vary, but the following sequence is reliable.

### 1. Clarify the task

Rewrite the problem in your own words. Identify words that constrain the result: first, last, all, any, sorted, distinct, non-empty, stable, in place.

### 2. Define the interface

State the input, valid domain, output, indexing convention, side effects, and failure behaviour.

### 3. Build examples

Include ordinary cases, smallest valid cases, repeated values, negative values where relevant, and invalid input.

### 4. Choose the state

Write a sentence describing the meaning of every important variable.

### 5. Justify initialisation

Explain why the state meaning is already true before repeated processing begins.

### 6. Derive updates

For each possible case, explain how the update preserves the intended meaning.

### 7. Describe the algorithm before coding

Use structured natural language or pseudocode.

### 8. Implement in Python

Translate the existing design. Do not let syntax make new hidden decisions.

### 9. Trace and test

Follow the changing state manually and test cases chosen from the specification.

### 10. Explain correctness and termination

Show why the state meaning leads to the required result and why the process cannot continue forever.

### 11. Analyse complexity

Define the input size, identify repeated operations, and estimate time and auxiliary memory.

### 12. Revise when requirements change

Update the specification and state meaning first, then update the code.

This workflow is intentionally more disciplined than immediate coding. With practice, many of its steps become faster, but they should not disappear from your reasoning.

---

## 18. What you must be able to explain

After studying this chapter, you should be able to explain:

1. why coding should not be the first step in solving a non-trivial problem;
2. how the phrase *first occurrence* changes the comparison used by the algorithm;
3. why empty input must be excluded or handled explicitly;
4. why examples should be selected before implementation;
5. what `best_index` means during execution;
6. why `best_index = 0` is a valid initialisation;
7. why `>` preserves the first maximum while `>=` selects the last;
8. how the loop invariant connects intermediate states to the final result;
9. why the algorithm terminates;
10. why the running time is `O(n)` and auxiliary space is `O(1)`;
11. how a changed requirement may force a change in the stored state;
12. how to separate a specification error, design error, and syntax error.

---

## 19. Practice

### Exercise 1 — First minimum

Design a function that returns the index of the first occurrence of the smallest value in a non-empty list.

Do not begin with code. Write:

- the input and output specification;
- boundary cases;
- the state meaning;
- initialisation;
- update cases;
- Python implementation;
- correctness argument;
- termination argument;
- complexity analysis.

### Exercise 2 — Last maximum

Change the original requirement so that the last occurrence of the maximum is returned.

Explain exactly:

- which comparison changes;
- why equality must now trigger an update;
- how the state meaning should be stated.

### Exercise 3 — Count maximum occurrences

Design a function returning the number of occurrences of the greatest value.

Identify what must happen when:

- a new greater value appears;
- an equal value appears;
- a smaller value appears.

### Exercise 4 — Return both index and value

Design a function returning a pair:

```text
(first maximum index, maximum value)
```

Decide whether both pieces of information must be stored explicitly during the scan.

### Exercise 5 — Diagnose an invalid initial state

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

Provide a counterexample, explain why the initial state is invalid, and repair the algorithm.

### Exercise 6 — Requirement change

The function must now return `None` for an empty list instead of raising an exception.

Explain which parts of the following must change:

- interface;
- output type;
- examples;
- implementation;
- correctness statement.

### Exercise 7 — Explain before coding

For the task “return the first index of a negative value, or `-1` if none exists,” write a complete design using the workflow from this chapter.

Pay particular attention to the meaning of the sentinel value `-1`.

---

## 20. Summary

Designing an algorithm is a sequence of explicit decisions.

We began with an informal task and made it precise. We identified the non-empty input requirement, the zero-based indexing convention, the absence of side effects, and the importance of the word *first*. We selected examples that exposed repeated maxima, equal values, negative numbers, the smallest valid input, and invalid input.

We then chose a state variable whose meaning directly matched the problem:

```text
best_index = the index of the first greatest value among processed elements
```

That meaning determined the initial value, the strict comparison, the update rule, the correctness argument, and the final result. Python was the final expression of the design, not the source of the design.

The central habit is this:

> Make the reasoning visible before asking the code to carry it.

The next chapter asks a different question. Even after an algorithm has been designed and tested, what evidence do we have that it really works, terminates, and uses acceptable resources?
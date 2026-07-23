# Preconditions and Postconditions

## Why an algorithm needs a contract

A program can run without being well specified. It can accept data, perform operations, and return a value even when nobody has stated clearly which inputs are valid or what the returned value is supposed to mean.

That is dangerous.

Suppose we write a function called `binary_search`. It receives a list and a target value. The function returns an index. At first glance, the purpose may seem obvious. But several questions remain unanswered:

- Must the list be sorted?
- May the list be empty?
- What should happen when the target is absent?
- If the target occurs several times, may any matching index be returned, or must it be the first one?
- May the function modify the list?
- What does a negative result mean?

Without answers, we cannot decide whether an implementation is correct. We can only observe what it happens to do.

A **contract** makes the intended relationship explicit. It separates the responsibility of the caller from the responsibility of the algorithm.

- The **precondition** describes what must be true before the algorithm starts.
- The **postcondition** describes what the algorithm guarantees after it finishes, assuming the precondition was true.

This chapter develops these ideas carefully. We will use contracts not as decorative comments, but as tools for understanding problems, designing state, choosing boundary behaviour, testing implementations, and constructing correctness arguments.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to formulate preconditions and postconditions for simple algorithms, distinguish weak and strong conditions, identify missing assumptions, separate caller and algorithm responsibilities, recognise when a specification is ambiguous, and use a contract to guide Python implementation and testing.

---

## 1. Begin with the required relationship

Consider the problem:

> Return the average of a sequence of numbers.

The sentence appears simple, but it is incomplete.

What should happen for an empty sequence? Mathematically, the arithmetic mean of no values is not defined by the ordinary formula:

\[
\operatorname{average}(x_1,\ldots,x_n)=\frac{x_1+\cdots+x_n}{n}.
\]

When `n = 0`, the denominator is zero.

We therefore need to decide whether emptiness is:

1. forbidden by the contract;
2. accepted but reported as an error;
3. accepted with a special return value;
4. handled using an application-specific convention.

Different choices produce different interfaces. The algorithm cannot decide correctly until the problem is specified.

A first contract might be:

```text
Input:
    values — a finite non-empty sequence of real numbers

Precondition:
    len(values) > 0

Postcondition:
    the returned value equals the arithmetic mean of all elements of values

Side effects:
    values is not modified
```

Now the problem is precise enough to evaluate an implementation.

---

## 2. The precondition: what may be assumed initially

A **precondition** is a logical condition that must hold before an algorithm begins.

It describes the valid initial states for which the algorithm promises correct behaviour.

For the average problem:

```text
len(values) > 0
```

is a precondition.

It is not a statement about what the program has already checked. It is a statement about the domain on which the algorithm is specified.

### Preconditions describe assumptions, not wishes

Suppose a function uses:

```python
first = values[0]
```

The code requires the sequence to contain at least one element. If the specification never states non-emptiness, then the implementation contains an unstated assumption.

Unstated assumptions are dangerous because they are easy to violate and difficult to diagnose. The caller may reasonably believe that an empty list is allowed, while the implementation silently assumes the opposite.

A precondition makes the assumption visible:

```text
values is non-empty
```

### Typical kinds of preconditions

Preconditions may describe:

- the type or structure of input data;
- the allowed range of values;
- ordering requirements;
- uniqueness requirements;
- size restrictions;
- relationships between multiple inputs;
- required properties of a data structure;
- environmental or resource assumptions.

Examples:

```text
Binary search:
    values is sorted in non-decreasing order

Division:
    denominator != 0

Square root over real numbers:
    value >= 0

Index access:
    0 <= index < len(values)

Merge of sorted sequences:
    left and right are sorted

Graph traversal from a start vertex:
    start belongs to the graph
```

Each condition identifies a boundary of valid use.

---

## 3. The postcondition: what must be true at the end

A **postcondition** is a logical condition that must hold after the algorithm terminates, provided that the precondition held before execution.

The postcondition defines the required result. It should describe meaning, not merely data type.

For the average problem, this is too weak:

```text
Postcondition:
    returns a number
```

Many incorrect implementations return a number.

A useful postcondition states the relationship between input and output:

```text
Postcondition:
    result = sum(values) / len(values)
```

This is stronger because it identifies the exact value required.

### A postcondition may describe more than a return value

An algorithm may modify a data structure instead of returning a new one.

Consider an in-place reversal:

```python
def reverse_in_place(values: list[int]) -> None:
    ...
```

A suitable contract is:

```text
Precondition:
    values is a finite list

Postcondition:
    values contains exactly the elements of its initial state,
    but in reverse order

Return value:
    None

Side effect:
    values is modified
```

The postcondition must refer to both the final and initial states. To express this clearly, we may write `old(values)` for the value before execution:

```text
values = reverse(old(values))
```

The notation `old(...)` is conceptual. It allows the specification to compare the state before and after the algorithm.

---

## 4. A contract divides responsibility

A contract creates two obligations.

### The caller's obligation

The caller must establish the precondition before invoking the algorithm.

For example, before calling binary search, the caller must provide sorted data if sortedness is part of the precondition.

### The algorithm's obligation

If the precondition holds, the algorithm must terminate and establish the postcondition.

This relationship can be written informally as:

```text
if the precondition holds before execution,
then the postcondition must hold after execution
```

Or symbolically:

\[
P \;\Rightarrow\; \text{algorithm} \;\Rightarrow\; Q,
\]

where:

- \(P\) is the precondition;
- \(Q\) is the postcondition.

This is not ordinary arithmetic notation. It expresses a reasoning pattern: valid initial states must be transformed into required final states.

### What if the precondition is false?

If the caller violates the precondition, the contract no longer promises the normal postcondition.

The implementation may:

- raise an exception;
- report an error;
- return a failure result;
- behave in an unspecified way;
- enforce the condition internally before proceeding.

The chosen behaviour should be documented. A contract should not leave failure semantics accidental.

---

## 5. Preconditions are not the same as validation

This distinction is essential.

A **precondition** belongs to the specification. It describes valid input.

**Validation** belongs to the implementation. It checks whether an input satisfies some requirement.

Consider:

```python
def average(values: list[float]) -> float:
    if not values:
        raise ValueError("values must not be empty")

    return sum(values) / len(values)
```

The precondition is still:

```text
len(values) > 0
```

The `if` statement is a runtime check enforcing that condition.

We could instead write:

```python
def average(values: list[float]) -> float:
    return sum(values) / len(values)
```

and document that callers must not pass an empty list. The contract may be the same, but the failure behaviour differs.

### Why validate at all?

Validation may be useful when:

- invalid input is likely;
- failure would otherwise be obscure;
- the function is part of a public interface;
- the cost of checking is acceptable;
- the program needs predictable error handling.

### Why not validate everything?

Validation may be expensive or redundant.

For binary search, checking whether a list is sorted requires linear time. If the main search runs in logarithmic time, validating sortedness on every call destroys the expected performance advantage.

The function may therefore document sortedness as a precondition and rely on the caller or surrounding data model to maintain it.

This illustrates a broader design decision:

> A precondition identifies required truth. Validation decides who checks it, when it is checked, and at what cost.

---

## 6. Weak and strong preconditions

Preconditions can be compared by how much they restrict valid input.

A **stronger precondition** permits fewer initial states.

A **weaker precondition** permits more initial states.

Consider two specifications for finding a maximum.

### Contract A

```text
Precondition:
    values is a non-empty list of integers
```

### Contract B

```text
Precondition:
    values is a non-empty list of positive integers
```

Contract B is stronger because every input satisfying B also satisfies A, but not every input satisfying A satisfies B.

For example:

```text
[-5, -2, -11]
```

satisfies A but not B.

### Why unnecessary strength is a problem

Suppose an algorithm works correctly for all integers, including negative values. Declaring that only positive integers are allowed unnecessarily reduces usefulness.

A good specification should not impose restrictions that the algorithm does not need.

This leads to an important design principle:

> Prefer the weakest precondition that is sufficient to guarantee the intended behaviour of the algorithm.

This does not mean accepting every imaginable input. It means avoiding arbitrary restrictions.

### A precondition may be too weak

Suppose binary search is specified with:

```text
Precondition:
    values is a finite list
```

This is too weak. Binary search relies on sorted order. Without sortedness, its decisions are not justified.

The correct precondition must include:

```text
values is sorted in non-decreasing order
```

A too-weak precondition claims correctness on inputs for which the algorithm cannot meet its postcondition.

---

## 7. Weak and strong postconditions

Postconditions can also be compared.

A **stronger postcondition** promises more.

A **weaker postcondition** promises less.

Consider the problem of locating a maximum.

### Postcondition A

```text
result is an index of a greatest element
```

### Postcondition B

```text
result is the smallest index of a greatest element
```

Postcondition B is stronger. It not only requires a maximum, but also requires the first occurrence.

For:

```text
[4, 9, 2, 9]
```

both indices `1` and `3` satisfy A, but only index `1` satisfies B.

### A postcondition may be too weak to define the intended problem

This postcondition:

```text
result occurs in values
```

is true for almost any returned input element. It does not express maximum, minimum, order, count, or position.

An implementation could return the first element for every input and still satisfy it.

A useful postcondition must distinguish correct results from plausible but wrong ones.

### A postcondition may be stronger than necessary

Suppose the task is:

> Return any index containing the target value.

Requiring the first occurrence would be a stronger promise than the problem asks for. It may force a different algorithm or prevent an otherwise valid optimisation.

A contract should promise exactly what the intended interface requires.

---

## 8. One problem, several possible contracts

Consider searching for a value in a list.

The informal task is:

> Find `target` in `values`.

This sentence supports several distinct contracts.

### Variant A: return any matching index

```text
Precondition:
    values is a finite sequence

Postcondition:
    if target occurs in values, result is an index i such that values[i] = target;
    otherwise result = -1
```

### Variant B: return the first matching index

```text
Postcondition:
    if target occurs in values, result is the smallest index i such that values[i] = target;
    otherwise result = -1
```

### Variant C: return a Boolean

```text
Postcondition:
    result is True exactly when target occurs in values
```

### Variant D: require sorted input and use binary search

```text
Precondition:
    values is sorted in non-decreasing order

Postcondition:
    if target occurs in values, result is an index i such that values[i] = target;
    otherwise result = -1
```

The English phrase “find the target” is not enough to choose among these variants.

The contract determines the problem that the implementation must solve.

---

## 9. Worked example: safe division

Let us design a contract for division.

### Informal task

> Divide `numerator` by `denominator`.

### First hidden issue

Division by zero is undefined in ordinary real arithmetic.

### Contract

```text
Input:
    numerator, denominator — real numbers

Precondition:
    denominator != 0

Postcondition:
    result * denominator = numerator

Side effects:
    none
```

We could also write:

```text
result = numerator / denominator
```

The multiplication form emphasises the relationship but assumes ordinary arithmetic behaviour.

### Python implementation with validation

```python
def divide(numerator: float, denominator: float) -> float:
    if denominator == 0:
        raise ValueError("denominator must not be zero")

    return numerator / denominator
```

### What must be tested?

Tests should be derived from the contract:

```python
assert divide(10, 2) == 5
assert divide(-9, 3) == -3
assert divide(0, 4) == 0
```

We must also verify the documented failure behaviour:

```python
try:
    divide(5, 0)
except ValueError:
    pass
else:
    raise AssertionError("division by zero should be rejected")
```

The tests are not arbitrary examples. They correspond to ordinary values, signs, zero numerator, and violation of the precondition.

---

## 10. Worked example: first index of a maximum

Consider:

```python
def first_index_of_maximum(values: list[int]) -> int:
    if not values:
        raise ValueError("values must not be empty")

    best_index = 0

    for index in range(1, len(values)):
        if values[index] > values[best_index]:
            best_index = index

    return best_index
```

A precise contract is:

```text
Precondition:
    values is a non-empty finite list of comparable integers

Postcondition:
    0 <= result < len(values)
    and values[result] >= values[j] for every valid index j
    and result is the smallest index with that property

Side effects:
    values is not modified

Failure behaviour:
    raises ValueError when values is empty
```

### Why the range condition matters

This part:

```text
0 <= result < len(values)
```

states that the result is a valid index.

Without it, a specification could accidentally permit an invalid result such as `-1`, even if another condition mentions maximum values incompletely.

### Why the minimality condition matters

This part:

```text
result is the smallest index with that property
```

expresses “first occurrence.”

The implementation uses `>` rather than `>=` precisely because the postcondition requires the smallest matching index.

The contract explains the comparison operator.

---

## 11. Specifications reveal incorrect implementations

Consider this function:

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

it returns `3`.

Does it find an index containing a maximum? Yes.

Does it satisfy the stronger postcondition requiring the smallest index? No.

The contract allows us to identify the error precisely:

> The implementation violates the minimality part of the postcondition when the maximum occurs more than once.

This explanation is better than saying only “the comparison sign is wrong.” It states which promised property fails and under what input pattern.

---

## 12. Postconditions and mutation

Algorithms that modify data require particular care because the final state must be related to the initial state.

Consider:

```python
def increment_all(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] += 1
```

A weak description is:

```text
Postcondition:
    values contains integers
```

That says almost nothing.

A meaningful postcondition is:

```text
Postcondition:
    len(values) = len(old(values))
    and for every valid index i:
        values[i] = old(values[i]) + 1
```

This states two facts:

1. the list length is unchanged;
2. each final element is exactly one greater than its original value.

It also rules out implementations that reorder elements, append new elements, or increment only part of the list.

### Frame conditions

A contract may also state what does **not** change.

For example:

```text
The function modifies only the elements of values.
No global state is changed.
```

Such statements are sometimes called frame conditions. They define the boundary of permitted side effects.

---

## 13. Contracts guide correctness arguments

A correctness argument begins with the precondition and ends with the postcondition.

For first maximum:

```text
Precondition:
    values is non-empty
```

allows us to initialise:

```python
best_index = 0
```

because index `0` exists.

The loop maintains the claim:

```text
best_index is the smallest index of a greatest value
among the elements processed so far
```

When all elements have been processed, that claim becomes the postcondition for the entire list.

The contract therefore determines the proof obligations:

- the precondition must justify the initial state;
- each step must preserve a useful property;
- the final property must imply the postcondition;
- the algorithm must terminate.

Without a clear postcondition, there is no precise target for a correctness argument.

---

## 14. Contracts guide test design

A good test suite should challenge every meaningful part of the contract.

For first maximum, the contract suggests:

### Ordinary behaviour

```text
[4, 9, 2, 7] → 1
```

### Smallest valid input

```text
[8] → 0
```

### Repeated maximum

```text
[4, 9, 2, 9] → 1
```

### All values equal

```text
[5, 5, 5] → 0
```

### Negative values

```text
[-3, -7, -1] → 2
```

### Invalid input

```text
[] → ValueError
```

Each case targets a specific part of the precondition, postcondition, or failure behaviour.

Random tests may add confidence, but a contract tells us which categories cannot be omitted.

---

## 15. Common specification mistakes

### Mistake 1: describing only types

```text
Input: list[int]
Output: int
```

This does not say what the integer means.

### Mistake 2: hiding an assumption inside the code

Using `values[0]` without stating non-emptiness leaves the domain incomplete.

### Mistake 3: writing a postcondition that almost any result satisfies

```text
result is one of the input values
```

This does not define maximum, minimum, median, or another intended relationship.

### Mistake 4: imposing unnecessary restrictions

Requiring all integers to be positive when the algorithm works for arbitrary integers makes the precondition too strong.

### Mistake 5: forgetting duplicate behaviour

“Return an index of the target” and “return the first index” are different contracts.

### Mistake 6: ignoring mutation

A function may return the right value while also modifying input unexpectedly. Side effects belong in the contract.

### Mistake 7: confusing validation with specification

An `if` statement that checks input is not a substitute for explaining why the condition matters.

### Mistake 8: omitting failure behaviour

If invalid input may occur, the interface should state whether it raises, returns a sentinel, or uses another mechanism.

---

## 16. A practical method for writing contracts

When given a problem, work through these questions.

### Step 1: identify the inputs

What values or structures enter the algorithm?

### Step 2: define the valid domain

Which inputs are meaningful? Which assumptions does the method require?

### Step 3: identify the result form

Is the result a value, index, Boolean, modified structure, or failure report?

### Step 4: define the exact relationship

What must be true between the initial input and the final result?

### Step 5: specify duplicates and boundary cases

Does the first, last, any, smallest, or largest valid result matter?

### Step 6: specify mutation

Which inputs may change? Which must remain unchanged?

### Step 7: specify failure behaviour

What happens when the precondition is violated or no ordinary result exists?

### Step 8: challenge the contract

Can a clearly wrong implementation still satisfy the wording? If yes, the postcondition is probably too weak.

### Step 9: remove unnecessary restrictions

Does the precondition forbid inputs that the intended algorithm could handle correctly?

### Step 10: derive tests and proof obligations

Which cases test each clause? Which property must remain true during execution?

---

## 17. What you must be able to explain

After studying this chapter, you should be able to explain:

1. why an algorithm cannot be judged correct without a specification;
2. what a precondition describes;
3. what a postcondition guarantees;
4. how a contract divides caller and algorithm responsibilities;
5. why preconditions and runtime validation are related but different;
6. what it means for one precondition to be stronger than another;
7. what it means for one postcondition to be stronger than another;
8. why a specification should avoid both missing assumptions and unnecessary restrictions;
9. how duplicate values change search and maximum contracts;
10. how side effects and mutation are expressed;
11. how contracts guide tests;
12. how contracts guide correctness arguments.

---

## 18. Practice

### Exercise 1 — Minimum value

Write a contract for a function that returns the smallest value in a non-empty list of integers.

State:

- the precondition;
- the postcondition;
- side effects;
- failure behaviour for an empty list.

Then explain why initialising the minimum to `0` does not satisfy the intended domain.

### Exercise 2 — First negative value

Specify a function that returns the index of the first negative element, or `-1` if no negative element exists.

Your postcondition must distinguish:

- a valid matching index;
- absence of a negative element;
- first occurrence.

### Exercise 3 — Any target versus first target

Write two postconditions for searching a list:

1. one that permits any matching index;
2. one that requires the first matching index.

Give an input on which the two contracts permit different outputs.

### Exercise 4 — Sortedness as a precondition

Explain why binary search requires sorted input.

Then discuss whether checking sortedness inside every binary-search call is desirable when performance matters.

### Exercise 5 — In-place normalisation

A function modifies a list of numbers so that every element is divided by the sum of all elements.

Write a contract that addresses:

- the requirement that the sum is not zero;
- preservation of list length;
- the relationship between every final value and its initial value;
- mutation of the input.

### Exercise 6 — Diagnose a weak contract

A student writes:

```text
Precondition:
    values is a list

Postcondition:
    returns an integer
```

for a function intended to count positive values.

Explain why the contract is too weak and replace it with a useful one.

### Exercise 7 — Remove unnecessary restrictions

A maximum-finding function works for every non-empty list of comparable values, but its precondition says:

```text
values is a non-empty list of positive integers shorter than 100 elements
```

Identify each restriction that may be unnecessary. State a weaker sufficient precondition.

### Exercise 8 — Mutation versus returned result

Compare these interfaces:

```python
def sorted_copy(values: list[int]) -> list[int]:
    ...
```

```python
def sort_in_place(values: list[int]) -> None:
    ...
```

Write a separate postcondition and side-effect description for each.

---

## 19. Summary

A precondition describes the valid initial states in which an algorithm may be used. A postcondition describes the final state or returned result that the algorithm guarantees when the precondition holds.

Together they form a contract:

```text
caller establishes the precondition
algorithm establishes the postcondition
```

A useful contract:

- states assumptions explicitly;
- defines the exact relationship between input and output;
- distinguishes ordinary results from failure behaviour;
- documents mutation and side effects;
- is strong enough to reject incorrect solutions;
- avoids restrictions the algorithm does not need;
- guides implementation, tests, and correctness reasoning.

The next chapter studies the different forms in which an algorithm may be represented. A contract tells us what an algorithm must accomplish; a representation tells us how the method is communicated.
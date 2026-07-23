# Pseudocode

## Why pseudocode exists

When we explain an algorithm directly in Python, readers may focus on syntax, library functions, type annotations, or language-specific behaviour. When we explain it only in ordinary prose, the description may be too vague to execute or analyse.

Pseudocode occupies the space between those extremes.

It is a **precise but language-independent representation of an algorithm**. Its purpose is not to compile. Its purpose is to expose the logic, state, control flow, and data operations clearly enough that the algorithm can be understood, traced, justified, and translated into a real programming language.

Good pseudocode therefore behaves like a carefully designed notation. It is not random English with indentation, and it is not Python with punctuation removed.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to read and write consistent pseudocode using assignment, expressions, conditions, loops, procedures, functions, returns, and data access; translate between pseudocode and Python; and identify pseudocode that is ambiguous, language-dependent, or logically incomplete.

---

## 1. The main objective: reveal the algorithm

Consider the problem:

> Count how many values in a finite sequence are negative.

A prose description might say:

> Go through the values and increase a counter whenever a negative value appears.

A Python implementation might be:

```python
def count_negative(values: list[int]) -> int:
    count = 0
    for value in values:
        if value < 0:
            count += 1
    return count
```

Pseudocode keeps the algorithmic structure while removing Python-specific syntax:

```text
ALGORITHM count_negative(values)
    count ← 0

    FOR EACH value IN values DO
        IF value < 0 THEN
            count ← count + 1
        END IF
    END FOR

    RETURN count
END ALGORITHM
```

The essential ideas remain visible:

- state variable `count`;
- initial value `0`;
- traversal of every input element;
- condition `value < 0`;
- update of the count;
- returned result.

---

## 2. Pseudocode needs explicit conventions

Pseudocode is not governed by one universal syntax. Different books and courses use different styles. That is acceptable only if the conventions are consistent.

This course uses the following rules.

### Assignment

```text
x ← expression
```

The left arrow means: evaluate the expression and store the result in `x`.

### Equality comparison

```text
x = y
```

The equality symbol is used in conditions, not for assignment.

### Inequality

```text
x ≠ y
x < y
x ≤ y
x > y
x ≥ y
```

### Boolean operators

```text
AND
OR
NOT
```

### Blocks

Blocks are indented and explicitly closed:

```text
IF condition THEN
    ...
END IF
```

### Indexing

Unless stated otherwise, sequences use zero-based indexing.

### Return

```text
RETURN value
```

`RETURN` ends the current function or algorithm immediately and produces the specified result.

### Comments

```text
// comment
```

Comments explain intent but do not form part of the executable method.

---

## 3. Variables and assignment

Pseudocode variables represent components of algorithm state.

```text
count ← 0
current_maximum ← values[0]
index ← index + 1
```

Assignment must not be confused with mathematical equality.

```text
index ← index + 1
```

means:

1. read the old value of `index`;
2. add one;
3. replace the old value by the result.

### Simultaneous assignment

Sometimes two values must be updated without destroying information.

A swap may be written:

```text
temporary ← left
left ← right
right ← temporary
```

Some pseudocode styles allow:

```text
(left, right) ← (right, left)
```

This course prefers the explicit temporary-variable version when teaching state changes, because it exposes the sequence of operations.

---

## 4. Expressions

Expressions produce values.

### Arithmetic expressions

```text
a + b
length * width
sum / count
value MOD 2
```

`MOD` denotes the remainder operation.

### Boolean expressions

```text
value < 0
index < length(values)
left ≤ right
values[index] = target
```

### Combined conditions

```text
index ≥ 0 AND index < length(values)
NOT found
value < minimum OR value > maximum
```

Parentheses should be used when precedence could be unclear.

```text
(valid_index AND matches) OR allow_missing
```

A precise condition is preferable to relying on assumed operator precedence.

---

## 5. Sequence

A sequence executes instructions in order.

```text
width ← 5
height ← 4
area ← width * height
RETURN area
```

Later instructions see the state created by earlier instructions.

Changing order may change the result.

```text
x ← 2
y ← x + 1
x ← 10
```

produces `y = 3`, while:

```text
x ← 2
x ← 10
y ← x + 1
```

produces `y = 11`.

Pseudocode should therefore preserve meaningful ordering explicitly.

---

## 6. Selection

Selection chooses one path based on a Boolean condition.

### One-way selection

```text
IF value < 0 THEN
    negative_count ← negative_count + 1
END IF
```

If the condition is false, the body is skipped.

### Two-way selection

```text
IF first ≥ second THEN
    maximum ← first
ELSE
    maximum ← second
END IF
```

Exactly one branch executes.

### Multi-way selection

```text
IF score ≥ 90 THEN
    grade ← "A"
ELSE IF score ≥ 80 THEN
    grade ← "B"
ELSE IF score ≥ 70 THEN
    grade ← "C"
ELSE
    grade ← "D"
END IF
```

The conditions are checked in order. The ordering matters because earlier branches may make later checks unnecessary.

### Avoid overlapping ambiguity

Suppose the specification distinguishes negative, zero, and positive values.

Clear version:

```text
IF value < 0 THEN
    category ← "negative"
ELSE IF value = 0 THEN
    category ← "zero"
ELSE
    category ← "positive"
END IF
```

The cases are mutually exclusive and exhaustive.

---

## 7. Iteration over a sequence

For-each iteration expresses traversal when the element values matter more than their indices.

```text
FOR EACH value IN values DO
    total ← total + value
END FOR
```

This means that every element is processed once in sequence order.

### When an index is needed

Use an indexed loop:

```text
FOR index ← 0 TO length(values) - 1 DO
    IF values[index] = target THEN
        RETURN index
    END IF
END FOR
```

The convention here is that both range endpoints are included.

This is why the final index is written as:

```text
length(values) - 1
```

### Empty ranges

If `length(values) = 0`, then the range from `0` to `-1` contains no indices. The loop body executes zero times.

A course or document must state such conventions explicitly because different pseudocode styles interpret ranges differently.

---

## 8. While loops

A `WHILE` loop repeats while a condition is true.

```text
WHILE index < length(values) DO
    process values[index]
    index ← index + 1
END WHILE
```

A correct while loop usually needs three elements:

1. initialisation;
2. condition;
3. progress update.

Example:

```text
index ← 0

WHILE index < length(values) DO
    IF values[index] = target THEN
        RETURN index
    END IF

    index ← index + 1
END WHILE

RETURN -1
```

### A common error: missing progress

```text
index ← 0

WHILE index < length(values) DO
    IF values[index] = target THEN
        RETURN index
    END IF
END WHILE
```

If the first element does not match, `index` never changes. The loop repeats forever.

Pseudocode must make progress visible.

---

## 9. Repeat-until loops

Some pseudocode traditions include:

```text
REPEAT
    ...
UNTIL condition
```

The body executes at least once, and repetition stops when the condition becomes true.

Example:

```text
REPEAT
    value ← read_value()
UNTIL value ≥ 0
```

This differs from:

```text
WHILE value < 0 DO
    value ← read_value()
END WHILE
```

because the `REPEAT` body is guaranteed to execute once.

This course uses `WHILE` and `FOR` as the primary loop forms unless a post-test loop clarifies the algorithm.

---

## 10. Functions and procedures

A named algorithm may return a value.

```text
FUNCTION absolute_value(number)
    IF number < 0 THEN
        RETURN -number
    ELSE
        RETURN number
    END IF
END FUNCTION
```

A procedure may perform an action without returning a meaningful value.

```text
PROCEDURE swap_first_two(values)
    temporary ← values[0]
    values[0] ← values[1]
    values[1] ← temporary
END PROCEDURE
```

The second procedure modifies its input. Its contract must make the side effect explicit.

### Parameters

Parameters represent input supplied to the named computation.

```text
FUNCTION first_index(values, target)
```

A pseudocode convention should explain whether parameters are passed by value, by reference, or abstractly. In this course, parameters are treated abstractly unless mutation is stated explicitly.

---

## 11. Returning versus printing

These are not equivalent.

```text
RETURN result
```

passes a value back to the caller.

```text
PRINT result
```

produces an output side effect.

A function that prints a number may still return no useful value. Pseudocode should preserve this distinction.

Incorrectly replacing `RETURN` with `PRINT` changes the interface.

---

## 12. Accessing sequences and records

### Sequence indexing

```text
values[index]
```

### Sequence length

```text
length(values)
```

### Record fields

```text
student.name
student.score
```

### Updating a component

```text
values[index] ← new_value
student.score ← student.score + 1
```

These operations are abstract. Later modules examine their actual memory representation and cost.

---

## 13. Sentinel values and failure

A search may return a distinguished value when no result exists.

```text
RETURN -1
```

This is valid only if `-1` cannot be confused with a successful index.

Alternative pseudocode may use:

```text
RETURN NOT_FOUND
```

or:

```text
RAISE NotFoundError
```

The failure convention belongs to the contract and should be stated before the pseudocode.

---

## 14. Full example: first index of the minimum

### Contract

```text
Input:
    values — a finite non-empty sequence of comparable values

Output:
    the smallest index of a minimum value

Side effects:
    none
```

### Pseudocode

```text
ALGORITHM first_index_of_minimum(values)
    best_index ← 0

    FOR index ← 1 TO length(values) - 1 DO
        IF values[index] < values[best_index] THEN
            best_index ← index
        END IF
    END FOR

    RETURN best_index
END ALGORITHM
```

### Why the comparison is strict

If an equal minimum appears later, the earlier index must be preserved. Therefore the condition is:

```text
<
```

not:

```text
≤
```

### Python translation

```python
def first_index_of_minimum(values: list[int]) -> int:
    if not values:
        raise ValueError("values must not be empty")

    best_index = 0

    for index in range(1, len(values)):
        if values[index] < values[best_index]:
            best_index = index

    return best_index
```

The pseudocode and Python preserve the same algorithmic state and update rule.

---

## 15. Full example: counting a range

Problem:

> Count how many elements satisfy `lower ≤ value ≤ upper`.

### Pseudocode

```text
ALGORITHM count_in_range(values, lower, upper)
    count ← 0

    FOR EACH value IN values DO
        IF lower ≤ value AND value ≤ upper THEN
            count ← count + 1
        END IF
    END FOR

    RETURN count
END ALGORITHM
```

### Python

```python
def count_in_range(values: list[int], lower: int, upper: int) -> int:
    count = 0

    for value in values:
        if lower <= value <= upper:
            count += 1

    return count
```

Python allows chained comparison syntax. The pseudocode writes the logical conjunction explicitly.

This is a useful reminder: translation need not be character-for-character. It must preserve meaning.

---

## 16. Full example: in-place reversal

Problem:

> Reverse a finite sequence in place.

### Contract

```text
Precondition:
    values is a finite mutable sequence

Postcondition:
    for every valid index i,
    values[i] equals old(values[length(values) - 1 - i])

Side effects:
    values is modified
```

### Pseudocode

```text
ALGORITHM reverse_in_place(values)
    left ← 0
    right ← length(values) - 1

    WHILE left < right DO
        temporary ← values[left]
        values[left] ← values[right]
        values[right] ← temporary

        left ← left + 1
        right ← right - 1
    END WHILE
END ALGORITHM
```

The pseudocode exposes:

- two boundary indices;
- one swap per iteration;
- inward progress;
- termination when the indices meet or cross.

The detailed correctness argument belongs to later chapters, but the representation already supports it.

---

## 17. Common pseudocode mistakes

### Mistake 1: mixing assignment and equality

Ambiguous:

```text
x = x + 1
```

Preferred:

```text
x ← x + 1
```

### Mistake 2: using undefined operations

```text
make the list efficient
```

The action has no precise meaning.

### Mistake 3: hiding a complex algorithm in one verb

```text
sort values optimally
```

This avoids describing the actual method.

### Mistake 4: language-dependent syntax

```text
for i in range(len(values)):
```

This is Python syntax.

### Mistake 5: unclear range boundaries

```text
FOR i FROM 0 TO n
```

Does this execute `n` or `n + 1` times? The convention must be stated.

### Mistake 6: omitting the failure path

A search that only shows what happens when the target is found is incomplete.

### Mistake 7: writing comments instead of operations

```text
// somehow find the correct index
```

A comment cannot replace the algorithm.

---

## 18. Translating pseudocode into Python

Use the following method.

### Step 1: preserve the contract

Do not change the input domain, result, failure behaviour, or side effects accidentally.

### Step 2: map state variables

Every important pseudocode variable should have a clear Python counterpart.

### Step 3: map control structures

- `IF` → `if`;
- `ELSE` → `else`;
- `FOR EACH` → Python `for`;
- indexed `FOR` → `range`;
- `WHILE` → `while`;
- `RETURN` → `return`.

### Step 4: check boundary conventions

An inclusive pseudocode range may require a different Python endpoint because `range` excludes its stop argument.

Pseudocode:

```text
FOR index ← 1 TO n - 1 DO
```

Python:

```python
for index in range(1, n):
```

### Step 5: account for language semantics

Ask whether operations copy, mutate, allocate, or raise exceptions in Python.

### Step 6: test the translation against traces

The same input should produce the same state progression and result.

---

## 19. What you must be able to explain

After this chapter, you should be able to:

- explain the purpose of pseudocode;
- use assignment and equality consistently;
- write sequence, selection, and iteration;
- distinguish `FOR EACH`, indexed `FOR`, and `WHILE`;
- write functions, procedures, and returns;
- distinguish returned results from side effects;
- state indexing and range conventions;
- translate pseudocode into Python without changing the contract;
- identify ambiguous or language-specific pseudocode.

---

## 20. Practice

### Exercise 1 — Translate to pseudocode

Write pseudocode for a Python function that returns the sum of positive values.

### Exercise 2 — Translate to Python

Translate:

```text
ALGORITHM contains_zero(values)
    FOR EACH value IN values DO
        IF value = 0 THEN
            RETURN TRUE
        END IF
    END FOR

    RETURN FALSE
END ALGORITHM
```

### Exercise 3 — Repair the loop

Find and fix the error:

```text
index ← 0
WHILE index < length(values) DO
    PRINT values[index]
END WHILE
```

### Exercise 4 — First versus last occurrence

Write pseudocode for both:

- first index of a target;
- last index of a target.

Explain how control flow or update rules differ.

### Exercise 5 — In-place update

Write a contract and pseudocode for adding one to every element of a mutable sequence.

### Exercise 6 — Range conventions

Explain how the pseudocode loop:

```text
FOR i ← 0 TO n - 1 DO
```

translates to Python and C++.

### Exercise 7 — Ambiguity audit

Rewrite this as precise pseudocode:

> Look through the values until something interesting appears; otherwise stop at the end.

First define what “interesting” means and what result is required.

---

## 21. Summary

Pseudocode is a disciplined representation of an algorithm. It removes unnecessary programming-language syntax while preserving the state, conditions, updates, control flow, and results needed for understanding and reasoning.

Good pseudocode is:

- consistent;
- precise;
- explicit about assignment;
- clear about ranges and indexing;
- independent of one programming language;
- complete on success and failure paths;
- suitable for tracing and translation.

The next chapter shows how sequence, selection, iteration, and decomposition can be combined systematically to structure larger algorithms.
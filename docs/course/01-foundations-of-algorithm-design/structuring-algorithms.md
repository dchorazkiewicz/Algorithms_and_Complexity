# Structuring Algorithms

## Why structure matters

A correct idea can become difficult to understand when it is expressed as a long, tangled sequence of instructions. The problem is not only aesthetic. Poor structure makes it harder to see what the algorithm is doing, harder to test individual parts, harder to reason about correctness, and easier to introduce hidden interactions between variables.

Structured algorithm design addresses this problem by building solutions from a small number of well-understood forms:

- **sequence** — perform steps in order;
- **selection** — choose among alternatives;
- **iteration** — repeat a block;
- **decomposition** — divide a larger task into named subproblems.

These forms are sufficient to express a very large class of algorithms. Their value comes from predictability. Each has a clear entry, a clear exit, and a clear role in the reasoning.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to design a small algorithm using sequence, selection, iteration, and decomposition; explain how state moves through each structure; recognise unnecessary nesting and duplicated logic; and refactor a monolithic procedure into smaller parts with explicit responsibilities.

---

## 1. Start from the problem, not from the control structure

Control structures are tools. They should be chosen because the problem requires a certain form of reasoning.

Consider the task:

> Given a finite sequence of integers, return the sum of the positive values and the number of negative values.

The requirements suggest:

- every value must be examined;
- positive and negative values require different actions;
- two independent summaries must be maintained;
- zero contributes to neither result.

From those requirements, the structure follows naturally:

1. initialise two state variables;
2. iterate through the sequence;
3. select one of the relevant cases;
4. update the corresponding state;
5. return both results.

We do not begin by deciding “I want a loop.” We identify repeated work, then choose iteration.

---

## 2. Sequence: state changes in order

A **sequence** executes instructions one after another.

```text
positive_sum ← 0
negative_count ← 0
```

The order of these two assignments does not matter because they are independent.

Now consider:

```text
average ← total / count
RETURN average
```

Here the order matters. `average` must be computed before it can be returned.

### Data dependencies

A later instruction may depend on state produced earlier.

```text
width ← 5
height ← 4
area ← width * height
```

The final assignment depends on both earlier assignments.

A useful question is:

> Which values must already exist before this instruction can execute correctly?

This reveals the data dependency structure of the sequence.

### Accidental order dependencies

Poorly designed code sometimes creates unnecessary dependencies through reused variables.

```python
result = width * height
result = result + border
result = result * price_per_unit
```

The same variable represents three different meanings over time. The code may be correct, but reasoning is harder.

Clearer version:

```python
area = width * height
area_with_border = area + border
cost = area_with_border * price_per_unit
```

Structure includes naming state so that each stage has a visible meaning.

---

## 3. Selection: express distinct logical cases

A **selection** chooses which instructions execute based on a condition.

For the motivating task:

```text
IF value > 0 THEN
    positive_sum ← positive_sum + value
ELSE IF value < 0 THEN
    negative_count ← negative_count + 1
END IF
```

Zero causes no update.

### Conditions should come from the specification

The cases are not arbitrary. They correspond to three mathematical categories:

```text
value > 0
value < 0
value = 0
```

The first two require actions. The third requires none.

### Exhaustive and mutually exclusive cases

Good case analysis asks:

- Do the cases cover every valid possibility?
- Can more than one case apply at the same time?

For sign classification:

```text
value < 0
value = 0
value > 0
```

The cases are mutually exclusive and exhaustive.

### Independent conditions versus exclusive branches

Compare:

```python
if value > 0:
    positive_count += 1

if value % 2 == 0:
    even_count += 1
```

A value may be both positive and even, so two independent `if` statements are appropriate.

By contrast:

```python
if value < 0:
    category = "negative"
elif value == 0:
    category = "zero"
else:
    category = "positive"
```

Only one category applies, so an exclusive chain is appropriate.

Using `elif` where conditions are not exclusive can silently skip required actions.

---

## 4. Iteration: repeat one meaningful step

Iteration is appropriate when the same logical operation must be applied repeatedly.

```text
FOR EACH value IN values DO
    ...
END FOR
```

The loop should have a clear interpretation.

For our task:

```text
After processing a prefix of the sequence:
    positive_sum is the sum of positive values in that prefix
    negative_count is the number of negative values in that prefix
```

Each iteration extends the processed prefix by one element while preserving those meanings.

### The loop body should represent one unit of progress

A good loop body answers:

> What changes when one additional element is processed?

For the current value:

- if positive, add it to `positive_sum`;
- if negative, increment `negative_count`;
- if zero, change nothing.

### Full pseudocode

```text
ALGORITHM summarise_signs(values)
    positive_sum ← 0
    negative_count ← 0

    FOR EACH value IN values DO
        IF value > 0 THEN
            positive_sum ← positive_sum + value
        ELSE IF value < 0 THEN
            negative_count ← negative_count + 1
        END IF
    END FOR

    RETURN (positive_sum, negative_count)
END ALGORITHM
```

### Python implementation

```python
def summarise_signs(values: list[int]) -> tuple[int, int]:
    positive_sum = 0
    negative_count = 0

    for value in values:
        if value > 0:
            positive_sum += value
        elif value < 0:
            negative_count += 1

    return positive_sum, negative_count
```

The implementation mirrors the conceptual structure directly.

---

## 5. While loops and explicit progress

A `for` loop is useful when the iteration set is known. A `while` loop is useful when repetition continues until a condition changes.

Example:

> Repeatedly divide a positive integer by two using integer division until it becomes zero, and count the steps.

```python
def halving_steps(number: int) -> int:
    if number <= 0:
        raise ValueError("number must be positive")

    steps = 0

    while number > 0:
        number //= 2
        steps += 1

    return steps
```

The loop structure contains:

- initial state: positive `number`, `steps = 0`;
- continuation condition: `number > 0`;
- progress: integer division reduces `number`;
- bound: `number` cannot remain a positive integer forever while being halved;
- final meaning: `steps` counts the performed reductions.

### A while loop must expose progress

Bad structure:

```python
while number > 0:
    steps += 1
```

The condition depends on `number`, but `number` never changes. The loop does not progress.

When reading a `while` loop, identify which statement moves the state toward termination.

---

## 6. Nesting structures

Algorithms often combine sequence, selection, and iteration.

Example:

> For every row of a matrix, count how many values are negative.

```python
def negative_counts(rows: list[list[int]]) -> list[int]:
    result: list[int] = []

    for row in rows:
        count = 0

        for value in row:
            if value < 0:
                count += 1

        result.append(count)

    return result
```

Structure:

```text
outer iteration over rows
    initialise one row count
    inner iteration over values
        selection for negative values
    store row result
```

### Nesting should reflect problem hierarchy

The outer loop corresponds to rows. The inner loop corresponds to values within one row. The nesting is meaningful because the data itself is nested.

### Unnecessary nesting

Poor version:

```python
if values:
    for value in values:
        if value > 0:
            if value % 2 == 0:
                result.append(value)
```

The logic may be flattened:

```python
for value in values:
    if value > 0 and value % 2 == 0:
        result.append(value)
```

The clearer form depends on whether the separate conditions have distinct conceptual roles. Nesting should reveal logic, not merely accumulate indentation.

---

## 7. Decomposition: divide the problem into named responsibilities

A large algorithm becomes easier to understand when it is divided into smaller functions or procedures.

Suppose we need to process student scores:

1. validate that every score is between `0` and `100`;
2. compute the average;
3. determine whether the average is passing;
4. return a summary.

Monolithic version:

```python
def build_summary(scores: list[float]) -> dict[str, object]:
    if not scores:
        raise ValueError("scores must not be empty")

    for score in scores:
        if score < 0 or score > 100:
            raise ValueError("score out of range")

    total = 0.0
    for score in scores:
        total += score

    average = total / len(scores)

    if average >= 50:
        passed = True
    else:
        passed = False

    return {"average": average, "passed": passed}
```

This is understandable, but several responsibilities are mixed.

Decomposed version:

```python
def validate_scores(scores: list[float]) -> None:
    if not scores:
        raise ValueError("scores must not be empty")

    for score in scores:
        if score < 0 or score > 100:
            raise ValueError("score out of range")


def average(scores: list[float]) -> float:
    total = 0.0
    for score in scores:
        total += score
    return total / len(scores)


def has_passed(average_score: float) -> bool:
    return average_score >= 50


def build_summary(scores: list[float]) -> dict[str, object]:
    validate_scores(scores)
    average_score = average(scores)

    return {
        "average": average_score,
        "passed": has_passed(average_score),
    }
```

### Benefits of decomposition

Each function now has:

- one primary responsibility;
- a smaller contract;
- fewer state variables;
- simpler tests;
- a clearer correctness argument;
- potential reuse.

### Decomposition is not fragmentation

Too many tiny functions can also harm readability.

A function should represent a meaningful operation or decision. Creating a separate function for every arithmetic expression adds indirection without clarifying the design.

Useful question:

> Does this part have a coherent responsibility that can be named and specified independently?

---

## 8. Contracts connect decomposed parts

When one function calls another, the caller relies on the callee's contract.

```python
average_score = average(scores)
```

The caller needs to know:

- whether `scores` may be empty;
- whether the function modifies `scores`;
- what value is returned;
- what errors may occur.

Decomposition works well only when interfaces are explicit.

A large proof can then be organised compositionally:

1. validation establishes the precondition for `average`;
2. `average` guarantees a valid mean;
3. `has_passed` classifies the mean;
4. `build_summary` combines the guaranteed results.

This is one reason modularity supports correctness.

---

## 9. Avoid duplicated logic

Duplication creates multiple places where the same rule must remain consistent.

Bad example:

```python
if score >= 50:
    print("pass")

# later
if score > 50:
    save_result("pass")
```

The two conditions differ. One treats `50` as passing, the other does not.

Better:

```python
def has_passed(score: float) -> bool:
    return score >= 50
```

Then both uses depend on one definition.

### Duplication can hide semantic drift

Two blocks may begin identical and later evolve differently. Centralising a meaningful rule reduces that risk.

Do not remove duplication mechanically. Extract shared logic when the duplicated code represents the same concept.

---

## 10. Guard clauses and early return

A **guard clause** handles a special or invalid case early.

Nested version:

```python
def first_value(values: list[int]) -> int:
    if values:
        return values[0]
    else:
        raise ValueError("values must not be empty")
```

Guard-clause version:

```python
def first_value(values: list[int]) -> int:
    if not values:
        raise ValueError("values must not be empty")

    return values[0]
```

The second version separates failure from the main path and reduces nesting.

### Early return in search

```python
def contains(values: list[int], target: int) -> bool:
    for value in values:
        if value == target:
            return True

    return False
```

The algorithm stops as soon as the answer is known.

### Early return versus single exit

Multiple returns can improve clarity when they correspond to decisive outcomes. They can also make reasoning harder if scattered unpredictably through a large procedure.

Use early return when it clarifies the contract and control flow.

---

## 11. State locality

State should exist in the smallest scope that needs it.

Bad design:

```python
count = 0


def count_positive(values: list[int]) -> int:
    global count
    count = 0

    for value in values:
        if value > 0:
            count += 1

    return count
```

The result depends on global mutable state.

Better:

```python
def count_positive(values: list[int]) -> int:
    count = 0

    for value in values:
        if value > 0:
            count += 1

    return count
```

Local state:

- is easier to reason about;
- avoids interference between calls;
- makes the function easier to test;
- reduces side effects.

Module 05 develops side effects and function interaction with the environment in greater depth.

---

## 12. Refactoring a poorly structured algorithm

Task:

> Return the average of non-negative values, or `None` if no non-negative value exists.

Poor version:

```python
def average_non_negative(values: list[int]) -> float | None:
    result = 0
    x = 0
    for y in values:
        if y >= 0:
            result = result + y
            x = x + 1
    if x == 0:
        return None
    else:
        return result / x
```

The algorithm is correct, but naming and structure are weak.

Improved version:

```python
def average_non_negative(values: list[int]) -> float | None:
    total = 0
    count = 0

    for value in values:
        if value >= 0:
            total += value
            count += 1

    if count == 0:
        return None

    return total / count
```

Improvements:

- names expose state meanings;
- initialisation is grouped;
- the loop body expresses one case;
- the no-result case is handled by a guard clause;
- the main return is visually clear.

### Further decomposition?

A separate function is not necessary unless the filtering or averaging rule needs independent reuse or testing.

Refactoring should improve conceptual structure, not maximise function count.

---

## 13. Structure and correctness reasoning

Structured code supports structured reasoning.

### Sequence

Show that each step establishes what the next step requires.

### Selection

Show that every possible case is covered and that each branch establishes the required condition.

### Iteration

Show:

- initialisation;
- invariant preservation;
- progress;
- termination;
- postcondition at completion.

### Decomposition

Use the contracts of smaller functions to justify the larger function.

This correspondence is one of the main reasons structured programming matters in algorithmics.

---

## 14. Structure and complexity

Structure also guides cost analysis.

### Sequence

Costs add:

```text
O(n) + O(n) = O(n)
```

### Selection

For worst-case analysis, consider the more expensive branch.

### Iteration

Multiply the number of iterations by the cost of the body, then account for changing body costs when necessary.

### Nested iteration

Two nested loops over `n` elements often suggest `O(n²)`, but only if the inner loop executes `n` times for each outer iteration.

### Function calls

Include the cost of called functions. A one-line call may hide substantial work.

Structure does not automatically determine complexity, but it provides the skeleton of the analysis.

---

## 15. Common structural mistakes

### Mixing unrelated responsibilities

One function validates input, reads files, transforms data, prints results, and updates global state.

### Excessive nesting

Deeply nested branches make the main path difficult to see.

### Unclear loop state

Variables change, but their intended meanings are not stated.

### Repeated conditions

The same business or mathematical rule appears in multiple places with slight differences.

### Hidden side effects

A helper function modifies input even though its name suggests a calculation.

### Premature decomposition

Every tiny expression becomes a separate function, making the algorithm fragmented.

### Control structure chosen before the problem is understood

The author forces recursion, a loop, or a library operation without first deriving the need from the specification.

---

## 16. A practical structuring workflow

For a new algorithm:

1. write the contract;
2. identify the main states or phases;
3. place dependent steps in sequence;
4. identify genuinely different cases;
5. identify repeated work and its progress measure;
6. assign a precise meaning to each persistent state variable;
7. extract coherent subproblems into functions;
8. make side effects visible;
9. remove duplicated rules;
10. trace the structured algorithm;
11. justify each structure;
12. analyse cost by following the structure.

---

## 17. What you must be able to explain

After this chapter, you should be able to:

- derive sequence, selection, and iteration from problem requirements;
- distinguish exclusive and independent conditions;
- state the meaning of loop state;
- identify progress in a while loop;
- explain when nesting reflects data structure and when it obscures logic;
- decompose a task into meaningful functions;
- connect function contracts during composition;
- use guard clauses and early returns deliberately;
- keep state local;
- refactor a monolithic algorithm without changing its behaviour;
- use structure to support correctness and complexity analysis.

---

## 18. Practice

### Exercise 1 — Derive the structure

Design an algorithm that returns:

- the number of even values;
- the sum of odd values.

State why iteration and selection are needed.

### Exercise 2 — Exclusive or independent?

For each pair of conditions, decide whether to use two independent `if` statements or an `if`/`elif` chain:

1. value is positive; value is even;
2. score is below 50; score is at least 50;
3. record is invalid; record should be logged;
4. number is negative; number is zero; number is positive.

### Exercise 3 — Refactor nesting

Rewrite:

```python
def collect(values: list[int]) -> list[int]:
    result = []
    if values:
        for value in values:
            if value >= 0:
                if value % 2 == 0:
                    result.append(value)
    return result
```

Explain every structural change.

### Exercise 4 — Decompose a task

Design a program that validates temperatures, computes minimum and maximum, and formats a report. Propose meaningful function boundaries and contracts.

### Exercise 5 — Find the progress measure

For each loop, identify what changes and why termination follows:

- scanning an array by increasing index;
- repeatedly dividing a positive integer by two;
- moving `left` upward and `right` downward;
- removing one item from a queue each iteration.

### Exercise 6 — Detect duplicated logic

Write two examples where duplicated conditions may drift apart. Refactor each into one named rule.

### Exercise 7 — Structure a proof

For `average_non_negative`, state:

- the loop invariant;
- the completion argument;
- the no-result case;
- time and auxiliary-space complexity.

---

## 19. Summary

Structured algorithms are built from sequence, selection, iteration, and decomposition. These are not merely programming-language constructs. They are reasoning forms.

Sequence expresses dependency. Selection expresses cases. Iteration expresses repeated progress. Decomposition expresses responsibility and composition.

Good structure makes state meanings visible, isolates side effects, reduces duplication, supports testing, clarifies correctness, and guides complexity analysis.

The next chapter combines the complete Module 01 toolkit—contracts, representations, properties, pseudocode, and structure—in fully worked examples.
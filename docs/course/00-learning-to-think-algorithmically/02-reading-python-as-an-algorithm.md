# Reading Python as an Algorithm

## 1. Code is a description of a process

Beginners often read code by naming its syntax:

- “this is a `for` loop”;
- “this is an `if` statement”;
- “this line returns a value.”

Those observations are not wrong, but they are incomplete. To understand an algorithm, you must explain what information is stored, how that information changes, and what fact each variable is intended to represent.

Consider the following function:

```python
def count_positive(values: list[int]) -> int:
    count = 0

    for value in values:
        if value > 0:
            count = count + 1

    return count
```

A syntax-only reading says that the function creates a variable, loops through a list, tests a condition, increments a counter, and returns it.

An algorithmic reading says something stronger:

> The function scans every input value exactly once. The variable `count` stores how many positive values have been encountered so far. Each time a positive value is encountered, the stored count is increased by one. When no values remain, the stored count is the number of positive elements in the entire input.

The second explanation tells us what the algorithm means.

## 2. Start with the interface

Before reading the function body, inspect its interface:

```python
def count_positive(values: list[int]) -> int:
```

This line tells us:

- the function is named `count_positive`;
- it receives one parameter called `values`;
- the annotation suggests that `values` is a list of integers;
- the annotation after `->` suggests that the function returns an integer.

Type annotations improve readability, but Python does not automatically enforce all of them at runtime. They communicate the intended interface.

The interface does not yet tell us whether the input list is modified. We must inspect the body or read the function documentation. In this case the function only reads the elements, so the input is unchanged.

## 3. Identify the state

The **state** is the information whose current value matters during execution.

For this function, the important state is:

- `values` — the complete input sequence;
- `value` — the element currently being processed;
- `count` — the number of positive elements processed so far;
- the implicit loop position — how many elements have already been processed.

The most important state variable is `count` because it carries information from one iteration to the next.

### State variables have meanings

A variable name is useful, but the name alone is not a complete explanation. We should state the intended meaning explicitly:

```text
count = the number of positive elements among the values processed so far
```

This statement is more important than the fact that `count` currently stores an integer.

When we later reason about correctness, we will ask whether every update preserves that meaning.

## 4. Read initialisation as a claim

The function begins with:

```python
count = 0
```

Why zero?

Before the loop begins, no input values have been processed. Among zero processed values, the number of positive values is zero. Therefore the initial value agrees with the intended meaning of `count`.

This is a general design principle:

> Initialisation should make the variable's intended meaning true before repeated processing begins.

A wrong initialisation would make later reasoning impossible.

For example:

```python
count = 1
```

would already claim that one positive value had been encountered before any value was processed.

## 5. Read the loop as repeated extension of knowledge

The loop is:

```python
for value in values:
```

Conceptually, this means:

1. choose the next unprocessed element;
2. store it temporarily in `value`;
3. execute the loop body;
4. continue until every element has been processed.

The loop is not merely repetition. Each iteration extends the processed prefix of the input by one element.

Before an iteration, suppose `count` correctly describes the already processed elements. The current element creates two cases.

### Case 1: the value is positive

```python
if value > 0:
    count = count + 1
```

The newly processed element contributes one additional positive value, so increasing the count preserves its meaning.

### Case 2: the value is not positive

The `if` body is skipped. The newly processed element contributes no positive value, so leaving `count` unchanged preserves its meaning.

This case-based explanation is the reason the update is correct.

## 6. Trace the execution

Use the input:

```text
[-3, 5, 0, 8, -1]
```

The execution can be traced as follows:

| Iteration | Current `value` | Is `value > 0`? | `count` before | `count` after |
|---:|---:|:---:|---:|---:|
| Initial | — | — | — | 0 |
| 1 | -3 | No | 0 | 0 |
| 2 | 5 | Yes | 0 | 1 |
| 3 | 0 | No | 1 | 1 |
| 4 | 8 | Yes | 1 | 2 |
| 5 | -1 | No | 2 | 2 |

The function returns `2`.

### Why zero is not positive

The condition is:

```python
value > 0
```

not:

```python
value >= 0
```

This detail expresses the mathematical definition chosen by the problem. A small change in a condition may change the problem being solved.

## 7. Distinguish expressions from statements

An **expression** is evaluated to produce a value.

Examples from the function:

```python
value > 0
count + 1
```

The first expression produces a Boolean value. The second produces an integer.

A **statement** directs the computation.

Examples:

```python
count = 0
if value > 0:
count = count + 1
return count
```

The assignment statement changes state. The conditional statement chooses whether another statement executes. The return statement ends the function and produces the result.

This distinction becomes important when reading more complex code. Expressions answer “what value?”, while statements answer “what action or control decision?”.

## 8. Input, output, and side effects

For `count_positive`:

```text
Input:
    values

Output:
    the number of positive elements

Side effects:
    none intended
```

The function does not print, modify the input list, write a file, or update global state.

Compare it with:

```python
def report_positive_count(values: list[int]) -> None:
    count = count_positive(values)
    print(count)
```

The second function has a printing side effect and returns `None`.

The value printed to the console is observable output in an everyday sense, but from the function-interface perspective it is a side effect rather than a returned value.

The course will use this distinction carefully because side effects influence correctness, testability, and reasoning about functions.

## 9. Read names as part of the explanation

Compare:

```python
def f(a: list[int]) -> int:
    x = 0
    for y in a:
        if y > 0:
            x += 1
    return x
```

with:

```python
def count_positive(values: list[int]) -> int:
    count = 0
    for value in values:
        if value > 0:
            count += 1
    return count
```

The two functions perform the same operations. The second is easier to understand because the names communicate the role of each value.

Readable naming does not replace an explanation, but it reduces the distance between the code and the conceptual model.

## 10. Do not confuse compact code with clear code

Python allows a shorter version:

```python
def count_positive(values: list[int]) -> int:
    return sum(1 for value in values if value > 0)
```

This version is valid and idiomatic. It may be appropriate after the mechanism is understood.

For a first explanation, however, the explicit loop is better because it exposes:

- the initial state;
- the repeated processing;
- the condition;
- the state update;
- the final result.

Educational code should reveal the algorithm before it compresses it.

## 11. A second example: summing even values

Consider:

```python
def sum_even(values: list[int]) -> int:
    total = 0

    for value in values:
        if value % 2 == 0:
            total = total + value

    return total
```

The state variable now has a different meaning:

```text
total = the sum of even elements processed so far
```

Initialising `total` to zero is correct because zero is the additive identity: adding no values gives zero.

For input:

```text
[3, 4, 6, 7, 2]
```

we obtain:

| Iteration | Value | Even? | `total` before | `total` after |
|---:|---:|:---:|---:|---:|
| Initial | — | — | — | 0 |
| 1 | 3 | No | 0 | 0 |
| 2 | 4 | Yes | 0 | 4 |
| 3 | 6 | Yes | 4 | 10 |
| 4 | 7 | No | 10 | 10 |
| 5 | 2 | Yes | 10 | 12 |

The final result is `12`.

The code structure resembles `count_positive`, but the state meaning and update are different. Recognising structural patterns while preserving semantic differences is a central algorithmic skill.

## 12. Questions to ask while reading any function

When you encounter a new function, ask:

1. What problem is it intended to solve?
2. What are the inputs?
3. What is returned?
4. Is any input modified?
5. Which variables carry information across steps?
6. What does each important variable mean?
7. Why are the variables initialised with those values?
8. Which conditions divide the execution into cases?
9. Which statements repeat?
10. What must be true after each iteration?
11. What happens for empty input, one element, duplicates, negative values, or missing results?
12. How many times can each important operation execute?

These questions turn code reading into algorithm analysis.

## 13. Common reading mistakes

### Reading only the final return statement

The result is explained by the state changes that precede it. Ignoring them prevents you from understanding why the value is correct.

### Treating a variable as “just a number”

A state variable should represent a fact about the processed input. Without that meaning, updates become arbitrary.

### Ignoring the initial state

Many algorithm errors begin with an initial value that is valid only for some inputs.

### Ignoring skipped branches

When an `if` condition is false, doing nothing is still part of the algorithm. You must explain why the unchanged state remains valid.

### Assuming a familiar pattern solves the intended problem

A loop with a counter could count positives, negatives, duplicates, or matching records. The meaning comes from the condition and state interpretation.

## 14. What you must be able to explain

After this chapter, you should be able to:

- identify the changing state in a Python function;
- state the meaning of an accumulator or counter;
- explain why its initial value is correct;
- trace a loop in a table;
- distinguish expressions from statements;
- distinguish a returned result from a side effect;
- explain why explicit code may be pedagogically better than compressed code;
- describe the algorithmic structure beneath Python syntax.

## 15. Practice

### Exercise 1

Trace the following function for `values = [2, -1, 4, -3, 0]`:

```python
def count_nonzero(values: list[int]) -> int:
    count = 0
    for value in values:
        if value != 0:
            count += 1
    return count
```

State the meaning of `count` before each iteration.

### Exercise 2

Explain the difference between these functions:

```python
def double_values(values: list[int]) -> list[int]:
    result = []
    for value in values:
        result.append(2 * value)
    return result
```

```python
def double_values_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] = 2 * values[index]
```

Identify the output and side effects of each.

### Exercise 3

Write an explicit loop that counts values greater than or equal to `10`. Then state:

- the input;
- the output;
- the state variable;
- the meaning of the state variable;
- the initial value and why it is correct.

## 16. Summary

Reading code algorithmically means explaining the process represented by the code.

A good reading identifies:

- the interface;
- the important state;
- the meaning of each state variable;
- the initial state;
- the repeated or conditional updates;
- the returned result;
- the side effects;
- the boundary cases;
- the connection between one execution and the general problem.

The next chapter reverses the direction. Instead of starting from code and discovering its meaning, we start from a problem statement and design a solution step by step.

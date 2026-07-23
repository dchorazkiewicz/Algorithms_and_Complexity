# Iteration versus Recursion

## Two ways to express repeated structure

Iteration and recursion can often solve the same problem. That does not make them interchangeable in every practical sense.

They differ in how state is represented, how progress is expressed, how termination is justified, how much auxiliary memory is used, and how closely the code follows the mathematical or structural form of the problem.

The purpose of comparison is not to declare one universally better. It is to learn which representation makes a particular algorithm easiest to understand, justify, and execute efficiently.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to transform simple recursive ideas into loops, compare state and termination arguments, and discuss time, space, clarity, and problem structure.

---

## 1. Factorial in two forms

Iterative:

```python
def factorial_iterative(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")

    result = 1

    for value in range(2, n + 1):
        result *= value

    return result
```

Recursive:

```python
def factorial_recursive(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")

    if n == 0:
        return 1

    return n * factorial_recursive(n - 1)
```

Both compute the same mathematical function. Their operational models differ.

---

## 2. Where is the state stored?

In the iterative version, state is explicit:

```text
result = product accumulated so far
value = next multiplier
```

In the recursive version, part of the state is stored implicitly in active calls:

```text
factorial(5) waits for 5 × ...
factorial(4) waits for 4 × ...
...
```

The call stack remembers unfinished multiplications and local arguments.

Iteration often exposes state in variables. Recursion often distributes state across stack frames.

---

## 3. Termination arguments

Iterative factorial:

```text
The range contains finitely many values from 2 through n.
```

Recursive factorial:

```text
The non-negative argument n decreases by one until it reaches zero.
```

The underlying progress idea is similar. Both process the finite chain:

```text
n, n - 1, ..., 1, 0
```

The representation of that chain differs.

---

## 4. Complexity comparison

For both factorial implementations:

```text
Time: O(n)
```

The space differs:

```text
Iterative auxiliary space: O(1)
Recursive call-stack space: O(n)
```

Each recursive level remains active until the smaller call returns. Python does not generally optimise tail recursion away, so recursive depth matters.

---

## 5. Summation in two forms

Iterative:

```python
def sum_iterative(values: list[int]) -> int:
    total = 0

    for value in values:
        total += value

    return total
```

Recursive by index:

```python
def sum_recursive(values: list[int], length: int | None = None) -> int:
    if length is None:
        length = len(values)

    if length == 0:
        return 0

    return sum_recursive(values, length - 1) + values[length - 1]
```

The iterative version maps directly to a linear scan. The recursive version maps to a prefix recurrence.

For this problem, iteration is usually clearer and uses less memory.

---

## 6. Euclid's algorithm in two forms

Iterative:

```python
def gcd_iterative(first: int, second: int) -> int:
    while second != 0:
        first, second = second, first % second

    return first
```

Recursive:

```python
def gcd_recursive(first: int, second: int) -> int:
    if second == 0:
        return first

    return gcd_recursive(second, first % second)
```

The recursive form closely mirrors the mathematical identity. The iterative form keeps the same pair of state variables and avoids stack growth.

Both are concise and meaningful. The choice may depend on teaching purpose, language behaviour, and operational constraints.

---

## 7. Structural recursion

Some problems are recursively structured.

A nested list may contain values or other nested lists:

```python
nested = [1, [2, 3], [4, [5]]]
```

A recursive sum follows the shape naturally:

```python
from typing import TypeAlias

NestedInt: TypeAlias = int | list["NestedInt"]


def deep_sum(item: NestedInt) -> int:
    if isinstance(item, int):
        return item

    total = 0
    for child in item:
        total += deep_sum(child)

    return total
```

The recursion descends through arbitrarily nested structure. An iterative solution is possible, but it requires an explicit stack of pending items.

This is a central trade-off:

> Recursion uses the language call stack; iteration may replace it with an explicit data structure.

---

## 8. Converting recursion to iteration

Consider recursive countdown:

```python
def countdown_recursive(n: int) -> None:
    if n < 0:
        return

    print(n)
    countdown_recursive(n - 1)
```

The recursive call is the final operation. The state needed for the next step is only `n - 1`.

Iterative form:

```python
def countdown_iterative(n: int) -> None:
    while n >= 0:
        print(n)
        n -= 1
```

The loop stores directly what the next recursive call would have received.

For more complex recursion, conversion may require an explicit stack containing unfinished work.

---

## 9. Order of work matters

Recursive code can perform work before or after the recursive call.

```python
def print_down(n: int) -> None:
    if n == 0:
        return

    print(n)
    print_down(n - 1)
```

Output for `3`:

```text
3 2 1
```

Move the print after the call:

```python
def print_up(n: int) -> None:
    if n == 0:
        return

    print_up(n - 1)
    print(n)
```

Output:

```text
1 2 3
```

The call stack preserves deferred work. An iterative translation must reproduce the same order explicitly.

---

## 10. Tail recursion

A recursive call is in **tail position** when nothing remains to be done after it returns.

```python
def factorial_tail(n: int, accumulator: int = 1) -> int:
    if n == 0:
        return accumulator

    return factorial_tail(n - 1, accumulator * n)
```

Mathematically, this carries the accumulated result forward. Operationally in Python, it still uses one stack frame per call because Python does not perform tail-call elimination.

The iterative equivalent is more space-efficient:

```python
def factorial_iterative(n: int) -> int:
    accumulator = 1

    while n > 0:
        accumulator *= n
        n -= 1

    return accumulator
```

Language semantics matter when evaluating recursive style.

---

## 11. Readability is problem-dependent

Recursion may be clearer when:

- the input is a tree or nested structure;
- the algorithm divides the problem into smaller versions of itself;
- the mathematical definition is recursive;
- backtracking must explore choices and undo them.

Iteration may be clearer when:

- the process is a simple linear scan;
- state fits naturally in a few variables;
- recursion depth may be large;
- constant auxiliary memory is important;
- the language does not optimise recursive calls.

Readability is not measured by line count alone. A short recursive function may hide repeated work or stack cost. A loop may be longer but expose state more transparently.

---

## 12. Correctness reasoning in both forms

For iteration, reasoning often uses a loop invariant:

```text
accumulator summarises the processed portion
```

For recursion, reasoning often uses induction:

```text
assuming the smaller recursive call is correct,
show the current result is correct
```

These are closely related. Both establish a base situation and a preservation or construction step.

Iteration:

```text
initial state → repeated preservation → final state
```

Recursion:

```text
base case → correctness of smaller case → correctness of current case
```

---

## 13. Failure modes

Iteration commonly fails through:

- incorrect initial state;
- wrong boundary;
- missing update;
- invariant violation;
- infinite loop.

Recursion commonly fails through:

- missing base case;
- unreachable base case;
- wrong reduction;
- stack overflow;
- repeated subproblems;
- incorrect reconstruction after return.

Recognising the control model helps locate the error.

---

## 14. A decision checklist

When choosing between iteration and recursion, ask:

1. Is the problem naturally defined through smaller instances?
2. Is the data recursively structured?
3. How deep can the computation become?
4. Does the language handle deep recursion safely?
5. What state must be remembered?
6. Can that state be represented more clearly in variables or an explicit stack?
7. Does the recursive version repeat work?
8. Which form makes correctness and termination easier to explain?
9. What are the time and auxiliary-space costs?

---

## 15. What you must be able to explain

After this chapter, you should be able to:

- identify equivalent iterative and recursive state;
- compare termination arguments;
- compare stack and explicit-variable storage;
- convert simple tail recursion to iteration;
- explain why operation order affects recursive output;
- distinguish structural recursion from unnecessary recursion;
- discuss time, auxiliary space, clarity, and language constraints.

## 16. Practice

### Exercise 1 — Power

Write iterative and recursive versions of `power(base, exponent)` for non-negative exponents. Compare time and space.

### Exercise 2 — Linear search

Compare iterative and recursive linear search. State the invariant and the recursive induction hypothesis.

### Exercise 3 — Print order

Predict the output of functions that print before and after recursive calls.

### Exercise 4 — Explicit stack

Rewrite `deep_sum` using a Python list as an explicit stack.

### Exercise 5 — Choose a form

For each problem, argue for iteration or recursion:

- summing a flat list;
- traversing a binary tree;
- computing factorial for a large `n` in Python;
- exploring a maze with backtracking;
- validating a nested expression.

## 17. Summary

Iteration and recursion are alternative ways to express repeated computation. Iteration keeps progress in explicit mutable state. Recursion reduces the problem and stores unfinished work in the call stack. The best choice depends on structure, clarity, termination, complexity, and language behaviour.

The next chapter turns from control mechanisms to the values they manipulate: primitive and compound data types.
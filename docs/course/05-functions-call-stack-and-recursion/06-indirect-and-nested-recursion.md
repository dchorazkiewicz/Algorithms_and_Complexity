# Indirect and Nested Recursion

## Recursion is not always visible as a self-call

Direct recursion is easy to spot because a function calls itself by name. More subtle forms appear when the cycle passes through other functions or when a recursive call is used as the argument of another call.

Understanding these forms matters because termination, stack depth, and debugging become less obvious.

## Indirect recursion

In **indirect recursion**, one function calls another, which eventually calls the first.

```python
def is_even(number: int) -> bool:
    if number == 0:
        return True
    return is_odd(number - 1)


def is_odd(number: int) -> bool:
    if number == 0:
        return False
    return is_even(number - 1)
```

The call cycle is:

```text
is_even -> is_odd -> is_even -> ...
```

For non-negative input, the shared termination measure is `number`. Every call decreases it by one.

The proof cannot be written for either function in complete isolation. The functions form a mutually dependent system.

## Mutual recursion

When two or more functions recursively define one another, the pattern is often called **mutual recursion**.

This can model alternating structures naturally. A simple expression grammar might alternate between parsing an expression and parsing a parenthesised subexpression. A tree traversal may alternate between node types.

The design must specify:

- the contract of every participating function;
- how control moves between them;
- a progress measure valid across the whole cycle;
- base cases that break every possible cycle.

A base case in only one function may be insufficient if another path never reaches it.

## A broken indirect cycle

```python
def first(number: int) -> int:
    return second(number)


def second(number: int) -> int:
    return first(number)
```

The functions call one another without changing the problem. No progress measure decreases, and no base case is reachable. The result is unbounded stack growth.

The syntax looks more complex than direct recursion, but the diagnosis is the same: missing progress.

## Nested recursion

In **nested recursion**, a recursive call appears inside the argument of another recursive call.

A classic mathematical example is the McCarthy 91 function:

```python
def mccarthy_91(number: int) -> int:
    if number > 100:
        return number - 10
    return mccarthy_91(mccarthy_91(number + 11))
```

For `number <= 100`, the inner recursive call must finish before the outer recursive call can even receive its argument.

The execution is therefore more difficult to trace than a simple chain. The stack contains calls waiting not only for arithmetic, but for another recursive result that will determine the next recursive argument.

This example is useful for recognising the form, not as a recommended practical implementation pattern.

## Recursion inside data structures

Nested structure and nested recursion are different concepts. A nested list can be processed by ordinary structural recursion:

```python
def deep_count(item: int | list) -> int:
    if isinstance(item, int):
        return 1

    total = 0
    for child in item:
        total += deep_count(child)
    return total
```

The data is nested, but each recursive call is not syntactically nested inside another recursive argument. The algorithm makes recursive calls while traversing children.

Precise terminology prevents confusion.

## Tracing mutual recursion

For `is_even(3)`:

```text
is_even(3)
    -> is_odd(2)
        -> is_even(1)
            -> is_odd(0)
                -> False
```

The active frames alternate function names. A useful trace records both the function and argument at every depth.

## Correctness reasoning

Mutual recursion often uses simultaneous induction. One proves related statements together.

For the parity example:

- `is_even(n)` is correct for non-negative `n`;
- `is_odd(n)` is correct for non-negative `n`.

Base case `n = 0` establishes both. For `n > 0`, each function delegates to the other on `n - 1`, whose correctness is covered by the induction hypothesis.

## When indirect recursion is appropriate

It can be appropriate when the problem itself has alternating categories or grammatical states. It is inappropriate when it merely hides a simple loop or makes progress harder to verify.

Questions to ask:

1. Does the mutual structure match the problem model?
2. Is there one clear measure that decreases across every edge of the call cycle?
3. Can a reader find all participating functions easily?
4. Would an explicit state machine be clearer?

## Converting to an explicit state machine

The parity example can be written iteratively:

```python
def is_even(number: int) -> bool:
    if number < 0:
        raise ValueError("number must be non-negative")

    state = "even"

    while number > 0:
        state = "odd" if state == "even" else "even"
        number -= 1

    return state == "even"
```

This makes the alternating state explicit and avoids stack growth. In practice, `number % 2 == 0` is simpler still, illustrating that a recursive definition is not automatically the best algorithm.

## What you must be able to explain

You should be able to distinguish direct, indirect, mutual, and nested recursion; draw the call cycle; identify a progress measure across functions; and decide whether an explicit state machine would be clearer.

## Practice

1. Trace `is_even(4)` and list the active function at every depth.
2. Construct a broken mutual-recursion example with a base case that is never reached.
3. Explain why nested recursion is harder to trace than ordinary direct recursion.
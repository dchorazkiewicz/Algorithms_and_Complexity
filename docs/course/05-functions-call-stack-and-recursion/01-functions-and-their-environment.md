# Functions and Their Environment

## A function is not an isolated box

It is common to draw a function as a box with arrows entering and leaving it. That picture is useful, but incomplete. A real function call happens inside a larger program state. The function receives arguments from a caller, binds them to parameters, creates local variables, may inspect external objects, may modify some of them, and eventually returns control.

The central question of this chapter is therefore:

> What information belongs to the function call itself, and what information comes from the surrounding environment?

Consider:

```python
def count_above(values: list[int], threshold: int) -> int:
    count = 0

    for value in values:
        if value > threshold:
            count += 1

    return count
```

The function has two parameters, one local variable, one loop variable, and one returned value. But the list object passed as `values` existed before the call and may still exist after it. The function's local name refers to an object owned by the wider execution environment.

## Arguments and parameters

An **argument** is the value supplied by the caller. A **parameter** is the local name used by the called function.

```python
result = count_above([4, 9, 2], 5)
```

Here:

- `[4, 9, 2]` and `5` are arguments;
- `values` and `threshold` are parameters;
- `result` is a name in the caller's environment.

At call time, the arguments are evaluated first. Their resulting values are then associated with the parameters of the new call.

## Local state

Each call has its own local state.

```python
def add_one(value: int) -> int:
    result = value + 1
    return result
```

Two calls can be active at different times with different local bindings:

```text
add_one(3): value = 3, result = 4
add_one(8): value = 8, result = 9
```

The name `result` in one call is not the same variable as `result` in another call. This becomes essential in recursion, where several calls of the same function coexist.

## The environment outside the function

A function may interact with several kinds of external state:

- global variables;
- mutable arguments;
- files;
- network connections;
- the console;
- random-number generators;
- clocks;
- databases;
- objects captured by closures.

For example:

```python
total_calls = 0


def record_call() -> None:
    global total_calls
    total_calls += 1
```

The function changes a global variable. Its behaviour cannot be explained using only its parameters and return value.

## Pure computation and environmental dependence

A function is easiest to reason about when its result depends only on its explicit inputs and it does not modify external state.

```python
def square(value: int) -> int:
    return value * value
```

For the same argument, this function always returns the same result.

Compare:

```python
from time import time


def current_timestamp() -> float:
    return time()
```

The second function has no explicit input, yet repeated calls may return different values. Its environment supplies hidden information.

This does not make it wrong. It means its contract must acknowledge environmental dependence.

## Names, objects, and bindings

Python parameters are local names bound to objects. Rebinding a parameter changes only the local binding:

```python
def replace(values: list[int]) -> None:
    values = [0, 0, 0]
```

The caller's list is unchanged because the local name now refers to a different object.

Mutation is different:

```python
def clear(values: list[int]) -> None:
    values.clear()
```

Now the object shared with the caller is modified.

This distinction explains many apparent contradictions in function behaviour:

- assignment to a parameter name is local rebinding;
- mutation changes the referenced object;
- aliasing lets the caller observe that mutation.

## A complete function contract

A useful function specification should identify:

1. valid arguments;
2. the returned result;
3. objects that may be modified;
4. external state that may be read or changed;
5. possible failures.

For example:

```text
Function: remove_negative(values)
Precondition:
    values is a mutable list of integers
Postcondition:
    values contains exactly the non-negative elements from the original list,
    in their original relative order
Return value:
    None
Side effect:
    mutates values
```

Without the side-effect clause, the interface is incomplete.

## Why this matters for algorithms

Algorithmic correctness is always relative to a model of input and state. If a function silently depends on global state or mutates an argument unexpectedly, a local proof may no longer describe the whole computation.

A disciplined design therefore asks:

- Which information is explicit?
- Which information is hidden in the environment?
- Which state belongs only to the current call?
- Which state survives after the call returns?

## What you must be able to explain

You should be able to distinguish arguments from parameters, local bindings from external objects, rebinding from mutation, and returned values from environmental effects.

## Practice

1. For a function that appends to a list and returns its new length, identify every input, output, local variable, and side effect.
2. Explain why two simultaneous recursive calls can use the same parameter names without sharing local variables.
3. Rewrite a function that reads a global threshold so that the threshold becomes an explicit parameter.
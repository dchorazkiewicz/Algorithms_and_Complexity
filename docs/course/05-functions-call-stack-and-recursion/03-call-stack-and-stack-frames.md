# The Call Stack and Stack Frames

## Why unfinished calls must be remembered

When one function calls another, the caller does not disappear. It pauses. The program must remember where execution should continue after the called function finishes, together with the caller's local state.

Consider:

```python
def double(value: int) -> int:
    return 2 * value


def add_double(first: int, second: int) -> int:
    doubled = double(second)
    return first + doubled
```

During `add_double(3, 5)`, the call to `add_double` is active when `double(5)` begins. The program must preserve `first = 3`, `second = 5`, and the point after the call to `double`.

The conceptual structure that stores active calls is the **call stack**.

## Stack discipline

A stack is last-in, first-out. The most recently started unfinished call is the first one that can return.

```text
add_double(3, 5)
    calls double(5)
        returns 10
    resumes and returns 13
```

The order is not arbitrary. `add_double` cannot complete its addition until `double` provides a result.

## What a stack frame stores

A **stack frame** is the execution context associated with one active call. Conceptually, it contains:

- parameter bindings;
- local variables;
- a return location;
- temporary values needed by expressions;
- references to relevant objects;
- bookkeeping required by the runtime.

The exact low-level representation depends on the language and implementation. For algorithmic reasoning, the conceptual model is enough: each active call has its own local context and continuation point.

## A complete trace

For:

```python
def increment(value: int) -> int:
    result = value + 1
    return result


def twice_incremented(value: int) -> int:
    first = increment(value)
    second = increment(first)
    return second
```

Trace `twice_incremented(7)`:

```text
1. push frame: twice_incremented(value=7)
2. call increment(7)
3. push frame: increment(value=7)
4. compute result=8
5. return 8; pop increment frame
6. resume twice_incremented; bind first=8
7. call increment(8)
8. push frame: increment(value=8)
9. compute result=9
10. return 9; pop increment frame
11. resume twice_incremented; bind second=9
12. return 9; pop twice_incremented frame
```

A stack trace is therefore a control-flow history of active, not completed, calls.

## Local variables with the same names

Each frame owns separate local bindings:

```python
def outer(value: int) -> int:
    result = value + 1
    return inner(result)


def inner(value: int) -> int:
    result = value * 2
    return result
```

The names `value` and `result` appear in both functions, but they belong to different frames. Name reuse does not imply shared storage.

## Return values and continuations

A called function does not merely produce a value. It returns that value to a specific waiting location.

In:

```python
answer = 10 + double(4)
```

the caller frame conceptually remembers:

```text
pending operation: 10 + [result of double(4)]
```

After `double` returns `8`, the caller resumes and computes `18`.

This pending work becomes especially visible in recursion.

## Stack growth and auxiliary space

If at most a constant number of calls are active, call-stack use is `O(1)`. If recursive depth grows with input size, stack use may be `O(n)`, `O(log n)`, or another function of the depth.

For recursive factorial:

```python
def factorial(n: int) -> int:
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

`factorial(n)` creates `n + 1` active calls before unwinding, so stack space is `O(n)`.

For binary search, each call halves the interval, so recursive depth is `O(log n)`.

## Stack overflow

Execution environments impose limits. A recursive algorithm may be mathematically terminating and still exceed the available call stack.

Python also enforces a recursion-depth limit. This is not evidence that recursion is conceptually invalid. It is an operational constraint that must be included in implementation choices.

## Exceptions and unwinding

If a deep call raises an exception, frames are removed while control searches for a matching handler. This is called **stack unwinding**.

```python
def parse_positive(text: str) -> int:
    value = int(text)
    if value <= 0:
        raise ValueError("positive value required")
    return value
```

A caller that does not handle the exception is removed from the stack as the exception propagates upward.

## C++ comparison

In C++, automatic local variables are commonly associated with stack-frame lifetime. When a function returns, destructors for automatic objects run as the frame is left. Python uses a different object model and garbage collection strategy, so one should not equate "Python local variable" with "object physically stored on the machine stack."

The shared algorithmic idea is call lifetime and nested control, not identical memory layout.

## What you must be able to explain

You should be able to draw the active frames for nested calls, identify local state in each frame, state what work is pending, and relate maximum stack depth to auxiliary-space complexity.

## Practice

1. Trace three nested calls and list every frame at the deepest point.
2. Explain why completed calls are not kept on the active call stack.
3. Determine the maximum stack depth of recursive binary search on an array of length `n`.
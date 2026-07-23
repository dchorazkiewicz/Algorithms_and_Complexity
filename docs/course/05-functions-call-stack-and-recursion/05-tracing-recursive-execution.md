# Tracing Recursive Execution

## Why recursive traces are difficult

A loop usually keeps its state in one place. Recursive execution distributes state across several active calls. A correct trace must therefore answer two questions at once:

- which call is currently executing;
- which earlier calls are waiting for its result.

The safest method is to trace the call stack explicitly.

## A five-column trace

For each call, record:

1. call depth;
2. parameter values;
3. base-case decision;
4. pending operation;
5. returned value.

Consider:

```python
def digit_sum(number: int) -> int:
    if number < 10:
        return number
    return number % 10 + digit_sum(number // 10)
```

Trace `digit_sum(472)`:

| Depth | Call | Decision | Pending work | Return |
|---:|---|---|---|---:|
| 0 | `digit_sum(472)` | recursive | `2 + ...` | 13 |
| 1 | `digit_sum(47)` | recursive | `7 + ...` | 11 |
| 2 | `digit_sum(4)` | base | none | 4 |

The return values are computed upward:

```text
digit_sum(4)   = 4
digit_sum(47)  = 7 + 4  = 11
digit_sum(472) = 2 + 11 = 13
```

## Stack snapshots

At the deepest point:

```text
top
┌────────────────────────────┐
│ digit_sum(4)                │
├────────────────────────────┤
│ digit_sum(47): waiting 7 + │
├────────────────────────────┤
│ digit_sum(472): waiting 2 +│
└────────────────────────────┘
bottom
```

This picture makes the LIFO return order visible.

## Tracing side effects

Returned values are not the whole story. Consider:

```python
def visit(values: list[int], index: int = 0) -> None:
    if index == len(values):
        return

    print(values[index])
    visit(values, index + 1)
```

Output occurs during expansion. If `print` is placed after the recursive call, output occurs during unwinding and the order reverses.

A complete trace should therefore have a separate column for observable effects.

## Tracing branching recursion

For naive Fibonacci, a simple vertical stack trace is insufficient because the execution branches.

```python
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

Use a recursion tree:

```text
fib(4)
├── fib(3)
│   ├── fib(2)
│   │   ├── fib(1)
│   │   └── fib(0)
│   └── fib(1)
└── fib(2)
    ├── fib(1)
    └── fib(0)
```

The tree exposes repeated calls. `fib(2)` is computed twice.

## Tracing recursive mutation

Mutation requires tracking both frames and shared objects.

```python
def reverse_prefix(values: list[int], left: int, right: int) -> None:
    if left >= right:
        return

    values[left], values[right] = values[right], values[left]
    reverse_prefix(values, left + 1, right - 1)
```

All frames refer to the same list object. A trace must show the list after each swap:

```text
[1, 2, 3, 4] -> [4, 2, 3, 1] -> [4, 3, 2, 1]
```

Local indices differ by frame; the mutated object is shared.

## A disciplined tracing procedure

When reading recursive code:

1. write the contract;
2. identify base cases;
3. identify the smaller arguments;
4. write what the current call must wait for;
5. descend one call at a time;
6. stop at a base case;
7. compute return values in reverse order;
8. separately record mutations, output, or exceptions.

Do not mentally jump from the first call to the final result. The learning value is in preserving every suspended computation.

## Common tracing mistakes

- reusing one set of local variables for all calls;
- forgetting pending work after a recursive call;
- stopping the trace at the base case instead of unwinding;
- confusing call order with return order;
- ignoring shared mutation;
- drawing a chain when the function makes multiple recursive calls;
- counting completed calls as still active.

## Complexity from traces

A trace can reveal:

- maximum depth, which determines call-stack space;
- total number of calls, which contributes to running time;
- repeated subproblems, which suggest memoisation or dynamic programming;
- work per frame.

A chain of `n` calls with constant work per call gives `O(n)` time and `O(n)` stack space. A balanced binary recursion tree with `O(n)` leaves may have `O(log n)` depth but `O(n)` total calls.

## What you must be able to explain

You should be able to construct stack snapshots, distinguish expansion from unwinding, trace effects on shared objects, and infer depth and call count from the execution structure.

## Practice

1. Trace `digit_sum(9081)`.
2. Draw the recursion tree for `fibonacci(5)` and count repeated calls.
3. Trace recursive in-place reversal of a five-element list, showing both stack depth and list state.
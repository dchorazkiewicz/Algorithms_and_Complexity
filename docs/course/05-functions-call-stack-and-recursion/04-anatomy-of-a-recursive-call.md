# The Anatomy of a Recursive Call

## Recursion is suspended work plus a smaller problem

A direct recursive call is easy to recognise syntactically:

```python
def factorial(n: int) -> int:
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

But the essential mechanism is not the self-call alone. Each call does three things:

1. decides whether the current instance is a base case;
2. transforms the problem into a smaller instance;
3. records work that must be completed after the smaller call returns.

For `factorial(4)`, the pending work is multiplication by `4`, then by `3`, then by `2`, then by `1`.

## The four questions of recursive design

Every recursive algorithm should answer:

1. **What is the problem represented by the parameters?**
2. **Which instances can be solved directly?**
3. **How is a non-base instance reduced?**
4. **Why must repeated reduction reach a base case?**

Consider a recursive sum over a suffix:

```python
def suffix_sum(values: list[int], index: int) -> int:
    if index == len(values):
        return 0

    return values[index] + suffix_sum(values, index + 1)
```

The parameters represent the problem "sum the suffix beginning at `index`." The empty suffix is the base case. The recursive call advances the boundary by one. The measure `len(values) - index` decreases.

## Expansion and unwinding

Recursive execution has two phases.

During **expansion**, calls are created:

```text
suffix_sum(values, 0)
    waits for values[0] + suffix_sum(values, 1)
        waits for values[1] + suffix_sum(values, 2)
            ...
```

During **unwinding**, returned results complete pending work:

```text
empty suffix returns 0
previous call adds final element
previous call adds preceding element
...
```

A trace that records only arguments on the way down is incomplete. One must also record return values on the way up.

## Recursive state

In an iterative algorithm, state is usually held in explicit variables. In recursive code, part of the state is distributed across frames.

For:

```python
def power(base: int, exponent: int) -> int:
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)
```

Each frame stores its own `exponent` and a pending multiplication by `base`.

The chain of frames is an implicit data structure representing unfinished work.

## Work before and after the call

The position of work relative to the recursive call changes behaviour.

```python
def print_down(n: int) -> None:
    if n == 0:
        return
    print(n)
    print_down(n - 1)
```

This prints during expansion.

```python
def print_up(n: int) -> None:
    if n == 0:
        return
    print_up(n - 1)
    print(n)
```

This prints during unwinding.

For `n = 3`, the first prints `3 2 1`; the second prints `1 2 3`.

This distinction later reappears in tree traversals: preorder performs work before recursive children, postorder after them, and inorder between them.

## Multiple recursive calls

A function may make more than one recursive call:

```python
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

The call structure is no longer a chain but a branching recursion tree. Different branches may recompute the same subproblems.

For `fibonacci(5)`, both `fibonacci(4)` and `fibonacci(3)` eventually request `fibonacci(2)`. This duplicated work explains the poor running time of the naive algorithm.

## Recursive contracts

A recursive contract must apply to every recursive call.

For `suffix_sum`, a suitable precondition is:

```text
0 <= index <= len(values)
```

The recursive call uses `index + 1`. Before making it, the algorithm knows `index < len(values)`, so:

```text
0 <= index + 1 <= len(values)
```

The recursive call therefore satisfies the same precondition.

This is a crucial proof obligation: a recursive algorithm may be correct on the original input but invalid on a subproblem if reduction breaks the contract.

## Correctness by induction

A common correctness pattern is:

- prove the base case directly;
- assume the recursive call correctly solves the smaller instance;
- show that the current call combines that result into the correct answer.

For `suffix_sum`, assume the recursive call returns the sum of elements after `index`. Adding `values[index]` yields the sum of the full current suffix.

## Termination and well-founded descent

A recursive algorithm terminates when its calls descend through a relation that cannot continue forever.

For non-negative integers, strict decrease toward zero works. For arrays, the unprocessed length may decrease. For trees, recursion descends to proper subtrees. For graphs, recursion must also mark visited vertices, because following edges alone may cycle forever.

A base case without guaranteed progress is insufficient.

## Tail position

A call is in **tail position** when its result is returned directly without further computation:

```python
def countdown(n: int) -> None:
    if n < 0:
        return
    print(n)
    return countdown(n - 1)
```

Some languages optimise tail calls. Standard Python implementations do not generally eliminate recursive frames, so tail-recursive Python still consumes stack space.

## What you must be able to explain

You should be able to identify the problem represented by each call, base cases, reduction, pending work, expansion, unwinding, the termination measure, and the inductive correctness step.

## Practice

1. Trace `power(3, 4)` through both phases.
2. Move a print statement from before to after a recursive call and predict the order change.
3. Give a recursive contract for searching a half-open interval `[left, right)`.
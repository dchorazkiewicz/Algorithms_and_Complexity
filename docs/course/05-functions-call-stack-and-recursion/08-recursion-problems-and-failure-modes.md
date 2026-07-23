# Problems and Failure Modes of Recursion

## A recursive definition can be elegant and still be a poor program

Recursion mirrors many mathematical and structural definitions. That elegance can hide operational problems: calls may fail to reach a base case, depth may exceed the available stack, subproblems may be recomputed exponentially, or mutation may make calls interfere with one another.

A responsible recursive design must be evaluated at three levels:

1. **logical validity** — does it describe the required result?
2. **termination** — do all valid executions reach a base case?
3. **operational suitability** — are time, memory, depth, and side effects acceptable?

## Missing base case

```python
def countdown(number: int) -> None:
    print(number)
    countdown(number - 1)
```

There is no condition that stops expansion. The function eventually fails because the runtime cannot create more frames.

The repair is not merely to add any conditional. The base case must correspond to the problem contract.

## Unreachable base case

```python
def broken(number: int) -> int:
    if number == 0:
        return 0
    return broken(number + 1)
```

A base case exists, but positive arguments move away from it. The termination measure increases.

This is why "the function has a base case" is not a termination proof.

## Progress on only some branches

```python
def unstable(number: int) -> int:
    if number == 0:
        return 0
    if number % 2 == 0:
        return unstable(number // 2)
    return unstable(number + 1)
```

The even branch decreases, but the odd branch increases. The algorithm may still terminate for some values, yet the simple decreasing-measure argument does not cover every call. Every recursive path must make well-founded progress.

## Excessive recursion depth

A linear recursive scan of a list uses one frame per element:

```python
def contains(values: list[int], target: int, index: int = 0) -> bool:
    if index == len(values):
        return False
    if values[index] == target:
        return True
    return contains(values, target, index + 1)
```

The algorithm is logically correct, but for a very long list it may exceed Python's recursion limit. An iterative scan is usually more suitable because it uses constant call-stack space.

## Duplicated subproblems

Naive Fibonacci recomputes the same values:

```python
def fibonacci(number: int) -> int:
    if number < 2:
        return number
    return fibonacci(number - 1) + fibonacci(number - 2)
```

The recursion tree grows exponentially. The problem is not recursion itself; it is repeated work.

Memoisation changes the state model:

```python
def fibonacci(number: int, cache: dict[int, int] | None = None) -> int:
    if cache is None:
        cache = {}

    if number < 2:
        return number

    if number not in cache:
        cache[number] = fibonacci(number - 1, cache) + fibonacci(number - 2, cache)

    return cache[number]
```

Now each distinct subproblem is solved once. This introduces mutable shared state deliberately and should be documented.

## Hidden mutation across calls

A dangerous default argument:

```python
def collect(number: int, result: list[int] = []) -> list[int]:
    if number == 0:
        return result
    result.append(number)
    return collect(number - 1, result)
```

The default list is created once and reused across separate top-level calls. Later calls inherit old data.

A safe interface creates a new list per top-level execution:

```python
def collect(number: int, result: list[int] | None = None) -> list[int]:
    if result is None:
        result = []

    if number == 0:
        return result

    result.append(number)
    return collect(number - 1, result)
```

## Incorrect state restoration

Backtracking algorithms mutate a partial solution and then undo the mutation. Forgetting the undo step contaminates sibling branches.

```python
path.append(choice)
search(...)
path.pop()
```

The final `pop` is not cosmetic. It restores the precondition expected by the next branch.

## Slicing and hidden costs

A compact recursive list sum may copy on every call:

```python
def recursive_sum(values: list[int]) -> int:
    if not values:
        return 0
    return values[0] + recursive_sum(values[1:])
```

In Python, `values[1:]` creates a new list. Across all calls, this can lead to quadratic copying cost and substantial memory use.

Passing an index avoids those copies:

```python
def recursive_sum(values: list[int], index: int = 0) -> int:
    if index == len(values):
        return 0
    return values[index] + recursive_sum(values, index + 1)
```

The new version is still depth-limited, but its per-call reduction is `O(1)`.

## Incorrect assumptions about tail recursion

Tail-recursive code does not generally receive constant-stack execution in Python. Rewriting an algorithm into tail-recursive form does not remove stack growth unless the language implementation guarantees tail-call optimisation.

## Cyclic structures

Recursive traversal of a graph without visited tracking may never terminate:

```python
def visit(graph: dict[int, list[int]], vertex: int) -> None:
    for neighbour in graph[vertex]:
        visit(graph, neighbour)
```

A cycle `1 -> 2 -> 1` repeats indefinitely. Progress through edges is not well-founded because the graph can return to an earlier state.

## Debugging checklist

When recursion fails, ask:

1. Are all valid smallest instances handled?
2. Does every recursive branch preserve the contract?
3. Does a well-founded measure decrease?
4. What is the maximum depth?
5. How many total calls are made?
6. Are subproblems repeated?
7. Are slices or copies created?
8. Is mutable state shared unexpectedly?
9. Is state restored after exploring a branch?
10. Can the data contain cycles?

## What you must be able to explain

You should be able to distinguish logical errors from resource failures, diagnose missing progress and repeated work, and identify hidden copying or mutation costs.

## Practice

1. Repair a recursive function whose base case is unreachable.
2. Compare the cost of slicing and index-based recursive list processing.
3. Explain how visited-state tracking changes the termination argument for a cyclic graph.
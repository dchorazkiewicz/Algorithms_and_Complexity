# Recursion versus Iteration Revisited

## Why the comparison must go beyond syntax

A recursive function and a loop may compute the same result, yet they do not represent the computation in the same way. The important question is therefore not whether both versions are possible. The important question is where the state is stored, how unfinished work is remembered, how termination is justified, and what operational cost follows from that representation.

Recursion stores part of the computation in active function calls. Iteration stores the corresponding state explicitly in variables and, when necessary, in a programmer-managed data structure. Choosing between them is a design decision, not a matter of personal taste.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to compare recursive and iterative solutions in terms of state, control flow, correctness, termination, time, auxiliary space, failure modes, and clarity.

---

## 1. The same mathematical process in two operational forms

Consider factorial for a non-negative integer `n`.

Recursive form:

```python
def factorial_recursive(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 1
    return n * factorial_recursive(n - 1)
```

Iterative form:

```python
def factorial_iterative(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")

    result = 1
    for value in range(2, n + 1):
        result *= value
    return result
```

Both implement the same recurrence. Their contracts and asymptotic running times are the same, but the machine state is organised differently.

---

## 2. Where the state lives

In the iterative version, the important state is explicit:

```text
result = product accumulated so far
value  = next factor to process
```

In the recursive version, part of the state is distributed across stack frames:

```text
factorial_recursive(4): waiting for 4 × ...
factorial_recursive(3): waiting for 3 × ...
factorial_recursive(2): waiting for 2 × ...
factorial_recursive(1): waiting for 1 × ...
```

The recursive code looks shorter because the runtime system stores continuation points and local values on the call stack. Shorter source code does not mean less state.

---

## 3. Correctness arguments

The recursive proof follows the structure of mathematical induction:

1. the base case is correct;
2. assuming the smaller call is correct, the current call constructs the correct answer.

For factorial:

```text
factorial(0) = 1
factorial(n) = n × factorial(n - 1)
```

The iterative proof usually uses an invariant:

```text
Before processing value k, result equals the product of all integers from 1 to k - 1.
```

After multiplying by `k`, the invariant is preserved for the next iteration. When the loop ends, the accumulated product is `n!`.

Neither proof style is universally simpler. The better form is the one that mirrors the structure of the chosen implementation.

---

## 4. Termination arguments

For recursion, identify a measure that decreases toward a base case. In factorial, the measure is `n`.

For iteration, identify either a finite iteration domain or a changing quantity that forces the loop condition to become false. In the `for` version, `range(2, n + 1)` is finite.

The essential progress argument is the same:

```text
n, n - 1, n - 2, ..., 0
```

Recursion expresses this chain through successive calls. Iteration expresses it through successive loop states.

---

## 5. Time and auxiliary space

For factorial:

```text
recursive time: O(n)
iterative time: O(n)
```

The auxiliary-space costs differ:

```text
recursive stack space: O(n)
iterative auxiliary space: O(1)
```

This difference matters for large inputs. Python limits recursion depth, and every active call consumes execution context. A loop can often process much larger linear inputs without exhausting the call stack.

A recursive version is therefore not automatically inefficient in time, but it often has a higher auxiliary-space cost.

---

## 6. When recursion expresses the problem naturally

Recursion is especially natural when the input is recursively structured or when the algorithm follows a divide-and-conquer decomposition.

Examples include:

- tree traversals;
- directory traversal;
- recursive-descent parsing;
- divide-and-conquer algorithms;
- backtracking;
- processing nested structures.

A binary tree node contains smaller trees. A recursive traversal follows this structure directly:

```python
class Node:
    def __init__(self, value: int, left: "Node | None" = None,
                 right: "Node | None" = None) -> None:
        self.value = value
        self.left = left
        self.right = right


def preorder(node: Node | None) -> list[int]:
    if node is None:
        return []
    return [node.value] + preorder(node.left) + preorder(node.right)
```

The conceptual elegance comes from matching the structure of the data. The operational cost still includes recursive calls and list construction.

---

## 7. When iteration is usually preferable

Iteration is often preferable when:

- the computation is a simple linear scan;
- the recursive depth can be large;
- constant auxiliary space is important;
- the language does not optimise tail calls;
- explicit state makes progress easier to inspect;
- failure from recursion depth would be unacceptable.

Summing a flat list is a typical example:

```python
def total(values: list[int]) -> int:
    result = 0
    for value in values:
        result += value
    return result
```

A recursive version adds stack growth without clarifying the problem.

---

## 8. Tail recursion does not remove the issue in Python

A call is in tail position when no work remains after the recursive result is returned.

```python
def sum_tail(values: list[int], index: int = 0, acc: int = 0) -> int:
    if index == len(values):
        return acc
    return sum_tail(values, index + 1, acc + values[index])
```

Conceptually, this can be transformed into a loop because the current frame contains no pending computation after the recursive call. However, Python does not generally eliminate tail calls. The function still creates one frame per element.

Equivalent iteration:

```python
def sum_iterative(values: list[int]) -> int:
    acc = 0
    for value in values:
        acc += value
    return acc
```

The iterative version preserves the same state transition without stack growth.

---

## 9. Explicit stacks are iteration with structured pending work

Some recursive processes cannot be converted to a few scalar variables because several pieces of unfinished work must be remembered. In that case, iteration uses an explicit stack.

Recursive depth-first traversal:

```python
def dfs_recursive(graph: dict[int, list[int]], start: int,
                  visited: set[int]) -> None:
    if start in visited:
        return

    visited.add(start)
    for neighbour in graph[start]:
        dfs_recursive(graph, neighbour, visited)
```

Iterative form:

```python
def dfs_iterative(graph: dict[int, list[int]], start: int) -> set[int]:
    visited: set[int] = set()
    stack = [start]

    while stack:
        vertex = stack.pop()
        if vertex in visited:
            continue

        visited.add(vertex)
        for neighbour in reversed(graph[vertex]):
            if neighbour not in visited:
                stack.append(neighbour)

    return visited
```

The explicit stack stores pending vertices. The recursive version delegates the same responsibility to the call stack.

---

## 10. Order of work must be preserved

A careless conversion can compute the right set of results in the wrong order. Recursive code may perform work:

1. before the recursive call;
2. between recursive calls;
3. after the recursive call.

Consider:

```python
def print_up(n: int) -> None:
    if n == 0:
        return
    print_up(n - 1)
    print(n)
```

For `n = 3`, output is:

```text
1
2
3
```

The ascending order comes from work performed during unwinding. A direct countdown loop would not preserve it. Correct conversion requires reproducing the continuation order, perhaps by changing loop direction or storing pending actions.

---

## 11. A decision framework

When choosing between recursion and iteration, ask:

1. Is the problem or data naturally recursive?
2. What is the maximum possible depth?
3. What state must survive while a subproblem is processed?
4. Does the language optimise tail calls?
5. Is an explicit stack clearer than implicit call frames?
6. Which form makes correctness and termination easier to explain?
7. What are the time and auxiliary-space costs?
8. Are side effects sensitive to traversal order?

The decision should follow from the problem and constraints.

---

## 12. Common mistakes

### Declaring recursion clearer without tracing it

A recursive function is not clear merely because it is short. It is clear only when the base case, smaller subproblem, pending work, and return path are understandable.

### Comparing only source-code length

Hidden stack frames are still part of the computation.

### Assuming equal time implies equal resource use

Two versions may both take `O(n)` time while using `O(n)` and `O(1)` auxiliary space respectively.

### Replacing recursion with a loop but losing traversal order

The explicit state must preserve not only which tasks remain, but also the order in which they are completed.

### Using recursion for unbounded external input

A correct recursive algorithm may still be operationally unsafe when input depth is controlled by a user or external data source.

---

## 13. What you must be able to explain

You should be able to explain:

- where state is stored in each form;
- how recursive frames correspond to iterative variables or an explicit stack;
- how correctness arguments differ;
- how termination is justified;
- why equal asymptotic time does not imply equal space;
- why Python tail recursion still consumes stack space;
- when recursion improves clarity;
- when iteration is safer or simpler;
- why preserving order matters during conversion.

---

## 14. Practice

1. Write recursive and iterative versions of exponentiation by repeated multiplication. Compare their contracts, termination arguments, time, and space.
2. Convert recursive list reversal into an iterative algorithm without using Python slicing.
3. Trace the stack frames for `print_up(4)` and explain why output appears during unwinding.
4. Convert a recursive directory-style traversal of a nested dictionary into an explicit-stack version.
5. Give an example where recursion is more readable but operationally risky.
6. Give an example where iteration is shorter and clearer than recursion.
7. Explain how an explicit stack can preserve preorder traversal.
8. Design a test that would reveal an order error in a recursion-to-iteration conversion.

---

## Closing perspective

Recursion and iteration are two ways of organising state and control. Recursion places unfinished work in stack frames managed by the runtime. Iteration places it in variables or explicit data structures managed by the program. A strong algorithm designer can move between these views and justify the choice rather than treating either form as automatically superior.
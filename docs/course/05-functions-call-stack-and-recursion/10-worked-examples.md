# Worked Examples

## How to use this chapter

The examples in this chapter integrate the ideas developed across Module 05. Each solution is analysed through the same sequence:

1. contract and interface;
2. local and external state;
3. call structure;
4. stack behaviour;
5. correctness and termination;
6. time and auxiliary-space complexity;
7. possible iterative reformulation.

The objective is not to memorise code. The objective is to learn how to explain what the runtime must remember and why the design is correct.

---

## Example 1 — Nested function calls and returned values

Consider three functions:

```python
def double(value: int) -> int:
    return 2 * value


def shift(value: int) -> int:
    return value + 3


def transform(value: int) -> int:
    return double(shift(value))
```

For `transform(4)`, execution proceeds as follows:

```text
transform(4)
    calls shift(4)
        shift returns 7
    calls double(7)
        double returns 14
    transform returns 14
```

Each call has its own local parameter named `value`. The names are identical, but the variables belong to different frames.

The stack grows and shrinks:

```text
[transform]
[transform, shift]
[transform]
[transform, double]
[transform]
[]
```

No function changes external state. The result is communicated entirely through return values. This makes the functions easy to test independently.

Complexity:

```text
Time: O(1)
Auxiliary stack space: O(1)
```

---

## Example 2 — A side effect hidden behind a helper

```python
log: list[str] = []


def record(message: str) -> None:
    log.append(message)


def process(value: int) -> int:
    record(f"processing {value}")
    return value * value
```

The return value of `process(5)` is `25`, but the full observable behaviour also includes mutation of `log`.

Before:

```text
log = []
```

After:

```text
log = ["processing 5"]
```

A contract that mentions only the returned square is incomplete. A more precise contract is:

```text
Precondition:
    value is an integer

Postcondition:
    result = value²
    one message describing value is appended to log
```

This design may be appropriate when logging is an intentional system requirement, but the dependency should not be hidden from the reader or tests.

A cleaner interface can inject the destination:

```python
def process(value: int, messages: list[str]) -> int:
    messages.append(f"processing {value}")
    return value * value
```

The function still has a side effect, but the mutated object is explicit in the parameter list.

---

## Example 3 — Recursive sum and the anatomy of a call

```python
def recursive_sum(values: list[int], length: int | None = None) -> int:
    if length is None:
        length = len(values)

    if length == 0:
        return 0

    return recursive_sum(values, length - 1) + values[length - 1]
```

Contract:

```text
Precondition:
    0 ≤ length ≤ len(values), when length is supplied

Postcondition:
    result = sum(values[0:length])
```

For `recursive_sum([4, 2, 7], 3)`, expansion is:

```text
sum(values, 3)
    waits for sum(values, 2) + 7
        waits for sum(values, 1) + 2
            waits for sum(values, 0) + 4
                returns 0
```

Unwinding is:

```text
sum(values, 1) returns 0 + 4 = 4
sum(values, 2) returns 4 + 2 = 6
sum(values, 3) returns 6 + 7 = 13
```

Correctness follows from the prefix identity:

```text
sum(values[0:length])
= sum(values[0:length - 1]) + values[length - 1]
```

Termination measure:

```text
length
```

It is a non-negative integer and decreases by one on every recursive call.

Complexity:

```text
Time: O(n)
Call-stack space: O(n)
```

An iterative implementation preserves the same accumulated meaning with `O(1)` auxiliary space.

---

## Example 4 — Recursive binary search and frame-local boundaries

```python
def binary_search_recursive(
    values: list[int],
    target: int,
    left: int = 0,
    right: int | None = None,
) -> int:
    if right is None:
        right = len(values)

    if left >= right:
        return -1

    middle = left + (right - left) // 2

    if values[middle] == target:
        return middle
    if values[middle] < target:
        return binary_search_recursive(values, target, middle + 1, right)
    return binary_search_recursive(values, target, left, middle)
```

The interval is half-open:

```text
[left, right)
```

Each frame stores its own `left`, `right`, and `middle`. The recursive call receives a strictly smaller interval.

Termination measure:

```text
right - left
```

When a recursive call is made, the interval length decreases. Eventually either the target is found or `left >= right`.

Complexity:

```text
Time: O(log n)
Call-stack space: O(log n)
```

The iterative version uses the same interval state in two variables and reduces auxiliary space to `O(1)`.

---

## Example 5 — Mutual recursion

```python
def is_even(n: int) -> bool:
    if n == 0:
        return True
    return is_odd(n - 1)


def is_odd(n: int) -> bool:
    if n == 0:
        return False
    return is_even(n - 1)
```

Precondition:

```text
n ≥ 0
```

Neither function directly calls itself. The cycle is:

```text
is_even → is_odd → is_even → ...
```

For `is_even(3)`:

```text
is_even(3)
    is_odd(2)
        is_even(1)
            is_odd(0)
                returns False
```

The measure `n` decreases on every edge in the call cycle, so the combined system terminates.

This example shows why indirect recursion must be analysed across all participating functions. Looking at only one function body is insufficient.

Complexity:

```text
Time: O(n)
Call-stack space: O(n)
```

An arithmetic implementation using `n % 2 == 0` is operationally simpler. Mutual recursion is useful here as a model, not as the preferred production solution.

---

## Example 6 — Nested recursion and repeated evaluation

```python
def nested_countdown(n: int) -> int:
    if n <= 0:
        return 0
    return nested_countdown(nested_countdown(n - 1))
```

The recursive call appears inside the argument of another call to the same function. To evaluate the outer call, Python must first finish the inner call.

For small positive `n`, the inner call eventually returns `0`, and the outer call then evaluates `nested_countdown(0)`.

This form is harder to reason about because the next argument is itself the result of a recursive computation. A correct trace must distinguish:

- the call being evaluated as an argument;
- the outer call waiting for that argument;
- the return path of both computations.

Nested recursion is not automatically wrong, but it often obscures progress and duplicates work. It should be used only when the mathematical structure genuinely requires it.

---

## Example 7 — Replacing recursive traversal with an explicit stack

Suppose a nested list contains integers or other nested lists.

```python
from typing import TypeAlias

NestedInt: TypeAlias = int | list["NestedInt"]
```

Recursive sum:

```python
def deep_sum_recursive(item: NestedInt) -> int:
    if isinstance(item, int):
        return item

    total = 0
    for child in item:
        total += deep_sum_recursive(child)
    return total
```

Iterative version:

```python
def deep_sum_iterative(item: NestedInt) -> int:
    total = 0
    stack: list[NestedInt] = [item]

    while stack:
        current = stack.pop()
        if isinstance(current, int):
            total += current
        else:
            stack.extend(current)

    return total
```

The recursive call stack stores unfinished lists and return points. The iterative algorithm stores pending items explicitly in `stack`.

Let `n` be the total number of integers and list objects visited, and let `h` be maximum nesting depth.

```text
Recursive time: O(n)
Recursive auxiliary space: O(h)
Iterative time: O(n)
Iterative auxiliary space: O(w) in the worst pending-work configuration
```

The exact iterative stack size depends on the shape of the nested structure and the order in which children are pushed.

---

## Example 8 — Preserving traversal order with an explicit stack

Recursive preorder traversal processes:

```text
node, left subtree, right subtree
```

```python
def preorder_recursive(node: Node | None, result: list[int]) -> None:
    if node is None:
        return

    result.append(node.value)
    preorder_recursive(node.left, result)
    preorder_recursive(node.right, result)
```

Iterative version:

```python
def preorder_iterative(root: Node | None) -> list[int]:
    if root is None:
        return []

    result: list[int] = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.value)

        if node.right is not None:
            stack.append(node.right)
        if node.left is not None:
            stack.append(node.left)

    return result
```

The right child is pushed first because the stack is LIFO. The left child is therefore removed and processed first.

This is a typical conversion detail: an explicit stack must reproduce the order that recursive calls would have created automatically.

---

## Example 9 — Duplicated recursive work

Naive Fibonacci:

```python
def fibonacci(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

The call tree repeats subproblems:

```text
fibonacci(5)
├── fibonacci(4)
│   ├── fibonacci(3)
│   └── fibonacci(2)
└── fibonacci(3)
```

`fibonacci(3)` is computed more than once, and the duplication grows rapidly.

An iterative version avoids repeated work:

```python
def fibonacci_iterative(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")

    previous = 0
    current = 1

    for _ in range(n):
        previous, current = current, previous + current

    return previous
```

Complexity:

```text
Naive recursive time: exponential
Naive recursive stack depth: O(n)
Iterative time: O(n)
Iterative auxiliary space: O(1)
```

The recursive definition is mathematically elegant but the direct implementation is operationally poor.

---

## Example 10 — Hidden mutation across recursive frames

```python
def collect_positive(values: list[int], index: int = 0,
                     result: list[int] = []) -> list[int]:
    if index == len(values):
        return result

    if values[index] > 0:
        result.append(values[index])

    return collect_positive(values, index + 1, result)
```

This function has a dangerous default argument. The list is created once when the function definition is evaluated, then reused across separate top-level calls.

A later call may receive results left by an earlier call.

Correct interface:

```python
def collect_positive(values: list[int], index: int = 0,
                     result: list[int] | None = None) -> list[int]:
    if result is None:
        result = []

    if index == len(values):
        return result

    if values[index] > 0:
        result.append(values[index])

    return collect_positive(values, index + 1, result)
```

The remaining mutation is intentional and local to one top-level execution. An alternative functional design can return new lists, trading simpler aliasing behaviour for additional allocation.

---

## Example 11 — Recursion depth as an input constraint

```python
def countdown(n: int) -> None:
    if n < 0:
        return
    countdown(n - 1)
```

The mathematical termination proof is valid for non-negative `n`, but operational success also depends on the runtime recursion limit.

For very large `n`, Python may raise `RecursionError` before reaching the base case.

This distinction is essential:

```text
mathematical termination ≠ guaranteed successful execution under finite runtime resources
```

The iterative version avoids call-stack growth:

```python
def countdown_iterative(n: int) -> None:
    while n >= 0:
        n -= 1
```

---

## Example 12 — A complete design decision

Problem:

> Determine whether a deeply nested structure contains a target integer.

Recursive design:

```python
def deep_contains(item: NestedInt, target: int) -> bool:
    if isinstance(item, int):
        return item == target

    for child in item:
        if deep_contains(child, target):
            return True

    return False
```

Correctness idea:

- an integer contains the target exactly when it equals the target;
- a list contains the target exactly when at least one child contains it.

Termination idea:

- every call processes a proper component of a finite nested structure;
- eventually the process reaches integers or empty lists.

Complexity:

```text
Worst-case time: O(n)
Call-stack space: O(h)
```

Design judgement:

- recursion matches the recursive data model;
- an explicit stack is safer when nesting depth may be externally controlled or extremely large;
- early return preserves efficiency when the target is found near the beginning.

---

## Final integration questions

For every function in this chapter, be able to answer:

1. What is the contract?
2. Which state is local to one frame?
3. Which state is external or shared?
4. What unfinished work must be remembered?
5. What causes stack growth?
6. What is the base case or loop exit?
7. What measure guarantees progress?
8. What happens during unwinding?
9. What are the time and auxiliary-space costs?
10. Would an explicit stack or loop improve the design?

A complete analysis treats function calls as an operational mechanism, not merely as syntax.
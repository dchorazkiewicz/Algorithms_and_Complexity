# Module 05 Review

## Purpose of the review

This review checks whether you can explain function calls and recursion as an execution mechanism. The objective is not to recognise familiar code. You should be able to reconstruct the call stack, identify local and external state, justify termination, diagnose failure modes, and decide whether recursion or iteration is the better representation.

---

## 1. Core vocabulary

Define each term in your own words and give a small example:

1. argument;
2. parameter;
3. local variable;
4. return value;
5. external state;
6. side effect;
7. pure function;
8. stack frame;
9. call stack;
10. continuation point;
11. recursive case;
12. base case;
13. direct recursion;
14. indirect recursion;
15. mutual recursion;
16. nested recursion;
17. explicit stack;
18. recursion depth;
19. unwinding;
20. duplicated subproblem.

A definition is complete only when it distinguishes the term from closely related ideas.

---

## 2. Explain without code

Answer in complete sentences.

1. Why does each active function call need its own local environment?
2. What information must be remembered when one function calls another?
3. Why is a returned value not a side effect?
4. Why can a function with the correct return value still have an incorrect interface?
5. How does recursion use the ordinary function-call mechanism?
6. Why is a base case necessary but not sufficient for termination?
7. What does it mean for a recursive call to make progress?
8. Why can indirect recursion be harder to detect than direct recursion?
9. Why does an explicit stack make pending work visible?
10. Why may a mathematically terminating recursive function still fail in Python?
11. Why can a short recursive function use more memory than a longer iterative version?
12. Why can changing recursive call order change observable behaviour?
13. Why is naive recursive Fibonacci inefficient?
14. What is hidden when recursion appears elegant?
15. When does recursion match the structure of a problem better than iteration?

---

## 3. Function boundaries and side effects

For each function, identify:

- inputs;
- returned value;
- local state;
- external state read;
- external state changed;
- all side effects;
- whether the interface makes those effects clear.

### A

```python
def square(value: int) -> int:
    return value * value
```

### B

```python
counter = 0


def next_id() -> int:
    global counter
    counter += 1
    return counter
```

### C

```python
def append_total(values: list[int]) -> None:
    values.append(sum(values))
```

### D

```python
def report(value: int) -> int:
    print(f"value={value}")
    return value
```

### E

```python
def remove_negative(values: list[int]) -> list[int]:
    return [value for value in values if value >= 0]
```

Explain which functions are easiest to test and why.

---

## 4. Stack tracing

Trace the exact order of calls and returns.

### Exercise 1

```python
def first(value: int) -> int:
    return value + 1


def second(value: int) -> int:
    return 2 * first(value)


def third(value: int) -> int:
    return second(value) - first(value)
```

Trace `third(4)`. Draw the stack after every push and pop.

### Exercise 2

```python
def mystery(n: int) -> int:
    if n == 0:
        return 1
    return 2 * mystery(n - 1)
```

Trace `mystery(3)` through expansion and unwinding.

### Exercise 3

```python
def display(n: int) -> None:
    if n == 0:
        return
    print(n)
    display(n - 1)
    print(n)
```

Predict the output for `display(3)` and explain which lines execute during descent and which during unwinding.

---

## 5. Identify the recursive structure

For each function, identify:

- base case;
- recursive case;
- argument of the recursive call;
- termination measure;
- pending work after the call;
- maximum recursion depth as a function of input size.

### A

```python
def power(base: int, exponent: int) -> int:
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)
```

### B

```python
def contains(values: list[int], target: int, index: int = 0) -> bool:
    if index == len(values):
        return False
    if values[index] == target:
        return True
    return contains(values, target, index + 1)
```

### C

```python
def gcd(a: int, b: int) -> int:
    if b == 0:
        return a
    return gcd(b, a % b)
```

### D

```python
def count_nodes(node) -> int:
    if node is None:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)
```

---

## 6. Diagnose broken recursion

For each example, identify the defect, give a counterexample, and repair the function.

### Missing base case

```python
def countdown(n: int) -> None:
    print(n)
    countdown(n - 1)
```

### Unreachable base case

```python
def descend(n: int) -> int:
    if n == 0:
        return 0
    return descend(n + 1)
```

### No progress on one branch

```python
def search(values: list[int], target: int, index: int = 0) -> bool:
    if index == len(values):
        return False
    if values[index] == target:
        return True
    return search(values, target, index)
```

### Incorrect base result

```python
def product(values: list[int], length: int) -> int:
    if length == 0:
        return 0
    return product(values, length - 1) * values[length - 1]
```

### Hidden shared state

```python
def collect(values: list[int], result: list[int] = []) -> list[int]:
    if not values:
        return result
    result.append(values[0])
    return collect(values[1:], result)
```

### Duplicated work

```python
def paths(n: int) -> int:
    if n <= 1:
        return 1
    return paths(n - 1) + paths(n - 2)
```

---

## 7. Indirect and mutual recursion

Consider:

```python
def alpha(n: int) -> int:
    if n == 0:
        return 0
    return beta(n - 1)


def beta(n: int) -> int:
    if n == 0:
        return 1
    return alpha(n - 1)
```

Answer:

1. Is either function directly recursive?
2. What is the call cycle?
3. What measure decreases across the cycle?
4. Trace `alpha(4)`.
5. What does `alpha(n)` return for even and odd `n`?
6. How would the analysis change if `beta` called `alpha(n)` instead of `alpha(n - 1)`?

---

## 8. Nested recursion

Consider:

```python
def nested(n: int) -> int:
    if n <= 0:
        return 0
    return nested(nested(n - 1))
```

Explain:

1. which call must finish before the outer recursive call can begin;
2. why the evaluation order is more difficult to trace than direct linear recursion;
3. whether subproblems are repeated;
4. what input measure might support a termination argument;
5. why a simpler formulation should be preferred when it expresses the same computation.

Do not rely only on running the program. Draw the call relationships for `nested(2)`.

---

## 9. Convert recursion to iteration

### Exercise 1 — Sum

Convert:

```python
def recursive_sum(values: list[int], length: int) -> int:
    if length == 0:
        return 0
    return recursive_sum(values, length - 1) + values[length - 1]
```

State the iterative invariant.

### Exercise 2 — Binary search

Convert recursive binary search to a loop using the same half-open interval `[left, right)`.

State:

- loop condition;
- interval invariant;
- termination measure;
- time and space complexity.

### Exercise 3 — Tree preorder

Convert recursive preorder traversal to an explicit-stack implementation. Explain why the right child must be pushed before the left child.

### Exercise 4 — Nested list processing

Convert recursive deep sum to an explicit-stack implementation. Define what each element of the stack represents.

### Exercise 5 — Work after the recursive call

Convert:

```python
def print_up(n: int) -> None:
    if n == 0:
        return
    print_up(n - 1)
    print(n)
```

Preserve output order exactly.

---

## 10. Convert iteration to recursion

Write recursive versions of:

1. counting positive values in a list;
2. finding the first index of a target;
3. computing the maximum of a non-empty list;
4. checking whether a string is a palindrome;
5. Euclid's algorithm;
6. processing a half-open interval of indices.

For each version, state the smaller subproblem and the progress measure.

---

## 11. Compare alternatives

For each problem, decide whether recursion, a scalar-state loop, or a loop with an explicit stack is the best primary representation. Justify the choice.

1. Sum a flat list of ten million integers.
2. Traverse a balanced binary tree.
3. Traverse a user-provided directory structure of unknown depth.
4. Compute factorial for a small teaching example.
5. Search a sorted array.
6. Evaluate a nested arithmetic expression.
7. Walk through a graph with cycles.
8. Generate all solutions to a backtracking problem.
9. Reverse a singly linked list.
10. Process a deeply nested JSON document from an untrusted source.

Your justification must mention clarity, depth, state, failure modes, and auxiliary space.

---

## 12. Complexity exercises

Give time and auxiliary-space complexity.

### A

```python
def linear(n: int) -> int:
    if n == 0:
        return 0
    return 1 + linear(n - 1)
```

### B

```python
def halve(n: int) -> int:
    if n <= 1:
        return 1
    return 1 + halve(n // 2)
```

### C

```python
def duplicate(n: int) -> int:
    if n <= 1:
        return 1
    return duplicate(n - 1) + duplicate(n - 1)
```

### D

```python
def two_branches(node) -> int:
    if node is None:
        return 0
    return two_branches(node.left) + two_branches(node.right) + 1
```

### E

```python
def slices(values: list[int]) -> int:
    if not values:
        return 0
    return values[0] + slices(values[1:])
```

For E, account for list slicing rather than assuming the recursive call is the only cost.

---

## 13. Side-effect redesign

Redesign each interface so that dependencies and mutation are clearer.

### Global accumulator

```python
total = 0


def add_all(values: list[int]) -> None:
    global total
    for value in values:
        total += value
```

### Printing from a computation

```python
def average(values: list[float]) -> None:
    print(sum(values) / len(values))
```

### Mutating input without signalling it

```python
def normalise(values: list[float]) -> list[float]:
    maximum = max(values)
    for index in range(len(values)):
        values[index] /= maximum
    return values
```

For each redesign, state whether the function returns a new value, mutates an argument, emits output, or does more than one of these.

---

## 14. Complete tracing task

Trace the following function for `values = [3, 1, 4]`:

```python
def weighted(values: list[int], index: int = 0) -> int:
    if index == len(values):
        return 0

    contribution = (index + 1) * values[index]
    return contribution + weighted(values, index + 1)
```

Your trace must show:

- every frame's `index`;
- every frame's `contribution`;
- the base return value;
- every value produced during unwinding;
- the final result;
- the termination measure;
- time and space complexity.

---

## 15. Design task — Balanced delimiters

Design an algorithm that checks whether `()`, `[]`, and `{}` delimiters in a string are balanced and correctly nested.

Requirements:

- use an explicit stack;
- ignore non-delimiter characters;
- reject a closing delimiter without a matching opener;
- reject leftover openers at the end.

Provide:

1. contract;
2. meaning of the stack;
3. loop invariant;
4. Python implementation;
5. correctness argument;
6. termination argument;
7. time and auxiliary-space complexity;
8. tests for ordinary and boundary cases.

Then explain what a recursive parser would store implicitly in call frames.

---

## 16. Design task — Flatten a nested list

Given a finite nested list of integers, return the integers in left-to-right order.

Example:

```text
[1, [2, [3, 4]], 5] → [1, 2, 3, 4, 5]
```

Create:

- a recursive version;
- an iterative explicit-stack version.

Explain how the iterative version preserves left-to-right order. Compare maximum call depth, explicit stack size, time, and output allocation.

---

## 17. Capstone problem — Evaluate an expression tree

An expression tree contains:

- integer leaves;
- operator nodes `+`, `-`, `*`, and integer division.

Design a recursive evaluator.

Your solution must include:

1. a data model for leaves and operator nodes;
2. a contract;
3. recursive cases;
4. treatment of division by zero;
5. a full trace for one expression;
6. a correctness argument based on tree structure;
7. a termination argument;
8. time and stack-space complexity;
9. an iterative postorder version using explicit stacks;
10. a comparison of the two implementations.

The capstone is complete only when both implementations evaluate operators after their operands.

---

## 18. Mastery checklist

You have mastered Module 05 when you can honestly say:

- [ ] I can distinguish arguments, parameters, local state, returned values, and external state.
- [ ] I can identify all observable side effects of a function.
- [ ] I can explain what a stack frame stores conceptually.
- [ ] I can draw the call stack for nested and recursive calls.
- [ ] I can separate recursive expansion from unwinding.
- [ ] I can identify base cases, recursive cases, and progress measures.
- [ ] I can analyse indirect and mutual recursion across several functions.
- [ ] I can explain why nested recursion is difficult to trace.
- [ ] I can replace simple recursion with a loop.
- [ ] I can replace structural recursion with an explicit stack.
- [ ] I can preserve traversal and side-effect order during conversion.
- [ ] I can diagnose missing progress, excessive depth, repeated work, and hidden mutation.
- [ ] I can compare recursive and iterative time and auxiliary space.
- [ ] I can choose a representation based on problem structure and runtime constraints.

---

## Closing summary

A function call creates a temporary execution context. Nested calls form a LIFO stack of unfinished computations. Recursion uses this ordinary mechanism repeatedly, which makes recursive structure concise but also introduces depth, memory, and control-flow consequences.

A complete recursive design requires more than a self-call. It requires a valid contract, a reachable base case, progress toward that base case, a correct relationship between smaller and larger instances, and an operational analysis of stack growth and repeated work.

Iteration and explicit stacks provide alternative representations of the same pending work. The strongest understanding is the ability to move between these representations while preserving correctness, order, termination, and observable behaviour.
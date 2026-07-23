# Recursion

## Why recursion is not “a function calling itself”

A recursive function does call itself directly or indirectly, but that description is only syntactic. It does not explain why recursion works.

The real idea is **problem reduction**:

> Solve a problem by expressing it in terms of a smaller instance of the same kind, until a case is reached that can be solved directly.

A correct recursive design therefore needs three things:

1. a base case that requires no recursive call;
2. a recursive case that reduces the problem;
3. a progress argument showing that repeated reduction eventually reaches the base case.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to identify base and recursive cases, trace calls and returns, explain recursive progress and termination, and analyse simple recursive time and space costs.

---

## 1. A recursive definition: factorial

For a non-negative integer `n`, factorial is defined as:

```text
0! = 1
n! = n · (n - 1)!  for n > 0
```

This definition contains a base case and a recursive case.

Python implementation:

```python
def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")

    if n == 0:
        return 1

    return n * factorial(n - 1)
```

The function does not merely call itself. It calls itself with a smaller argument.

---

## 2. Base case

The **base case** stops recursive expansion.

```python
if n == 0:
    return 1
```

Without it, the function would continue producing calls with smaller and smaller integers until Python's recursion limit was exceeded.

A base case should satisfy two requirements:

- it must be solvable directly;
- it must be reachable from every valid recursive path.

A base case that exists but cannot be reached does not ensure termination.

---

## 3. Recursive case

The recursive case expresses the current answer using a smaller problem:

```python
return n * factorial(n - 1)
```

The current call cannot finish until the smaller call returns.

For `factorial(4)`, the calls expand as:

```text
factorial(4)
    needs 4 * factorial(3)
        needs 3 * factorial(2)
            needs 2 * factorial(1)
                needs 1 * factorial(0)
                    returns 1
```

Then the pending computations complete in reverse order:

```text
factorial(1) returns 1 * 1 = 1
factorial(2) returns 2 * 1 = 2
factorial(3) returns 3 * 2 = 6
factorial(4) returns 4 * 6 = 24
```

Recursion therefore has two phases:

1. descending into smaller problems;
2. returning through suspended computations.

---

## 4. Call stack intuition

Each active function call has its own local context. For factorial, each call stores its own value of `n` and the operation waiting to be completed.

Conceptually:

```text
factorial(4): waiting for 4 * ...
factorial(3): waiting for 3 * ...
factorial(2): waiting for 2 * ...
factorial(1): waiting for 1 * ...
factorial(0): returns 1
```

These unfinished calls form the **call stack**.

The detailed mechanics of stack frames, indirect recursion, nested recursion, and explicit stack simulation are developed later in Module 05. Here the important point is that recursive calls consume additional execution context.

---

## 5. Termination through a decreasing argument

For factorial, use the measure:

```text
n
```

Under the precondition `n ≥ 0`:

- the measure is bounded below by `0`;
- every recursive call uses `n - 1`;
- therefore the measure strictly decreases;
- eventually `n == 0` and the base case is reached.

This is the recursive counterpart of a loop termination measure.

---

## 6. Correctness through smaller instances

Assume that `factorial(n - 1)` correctly returns `(n - 1)!`.

Then the recursive case returns:

```text
n · (n - 1)! = n!
```

The base case correctly returns `0! = 1`.

This reasoning is closely related to mathematical induction:

- establish the smallest case;
- show that correctness for a smaller case implies correctness for the next case.

---

## 7. Recursive sum of a list prefix

A list can be reduced by index.

```python
def recursive_sum(values: list[int], length: int) -> int:
    if length == 0:
        return 0

    return recursive_sum(values, length - 1) + values[length - 1]
```

Contract:

```text
Precondition:
    0 ≤ length ≤ len(values)

Postcondition:
    result = sum(values[0:length])
```

Base case: the sum of an empty prefix is zero.

Recursive case: the sum of a prefix of length `length` equals the sum of the first `length - 1` elements plus the final element of the prefix.

The measure `length` decreases by one.

---

## 8. Recursive search

```python
def contains_from(values: list[int], target: int, index: int = 0) -> bool:
    if index == len(values):
        return False

    if values[index] == target:
        return True

    return contains_from(values, target, index + 1)
```

The recursive state is the starting index of the unprocessed suffix.

Base case:

```text
index == len(values)
```

No elements remain, so the target is absent.

Recursive case:

- return `True` if the current element matches;
- otherwise search the smaller suffix beginning at `index + 1`.

Termination measure:

```text
len(values) - index
```

---

## 9. Euclid's algorithm recursively

```python
def gcd(first: int, second: int) -> int:
    if second == 0:
        return first

    return gcd(second, first % second)
```

The mathematical reduction is:

```text
gcd(a, b) = gcd(b, a mod b)
```

The second argument strictly decreases when positive, so recursion reaches the base case.

This is a good recursive algorithm because the problem itself has a natural smaller-instance relationship.

---

## 10. A missing base case

```python
def broken_countdown(n: int) -> None:
    print(n)
    broken_countdown(n - 1)
```

For any input, the function continues calling itself. Python eventually raises `RecursionError`.

The failure is not merely “too much recursion.” The design lacks a stopping definition.

---

## 11. A base case without progress

```python
def broken_factorial(n: int) -> int:
    if n == 0:
        return 1

    return n * broken_factorial(n)
```

A valid base case exists, but the recursive argument never changes. For `n > 0`, the base case is unreachable.

This demonstrates:

> A base case and progress are both necessary.

---

## 12. Overshooting the base case

```python
def countdown_by_two(n: int) -> None:
    if n == 0:
        return

    print(n)
    countdown_by_two(n - 2)
```

For an odd positive input, the sequence is:

```text
5, 3, 1, -1, -3, ...
```

It never equals zero.

Possible repairs include:

```python
if n <= 0:
    return
```

or restricting the precondition to non-negative even integers.

The base condition and progress rule must be compatible with the domain.

---

## 13. Recursive Fibonacci and repeated work

```python
def fibonacci(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")

    if n <= 1:
        return n

    return fibonacci(n - 1) + fibonacci(n - 2)
```

This definition is mathematically natural, but the straightforward implementation repeats many subproblems.

For example, `fibonacci(5)` computes `fibonacci(3)` through more than one branch.

The running time grows exponentially in this naive form, while recursion depth is `O(n)`.

This illustrates an important distinction:

> A clear recursive definition does not automatically imply an efficient recursive implementation.

Later topics will show techniques for avoiding repeated work.

---

## 14. Time and space complexity

For factorial:

```text
Time: O(n)
Call-stack space: O(n)
```

There is one recursive call per integer from `n` to `0`.

For recursive linear search:

```text
Worst-case time: O(n)
Call-stack space: O(n)
```

An iterative version can achieve the same time with `O(1)` auxiliary space.

Recursive space must include active calls, not only explicit data structures.

---

## 15. When recursion is natural

Recursion is often appropriate when the problem has recursive structure:

- tree traversal;
- divide-and-conquer algorithms;
- nested expressions;
- backtracking;
- recursively defined mathematical objects;
- graph search with careful visited-state handling.

For simple linear scans, iteration is often more direct and more space-efficient.

The choice should be based on structure, clarity, correctness, and cost—not on novelty.

---

## 16. Common mistakes

### Treating self-call as the definition of recursion

The important concept is reduction to smaller instances.

### Missing or unreachable base case

The recursion cannot terminate.

### No strict progress

The recursive argument remains unchanged or moves away from the base case.

### Wrong base value

A base case may stop recursion but return a value inconsistent with the problem definition.

### Losing information during reduction

The recursive call may solve a smaller problem that is not sufficient to reconstruct the current answer.

### Ignoring call-stack cost

Recursive code may use `O(n)` additional space even with no explicit list or stack.

### Repeated subproblem computation

A mathematically elegant recurrence may yield an inefficient implementation.

---

## 17. What you must be able to explain

After this chapter, you should be able to:

- define recursion through problem reduction;
- identify base and recursive cases;
- trace call expansion and return completion;
- describe the call stack conceptually;
- choose a decreasing recursive measure;
- explain recursive correctness by smaller instances;
- recognise unreachable base cases;
- analyse simple recursive time and stack space.

## 18. Practice

### Exercise 1 — Recursive power

Implement `power(base, exponent)` for a non-negative exponent using:

```text
base⁰ = 1
baseⁿ = base · baseⁿ⁻¹
```

State the contract and termination measure.

### Exercise 2 — Count occurrences

Recursively count how many times `target` occurs in a list prefix.

### Exercise 3 — Maximum of a prefix

Design a recursive maximum for a non-empty prefix. Explain why the empty case is excluded or handled separately.

### Exercise 4 — Repair termination

Find the problem:

```python
def sum_down(n: int) -> int:
    if n == 0:
        return 0
    return n + sum_down(n + 1)
```

### Exercise 5 — Trace calls

Draw the call and return sequence for `gcd(48, 18)`.

### Exercise 6 — Complexity comparison

Compare iterative and recursive implementations of factorial in time and auxiliary space.

## 19. Summary

Recursion solves a problem by reducing it to smaller instances of the same kind. A correct recursive algorithm combines a direct base case, a reconstructive recursive case, and strict progress toward termination. The next chapter compares recursion and iteration as alternative representations of repeated computation.
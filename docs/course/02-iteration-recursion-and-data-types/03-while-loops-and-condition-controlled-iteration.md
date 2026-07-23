# `while` Loops and Condition-Controlled Iteration

## Why `while` loops require more design

A `for` loop usually traverses a finite sequence or range. The iteration mechanism itself determines what comes next and when traversal ends.

A `while` loop is different. It repeats as long as a Boolean condition remains true:

```python
while condition:
    body
```

This flexibility makes `while` useful when the number of iterations is not known in advance. It also makes the loop more dangerous. The programmer must design the state, the condition, and the update so that the loop both performs the intended work and eventually stops.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to design a `while` loop from a state condition, identify how each iteration makes progress, trace the loop, and diagnose common infinite-loop and boundary errors.

---

## 1. Repetition until a condition changes

Consider the task:

> Count how many times a positive integer can be divided by `2` using integer division before it becomes `0`.

For example:

```text
20 → 10 → 5 → 2 → 1 → 0
```

Five divisions are performed.

A `while` loop expresses this naturally:

```python
def divisions_until_zero(number: int) -> int:
    if number <= 0:
        raise ValueError("number must be positive")

    count = 0

    while number > 0:
        number //= 2
        count += 1

    return count
```

The number of iterations depends on the changing value of `number`. It is not written directly in the source code.

---

## 2. The anatomy of a `while` loop

A condition-controlled loop has four essential parts.

### Initial state

```python
count = 0
```

The input parameter `number` is also part of the initial state.

### Condition

```python
number > 0
```

The condition decides whether another iteration should execute.

### Body

```python
number //= 2
count += 1
```

The body performs useful work and changes the state.

### Final state

When the condition becomes false:

```text
number == 0
```

and `count` records how many divisions were performed.

A well-designed loop makes the relationship between these parts explicit.

---

## 3. The condition is tested before the body

Python `while` is a **pre-test loop**. The condition is evaluated before every possible iteration.

```python
while number > 0:
```

If `number` is already `0`, the body executes zero times.

This matters because the condition defines the states from which another iteration is allowed.

For a valid positive input, the loop runs at least once. For an invalid or boundary state, the validation decides whether the loop should be entered at all.

---

## 4. State meanings

The loop uses two changing variables.

```text
number = the remaining value still to be reduced
count = the number of divisions already performed
```

After each iteration:

- `number` becomes a smaller remaining problem;
- `count` records one more completed operation.

For input `20`:

| Iteration | `number` before | `number` after | `count` after |
|---:|---:|---:|---:|
| Initial | 20 | — | 0 |
| 1 | 20 | 10 | 1 |
| 2 | 10 | 5 | 2 |
| 3 | 5 | 2 | 3 |
| 4 | 2 | 1 | 4 |
| 5 | 1 | 0 | 5 |

The final condition `number == 0` tells us that no remaining positive value needs to be processed.

---

## 5. Progress is not automatic

Consider the broken version:

```python
def broken(number: int) -> int:
    count = 0

    while number > 0:
        count += 1

    return count
```

If `number` begins positive, it never changes. The condition remains true forever.

The loop performs an update, but not one that affects the stopping condition.

This distinction is important:

> A loop can change state without making progress toward termination.

The state component relevant to the condition must evolve so that the condition can eventually become false.

---

## 6. Sentinel-controlled loops

Sometimes repetition ends when a special value appears.

```python
def read_until_stop() -> list[int]:
    result: list[int] = []

    while True:
        value = int(input("Enter a number, or 0 to stop: "))

        if value == 0:
            break

        result.append(value)

    return result
```

The value `0` is a **sentinel**: it signals termination rather than being processed as ordinary data.

The loop condition is written as `True`, and termination occurs through `break`. This can be clear when the stopping event is discovered inside the body, but it should not be used casually. The termination path must remain visible and justified.

An alternative is to read once before the loop and again at the end of each iteration. That approach may avoid `while True`, but it duplicates input code. The best structure depends on clarity.

---

## 7. Validation loops

A `while` loop can repeat until input satisfies a condition:

```python
def read_positive_integer() -> int:
    value = int(input("Enter a positive integer: "))

    while value <= 0:
        print("The value must be positive.")
        value = int(input("Enter a positive integer: "))

    return value
```

The state meaning is:

```text
value = the most recently entered integer
```

The loop continues while the value is invalid and stops when:

```text
value > 0
```

Termination depends on the environment: the user may continue entering invalid values forever. The program guarantees that it will stop if a valid value is eventually supplied, but it cannot force that event.

This shows that termination assumptions may involve external behaviour.

---

## 8. Search with an explicit index

A `while` loop can reproduce index-based traversal:

```python
def first_zero_index(values: list[int]) -> int:
    index = 0

    while index < len(values):
        if values[index] == 0:
            return index

        index += 1

    return -1
```

The important meanings are:

```text
index = position of the next element to inspect
values[0:index] contains no zero
```

The loop condition:

```python
index < len(values)
```

ensures that `values[index]` is valid.

The update:

```python
index += 1
```

moves the boundary by one position.

---

## 9. Off-by-one errors in `while` loops

Incorrect:

```python
while index <= len(values):
    if values[index] == 0:
        return index
```

When `index == len(values)`, the condition is still true, but the index is invalid.

Correct:

```python
while index < len(values):
```

The valid-index rule is:

```text
0 ≤ index < len(values)
```

The loop condition should match that rule exactly.

---

## 10. Digit processing

`while` loops are natural for repeatedly reducing a number.

> Count the decimal digits of a non-negative integer.

```python
def digit_count(number: int) -> int:
    if number < 0:
        raise ValueError("number must be non-negative")

    if number == 0:
        return 1

    count = 0

    while number > 0:
        number //= 10
        count += 1

    return count
```

The special case for `0` is necessary because the general loop executes zero times for `0`, even though the decimal representation of zero contains one digit.

This is a boundary-case lesson:

> The natural stopping condition of a loop does not automatically encode every semantic convention of the problem.

---

## 11. Euclid's algorithm

The greatest common divisor provides a more meaningful example.

```python
def gcd(first: int, second: int) -> int:
    if first < 0 or second < 0:
        raise ValueError("arguments must be non-negative")

    while second != 0:
        first, second = second, first % second

    return first
```

The key mathematical fact is:

```text
gcd(first, second) = gcd(second, first mod second)
```

Each iteration preserves the greatest common divisor while replacing the second value with a smaller non-negative remainder.

The loop terminates because the second value decreases within the finite set of non-negative integers until it reaches `0`.

This example combines correctness-preserving transformation with termination progress.

---

## 12. Designing the condition from the final state

A useful method for designing `while` loops is to begin with the desired stopping state.

For linear search, completion occurs when:

```text
target found OR all positions examined
```

For digit processing:

```text
no unprocessed digits remain
```

For Euclid's algorithm:

```text
second == 0
```

The loop condition is usually the logical opposite of completion:

```text
while work remains
```

This perspective is often clearer than guessing a condition directly from the code.

---

## 13. Complexity of `while` loops

The syntax alone does not reveal complexity. We must determine how quickly the state approaches termination.

### Linear progress

```python
index += 1
```

from `0` to `n` gives `O(n)` iterations.

### Multiplicative reduction

```python
number //= 2
```

gives `O(log number)` iterations.

### Nested progress

A `while` loop inside another loop may give quadratic or more complex behaviour.

The update rule determines the growth rate.

---

## 14. Common mistakes

### The condition variable never changes

The loop cannot terminate unless some relevant state changes externally.

### The update moves in the wrong direction

```python
while index < len(values):
    index -= 1
```

moves away from the upper boundary.

### The update skips valid states

Increasing an index by `2` processes only every second position.

### The boundary is invalid

Using `<= len(values)` permits one out-of-range index.

### The loop loses important information

Repeatedly modifying the only copy of an input may make the original value unavailable when it is still needed.

### `break` hides the only exit

A complex body with several nested conditions may make termination difficult to understand.

### The semantic boundary case is ignored

The digit count of zero requires explicit treatment.

---

## 15. What you must be able to explain

After this chapter, you should be able to:

- identify the initial state, condition, body, and update;
- explain why `while` is condition-controlled;
- distinguish state change from progress;
- design a loop from its intended final state;
- trace a `while` loop;
- diagnose infinite loops;
- handle boundary cases;
- explain sentinel and validation loops;
- infer complexity from linear or multiplicative progress.

## 16. Practice

### Exercise 1 — Reverse digits

Write a `while` loop that reverses the decimal digits of a non-negative integer. State the meaning of every state variable.

### Exercise 2 — Repeated subtraction

Compute integer division `a // b` for non-negative `a` and positive `b` using repeated subtraction. Explain termination and complexity.

### Exercise 3 — First target index

Rewrite a `for`-based linear search using `while`. State the valid-index condition precisely.

### Exercise 4 — Find the infinite loop

Explain why this loop fails:

```python
value = 10
while value != 0:
    value += 2
```

### Exercise 5 — Collatz trace

For a positive integer, repeatedly divide by `2` when even and replace by `3n + 1` when odd. Write a trace function, but distinguish testing examples from proving termination.

## 17. Summary

A `while` loop expresses repetition whose duration depends on changing state. Its correctness requires a meaningful state, a condition matching the remaining work, and updates that both preserve the algorithmic meaning and make progress toward completion.

The next chapter makes termination and loop correctness explicit through invariants and decreasing measures.
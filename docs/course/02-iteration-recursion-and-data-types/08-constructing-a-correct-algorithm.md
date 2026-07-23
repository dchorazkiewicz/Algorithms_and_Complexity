# Constructing a Correct Algorithm

## Correctness is designed, not added at the end

A common workflow is:

1. write code quickly;
2. run several examples;
3. fix visible errors;
4. assume the algorithm is correct.

This process may produce working programs, but it gives weak control over hidden assumptions, boundary cases, termination, and complexity.

A stronger workflow makes correctness part of the design. The specification determines the state. The state meaning determines the update. The update determines the invariant. The termination argument determines whether repetition can finish. Tests then challenge the design rather than replacing reasoning.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to move from a problem statement to a contract, choose iterative or recursive state, justify progress, implement the method in Python, and evaluate correctness and cost.

---

## 1. Running problem: count decimal digits

We will design an algorithm for:

> Given a non-negative integer, return the number of digits in its decimal representation.

Examples:

```text
0      → 1
7      → 1
42     → 2
1050   → 4
```

The input `0` immediately reveals an important boundary case. A repeated-division loop naturally performs zero iterations for zero, but the decimal representation still has one digit.

---

## 2. Write the contract

```text
Input:
    integer number

Precondition:
    number ≥ 0

Postcondition:
    result equals the number of decimal digits in number

Side effects:
    none
```

We choose to reject negative input explicitly:

```python
if number < 0:
    raise ValueError("number must be non-negative")
```

The contract separates semantic requirements from implementation details.

---

## 3. Study representative cases

### Smallest valid input

```text
0 → 1
```

### One digit

```text
7 → 1
```

### Exact power boundary

```text
10 → 2
100 → 3
```

### Internal zero

```text
1050 → 4
```

### Invalid input

```text
-8 → ValueError
```

These cases reveal that counting divisions until zero works for positive values, while zero needs deliberate handling.

---

## 4. Choose the state

For positive input, repeatedly removing the final decimal digit by integer division is natural:

```python
number //= 10
```

State meanings:

```text
remaining = the portion of the original number not yet removed
count = the number of digits already removed
```

We may modify a local copy so the original parameter meaning remains conceptually available:

```python
remaining = number
```

---

## 5. Design the iterative solution

```python
def digit_count_iterative(number: int) -> int:
    if number < 0:
        raise ValueError("number must be non-negative")

    if number == 0:
        return 1

    remaining = number
    count = 0

    while remaining > 0:
        remaining //= 10
        count += 1

    return count
```

The special case is part of the specification, not an arbitrary patch.

---

## 6. Explain the invariant

For positive input, after each iteration:

```text
count digits have been removed from the right,
and remaining is the original number with those digits removed
```

A numerical relationship is:

```text
original number = remaining · 10^count + removed suffix
```

where the removed suffix has fewer than `10^count` possible values.

For introductory reasoning, the verbal invariant is sufficient to explain that each iteration accounts for exactly one decimal digit.

---

## 7. Explain termination

Use the measure:

```text
remaining
```

For every positive integer:

```text
0 ≤ remaining // 10 < remaining
```

Thus the non-negative measure strictly decreases. It eventually becomes zero.

The loop cannot continue forever.

---

## 8. Explain completion

When the loop stops:

```text
remaining == 0
```

No decimal digits remain unprocessed. Since each iteration removed and counted one digit, `count` is the number of digits in the original positive input.

The special branch establishes the same postcondition for zero.

---

## 9. Complexity

For a positive number with `d` decimal digits, the loop executes `d` times.

Because:

```text
d = floor(log10(number)) + 1
```

we may state:

```text
Time: O(d), equivalently O(log number)
Auxiliary space: O(1)
```

The input model matters. Complexity in terms of numeric magnitude differs from complexity in terms of the number of digits used to represent the input.

---

## 10. Recursive design

The same reduction can be recursive.

For positive `number`:

```text
digits(number) = 1 + digits(number // 10)
```

A convenient base case is any one-digit non-negative number:

```text
0 ≤ number < 10
```

Implementation:

```python
def digit_count_recursive(number: int) -> int:
    if number < 0:
        raise ValueError("number must be non-negative")

    if number < 10:
        return 1

    return 1 + digit_count_recursive(number // 10)
```

The recursive argument strictly decreases by decimal division.

Time is `O(d)` and call-stack space is `O(d)`.

---

## 11. Compare the two designs

Both versions use the same conceptual reduction: remove one decimal digit.

The iterative version stores progress in:

```text
remaining, count
```

The recursive version stores pending additions in the call stack.

For this linear reduction, the iterative version is usually operationally preferable in Python because it uses constant auxiliary space. The recursive version makes the recurrence especially visible.

---

## 12. A reusable construction workflow

### Step 1 — State the problem precisely

Identify valid inputs and required outputs.

### Step 2 — Write the contract

Include preconditions, postconditions, side effects, and failure behaviour.

### Step 3 — Build examples

Include ordinary, smallest, repeated, extreme, and invalid cases.

### Step 4 — Choose a representation

Decide which primitive or compound values will represent the state.

### Step 5 — Choose iteration or recursion

Match the control structure to the problem shape.

### Step 6 — State the meaning of state

For loops, define accumulators, counters, indices, and processed regions. For recursion, define what each call returns for its subproblem.

### Step 7 — Establish the base or initial case

The state meaning must be true before repetition.

### Step 8 — Define progress

A loop update or recursive argument must move toward completion.

### Step 9 — Justify correctness

Use invariant preservation or correctness of smaller instances.

### Step 10 — Justify termination

Use a bounded decreasing measure.

### Step 11 — Analyse complexity

Count iterations, calls, operations, and auxiliary storage.

### Step 12 — Test against the specification

Use examples to expose defects and validate the implementation.

---

## 13. Diagnosing design errors

### Wrong domain

If negative integers are accepted unintentionally, integer division behaviour may not approach zero as expected.

### Wrong base case

A recursive base case `number == 0` with `1 + recurse(number // 10)` gives the wrong count structure unless handled carefully.

### Wrong update order

Counting before deciding whether a valid digit remains can create off-by-one errors.

### Hidden mutation

Destroying the only copy of the original input may prevent later validation or reporting.

### Vague termination

“The number gets smaller” should be replaced by a precise strict inequality in a bounded domain.

### Complexity stated in the wrong variable

`O(number)` is not the cost of repeated division by ten. The number of iterations is logarithmic in the magnitude.

---

## 14. Correctness and testing cooperate

Reasoning covers the general class of valid inputs. Tests target likely weaknesses.

```python
def _test_digit_count() -> None:
    assert digit_count_iterative(0) == 1
    assert digit_count_iterative(7) == 1
    assert digit_count_iterative(10) == 2
    assert digit_count_iterative(1050) == 4

    try:
        digit_count_iterative(-1)
    except ValueError:
        pass
    else:
        raise AssertionError("negative input should be rejected")
```

Testing does not prove the invariant or termination. It checks whether the implementation agrees with selected consequences of the specification.

---

## 15. What you must be able to explain

After this chapter, you should be able to:

- derive an algorithm from a contract;
- use examples before implementation;
- choose iterative and recursive state;
- justify a special boundary case;
- state an invariant or recursive meaning;
- identify a termination measure;
- compare time and auxiliary space;
- explain the role of tests without confusing them with proof.

## 16. Practice

### Exercise 1 — Sum of digits

Design iterative and recursive functions returning the sum of decimal digits of a non-negative integer.

### Exercise 2 — Count occurrences of a digit

Given `number` and `digit`, count how many decimal positions equal `digit`. Handle `number == 0` carefully.

### Exercise 3 — Integer exponentiation

Construct iterative and recursive algorithms for a non-negative exponent. Then improve the recursive version using exponentiation by squaring.

### Exercise 4 — Palindrome sequence

Design an iterative algorithm that checks whether a list reads the same forward and backward. State the invariant and shrinking-interval measure.

### Exercise 5 — First divisor

Return the smallest divisor greater than one of an integer `n > 1`. State the stopping boundary and complexity.

## 17. Summary

A correct algorithm is built by connecting specification, state, progress, and completion. Iteration and recursion are not isolated syntax patterns; they are control models whose correctness must be derived from explicit meanings and termination arguments.

The next chapter applies the module's ideas in several complete worked examples.
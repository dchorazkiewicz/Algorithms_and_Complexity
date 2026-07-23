# Loop Termination and Correctness

## Why “the loop seems to stop” is not enough

When a loop is tested on a few inputs and returns plausible answers, it is easy to assume that both correctness and termination have been established. They have not.

Two separate questions must be answered:

1. **Partial correctness:** if the loop terminates, is the result correct?
2. **Termination:** does the loop actually terminate for every valid input?

A loop can terminate and return a wrong answer. It can also preserve a correct relationship forever without ever reaching completion. A complete argument must address both.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to state a simple loop invariant, explain initialisation and preservation, identify a termination measure, and combine these ideas into a total-correctness argument.

---

## 1. A running example: sum of a prefix

Consider:

```python
def sum_values(values: list[int]) -> int:
    total = 0
    index = 0

    while index < len(values):
        total += values[index]
        index += 1

    return total
```

The desired postcondition is:

```text
result = sum(values)
```

To justify the loop, we need a statement that describes the relationship between the state and the part of the input already processed.

---

## 2. Loop invariant

A **loop invariant** is a property that is true before every iteration and remains true after every iteration.

For this loop:

```text
total = sum(values[0:index])
```

The slice `values[0:index]` contains exactly the elements processed so far.

The invariant connects the current state to the algorithm's history without storing the entire history.

---

## 3. Initialisation

Before the first iteration:

```text
index = 0
total = 0
```

The processed prefix is empty:

```text
values[0:0] = []
```

The sum of the empty prefix is `0`, so:

```text
total = sum(values[0:index])
```

is true initially.

This step checks that the chosen initial state establishes the invariant.

---

## 4. Preservation

Assume the invariant is true before an iteration:

```text
total = sum(values[0:index])
```

The body executes:

```python
total += values[index]
index += 1
```

After adding `values[index]`, `total` becomes the sum of the old processed prefix plus the next element.

After incrementing `index`, the new processed prefix includes exactly that element. Therefore:

```text
total = sum(values[0:new_index])
```

The invariant is preserved.

The order of assignments matters. The reasoning follows the actual state transitions.

---

## 5. Completion

The loop stops when:

```text
index < len(values)
```

is false. Because `index` never exceeds `len(values)`, the final state satisfies:

```text
index = len(values)
```

Combining this with the invariant gives:

```text
total = sum(values[0:len(values)])
```

which is the sum of the entire list.

The invariant alone does not prove the postcondition. It becomes useful when combined with the negation of the loop condition.

---

## 6. Termination measure

A **termination measure** or **variant** is a quantity that:

1. is bounded below;
2. decreases on every iteration;
3. cannot decrease forever.

For the summation loop, use:

```text
len(values) - index
```

This is the number of elements remaining.

Initially it is non-negative. Every iteration increments `index` by one, so the measure decreases by one. It cannot decrease below zero. Therefore only finitely many iterations are possible.

---

## 7. Invariant versus termination condition

These concepts serve different purposes.

The invariant describes what the current state **means**:

```text
total = sum of the processed prefix
```

The termination condition describes when **no further work remains**:

```text
index = len(values)
```

The termination measure explains why that condition will eventually be reached:

```text
remaining elements decrease by one
```

Confusing these roles leads to weak arguments.

---

## 8. Maximum example

```python
def maximum(values: list[int]) -> int:
    if not values:
        raise ValueError("values must not be empty")

    current_maximum = values[0]
    index = 1

    while index < len(values):
        if values[index] > current_maximum:
            current_maximum = values[index]
        index += 1

    return current_maximum
```

Invariant:

```text
current_maximum is the greatest value in values[0:index]
```

Initialisation: the first processed prefix contains one value, so its maximum is `values[0]`.

Preservation: the next value either becomes the new maximum or leaves the previous maximum valid.

Completion: when `index = len(values)`, the processed prefix is the entire list.

Termination measure:

```text
len(values) - index
```

---

## 9. Euclid's algorithm

```python
def gcd(first: int, second: int) -> int:
    while second != 0:
        first, second = second, first % second
    return first
```

Correctness relies on the invariant:

```text
gcd(first, second) remains equal to the gcd of the original inputs
```

Termination uses the measure:

```text
second
```

When `second > 0`, the remainder `first % second` satisfies:

```text
0 ≤ first % second < second
```

Thus the non-negative measure strictly decreases until it reaches zero.

This is stronger than saying “the numbers get smaller.” The exact order and lower bound matter.

---

## 10. A loop may preserve an invariant and still not terminate

```python
index = 0
while index < len(values):
    pass
```

The statement:

```text
0 ≤ index ≤ len(values)
```

remains true forever. Preservation alone does not imply progress.

A correctness argument that omits termination proves only partial correctness.

---

## 11. A terminating loop may still be incorrect

```python
def broken_sum(values: list[int]) -> int:
    total = 0
    index = 0

    while index < len(values):
        index += 1
        total += values[index]

    return total
```

The loop moves toward termination, but the update order accesses the wrong index and eventually goes out of range.

Termination progress cannot replace state correctness.

---

## 12. Choosing useful invariants

A useful invariant should be:

- true initially;
- preserved by the body;
- strong enough to imply the postcondition at termination;
- simple enough to reason about.

Too weak:

```text
total is an integer
```

This is true but does not explain the result.

Too specific:

```text
total equals 14
```

This applies only to one execution.

Useful:

```text
total equals the sum of the processed prefix
```

This captures the general relationship needed for correctness.

---

## 13. Termination measures for common patterns

### Increasing index

```text
n - index
```

### Decreasing counter

```text
counter
```

### Interval shrinking

```text
right - left + 1
```

### Repeated division

```text
number
```

when the positive number is replaced by a strictly smaller non-negative value.

### Remaining collection

```text
number of unprocessed items
```

The measure need not decrease by exactly one. It must decrease strictly in a well-founded domain.

---

## 14. Total correctness structure

A disciplined proof outline is:

### Preconditions

State what is assumed about the input.

### Invariant initialisation

Show that the invariant is true before the first iteration.

### Invariant preservation

Assume it is true before an iteration and show that the body makes it true afterward.

### Termination

Identify a bounded measure that strictly decreases.

### Postcondition

Combine the invariant with the final condition to derive the required result.

This pattern will recur in searching, sorting, graph traversal, and data-structure algorithms.

---

## 15. Common mistakes

### Stating only what the loop does syntactically

“`index` increases” does not explain correctness.

### Using the postcondition as the invariant

The final result may not be true during intermediate iterations.

### Giving an invariant that is too weak

A true statement is not automatically useful.

### Saying “the loop obviously ends”

A termination argument should identify a concrete measure and update.

### Ignoring invalid input

A maximum loop requires a non-empty input or separate failure behaviour.

### Proving only examples

A trace illustrates one execution; an invariant argument covers every valid input.

---

## 16. What you must be able to explain

After this chapter, you should be able to:

- distinguish partial from total correctness;
- state a loop invariant;
- justify initialisation and preservation;
- combine an invariant with loop completion;
- identify a decreasing termination measure;
- explain why bounded strict decrease implies termination;
- diagnose weak invariants and vague termination arguments.

## 17. Practice

### Exercise 1 — Count positives

Give an invariant and termination measure for a `while` loop that counts positive values.

### Exercise 2 — First target index

Design an invariant for linear search that returns the first target index.

### Exercise 3 — Reverse a list in place

For a two-index swapping algorithm, propose an invariant describing the correctly reversed outer regions.

### Exercise 4 — Repeated subtraction

Prove termination for division by repeated subtraction under the precondition `a ≥ 0` and `b > 0`.

### Exercise 5 — Critique an argument

Explain what is missing from:

> The loop is correct because it increases `index` until the end.

## 18. Summary

Loop correctness is built from meaning and progress. The invariant explains the relationship preserved by each iteration. The termination measure explains why repetition cannot continue forever. Together with the final condition, they connect the initial specification to the returned result.

The next chapter introduces recursion, where the same two concerns reappear as base cases, recursive progress, and reasoning over smaller problem instances.
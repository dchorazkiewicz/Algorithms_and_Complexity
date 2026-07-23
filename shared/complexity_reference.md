# Complexity Analysis Reference

## Purpose

This document defines the baseline method used throughout the repository to analyze algorithmic time and auxiliary space.

> **Required**
> The syllabus requires analysis of algorithmic time complexity, computational complexity, Big O notation, examples of complexity calculations, and comparison of algorithmic efficiency.

> **Explanation**
> The course materials use a repeatable analysis process: define the input size, identify the dominant operations, derive a cost function or bound, and state the resulting asymptotic complexity.

---

## 1. What complexity analysis describes

Complexity analysis describes how resource usage grows as the input size grows.

The two primary resources in this course are:

- **time complexity** — growth in the number of relevant operations;
- **auxiliary space complexity** — growth in additional memory used by the algorithm, excluding the input unless stated otherwise.

Complexity is not the same as measured wall-clock time. Actual execution time also depends on hardware, compiler, interpreter, cache behavior, operating-system load, and implementation constants.

---

## 2. Define the input size first

A complexity statement is incomplete unless the input-size parameter is clear.

Examples:

- sequence algorithm: `n = length(values)`;
- matrix algorithm: `r = number of rows`, `c = number of columns`;
- graph algorithm: `V = number of vertices`, `E = number of edges`;
- integer algorithm: input size may mean the numeric value or the number of bits; the material must state which one is used;
- two-sequence algorithm: `n = length(left)`, `m = length(right)`.

Do not use `O(n)` when the meaning of `n` has not been defined.

---

## 3. Big O notation

Big O gives an asymptotic upper bound.

Informally, `T(n) = O(f(n))` means that, beyond some input size, `T(n)` grows no faster than a constant multiple of `f(n)`.

For introductory analysis, keep the fastest-growing term and ignore constant factors.

Examples:

```text
3n + 7       → O(n)
5n² + 2n + 9 → O(n²)
12           → O(1)
```

This simplification is valid for asymptotic growth, but constants may still matter in engineering comparisons between implementations with the same asymptotic class.

---

## 4. Common growth classes

| Complexity | Name | Typical example |
|---|---|---|
| `O(1)` | constant | indexed array access |
| `O(log n)` | logarithmic | binary search |
| `O(n)` | linear | linear scan |
| `O(n log n)` | linearithmic | efficient comparison sorting |
| `O(n²)` | quadratic | all pairs in one sequence |
| `O(n³)` | cubic | three nested loops over the same input size |
| `O(2^n)` | exponential | exploring all subsets in a direct exhaustive formulation |
| `O(n!)` | factorial | generating all permutations |

The table describes typical patterns, not automatic rules. The actual cost depends on the operations performed and their own complexity.

---

## 5. Standard analysis procedure

For each algorithm:

1. define the input-size parameter or parameters;
2. identify the operation whose repetitions dominate the cost;
3. determine how many times it executes;
4. include the cost of non-constant helper operations;
5. distinguish relevant cases;
6. simplify the resulting growth function;
7. state time complexity;
8. state auxiliary space complexity;
9. list assumptions.

Suggested reporting template:

```text
Input size:
    n = length(values)

Dominant operation:
    comparison of values[index] with target

Best-case time:
    O(1)

Worst-case time:
    O(n)

Auxiliary space:
    O(1)

Assumptions:
    Indexing values is O(1).
```

---

## 6. Sequential statements

Sequential costs are added.

```text
first phase:  O(n)
second phase: O(n²)
third phase:  O(1)
```

Total:

```text
O(n + n² + 1) = O(n²)
```

The largest asymptotic term dominates.

---

## 7. Single loops

A loop with `n` iterations and constant work per iteration is `O(n)`.

```text
FOR each value IN values DO
    total ← total + value
END FOR
```

Assuming reading an element and adding it are constant-time operations:

- time: `O(n)`;
- auxiliary space: `O(1)`.

If the loop body performs a non-constant operation, multiply by that operation's cost.

Example: copying a prefix of length `i` inside iteration `i` does not produce a simple `O(n)` loop.

---

## 8. Nested loops

For independent nested loops, multiply the iteration counts.

```text
FOR i ← 0 TO n - 1 DO
    FOR j ← 0 TO n - 1 DO
        process(i, j)
    END FOR
END FOR
```

Time: `O(n²)`.

For different input dimensions:

```text
FOR each left_value IN left DO       // n values
    FOR each right_value IN right DO // m values
        compare(left_value, right_value)
    END FOR
END FOR
```

Time: `O(nm)`, not automatically `O(n²)`.

---

## 9. Triangular loops

A dependent inner loop often forms a sum.

```text
FOR i ← 0 TO n - 1 DO
    FOR j ← 0 TO i DO
        process(i, j)
    END FOR
END FOR
```

Number of iterations:

```text
1 + 2 + ... + n = n(n + 1) / 2
```

Time: `O(n²)`.

---

## 10. Loops with multiplicative progress

A loop that repeatedly multiplies or divides the remaining problem size by a constant is usually logarithmic.

```text
value ← n
WHILE value > 1 DO
    value ← value DIV 2
END WHILE
```

After `k` iterations:

```text
n / 2^k ≤ 1
```

Therefore `k = O(log n)`.

The logarithm base is omitted in Big O because changing the base introduces only a constant factor.

---

## 11. Consecutive versus nested loops

Consecutive loops add:

```text
O(n) + O(n) = O(n)
```

Nested loops multiply only when one is executed for each iteration of the other:

```text
O(n) × O(n) = O(n²)
```

Do not classify code as quadratic merely because it contains two loops.

---

## 12. Conditional branches

For worst-case analysis, use the most expensive reachable branch.

```text
IF condition THEN
    linear_work()
ELSE
    quadratic_work()
END IF
```

Worst-case time: `O(n²)`.

For average-case analysis, branch probabilities and an input distribution must be defined. Do not claim an average-case bound without specifying assumptions.

---

## 13. Best, average, and worst cases

### Best case

The least work for an input of size `n`.

### Worst case

The greatest work for an input of size `n`.

### Average case

Expected work under a stated probability distribution over inputs.

Example for linear search:

- best case: target is first, `O(1)`;
- worst case: target is last or absent, `O(n)`;
- average case: requires assumptions about target presence and position.

When no case is stated, course materials should normally report the worst-case upper bound and label it explicitly.

---

## 14. Space complexity

Distinguish:

- input storage;
- output storage;
- auxiliary storage;
- recursion call-stack storage.

Example:

```text
result ← new array of length n
```

If `result` is required output, a module may report both:

```text
Output space: O(n)
Auxiliary space excluding output: O(1)
```

The convention used must be stated.

---

## 15. Recursion

Recursive analysis must account for:

- number of calls;
- work performed in each call;
- maximum recursion depth;
- additional structures created by each call.

Example:

```text
FUNCTION sum_prefix(values, count)
    IF count = 0 THEN
        RETURN 0
    END IF
    RETURN sum_prefix(values, count - 1) + values[count - 1]
END FUNCTION
```

For `n = count`:

- one recursive call per element;
- constant work per call;
- time: `O(n)`;
- call-stack space: `O(n)`.

A recursive algorithm with the same time complexity as an iterative version may use more auxiliary space because of the call stack.

---

## 16. Divide and conquer

A typical divide-and-conquer recurrence has the form:

```text
T(n) = aT(n / b) + f(n)
```

where:

- `a` is the number of subproblems;
- `n / b` is the size of each subproblem;
- `f(n)` is the cost of dividing and combining.

For introductory modules, recurrence trees and level-by-level reasoning should be preferred before formal theorem-based methods.

> **Extension**
> The Master Theorem may be introduced later as an additional analysis tool. It is not required merely because divide and conquer appears in the syllabus.

---

## 17. Data-structure operation costs

Complexity claims must use the actual structure selected by the implementation.

Examples:

- indexing a Python `list` or C++ `std::vector`: `O(1)`;
- inserting at the beginning of a Python `list` or `std::vector`: `O(n)`;
- appending to a dynamic array: amortized `O(1)` under standard assumptions;
- searching an unsorted dynamic array: `O(n)`;
- stack push/pop at the supported end: `O(1)` under standard implementations;
- queue removal from a Python `list` using `pop(0)`: `O(n)`;
- queue removal from `collections.deque`: `O(1)` at the supported end.

Do not transfer a complexity result from one container to another without checking its operation guarantees.

---

## 18. Amortized complexity

> **Extension**

Amortized analysis bounds the average cost per operation over a sequence of operations, without requiring a probability distribution.

Dynamic-array append is a standard example:

- most appends are constant time;
- occasional resizing is linear in the current size;
- over many appends, the amortized cost per append is `O(1)` under geometric capacity growth.

When amortized complexity is used, label it explicitly.

---

## 19. Theta and Omega notation

> **Extension**

- `O(f(n))` — asymptotic upper bound;
- `Ω(f(n))` — asymptotic lower bound;
- `Θ(f(n))` — asymptotically tight bound.

The required syllabus terminology emphasizes Big O notation. Theta and Omega may be used for precision after Big O is understood, but they must not obscure the required introductory method.

---

## 20. Empirical measurement

Timing experiments may support understanding but do not replace asymptotic analysis.

A valid experiment should:

- use multiple input sizes;
- repeat measurements;
- avoid including unrelated setup where possible;
- use comparable implementations;
- record the environment;
- interpret results cautiously.

Empirical observations should be labeled as measurements, not proofs of complexity.

---

## 21. Common analysis errors

Avoid:

- failing to define the input size;
- counting loops instead of iterations;
- assuming every loop is `O(n)`;
- multiplying consecutive loops;
- ignoring the cost of slicing, copying, sorting, hashing, or helper functions;
- reporting only time and omitting space;
- ignoring recursion depth;
- claiming average-case complexity without a distribution;
- treating Big O as an exact running time;
- saying `O(2n)` instead of simplifying to `O(n)`;
- assuming that a smaller asymptotic class is always faster for every practical input size.

---

## 22. Review checklist

For every complexity section:

- [ ] input-size parameters are defined;
- [ ] the analyzed case is named;
- [ ] dominant operations are identified;
- [ ] non-constant helper operations are included;
- [ ] time complexity is stated;
- [ ] auxiliary space is stated;
- [ ] recursion stack is counted when relevant;
- [ ] language-specific container costs are correct;
- [ ] assumptions are visible;
- [ ] required material is separated from extensions.

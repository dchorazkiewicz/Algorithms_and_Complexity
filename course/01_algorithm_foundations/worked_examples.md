# Worked Examples — Foundations of Algorithm Design

This document develops six small algorithms that expose the core structures required in this module: sequence, selection, iteration, decomposition, contracts, edge cases, and manual tracing.

The examples are deliberately simple. Their purpose is not to introduce advanced data structures, but to establish a disciplined way of describing, tracing, implementing, and analysing algorithms.

---

## Example 1 — Maximum of Two Values

**Required**

### Problem

Given two comparable values, return the greater one.

### Contract

**Input:** two comparable values `a` and `b`  
**Output:** the greater of `a` and `b`  
**Precondition:** `a` and `b` belong to the same ordered domain  
**Postcondition:** the result is equal to `a` or `b`, and is not smaller than either input  
**Side effects:** none

### Pseudocode

```text
ALGORITHM maximum_of_two(a, b)
    IF a >= b THEN
        RETURN a
    ELSE
        RETURN b
    END IF
END ALGORITHM
```

### Manual trace

Input: `a = 7`, `b = 4`

| Step | Condition | Action | Result |
|---:|---|---|---:|
| 1 | `7 >= 4` is true | return `a` | 7 |

Boundary case: `a = 5`, `b = 5`. The algorithm returns `a`, but either input is a valid maximum because both values are equal.

### Correctness argument

There are only two cases. If `a >= b`, then `a` is a maximum. Otherwise `a < b`, so `b` is a maximum.

### Complexity

- Time: `O(1)`
- Additional space: `O(1)`

---

## Example 2 — Maximum of Three Values

**Required**

### Problem

Given three comparable values, return the greatest one.

### Contract

**Input:** three comparable values `a`, `b`, `c`  
**Output:** the maximum value  
**Precondition:** all inputs belong to the same ordered domain  
**Postcondition:** the result equals one of the inputs and is not smaller than any input  
**Side effects:** none

### Pseudocode

```text
ALGORITHM maximum_of_three(a, b, c)
    maximum ← a

    IF b > maximum THEN
        maximum ← b
    END IF

    IF c > maximum THEN
        maximum ← c
    END IF

    RETURN maximum
END ALGORITHM
```

### Manual trace

Input: `a = 8`, `b = 13`, `c = 11`

| Step | `maximum` before | Test | `maximum` after |
|---:|---:|---|---:|
| 1 | — | initialise with `a` | 8 |
| 2 | 8 | `13 > 8` | 13 |
| 3 | 13 | `11 > 13` is false | 13 |

### Correctness argument

After processing each value, `maximum` stores the greatest value seen so far. After all three values are processed, it stores the maximum of the complete input.

### Complexity

- Time: `O(1)`
- Additional space: `O(1)`

---

## Example 3 — Swap Two Values

**Required**

### Problem

Exchange the values stored in two variables.

### Contract

**Input:** variables `a` and `b`  
**Output:** no separate return value is required in the state-based version  
**Precondition:** both variables exist  
**Postcondition:** the final value of `a` equals the initial value of `b`, and the final value of `b` equals the initial value of `a`

### Pseudocode

```text
ALGORITHM swap(a, b)
    temporary ← a
    a ← b
    b ← temporary
    RETURN (a, b)
END ALGORITHM
```

### Manual trace

Initial state: `a = 3`, `b = 9`

| Step | `temporary` | `a` | `b` |
|---:|---:|---:|---:|
| Initial | — | 3 | 9 |
| 1 | 3 | 3 | 9 |
| 2 | 3 | 9 | 9 |
| 3 | 3 | 9 | 3 |

### Correctness argument

The temporary variable preserves the original value of `a` before `a` is overwritten. Therefore neither original value is lost.

### Complexity

- Time: `O(1)`
- Additional space: `O(1)`

---

## Example 4 — Sum a Finite Sequence

**Required**

### Problem

Calculate the sum of all values in a finite sequence.

### Contract

**Input:** finite sequence `values` of numbers  
**Output:** sum of all elements  
**Precondition:** every element supports addition; the empty sequence is allowed  
**Postcondition:** the result equals the mathematical sum of all elements; for an empty sequence the result is `0`  
**Side effects:** none

### Pseudocode

```text
ALGORITHM sum_sequence(values)
    total ← 0

    FOR EACH value IN values DO
        total ← total + value
    END FOR

    RETURN total
END ALGORITHM
```

### Manual trace

Input: `[4, -2, 7, 1]`

| Iteration | Current value | `total` before | `total` after |
|---:|---:|---:|---:|
| Initial | — | — | 0 |
| 1 | 4 | 0 | 4 |
| 2 | -2 | 4 | 2 |
| 3 | 7 | 2 | 9 |
| 4 | 1 | 9 | 10 |

### Loop invariant

Before each iteration, `total` equals the sum of all values processed so far.

### Correctness argument

The invariant is true before the first iteration because no values have been processed and the sum is `0`. Each iteration adds exactly the next value, so the invariant remains true. When the loop ends, all values have been processed, so `total` is the required sum.

### Complexity

For `n = len(values)`:

- Time: `O(n)`
- Additional space: `O(1)`

---

## Example 5 — Count Values Satisfying a Predicate

**Required**

### Problem

Count how many values in a sequence satisfy a given condition.

### Contract

**Input:** finite sequence `values` and predicate `predicate`  
**Output:** number of elements for which the predicate returns true  
**Precondition:** the predicate can be applied to every element  
**Postcondition:** the result equals the number of indices `i` for which `predicate(values[i])` is true  
**Side effects:** none, assuming the predicate itself has no side effects

### Pseudocode

```text
ALGORITHM count_matching(values, predicate)
    count ← 0

    FOR EACH value IN values DO
        IF predicate(value) THEN
            count ← count + 1
        END IF
    END FOR

    RETURN count
END ALGORITHM
```

### Manual trace

Predicate: “is even”  
Input: `[5, 8, 2, 7, 4]`

| Iteration | Value | Predicate result | `count` after |
|---:|---:|---|---:|
| Initial | — | — | 0 |
| 1 | 5 | false | 0 |
| 2 | 8 | true | 1 |
| 3 | 2 | true | 2 |
| 4 | 7 | false | 2 |
| 5 | 4 | true | 3 |

### Loop invariant

Before each iteration, `count` equals the number of matching values among the elements processed so far.

### Complexity

If predicate evaluation is `O(1)`:

- Time: `O(n)`
- Additional space: `O(1)`

More generally, if one predicate evaluation costs `P(n)`, the total cost is `O(n · P(n))`.

---

## Example 6 — Minimum and Maximum in One Traversal

**Required**

### Problem

Find both the minimum and maximum values in a non-empty sequence using one traversal.

### Contract

**Input:** non-empty finite sequence `values` of comparable elements  
**Output:** pair `(minimum, maximum)`  
**Precondition:** `values` is not empty and all elements are mutually comparable  
**Postcondition:** `minimum` is not greater than any input element; `maximum` is not smaller than any input element; both results occur in the input  
**Failure behavior:** reject an empty sequence  
**Side effects:** none

### Pseudocode

```text
ALGORITHM minimum_and_maximum(values)
    REQUIRE length(values) > 0

    minimum ← values[0]
    maximum ← values[0]

    FOR index ← 1 TO length(values) - 1 DO
        value ← values[index]

        IF value < minimum THEN
            minimum ← value
        END IF

        IF value > maximum THEN
            maximum ← value
        END IF
    END FOR

    RETURN (minimum, maximum)
END ALGORITHM
```

### Manual trace

Input: `[6, 2, 9, 4, 1, 8]`

| Index | Value | Minimum before | Maximum before | Minimum after | Maximum after |
|---:|---:|---:|---:|---:|---:|
| 0 | 6 | — | — | 6 | 6 |
| 1 | 2 | 6 | 6 | 2 | 6 |
| 2 | 9 | 2 | 6 | 2 | 9 |
| 3 | 4 | 2 | 9 | 2 | 9 |
| 4 | 1 | 2 | 9 | 1 | 9 |
| 5 | 8 | 1 | 9 | 1 | 9 |

### Loop invariant

Before each iteration at index `i`, `minimum` and `maximum` are respectively the minimum and maximum of `values[0:i]`.

### Correctness argument

The invariant holds after initialisation for the one-element prefix containing `values[0]`. Each new value is compared with the current extrema and updates them when necessary. After the final iteration, the processed prefix is the complete sequence.

### Complexity

For `n = len(values)`:

- Time: `O(n)`
- Additional space: `O(1)`

---

## Comparison of the Examples

| Example | Main structure | Time | Extra space | Important concept |
|---|---|---:|---:|---|
| Maximum of two | selection | `O(1)` | `O(1)` | case analysis |
| Maximum of three | sequence + selection | `O(1)` | `O(1)` | best-so-far state |
| Swap | sequence | `O(1)` | `O(1)` | preserving state |
| Sum sequence | iteration | `O(n)` | `O(1)` | accumulator invariant |
| Count matching | iteration + selection | `O(n)` | `O(1)` | predicate and counter |
| Min and max | iteration + selection | `O(n)` | `O(1)` | simultaneous state updates |

## Common Errors Across the Examples

- writing code before defining the contract;
- ignoring empty input where the contract permits or forbids it;
- initialising an accumulator with the wrong neutral value;
- starting a traversal at index `0` after already using `values[0]` for initialisation;
- confusing assignment with comparison;
- changing the input when the algorithm is intended to be side-effect free;
- claiming `O(1)` time for a loop that processes all `n` elements;
- presenting language-specific syntax as if it were the algorithm itself.

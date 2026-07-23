# Pseudocode Conventions

## Status and purpose

This document defines the repository-wide pseudocode style. The conventions are designed to remain independent of Python and C++ while still being precise enough to translate into either language.

Pseudocode is used to describe the algorithm, not the syntax of a particular programming language.

> **Required**
> The syllabus requires students to work with pseudocode and to describe algorithms using initial and final assertions.

> **Explanation**
> In these materials, initial and final assertions are represented as **preconditions** and **postconditions**.

---

## 1. General formatting

- Keywords are written in uppercase.
- Variable and function names use `snake_case`.
- Indentation defines block structure.
- One logical action is written per line.
- Assignment uses `←`.
- Equality comparison uses `=`.
- Inequality uses `≠`.
- Comments begin with `//`.
- Arrays and sequences use zero-based indexing unless a module explicitly states otherwise.

Example:

```text
count ← 0
FOR each value IN values DO
    IF value > 0 THEN
        count ← count + 1
    END IF
END FOR
RETURN count
```

---

## 2. Algorithm header and contract

A complete algorithm description should begin with a contract.

```text
ALGORITHM algorithm_name(parameters)

INPUT:
    Description of supplied values.

OUTPUT:
    Description of the returned result.

PRECONDITIONS:
    Conditions that must hold before execution.

POSTCONDITIONS:
    Conditions guaranteed after normal completion.

SIDE EFFECTS:
    Description of modified external state, or NONE.
```

When failure behavior matters, add:

```text
FAILURE BEHAVIOR:
    Description of the rejected input or missing-result case.
```

---

## 3. Variables and assignment

Use assignment only for changing or initializing a value.

```text
index ← 0
maximum ← values[0]
```

Do not use `=` for assignment.

Multiple assignments should be written separately unless simultaneous assignment is essential to the algorithm.

```text
// Preferred
old_first ← first
first ← second
second ← old_first
```

A simultaneous swap may be written as:

```text
SWAP left WITH right
```

---

## 4. Primitive values and literals

Preferred literals:

```text
TRUE
FALSE
NULL
0
-1
"text"
```

Use `NULL` for the absence of an object or node reference. Use a problem-specific sentinel such as `-1` only when the contract defines it.

---

## 5. Arithmetic and logical operators

Arithmetic:

```text
+   -   *   /   MOD   DIV
```

- `DIV` means integer division.
- `MOD` means remainder.

Comparison:

```text
=   ≠   <   ≤   >   ≥
```

Logical operators:

```text
AND   OR   NOT
```

Parentheses should be used whenever operator precedence might be unclear.

---

## 6. Conditional statements

```text
IF condition THEN
    statements
END IF
```

```text
IF condition THEN
    statements
ELSE
    statements
END IF
```

```text
IF condition_1 THEN
    statements
ELSE IF condition_2 THEN
    statements
ELSE
    statements
END IF
```

Avoid deeply nested conditionals when guard clauses make the logic clearer.

```text
IF values IS EMPTY THEN
    FAIL "values must not be empty"
END IF
```

---

## 7. Iteration

### Iterating over a range

The upper bound is inclusive only when explicitly written with `TO`.

```text
FOR index ← 0 TO length(values) - 1 DO
    process values[index]
END FOR
```

For a half-open range, write the relation directly:

```text
FOR index ← 0 WHILE index < length(values) DO
    process values[index]
    index ← index + 1
END FOR
```

### Iterating over elements

```text
FOR each value IN values DO
    process value
END FOR
```

### While loop

```text
WHILE condition DO
    statements
END WHILE
```

Every loop explanation should identify:

- the loop condition;
- the update step;
- the termination argument;
- the loop invariant when it is pedagogically relevant.

---

## 8. Functions and procedures

Use `FUNCTION` when a value is returned.

```text
FUNCTION absolute_value(number)
    IF number < 0 THEN
        RETURN -number
    END IF
    RETURN number
END FUNCTION
```

Use `PROCEDURE` when the primary result is a side effect.

```text
PROCEDURE reverse_in_place(values)
    // modifies values
END PROCEDURE
```

A procedure may still return a status value when the contract requires it, but the distinction should remain conceptually clear.

---

## 9. Recursion

A recursive algorithm must clearly identify:

- the base case;
- the recursive case;
- the smaller subproblem;
- the progress measure that guarantees termination.

```text
FUNCTION factorial(number)
    PRECONDITION number ≥ 0

    IF number = 0 THEN
        RETURN 1
    END IF

    RETURN number * factorial(number - 1)
END FUNCTION
```

When explaining recursion, the material should distinguish the mathematical recurrence from the runtime call stack.

---

## 10. Arrays and sequences

Use square brackets for indexing:

```text
values[index]
```

Use:

```text
length(values)
```

for the number of elements.

A slice may be shown as:

```text
values[start : end]
```

where `start` is included and `end` is excluded. Because slicing may allocate memory in real languages, modules must state whether the pseudocode assumes a view or a copy when complexity depends on it.

---

## 11. Records and objects

Use dot notation for fields:

```text
student.name
node.next
edge.weight
```

Record construction may be written as:

```text
node ← NEW Node(value)
```

Destruction or ownership details are language-specific and belong in the Python/C++ implementation notes.

---

## 12. Abstract data type operations

Use conventional abstract operations unless the module is specifically implementing the data structure.

### Stack

```text
PUSH(stack, value)
value ← POP(stack)
value ← TOP(stack)
IS_EMPTY(stack)
```

### Queue

```text
ENQUEUE(queue, value)
value ← DEQUEUE(queue)
value ← FRONT(queue)
IS_EMPTY(queue)
```

### Priority queue

```text
INSERT(priority_queue, value, priority)
value ← EXTRACT_MIN(priority_queue)
```

A max-priority queue must use `EXTRACT_MAX` instead.

### Set

```text
ADD(visited, value)
CONTAINS(visited, value)
REMOVE(visited, value)
```

### Map or dictionary

```text
mapping[key] ← value
CONTAINS_KEY(mapping, key)
value ← mapping[key]
```

---

## 13. Graph notation

Preferred names:

```text
G = (V, E)
vertices(G)
edges(G)
neighbors(G, vertex)
```

A graph traversal should explicitly track visited vertices.

```text
visited ← empty set
PUSH(stack, start)

WHILE NOT IS_EMPTY(stack) DO
    vertex ← POP(stack)

    IF NOT CONTAINS(visited, vertex) THEN
        ADD(visited, vertex)

        FOR each neighbor IN neighbors(G, vertex) DO
            PUSH(stack, neighbor)
        END FOR
    END IF
END WHILE
```

The module must state whether the graph is directed or undirected and whether neighbor order affects the demonstrated traversal order.

---

## 14. Assertions and failure

Use `ASSERT` for a condition that should hold if the algorithm and its caller are correct.

```text
ASSERT left ≤ right + 1
```

Use `FAIL` for explicitly rejected input or an impossible requested operation.

```text
IF values IS EMPTY THEN
    FAIL "cannot compute a maximum of an empty sequence"
END IF
```

Do not use `ASSERT` as a replacement for documented preconditions.

---

## 15. Complexity annotations

Complexity may be stated after the pseudocode:

```text
TIME COMPLEXITY:
    O(n)

AUXILIARY SPACE:
    O(1)
```

If the result depends on a case, write each case explicitly.

```text
BEST-CASE TIME:
    O(1)

WORST-CASE TIME:
    O(n)
```

The input-size parameter must be identified in the explanation.

---

## 16. Complete example

```text
ALGORITHM linear_search(values, target)

INPUT:
    A finite sequence values and a target value.

OUTPUT:
    The index of the first occurrence of target, or -1 if target is absent.

PRECONDITIONS:
    Elements of values can be compared with target for equality.

POSTCONDITIONS:
    If the result is an index i, then values[i] = target and no earlier index contains target.
    If the result is -1, then target does not occur in values.

SIDE EFFECTS:
    NONE.

FOR index ← 0 TO length(values) - 1 DO
    IF values[index] = target THEN
        RETURN index
    END IF
END FOR

RETURN -1

TIME COMPLEXITY:
    Best case: O(1)
    Worst case: O(n)

AUXILIARY SPACE:
    O(1)
```

---

## 17. Practices to avoid

Do not:

- copy Python or C++ syntax and label it pseudocode;
- omit whether a range boundary is inclusive or exclusive;
- use the same symbol for assignment and equality;
- hide a costly operation behind an unexplained helper;
- assume one-based indexing without stating it;
- use an undefined data-structure operation;
- omit the base case of a recursive algorithm;
- claim a complexity bound without defining the input size.

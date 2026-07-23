# Primitive and Compound Data Types

## Why data types belong in an algorithms course

An algorithm never manipulates “data” in the abstract. It manipulates values with particular properties.

An integer can be added or compared. A Boolean can control a branch. A sequence has an order and a length. A record groups fields that describe one entity. A nested structure may require recursive processing.

The data type determines:

- which values are possible;
- which operations are meaningful;
- how values can be combined;
- what assumptions an algorithm may use;
- how state is represented;
- what implementation costs arise.

A poor type or representation choice can make a simple problem difficult. A good choice can make the algorithm almost obvious.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to distinguish primitive and compound data types, explain operations and constraints associated with each, and connect type choices to algorithm design in Python.

---

## 1. A type is a set of values and operations

A useful introductory view is:

> A data type describes a set of possible values together with the operations that are meaningful for those values.

For integers, meaningful operations include:

```text
addition, subtraction, multiplication, integer division, remainder, comparison
```

For Booleans:

```text
and, or, not, equality
```

For lists:

```text
length, indexing, iteration, append, element replacement, slicing
```

The same bit pattern or Python object is not understood only by its storage. Its type determines how the program interprets and uses it.

---

## 2. Primitive data types

A **primitive data type** is treated as an indivisible value at the current level of abstraction.

Common conceptual primitive types include:

- integer;
- real or floating-point number;
- Boolean;
- character.

Different programming languages define primitive categories differently. In Python, everything is an object, and integers can have arbitrary precision. Nevertheless, the primitive-versus-compound distinction remains useful for algorithmic reasoning.

---

## 3. Integers

Integers represent whole numbers:

```python
count = 0
offset = -3
population = 1_000_000
```

Typical algorithmic roles include:

- counters;
- indices;
- lengths;
- discrete measurements;
- identifiers;
- arithmetic state.

Important operations:

```python
+  -  *  //  %  <  <=  ==  !=  >=  >
```

The remainder operator is especially important in algorithms:

```python
value % 2 == 0      # even
value % 10          # final decimal digit
first % second      # Euclid's algorithm
```

### Python and mathematical integers

Python integers grow as needed, limited by available memory. In C++, a fixed-width integer type has bounded range and may overflow.

Therefore an algorithm written with mathematical integers may need additional range analysis in a concrete language.

---

## 4. Floating-point numbers

Floating-point values approximate real numbers:

```python
average = 12.5
ratio = 1.0 / 3.0
```

They are useful for measurement and numerical computation, but equality can be subtle:

```python
0.1 + 0.2 == 0.3
```

may evaluate to `False` because many decimal fractions have no exact finite binary representation.

Algorithms using floating-point values often compare within a tolerance:

```python
abs(first - second) < 1e-9
```

This is not merely a programming detail. It affects contracts, termination conditions, and correctness claims.

A loop waiting for a floating-point value to become exactly zero may fail even when the mathematical process suggests convergence.

---

## 5. Booleans

A Boolean has two logical values:

```python
True
False
```

Booleans represent decisions and properties:

```python
found = False
is_sorted = True
has_error = False
```

They appear in:

- loop conditions;
- selection conditions;
- predicates;
- search results;
- invariants.

Example:

```python
def contains_negative(values: list[int]) -> bool:
    for value in values:
        if value < 0:
            return True
    return False
```

The output type communicates that the algorithm answers a yes-or-no question rather than returning a position or count.

---

## 6. Characters and strings

A character represents one textual symbol conceptually. Python uses strings of length one rather than a separate character type:

```python
letter = "A"
```

A string is a sequence of characters:

```python
word = "algorithm"
```

This makes strings compound at the algorithmic level because they contain ordered components.

```python
def count_letter(text: str, target: str) -> int:
    count = 0

    for character in text:
        if character == target:
            count += 1

    return count
```

The precondition may require:

```text
len(target) == 1
```

The type `str` alone does not express that stronger constraint.

---

## 7. Compound data types

A **compound data type** groups multiple component values into one larger value.

Examples include:

- lists and arrays;
- tuples;
- records;
- sets;
- dictionaries;
- trees;
- graphs;
- nested structures.

Compound types provide organisation. Their structure determines how components are accessed and how algorithms traverse or update them.

---

## 8. Lists as ordered mutable sequences

Python lists are ordered, mutable collections:

```python
values = [4, 7, -2, 5]
```

Important properties:

- elements have positions;
- order is preserved;
- length may change;
- elements can be replaced;
- elements may have different runtime types, although algorithms usually assume a consistent logical type.

Common operations:

```python
len(values)
values[index]
values.append(item)
values[index] = new_value
```

A list algorithm must decide whether it reads the list, returns a new list, or modifies the original.

---

## 9. Tuples as fixed compound values

A tuple groups ordered components and is immutable:

```python
point = (3, 5)
```

Tuples are useful for:

- coordinates;
- returning multiple results;
- fixed records without named fields;
- state transitions.

Euclid's algorithm uses simultaneous tuple assignment:

```python
first, second = second, first % second
```

The right-hand side is evaluated first, producing a compound temporary value. Then the components are assigned.

This avoids destroying a value before it is reused.

---

## 10. Records and named fields

A record groups values with different roles.

```python
from dataclasses import dataclass


@dataclass
class Student:
    name: str
    score: float
    passed: bool
```

An instance:

```python
student = Student("Ada", 87.5, True)
```

Named fields express meaning better than positional indices such as:

```python
["Ada", 87.5, True]
```

Algorithms over records often select, filter, aggregate, or sort by one field.

```python
def highest_score(students: list[Student]) -> Student:
    if not students:
        raise ValueError("students must not be empty")

    best = students[0]

    for student in students[1:]:
        if student.score > best.score:
            best = student

    return best
```

The type structure makes the comparison intention visible.

---

## 11. Nested compound values

Compound types may contain other compound values:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
]
```

A nested loop processes rows and elements:

```python
def matrix_sum(matrix: list[list[int]]) -> int:
    total = 0

    for row in matrix:
        for value in row:
            total += value

    return total
```

The complexity depends on the total number of contained values, not merely the number of outer rows.

A recursive structure may have variable depth, making recursion a natural traversal method.

---

## 12. Mutability and aliasing

Primitive-style values such as integers are immutable in Python. A statement like:

```python
count += 1
```

binds `count` to a new integer value.

Lists are mutable. Two variables may refer to the same list:

```python
first = [1, 2, 3]
second = first
second.append(4)
```

Now both names observe:

```text
[1, 2, 3, 4]
```

This is **aliasing**: multiple references identify the same mutable object.

Algorithms that modify compound objects must document side effects and consider aliases.

---

## 13. Copying is an algorithmic operation

```python
copy = values[:]
```

creates a shallow list copy. This costs time and memory proportional to the number of elements:

```text
O(n) time
O(n) additional memory
```

A representation choice or seemingly harmless slice can therefore change complexity.

Nested structures introduce shallow-versus-deep copying concerns because inner objects may still be shared.

---

## 14. Type choice shapes the algorithm

Suppose we need to test membership repeatedly.

With a list:

```python
value in values
```

requires linear search in the worst case.

With a set:

```python
value in seen
```

has expected constant-time membership under the usual model.

The same logical problem can therefore have different algorithmic costs depending on representation.

Later modules study specific structures in depth. The current lesson is foundational:

> Data representation and algorithm design are inseparable.

---

## 15. Type annotations are not complete specifications

```python
def average(values: list[float]) -> float:
```

This annotation suggests a list of floating-point values and a floating-point result. It does not express:

- that the list must be non-empty;
- whether integers are accepted;
- whether `NaN` values are allowed;
- whether the input is modified;
- what numerical error is acceptable.

Types communicate structural expectations. Preconditions and postconditions communicate stronger semantic requirements.

---

## 16. Primitive and compound operations have different costs

Under an introductory model, arithmetic on bounded primitive values may be treated as constant time. Accessing a list by index is also usually modelled as constant time.

But compound operations can depend on size:

```python
len(values)          # O(1) for Python list
values[index]        # O(1)
values.append(x)     # amortised O(1)
values.insert(0, x)  # O(n)
values[:]            # O(n)
value in values      # O(n) worst case
```

Algorithm analysis must count the cost of the operations actually used, not only the number of source-code lines.

---

## 17. Common mistakes

### Treating all numeric types as exact

Floating-point arithmetic may introduce approximation.

### Treating type annotations as runtime validation

Python ordinarily does not enforce annotations by itself.

### Ignoring empty compound values

An empty list may change whether maximum, average, or first-element access is defined.

### Confusing immutability with unchangeable variables

A variable may be rebound even when the referenced value is immutable.

### Ignoring aliasing

Mutating one reference may affect another part of the program.

### Assuming compound operations are constant time

Copying, insertion, deletion, and membership may depend on structure size.

### Choosing a representation before understanding operations

The best structure depends on what the algorithm needs to do frequently.

---

## 18. What you must be able to explain

After this chapter, you should be able to:

- define a type through values and operations;
- distinguish conceptual primitive and compound types;
- explain integer, floating-point, Boolean, string, list, tuple, and record roles;
- describe mutability and aliasing;
- distinguish structural type information from semantic contracts;
- explain how copying and compound operations affect complexity;
- connect representation choice to algorithm design.

## 19. Practice

### Exercise 1 — Choose a type

Choose suitable types for:

- a yes-or-no search result;
- a coordinate;
- a changing sequence of tasks;
- a student with name and score;
- a collection of unique visited vertices.

Justify each choice.

### Exercise 2 — Aliasing trace

Predict the result:

```python
first = [1, 2]
second = first
third = first[:]
second.append(3)
third.append(4)
```

### Exercise 3 — Contract beyond annotation

Write preconditions and postconditions for:

```python
def median(values: list[float]) -> float:
    ...
```

### Exercise 4 — Record processing

Define a dataclass for a product and write a function returning the most expensive product.

### Exercise 5 — Operation cost

Compare building a reversed list using repeated insertion at index `0` with appending and reversing once.

## 20. Summary

Data types define the values and operations available to an algorithm. Primitive values support basic computation and decisions. Compound values organise collections and relationships. Their mutability, representation, and operation costs directly influence correctness and complexity.

The next chapter combines the module's ideas into a complete method for constructing a correct iterative or recursive algorithm.
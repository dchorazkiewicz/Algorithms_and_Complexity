# Memory Representation and Direct Access

## Why memory representation belongs in an algorithms course

When an algorithm accesses `A[i]`, the notation looks simple. It hides an important implementation idea: the machine must know where the component is stored. Arrays support efficient indexed access because their components follow a regular representation.

The goal of this chapter is not to teach processor architecture. It is to understand the conceptual bridge between an index and a memory location, and to see how that bridge explains the strengths and limitations of array-based structures.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to explain contiguous representation, conceptual address calculation, element size, locality, bounds, logical length, capacity, and the difference between Python references and C++ value storage.

---

## 1. Memory as addressable storage

At a simplified level, memory can be viewed as a sequence of addressable locations. A value occupies one or more units of storage, and the program uses an address to find it.

An array gives the machine a regular rule:

```text
base address + displacement determined by the index
```

If every element occupies the same number of bytes, the location of `A[i]` can be described conceptually as:

```text
address(A[i]) = base(A) + i × element_size
```

This formula explains direct access. The machine does not need to search from the beginning. It calculates the displacement from the index.

The exact machine instructions and object layouts differ by language and runtime, but the regularity is the key idea.

---

## 2. Contiguous representation

A structure is **contiguous** when its components occupy consecutive regions of memory without unrelated components between them.

For four fixed-size integers, the conceptual layout might be:

```text
index              0        1        2        3
value             12        7       30        5
memory offset      0        4        8       12
```

If each integer occupies four bytes and the array begins at address `1000`, then:

```text
A[0] at 1000
A[1] at 1004
A[2] at 1008
A[3] at 1012
```

The actual addresses are unimportant. The important point is that position and location are related by a fixed arithmetic rule.

---

## 3. Why equal element size matters

The address formula assumes that every component occupies the same amount of storage.

This is natural in a classical homogeneous array:

```cpp
std::array<int, 4> values{12, 7, 30, 5};
```

Each component has type `int` and the representation is regular.

A record may contain fields of different sizes, so field positions are determined by a fixed record layout rather than one repeated element size. A linked list uses nodes that refer to one another, so reaching the next logical component may require following a stored link rather than adding a fixed displacement.

This difference will later explain why arrays and linked lists have different operation costs.

---

## 4. Python lists store references

A Python `list` is not normally a contiguous block containing the full representation of arbitrary Python objects. Conceptually, it stores a contiguous sequence of references to objects.

```python
values = [12, 7, 30, 5]
```

The list contains references to integer objects. The reference slots have a regular size, which supports direct indexing, while the objects themselves are managed by the Python runtime.

A simplified picture is:

```text
Python list slots:
[ ref ──► 12 ][ ref ──► 7 ][ ref ──► 30 ][ ref ──► 5 ]
```

This has consequences:

- different list elements may refer to objects of different types;
- two list positions may refer to the same mutable object;
- copying the list copies references unless nested objects are copied separately;
- the memory cost includes both the reference array and the referenced objects.

For algorithmic reasoning, Python lists still provide array-like indexing. For concrete memory analysis, they are not identical to a C++ array of values.

---

## 5. Direct access and the cost model

Under the standard model, accessing a known index is constant-time:

```python
value = values[index]
values[index] = replacement
```

The number of steps does not grow with the array length `n`.

```text
Time: O(1)
```

This does not mean that all expressions involving indexing are constant-time.

```python
copy = values[:]
```

creates a new list and copies `n` references:

```text
Time: O(n)
Additional space: O(n)
```

Similarly:

```python
values[1:]
```

creates a slice. The bracket notation alone does not determine cost; the operation's semantics matter.

---

## 6. Bounds and safety

The address formula only makes sense for valid indices.

For an array of length `n`:

```text
0 ≤ i < n
```

Python checks bounds and raises `IndexError`:

```python
values = [4, 8, 2]
print(values[3])  # IndexError
```

In C++, `operator[]` on a built-in array or vector does not provide the same automatic checked behaviour. Access outside the valid range can cause undefined behaviour.

```cpp
std::vector<int> values{4, 8, 2};
int x = values[3]; // invalid access
```

`std::vector::at` performs bounds checking:

```cpp
int x = values.at(3); // throws std::out_of_range
```

The abstract algorithm must maintain valid indices regardless of language. Runtime checking changes failure behaviour, not the mathematical validity condition.

---

## 7. Logical length and capacity

A fixed-size array has a fixed number of component positions.

A dynamic array separates two quantities:

- **size** or logical length — the number of active elements;
- **capacity** — the number of elements that can fit in currently allocated storage before reallocation is required.

For a C++ vector:

```cpp
std::vector<int> values;
values.push_back(10);
values.push_back(20);
```

The vector may allocate more storage than the two active elements require. Extra capacity allows later appends without reallocating on every operation.

Python lists use a related growth strategy internally. The exact policy is implementation-specific, but the conceptual reason is the same: repeated growth becomes more efficient if storage is expanded in larger steps.

This leads to an important distinction:

```text
append to dynamic array:
    usually O(1)
    occasionally O(n) when reallocation and copying occur
```

Across a long sequence of appends, the average cost is described as amortised `O(1)`. Formal amortised analysis belongs later, but the intuition is useful now.

---

## 8. Reallocation and invalidated locations

When a dynamic array outgrows its capacity, it may:

1. allocate a larger memory block;
2. move or copy existing components;
3. release the old block;
4. continue using the new location.

The logical indices remain the same, but physical addresses may change.

This matters in C++ because pointers, references, or iterators referring to old vector storage may become invalid after reallocation.

Python hides physical addresses from ordinary list algorithms, but aliases to the list object still observe its logical modifications.

The broader lesson is:

> Stable logical positions do not necessarily imply stable physical addresses in a dynamic structure.

---

## 9. Locality of reference

Contiguous representation often improves **spatial locality**. When one component is accessed, nearby components are located near it in memory and may be loaded efficiently by the memory hierarchy.

A sequential scan:

```python
for value in values:
    process(value)
```

usually follows the physical order of list slots or array elements. This access pattern is often efficient.

A program that repeatedly jumps between distant positions may use memory less effectively even if both patterns have the same Big O complexity.

Big O abstracts away hardware constants, so two `O(n)` traversals can have different practical performance. Memory layout helps explain why.

---

## 10. Row-major representation of two-dimensional arrays

A two-dimensional table can be stored in one contiguous block. In row-major order, rows are placed one after another.

For `rows × columns`, conceptual access to position `(r, c)` becomes:

```text
linear_index = r × columns + c
```

Example for a `2 × 3` table:

```text
logical table:
10 20 30
40 50 60

linear storage:
[10, 20, 30, 40, 50, 60]
```

Position `(1, 2)` maps to:

```text
1 × 3 + 2 = 5
```

This idea connects multidimensional indexing to ordinary array access.

Python nested lists are different:

```python
matrix = [[10, 20, 30], [40, 50, 60]]
```

The outer list contains references to separate row lists. It should not automatically be assumed to have one flat contiguous value layout.

---

## 11. Representation choices influence algorithms

Suppose we need to access the component at known position `i` repeatedly.

An array is attractive because access is direct.

Suppose we need frequent insertion in the middle while preserving order. A contiguous array may require shifting many components, so another structure may be preferable.

Suppose rows all have different lengths. A nested dynamic structure may represent the data more naturally than one rectangular block.

Representation therefore affects:

- which operations are available;
- which operations are expensive;
- which invariants must be maintained;
- which failure cases are possible;
- how memory is used.

---

## What you must be able to explain

You should be able to explain:

- how an index is converted conceptually into a displacement;
- why equal-size elements support regular layout;
- why direct access is `O(1)`;
- why slicing is not `O(1)`;
- how Python lists differ from arrays storing values directly;
- why valid bounds remain an algorithmic responsibility;
- the difference between logical length and capacity;
- why dynamic growth may cause reallocation;
- why contiguous scans often perform well in practice.

## Practice

1. Compute conceptual offsets for indices `0`, `3`, and `7` when each element occupies eight bytes.
2. Explain why direct access does not make linear search `O(1)`.
3. Compare `values[index]`, `values[:]`, and `values[2:6]` by expected cost.
4. Explain why a Python list can contain differently typed values while a classical array is homogeneous.
5. For a table with seven columns, derive the row-major index of `(4, 3)`.
6. Explain why vector reallocation can invalidate a stored pointer.

## Summary

Arrays support direct access because their representation is regular. In a classical contiguous array, an index determines a displacement from a base address. Dynamic arrays add a distinction between size and capacity, while Python lists store references rather than arbitrary objects directly. These details explain both the efficiency of indexing and the costs of growth, copying, insertion, and mutation.
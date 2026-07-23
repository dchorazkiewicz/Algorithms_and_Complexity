# Python and C++ Concept Mapping

## Purpose

This document maps concepts used in the course between Python and C++. It is not a claim that constructs in the two languages are identical. The same algorithm may require different implementation details because the languages have different type systems, memory models, standard-library interfaces, and ownership rules.

Repository baseline:

- Python 3.11 or later;
- C++20;
- standard library only unless a module explicitly states otherwise.

These are project conventions, not syllabus requirements.

---

## 1. General principle

For paired examples, preserve:

- the problem statement;
- the algorithm contract;
- the pseudocode;
- the logical sequence of operations;
- the test cases;
- the claimed time and space complexity.

Do not force a literal line-by-line translation when an idiomatic language construct expresses the same algorithm more clearly.

---

## 2. Primitive and scalar values

| Concept | Python | C++ | Important difference |
|---|---|---|---|
| Boolean | `bool` | `bool` | Boolean operators use words in Python and symbols or alternative tokens in C++. |
| Integer | `int` | `int`, `long long`, fixed-width types | Python integers have arbitrary precision; C++ integer types have bounded ranges. |
| Floating-point number | `float` | `double` | Python `float` is normally double precision. |
| Character | one-character `str` | `char` | Python has no separate built-in character type. |
| Text | `str` | `std::string` | String indexing and mutation rules differ. |
| Absence of value/reference | `None` | `nullptr`, `std::optional` | `nullptr` is pointer-specific; `std::optional` models an optional value. |

When overflow affects an algorithm, the C++ implementation must state the selected numeric type and its limits. Python's arbitrary-precision integers must not be used to hide an overflow issue that is relevant to the concept being taught.

---

## 3. Aggregate data and records

| Concept | Python | C++ | Recommended course use |
|---|---|---|---|
| Fixed-size heterogeneous record | `dataclass`, tuple, class | `struct`, class, `std::tuple` | Prefer `dataclass` and `struct` for named fields. |
| Fixed-size homogeneous array | no exact built-in equivalent | `std::array<T, N>` | Use when fixed size is important. |
| Dynamic array | `list` | `std::vector<T>` | Preferred mapping for most array-based algorithms. |
| Immutable sequence | `tuple` | `std::array`, `std::tuple`, const object | Mapping depends on whether elements are homogeneous. |
| Pair | two-element tuple | `std::pair<T, U>` | Useful for edges, intervals, and key-value results. |

Example record:

```python
from dataclasses import dataclass

@dataclass
class Student:
    identifier: int
    score: float
```

```cpp
struct Student {
    int identifier;
    double score;
};
```

---

## 4. Sequence and collection mapping

| Abstract concept | Python | C++ | Typical operation notes |
|---|---|---|---|
| Dynamic array | `list` | `std::vector` | Random access is constant time; insertion at the front or middle is linear. |
| Double-ended queue | `collections.deque` | `std::deque` | Efficient insertion and removal at both ends. |
| Stack | `list`, `collections.deque` | `std::stack` | For teaching an ADT, use only push/pop/top operations. |
| FIFO queue | `collections.deque` | `std::queue` | Avoid `list.pop(0)` in Python because it is linear. |
| Priority queue | `heapq` | `std::priority_queue` | Python's standard heap is a min-heap; C++ `priority_queue` is a max-heap by default. |
| Set | `set` | `std::unordered_set`, `std::set` | Hash-based and ordered implementations have different complexity guarantees. |
| Dictionary/map | `dict` | `std::unordered_map`, `std::map` | Hash table and balanced-tree maps are not interchangeable in complexity analysis. |
| Linked list | custom nodes, occasionally `deque` | custom nodes, `std::list` | Use custom nodes when pointer/reference structure is the learning objective. |

---

## 5. Dynamic arrays: Python `list` and C++ `std::vector`

This is the default mapping for array algorithms, but the types are not identical.

### Shared conceptual properties

- elements are stored in sequence order;
- integer indexing provides direct access;
- appending is usually efficient;
- insertion or deletion in the middle shifts later elements;
- resizing may require allocation and copying or moving elements.

### Python-specific points

- a `list` stores references to Python objects;
- different element types may coexist, although course examples should normally use a uniform logical type;
- integers and other objects are not stored directly as C-style scalar array elements;
- slicing normally creates a new list.

### C++-specific points

- a `std::vector<T>` stores elements of one compile-time type;
- elements are contiguous;
- reallocation may invalidate iterators, references, and pointers to elements;
- capacity and size are distinct concepts.

---

## 6. Functions and parameter passing

| Intent | Python | C++ |
|---|---|---|
| Read a scalar value | regular parameter | pass by value |
| Read a large structure without copying | regular object reference semantics | `const T&` |
| Modify a supplied structure | mutate the object | `T&` or pointer, depending on interface |
| Return an optional result | `None` or explicit result type | `std::optional<T>` |
| Return multiple values | tuple | struct, `std::pair`, `std::tuple` |

### Important semantic distinction

Python passes object references by assignment. Rebinding a parameter does not rebind the caller's variable, but mutating a referenced mutable object is visible to the caller.

C++ parameter behavior is explicit in the type:

- `T value` copies or moves a value;
- `const T& value` provides read-only reference access;
- `T& value` allows mutation of the caller's object;
- `T* value` represents pointer-based access and may allow `nullptr`.

Each example must state whether the input is modified.

---

## 7. Mutability and copying

### Python

```python
copy_of_values = values.copy()  # shallow copy of the list
alias = values                  # another reference to the same list
```

### C++

```cpp
std::vector<int> copy_of_values = values;  // value copy
const auto& alias = values;                // reference, no copy
```

Course materials must not use the word "copy" when only an alias or reference is created.

For nested Python structures, a shallow copy does not recursively copy referenced objects. For C++ containers, the behavior depends on the element type's copy semantics.

---

## 8. Iteration

### Iteration over elements

```python
for value in values:
    process(value)
```

```cpp
for (const int value : values) {
    process(value);
}
```

### Iteration over indices

```python
for index in range(len(values)):
    process(values[index])
```

```cpp
for (std::size_t index = 0; index < values.size(); ++index) {
    process(values[index]);
}
```

Use index-based iteration only when the index is part of the algorithm. Otherwise prefer element iteration.

C++ examples must handle signed/unsigned index issues deliberately. A module may use `std::size_t`, `std::ptrdiff_t`, or a validated signed index depending on the algorithm.

---

## 9. Stack and queue mapping

### Stack

Python:

```python
stack: list[int] = []
stack.append(value)
value = stack.pop()
top = stack[-1]
```

C++:

```cpp
std::stack<int> stack;
stack.push(value);
int value = stack.top();
stack.pop();
```

C++ `pop()` does not return the removed element. The value must be read before removal.

### Queue

Python:

```python
from collections import deque

queue: deque[int] = deque()
queue.append(value)
value = queue.popleft()
```

C++:

```cpp
std::queue<int> queue;
queue.push(value);
int value = queue.front();
queue.pop();
```

---

## 10. Priority queues and heaps

Python `heapq` is a min-heap interface operating on a list.

```python
import heapq

heap: list[int] = []
heapq.heappush(heap, value)
minimum = heapq.heappop(heap)
```

C++ `std::priority_queue` is a max-priority queue by default.

```cpp
std::priority_queue<int> queue;
queue.push(value);
int maximum = queue.top();
queue.pop();
```

For equivalent paired examples, the intended ordering must be stated explicitly. A C++ min-priority queue requires an appropriate comparator.

---

## 11. Maps and sets

Python `dict` and `set` are hash-based in normal use.

C++ offers both:

- `std::unordered_map` and `std::unordered_set` — hash-based;
- `std::map` and `std::set` — ordered balanced-tree structures.

Do not map Python `dict` automatically to `std::map` without discussing the complexity and ordering difference.

For graph adjacency lists, a module should state whether vertex identifiers are:

- dense integers, allowing a sequence of neighbor lists;
- arbitrary hashable keys, requiring a map/dictionary.

---

## 12. Node-based structures

Python node example:

```python
from dataclasses import dataclass
from typing import Self

@dataclass
class Node:
    value: int
    next: Self | None = None
```

C++ node example with explicit ownership:

```cpp
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> next;
};
```

Raw pointers may be used in selected educational examples when pointer manipulation itself is the learning objective. Such examples must explain ownership, lifetime, and cleanup. Production-oriented examples should prefer RAII and smart pointers.

---

## 13. Error and missing-result handling

Possible mappings:

| Situation | Python | C++ |
|---|---|---|
| Invalid argument | `ValueError` | `std::invalid_argument` |
| Missing search result | `None`, `-1`, result object | `std::optional`, sentinel, iterator |
| Empty stack/queue operation | explicit check and exception | explicit check and exception/status |
| Internal invariant failure | `assert` | `assert` |

The algorithm contract determines behavior. The two language implementations may use different mechanisms but must communicate the same logical outcome.

---

## 14. Input and output policy for examples

Core algorithm functions should normally:

- receive data through parameters;
- return results explicitly;
- avoid interactive input;
- avoid printing inside the algorithm;
- avoid global mutable state.

Demonstration code may perform input/output separately from the algorithm.

Python:

```python
def linear_search(values: list[int], target: int) -> int:
    ...


def main() -> None:
    result = linear_search([4, 7, 9], 7)
    print(result)
```

C++:

```cpp
int linear_search(const std::vector<int>& values, int target) {
    // ...
}

int main() {
    const int result = linear_search({4, 7, 9}, 7);
    std::cout << result << '\n';
}
```

This separation makes testing and comparison easier.

---

## 15. Paired-example checklist

Before publishing a Python/C++ pair, verify:

- [ ] both implement the same contract;
- [ ] both use equivalent valid and edge-case tests;
- [ ] both document whether input is modified;
- [ ] numeric ranges are appropriate;
- [ ] container choices have compatible algorithmic properties;
- [ ] failure behavior is equivalent;
- [ ] complexity claims account for language-specific operations;
- [ ] differences are explained rather than hidden;
- [ ] neither version contains unrelated language tricks that distract from the algorithm.

# Coding Standards for Course Examples

## Purpose

These standards keep Python and C++ examples readable, comparable, testable, and focused on the algorithm being taught.

They are repository conventions, not formal syllabus requirements.

---

## 1. General rules

All examples should:

- implement a clearly stated contract;
- separate algorithm logic from interactive input and output;
- use deterministic test data unless randomness is the subject of the example;
- avoid global mutable state;
- use meaningful names;
- document whether input data is modified;
- handle or document edge cases;
- state time and auxiliary-space complexity;
- include at least one normal test and one edge-case test;
- keep unrelated language features out of introductory examples;
- prefer correctness and clarity before micro-optimization.

A shorter implementation is not automatically a better teaching implementation.

---

## 2. File and directory naming

Use lowercase `snake_case` for file names.

Examples:

```text
linear_search.py
linear_search.cpp
binary_search_tests.py
linked_list_exercises.md
```

A Python and C++ pair should use the same base name where practical.

```text
python/examples/linear_search.py
cpp/examples/linear_search.cpp
```

---

## 3. Function design

A core algorithm function should normally:

- receive all required input through parameters;
- return the logical result;
- avoid printing;
- avoid reading from standard input;
- avoid modifying input unless the contract says it is an in-place algorithm;
- have one primary responsibility.

Demonstration or driver code may perform input/output separately.

---

## 4. Naming conventions

### Shared conceptual names

Use consistent conceptual names across Python, C++, pseudocode, and prose.

Preferred examples:

- `values`
- `target`
- `left`
- `right`
- `middle`
- `index`
- `current`
- `previous`
- `next_node`
- `root`
- `visited`
- `neighbors`

Avoid unexplained one-letter names except for conventional mathematical quantities or tightly scoped indices such as `i` and `j`.

### Python

- functions and variables: `snake_case`;
- classes: `PascalCase`;
- constants: `UPPER_SNAKE_CASE`;
- private implementation details: leading underscore only when useful.

### C++

For this repository:

- functions and variables: `snake_case`;
- types, classes, and structs: `PascalCase`;
- constants: `UPPER_SNAKE_CASE` or `constexpr` names consistent within the file;
- template parameters: concise type names such as `T` when standard and clear.

---

## 5. Comments and explanations

Comments should explain:

- why a step is needed;
- what invariant is maintained;
- why an edge case is handled;
- why a language-specific construct was chosen.

Comments should not merely restate obvious syntax.

Poor:

```python
index += 1  # increment index
```

Better:

```python
index += 1  # move to the next unprocessed element
```

Long conceptual explanations belong in Markdown, not inside source files.

---

## 6. Assertions, validation, and errors

Distinguish three situations:

1. **Documented precondition** — responsibility of the caller.
2. **Input validation** — explicit rejection of invalid external input.
3. **Internal invariant** — condition that should hold if the implementation is correct.

Use assertions for internal invariants, not as the only documentation of preconditions.

Failure behavior must match the algorithm contract.

Examples may use:

- Python: `ValueError`, `IndexError`, `None`, or a documented sentinel;
- C++: `std::invalid_argument`, `std::out_of_range`, `std::optional`, or a documented sentinel.

Do not select a sentinel that can also be a valid result unless the contract resolves the ambiguity.

---

## 7. Testing standard

Each important example should include tests for:

- a representative valid input;
- the smallest valid input;
- an empty input when allowed or rejected;
- one-element input where applicable;
- duplicate values where relevant;
- a missing search result where relevant;
- already ordered and reverse-ordered data for sorting;
- invalid input when validation is part of the interface.

Python and C++ pairs should use equivalent test cases.

For early modules, simple assertions are sufficient.

Python:

```python
assert linear_search([4, 7, 9], 7) == 1
assert linear_search([], 7) == -1
```

C++:

```cpp
assert(linear_search({4, 7, 9}, 7) == 1);
assert(linear_search({}, 7) == -1);
```

A later repository iteration may introduce test frameworks, but examples must remain understandable without framework-specific knowledge.

---

## 8. Python standards

### Version and style

- target Python 3.11 or later;
- follow PEP 8 naming and layout conventions;
- use type annotations for public example functions;
- use `from __future__ import annotations` only when it materially improves type declarations;
- prefer standard-library data structures;
- use `dataclass` for simple records and nodes when appropriate;
- use `collections.deque` for FIFO queues;
- use `heapq` for min-heap examples;
- avoid `list.pop(0)` for queue implementations unless demonstrating its cost.

### Function example

```python
def linear_search(values: list[int], target: int) -> int:
    """Return the first index of target, or -1 when target is absent."""
    for index, value in enumerate(values):
        if value == target:
            return index
    return -1
```

### `main` guard

Executable demonstration files should use:

```python
if __name__ == "__main__":
    main()
```

### Mutation

When a function mutates a sequence, signal it in the name or documentation.

Examples:

- `reverse_in_place`
- `heapify_in_place`

Do not return a new object while implying in-place behavior, or mutate input while implying a pure function.

### Type flexibility

Introductory examples may use concrete types such as `list[int]` for clarity. Generic typing should be introduced only when it supports the learning objective rather than obscuring the algorithm.

---

## 9. C++ standards

### Version and style

- target C++20;
- prefer standard-library containers and algorithms unless implementing the structure or algorithm is the learning objective;
- include only required headers;
- use `const` where an object should not be modified;
- pass large read-only structures by `const&`;
- prefer RAII for resource management;
- prefer smart pointers for owning dynamic memory;
- use raw pointers only when pointer behavior is explicitly being taught and ownership is documented;
- avoid `using namespace std;` in repository examples;
- compile with warnings enabled.

Suggested compiler command:

```text
g++ -std=c++20 -Wall -Wextra -Wpedantic source.cpp -o program
```

### Function example

```cpp
#include <cstddef>
#include <vector>

int linear_search(const std::vector<int>& values, int target) {
    for (std::size_t index = 0; index < values.size(); ++index) {
        if (values[index] == target) {
            return static_cast<int>(index);
        }
    }
    return -1;
}
```

When converting `std::size_t` to a signed result type, the material must explain the conversion and the practical range assumption or choose a different result type.

### Initialization

Prefer direct, explicit initialization.

```cpp
const int target{7};
std::vector<int> values{4, 7, 9};
```

### Ownership

For node-based structures, every example must state:

- who owns each node;
- whether a pointer may be null;
- when nodes are destroyed;
- whether copying the structure is allowed.

---

## 10. Educational implementation versus library implementation

When the syllabus requires understanding a structure or algorithm, materials may show two versions.

### Educational implementation

Used to expose the mechanism.

Examples:

- manually implemented linked list;
- explicit binary heap operations;
- hand-written binary search;
- recursive tree traversal.

### Library implementation

Used to show standard production tools.

Examples:

- `collections.deque` and `std::queue`;
- `heapq` and `std::priority_queue`;
- Python `sorted` and C++ `std::sort` after the sorting mechanism has been studied.

The two versions must be labeled. A library call must not replace the required explanation of the underlying algorithm.

---

## 11. Paired Python/C++ example structure

Recommended Markdown order:

1. problem statement;
2. contract;
3. pseudocode;
4. manual trace;
5. Python implementation;
6. C++ implementation;
7. shared test cases;
8. language-specific observations;
9. correctness argument;
10. time and space complexity;
11. common mistakes.

Recommended source-file sections:

```text
imports/includes
record or helper definitions
core algorithm
small test function or assertions
demonstration main
```

---

## 12. Output and reproducibility

Demonstrations should produce concise, stable output.

Avoid:

- timestamps;
- random values without a fixed seed;
- environment-dependent formatting;
- excessive debug output;
- prompts that prevent automated execution.

If randomization is essential, record the seed and explain its role.

---

## 13. Complexity-sensitive coding choices

Source code must not contradict the stated complexity.

Examples of hidden costs to document:

- Python slicing creates a new list in normal use;
- repeated string concatenation may allocate repeatedly;
- inserting at the start of a dynamic array shifts elements;
- copying a C++ vector by value is linear in its size;
- sorting inside a loop changes the total complexity;
- hash-table operations are not guaranteed worst-case constant time;
- recursion consumes call-stack memory;
- C++ vector reallocation invalidates element references and iterators.

---

## 14. Accessibility and teaching clarity

Examples should:

- keep line length reasonable;
- avoid unexplained abbreviations;
- use small test data in walkthroughs;
- separate the first correct version from later optimizations;
- show one new concept at a time where possible;
- include expected output;
- avoid clever compressed expressions when a structured version teaches the algorithm better.

---

## 15. Review checklist

Before accepting a code example:

- [ ] the contract is visible;
- [ ] the implementation matches the contract;
- [ ] input mutation is documented;
- [ ] names are consistent with pseudocode and the paired language;
- [ ] normal and edge cases are tested;
- [ ] output is reproducible;
- [ ] complexity claims include hidden language operations;
- [ ] Python type annotations are appropriate;
- [ ] C++ ownership and parameter passing are clear;
- [ ] compiler/interpreter version assumptions are stated;
- [ ] the code is readable before it is optimized;
- [ ] educational and library implementations are labeled;
- [ ] no extension is presented as a syllabus requirement.

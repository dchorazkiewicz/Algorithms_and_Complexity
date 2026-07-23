# Forms of Algorithm Representation

## Why one algorithm needs several representations

An algorithm is an abstract method. It is not identical to a paragraph, a diagram, pseudocode, Python, or C++. Each of those is a **representation** of the method.

This distinction matters because every representation reveals some aspects of an algorithm and hides others. Natural language can explain motivation well but may be ambiguous. A flowchart can make control flow visible but may become unwieldy. Pseudocode can express the method precisely without committing to a programming language. Source code can be executed, but it introduces language-specific details that may distract from the underlying idea.

A strong algorithm designer does not ask only:

> How do I write this in Python?

The stronger question is:

> Which representation best supports the current task: understanding, communicating, proving, implementing, testing, or maintaining the algorithm?

!!! note "What you should learn from this chapter"
    By the end of this chapter, you should be able to represent the same algorithm in structured natural language, a control-flow diagram, pseudocode, and Python; explain what each representation makes easy or difficult to see; and recognise when a representation is too vague or too implementation-specific.

---

## 1. Begin with one algorithmic idea

We will use a single problem throughout the chapter:

> Given a finite sequence of integers and a target value, return the index of the first occurrence of the target, or `-1` if the target does not occur.

Example:

```text
values = [4, 7, 2, 7, 9]
target = 7
result = 1
```

The central idea is simple:

> Scan the sequence from left to right and stop when the target is found.

This idea can be expressed in several ways. The algorithm does not change merely because its representation changes.

---

## 2. Structured natural language

A first representation may use carefully written prose:

1. Start at the first element of the sequence.
2. Compare the current element with the target.
3. If they are equal, return the current index.
4. Otherwise move to the next element.
5. If every element has been examined without a match, return `-1`.

This representation is easy to read because it uses ordinary language. It is useful when the reader is not yet familiar with formal notation.

### Strengths

Structured natural language is good for:

- explaining motivation;
- introducing the main idea;
- communicating with non-programmers;
- discussing a solution before notation has been agreed;
- connecting steps with reasons.

### Weaknesses

Natural language can hide ambiguity.

For example, what exactly does “move to the next element” mean? How is the current position stored? What happens for an empty sequence? Is the comparison exact? Does the algorithm return the first occurrence or any occurrence?

A prose description becomes useful only when important choices are made explicit.

### Weak and strong prose

Weak description:

> Search the list and return the item if it is present.

This is unclear because it does not specify whether the result is the value, the index, a Boolean value, or something else.

Stronger description:

> Examine indices from `0` upward. Return the first index whose element equals the target. If no such index exists, return `-1`.

The stronger description exposes the order, the stopping condition, the exact result, and the failure value.

---

## 3. Tables and trace-oriented representations

A table can represent the behaviour of one execution.

For:

```text
values = [4, 7, 2, 7, 9]
target = 7
```

we can write:

| Step | Index | Current value | Match? | Action |
|---:|---:|---:|:---:|---|
| 1 | 0 | 4 | No | continue |
| 2 | 1 | 7 | Yes | return 1 |

This is not a complete algorithm representation because it describes only one instance. It is a **trace representation** of one execution.

That distinction is important:

- an algorithm representation describes the general method;
- a trace describes what happens for one concrete input.

Tables are excellent for exposing state transitions, but they do not replace a general procedure.

---

## 4. Flowcharts and control-flow diagrams

A flowchart represents control flow visually.

A simplified version of linear search can be described as:

```text
START
  |
  v
index <- 0
  |
  v
index < length(values)? ---- No ----> return -1
  |
 Yes
  |
  v
values[index] == target? --- Yes ---> return index
  |
 No
  |
  v
index <- index + 1
  |
  +---------------------------> repeat
```

### What a flowchart makes visible

A flowchart clearly shows:

- the order of actions;
- branch points;
- repetition;
- termination paths;
- the relationship between conditions and actions.

### What a flowchart may hide

A diagram often says less about:

- the precise meaning of variables;
- input assumptions;
- postconditions;
- data representation;
- complexity;
- why the algorithm is correct.

Large algorithms can also produce diagrams so complex that the visual representation becomes harder to read than pseudocode.

### When to use flowcharts

Flowcharts are most useful when:

- control flow is the central issue;
- the algorithm is small;
- a branch or loop is difficult to visualise;
- the audience benefits from a visual overview;
- the diagram is accompanied by a contract and explanation.

They are less useful as the only representation of a large data-structure algorithm.

---

## 5. Pseudocode

Pseudocode is a language-independent representation designed to express the algorithm precisely without requiring the syntax of a real programming language.

```text
ALGORITHM first_index(values, target)
    FOR index <- 0 TO length(values) - 1 DO
        IF values[index] = target THEN
            RETURN index
        END IF
    END FOR

    RETURN -1
END ALGORITHM
```

This representation exposes the essential control flow while avoiding Python-specific or C++-specific syntax.

### Why pseudocode is useful

Pseudocode helps separate:

- the algorithmic idea;
- the data and state;
- the control structure;
- the implementation language.

It supports discussion, manual tracing, correctness arguments, and translation into multiple languages.

### Pseudocode is not “informal code”

Poor pseudocode is often just source code with punctuation removed. Good pseudocode has a deliberate notation and uses constructs consistently.

For example, it should be clear whether:

- assignment uses `←`;
- equality uses `=`;
- ranges include both endpoints;
- indices start at zero;
- `RETURN` stops execution immediately;
- functions may modify their arguments.

Pseudocode requires conventions. Those conventions are developed fully in the next dedicated chapter.

---

## 6. Python source code

The same algorithm can be implemented in Python:

```python
def first_index(values: list[int], target: int) -> int:
    for index in range(len(values)):
        if values[index] == target:
            return index

    return -1
```

This form is executable. It can be tested, integrated into a program, analysed by tools, and maintained in a repository.

### What source code adds

Source code must make language-specific decisions:

- how parameters are declared;
- how sequences are represented;
- how loops are written;
- which equality operator is used;
- how errors are reported;
- which types are expected;
- whether annotations are present;
- whether library functions are used.

These details are necessary for execution but are not all part of the abstract algorithm.

### The algorithm and implementation are related but not identical

This Python version:

```python
def first_index(values: list[int], target: int) -> int:
    try:
        return values.index(target)
    except ValueError:
        return -1
```

implements the same high-level behaviour using a library operation.

The source code is different. The abstract method—searching for the first matching position—remains related.

When analysing an implementation, we must therefore ask both:

1. Which algorithmic idea is used?
2. What costs and behaviours are introduced by the chosen language operations?

---

## 7. C++ as another representation of the same method

The same algorithm can be expressed in C++:

```cpp
#include <cstddef>
#include <vector>

int first_index(const std::vector<int>& values, int target) {
    for (std::size_t index = 0; index < values.size(); ++index) {
        if (values[index] == target) {
            return static_cast<int>(index);
        }
    }

    return -1;
}
```

The algorithmic structure is the same:

- initialise a position;
- inspect elements from left to right;
- compare with the target;
- return immediately on the first match;
- return a sentinel when no match exists.

The implementation details differ:

- `std::vector<int>` represents the sequence;
- the input is passed by constant reference;
- `std::size_t` is used for the index;
- conversion is needed before returning `int`;
- braces and semicolons are required.

This comparison shows why source code is a representation rather than the algorithm itself.

---

## 8. Mathematical specification

An algorithm can also be described by a relation between input and output.

Let `values` be a sequence of length `n`, and let `target` be a value.

The required result `r` satisfies one of two cases:

```text
Case 1: target occurs
    0 <= r < n
    values[r] = target
    for every j with 0 <= j < r, values[j] != target

Case 2: target does not occur
    r = -1
    for every j with 0 <= j < n, values[j] != target
```

This form is precise about the meaning of the result. It says little about how the result is found.

That is useful because specification and implementation have different roles:

- the specification defines correctness;
- the algorithm provides a method;
- the program makes the method executable.

---

## 9. The same algorithm viewed side by side

| Representation | Main strength | Main limitation |
|---|---|---|
| Structured prose | motivation and accessibility | may be ambiguous |
| Trace table | concrete state evolution | describes one execution only |
| Flowchart | visible control flow | scales poorly and may hide meaning |
| Pseudocode | precise and language-independent | requires agreed conventions |
| Python | executable and readable | introduces Python-specific details |
| C++ | executable with explicit types and memory-related choices | more implementation detail |
| Mathematical specification | exact required relationship | does not provide the method |

No single representation is always best.

A complete learning text often uses several:

1. prose to explain the idea;
2. a contract to state the requirement;
3. pseudocode to expose the method;
4. a trace table to show one execution;
5. Python to make it executable;
6. a correctness argument to connect the method to the specification.

---

## 10. Representation changes the questions we can ask

### With prose

We ask:

- Is the idea understandable?
- Are the assumptions visible?
- Is any phrase ambiguous?

### With a diagram

We ask:

- Which branch is taken?
- Where does repetition return?
- Which paths terminate?

### With pseudocode

We ask:

- Is the algorithm precise?
- What state is updated?
- Which conditions control execution?

### With source code

We ask:

- Does the program compile or run?
- Are the types appropriate?
- Are the language operations used correctly?
- What implementation-specific costs occur?

### With a trace

We ask:

- What happens for this instance?
- Which variables change?
- Which branch is selected?

### With a specification

We ask:

- What must be true before execution?
- What must be true afterward?
- What exactly counts as a correct result?

Representation is therefore not merely presentation. It affects reasoning.

---

## 11. Common representation mistakes

### Mistake 1: treating one example as the algorithm

```text
[4, 7, 2, 7, 9] -> 1
```

This is an example, not a general method.

### Mistake 2: writing prose that hides control flow

> Check the values and return the position.

This does not explain order, stopping, failure, or first occurrence.

### Mistake 3: writing source code before the specification

The implementation may work, but no one can judge whether it solves the intended problem if the requirement is vague.

### Mistake 4: writing pseudocode tied to one language

```text
for i in range(len(values)):
```

This is Python-like code, not language-independent pseudocode.

### Mistake 5: assuming visual means clear

A complicated flowchart with many crossing arrows can be harder to understand than structured text.

### Mistake 6: omitting failure behaviour

A representation that explains the successful case but not the “not found” case is incomplete.

---

## 12. A practical representation workflow

For a new problem, use this order:

1. state the problem in one precise sentence;
2. write input, output, precondition, postcondition, and failure behaviour;
3. explain the central idea in structured prose;
4. write pseudocode;
5. trace one ordinary case and one boundary case;
6. implement in Python;
7. compare implementation behaviour with the specification;
8. add a diagram only when it clarifies control flow or structure;
9. translate to C++ when language-specific issues matter.

This order prevents source code from becoming the only place where design decisions exist.

---

## 13. What you must be able to explain

After this chapter, you should be able to explain:

- why an algorithm is not identical to its source code;
- how structured prose differs from pseudocode;
- why a trace is not a general algorithm;
- what a flowchart reveals and hides;
- why pseudocode requires conventions;
- which language-specific details appear in Python and C++;
- why a mathematical specification defines a result without prescribing a method;
- how several representations can support different stages of reasoning.

---

## 14. Practice

### Exercise 1 — Represent one algorithm four ways

For the problem “count the negative values in a sequence”, prepare:

1. structured natural language;
2. pseudocode;
3. a Python implementation;
4. a trace table for `[4, -2, 0, -7]`.

Explain what each representation makes easiest to understand.

### Exercise 2 — Diagnose ambiguity

Improve this description:

> Go through the list and return the number when it matches.

List every ambiguity you find before rewriting it.

### Exercise 3 — Diagram a branch

Create a small flowchart for returning the greater of two numbers. Include the equal case and explain whether it needs a separate branch.

### Exercise 4 — Separate specification from implementation

Write a postcondition for a function that returns the first even index in a sequence. Then give two different Python implementations that satisfy the same postcondition.

### Exercise 5 — Trace versus proof

Explain why a correct trace for five inputs does not prove that the algorithm is correct for every valid input.

### Exercise 6 — Compare languages

Write linear search in Python and C++. Identify which lines express the shared algorithm and which exist only because of language-specific syntax or types.

---

## 15. Summary

An algorithm can be represented in prose, diagrams, pseudocode, source code, tables, and formal specifications. These forms are not interchangeable in purpose.

A good explanation uses representation deliberately:

- prose builds intuition;
- contracts define requirements;
- pseudocode exposes the method;
- diagrams clarify control flow;
- traces show concrete execution;
- Python and C++ make the method executable;
- correctness arguments connect the algorithm to the specification.

The next chapter asks a deeper question: what properties must a procedure have before we are justified in calling it an algorithm?
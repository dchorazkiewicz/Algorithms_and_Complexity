# Problems, Algorithms, Programs, and Executions

## Why this distinction matters

When people begin learning algorithms, they often begin with code. They see a loop, a conditional statement, or a function and try to remember what each line does. That can be useful, but it creates a dangerous illusion: it makes the program look like the starting point.

It is not.

A program is one possible expression of a solution. Before the program exists, there must be a problem worth solving. Before the problem can be solved reliably, it must be stated precisely enough that we know which inputs are valid and what result is required. Before an implementation can be trusted, there must be an algorithmic idea that works for every valid input—not only for the examples we happened to test.

This chapter develops the vocabulary needed to keep those levels separate. The distinction may initially look theoretical, but it prevents practical mistakes throughout the entire course. It helps us explain why an implementation fails, why a test is not a proof, why two different programs may implement the same method, and why the cost of a Python operation can matter even when the high-level algorithmic idea remains unchanged.

We will build the chapter around one simple problem: finding the greatest value in a sequence. The example is deliberately elementary. The purpose is not to teach a difficult algorithm. The purpose is to learn how to look at an algorithmic problem before later chapters introduce recursion, trees, graphs, sorting, and complexity.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to explain the difference between a computational problem, a problem instance, an algorithm, a program, and an execution. You should also be able to describe why testing examples is not the same as proving correctness, and why implementation details may change the actual time or memory cost of a program.

---

## 1. Begin with a real question, not with code

Suppose a weather station records the following temperatures during five consecutive days:

```text
[17, 21, 19, 24, 22]
```

A human can look at the sequence and immediately answer that the highest temperature is `24`. If this were the only data set we would ever receive, no algorithm would be needed. We could simply write down the answer.

But that is not the actual task. Tomorrow the station will produce a different sequence. Another city may provide one hundred measurements. A sensor may record negative values. A test data set may contain only one value. We therefore need a method that works independently of the particular numbers shown above.

The real question is:

> Given any finite non-empty sequence of comparable values, how can we determine its greatest element?

This version is more useful because it does not describe one answer. It describes an entire family of situations. It tells us that the data may change while the required relationship between input and output remains the same.

That move—from one concrete example to a whole class of valid inputs—is the beginning of algorithmic thinking.

### Why the words matter

The phrase *finite non-empty sequence of comparable values* is not decorative. Every part of it protects us from ambiguity.

The sequence must be **finite** because the procedure is expected to finish after examining its elements. It must be **non-empty** because an empty sequence has no greatest element unless we introduce an additional convention. Its elements must be **comparable** because the method needs to ask whether one value is greater than another.

If we omit these assumptions, we do not merely produce a less elegant description. We produce an incomplete problem. The program may then be forced to guess what should happen in cases that were never specified.

This is a general lesson:

> A programming task becomes an algorithmic problem only when the valid inputs and required outputs are made explicit enough to reason about them.

---

## 2. The computational problem: what must be achieved

A **computational problem** describes a class of valid inputs and the output required for each valid input.

For the maximum-value problem, we can write:

```text
Input:
    A finite non-empty sequence of comparable values.

Output:
    A value equal to the greatest element of the input sequence.
```

Notice what is missing: there is no loop, no variable called `maximum`, no Python syntax, and no instruction to inspect the values from left to right. The problem statement tells us **what result is required**, not **how to compute it**.

This separation is essential because many different algorithms may solve the same problem. Some may scan the data once. Some may sort the data first. Some may divide the sequence into smaller parts. Some may use parallel computation. The problem remains the same even when the method changes.

### A useful mental test

When you read a task, ask:

> If I changed the programming language, would this sentence still describe the same task?

If the answer is yes, you are probably reading a problem statement. If the description depends on Python-specific operations, variable names, or library functions, you are already looking at part of an implementation.

### The problem defines a relationship

A computational problem can be viewed as a required relationship between input and output. For example:

```text
[17, 21, 19, 24, 22]  →  24
[-5, -2, -11]          →  -2
[8]                     →  8
```

The left side changes from case to case. The rule connecting the left side to the right side does not: the output must be the greatest value contained in the input.

This distinction becomes increasingly important later. In a sorting problem, the output must contain the same elements in a required order. In a graph-search problem, the output may describe reachability. In a shortest-path problem, the output must satisfy a minimality condition. In every case, the problem describes the required relationship before any implementation is chosen.

---

## 3. A problem instance: one concrete case

A **problem instance** is one concrete input belonging to the domain of a computational problem.

For our problem, each of the following is a different instance:

```text
[17, 21, 19, 24, 22]
[-5, -2, -11]
[8]
[3, 3, 3, 3]
```

The distinction between a problem and an instance explains why examples are useful but limited.

An example allows us to observe what should happen in one case. A test allows us to check whether a program behaves correctly for one selected instance. Neither one tells us, by itself, what happens for every valid input.

Suppose a function returns `24` for the first sequence. That result is encouraging, but it does not tell us whether the function handles negative values, repeated values, or a one-element sequence. A successful test provides evidence about one execution. Correctness concerns the entire class of valid inputs.

### Why examples still matter

Examples are not proofs, but they are indispensable. A good example can reveal the intended meaning of a specification. A carefully chosen boundary case can expose an incorrect assumption. A counterexample can disprove a proposed algorithm immediately.

For the maximum problem, the sequence

```text
[-5, -2, -11]
```

is especially valuable because it reveals whether the solution wrongly assumes that the greatest value must be non-negative.

The sequence

```text
[8]
```

checks whether the algorithm handles the smallest valid input.

The sequence

```text
[3, 3, 3, 3]
```

checks whether equality causes an incorrect update or failure.

Good algorithmic thinking therefore does not reject examples. It uses them for the right purpose.

> Examples help us understand and challenge an idea. They do not replace a general argument.

---

## 4. The algorithm: the general method

An **algorithm** is a finite and sufficiently precise method that transforms every valid input into the required output.

For the maximum-value problem, the central idea is simple:

> Keep the greatest value seen so far while scanning the sequence.

This sentence contains the essential design decision. Instead of remembering every value, the algorithm stores one piece of information: the best candidate found so far.

We can develop the method step by step.

1. Use the first element as the greatest value seen so far.
2. Inspect the remaining elements one at a time.
3. If the current element is greater than the stored candidate, replace the candidate.
4. After all elements have been inspected, return the candidate.

The method is not yet tied to Python. It could be implemented in C++, Java, Rust, or even followed manually with pencil and paper.

### Why this is a genuine algorithmic idea

The important part is not the loop syntax. The important part is the information we choose to preserve.

At every stage, the algorithm remembers exactly what is needed to continue: the greatest value among the elements already processed. It does not need to remember the order in which those elements appeared. It does not need to copy the whole sequence. It does not need to sort the data.

This is an example of **state design**. The algorithm works because its state is small but meaningful.

Later chapters will repeatedly ask the same kind of question:

- What information must be remembered while searching?
- What must be stored during a graph traversal?
- What does a recursive call need to preserve?
- Which invariant must remain true after every update?

The maximum problem is simple, but the habit is general: identify the smallest useful state that summarises what has already been processed.

---

## 5. A design mistake: initialising the maximum to zero

A common first attempt is:

```python
def maximum_value(values: list[int]) -> int:
    maximum = 0

    for value in values:
        if value > maximum:
            maximum = value

    return maximum
```

For the input

```text
[17, 21, 19, 24, 22]
```

this function returns `24`. A beginner may therefore conclude that the algorithm is correct.

The conclusion is false.

Consider the valid input:

```text
[-5, -2, -11]
```

The function returns `0`, even though `0` does not occur in the sequence. The program has invented a candidate that is greater than every input value.

The failure is not caused by a missing colon, incorrect indentation, or an invalid type. Python executes the program exactly as written. The error lies in the reasoning that produced the initial state.

By assigning

```python
maximum = 0
```

we silently assume that zero is no greater than the actual maximum. That assumption is not guaranteed by the problem statement.

This distinction is important:

- a **syntax error** means the program is not written according to the language rules;
- a **runtime error** means the program fails during execution;
- an **algorithm-design error** means the program may run successfully and still compute the wrong result.

Algorithmic reasoning is necessary precisely because the most dangerous mistakes often produce valid, executable code.

### Repairing the initial state

The first element is a safer initial candidate:

```python
def maximum_value(values: list[int]) -> int:
    maximum = values[0]

    for value in values[1:]:
        if value > maximum:
            maximum = value

    return maximum
```

Now `maximum` is always an actual input value. Before the loop begins, it is the greatest value among the one-element prefix containing only `values[0]`. That fact gives the later updates a correct foundation.

The repair depends on the assumption that the sequence is non-empty. This is why the input condition belongs to the problem specification. If empty input were allowed, the expression `values[0]` would be invalid and the problem would need a different contract.

---

## 6. The program: one implementation of the method

A **program** is an implementation of one or more algorithms in a programming language.

The Python function above is a program fragment implementing the maximum-finding algorithm. It contains both the abstract idea and language-specific choices.

```python
def maximum_value(values: list[int]) -> int:
    maximum = values[0]

    for value in values[1:]:
        if value > maximum:
            maximum = value

    return maximum
```

The abstract idea is:

- keep the greatest value seen so far;
- inspect each remaining value;
- update the candidate when a greater value appears.

The Python-specific details include:

- `def` for defining a function;
- `list[int]` as a type annotation;
- indexing with `values[0]`;
- slicing with `values[1:]`;
- indentation to mark nested blocks;
- `return` to produce the result.

The algorithm and the program are related, but they are not identical. The algorithm explains the method independently of a language. The program chooses concrete language mechanisms to realise the method.

### Why the distinction is practical

Suppose two Python functions both return the correct maximum:

```python
def maximum_with_slice(values: list[int]) -> int:
    maximum = values[0]

    for value in values[1:]:
        if value > maximum:
            maximum = value

    return maximum
```

```python
def maximum_with_index(values: list[int]) -> int:
    maximum = values[0]

    for index in range(1, len(values)):
        if values[index] > maximum:
            maximum = values[index]

    return maximum
```

At the level of the algorithmic idea, both functions perform the same scan and maintain the same candidate.

At the level of implementation, they differ. The slice `values[1:]` normally creates a new list. The index-based version does not need that copy. The difference does not change what problem is solved, but it changes the additional memory used by the program.

This principle will appear throughout the course:

> Two programs may implement the same high-level algorithm while differing in language-specific cost, memory behaviour, and failure modes.

That is why we first understand the idea and then inspect the implementation carefully.

---

## 7. The execution: one run, one history of state

An **execution** is one concrete run of a program for one concrete input.

Consider the call:

```python
result = maximum_with_index([17, 21, 19, 24, 22])
```

The function is the program. The list is the problem instance. The sequence of values taken by `maximum` during this run is the execution history.

| Step | Current element | `maximum` before | Decision | `maximum` after |
|---:|---:|---:|---|---:|
| Initialisation | 17 | — | first element becomes candidate | 17 |
| 1 | 21 | 17 | `21 > 17`, update | 21 |
| 2 | 19 | 21 | `19 > 21` is false | 21 |
| 3 | 24 | 21 | `24 > 21`, update | 24 |
| 4 | 22 | 24 | `22 > 24` is false | 24 |

The output of this execution is `24`.

Now consider another call:

```python
result = maximum_with_index([-5, -2, -11])
```

| Step | Current element | `maximum` before | Decision | `maximum` after |
|---:|---:|---:|---|---:|
| Initialisation | -5 | — | first element becomes candidate | -5 |
| 1 | -2 | -5 | `-2 > -5`, update | -2 |
| 2 | -11 | -2 | `-11 > -2` is false | -2 |

The program is unchanged. The instance is different, so the execution follows a different history of state.

### Why tracing matters

A trace is not only a debugging table. It reveals the operational meaning of the algorithm.

The trace shows that `maximum` is not “the final answer from the beginning.” It is a candidate whose meaning becomes stronger as more elements are processed. After the first element, it is the greatest value in a one-element prefix. After the next element, it is the greatest value in a two-element prefix. Eventually, it becomes the greatest value in the whole sequence.

This gradual strengthening of meaning is the foundation of later correctness arguments.

---

## 8. The five levels side by side

We can now separate the ideas clearly.

### Computational problem

Find the greatest value in any valid finite non-empty sequence of comparable values.

### Problem instance

```text
[17, 21, 19, 24, 22]
```

### Algorithm

Scan the sequence while storing the greatest value seen so far.

### Program

A Python function that implements the scan using variables, a loop, comparison, and return.

### Execution

One run of that function for one concrete sequence, producing a particular history of state and one output.

The levels answer different questions:

| Level | Question |
|---|---|
| Computational problem | What relationship between input and output is required? |
| Problem instance | Which concrete input are we considering? |
| Algorithm | What general method solves every valid instance? |
| Program | How is the method expressed in a programming language? |
| Execution | What happens during this particular run? |

Confusing these levels leads to common mistakes. A hard-coded answer may solve one instance but not the problem. A correct algorithm may be implemented inefficiently. A program may pass several tests while still failing on another valid instance. An execution trace may explain one run without proving that all runs are correct.

---

## 9. Testing is evidence, not proof

Suppose we test the correct implementation with these inputs:

```python
assert maximum_with_index([17, 21, 19, 24, 22]) == 24
assert maximum_with_index([-5, -2, -11]) == -2
assert maximum_with_index([8]) == 8
assert maximum_with_index([3, 3, 3]) == 3
```

These tests are useful. They check ordinary positive values, negative values, the smallest valid input, and repeated values. If one test fails, we know the program is incorrect.

But if all tests pass, what exactly have we learned?

We have learned that four executions produced the expected outputs. We have not examined every finite non-empty sequence. There are infinitely many valid integer sequences, so exhaustive testing is impossible.

To justify correctness, we need a general argument.

### The key claim

After the algorithm has processed the first `k` elements, the variable `maximum` stores the greatest value among those `k` elements.

This claim explains the whole method.

It is true after initialisation because the first processed part contains only `values[0]`, and `maximum` is set to that value.

Assume it is true before processing the next element.

- If the next element is greater than `maximum`, assigning it to `maximum` makes the new candidate the greatest value in the enlarged processed part.
- If the next element is not greater, the existing candidate remains the greatest value in the enlarged processed part.

Therefore the claim remains true after every iteration. When no elements remain, the processed part is the entire sequence, so `maximum` is the greatest element of the input.

This is an informal invariant argument. Later modules will introduce preconditions, postconditions, loop invariants, and termination more systematically. For now, the important point is that the explanation applies to every valid input, not merely to selected examples.

---

## 10. Correctness and efficiency answer different questions

Once we know that the algorithm produces the required result, we can ask how much work it performs.

For an input sequence of length `n`, the algorithm inspects each element once. The number of comparisons grows proportionally to `n`. We therefore describe the running time as linear:

```text
O(n)
```

The index-based implementation stores only a small fixed number of additional values: the current index and the current maximum. Its auxiliary-space use does not grow with the input length:

```text
O(1)
```

The slicing implementation still performs a linear scan, but `values[1:]` creates a list whose size grows with `n`. Its auxiliary-space use is therefore linear:

```text
O(n)
```

The two implementations solve the same computational problem and express the same central algorithmic idea, yet they differ in an implementation-level resource cost.

This distinction prevents two opposite mistakes.

First, we should not call a program good merely because it is fast. A fast program that returns the wrong result is useless.

Second, we should not stop after establishing correctness. When inputs become large, a correct but unnecessarily expensive implementation may become impractical.

The course therefore keeps three questions separate:

1. **Specification:** what result is required?
2. **Correctness:** does the method always produce that result for every valid input?
3. **Complexity:** how do the required resources grow with input size?

---

## 11. A counterexample-driven way to think

One of the most useful habits in algorithm design is to challenge an idea before trusting it.

Suppose someone proposes:

```python
def maximum_value(values: list[int]) -> int:
    maximum = 0

    for value in values:
        if value > maximum:
            maximum = value

    return maximum
```

Do not immediately ask whether the code looks familiar. Ask what hidden claim the initialisation makes.

The assignment `maximum = 0` claims that zero is a valid lower bound for the eventual answer. The problem statement provides no such guarantee. A negative-only sequence is therefore a natural counterexample.

This way of thinking scales to more advanced algorithms:

- If binary search assumes sorted input, test an unsorted sequence.
- If a recursive function reduces `n`, test the smallest values of `n`.
- If a graph traversal does not track visited vertices, test a cycle.
- If a sorting algorithm claims stability, test equal keys with distinct identities.
- If an algorithm modifies input, test whether callers depend on the original structure.

A counterexample does more than show that the output is wrong. It exposes the assumption that made the design wrong.

---

## 12. What you must be able to explain

After studying this chapter, you should be able to answer these questions in complete sentences.

1. Why is `[17, 21, 19, 24, 22]` an instance rather than a computational problem?
2. Why does the problem statement not prescribe a loop or a programming language?
3. What makes the “greatest value seen so far” a useful piece of state?
4. Why is initialising the maximum to zero incorrect for unrestricted integer input?
5. Why is the corrected algorithm allowed to read `values[0]`?
6. How can two Python programs implement the same high-level method but use different amounts of memory?
7. Why can a program have many executions?
8. What does a trace reveal that the final output alone does not?
9. Why can a failing test prove incorrectness while passing tests do not prove correctness?
10. What general claim supports the correctness of the maximum-finding algorithm?
11. Why is the running time linear?
12. Why must correctness and efficiency be discussed separately?

If any answer reduces to “because the code does that,” return to the corresponding section. The objective is to explain the algorithmic relationship, not merely to repeat Python syntax.

---

## 13. Guided practice

### Practice 1 — Separate the levels

Consider the task of counting negative values in a sequence.

Write five descriptions:

1. the computational problem;
2. one problem instance;
3. the algorithmic idea;
4. a Python program;
5. one execution trace.

Make sure each description belongs to exactly one level.

### Practice 2 — Find the hidden assumption

Consider:

```python
def minimum_value(values: list[int]) -> int:
    minimum = 0

    for value in values:
        if value < minimum:
            minimum = value

    return minimum
```

Find a valid input for which the function fails. Then explain the hidden assumption in the initialisation. Do not stop after stating the wrong output.

### Practice 3 — Design useful test instances

Choose test instances for `maximum_with_index` that check:

- the smallest valid input;
- all negative values;
- repeated maximum values;
- the maximum at the beginning;
- the maximum at the end.

For each test, explain what possible mistake it is intended to reveal.

### Practice 4 — Compare implementations

Explain why these two expressions may lead to different memory costs:

```python
for value in values[1:]:
    ...
```

```python
for index in range(1, len(values)):
    ...
```

Your answer should distinguish the algorithmic idea from the Python implementation detail.

---

## 14. Chapter summary

A computational problem describes a required relationship between a class of valid inputs and their outputs. A problem instance is one concrete input from that class. An algorithm is a general finite method for solving every valid instance. A program expresses the method in a programming language. An execution is one run of that program for one particular input.

These distinctions are not academic decoration. They allow us to reason clearly.

They explain why one successful example does not solve a general problem, why executable code may still embody a flawed idea, why a trace concerns one run while correctness concerns all valid inputs, and why implementation details can change resource use without changing the central algorithmic strategy.

The maximum-finding example also introduces a pattern that will return throughout the course: choose a state that summarises the part of the input already processed, update that state while preserving its meaning, and use the preserved meaning to justify the final result.

In the next chapter, we will look more closely at Python code as a visible sequence of state changes. The aim will not be to memorise syntax, but to learn how to read a program as an execution model: what information exists, which statement changes it, which condition controls the next step, and how the final output emerges from those changes.

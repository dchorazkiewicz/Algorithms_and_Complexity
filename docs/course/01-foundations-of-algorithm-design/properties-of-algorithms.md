# Properties of Algorithms

## Why not every procedure deserves to be called an algorithm

A list of instructions can look algorithmic and still fail in an important way. It may be ambiguous. It may never terminate. It may use an operation that cannot actually be carried out. It may work only for one example. It may terminate and still return the wrong result.

For this reason, algorithmics does not treat every procedure as equally acceptable. We need criteria that allow us to ask whether a proposed method is sufficiently precise, executable, general, terminating, and correct.

The traditional properties of algorithms are not merely vocabulary to memorise. Each property corresponds to a practical question that appears during design and review:

- What data does the method accept?
- What result does it produce?
- Is every step unambiguous?
- Can every step actually be performed?
- Does execution stop?
- Does the method solve a whole problem class?
- Does the result satisfy the specification?
- How much time and memory are required?

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to explain input, output, definiteness, effectiveness, finiteness, generality, correctness, and efficiency; distinguish properties of a problem, an algorithm, and an implementation; and diagnose which property is violated by an incomplete or faulty procedure.

---

## 1. A motivating example

Suppose we write:

> Keep looking through the list until you find a large value, then return it.

This sounds like a procedure, but it is not yet a usable algorithm.

Several questions remain unanswered:

- What counts as “large”?
- What happens if no value is large?
- In what order are elements examined?
- Does the method return a value or an index?
- Can the same element be examined repeatedly?
- How do we know the procedure stops?

The example reveals that an algorithm must do more than suggest an idea. It must make enough commitments that execution and reasoning become possible.

---

## 2. Input: the data on which the algorithm operates

An algorithm solves a class of instances. Its **input** identifies the information supplied for one instance.

For linear search:

```text
Input:
    values — a finite sequence
    target — a value comparable with the sequence elements
```

The input description should expose the domain:

- Is the sequence finite?
- May it be empty?
- What types of elements are allowed?
- Must the elements already satisfy an ordering?
- May the algorithm modify the input?

### Input is not only keyboard data

In algorithm analysis, input is logical rather than physical. It may arrive through:

- function parameters;
- an array already stored in memory;
- a file;
- a network message;
- another algorithm;
- a sensor;
- a graph data structure.

The source of data does not define the computational problem. The relevant issue is what information the algorithm receives.

### Hidden input assumptions

Consider binary search. Its visible input may be a sequence and a target, but the method also relies on a structural assumption:

```text
values is sorted in non-decreasing order
```

If that condition is omitted, the algorithm description is incomplete. The method may execute, but correctness is no longer guaranteed.

---

## 3. Output: the required result

The **output** is the result the algorithm must produce for a valid input.

For search, several outputs are possible depending on the specification:

- a Boolean value indicating whether the target exists;
- the first matching index;
- the last matching index;
- every matching index;
- the matching element;
- a distinguished failure result.

These are different problems.

A precise output description therefore matters. Compare:

> Return the target if it is found.

with:

> Return the smallest index `i` such that `values[i] = target`; return `-1` if no such index exists.

The second statement is testable and suitable for correctness reasoning.

### Returned result versus modified state

Some algorithms return a new object. Others modify an existing structure.

For example, an in-place sorting algorithm may have:

```text
Returned result:
    none

Post-state:
    the input sequence contains the original elements in non-decreasing order
```

Output must therefore be interpreted broadly enough to include required state changes, not only function return values.

---

## 4. Definiteness: every step must be unambiguous

An algorithm has **definiteness** when every step is specified precisely enough that the next action is determined.

Ambiguous instruction:

> If the value is quite large, remember it.

Questions immediately arise:

- How large is “quite large”?
- Compared with what?
- What exactly is remembered?

Definite instruction:

```text
IF value > current_maximum THEN
    current_maximum ← value
END IF
```

The condition and update are explicit.

### Definiteness does not require machine code

An algorithm may be written in natural language and still be definite, provided the terms are defined precisely. Conversely, source code may compile while implementing the wrong or underspecified behaviour.

Definiteness concerns the method's meaning, not merely its syntax.

### Sources of ambiguity

Common sources include:

- undefined terms such as “large”, “close”, or “suitable”;
- omitted tie-breaking rules;
- unclear iteration order;
- unstated handling of empty input;
- unspecified failure behaviour;
- inconsistent index conventions;
- instructions that depend on intuition rather than a rule.

---

## 5. Effectiveness: each operation must be executable

An algorithm is **effective** when its primitive operations are simple enough to be carried out in a finite and understood way within the chosen model of computation.

Instruction:

> Determine instantly whether this arbitrary program will ever terminate.

This is not an effective primitive operation for a general algorithm. It hides a difficult or impossible subproblem behind one sentence.

Instruction:

> Compare two integers.

This is normally treated as effective under the standard computational model.

### Effectiveness depends on the abstraction level

In a high-level algorithm, we may treat `append` to a dynamic sequence as one operation. At a lower level, that operation may involve capacity checks, allocation, and copying.

The operation can still be effective, but its actual cost depends on the implementation.

### Library calls are not automatically constant-time primitives

Consider:

```python
values.sort()
```

The operation is executable, but it represents a substantial algorithm. Treating it as a single line does not make its cost constant.

Effectiveness asks whether the step can be performed. Complexity asks how expensive it is.

---

## 6. Finiteness: the algorithm must terminate

An algorithm has **finiteness** when it stops after a finite number of steps for every input covered by its specification.

Consider:

```python
def countdown(number: int) -> None:
    while number != 0:
        number -= 2
```

For an even positive input such as `6`, the values are:

```text
6, 4, 2, 0
```

The loop terminates.

For an odd positive input such as `5`, the values are:

```text
5, 3, 1, -1, -3, -5, ...
```

The loop never reaches zero.

The procedure is not terminating for the entire apparent input domain.

### Termination belongs to the contract

There are two possible repairs.

We may restrict the precondition:

```text
number is a non-negative even integer
```

or change the algorithm:

```python
def countdown(number: int) -> None:
    while number > 0:
        number -= 1
```

The correct choice depends on the intended problem.

### Progress and boundedness

A termination argument usually identifies:

1. a quantity that changes in a consistent direction;
2. a bound that prevents unlimited change;
3. a stopping condition reached when progress is complete.

For linear search, the current index increases and cannot exceed the finite sequence length.

For recursion, the argument usually shows that recursive calls receive smaller instances until a base case is reached.

---

## 7. Generality: the method solves a class of instances

An algorithm should solve the general problem described by its domain, not one memorised example.

Incorrect “solution”:

```python
def maximum_value(values: list[int]) -> int:
    return 24
```

This works for one test input whose maximum happens to be `24`. It does not solve the general maximum problem.

### Generality is controlled by the domain

An algorithm does not need to work for every conceivable object. It must work for every input satisfying its precondition.

For example, an algorithm may be correctly designed for:

```text
finite non-empty lists of integers
```

It is not a defect that it does not accept arbitrary graphs, strings, or infinite streams. The domain defines the required generality.

### Overfitting examples

A proposed method may accidentally depend on:

- positive values only;
- a fixed input length;
- unique elements;
- sorted input;
- the target being present;
- one particular ordering.

Good boundary cases expose these hidden restrictions.

---

## 8. Correctness: the result must satisfy the specification

An algorithm is **correct** when, for every valid input satisfying the precondition, it terminates and produces a state satisfying the postcondition.

Correctness therefore connects three elements:

```text
precondition
    + algorithm
    + termination
        => postcondition
```

### Partial and total correctness

It is useful to distinguish:

- **partial correctness** — if the algorithm terminates, the result is correct;
- **total correctness** — the algorithm terminates and the result is correct.

A method that computes the right answer only if it happens to stop is not fully satisfactory.

### Testing is not correctness

Tests examine selected instances. Correctness concerns all valid instances.

A test can:

- reveal an error;
- confirm behaviour for one case;
- check a boundary case;
- support confidence.

A finite test set cannot by itself prove a universal claim over an unbounded domain.

### Example: first maximum

Suppose `best_index` means:

```text
best_index is the first index of the greatest value among processed elements
```

A correctness argument explains:

- why initialisation makes this statement true;
- why each update preserves it;
- why the statement implies the required result at completion.

The reasoning is tied to the meaning of state, not merely to the visual appearance of code.

---

## 9. Efficiency: correctness is necessary but not sufficient

Two correct algorithms may use very different resources.

To find whether a target occurs in an unsorted sequence, linear search uses at most `n` comparisons:

```text
O(n)
```

If the sequence is sorted, binary search can reduce the search interval by half each step:

```text
O(log n)
```

Both may be correct under their respective preconditions. Their efficiency differs.

### Time and auxiliary space

The two main introductory resource measures are:

- **time complexity** — how the number of relevant operations grows with input size;
- **auxiliary-space complexity** — how additional memory use grows beyond the input itself.

### Efficiency is model-dependent

The cost of an operation depends on representation and implementation.

Examples:

- indexing a Python list is normally treated as `O(1)`;
- inserting at the beginning of a Python list is `O(n)`;
- following a linked-list pointer is `O(1)`;
- finding the `i`-th linked-list element is `O(n)`.

Efficiency cannot be analysed independently of data representation.

### Do not optimise an incorrect algorithm

The order of reasoning matters:

1. define the problem;
2. establish correctness;
3. analyse cost;
4. improve the solution while preserving correctness.

A fast wrong answer is still wrong.

---

## 10. Determinism and nondeterminism

Many introductory algorithms are **deterministic**: the same input and initial state lead to the same sequence of relevant steps and the same result.

Some valid algorithms use randomness, concurrency, or unspecified choice. They may follow different executions while still satisfying the same postcondition.

For example, a randomized algorithm may choose a pivot randomly. Different runs may take different paths, but every valid result must still satisfy the required specification.

Determinism is therefore common but not a universal requirement for every algorithm. The essential requirement is that allowed behaviour is specified and correct.

---

## 11. Robustness and failure behaviour

Robustness is not always listed among the classical defining properties, but it matters in practical implementations.

A robust interface makes invalid situations explicit:

- empty input;
- missing target;
- division by zero;
- malformed graph data;
- index outside a valid range.

Possible responses include:

- a documented sentinel;
- an exception;
- a result type indicating success or failure;
- a precondition placing responsibility on the caller.

The choice must be consistent with the contract.

Robustness should not be confused with changing the problem silently. If empty input is invalid, returning an invented maximum such as zero is not robust; it is incorrect.

---

## 12. The properties are connected

The properties do not exist independently.

### Definiteness supports correctness

If steps are ambiguous, we cannot establish what executions are possible.

### Effectiveness supports executability

If an instruction hides an impossible operation, the procedure cannot be realised.

### Finiteness supports total correctness

A correct final state is irrelevant if execution never reaches it.

### Generality connects examples to the problem class

A method that works only for selected cases is not a solution to the stated problem.

### Efficiency depends on representation

The same high-level task can have different costs under arrays, linked lists, trees, or graphs.

### Contracts organise the properties

The precondition defines the domain. The postcondition defines correctness. The algorithm must be definite, effective, and terminating on that domain.

---

## 13. Diagnosing failed procedures

### Procedure A

> Repeatedly subtract two from a positive integer until it becomes zero.

Problem: it does not terminate for positive odd integers.

Violated property: finiteness over the stated domain.

### Procedure B

> Choose a reasonably central element of the list.

Problem: “reasonably central” is undefined.

Violated property: definiteness.

### Procedure C

```python
def contains(values: list[int], target: int) -> bool:
    return values[0] == target
```

Problem: it checks only one position.

Violated property: general correctness for arbitrary list length.

### Procedure D

> Sort the data instantly, then return the first element.

Problem: “sort instantly” hides a non-trivial operation and cost.

Violated issue: effectiveness or an invalid cost model, depending on interpretation.

### Procedure E

```python
def average(values: list[float]) -> float:
    return sum(values) / len(values)
```

Problem: the implementation fails on empty input unless non-emptiness is a precondition.

Missing element: explicit domain or failure behaviour.

---

## 14. A review checklist for a proposed algorithm

When evaluating a method, ask:

### Problem and domain

- What problem is being solved?
- What are the valid inputs?
- What assumptions are required?

### Result

- What exact output or final state is required?
- How is failure represented?

### Precision

- Is every step unambiguous?
- Are tie cases and boundary cases specified?

### Executability

- Can each primitive operation be carried out?
- Does any “simple” line hide a major subproblem?

### Termination

- What quantity makes progress?
- What bound prevents infinite execution?

### Correctness

- What does the important state mean?
- Why is that meaning established and preserved?
- Why does the final state imply the postcondition?

### Generality

- Does the method handle every input in the domain?
- Which examples could expose hidden assumptions?

### Efficiency

- What is the input size?
- Which operations dominate time?
- What additional memory is used?

---

## 15. What you must be able to explain

After this chapter, you should be able to:

- define the principal properties of algorithms;
- distinguish input assumptions from output guarantees;
- identify ambiguous instructions;
- explain effectiveness at a chosen abstraction level;
- give a simple termination argument;
- distinguish one successful example from general correctness;
- explain partial and total correctness;
- separate correctness from efficiency;
- diagnose which property a faulty procedure violates.

---

## 16. Practice

### Exercise 1 — Diagnose the property

For each instruction, identify the main problem:

1. “Continue until the result looks good.”
2. “Return the middle value” for an even-length sequence.
3. “Try random values until the exact optimum is found.”
4. “Return `0` as the maximum of an empty list.”
5. “Check only the first three elements” for an arbitrary-length sequence.

### Exercise 2 — Repair termination

Analyse:

```python
def reduce_to_zero(value: int) -> None:
    while value != 0:
        value -= 3
```

Find inputs for which it terminates and inputs for which it does not. Propose one repaired contract and one repaired algorithm.

### Exercise 3 — Hidden assumptions

The following function finds a maximum:

```python
def maximum(values: list[int]) -> int:
    result = 0
    for value in values:
        if value > result:
            result = value
    return result
```

State the domain on which it is correct. Then redesign it for all non-empty integer lists.

### Exercise 4 — Correct but inefficient

Give two correct algorithms for detecting duplicates in a list. Explain why both are correct and compare their likely time and memory costs.

### Exercise 5 — Partial versus total correctness

Describe a procedure that would return the correct answer if it terminated but may fail to terminate. Explain why this establishes at most partial correctness.

### Exercise 6 — Effective primitives

For each operation, explain whether you would treat it as primitive in an introductory algorithm and what cost may be hidden:

- integer comparison;
- list indexing;
- sorting a list;
- searching a database;
- asking whether an arbitrary program terminates.

---

## 17. Summary

A valid algorithm is more than a sequence of plausible instructions. It has a defined input and required output. Its steps are definite and effective. It terminates on every valid input. It solves the full problem class described by its domain. Its result satisfies the specification. Its resource use can be analysed.

These properties provide a disciplined way to evaluate algorithms before becoming attached to a particular implementation.

The next chapter develops pseudocode as a representation designed to express these properties clearly while remaining independent of Python and C++ syntax.
# How to Study Algorithms

## 1. Algorithms cannot be learned by recognition alone

It is easy to read a familiar piece of code and feel that it is understood. The real test is different:

- Can you explain the problem without looking at the code?
- Can you state the assumptions?
- Can you trace the algorithm for a new input?
- Can you explain why it works?
- Can you modify it when the problem changes?
- Can you estimate its cost?
- Can you identify a wrong solution and construct a counterexample?

This course is designed around those abilities. The goal is active understanding, not recognition.

## 2. The three passes through every topic

A useful way to study each chapter is to make three passes.

### Pass 1 — Build the conceptual model

During the first pass, focus on:

- definitions;
- notation;
- the problem being solved;
- the data representation;
- the meaning of important state variables;
- the main algorithmic idea.

Do not try to memorise code yet.

At the end of this pass, you should be able to explain the topic in plain language.

### Pass 2 — Follow the mechanism

During the second pass:

- trace examples by hand;
- write state tables;
- predict branch decisions;
- identify what changes after each step;
- compare the trace with the pseudocode and Python implementation.

At the end of this pass, you should be able to simulate the algorithm for a small input.

### Pass 3 — Justify and generalise

During the third pass:

- explain correctness;
- explain termination;
- analyse complexity;
- test boundary cases;
- modify the problem;
- compare alternative implementations;
- solve problems without copying the worked example.

At the end of this pass, you should be able to use the idea in a new context.

## 3. A notebook method

For every major algorithm, create one page with the following structure.

### Problem

Write the task in one precise sentence.

### Input and output

State the valid input domain and exact required result.

### Key idea

Write the algorithmic insight in two or three sentences.

### State

List the variables or data structures that carry information during execution. State what each one means.

### Pseudocode

Write a language-independent version.

### Trace

Trace one ordinary example and one boundary case.

### Correctness

Write the initialisation, preservation, and completion argument, or the equivalent recursive reasoning.

### Termination

State why the loop or recursion must stop.

### Complexity

Define the input size and state time and auxiliary-space complexity.

### Mistakes

Write at least one plausible wrong solution and the input that exposes it.

### Python

Implement the algorithm after the reasoning is complete.

This format becomes a reusable study tool throughout the course.

## 4. How to use worked examples

A worked example should not be read like a story whose ending is already known.

Before revealing each step:

1. predict the next state;
2. state which condition will be true or false;
3. explain which variable should change;
4. compare your prediction with the solution;
5. explain any difference.

If you only read the completed trace, you practise recognition. If you predict each step, you practise execution reasoning.

## 5. How to use Python examples

Python code in this course serves four purposes:

1. make the algorithm executable;
2. show how the abstract state is represented concretely;
3. expose language-specific operation costs;
4. provide material for testing and modification.

Do not begin by copying the function.

Use this sequence:

1. hide the implementation;
2. read the problem and contract;
3. write your own pseudocode;
4. implement a first Python version;
5. compare it with the course version;
6. explain every difference;
7. run both on the same tests;
8. analyse whether the differences affect correctness or complexity.

## 6. How to learn definitions

A definition is not learned when you can repeat the sentence. It is learned when you can:

- identify examples;
- identify non-examples;
- explain why the distinction matters;
- use the term correctly in an argument.

For example, to learn **problem instance**, you should be able to:

- define it;
- give an instance of a search problem;
- explain why the general search task is not itself one instance;
- distinguish a test case from the problem class.

Use definition cards with four fields:

```text
Term:
Definition:
Example:
Non-example or common confusion:
```

## 7. How to study data structures

For every structure—array, linked list, stack, queue, tree, heap, or graph—ask six questions.

### Representation

What information is stored, and how are elements connected or located?

### Invariant

What property must always remain true?

### Operations

Which operations are supported?

### Cost

How much time and additional memory does each operation require?

### Use

Which problems benefit from this structure?

### Language mapping

How is the abstract structure represented in Python and C++, and which differences matter?

Do not reduce a data structure to a library class. The structure is the model and its rules; the class is one implementation.

## 8. How to study recursion

Recursion must be studied at two levels.

### Problem-level recursion

Ask:

- What smaller instance is being solved?
- What is the base case?
- Why is the smaller instance genuinely smaller?
- How are partial results combined?

### Execution-level recursion

Ask:

- What arguments belong to each call?
- What local state is stored?
- What is waiting to happen after the recursive call returns?
- How deep can the call stack become?

Module 02 introduces the first level. Module 05 develops the second in detail.

## 9. How to study complexity

Do not memorise complexity labels without deriving them.

For each algorithm:

1. define the input size;
2. identify the dominant operation;
3. count or bound its executions;
4. include hidden costs such as copying or sorting;
5. simplify the growth rate;
6. state auxiliary-space use;
7. name the analysed case when best, average, and worst cases differ.

For example, one loop does not automatically imply `O(n)`. The loop body may perform an `O(n)` operation, producing `O(n²)` total time.

## 10. How to use mistakes productively

An incorrect solution is valuable when you can explain:

- the assumption it makes;
- the input that violates the assumption;
- the observed failure;
- the exact invariant or contract clause that is broken;
- the smallest repair that restores correctness.

Keep a mistake log with entries such as:

```text
Problem:
Wrong idea:
Counterexample:
Why it fails:
Corrected principle:
```

This directly supports the syllabus outcome concerning improvement based on constructive feedback.

## 11. How to know whether a topic is mastered

Recognition is the weakest level. Mastery develops through several stages.

### Level 1 — Vocabulary

You can define the terms.

### Level 2 — Mechanism

You can trace the algorithm.

### Level 3 — Construction

You can implement it from a specification.

### Level 4 — Justification

You can explain correctness, termination, and complexity.

### Level 5 — Adaptation

You can modify the algorithm for a changed requirement.

### Level 6 — Evaluation

You can compare alternatives and choose an appropriate data structure or strategy.

Do not move on merely because Level 1 or Level 2 feels comfortable.

## 12. A weekly study cycle

A practical cycle for one topic is:

### Before reading

Answer the diagnostic questions and record what you do not know.

### During reading

Write definitions, traces, and questions. Run only small examples.

### After reading

Close the notes and explain the topic aloud or in writing.

### Practice

Solve problems that require tracing, construction, debugging, correctness, and complexity.

### Review

Return after one or two days and repeat the explanation without looking.

### Extend

Change one assumption or requirement and adapt the solution.

## 13. Questions that reveal shallow understanding

When you think you understand a topic, ask:

- What breaks if the input is empty?
- Which assumption is essential?
- Can the input contain duplicates?
- Does the algorithm modify its input?
- Why is the initial state valid?
- Why does the loop stop?
- What if the comparison operator changes?
- What is the worst valid input?
- Which operation dominates the cost?
- Could another data structure improve the solution?

If these questions cannot be answered, the topic is not yet secure.

## 14. Communication is part of algorithmic skill

The syllabus requires precise communication of difficulties during solution development. Practise writing statements such as:

- “The implementation fails when all values are negative because the initial maximum is outside the input.”
- “The algorithm returns the last maximum because equality causes the stored index to be replaced.”
- “The function is logically correct, but slicing creates linear auxiliary-space use.”
- “Termination is not established because the loop condition depends on a variable that is never updated.”

Avoid vague statements such as:

- “It does not work.”
- “The loop is wrong.”
- “Python is slow.”

Precise diagnosis is a technical ability.

## 15. The role of Module 00

Module 00 does not attempt to teach the entire syllabus. It establishes a method that will be applied repeatedly:

```text
understand → specify → represent → execute → justify → analyse → improve
```

Module 01 now formalises the first part of that process through imperative computation, preconditions, postconditions, algorithm representations, properties, pseudocode, and structuring techniques.

## 16. What you must be able to explain

Before leaving this chapter, you should be able to:

- describe the three-pass study method;
- build a complete algorithm notebook entry;
- use a worked example actively;
- explain why Python code should follow rather than replace reasoning;
- study a data structure through representation, invariant, operations, cost, and use;
- distinguish problem-level recursion from execution-level recursion;
- derive rather than memorise complexity;
- use counterexamples and feedback to improve a solution;
- state the difference between recognition and mastery.

## 17. Summary

Algorithms are learned through active reconstruction.

Read definitions, but also produce examples and non-examples. Read traces, but also predict them. Read code, but also implement from the specification. Run tests, but also construct counterexamples. Learn complexity labels, but also derive them. Study correct solutions, but also diagnose broken ones.

The course is organised to support that process. The Module 00 review now checks whether the foundational vocabulary and study method are in place before the formal syllabus sequence begins.

# Module 05 — Functions, the Call Stack, and Recursion

## Why this module matters

Earlier modules used functions as convenient containers for algorithms. We passed arguments, returned results, and occasionally called a function recursively. That was enough to write code, but not enough to explain what actually happens during a call.

A function lives inside an execution environment. It receives values, creates local state, may observe or change external state, and eventually returns control to its caller. When calls are nested, the program must remember where each unfinished call should continue. Recursive execution intensifies this mechanism because many calls of the same function may be active at once.

This module develops the operational model behind those facts. The objective is not merely to recognise recursive syntax. The objective is to explain how calls are created, suspended, resumed, and removed; how side effects connect a function to its environment; why some recursive designs terminate and others fail; and how recursion can be replaced by an explicit stack.

## Syllabus scope

This module develops the fifth course-content block:

> Functions and their environment. Side effects. Stack behaviour. Recursive calls. Indirect and nested recursion. Explicit-stack implementation. Problems of recursion. Recursion versus iteration.

## What you should be able to do after this module

After completing the module, you should be able to:

1. distinguish parameters, arguments, local variables, returned values, and external state;
2. explain how a function interacts with its environment;
3. identify and classify side effects;
4. describe what a stack frame stores conceptually;
5. trace nested calls and returns;
6. explain the two phases of recursive execution: expansion and unwinding;
7. distinguish direct, indirect, mutual, and nested recursion;
8. replace a recursive traversal with an explicit stack;
9. diagnose missing base cases, missing progress, excessive depth, duplicated work, and hidden mutation;
10. compare recursive and iterative implementations in clarity, time, and auxiliary space.

## Concept map

```text
function call
    ├── arguments and parameters
    ├── local environment
    ├── returned value
    ├── side effects
    └── continuation point
            │
            ▼
        call stack
            ├── one frame per active call
            ├── last call returns first
            └── recursion creates repeated frames
                    │
                    ├── direct recursion
                    ├── indirect recursion
                    ├── nested recursion
                    └── explicit-stack simulation
```

## Learning path

1. **Functions and their environment** — understand the boundary between a function and the state around it.
2. **Side effects and interface design** — separate returned results from observable changes.
3. **The call stack and stack frames** — model unfinished calls and control return.
4. **The anatomy of a recursive call** — connect smaller subproblems to suspended work.
5. **Tracing recursive execution** — follow both descent and unwinding.
6. **Indirect and nested recursion** — study recursion that is not visible as a direct self-call.
7. **Replacing recursion with an explicit stack** — make pending work visible as data.
8. **Problems and failure modes of recursion** — recognise designs that are correct mathematically but poor operationally.
9. **Recursion versus iteration revisited** — choose the representation that best fits the problem and constraints.
10. **Worked examples and review** — integrate contracts, traces, correctness, termination, and cost.

## Prerequisites

You should already understand basic functions, local variables, loops, base and recursive cases, decreasing measures, lists, and Big O notation.

!!! note "Study objective"
    Do not stop when you can predict the final returned value. A complete explanation identifies the active calls, local state in each call, pending operations, side effects, progress toward termination, and auxiliary-space cost.
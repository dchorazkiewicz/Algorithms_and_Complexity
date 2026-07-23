# Dynamic Data Structures

## When the shape of the state changes

An array has a fixed indexed shape at a particular moment. Many algorithms, however, need a collection that grows, shrinks, or changes its links while the computation proceeds.

A **dynamic data structure** is a structure whose logical size or connectivity can change during execution.

This module introduces the idea; Module 07 develops linked lists, stacks, queues, priority queues, and skip lists in detail.

## Logical structure versus storage

A dynamic structure has two levels:

- the **logical structure** seen by the algorithm;
- the **concrete representation** used by the language or implementation.

A Python list can grow dynamically from the programmer's perspective, even though its implementation manages an internal array and occasional reallocation. A linked structure grows by creating nodes and connecting references.

These representations support different operation costs.

## Dynamic state in search

Backtracking naturally uses dynamic structures:

- a current path grows and shrinks;
- a set of used choices changes;
- a stack of pending states expands and contracts;
- a dictionary may record visited states or best known costs.

```python
def depth_first_states(start, next_states):
    stack = [start]
    visited = {start}

    while stack:
        state = stack.pop()
        yield state

        for neighbour in next_states(state):
            if neighbour not in visited:
                visited.add(neighbour)
                stack.append(neighbour)
```

The stack size is not known in advance. It depends on the explored search space.

## Ownership and aliasing

When a dynamic structure contains mutable objects, an algorithm must know whether it is:

- creating a new object;
- sharing a reference;
- copying one level;
- copying the complete nested structure.

Search bugs often arise when several pending states share the same mutable list.

Incorrect:

```python
next_state = current_state
next_state.append(choice)
```

Both names refer to the same object.

Safer for an independent branch:

```python
next_state = current_state + [choice]
```

## Maintaining invariants

A dynamic structure remains valid only if every update preserves its invariant.

Examples:

- a stack's top is the most recently pushed unremoved item;
- a set contains each element at most once;
- a parent map connects discovered states to valid predecessors;
- a linked list has consistent links;
- a priority queue maintains heap order.

The more flexible the structure, the more carefully updates must be specified.

## Amortised perspective

Some dynamic operations are occasionally expensive but cheap on average over a sequence. Appending to a dynamic array is the standard example: most appends use existing capacity, while occasional growth requires copying elements.

A complete cost analysis may therefore distinguish:

- worst-case cost of one operation;
- amortised cost across many operations;
- total cost of the algorithm.

## Choosing a structure

Ask which operations dominate:

- direct indexed access;
- insertion or deletion at one end;
- membership tests;
- extracting the smallest or largest priority;
- restoring the most recent state;
- preserving an explicit network of links.

The structure should follow the required operations, not habit.

## What you must be able to explain

- In what sense is a structure dynamic?
- How can two dynamic representations expose similar interfaces but different costs?
- Why is aliasing dangerous in branching search?
- Which invariant must each update preserve?
- When is amortised analysis more informative than one-operation worst case?
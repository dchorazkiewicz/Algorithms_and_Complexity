# Worked Examples

## Example 1 — Build an undirected graph and verify its invariant

```python
def build_undirected(edges):
    graph = {}

    for left, right in edges:
        graph.setdefault(left, set()).add(right)
        graph.setdefault(right, set()).add(left)

    for vertex, neighbours in graph.items():
        for neighbour in neighbours:
            assert vertex in graph[neighbour]

    return graph
```

The postcondition is not merely that all input pairs were processed. It is that every logical edge is represented symmetrically.

## Example 2 — Reconstruct one dependency chain

```python
def dependency_path(graph, start, target):
    predecessor = {start: None}
    stack = [start]

    while stack:
        vertex = stack.pop()
        if vertex == target:
            break

        for neighbour in graph[vertex]:
            if neighbour not in predecessor:
                predecessor[neighbour] = vertex
                stack.append(neighbour)

    if target not in predecessor:
        return None

    result = []
    current = target
    while current is not None:
        result.append(current)
        current = predecessor[current]

    return list(reversed(result))
```

The predecessor dictionary serves three roles: discovery marker, tree representation, and evidence used to construct the result.

## Example 3 — Count connected components

```python
def component_count(graph) -> int:
    visited = set()
    count = 0

    for start in graph:
        if start in visited:
            continue

        count += 1
        stack = [start]
        visited.add(start)

        while stack:
            vertex = stack.pop()
            for neighbour in graph[vertex]:
                if neighbour not in visited:
                    visited.add(neighbour)
                    stack.append(neighbour)

    return count
```

The loop invariant is that `count` equals the number of fully started components among vertices considered by the outer loop, while `visited` contains every vertex belonging to those components.

## Example 4 — Decide whether an undirected graph is a tree

For a finite undirected graph with at least one vertex, connectedness plus `E = V - 1` is sufficient.

```python
def is_tree(graph) -> bool:
    if not graph:
        return False

    edge_entries = sum(len(neighbours) for neighbours in graph.values())
    if edge_entries % 2 != 0:
        raise ValueError("asymmetric undirected representation")

    edge_count = edge_entries // 2
    if edge_count != len(graph) - 1:
        return False

    start = next(iter(graph))
    visited = set()
    stack = [start]

    while stack:
        vertex = stack.pop()
        if vertex in visited:
            continue
        visited.add(vertex)
        stack.extend(graph[vertex] - visited)

    return len(visited) == len(graph)
```

The edge-count test alone is insufficient: a disconnected graph may still have `V - 1` edges.

## Example 5 — Course planning with topological ordering

```python
def course_order(prerequisite_graph):
    colour = {course: 0 for course in prerequisite_graph}
    order = []

    def visit(course):
        colour[course] = 1

        for next_course in prerequisite_graph[course]:
            if colour[next_course] == 1:
                raise ValueError("cyclic prerequisites")
            if colour[next_course] == 0:
                visit(next_course)

        colour[course] = 2
        order.append(course)

    for course in prerequisite_graph:
        if colour[course] == 0:
            visit(course)

    order.reverse()
    return order
```

This assumes `A → B` means that `A` must occur before `B`. Reversing the domain meaning of the edge reverses the interpretation of the output.

## Example 6 — State-space DFS with richer states

Suppose a corridor contains locked doors and keys. Position alone is not a complete state.

```python
def can_reach_goal(start_state, goal_position, next_states):
    stack = [start_state]
    visited = {start_state}

    while stack:
        position, keys = stack.pop()
        if position == goal_position:
            return True

        for state in next_states(position, keys):
            if state not in visited:
                visited.add(state)
                stack.append(state)

    return False
```

The visited key must include both position and key set. Otherwise the search may incorrectly reject returning to a location after acquiring a new capability.

## Integrated analysis questions

For each example, identify:

1. the graph or state-space model;
2. the representation invariant;
3. the meaning of visited state;
4. the stack invariant;
5. the correctness claim;
6. the stopping condition;
7. the dominant time and auxiliary-space costs;
8. any conclusion that depends on direction or representation.
# Worked Examples

This chapter combines the individual structures from Module 07 into complete design analyses. Each example identifies the ADT, representation, invariant, contract, trace, mutation behaviour, and complexity.

---

## Example 1 — Reverse a singly linked list

### Problem

Given the head of a finite acyclic singly linked list, reverse the chain in place and return the new head.

### Contract

```text
input: head of a finite acyclic singly linked list
output: head of a list containing exactly the same nodes in reverse order
side effects: every original next link may be modified
allocation: no new data nodes
```

### Algorithm

```python
def reverse(head: Node[T] | None) -> Node[T] | None:
    previous = None
    current = head

    while current is not None:
        successor = current.next
        current.next = previous
        previous = current
        current = successor

    return previous
```

### Trace

For:

```text
A → B → C → None
```

start:

```text
previous = None
current = A
```

iteration 1:

```text
successor = B
A.next = None
previous = A
current = B

A → None        B → C → None
```

iteration 2:

```text
successor = C
B.next = A
previous = B
current = C

B → A → None    C → None
```

iteration 3:

```text
successor = None
C.next = B
previous = C
current = None

C → B → A → None
```

### Invariant

At every loop boundary:

- `previous` heads the reversed processed prefix;
- `current` heads the untouched suffix;
- those two regions contain exactly the original nodes;
- no node is lost or duplicated.

### Termination

Each iteration removes one node from the untouched suffix. A finite list therefore reaches `current is None` after `n` iterations.

### Complexity

```text
time: O(n)
auxiliary space: O(1)
```

### Typical failure

```python
current.next = previous
current = current.next
```

After changing `current.next`, the old successor has been lost. The temporary `successor` must be saved first.

---

## Example 2 — Evaluate postfix notation with a stack

### Problem

Evaluate an arithmetic expression written in postfix notation.

Example:

```text
5 2 3 * +
```

means:

```text
5 + (2 * 3) = 11
```

### Why a stack fits

When an operator is encountered, it applies to the two most recently completed operand values. That is exactly LIFO behaviour.

### Algorithm

```python
def evaluate_postfix(tokens: list[str]) -> int:
    stack: list[int] = []

    for token in tokens:
        if token.lstrip("-").isdigit():
            stack.append(int(token))
            continue

        if len(stack) < 2:
            raise ValueError("invalid postfix expression")

        right = stack.pop()
        left = stack.pop()

        if token == "+":
            stack.append(left + right)
        elif token == "-":
            stack.append(left - right)
        elif token == "*":
            stack.append(left * right)
        else:
            raise ValueError("unknown operator")

    if len(stack) != 1:
        raise ValueError("invalid postfix expression")

    return stack[0]
```

### Trace

```text
token  stack
-----  ---------
5      [5]
2      [5, 2]
3      [5, 2, 3]
*      [5, 6]
+      [11]
```

### Invariant

After processing any valid token prefix, the stack contains values of completed subexpressions whose results have not yet been consumed by a later operator.

### Operand order

For subtraction:

```text
8 3 -
```

we pop:

```text
right = 3
left = 8
```

and compute:

```text
8 - 3
```

The first popped value is the right operand.

### Complexity

For `n` tokens:

```text
time: O(n)
auxiliary stack space: O(n) worst case
```

---

## Example 3 — Browser history with two stacks

### Problem

Support:

- visiting a new page;
- going back;
- going forward.

### Representation

Use:

```text
current page
back stack
forward stack
```

### Invariant

- the top of `back` is the page reached by one Back action;
- the top of `forward` is the page reached by one Forward action;
- visiting a new page after going back destroys the forward branch.

### Implementation

```python
class History:
    def __init__(self, start: str) -> None:
        self.current = start
        self.back_stack: list[str] = []
        self.forward_stack: list[str] = []

    def visit(self, page: str) -> None:
        self.back_stack.append(self.current)
        self.current = page
        self.forward_stack.clear()

    def back(self) -> str:
        if not self.back_stack:
            return self.current

        self.forward_stack.append(self.current)
        self.current = self.back_stack.pop()
        return self.current

    def forward(self) -> str:
        if not self.forward_stack:
            return self.current

        self.back_stack.append(self.current)
        self.current = self.forward_stack.pop()
        return self.current
```

### Trace

Start at `A`:

```text
visit B
back=[A] current=B forward=[]

visit C
back=[A,B] current=C forward=[]

back
back=[A] current=B forward=[C]

visit D
back=[A,B] current=D forward=[]
```

The last step clears the forward stack because `D` begins a new history branch.

### Complexity

Each stack operation is `O(1)` amortised with Python lists. Clearing `forward_stack` can be linear in the number of discarded entries, but each discarded entry can be removed only after it previously entered the history; over ordinary use the representation remains efficient.

---

## Example 4 — Round-robin processing with a queue

### Problem

Tasks have remaining work units. Every active task receives at most `quantum` work units and unfinished tasks return to the rear.

### Algorithm

```python
from collections import deque


def round_robin(tasks: list[tuple[str, int]], quantum: int) -> list[str]:
    if quantum <= 0:
        raise ValueError("quantum must be positive")
    if any(remaining <= 0 for _, remaining in tasks):
        raise ValueError("task work must be positive")

    queue = deque(tasks)
    completion_order: list[str] = []

    while queue:
        name, remaining = queue.popleft()
        used = min(quantum, remaining)
        remaining -= used

        if remaining == 0:
            completion_order.append(name)
        else:
            queue.append((name, remaining))

    return completion_order
```

### Queue invariant

At every loop boundary, the queue contains exactly unfinished tasks in their future service order.

A task removed from the front either:

- finishes and disappears from the queue; or
- remains unfinished and returns to the rear.

### Trace

For:

```text
A:5, B:2, C:4
quantum = 2
```

```text
queue before      action         queue after
A5 B2 C4          run A2         B2 C4 A3
B2 C4 A3          run B2 done    C4 A3
C4 A3             run C2         A3 C2
A3 C2             run A2         C2 A1
C2 A1             run C2 done    A1
A1                run A1 done    empty
```

Completion order:

```text
B, C, A
```

### Termination

Total remaining work decreases by at least one on every iteration because `quantum > 0` and all queued tasks have positive remaining work.

### Complexity

If total work is `W` and quantum is `q`, the number of service events is approximately:

\[
\sum_i \left\lceil \frac{w_i}{q} \right\rceil.
\]

Each queue operation is `O(1)`.

---

## Example 5 — Fixed-capacity circular queue

### Problem

Implement FIFO behaviour inside a fixed array without shifting elements.

### Representation

Store:

```text
items      fixed array
front      physical index of logical first item
size       number of logical items
capacity   len(items)
```

### Algorithm

```python
class CircularQueue:
    def __init__(self, capacity: int) -> None:
        if capacity <= 0:
            raise ValueError("capacity must be positive")
        self.items: list[object | None] = [None] * capacity
        self.front = 0
        self.size = 0

    def enqueue(self, value: object) -> None:
        if self.size == len(self.items):
            raise OverflowError("queue full")

        rear = (self.front + self.size) % len(self.items)
        self.items[rear] = value
        self.size += 1

    def dequeue(self) -> object:
        if self.size == 0:
            raise IndexError("queue empty")

        value = self.items[self.front]
        self.items[self.front] = None
        self.front = (self.front + 1) % len(self.items)
        self.size -= 1
        return value
```

### Trace with capacity 4

```text
enqueue A  items=[A,.,.,.] front=0 size=1
enqueue B  items=[A,B,.,.] front=0 size=2
enqueue C  items=[A,B,C,.] front=0 size=3
dequeue    items=[.,B,C,.] front=1 size=2
enqueue D  items=[.,B,C,D] front=1 size=3
enqueue E  items=[E,B,C,D] front=1 size=4
```

Physical array:

```text
[E, B, C, D]
```

Logical queue:

```text
B, C, D, E
```

### Invariant

Logical item `j` is stored at:

\[
(\text{front} + j) \bmod \text{capacity}.
\]

No shifting is required.

---

## Example 6 — Stable priority scheduling

### Problem

Process smaller numeric priorities first while preserving FIFO order among equal priorities.

### Representation

Store heap entries:

```text
(priority, sequence, task)
```

where `sequence` increases for every insertion.

### Algorithm

```python
import heapq
from itertools import count


class StablePriorityQueue:
    def __init__(self) -> None:
        self._heap: list[tuple[int, int, str]] = []
        self._counter = count()

    def push(self, task: str, priority: int) -> None:
        heapq.heappush(
            self._heap,
            (priority, next(self._counter), task),
        )

    def pop(self) -> str:
        if not self._heap:
            raise IndexError("priority queue empty")
        _, _, task = heapq.heappop(self._heap)
        return task
```

### Trace

Insert:

```text
A priority 2 sequence 0
B priority 1 sequence 1
C priority 2 sequence 2
D priority 1 sequence 3
```

Removal order is:

```text
B, D, A, C
```

because priority dominates, then sequence breaks ties.

### Complexity

```text
insert: O(log n)
extract: O(log n)
peek: O(1)
```

### Contract lesson

If FIFO tie behaviour were not required, the sequence number would be a different design choice rather than an automatic requirement.

---

## Example 7 — Merge several sorted streams with a priority queue

### Problem

Merge `k` individually sorted streams containing `N` total values.

### Algorithm

```python
import heapq


def merge_many(streams: list[list[int]]) -> list[int]:
    heap: list[tuple[int, int, int]] = []
    result: list[int] = []

    for stream_index, stream in enumerate(streams):
        if stream:
            heapq.heappush(heap, (stream[0], stream_index, 0))

    while heap:
        value, stream_index, element_index = heapq.heappop(heap)
        result.append(value)

        next_index = element_index + 1
        if next_index < len(streams[stream_index]):
            next_value = streams[stream_index][next_index]
            heapq.heappush(heap, (next_value, stream_index, next_index))

    return result
```

### Invariant

For every non-exhausted stream, the heap contains its smallest not-yet-output value. Therefore the heap root is the smallest globally possible next value.

### Complexity

Heap size never exceeds `k`:

```text
time: O(N log k)
heap space: O(k)
```

Repeatedly scanning all `k` current stream heads would cost `O(Nk)`.

---

## Example 8 — Move-to-front under a non-uniform workload

### Problem

A lookup list is used only to find items by key; iteration order is not externally meaningful. Recent accesses are likely to repeat.

### Policy

After every successful lookup, move the found node to the head.

### Example access sequence

Initial order:

```text
A → B → C → D
```

Requests:

```text
C, C, C, D, C
```

Count inspected positions starting from `1`.

Without reordering:

```text
C costs 3
C costs 3
C costs 3
D costs 4
C costs 3
----------------
total = 16
```

With move-to-front:

```text
request C: cost 3, order C A B D
request C: cost 1, order C A B D
request C: cost 1, order C A B D
request D: cost 4, order D C A B
request C: cost 2, order C D A B
----------------
total = 11
```

This example demonstrates a workload benefit, not a universal theorem that move-to-front always wins.

### Correctness condition

The optimisation is legal only because physical traversal order is not part of the abstract result.

---

## Example 9 — Skip-list search trace

Consider:

```text
level 2:  -∞ -------- 20 -------- 50 -------- +∞
level 1:  -∞ --- 10 --20 --- 35 --50 --- 70 -- +∞
level 0:  -∞ 5 10 14 20 27 35 41 50 63 70 91 +∞
```

Search for `41`.

A possible route:

```text
start at -∞ level 2
move to 20
next 50 would overshoot → descend

at 20 level 1
move to 35
next 50 would overshoot → descend

at 35 level 0
move to 41
found
```

### Search invariant

When descending from a level, the current node is the greatest visited key at that level known to be smaller than the target. No skipped node to its left can be the target.

### Guarantee

Under standard independent random promotion, expected search is `O(log n)`. The worst case remains `O(n)`.

This is a probabilistic expected guarantee, not an amortised one.

---

## Example 10 — Merge sort on a linked list

### Problem

Sort a singly linked list while reusing its nodes.

### Structure

```text
split list near middle
recursively sort both halves
merge sorted halves by relinking nodes
```

### Sketch

```python
def merge_sort(head: Node[int] | None) -> Node[int] | None:
    if head is None or head.next is None:
        return head

    first, second = split_half(head)
    first = merge_sort(first)
    second = merge_sort(second)
    return merge_sorted(first, second)
```

### Correctness structure

Induction on list length:

- length `0` or `1` is already sorted;
- splitting produces two smaller lists containing exactly the original nodes;
- recursive calls return sorted versions of those halves;
- `merge_sorted` returns a sorted chain containing exactly both sorted halves.

Therefore the final list is a sorted permutation of the original nodes.

### Complexity

Balanced splitting and linear merge give:

\[
T(n) = 2T(n/2) + O(n) = O(n \log n).
\]

The merge reuses nodes, so it does not allocate an additional `O(n)` array. Recursive call depth is `O(log n)` for balanced splitting.

---

## Cross-example comparison

| Example | ADT / structure | Dominant idea | Time | Extra structural space |
|---|---|---|---:|---:|
| reverse list | singly linked list | local relinking | `O(n)` | `O(1)` |
| postfix evaluation | stack | LIFO unfinished expressions | `O(n)` | `O(n)` |
| browser history | two stacks | reversible LIFO histories | mostly `O(1)` operations | `O(n)` |
| round robin | queue | FIFO fairness | proportional to service events | `O(tasks)` |
| circular queue | queue | modular physical indexing | `O(1)` per operation | fixed capacity |
| stable scheduler | priority queue | priority + sequence tie rule | `O(log n)` per update | `O(n)` |
| multiway merge | priority queue | best frontier candidate | `O(N log k)` | `O(k)` heap |
| move-to-front | self-organising list | workload adaptation | `O(n)` worst lookup | `O(1)` relink |
| skip-list search | skip list | multi-level shortcuts | expected `O(log n)` | expected `O(n)` total structure |
| linked merge sort | linked list | split + merge | `O(n log n)` | `O(log n)` call stack |

## Integrated analysis questions

For every example, be able to identify:

1. the abstract data type or structural abstraction;
2. the concrete representation;
3. the complete operation contract;
4. the representation invariant;
5. which references, links, indices, or heap entries change;
6. what must be saved before mutation;
7. the termination argument;
8. the correctness argument or semantic guarantee;
9. the dominant time cost;
10. the auxiliary-space cost;
11. whether input nodes or containers are mutated;
12. which alternative representation would change the cost or contract.

!!! note "Study objective"
    The examples are not templates to copy mechanically. Change one requirement—stable versus arbitrary ties, mutable versus persistent merge, fixed versus growing queue, known node versus search by value—and identify which part of the representation, proof, or complexity analysis must change.

# Divide and Conquer

## Solving a large problem through smaller problems

Some algorithms become clearer when a problem of size `n` is reduced to smaller problems of the same kind. The general pattern is called **divide and conquer**:

1. **divide** the problem into smaller subproblems;
2. **conquer** the subproblems, usually recursively;
3. **combine** their solutions into the solution of the original problem.

The pattern is not automatically efficient. Its value depends on how balanced the subproblems are, how expensive division and combination are, and whether the same work is repeated.

## 1. Base case and recursive case

A divide-and-conquer algorithm needs a base case small enough to solve directly.

For an array interval:

```text
if the interval contains zero or one element, it is already sorted
```

The recursive case must create strictly smaller intervals. Otherwise termination is not guaranteed.

## 2. Example: maximum by division

```python
def maximum_divide(values: list[int], left: int, right: int) -> int:
    if right - left == 1:
        return values[left]

    middle = (left + right) // 2
    left_maximum = maximum_divide(values, left, middle)
    right_maximum = maximum_divide(values, middle, right)
    return max(left_maximum, right_maximum)
```

Precondition:

```text
0 ≤ left < right ≤ len(values)
```

The interval is split into two nonempty smaller intervals. The combine step takes the maximum of the two returned values.

This algorithm is not faster than a linear scan; both use `O(n)` time. Its purpose is to expose the structural pattern.

## 3. Recursion tree intuition

For an input of size `8`, balanced division gives subproblem sizes:

```text
8
├── 4
│   ├── 2
│   │   ├── 1
│   │   └── 1
│   └── 2
└── 4
    ├── 2
    └── 2
```

The depth is logarithmic because size is repeatedly halved. The total work depends on the amount of work across all nodes, not only the depth.

## 4. Recurrence intuition

A recurrence expresses cost in terms of smaller instances.

For maximum by balanced division:

```text
T(n) = 2T(n/2) + O(1)
```

There are two subproblems and constant combine work. The total is `O(n)`.

For merge sort, the combine step is linear:

```text
T(n) = 2T(n/2) + O(n)
```

This leads to `O(n log n)`.

For balanced Quicksort, partitioning is linear and recursive calls are roughly half-sized, giving similar average behaviour. For highly unbalanced partitions:

```text
T(n) = T(n - 1) + O(n)
```

which leads to `O(n²)`.

At this stage the objective is to connect subproblem shape with growth, not to solve every recurrence formally.

## 5. Combine step versus implicit combination

Some algorithms need an explicit combine operation. Merge sort merges two sorted sequences.

Quicksort is different. Partitioning arranges elements so that, after recursively sorting the left and right regions, no substantial merge step is needed. Combination is largely implicit in the partition structure.

## 6. Correctness structure

A divide-and-conquer correctness argument usually follows induction on problem size:

1. prove the base case;
2. assume recursive calls correctly solve smaller valid subproblems;
3. prove that division creates valid smaller subproblems;
4. prove that the combine step produces a correct solution for the original problem.

The recursive calls cannot simply be assumed correct without showing that their preconditions hold.

## 7. Termination structure

Choose a measure such as interval length:

```text
right - left
```

Show that:

- it is a non-negative integer;
- every recursive call uses a strictly smaller value;
- the base case is reached at size `0` or `1`.

Balanced division is useful for performance, but strict decrease is the essential requirement for termination.

## 8. Overlapping subproblems

Divide and conquer normally creates independent or mostly independent subproblems. When the same smaller problem is solved repeatedly, dynamic programming or memoisation may be more appropriate.

This distinction becomes important later:

- divide and conquer: split into separate subproblems;
- dynamic programming: exploit repeated overlapping subproblems.

## 9. Parallelism

Independent subproblems may sometimes be solved concurrently. This is another benefit of the pattern, although actual parallel execution introduces scheduling and communication costs beyond the current scope.

## 10. Common mistakes

### Subproblems do not shrink

A midpoint or boundary error may reproduce the original interval.

### Missing combine logic

Correct subproblem answers do not automatically form the full answer.

### Overlapping or omitted regions

The division must cover the intended problem exactly, unless duplication is deliberately justified.

### Assuming balanced division

A method may be divide and conquer but still create very uneven subproblems, changing complexity dramatically.

## 11. What you must be able to explain

- the divide–conquer–combine pattern;
- the role of the base case;
- how problem size proves termination;
- how recursion-tree shape affects cost;
- why valid subproblem contracts matter;
- the difference between explicit and implicit combination;
- why divide and conquer is not automatically `O(n log n)`.

## Practice

1. Trace `maximum_divide` on eight values.
2. State its precondition and postcondition.
3. Draw recursion trees for balanced and unbalanced division.
4. Explain why two half-size calls plus linear combination suggest `O(n log n)`.
5. Find a boundary error that prevents interval size from decreasing.

The next chapter applies this pattern to Quicksort.
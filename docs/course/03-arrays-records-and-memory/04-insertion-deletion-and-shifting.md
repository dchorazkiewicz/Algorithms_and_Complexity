# Insertion, Deletion, and Shifting

## Why structural changes are more expensive than replacement

Replacing `A[i]` changes one existing component. Inserting or deleting changes the structure of the ordered collection itself. Positions after the changed point must often be updated so that order remains correct and components stay consecutive.

This chapter explains the mechanics and cost of those operations.

!!! note "What you should learn from this chapter"
    By the end of the chapter, you should be able to explain why insertion and deletion require shifting, design the direction of movement correctly, distinguish logical length from capacity, and analyse operation cost by position.

---

## 1. Replacement is not insertion

Replacement:

```python
values[2] = 99
```

changes one component but preserves length.

Insertion:

```text
before: [10, 20, 30, 40]
insert 25 at index 2
 after: [10, 20, 25, 30, 40]
```

The original components at indices `2` and `3` move right. The length increases by one.

Deletion performs the reverse movement:

```text
before: [10, 20, 25, 30, 40]
delete index 2
 after: [10, 20, 30, 40]
```

---

## 2. Insertion into a fixed-capacity array

Assume an array has enough capacity and a logical length `length`.

To insert `item` at `position`:

1. validate `0 ≤ position ≤ length`;
2. ensure free capacity exists;
3. shift elements from right to left;
4. place the new item;
5. increase logical length.

Pseudocode:

```text
FOR index ← length DOWN TO position + 1 DO
    A[index] ← A[index - 1]
END FOR
A[position] ← item
length ← length + 1
```

The right-to-left direction is essential. If movement began from the insertion position, an original value could be overwritten before it was copied.

---

## 3. Why shifting direction matters

Initial active data:

```text
[10, 20, 30, 40, _]
```

Insert `25` at index `2`.

Correct right-to-left movement:

```text
move 40 from 3 to 4: [10, 20, 30, 40, 40]
move 30 from 2 to 3: [10, 20, 30, 30, 40]
write 25 at 2:       [10, 20, 25, 30, 40]
```

An incorrect left-to-right shift would copy `30` over `40` and then copy the already duplicated value again.

The general rule is:

> When source and destination regions overlap, move in the direction that avoids destroying unread source values.

---

## 4. Deletion from an ordered array

To delete the component at `position`:

1. validate `0 ≤ position < length`;
2. shift later elements one position left;
3. decrease logical length.

```text
FOR index ← position TO length - 2 DO
    A[index] ← A[index + 1]
END FOR
length ← length - 1
```

Left-to-right movement is now correct because each source lies to the right of its destination.

---

## 5. Operation cost depends on position

For an array of length `n`:

```text
replace at known index: O(1)
insert at end with free capacity: O(1)
insert at front: O(n)
delete from end: O(1)
delete from front: O(n)
insert/delete in middle: O(n) worst case
```

The cost comes from the number of shifted components.

An operation can be logically simple but physically expensive because the representation requires consecutive positions.

---

## 6. Python list insertion and deletion

Python provides convenient methods:

```python
values.insert(position, item)
del values[position]
values.pop(position)
```

These methods hide the shifting, not the cost.

```python
values.append(item)
```

is usually amortised `O(1)`, while insertion at the beginning is `O(n)`.

A correct complexity analysis must describe the underlying operation rather than assume that a one-line method is constant-time.

---

## 7. Educational manual insertion

The following function returns a new list so that the shifting logic is visible:

```python
def inserted(values: list[int], position: int, item: int) -> list[int]:
    if position < 0 or position > len(values):
        raise IndexError("invalid insertion position")

    result = [0] * (len(values) + 1)

    for index in range(position):
        result[index] = values[index]

    result[position] = item

    for index in range(position, len(values)):
        result[index + 1] = values[index]

    return result
```

The original list is preserved.

```text
Time: O(n)
Output space: O(n)
```

This version copies two regions around the insertion point.

---

## 8. Educational manual deletion

```python
def removed_at(values: list[int], position: int) -> list[int]:
    if position < 0 or position >= len(values):
        raise IndexError("invalid deletion position")

    result = [0] * (len(values) - 1)

    for index in range(position):
        result[index] = values[index]

    for index in range(position + 1, len(values)):
        result[index - 1] = values[index]

    return result
```

Again:

```text
Time: O(n)
Output space: O(n)
```

The postcondition must state that every component except the deleted one appears in the same relative order.

---

## 9. Stable deletion in place

Suppose we must remove every negative value while preserving order.

A write-index strategy avoids repeated individual deletions:

```python
def remove_negatives_in_place(values: list[int]) -> None:
    write_index = 0

    for value in values:
        if value >= 0:
            values[write_index] = value
            write_index += 1

    del values[write_index:]
```

For:

```text
[4, -2, 7, -1, 3]
```

result:

```text
[4, 7, 3]
```

Deleting each negative separately from the middle could lead to repeated shifting and `O(n²)` total work. Compaction performs one linear scan and one suffix deletion.

---

## 10. Ordered versus unordered deletion

If order must be preserved, later components shift left.

If order does not matter, deletion may be faster:

1. copy the last active component into the deleted position;
2. reduce length.

```text
before: [10, 20, 30, 40]
delete index 1 without preserving order
copy 40 to index 1
 after: [10, 40, 30]
```

This can be `O(1)`, but it changes relative order. The contract determines whether that is allowed.

This illustrates a recurring design principle:

> Stronger output requirements may require more work.

---

## 11. Rotation as controlled shifting

Right rotation by one position:

```python
def rotate_right_once(values: list[int]) -> None:
    if len(values) < 2:
        return

    final = values[-1]

    for index in range(len(values) - 1, 0, -1):
        values[index] = values[index - 1]

    values[0] = final
```

The original final value must be saved before shifting. Otherwise it would be overwritten.

```text
Time: O(n)
Auxiliary space: O(1)
```

---

## What you must be able to explain

You should be able to explain:

- why replacement differs from insertion;
- why insertion shifts right and deletion shifts left;
- why movement direction matters for overlapping regions;
- how position affects cost;
- why Python's convenient methods do not remove underlying complexity;
- how compaction avoids repeated deletion cost;
- how relaxing order preservation can change complexity.

## Practice

1. Trace insertion of `15` at index `1` into `[10, 20, 30, _]`.
2. Trace deletion at index `2` from `[5, 8, 11, 14]`.
3. Explain why left-to-right shifting is wrong for insertion.
4. Implement left rotation by one position.
5. Design stable removal of all zero values in `O(n)` time.
6. Compare order-preserving and unordered deletion contracts.

## Summary

Insertion and deletion expose the central trade-off of contiguous arrays. Direct access is cheap because positions are regular, but structural changes may require many components to move. Correct shifting direction preserves data; the contract determines whether order must be preserved and therefore how much work is necessary.
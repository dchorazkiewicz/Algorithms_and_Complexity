# Using Binary Search Trees to Build a Dictionary

## A dictionary is an interface, not one concrete structure

A **dictionary** stores key–value associations and normally supports operations such as:

- insert or update a key;
- retrieve the value associated with a key;
- test membership;
- remove a key;
- iterate over entries.

The abstract contract does not require a hash table. A binary search tree can implement the same interface by ordering nodes by key.

## Node representation

```python
from dataclasses import dataclass
from typing import Generic, TypeVar

K = TypeVar("K")
V = TypeVar("V")

@dataclass
class EntryNode(Generic[K, V]):
    key: K
    value: V
    left: "EntryNode[K, V] | None" = None
    right: "EntryNode[K, V] | None" = None
```

The tree invariant concerns keys. Values do not determine placement.

## Lookup

```python
def get(root: EntryNode[K, V] | None, key: K) -> V:
    current = root

    while current is not None:
        if key == current.key:
            return current.value
        current = current.left if key < current.key else current.right

    raise KeyError(key)
```

The failure behaviour is part of the dictionary contract. Another interface might return `None`, but that becomes ambiguous when `None` is a legitimate stored value.

## Insert or update

```python
def put(root: EntryNode[K, V] | None, key: K, value: V) -> EntryNode[K, V]:
    if root is None:
        return EntryNode(key, value)

    if key < root.key:
        root.left = put(root.left, key, value)
    elif key > root.key:
        root.right = put(root.right, key, value)
    else:
        root.value = value

    return root
```

An equal key updates the existing mapping. This prevents multiple nodes from representing conflicting values for the same key.

## Ordered operations

A tree-based dictionary has capabilities that ordinary hash-table iteration does not inherently provide:

- keys in sorted order through inorder traversal;
- minimum and maximum key;
- predecessor and successor;
- range queries;
- ordered prefix of results.

```python
def items_in_range(root, low, high):
    if root is None:
        return []

    result = []

    if low < root.key:
        result.extend(items_in_range(root.left, low, high))

    if low <= root.key <= high:
        result.append((root.key, root.value))

    if root.key < high:
        result.extend(items_in_range(root.right, low, high))

    return result
```

The range bounds prune irrelevant subtrees. This is more than traversal followed by filtering.

## Encapsulating the root

```python
class BSTMap(Generic[K, V]):
    def __init__(self) -> None:
        self._root: EntryNode[K, V] | None = None
        self._size = 0
```

A complete class must maintain a representation invariant connecting `_size` to the number of nodes and preserve the BST ordering after every operation.

The public user should not manipulate child references directly. Encapsulation protects the invariant.

## Key requirements

Keys must support a consistent total ordering. Comparisons must behave coherently:

- exactly one of `a < b`, `a == b`, or `a > b` should hold for distinct comparable keys;
- transitivity must hold;
- comparison results should not change while a key is stored.

A mutable key whose ordering fields change after insertion can invalidate the tree without changing any links.

## Complexity

For a tree of height `h`:

```text
lookup: O(h)
insert/update: O(h)
delete: O(h)
ordered iteration: O(n)
```

A balanced search tree gives logarithmic key operations. An ordinary unbalanced BST provides no such worst-case guarantee.

## BST dictionary versus hash dictionary

A hash table usually offers expected `O(1)` lookup and update under suitable assumptions, but it does not maintain key order.

A balanced BST offers `O(log n)` worst-case ordered operations and efficient range navigation.

The choice depends on required operations:

- choose hashing for fast equality-based lookup when order is irrelevant;
- choose a balanced tree when sorted iteration, predecessor, successor, or range queries matter.

## Common mistakes

- treating dictionary and hash table as synonyms;
- storing duplicate nodes for one key without defining multimap semantics;
- returning `None` for absence when `None` is a valid value;
- comparing values instead of keys;
- allowing stored keys to mutate in ways that change their order;
- exposing node references so callers can violate the invariant.

## What you must be able to explain

- Which dictionary operations benefit from order?
- Why does an equal key normally update rather than insert?
- Why must keys have a stable total ordering?
- How does a range query avoid irrelevant subtrees?
- When is a balanced tree preferable to a hash table?
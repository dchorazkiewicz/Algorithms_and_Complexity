# Traversing a Binary Tree

## Traversal is an order of observation

A tree does not have one natural left-to-right order in the way an array does. To process every node, an algorithm must choose when to visit the current node relative to its subtrees.

That choice defines a **traversal order**. Different orders expose different meanings even when they touch exactly the same nodes.

## Depth-first traversals

For a node with left subtree `L`, value `N`, and right subtree `R`:

- **preorder:** `N, L, R`;
- **inorder:** `L, N, R`;
- **postorder:** `L, R, N`.

The names describe when the node itself is processed.

### Preorder

```python
def preorder(root):
    if root is None:
        return []
    return [root.value] + preorder(root.left) + preorder(root.right)
```

Preorder is useful when the parent must be processed before descendants, for example when copying a tree, serialising structure, or presenting a hierarchy from top to bottom.

### Inorder

```python
def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.value] + inorder(root.right)
```

For a binary search tree, inorder traversal produces keys in sorted order. This is not a generic property of binary trees; it follows from the BST ordering invariant.

### Postorder

```python
def postorder(root):
    if root is None:
        return []
    return postorder(root.left) + postorder(root.right) + [root.value]
```

Postorder is appropriate when descendants must be completed before their parent, for example computing subtree sizes, deleting a tree, or evaluating an expression tree.

## One example, three orders

For the tree:

```text
        A
       / \
      B   C
     / \   \
    D   E   F
```

we obtain:

```text
preorder:  A B D E C F
inorder:   D B E A C F
postorder: D E B F C A
```

The traversal does not change the tree. It changes the order in which its structure is exposed.

## Level-order traversal

**Level-order traversal** visits nodes by increasing depth. It uses a queue rather than the recursive call stack.

```python
from collections import deque

def level_order(root):
    if root is None:
        return []

    order = []
    queue = deque([root])

    while queue:
        node = queue.popleft()
        order.append(node.value)

        if node.left is not None:
            queue.append(node.left)
        if node.right is not None:
            queue.append(node.right)

    return order
```

The queue invariant is:

> nodes waiting in the queue are exactly the discovered but not yet processed nodes, ordered by discovery depth and then left-to-right order.

## Iterative depth-first traversal

Recursion is not mandatory. An explicit stack can store pending nodes.

```python
def preorder_iterative(root):
    if root is None:
        return []

    order = []
    stack = [root]

    while stack:
        node = stack.pop()
        order.append(node.value)

        if node.right is not None:
            stack.append(node.right)
        if node.left is not None:
            stack.append(node.left)

    return order
```

The right child is pushed first because the stack is LIFO and the left child must be processed first.

Iterative inorder traversal requires preserving the path to the next unprocessed ancestor:

```python
def inorder_iterative(root):
    order = []
    stack = []
    current = root

    while current is not None or stack:
        while current is not None:
            stack.append(current)
            current = current.left

        current = stack.pop()
        order.append(current.value)
        current = current.right

    return order
```

## Correctness pattern

For recursive traversal:

1. the empty tree contributes nothing;
2. by induction, recursive calls visit each subtree exactly once in the required order;
3. placing the current node before, between, or after those calls gives preorder, inorder, or postorder.

For level order, prove that the queue processes nodes in nondecreasing depth and enqueues each child exactly once.

## Complexity

Every traversal visits each node once:

```text
time: O(n)
```

Auxiliary space depends on shape:

- recursive DFS: `O(h)` call-stack space;
- explicit DFS: up to `O(h)` for many shapes, and `O(n)` in general formulations;
- BFS: `O(w)`, where `w` is maximum tree width.

A balanced tree has `h = O(log n)`. A chain has `h = O(n)`.

## Traversal versus search

Traversal promises to process every node. Search may stop early when a target is found. Without an ordering invariant, worst-case search in a binary tree still requires `O(n)` work.

## Common mistakes

- calling inorder “sorted traversal” for every binary tree;
- pushing left before right in iterative preorder and accidentally reversing the intended order;
- forgetting the empty-tree case;
- counting traversal as `O(h)` because recursion depth is `h`; time is still `O(n)`;
- modifying child links during traversal without defining how that affects remaining work.

## What you must be able to explain

- Why do preorder, inorder, and postorder differ?
- Why does level order require a queue?
- Why is traversal time `O(n)` even for a balanced tree?
- Why does recursive auxiliary space depend on height?
- Under which invariant does inorder become sorted?
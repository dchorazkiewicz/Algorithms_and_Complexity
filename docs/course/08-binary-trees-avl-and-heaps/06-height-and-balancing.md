# Height, Degeneration, and Balancing

## Why shape becomes an algorithmic cost

A binary search tree may contain the correct keys and preserve perfect ordering while still being inefficient. The missing property is controlled height.

Insert keys `10, 20, 30, 40, 50` into an ordinary BST in that order. Every new key becomes a right child:

```text
10
  \
   20
     \
      30
        \
         40
           \
            50
```

Search now resembles linked-list traversal. The tree has size five and height four.

## Best, average, and worst shape

For `n` nodes:

- a compact tree can have height `O(log n)`;
- a completely skewed tree has height `n - 1`;
- ordinary BST cost is therefore `O(h)`, ranging from logarithmic to linear.

Random insertion orders often produce acceptable average height, but this is not a worst-case guarantee. Input order can be structured or adversarial.

## What balancing means

Balancing does not mean forcing a perfect tree after every update. It means maintaining a structural condition strong enough to bound height.

Different balanced-tree families use different invariants:

- AVL trees restrict subtree-height difference;
- red–black trees restrict path colouring properties;
- B-trees control node occupancy and branching.

This module develops AVL trees because their invariant is directly expressed through height.

## Balance factor

For a node `v`, define:

```text
balance_factor(v) = height(v.left) - height(v.right)
```

Under the common empty-height convention `-1`, a leaf has height `0` and balance factor `0`.

An AVL node is balanced when its factor is one of:

```text
-1, 0, 1
```

A factor `2` means the left subtree is too high; `-2` means the right subtree is too high.

## Local repair, global consequence

An insertion changes heights only along the path from the inserted leaf back to the root. Therefore balancing need not rebuild the entire tree.

A **rotation** changes a small group of links while preserving inorder key order. This local operation restores height balance at the first unbalanced region.

The crucial proof obligation is not merely that the picture looks shorter. A correct rotation must preserve:

1. every node and key;
2. the BST ordering invariant;
3. all subtrees not involved in the rotation;
4. valid parent–child connections;
5. correct stored heights.

## Rebuilding versus incremental balancing

One way to balance a static BST is:

1. collect keys by inorder traversal;
2. recursively choose the middle key as root;
3. build balanced left and right subtrees.

This costs `O(n)` and is useful when updates are rare.

Incremental balancing repairs the tree after insertions and deletions. It is more complex but maintains logarithmic height over time.

## Height metadata

Recomputing subtree height from scratch after every update can cost `O(n)`. Balanced trees usually store height in each node.

```python
def node_height(node) -> int:
    return -1 if node is None else node.height


def refresh_height(node) -> None:
    node.height = 1 + max(node_height(node.left), node_height(node.right))
```

The metadata invariant is:

> each stored height equals one plus the maximum stored height of the children.

Rotations must refresh heights in bottom-up order because upper heights depend on lower ones.

## Cost of checking balance

A full validation that recursively computes every subtree height costs `O(n)`. Maintaining height metadata allows each visited node on an update path to be checked in `O(1)` time.

If update depth is `O(log n)`, the complete balancing work remains `O(log n)`.

## Common mistakes

- assuming a visually symmetric tree is the only balanced shape;
- claiming random insertion gives a worst-case guarantee;
- computing balance from subtree sizes rather than heights;
- rotating without preserving the middle subtree;
- updating stored heights in the wrong order;
- believing balance eliminates all update cost rather than bounding height.

## What you must be able to explain

- How can a valid BST still be inefficient?
- Why is `O(h)` the right general cost expression?
- What does an AVL balance factor measure?
- Why can insertion imbalance be repaired along one ancestor path?
- Why must rotations preserve inorder order?
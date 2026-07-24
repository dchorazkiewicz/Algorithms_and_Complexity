(() => {
  class BSTVisualizer {
    constructor(root) {
      this.root = root;
      this.initial = [50, 30, 70, 20, 40, 60, 80];
      this.values = [...this.initial];
      this.steps = [];
      this.stepIndex = 0;
      this.timer = null;
      this.renderShell();
      this.bindEvents();
      this.prepareSearch(60);
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'bst-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Interactive trace</p><h3>Binary search tree</h3></div>
          <span class="ds-viz__complexity">Cost: O(h)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Operation<select data-role="operation"><option value="search">Search</option><option value="insert">Insert</option><option value="inorder">Inorder traversal</option></select></label>
          <label data-role="value-label">Key<input data-role="value" type="number" value="60"></label>
          <button type="button" data-action="prepare">Prepare trace</button>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="bst-viz__canvas" data-role="canvas" aria-live="polite"></div>
        <div class="ds-viz__status"><strong data-role="title">Ready</strong><span data-role="text">Choose an operation and prepare a trace.</span></div>
        <div class="ds-viz__metrics">
          <span>Height: <strong data-role="height">0</strong></span>
          <span>Comparisons: <strong data-role="comparisons">0</strong></span>
          <span>Visited: <strong data-role="visited">—</strong></span>
          <span>Step: <strong data-role="progress">0/0</strong></span>
        </div>`;
    }

    bindEvents() {
      this.operation = this.root.querySelector('[data-role="operation"]');
      this.valueInput = this.root.querySelector('[data-role="value"]');
      this.valueLabel = this.root.querySelector('[data-role="value-label"]');
      this.operation.addEventListener('change', () => {
        this.valueLabel.hidden = this.operation.value === 'inorder';
      });
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.togglePlay());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
    }

    buildTree(values = this.values) {
      let root = null;
      const insert = (node, key) => {
        if (!node) return { key, left: null, right: null };
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        return node;
      };
      values.forEach((value) => { root = insert(root, value); });
      return root;
    }

    cloneTree(node) {
      return node ? { key: node.key, left: this.cloneTree(node.left), right: this.cloneTree(node.right) } : null;
    }

    height(node) {
      return node ? 1 + Math.max(this.height(node.left), this.height(node.right)) : 0;
    }

    snapshot(tree, active, visited, title, text, comparisons, order = []) {
      return { tree: this.cloneTree(tree), active, visited: [...visited], title, text, comparisons, order: [...order] };
    }

    prepare() {
      const value = Number(this.valueInput.value);
      if (this.operation.value !== 'inorder' && !Number.isInteger(value)) return this.showError('Key must be an integer.');
      if (this.operation.value === 'search') this.prepareSearch(value);
      else if (this.operation.value === 'insert') this.prepareInsert(value);
      else this.prepareInorder();
    }

    prepareSearch(key) {
      this.stop();
      const tree = this.buildTree();
      this.steps = [];
      const visited = [];
      let current = tree;
      let comparisons = 0;
      while (current) {
        visited.push(current.key);
        comparisons += 1;
        if (key === current.key) {
          this.steps.push(this.snapshot(tree, current.key, visited, 'Key found', `${key} equals ${current.key}. Search stops.`, comparisons));
          break;
        }
        const direction = key < current.key ? 'left' : 'right';
        this.steps.push(this.snapshot(tree, current.key, visited, 'Compare and exclude a subtree', `${key} is ${key < current.key ? 'smaller' : 'greater'} than ${current.key}; continue ${direction}.`, comparisons));
        current = key < current.key ? current.left : current.right;
      }
      if (!current) this.steps.push(this.snapshot(tree, null, visited, 'Key not found', `The search reached an empty child. ${key} is absent.`, comparisons));
      this.stepIndex = 0;
      this.render();
    }

    prepareInsert(key) {
      this.stop();
      const tree = this.buildTree();
      this.steps = [];
      const visited = [];
      let current = tree;
      let parent = null;
      let comparisons = 0;
      while (current) {
        visited.push(current.key);
        comparisons += 1;
        if (key === current.key) {
          this.steps.push(this.snapshot(tree, current.key, visited, 'Duplicate key', `${key} already exists; this strict-key demonstration leaves the tree unchanged.`, comparisons));
          this.stepIndex = 0;
          return this.render();
        }
        parent = current;
        this.steps.push(this.snapshot(tree, current.key, visited, 'Follow unsuccessful search path', `${key} is ${key < current.key ? 'smaller' : 'greater'} than ${current.key}.`, comparisons));
        current = key < current.key ? current.left : current.right;
      }
      const newNode = { key, left: null, right: null };
      if (key < parent.key) parent.left = newNode; else parent.right = newNode;
      this.steps.push(this.snapshot(tree, key, [...visited, key], 'Attach a new leaf', `The first empty child is the insertion position for ${key}.`, comparisons));
      this.stepIndex = 0;
      this.render();
    }

    prepareInorder() {
      this.stop();
      const tree = this.buildTree();
      this.steps = [];
      const order = [];
      const visit = (node) => {
        if (!node) return;
        visit(node.left);
        order.push(node.key);
        this.steps.push(this.snapshot(tree, node.key, order, 'Inorder visit', `Visit ${node.key} after its left subtree and before its right subtree.`, 0, order));
        visit(node.right);
      };
      visit(tree);
      this.steps.push(this.snapshot(tree, null, order, 'Traversal complete', `Sorted order: ${order.join(', ')}.`, 0, order));
      this.stepIndex = 0;
      this.render();
    }

    showError(message) {
      const tree = this.buildTree();
      this.steps = [this.snapshot(tree, null, [], 'Invalid input', message, 0)];
      this.stepIndex = 0;
      this.render(true);
    }

    layout(node, depth = 0, min = 0, max = 100, nodes = [], edges = []) {
      if (!node) return { nodes, edges };
      const x = (min + max) / 2;
      const y = 12 + depth * 24;
      nodes.push({ key: node.key, x, y });
      if (node.left) {
        const childX = (min + x) / 2;
        edges.push({ x1: x, y1: y, x2: childX, y2: y + 24 });
        this.layout(node.left, depth + 1, min, x, nodes, edges);
      }
      if (node.right) {
        const childX = (x + max) / 2;
        edges.push({ x1: x, y1: y, x2: childX, y2: y + 24 });
        this.layout(node.right, depth + 1, x, max, nodes, edges);
      }
      return { nodes, edges };
    }

    render(isError = false) {
      const state = this.steps[this.stepIndex];
      const { nodes, edges } = this.layout(state.tree);
      this.root.querySelector('[data-role="canvas"]').innerHTML = `
        <svg viewBox="0 0 100 100" role="img" aria-label="Binary search tree">
          ${edges.map((e) => `<line x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}"></line>`).join('')}
          ${nodes.map((n) => `<g class="bst-viz__node ${n.key === state.active ? 'is-active' : ''} ${state.visited.includes(n.key) ? 'is-visited' : ''}" transform="translate(${n.x} ${n.y})"><circle r="5.3"></circle><text text-anchor="middle" dy="0.35em">${n.key}</text></g>`).join('')}
        </svg>
        ${state.order.length ? `<div class="bst-viz__order"><strong>Output:</strong> ${state.order.join(' → ')}</div>` : ''}`;
      this.root.querySelector('[data-role="title"]').textContent = state.title;
      const text = this.root.querySelector('[data-role="text"]');
      text.textContent = state.text;
      text.classList.toggle('is-error', isError);
      this.root.querySelector('[data-role="height"]').textContent = Math.max(0, this.height(state.tree) - 1);
      this.root.querySelector('[data-role="comparisons"]').textContent = state.comparisons;
      this.root.querySelector('[data-role="visited"]').textContent = state.visited.length ? state.visited.join(' → ') : '—';
      this.root.querySelector('[data-role="progress"]').textContent = `${this.stepIndex + 1}/${this.steps.length}`;
    }

    go(delta) {
      this.stop();
      this.stepIndex = Math.max(0, Math.min(this.steps.length - 1, this.stepIndex + delta));
      this.render();
    }

    togglePlay() {
      if (this.timer) return this.stop();
      if (this.stepIndex >= this.steps.length - 1) this.stepIndex = 0;
      this.root.querySelector('[data-action="play"]').textContent = 'Pause';
      this.timer = window.setInterval(() => {
        if (this.stepIndex >= this.steps.length - 1) return this.stop();
        this.stepIndex += 1;
        this.render();
      }, 1000);
    }

    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }

    reset() {
      this.stop();
      this.operation.value = 'search';
      this.valueLabel.hidden = false;
      this.valueInput.value = '60';
      this.prepareSearch(60);
    }
  }

  function initialise() {
    document.querySelectorAll('[data-bst-viz]').forEach((root) => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new BSTVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();

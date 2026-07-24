(() => {
  class HeapVisualizer {
    constructor(root) {
      this.root = root;
      this.heap = [3, 7, 5, 12, 9, 8];
      this.steps = [];
      this.stepIndex = 0;
      this.timer = null;
      this.renderShell();
      this.bindEvents();
      this.renderState({ heap: this.heap, active: [], swaps: 0, comparisons: 0, message: 'Ready. The minimum is at the root.' });
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'heap-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Interactive trace</p><h3>Min-heap and priority queue</h3></div>
          <span class="ds-viz__complexity">insert O(log n) · extract-min O(log n)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Value<input data-role="value" type="number" value="4"></label>
          <button type="button" data-action="insert">Prepare insert</button>
          <button type="button" data-action="extract">Prepare extract-min</button>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="heap-viz__layout">
          <section><p class="heap-viz__label">Tree view</p><div class="heap-viz__tree" data-role="tree"></div></section>
          <section><p class="heap-viz__label">Array view</p><div class="heap-viz__array" data-role="array"></div></section>
        </div>
        <div class="ds-viz__status"><strong data-role="step-title">Initial state</strong><span data-role="message">Ready.</span></div>
        <div class="ds-viz__metrics">
          <span>Minimum: <strong data-role="minimum">—</strong></span>
          <span>Comparisons: <strong data-role="comparisons">0</strong></span>
          <span>Swaps: <strong data-role="swaps">0</strong></span>
          <span>Step: <strong data-role="progress">0/0</strong></span>
        </div>`;
    }

    bindEvents() {
      this.valueInput = this.root.querySelector('[data-role="value"]');
      this.root.querySelector('[data-action="insert"]').addEventListener('click', () => this.prepareInsert());
      this.root.querySelector('[data-action="extract"]').addEventListener('click', () => this.prepareExtract());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.togglePlay());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
    }

    snapshot(heap, active, swaps, comparisons, message) {
      return { heap: [...heap], active: [...active], swaps, comparisons, message };
    }

    prepareInsert() {
      this.stop();
      const value = Number(this.valueInput.value);
      if (!Number.isFinite(value)) return;
      const heap = [...this.heap, value];
      let index = heap.length - 1;
      let swaps = 0;
      let comparisons = 0;
      this.steps = [this.snapshot(heap, [index], swaps, comparisons, `Append ${value} at index ${index}. Completeness is preserved.`)];
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2);
        comparisons += 1;
        this.steps.push(this.snapshot(heap, [parent, index], swaps, comparisons, `Compare child ${heap[index]} with parent ${heap[parent]}.`));
        if (heap[parent] <= heap[index]) break;
        [heap[parent], heap[index]] = [heap[index], heap[parent]];
        swaps += 1;
        this.steps.push(this.snapshot(heap, [parent, index], swaps, comparisons, 'Swap them: the smaller priority moves upward.'));
        index = parent;
      }
      this.steps.push(this.snapshot(heap, [index], swaps, comparisons, 'Heap order restored.'));
      this.stepIndex = 0;
      this.render();
    }

    prepareExtract() {
      this.stop();
      if (!this.heap.length) return;
      const heap = [...this.heap];
      const minimum = heap[0];
      let swaps = 0;
      let comparisons = 0;
      this.steps = [this.snapshot(heap, [0], swaps, comparisons, `The minimum ${minimum} is at the root.`)];
      const last = heap.pop();
      if (heap.length) {
        heap[0] = last;
        this.steps.push(this.snapshot(heap, [0], swaps, comparisons, `Move final value ${last} to the root and remove the last slot.`));
        let index = 0;
        while (true) {
          const left = 2 * index + 1;
          const right = left + 1;
          let smallest = index;
          if (left < heap.length) { comparisons += 1; if (heap[left] < heap[smallest]) smallest = left; }
          if (right < heap.length) { comparisons += 1; if (heap[right] < heap[smallest]) smallest = right; }
          this.steps.push(this.snapshot(heap, [index, left, right].filter(i => i < heap.length), swaps, comparisons, 'Compare the current node with its children and choose the smaller child.'));
          if (smallest === index) break;
          [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
          swaps += 1;
          this.steps.push(this.snapshot(heap, [index, smallest], swaps, comparisons, 'Swap downward to restore heap order.'));
          index = smallest;
        }
      }
      this.steps.push(this.snapshot(heap, [], swaps, comparisons, `Extracted ${minimum}. Heap order restored.`));
      this.stepIndex = 0;
      this.render();
    }

    go(delta) {
      if (!this.steps.length) return;
      this.stop();
      this.stepIndex = Math.max(0, Math.min(this.steps.length - 1, this.stepIndex + delta));
      this.render();
    }

    togglePlay() {
      if (!this.steps.length) return;
      if (this.timer) return this.stop();
      if (this.stepIndex >= this.steps.length - 1) this.stepIndex = 0;
      this.root.querySelector('[data-action="play"]').textContent = 'Pause';
      this.timer = window.setInterval(() => {
        if (this.stepIndex >= this.steps.length - 1) return this.stop();
        this.stepIndex += 1;
        this.render();
      }, 950);
    }

    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }

    reset() {
      this.stop();
      this.heap = [3, 7, 5, 12, 9, 8];
      this.steps = [];
      this.stepIndex = 0;
      this.renderState({ heap: this.heap, active: [], swaps: 0, comparisons: 0, message: 'Ready. The minimum is at the root.' });
    }

    render() {
      this.renderState(this.steps[this.stepIndex]);
      this.root.querySelector('[data-role="step-title"]').textContent = `Step ${this.stepIndex + 1}`;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.stepIndex + 1}/${this.steps.length}`;
    }

    renderState(state) {
      const active = new Set(state.active);
      this.root.querySelector('[data-role="array"]').innerHTML = state.heap.map((value, index) => `<div class="heap-viz__cell ${active.has(index) ? 'is-active' : ''}"><small>${index}</small><strong>${value}</strong></div>`).join('');
      this.root.querySelector('[data-role="tree"]').innerHTML = state.heap.map((value, index) => `<div class="heap-viz__node ${active.has(index) ? 'is-active' : ''}" style="--i:${index}"><small>${index}</small><strong>${value}</strong></div>`).join('');
      this.root.querySelector('[data-role="message"]').textContent = state.message;
      this.root.querySelector('[data-role="minimum"]').textContent = state.heap[0] ?? '—';
      this.root.querySelector('[data-role="comparisons"]').textContent = state.comparisons;
      this.root.querySelector('[data-role="swaps"]').textContent = state.swaps;
      if (!this.steps.length) {
        this.root.querySelector('[data-role="step-title"]').textContent = 'Initial state';
        this.root.querySelector('[data-role="progress"]').textContent = '0/0';
      }
    }
  }

  function initialise() {
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path.endsWith('/08-heaps-and-priority-queues')) return;
    document.querySelectorAll('[data-heap-priority-viz]').forEach((root) => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new HeapVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
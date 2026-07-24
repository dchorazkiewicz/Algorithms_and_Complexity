(() => {
  const DEFAULT_VALUES = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];

  class BinarySearchVisualizer {
    constructor(root) {
      this.root = root;
      this.values = [...DEFAULT_VALUES];
      this.steps = [];
      this.step = 0;
      this.timer = null;
      this.renderShell();
      this.bind();
      this.prepare();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'binary-search-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Interactive interval elimination</p><h3>Binary search</h3></div>
          <span class="ds-viz__complexity">time O(log n) · space O(1)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Target<input data-role="target" type="number" value="16"></label>
          <button type="button" data-action="prepare">Prepare trace</button>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="binary-search-viz__scale" data-role="scale" aria-live="polite"></div>
        <div class="binary-search-viz__interval"><span data-role="left-label"></span><strong data-role="interval-label"></strong><span data-role="right-label"></span></div>
        <div class="binary-search-viz__discarded" data-role="discarded"></div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics">
          <span>left: <strong data-role="left"></strong></span>
          <span>middle: <strong data-role="middle"></strong></span>
          <span>right: <strong data-role="right"></strong></span>
          <span>comparisons: <strong data-role="comparisons"></strong></span>
          <span>remaining: <strong data-role="remaining"></strong></span>
          <span>step: <strong data-role="progress"></strong></span>
        </div>`;
    }

    bind() {
      this.targetInput = this.root.querySelector('[data-role="target"]');
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => {
        this.stop();
        this.targetInput.value = '16';
        this.prepare();
      });
    }

    snapshot(left, right, middle, comparisons, title, text, status, discarded = []) {
      return { left, right, middle, comparisons, title, text, status, discarded: [...discarded] };
    }

    prepare() {
      this.stop();
      const target = Number(this.targetInput.value);
      if (!Number.isFinite(target)) return;
      this.steps = [];
      let left = 0;
      let right = this.values.length;
      let comparisons = 0;
      const discarded = new Set();

      this.steps.push(this.snapshot(left, right, null, comparisons, 'Initial active interval', `Every index in [${left}, ${right}) may still contain ${target}.`, 'active', discarded));

      while (left < right) {
        const middle = Math.floor((left + right) / 2);
        comparisons += 1;
        this.steps.push(this.snapshot(left, right, middle, comparisons, 'Inspect the middle element', `values[${middle}] = ${this.values[middle]}. Compare it with target ${target}.`, 'compare', discarded));

        if (this.values[middle] === target) {
          this.steps.push(this.snapshot(left, right, middle, comparisons, 'Target found', `${target} equals values[${middle}]. Return index ${middle}.`, 'found', discarded));
          break;
        }

        if (this.values[middle] < target) {
          for (let i = left; i <= middle; i += 1) discarded.add(i);
          const oldLeft = left;
          left = middle + 1;
          this.steps.push(this.snapshot(left, right, null, comparisons, 'Discard the left region', `${this.values[middle]} < ${target}, so indices [${oldLeft}, ${middle + 1}) cannot contain the target.`, 'discard-left', discarded));
        } else {
          for (let i = middle; i < right; i += 1) discarded.add(i);
          const oldRight = right;
          right = middle;
          this.steps.push(this.snapshot(left, right, null, comparisons, 'Discard the right region', `${this.values[middle]} > ${target}, so indices [${middle}, ${oldRight}) cannot contain the target.`, 'discard-right', discarded));
        }
      }

      if (left === right && !this.steps.some(item => item.status === 'found')) {
        this.steps.push(this.snapshot(left, right, null, comparisons, 'Target absent', 'The active interval is empty. Every possible index has been eliminated.', 'missing', discarded));
      }
      this.step = 0;
      this.render();
    }

    go(delta) {
      this.stop();
      this.step = Math.max(0, Math.min(this.steps.length - 1, this.step + delta));
      this.render();
    }

    play() {
      if (this.timer) return this.stop();
      if (this.step >= this.steps.length - 1) this.step = 0;
      this.root.querySelector('[data-action="play"]').textContent = 'Pause';
      this.timer = window.setInterval(() => {
        if (this.step >= this.steps.length - 1) return this.stop();
        this.step += 1;
        this.render();
      }, 1100);
    }

    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }

    render() {
      const state = this.steps[this.step];
      const scale = this.root.querySelector('[data-role="scale"]');
      scale.innerHTML = this.values.map((value, index) => {
        const classes = ['binary-search-viz__cell'];
        if (state.discarded.includes(index)) classes.push('is-discarded');
        if (index >= state.left && index < state.right) classes.push('is-active');
        if (index === state.middle) classes.push('is-middle');
        if (state.status === 'found' && index === state.middle) classes.push('is-found');
        return `<div class="${classes.join(' ')}"><small>${index}</small><strong>${value}</strong>${index === state.middle ? '<span>mid</span>' : ''}</div>`;
      }).join('');

      const discardedText = state.discarded.length ? state.discarded.map(index => `${index}:${this.values[index]}`).join(' · ') : 'none';
      this.root.querySelector('[data-role="discarded"]').innerHTML = `<strong>Eliminated:</strong> ${discardedText}`;
      this.root.querySelector('[data-role="left-label"]').textContent = `left = ${state.left}`;
      this.root.querySelector('[data-role="right-label"]').textContent = `right = ${state.right}`;
      this.root.querySelector('[data-role="interval-label"]').textContent = `[${state.left}, ${state.right})`;
      this.root.querySelector('[data-role="title"]').textContent = state.title;
      this.root.querySelector('[data-role="text"]').textContent = state.text;
      this.root.querySelector('[data-role="left"]').textContent = state.left;
      this.root.querySelector('[data-role="middle"]').textContent = state.middle ?? '—';
      this.root.querySelector('[data-role="right"]').textContent = state.right;
      this.root.querySelector('[data-role="comparisons"]').textContent = state.comparisons;
      this.root.querySelector('[data-role="remaining"]').textContent = state.right - state.left;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.step + 1}/${this.steps.length}`;
    }
  }

  function initialise() {
    document.querySelectorAll('[data-binary-search-viz]').forEach(root => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new BinarySearchVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
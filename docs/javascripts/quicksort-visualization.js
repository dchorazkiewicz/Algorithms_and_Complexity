(() => {
  class QuickSortVisualizer {
    constructor(root) {
      this.root = root;
      this.initial = [7, 2, 9, 4, 5, 1, 8];
      this.steps = [];
      this.index = 0;
      this.timer = null;
      this.renderShell();
      this.bind();
      this.prepare();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'qs-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Interactive partition trace</p><h3>Quicksort with Lomuto partitioning</h3></div>
          <span class="ds-viz__complexity">average O(n log n) · worst O(n²)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Values<input data-role="values" value="7,2,9,4,5,1,8"></label>
          <button type="button" data-action="prepare">Prepare trace</button>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="qs-viz__stage">
          <div class="qs-viz__array" data-role="array"></div>
          <div class="qs-viz__regions" data-role="regions"></div>
          <div class="qs-viz__stack-wrap"><strong>Pending intervals</strong><div class="qs-viz__stack" data-role="stack"></div></div>
        </div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics">
          <span>Pivot: <strong data-role="pivot">—</strong></span>
          <span>Boundary: <strong data-role="boundary">—</strong></span>
          <span>Index: <strong data-role="scan">—</strong></span>
          <span>Comparisons: <strong data-role="comparisons">0</strong></span>
          <span>Swaps: <strong data-role="swaps">0</strong></span>
          <span>Step: <strong data-role="progress">0/0</strong></span>
        </div>`;
    }

    bind() {
      this.input = this.root.querySelector('[data-role="values"]');
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => {
        this.input.value = this.initial.join(',');
        this.prepare();
      });
    }

    snapshot(values, left, right, pivotIndex, boundary, scan, stack, title, text, comparisons, swaps, sorted = []) {
      return { values: [...values], left, right, pivotIndex, boundary, scan, stack: stack.map(x => [...x]), title, text, comparisons, swaps, sorted: [...sorted] };
    }

    prepare() {
      this.stop();
      const values = this.input.value.split(',').map(x => Number(x.trim()));
      if (!values.length || values.length > 12 || values.some(x => !Number.isFinite(x))) {
        return this.showError('Enter 1–12 comma-separated numeric values.');
      }
      this.steps = [];
      let comparisons = 0;
      let swaps = 0;
      const stack = [[0, values.length]];
      const sorted = new Set();
      this.steps.push(this.snapshot(values, 0, values.length, null, null, null, stack, 'Trace prepared', 'Quicksort will repeatedly partition pending intervals.', comparisons, swaps));

      while (stack.length) {
        const [left, right] = stack.pop();
        if (right - left <= 1) {
          if (right - left === 1) sorted.add(left);
          this.steps.push(this.snapshot(values, left, right, null, null, null, stack, 'Base interval', `[${left}, ${right}) has length at most one and is already sorted.`, comparisons, swaps, sorted));
          continue;
        }
        const pivotValue = values[right - 1];
        let boundary = left;
        this.steps.push(this.snapshot(values, left, right, right - 1, boundary, null, stack, 'Choose pivot', `Use ${pivotValue} at index ${right - 1} as the pivot.`, comparisons, swaps, sorted));
        for (let scan = left; scan < right - 1; scan += 1) {
          comparisons += 1;
          this.steps.push(this.snapshot(values, left, right, right - 1, boundary, scan, stack, 'Compare with pivot', `${values[scan]} ${values[scan] <= pivotValue ? '≤' : '>'} ${pivotValue}.`, comparisons, swaps, sorted));
          if (values[scan] <= pivotValue) {
            if (scan !== boundary) {
              [values[boundary], values[scan]] = [values[scan], values[boundary]];
              swaps += 1;
            }
            boundary += 1;
            this.steps.push(this.snapshot(values, left, right, right - 1, boundary, scan, stack, 'Extend the ≤ pivot region', 'The boundary advances after placing the current value in the left region.', comparisons, swaps, sorted));
          }
        }
        if (boundary !== right - 1) {
          [values[boundary], values[right - 1]] = [values[right - 1], values[boundary]];
          swaps += 1;
        }
        sorted.add(boundary);
        this.steps.push(this.snapshot(values, left, right, boundary, boundary, null, stack, 'Place pivot', `Pivot ${values[boundary]} reaches its final index ${boundary}.`, comparisons, swaps, sorted));
        if (boundary + 1 < right) stack.push([boundary + 1, right]);
        if (left < boundary) stack.push([left, boundary]);
        this.steps.push(this.snapshot(values, left, right, boundary, boundary, null, stack, 'Create subproblems', 'The pivot is excluded; the left and right intervals are scheduled separately.', comparisons, swaps, sorted));
      }
      for (let i = 0; i < values.length; i += 1) sorted.add(i);
      this.steps.push(this.snapshot(values, 0, values.length, null, null, null, [], 'Sorting complete', `Sorted result: ${values.join(', ')}.`, comparisons, swaps, sorted));
      this.index = 0;
      this.render();
    }

    showError(message) {
      this.steps = [this.snapshot(this.initial, 0, this.initial.length, null, null, null, [], 'Invalid input', message, 0, 0)];
      this.index = 0;
      this.render(true);
    }

    go(delta) {
      this.stop();
      this.index = Math.max(0, Math.min(this.steps.length - 1, this.index + delta));
      this.render();
    }

    play() {
      if (this.timer) return this.stop();
      if (this.index >= this.steps.length - 1) this.index = 0;
      this.root.querySelector('[data-action="play"]').textContent = 'Pause';
      this.timer = window.setInterval(() => {
        if (this.index >= this.steps.length - 1) return this.stop();
        this.index += 1;
        this.render();
      }, 850);
    }

    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }

    render(isError = false) {
      const state = this.steps[this.index];
      this.root.querySelector('[data-role="array"]').innerHTML = state.values.map((value, i) => {
        const classes = ['qs-viz__cell'];
        if (i < state.left || i >= state.right) classes.push('is-outside');
        if (i === state.pivotIndex) classes.push('is-pivot');
        if (i === state.scan) classes.push('is-scan');
        if (state.sorted.includes(i)) classes.push('is-sorted');
        return `<div class="${classes.join(' ')}"><small>${i}</small><strong>${value}</strong></div>`;
      }).join('');
      const leftCount = state.boundary == null ? 0 : Math.max(0, state.boundary - state.left);
      const processedGreater = state.scan == null || state.boundary == null ? 0 : Math.max(0, state.scan - state.boundary + 1);
      this.root.querySelector('[data-role="regions"]').innerHTML = `<span>≤ pivot: ${leftCount}</span><span>&gt; pivot processed: ${processedGreater}</span><span>active: [${state.left}, ${state.right})</span>`;
      this.root.querySelector('[data-role="stack"]').innerHTML = state.stack.length ? state.stack.map(([l, r]) => `<span>[${l}, ${r})</span>`).join('') : '<em>empty</em>';
      this.root.querySelector('[data-role="title"]').textContent = state.title;
      const text = this.root.querySelector('[data-role="text"]');
      text.textContent = state.text;
      text.classList.toggle('is-error', isError);
      this.root.querySelector('[data-role="pivot"]').textContent = state.pivotIndex == null ? '—' : `${state.values[state.pivotIndex]} @ ${state.pivotIndex}`;
      this.root.querySelector('[data-role="boundary"]').textContent = state.boundary ?? '—';
      this.root.querySelector('[data-role="scan"]').textContent = state.scan ?? '—';
      this.root.querySelector('[data-role="comparisons"]').textContent = state.comparisons;
      this.root.querySelector('[data-role="swaps"]').textContent = state.swaps;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.index + 1}/${this.steps.length}`;
    }
  }

  function initialise() {
    document.querySelectorAll('[data-quicksort-viz]').forEach(root => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new QuickSortVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
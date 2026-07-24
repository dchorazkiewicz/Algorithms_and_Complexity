(() => {
  const DEFAULT_VALUES = [10, 20, 30, 40, null];

  class ArrayShiftVisualizer {
    constructor(root) {
      this.root = root;
      this.initialValues = (root.dataset.values || '10,20,30,40,_').split(',').map(item => item.trim() === '_' ? null : Number(item));
      this.values = [...this.initialValues];
      this.length = this.values.filter(value => value !== null).length;
      this.steps = [];
      this.stepIndex = 0;
      this.timer = null;
      this.renderShell();
      this.bindEvents();
      this.render();
    }

    renderShell() {
      this.root.classList.add('ds-viz');
      this.root.innerHTML = `<div class="ds-viz__header"><div><p class="ds-viz__eyebrow">Interactive trace</p><h3>Array insertion and deletion</h3></div><span class="ds-viz__complexity">Cost: —</span></div><div class="ds-viz__controls"><label>Operation<select data-role="operation"><option value="insert">Insert</option><option value="delete">Delete</option></select></label><label>Index<input data-role="index" type="number" min="0" value="2"></label><label data-role="value-label">Value<input data-role="value" type="number" value="25"></label><button type="button" data-action="prepare">Prepare trace</button><button type="button" data-action="previous">Previous</button><button type="button" data-action="next">Next</button><button type="button" data-action="play">Play</button><button type="button" data-action="reset">Reset</button></div><div class="ds-viz__stage" data-role="stage"></div><div class="ds-viz__status"><strong data-role="step-label">Initial state</strong><span data-role="explanation">Choose an operation and prepare a trace.</span></div><div class="ds-viz__metrics"><span>Logical length: <strong data-role="length"></strong></span><span>Moves: <strong data-role="moves">0</strong></span><span>Step: <strong data-role="progress">0/0</strong></span></div>`;
    }

    bindEvents() {
      this.operation = this.root.querySelector('[data-role="operation"]');
      this.indexInput = this.root.querySelector('[data-role="index"]');
      this.valueInput = this.root.querySelector('[data-role="value"]');
      this.valueLabel = this.root.querySelector('[data-role="value-label"]');
      this.operation.addEventListener('change', () => { this.valueLabel.hidden = this.operation.value === 'delete'; });
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.togglePlay());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
    }

    snapshot(values, active, source, target, explanation, moves, length) { return { values: [...values], active, source, target, explanation, moves, length }; }

    prepare() {
      this.stop();
      this.values = [...this.initialValues];
      this.length = this.values.filter(value => value !== null).length;
      const index = Number(this.indexInput.value);
      this.steps = [];
      if (!Number.isInteger(index)) return this.showError('Index must be an integer.');
      if (this.operation.value === 'insert') this.prepareInsertion(index, Number(this.valueInput.value)); else this.prepareDeletion(index);
      this.stepIndex = 0;
      this.render();
    }

    prepareInsertion(index, value) {
      if (index < 0 || index > this.length) return this.showError(`Insertion index must be between 0 and ${this.length}.`);
      if (this.length >= this.values.length) return this.showError('The array has no free capacity.');
      const work = [...this.values]; let moves = 0;
      this.steps.push(this.snapshot(work, null, null, null, `Insert ${value} at index ${index}. Shift occupied cells from right to left.`, moves, this.length));
      for (let source = this.length - 1; source >= index; source -= 1) { const target = source + 1; work[target] = work[source]; moves += 1; this.steps.push(this.snapshot(work, target, source, target, `Move ${work[target]} from index ${source} to ${target}.`, moves, this.length)); }
      work[index] = value;
      this.steps.push(this.snapshot(work, index, null, index, `Write ${value} at index ${index}. The insertion is complete.`, moves, this.length + 1));
    }

    prepareDeletion(index) {
      if (index < 0 || index >= this.length) return this.showError(`Deletion index must be between 0 and ${this.length - 1}.`);
      const work = [...this.values]; let moves = 0;
      this.steps.push(this.snapshot(work, index, index, null, `Delete the value at index ${index}. Shift later cells left.`, moves, this.length));
      for (let source = index + 1; source < this.length; source += 1) { const target = source - 1; work[target] = work[source]; moves += 1; this.steps.push(this.snapshot(work, target, source, target, `Move ${work[target]} from index ${source} to ${target}.`, moves, this.length)); }
      work[this.length - 1] = null;
      this.steps.push(this.snapshot(work, this.length - 1, null, this.length - 1, 'Clear the final logical cell. The deletion is complete.', moves, this.length - 1));
    }

    showError(message) { this.steps = [this.snapshot(this.values, null, null, null, message, 0, this.length)]; this.stepIndex = 0; this.render(true); }
    go(delta) { if (!this.steps.length) this.prepare(); this.stop(); this.stepIndex = Math.max(0, Math.min(this.steps.length - 1, this.stepIndex + delta)); this.render(); }
    togglePlay() { if (!this.steps.length) this.prepare(); if (this.timer) return this.stop(); this.root.querySelector('[data-action="play"]').textContent = 'Pause'; this.timer = setInterval(() => { if (this.stepIndex >= this.steps.length - 1) return this.stop(); this.stepIndex += 1; this.render(); }, 900); }
    stop() { if (this.timer) clearInterval(this.timer); this.timer = null; const button = this.root.querySelector('[data-action="play"]'); if (button) button.textContent = 'Play'; }
    reset() { this.stop(); this.values = [...this.initialValues]; this.length = this.values.filter(value => value !== null).length; this.steps = []; this.stepIndex = 0; this.render(); }

    render(isError = false) {
      const state = this.steps[this.stepIndex] || this.snapshot(this.values, null, null, null, 'Choose an operation and prepare a trace.', 0, this.length);
      this.root.querySelector('[data-role="stage"]').innerHTML = state.values.map((value, index) => `<div class="ds-viz__cell ${index === state.active ? 'is-active' : ''} ${index === state.source ? 'is-source' : ''} ${index === state.target ? 'is-target' : ''}"><span class="ds-viz__index">${index}</span><span class="ds-viz__value">${value === null ? '∅' : value}</span></div>`).join('');
      this.root.querySelector('[data-role="step-label"]').textContent = this.steps.length ? `Step ${this.stepIndex + 1}` : 'Initial state';
      const explanation = this.root.querySelector('[data-role="explanation"]'); explanation.textContent = state.explanation; explanation.classList.toggle('is-error', isError);
      this.root.querySelector('[data-role="length"]').textContent = state.length;
      this.root.querySelector('[data-role="moves"]').textContent = state.moves;
      this.root.querySelector('[data-role="progress"]').textContent = this.steps.length ? `${this.stepIndex + 1}/${this.steps.length}` : '0/0';
      this.root.querySelector('.ds-viz__complexity').textContent = this.steps.length ? `Cost: ${state.moves === 0 ? 'O(1) so far' : `O(${state.moves}) moves, O(n) worst case`}` : 'Cost: —';
    }
  }

  function siteRoot() {
    const marker = '/Algorithms_and_Complexity/';
    const path = window.location.pathname;
    return path.includes(marker) ? `${window.location.origin}${marker.slice(0, -1)}` : window.location.origin;
  }

  function loadAsset(kind, path, marker) {
    if (document.querySelector(`[data-loader="${marker}"]`)) return;
    const element = document.createElement(kind === 'css' ? 'link' : 'script');
    element.dataset.loader = marker;
    if (kind === 'css') { element.rel = 'stylesheet'; element.href = `${siteRoot()}/${path}`; document.head.appendChild(element); }
    else { element.src = `${siteRoot()}/${path}`; document.head.appendChild(element); }
  }

  function mountArrayShift() {
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path.endsWith('/04-insertion-deletion-and-shifting') || document.querySelector('[data-array-shift-viz]')) return;
    const heading = [...document.querySelectorAll('.md-content h2')].find(node => node.textContent.includes('Insertion into a fixed-capacity array'));
    if (!heading) return;
    const root = document.createElement('div'); root.dataset.arrayShiftViz = ''; root.dataset.values = '10,20,30,40,_'; heading.parentNode.insertBefore(root, heading);
  }

  function mountArrayAccess() {
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path.endsWith('/01-arrays-as-indexed-structures')) return;
    loadAsset('css', 'stylesheets/array-access-traversal-visualization.css', 'array-access-css');
    if (!document.querySelector('[data-array-access-viz]')) {
      const heading = [...document.querySelectorAll('.md-content h2')].find(node => node.textContent.includes('Direct access'));
      if (heading) { const root = document.createElement('div'); root.dataset.arrayAccessViz = ''; heading.parentNode.insertBefore(root, heading); }
    }
    loadAsset('js', 'javascripts/array-access-traversal-visualization.js', 'array-access-js');
  }

  function initialise() {
    mountArrayShift();
    mountArrayAccess();
    document.querySelectorAll('[data-array-shift-viz]').forEach(root => { if (!root.dataset.initialised) { root.dataset.initialised = 'true'; new ArrayShiftVisualizer(root); } });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise); else document.addEventListener('DOMContentLoaded', initialise);
})();
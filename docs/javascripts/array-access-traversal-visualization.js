(() => {
  const VALUES = [17, 21, 19, 24, 22, 16, 28, 20];

  function buildTrace(mode, index, target) {
    const trace = [];
    const push = (state) => trace.push({ values: [...VALUES], reads: 0, writes: 0, visited: [], active: null, result: '—', discarded: [], ...state });

    if (mode === 'access') {
      push({ text: `The index ${index} is already known. Compute the address directly; no earlier component must be inspected.` });
      push({ active: index, reads: 1, visited: [index], result: VALUES[index], text: `Read A[${index}] = ${VALUES[index]}. Exactly one component is accessed.` });
      return trace;
    }

    if (mode === 'update') {
      push({ text: `Update A[${index}] without changing the array length or the position of any other component.` });
      const updated = [...VALUES];
      updated[index] = 99;
      trace.push({ values: updated, active: index, visited: [index], writes: 1, reads: 0, result: 'A[' + index + '] = 99', discarded: [], text: `Write 99 at index ${index}. The operation changes one component in O(1).` });
      return trace;
    }

    if (mode === 'search') {
      push({ text: `The target value ${target} is known, but its position is not. Scan from left to right.` });
      for (let i = 0; i < VALUES.length; i += 1) {
        const found = VALUES[i] === target;
        push({ active: i, visited: Array.from({ length: i + 1 }, (_, k) => k), reads: i + 1, result: found ? `index ${i}` : 'not yet', text: found ? `A[${i}] = ${target}. Search stops after ${i + 1} reads.` : `A[${i}] = ${VALUES[i]} ≠ ${target}. Continue.` });
        if (found) return trace;
      }
      push({ visited: VALUES.map((_, i) => i), reads: VALUES.length, result: 'not found', text: `Every component was inspected. The target is absent.` });
      return trace;
    }

    push({ text: 'A full traversal must process every component, even though each individual access is O(1).' });
    let sum = 0;
    for (let i = 0; i < VALUES.length; i += 1) {
      sum += VALUES[i];
      push({ active: i, visited: Array.from({ length: i + 1 }, (_, k) => k), reads: i + 1, result: sum, text: `Read A[${i}] = ${VALUES[i]}; running total becomes ${sum}.` });
    }
    push({ visited: VALUES.map((_, i) => i), reads: VALUES.length, result: sum, text: `Traversal complete. ${VALUES.length} components were read, so the cost is O(n).` });
    return trace;
  }

  class ArrayAccessVisualizer {
    constructor(root) {
      this.root = root;
      this.mode = 'access';
      this.step = 0;
      this.timer = null;
      this.renderShell();
      this.bind();
      this.prepare();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'array-access-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header"><div><p class="ds-viz__eyebrow">Cost model in motion</p><h3>Array access versus traversal</h3></div><span class="ds-viz__complexity">known index O(1) · full scan O(n)</span></div>
        <div class="ds-viz__controls">
          <label>Operation<select data-role="mode"><option value="access">Direct access</option><option value="update">Direct update</option><option value="search">Search by value</option><option value="traverse">Full traversal</option></select></label>
          <label>Index<input data-role="index" type="number" min="0" max="7" value="5"></label>
          <label>Target<input data-role="target" type="number" value="24"></label>
          <button type="button" data-action="prepare">Prepare trace</button><button type="button" data-action="previous">Previous</button><button type="button" data-action="next">Next</button><button type="button" data-action="play">Play</button><button type="button" data-action="reset">Reset</button>
        </div>
        <div class="array-access-viz__memory"><div class="array-access-viz__address" data-role="formula"></div><div class="array-access-viz__cells" data-role="cells"></div></div>
        <div class="array-access-viz__cost"><div><strong data-role="cost-title"></strong><span data-role="cost-detail"></span></div><div class="array-access-viz__meter"><span data-role="meter"></span></div></div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics"><span>Reads: <strong data-role="reads"></strong></span><span>Writes: <strong data-role="writes"></strong></span><span>Result: <strong data-role="result"></strong></span><span>Step: <strong data-role="progress"></strong></span></div>`;
    }

    bind() {
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => { this.stop(); this.step = 0; this.render(); });
      this.root.querySelector('[data-role="mode"]').addEventListener('change', () => this.prepare());
    }

    prepare() {
      this.stop();
      this.mode = this.root.querySelector('[data-role="mode"]').value;
      const index = Math.max(0, Math.min(7, Number(this.root.querySelector('[data-role="index"]').value) || 0));
      const target = Number(this.root.querySelector('[data-role="target"]').value);
      this.trace = buildTrace(this.mode, index, target);
      this.step = 0;
      this.render();
    }

    go(delta) { this.stop(); this.step = Math.max(0, Math.min(this.trace.length - 1, this.step + delta)); this.render(); }
    play() { if (this.timer) return this.stop(); if (this.step >= this.trace.length - 1) this.step = 0; this.root.querySelector('[data-action="play"]').textContent = 'Pause'; this.render(); this.timer = setInterval(() => { if (this.step >= this.trace.length - 1) return this.stop(); this.step += 1; this.render(); }, 850); }
    stop() { if (this.timer) clearInterval(this.timer); this.timer = null; const button = this.root.querySelector('[data-action="play"]'); if (button) button.textContent = 'Play'; }

    render() {
      const state = this.trace[this.step];
      this.root.querySelector('[data-role="cells"]').innerHTML = state.values.map((value, index) => `<div class="array-access-viz__cell ${state.active === index ? 'is-active' : ''} ${state.visited.includes(index) ? 'is-visited' : ''}"><small>${index}</small><strong>${value}</strong><span>addr + ${index}w</span></div>`).join('');
      const direct = this.mode === 'access' || this.mode === 'update';
      this.root.querySelector('[data-role="formula"]').textContent = direct ? 'address(A[i]) = base + i × element_width' : 'unknown position → inspect candidates sequentially';
      this.root.querySelector('[data-role="cost-title"]').textContent = direct ? 'Constant work' : 'Work grows with n';
      this.root.querySelector('[data-role="cost-detail"]').textContent = direct ? 'One indexed component is touched.' : `${state.reads} of ${state.values.length} components read.`;
      this.root.querySelector('[data-role="meter"]').style.width = `${direct ? 14 : Math.max(4, (state.reads / state.values.length) * 100)}%`;
      this.root.querySelector('[data-role="title"]').textContent = ({ access: 'Direct access', update: 'Direct update', search: 'Search by value', traverse: 'Full traversal' })[this.mode];
      this.root.querySelector('[data-role="text"]').textContent = state.text;
      this.root.querySelector('[data-role="reads"]').textContent = state.reads;
      this.root.querySelector('[data-role="writes"]').textContent = state.writes;
      this.root.querySelector('[data-role="result"]').textContent = state.result;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.step + 1}/${this.trace.length}`;
    }
  }

  function initialise() { document.querySelectorAll('[data-array-access-viz]').forEach(root => { if (root.dataset.initialised) return; root.dataset.initialised = 'true'; new ArrayAccessVisualizer(root); }); }
  if (typeof document$ !== 'undefined') document$.subscribe(initialise); else document.addEventListener('DOMContentLoaded', initialise);
})();
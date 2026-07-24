(() => {
  class RecursiveCallStackVisualizer {
    constructor(root) {
      this.root = root;
      this.steps = [];
      this.stepIndex = 0;
      this.timer = null;
      this.renderShell();
      this.bindEvents();
      this.prepare();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'recursion-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div>
            <p class="ds-viz__eyebrow">Interactive trace</p>
            <h3>Recursive call stack: factorial</h3>
          </div>
          <span class="ds-viz__complexity" data-role="complexity">Time O(n) · stack O(n)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Input n
            <input data-role="input" type="number" min="0" max="8" value="4">
          </label>
          <button type="button" data-action="prepare">Prepare trace</button>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="recursion-viz__layout">
          <section>
            <p class="recursion-viz__label">Call stack <span>top</span></p>
            <div class="recursion-viz__stack" data-role="stack" aria-live="polite"></div>
          </section>
          <section>
            <p class="recursion-viz__label">Execution model</p>
            <div class="recursion-viz__code" data-role="code">
              <div data-line="1"><span>1</span><code>def factorial(n):</code></div>
              <div data-line="2"><span>2</span><code>    if n == 0:</code></div>
              <div data-line="3"><span>3</span><code>        return 1</code></div>
              <div data-line="4"><span>4</span><code>    return n * factorial(n - 1)</code></div>
            </div>
            <div class="recursion-viz__return" data-role="return-value">Return value: —</div>
          </section>
        </div>
        <div class="ds-viz__status">
          <strong data-role="phase">Initial state</strong>
          <span data-role="explanation">The stack is empty before the first function call.</span>
        </div>
        <div class="ds-viz__metrics">
          <span>Phase: <strong data-role="phase-metric">ready</strong></span>
          <span>Stack depth: <strong data-role="depth">0</strong></span>
          <span>Multiplications: <strong data-role="operations">0</strong></span>
          <span>Step: <strong data-role="progress">0/0</strong></span>
        </div>`;
    }

    bindEvents() {
      this.input = this.root.querySelector('[data-role="input"]');
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.togglePlay());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
    }

    snapshot(frames, phase, line, explanation, returnValue, operations) {
      return { frames: frames.map((frame) => ({ ...frame })), phase, line, explanation, returnValue, operations };
    }

    prepare() {
      this.stop();
      const n = Number(this.input.value);
      if (!Number.isInteger(n) || n < 0 || n > 8) {
        this.steps = [this.snapshot([], 'error', null, 'Choose an integer from 0 to 8.', null, 0)];
        this.stepIndex = 0;
        this.render(true);
        return;
      }
      const frames = [];
      this.steps = [this.snapshot(frames, 'start', 1, `Call factorial(${n}).`, null, 0)];
      for (let value = n; value >= 0; value -= 1) {
        frames.push({ n: value, pending: value === 0 ? 'base case' : `wait: ${value} × factorial(${value - 1})`, state: 'active' });
        this.steps.push(this.snapshot(frames, 'expansion', value === 0 ? 2 : 4,
          value === 0 ? 'The base case has been reached. No smaller call is needed.' : `Push a frame for n = ${value}. Multiplication by ${value} is suspended until the recursive call returns.`,
          null, 0));
        frames[frames.length - 1].state = 'waiting';
      }
      let result = 1;
      let operations = 0;
      frames[frames.length - 1].state = 'returning';
      this.steps.push(this.snapshot(frames, 'base case', 3, 'factorial(0) returns 1. Unwinding can begin.', result, operations));
      frames.pop();
      for (let value = 1; value <= n; value += 1) {
        if (frames.length) frames[frames.length - 1].state = 'returning';
        const previous = result;
        result *= value;
        operations += 1;
        this.steps.push(this.snapshot(frames, 'unwinding', 4, `Resume the frame for n = ${value}: ${value} × ${previous} = ${result}. Then pop that frame.`, result, operations));
        frames.pop();
      }
      this.steps.push(this.snapshot([], 'complete', 4, `The original call returns ${result}. The stack is empty again.`, result, operations));
      this.stepIndex = 0;
      this.render();
    }

    go(delta) { this.stop(); this.stepIndex = Math.max(0, Math.min(this.steps.length - 1, this.stepIndex + delta)); this.render(); }
    togglePlay() {
      if (this.timer) return this.stop();
      if (this.stepIndex >= this.steps.length - 1) this.stepIndex = 0;
      this.root.querySelector('[data-action="play"]').textContent = 'Pause';
      this.timer = window.setInterval(() => {
        if (this.stepIndex >= this.steps.length - 1) return this.stop();
        this.stepIndex += 1;
        this.render();
      }, 1050);
    }
    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }
    reset() { this.stop(); this.input.value = '4'; this.prepare(); }

    render(isError = false) {
      const state = this.steps[this.stepIndex];
      const stack = this.root.querySelector('[data-role="stack"]');
      stack.innerHTML = state.frames.length
        ? [...state.frames].reverse().map((frame, reverseIndex) => {
            const actualIndex = state.frames.length - reverseIndex - 1;
            const classes = ['recursion-viz__frame', `is-${frame.state}`];
            return `<article class="${classes.join(' ')}"><div><strong>factorial(${frame.n})</strong><small>${actualIndex === state.frames.length - 1 ? 'top frame' : 'suspended frame'}</small></div><code>n = ${frame.n}</code><span>${frame.pending}</span></article>`;
          }).join('')
        : '<div class="recursion-viz__empty">empty stack</div>';
      this.root.querySelectorAll('[data-line]').forEach((line) => line.classList.toggle('is-current', Number(line.dataset.line) === state.line));
      this.root.querySelector('[data-role="phase"]').textContent = this.labelForPhase(state.phase);
      const explanation = this.root.querySelector('[data-role="explanation"]');
      explanation.textContent = state.explanation;
      explanation.classList.toggle('is-error', isError);
      this.root.querySelector('[data-role="return-value"]').textContent = `Return value: ${state.returnValue === null ? '—' : state.returnValue}`;
      this.root.querySelector('[data-role="phase-metric"]').textContent = state.phase;
      this.root.querySelector('[data-role="depth"]').textContent = state.frames.length;
      this.root.querySelector('[data-role="operations"]').textContent = state.operations;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.stepIndex + 1}/${this.steps.length}`;
    }

    labelForPhase(phase) {
      return ({ start: 'Initial call', expansion: 'Expansion: push a frame', 'base case': 'Base case', unwinding: 'Unwinding: resume and pop', complete: 'Completed', error: 'Invalid input' })[phase] || phase;
    }
  }

  function mountDemo() {
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path.endsWith('/04-anatomy-of-a-recursive-call')) return;
    if (document.querySelector('[data-recursive-stack-viz]')) return;
    const heading = [...document.querySelectorAll('.md-content h2')].find((node) => node.textContent.includes('Expansion and unwinding'));
    if (!heading) return;
    const root = document.createElement('div');
    root.dataset.recursiveStackViz = '';
    heading.parentNode.insertBefore(root, heading.nextSibling);
  }

  function initialise() {
    mountDemo();
    document.querySelectorAll('[data-recursive-stack-viz]').forEach((root) => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new RecursiveCallStackVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
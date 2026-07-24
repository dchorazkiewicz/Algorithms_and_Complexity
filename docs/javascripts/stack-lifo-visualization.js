(() => {
  class StackVisualizer {
    constructor(root) {
      this.root = root;
      this.items = [12, 7, 25];
      this.history = [];
      this.renderShell();
      this.bind();
      this.render('Initial stack. The most recently pushed item is at the top.');
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'stack-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Interactive structure</p><h3>Stack operations: LIFO</h3></div>
          <span class="ds-viz__complexity">push/pop/top: amortised O(1)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Value<input data-role="value" type="number" value="42"></label>
          <button type="button" data-action="push">Push</button>
          <button type="button" data-action="pop">Pop</button>
          <button type="button" data-action="peek">Peek</button>
          <button type="button" data-action="undo">Undo</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="stack-viz__layout">
          <section>
            <div class="stack-viz__top-label">TOP ↓</div>
            <div class="stack-viz__stack" data-role="stack" aria-live="polite"></div>
            <div class="stack-viz__base">stack base</div>
          </section>
          <section class="stack-viz__model">
            <h4>Operation model</h4>
            <div class="stack-viz__rule">Last In <strong>→</strong> First Out</div>
            <div class="stack-viz__code" data-role="code">stack = [12, 7, 25]</div>
            <div class="stack-viz__result" data-role="result">Returned value: —</div>
          </section>
        </div>
        <div class="ds-viz__status"><strong data-role="title">Ready</strong><span data-role="explanation"></span></div>
        <div class="ds-viz__metrics">
          <span>Size: <strong data-role="size">3</strong></span>
          <span>Top index: <strong data-role="top-index">2</strong></span>
          <span>Last operation: <strong data-role="operation">none</strong></span>
        </div>`;
    }

    bind() {
      this.value = this.root.querySelector('[data-role="value"]');
      this.root.querySelector('[data-action="push"]').addEventListener('click', () => this.push());
      this.root.querySelector('[data-action="pop"]').addEventListener('click', () => this.pop());
      this.root.querySelector('[data-action="peek"]').addEventListener('click', () => this.peek());
      this.root.querySelector('[data-action="undo"]').addEventListener('click', () => this.undo());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
    }

    remember() { this.history.push([...this.items]); }

    push() {
      const value = Number(this.value.value);
      if (!Number.isFinite(value)) return this.render('Enter a numeric value.', 'Invalid input', 'error');
      this.remember();
      this.items.push(value);
      this.render(`Push ${value}: append it above the previous top.`, 'Push', 'push', value);
    }

    pop() {
      if (!this.items.length) return this.render('Underflow: pop requires a non-empty stack.', 'Stack underflow', 'error');
      this.remember();
      const value = this.items.pop();
      this.render(`Pop removes ${value}, the most recently pushed item.`, 'Pop', 'pop', value);
    }

    peek() {
      if (!this.items.length) return this.render('Peek requires a non-empty stack.', 'Stack underflow', 'error');
      const value = this.items[this.items.length - 1];
      this.render(`Peek reads ${value} without changing the stack.`, 'Peek', 'peek', value);
    }

    undo() {
      if (!this.history.length) return this.render('There is no earlier state to restore.', 'Undo unavailable', 'error');
      this.items = this.history.pop();
      this.render('Restored the previous stack state.', 'Undo', 'undo');
    }

    reset() {
      this.items = [12, 7, 25];
      this.history = [];
      this.render('Reset to the initial stack.', 'Reset', 'reset');
    }

    render(explanation, title = 'Ready', operation = 'none', returned = null) {
      const stack = this.root.querySelector('[data-role="stack"]');
      stack.innerHTML = this.items.length
        ? [...this.items].reverse().map((value, i) => `<div class="stack-viz__item ${i === 0 ? 'is-top' : ''}"><span>${value}</span>${i === 0 ? '<small>top</small>' : ''}</div>`).join('')
        : '<div class="stack-viz__empty">empty stack</div>';
      this.root.querySelector('[data-role="title"]').textContent = title;
      const text = this.root.querySelector('[data-role="explanation"]');
      text.textContent = explanation;
      text.classList.toggle('is-error', operation === 'error');
      this.root.querySelector('[data-role="size"]').textContent = this.items.length;
      this.root.querySelector('[data-role="top-index"]').textContent = this.items.length ? this.items.length - 1 : '—';
      this.root.querySelector('[data-role="operation"]').textContent = operation;
      this.root.querySelector('[data-role="code"]').textContent = `stack = [${this.items.join(', ')}]`;
      this.root.querySelector('[data-role="result"]').textContent = `Returned value: ${returned === null ? '—' : returned}`;
    }
  }

  function mount() {
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path.endsWith('/04-stacks') || document.querySelector('[data-stack-viz]')) return;
    const heading = [...document.querySelectorAll('.md-content h2')].find((node) => node.textContent.includes('Representation invariant'));
    if (!heading) return;
    const root = document.createElement('div');
    root.dataset.stackViz = '';
    heading.parentNode.insertBefore(root, heading);
  }

  function initialise() {
    mount();
    document.querySelectorAll('[data-stack-viz]').forEach((root) => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new StackVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
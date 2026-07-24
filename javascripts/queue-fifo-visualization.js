(() => {
  class QueueVisualizer {
    constructor(root) {
      this.root = root;
      this.capacity = 7;
      this.items = ['A', 'B', 'C'];
      this.history = [];
      this.lastReturned = null;
      this.lastOperation = 'ready';
      this.renderShell();
      this.bindEvents();
      this.render();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'queue-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Interactive structure</p><h3>FIFO queue</h3></div>
          <span class="ds-viz__complexity">enqueue O(1) · dequeue O(1)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Value<input data-role="value" maxlength="8" value="D"></label>
          <button type="button" data-action="enqueue">Enqueue</button>
          <button type="button" data-action="dequeue">Dequeue</button>
          <button type="button" data-action="peek">Front</button>
          <button type="button" data-action="undo">Undo</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="queue-viz__flow">
          <div class="queue-viz__gate queue-viz__gate--front"><strong>FRONT</strong><span>dequeue →</span></div>
          <div class="queue-viz__track" data-role="track" aria-live="polite"></div>
          <div class="queue-viz__gate queue-viz__gate--rear"><strong>REAR</strong><span>← enqueue</span></div>
        </div>
        <div class="queue-viz__array" data-role="array"></div>
        <div class="ds-viz__status"><strong data-role="status-title">Queue ready</strong><span data-role="status-text">The oldest element is at the front; new elements enter at the rear.</span></div>
        <div class="ds-viz__metrics">
          <span>Size: <strong data-role="size">0</strong></span>
          <span>Front: <strong data-role="front">—</strong></span>
          <span>Rear: <strong data-role="rear">—</strong></span>
          <span>Returned: <strong data-role="returned">—</strong></span>
          <span>Last operation: <strong data-role="operation">ready</strong></span>
        </div>`;
    }

    bindEvents() {
      this.valueInput = this.root.querySelector('[data-role="value"]');
      this.root.querySelector('[data-action="enqueue"]').addEventListener('click', () => this.enqueue());
      this.root.querySelector('[data-action="dequeue"]').addEventListener('click', () => this.dequeue());
      this.root.querySelector('[data-action="peek"]').addEventListener('click', () => this.peek());
      this.root.querySelector('[data-action="undo"]').addEventListener('click', () => this.undo());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
    }

    saveState() {
      this.history.push({ items: [...this.items], returned: this.lastReturned, operation: this.lastOperation });
    }

    enqueue() {
      const value = this.valueInput.value.trim();
      if (!value) return this.setStatus('Invalid value', 'Enter a non-empty value before enqueuing.', true);
      if (this.items.length >= this.capacity) return this.setStatus('Queue overflow', `This demonstration queue has capacity ${this.capacity}.`, true);
      this.saveState();
      this.items.push(value);
      this.lastReturned = null;
      this.lastOperation = `enqueue(${value})`;
      this.setStatus('Enqueue at rear', `${value} entered after every element already waiting.`, false);
      this.render();
    }

    dequeue() {
      if (!this.items.length) return this.setStatus('Queue underflow', 'dequeue() requires a non-empty queue.', true);
      this.saveState();
      const value = this.items.shift();
      this.lastReturned = value;
      this.lastOperation = 'dequeue()';
      this.setStatus('Dequeue from front', `${value} left first because it had waited longest.`, false);
      this.render();
    }

    peek() {
      if (!this.items.length) return this.setStatus('Queue underflow', 'front() requires a non-empty queue.', true);
      this.lastReturned = this.items[0];
      this.lastOperation = 'front()';
      this.setStatus('Inspect front', `${this.items[0]} is next to leave; the queue remains unchanged.`, false);
      this.render();
    }

    undo() {
      const state = this.history.pop();
      if (!state) return this.setStatus('Nothing to undo', 'No mutating queue operation is available to reverse.', true);
      this.items = [...state.items];
      this.lastReturned = state.returned;
      this.lastOperation = 'undo';
      this.setStatus('Previous state restored', 'The most recent enqueue or dequeue was reversed.', false);
      this.render();
    }

    reset() {
      this.items = ['A', 'B', 'C'];
      this.history = [];
      this.lastReturned = null;
      this.lastOperation = 'reset';
      this.valueInput.value = 'D';
      this.setStatus('Queue reset', 'The initial FIFO order A, B, C has been restored.', false);
      this.render();
    }

    setStatus(title, text, isError) {
      const titleNode = this.root.querySelector('[data-role="status-title"]');
      const textNode = this.root.querySelector('[data-role="status-text"]');
      titleNode.textContent = title;
      textNode.textContent = text;
      textNode.classList.toggle('is-error', Boolean(isError));
    }

    render() {
      const track = this.root.querySelector('[data-role="track"]');
      track.innerHTML = this.items.length
        ? this.items.map((value, index) => `<div class="queue-viz__item ${index === 0 ? 'is-front' : ''} ${index === this.items.length - 1 ? 'is-rear' : ''}"><span>${value}</span><small>${index === 0 ? 'next out' : index === this.items.length - 1 ? 'newest' : 'waiting'}</small></div>`).join('')
        : '<div class="queue-viz__empty">empty queue</div>';

      const array = this.root.querySelector('[data-role="array"]');
      array.innerHTML = Array.from({ length: this.capacity }, (_, index) => `<div class="queue-viz__cell ${index === 0 && this.items.length ? 'is-front' : ''} ${index === this.items.length - 1 && this.items.length ? 'is-rear' : ''}"><small>${index}</small><strong>${this.items[index] ?? '∅'}</strong></div>`).join('');

      this.root.querySelector('[data-role="size"]').textContent = this.items.length;
      this.root.querySelector('[data-role="front"]').textContent = this.items[0] ?? '—';
      this.root.querySelector('[data-role="rear"]').textContent = this.items[this.items.length - 1] ?? '—';
      this.root.querySelector('[data-role="returned"]').textContent = this.lastReturned ?? '—';
      this.root.querySelector('[data-role="operation"]').textContent = this.lastOperation;
    }
  }

  function initialise() {
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path.endsWith('/05-queues')) return;
    if (!document.querySelector('[data-queue-fifo-viz]')) {
      const heading = [...document.querySelectorAll('.md-content h2')].find((node) => node.textContent.includes('Why removing from the front'));
      if (heading) {
        const root = document.createElement('div');
        root.dataset.queueFifoViz = '';
        heading.parentNode.insertBefore(root, heading);
      }
    }
    document.querySelectorAll('[data-queue-fifo-viz]').forEach((root) => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new QueueVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
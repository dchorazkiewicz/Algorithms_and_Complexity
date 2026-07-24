(() => {
  const INITIAL = [12, 27, 41, 58];

  class DoublyCircularListVisualizer {
    constructor(root) {
      this.root = root;
      this.mode = 'insert';
      this.circular = false;
      this.trace = [];
      this.step = 0;
      this.timer = null;
      this.renderShell();
      this.bind();
      this.prepare();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'dcl-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Pointer rewiring trace</p><h3>Doubly linked and circular lists</h3></div>
          <span class="ds-viz__complexity">known-node update O(1) · search O(n)</span>
        </div>
        <div class="ds-viz__controls dcl-viz__controls">
          <label>Operation
            <select data-role="operation">
              <option value="insert">Insert 35 after 27</option>
              <option value="unlink">Unlink node 41</option>
              <option value="forward">Traverse forward</option>
              <option value="backward">Traverse backward</option>
            </select>
          </label>
          <label class="dcl-viz__toggle"><input type="checkbox" data-role="circular"> Circular list</label>
          <button type="button" data-action="prepare">Prepare trace</button>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="dcl-viz__stage" data-role="stage"></div>
        <div class="dcl-viz__legend"><span><i class="is-active"></i> active</span><span><i class="is-write"></i> pointer write</span><span><i class="is-visited"></i> visited</span></div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics">
          <span>Mode: <strong data-role="mode"></strong></span>
          <span>Pointer writes: <strong data-role="writes"></strong></span>
          <span>Visited: <strong data-role="visited"></strong></span>
          <span>Step: <strong data-role="progress"></strong></span>
        </div>`;
    }

    bind() {
      this.operation = this.root.querySelector('[data-role="operation"]');
      this.circularInput = this.root.querySelector('[data-role="circular"]');
      this.operation.addEventListener('change', () => { this.mode = this.operation.value; this.prepare(); });
      this.circularInput.addEventListener('change', () => { this.circular = this.circularInput.checked; this.prepare(); });
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => {
        this.stop(); this.mode = 'insert'; this.circular = false; this.operation.value = 'insert';
        this.circularInput.checked = false; this.prepare();
      });
    }

    snapshot(values, title, text, options = {}) {
      return {
        values: [...values], title, text,
        active: options.active || [], writes: options.writes || [], visited: options.visited || [],
        detached: options.detached || [], writeCount: options.writeCount || 0,
        circular: this.circular
      };
    }

    buildTrace() {
      const values = [...INITIAL];
      if (this.mode === 'insert') {
        return [
          this.snapshot(values, 'Name the neighbours', 'Store node 27 and its old successor 41 before changing any links.', { active:[27,41] }),
          this.snapshot([12,27,35,41,58], 'Create the new node', 'Node 35 receives previous = 27 and next = 41.', { active:[35], writes:['35-prev','35-next'], writeCount:2 }),
          this.snapshot([12,27,35,41,58], 'Reconnect the predecessor', 'Set 27.next to the new node 35.', { active:[27,35], writes:['27-next'], writeCount:3 }),
          this.snapshot([12,27,35,41,58], 'Reconnect the successor', 'Set 41.previous to 35. Forward and backward links agree again.', { active:[35,41], writes:['41-prev'], writeCount:4 })
        ];
      }
      if (this.mode === 'unlink') {
        return [
          this.snapshot(values, 'Capture both neighbours', 'Node 41 has predecessor 27 and successor 58.', { active:[27,41,58] }),
          this.snapshot(values, 'Bypass in the forward direction', 'Set 27.next to 58.', { active:[27,58], writes:['27-next'], writeCount:1 }),
          this.snapshot(values, 'Bypass in the backward direction', 'Set 58.previous to 27.', { active:[27,58], writes:['58-prev'], writeCount:2 }),
          this.snapshot([12,27,58], 'Detach the removed node', 'Clear both links of 41. The remaining list satisfies the bidirectional invariant.', { detached:[41], writes:['41-prev','41-next'], writeCount:4 })
        ];
      }
      const direction = this.mode === 'forward' ? 1 : -1;
      const order = direction === 1 ? values : [...values].reverse();
      const trace = [this.snapshot(values, direction === 1 ? 'Start at head' : 'Start at tail', direction === 1 ? 'Follow next pointers from the head.' : 'Follow previous pointers from the tail.', { active:[order[0]], visited:[order[0]] })];
      order.slice(1).forEach((value, index) => {
        const visited = order.slice(0, index + 2);
        trace.push(this.snapshot(values, direction === 1 ? 'Follow next' : 'Follow previous', `Move to ${value}; every traversed link remains consistent in both directions.`, { active:[value], visited }));
      });
      if (this.circular) {
        trace.push(this.snapshot(values, 'Return to the starting identity', `The final pointer returns to ${order[0]}; traversal stops by identity, not by reaching None.`, { active:[order[0]], visited:order }));
      } else {
        trace.push(this.snapshot(values, 'Reach the endpoint marker', direction === 1 ? 'tail.next is None, so forward traversal stops.' : 'head.previous is None, so backward traversal stops.', { visited:order }));
      }
      return trace;
    }

    prepare() { this.stop(); this.trace = this.buildTrace(); this.step = 0; this.render(); }
    go(delta) { this.stop(); this.step = Math.max(0, Math.min(this.trace.length - 1, this.step + delta)); this.render(); }
    play() {
      if (this.timer) return this.stop();
      if (this.step >= this.trace.length - 1) this.step = 0;
      this.root.querySelector('[data-action="play"]').textContent = 'Pause';
      this.render();
      this.timer = window.setInterval(() => {
        if (this.step >= this.trace.length - 1) return this.stop();
        this.step += 1; this.render();
      }, 1250);
    }
    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }

    render() {
      const state = this.trace[this.step];
      const nodes = state.values.map((value, index) => {
        const classes = ['dcl-viz__node'];
        if (state.active.includes(value)) classes.push('is-active');
        if (state.visited.includes(value)) classes.push('is-visited');
        const prevValue = index === 0 ? (state.circular ? state.values.at(-1) : 'None') : state.values[index - 1];
        const nextValue = index === state.values.length - 1 ? (state.circular ? state.values[0] : 'None') : state.values[index + 1];
        const prevWrite = state.writes.includes(`${value}-prev`) ? 'is-write' : '';
        const nextWrite = state.writes.includes(`${value}-next`) ? 'is-write' : '';
        return `<div class="${classes.join(' ')}"><div class="dcl-viz__pointer ${prevWrite}"><small>previous</small><strong>${prevValue}</strong></div><div class="dcl-viz__value">${value}</div><div class="dcl-viz__pointer ${nextWrite}"><small>next</small><strong>${nextValue}</strong></div></div>`;
      }).join('<div class="dcl-viz__link"><span>next →</span><span>← previous</span></div>');
      const wrap = state.circular ? '<div class="dcl-viz__wrap"><span>tail.next → head</span><span>head.previous → tail</span></div>' : '<div class="dcl-viz__endpoints"><span>head.previous = None</span><span>tail.next = None</span></div>';
      const detached = state.detached.length ? `<div class="dcl-viz__detached">Detached: ${state.detached.join(', ')}</div>` : '';
      this.root.querySelector('[data-role="stage"]').innerHTML = `<div class="dcl-viz__row">${nodes}</div>${wrap}${detached}`;
      this.root.querySelector('[data-role="title"]').textContent = state.title;
      this.root.querySelector('[data-role="text"]').textContent = state.text;
      this.root.querySelector('[data-role="mode"]').textContent = this.circular ? 'circular doubly linked' : 'linear doubly linked';
      this.root.querySelector('[data-role="writes"]').textContent = state.writeCount;
      this.root.querySelector('[data-role="visited"]').textContent = state.visited.length;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.step + 1}/${this.trace.length}`;
    }
  }

  function initialise() {
    document.querySelectorAll('[data-doubly-circular-list-viz]').forEach(root => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new DoublyCircularListVisualizer(root);
    });
  }
  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
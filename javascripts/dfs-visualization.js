(() => {
  const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: ['A'],
    E: ['F'],
    F: ['C']
  };
  const positions = { A:[50,10], B:[26,34], C:[74,34], D:[14,68], E:[40,68], F:[76,68] };
  const edges = [['A','B'],['A','C'],['B','D'],['B','E'],['C','F'],['D','A'],['E','F'],['F','C']];

  class DFSVisualizer {
    constructor(root) {
      this.root = root;
      this.steps = [];
      this.step = 0;
      this.timer = null;
      this.start = 'A';
      this.renderShell();
      this.bind();
      this.prepare();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'dfs-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Animated graph traversal</p><h3>Recursive depth-first search</h3></div>
          <span class="ds-viz__complexity">time O(V + E) · space O(V)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Start<select data-role="start">${Object.keys(graph).map(v => `<option>${v}</option>`).join('')}</select></label>
          <button type="button" data-action="prepare">Prepare trace</button>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="dfs-viz__layout">
          <div class="dfs-viz__canvas" data-role="canvas"></div>
          <aside class="dfs-viz__panel">
            <section><h4>Call stack</h4><div data-role="stack" class="dfs-viz__stack"></div></section>
            <section><h4>Visited</h4><div data-role="visited" class="dfs-viz__chips"></div></section>
            <section><h4>Traversal order</h4><div data-role="order" class="dfs-viz__order"></div></section>
            <section><h4>Adjacency list</h4><div class="dfs-viz__adjacency">${Object.entries(graph).map(([v,ns]) => `<div><strong>${v}</strong><span>${ns.join(', ')}</span></div>`).join('')}</div></section>
          </aside>
        </div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics">
          <span>Current: <strong data-role="current">—</strong></span>
          <span>Inspected edges: <strong data-role="edges">0</strong></span>
          <span>Visited vertices: <strong data-role="count">0</strong></span>
          <span>Step: <strong data-role="progress">0/0</strong></span>
        </div>`;
    }

    bind() {
      this.startSelect = this.root.querySelector('[data-role="start"]');
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => { this.start = this.startSelect.value; this.prepare(); });
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => { this.stop(); this.start='A'; this.startSelect.value='A'; this.prepare(); });
    }

    snapshot({current=null, stack=[], visited=[], order=[], activeEdge=null, skippedEdge=null, title='', text='', inspected=0, finished=[]}) {
      return { current, stack:[...stack], visited:[...visited], order:[...order], activeEdge, skippedEdge, title, text, inspected, finished:[...finished] };
    }

    prepare() {
      this.stop();
      const visited = new Set();
      const order = [];
      const stack = [];
      const finished = new Set();
      let inspected = 0;
      this.steps = [];

      const explore = (vertex) => {
        stack.push(vertex);
        visited.add(vertex);
        order.push(vertex);
        this.steps.push(this.snapshot({current:vertex, stack, visited, order, title:`Discover ${vertex}`, text:`Mark ${vertex} before inspecting its neighbours. The active call explore(${vertex}) is now on the stack.`, inspected, finished}));
        for (const neighbour of graph[vertex]) {
          inspected += 1;
          if (!visited.has(neighbour)) {
            this.steps.push(this.snapshot({current:vertex, stack, visited, order, activeEdge:[vertex,neighbour], title:`Tree edge ${vertex} → ${neighbour}`, text:`${neighbour} is unvisited, so DFS recursively enters it.`, inspected, finished}));
            explore(neighbour);
            this.steps.push(this.snapshot({current:vertex, stack, visited, order, activeEdge:[vertex,neighbour], title:`Return to ${vertex}`, text:`explore(${neighbour}) finished. Resume the suspended call for ${vertex}.`, inspected, finished}));
          } else {
            this.steps.push(this.snapshot({current:vertex, stack, visited, order, skippedEdge:[vertex,neighbour], title:`Skip ${vertex} → ${neighbour}`, text:`${neighbour} is already visited, so no recursive call is made.`, inspected, finished}));
          }
        }
        finished.add(vertex);
        this.steps.push(this.snapshot({current:vertex, stack, visited, order, title:`Finish ${vertex}`, text:`All neighbours of ${vertex} have been inspected. Pop explore(${vertex}) from the call stack.`, inspected, finished}));
        stack.pop();
      };

      explore(this.start);
      this.steps.push(this.snapshot({stack, visited, order, title:'DFS complete', text:`Traversal order: ${order.join(' → ')}. Every reachable vertex was discovered exactly once.`, inspected, finished}));
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
      this.root.classList.add('is-playing');
      this.render();
      this.timer = window.setInterval(() => {
        if (this.step >= this.steps.length - 1) return this.stop();
        this.step += 1;
        this.render();
      }, 1150);
    }

    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      this.root.classList.remove('is-playing');
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }

    render() {
      const state = this.steps[this.step];
      const edgeMarkup = edges.map(([a,b]) => {
        const [x1,y1] = positions[a], [x2,y2] = positions[b];
        const isActive = state.activeEdge && state.activeEdge[0]===a && state.activeEdge[1]===b;
        const isSkipped = state.skippedEdge && state.skippedEdge[0]===a && state.skippedEdge[1]===b;
        return `<line class="dfs-viz__edge ${isActive?'is-active':''} ${isSkipped?'is-skipped':''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
      }).join('');
      const nodeMarkup = Object.keys(graph).map(v => {
        const [x,y] = positions[v];
        const classes = ['dfs-viz__node'];
        if (state.visited.includes(v)) classes.push('is-visited');
        if (state.finished.includes(v)) classes.push('is-finished');
        if (state.current === v) classes.push('is-current');
        return `<g class="${classes.join(' ')}" transform="translate(${x} ${y})"><circle r="7"></circle><text text-anchor="middle" dy=".35em">${v}</text></g>`;
      }).join('');
      this.root.querySelector('[data-role="canvas"]').innerHTML = `<svg viewBox="0 0 100 82" role="img" aria-label="Depth-first search graph">${edgeMarkup}${nodeMarkup}</svg>`;
      this.root.querySelector('[data-role="stack"]').innerHTML = state.stack.length ? [...state.stack].reverse().map((v,i) => `<div class="${i===0?'is-top':''}"><span>explore(${v})</span><small>${i===0?'active':'suspended'}</small></div>`).join('') : '<em>empty</em>';
      this.root.querySelector('[data-role="visited"]').innerHTML = state.visited.length ? state.visited.map(v => `<span>${v}</span>`).join('') : '<em>none</em>';
      this.root.querySelector('[data-role="order"]').textContent = state.order.length ? state.order.join(' → ') : '—';
      this.root.querySelector('[data-role="title"]').textContent = state.title;
      this.root.querySelector('[data-role="text"]').textContent = state.text;
      this.root.querySelector('[data-role="current"]').textContent = state.current || '—';
      this.root.querySelector('[data-role="edges"]').textContent = state.inspected;
      this.root.querySelector('[data-role="count"]').textContent = state.visited.length;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.step + 1}/${this.steps.length}`;
    }
  }

  function initialise() {
    document.querySelectorAll('[data-dfs-viz]').forEach(root => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new DFSVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
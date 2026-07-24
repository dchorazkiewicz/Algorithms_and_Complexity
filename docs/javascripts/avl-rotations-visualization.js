(() => {
  const CASES = {
    LL: {
      title: 'LL imbalance → right rotation',
      rotation: '↻ rotate right',
      steps: [
        { phase:'insert', nodes:[[30,50,13,2],[20,31,39,1],[10,18,68,0]], edges:[[30,20],[20,10]], active:[10], moving:[10], text:'Insert 10. The new node appears at the first valid BST position.' },
        { phase:'detect', nodes:[[30,50,13,2],[20,31,39,1],[10,18,68,0]], edges:[[30,20],[20,10]], active:[30], danger:[30], text:'Balance factor at 30 becomes +2. This is an LL imbalance.' },
        { phase:'prepare', nodes:[[30,50,13,2],[20,31,39,1],[10,18,68,0]], edges:[[30,20],[20,10]], active:[30,20], pivot:[30], promoted:[20], arrow:'right', text:'Promote 20 and rotate the local subtree to the right around 30.' },
        { phase:'rotate', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[20,30], pivot:[30], promoted:[20], arrow:'right', text:'Pointers are rewired. Node 20 becomes the new local root.' },
        { phase:'settle', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[20], success:[10,20,30], text:'Balanced again. Inorder order 10, 20, 30 is preserved.' }
      ]
    },
    RR: {
      title: 'RR imbalance → left rotation',
      rotation: '↺ rotate left',
      steps: [
        { phase:'insert', nodes:[[10,50,13,-2],[20,69,39,-1],[30,82,68,0]], edges:[[10,20],[20,30]], active:[30], moving:[30], text:'Insert 30. The new node extends the right-right path.' },
        { phase:'detect', nodes:[[10,50,13,-2],[20,69,39,-1],[30,82,68,0]], edges:[[10,20],[20,30]], active:[10], danger:[10], text:'Balance factor at 10 becomes −2. This is an RR imbalance.' },
        { phase:'prepare', nodes:[[10,50,13,-2],[20,69,39,-1],[30,82,68,0]], edges:[[10,20],[20,30]], active:[10,20], pivot:[10], promoted:[20], arrow:'left', text:'Promote 20 and rotate the local subtree to the left around 10.' },
        { phase:'rotate', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[10,20], pivot:[10], promoted:[20], arrow:'left', text:'Pointers are rewired. Node 20 becomes the new local root.' },
        { phase:'settle', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[20], success:[10,20,30], text:'Balanced again. Search order and completeness of the subtree are preserved.' }
      ]
    },
    LR: {
      title: 'LR imbalance → double rotation',
      rotation: '↺ then ↻',
      steps: [
        { phase:'insert', nodes:[[30,50,13,2],[10,29,39,-1],[20,40,68,0]], edges:[[30,10],[10,20]], active:[20], moving:[20], text:'Insert 20. The path bends left then right, producing a zig-zag.' },
        { phase:'detect', nodes:[[30,50,13,2],[10,29,39,-1],[20,40,68,0]], edges:[[30,10],[10,20]], active:[30,10], danger:[30], text:'Node 30 is left-heavy, but child 10 is right-heavy: LR case.' },
        { phase:'rotate', nodes:[[30,58,13,2],[20,36,39,1],[10,22,68,0]], edges:[[30,20],[20,10]], active:[10,20], pivot:[10], promoted:[20], arrow:'left', text:'First rotate left around 10. The zig-zag becomes a straight LL shape.' },
        { phase:'rotate', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[20,30], pivot:[30], promoted:[20], arrow:'right', text:'Then rotate right around 30. Node 20 becomes the local root.' },
        { phase:'settle', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[20], success:[10,20,30], text:'Double rotation complete. All balance factors return to 0.' }
      ]
    },
    RL: {
      title: 'RL imbalance → double rotation',
      rotation: '↻ then ↺',
      steps: [
        { phase:'insert', nodes:[[10,50,13,-2],[30,71,39,1],[20,60,68,0]], edges:[[10,30],[30,20]], active:[20], moving:[20], text:'Insert 20. The path bends right then left, producing a zig-zag.' },
        { phase:'detect', nodes:[[10,50,13,-2],[30,71,39,1],[20,60,68,0]], edges:[[10,30],[30,20]], active:[10,30], danger:[10], text:'Node 10 is right-heavy, but child 30 is left-heavy: RL case.' },
        { phase:'rotate', nodes:[[10,42,13,-2],[20,64,39,-1],[30,78,68,0]], edges:[[10,20],[20,30]], active:[20,30], pivot:[30], promoted:[20], arrow:'right', text:'First rotate right around 30. The zig-zag becomes a straight RR shape.' },
        { phase:'rotate', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[10,20], pivot:[10], promoted:[20], arrow:'left', text:'Then rotate left around 10. Node 20 becomes the local root.' },
        { phase:'settle', nodes:[[20,50,18,0],[10,29,57,0],[30,71,57,0]], edges:[[20,10],[20,30]], active:[20], success:[10,20,30], text:'Double rotation complete. Height is reduced and BST order is preserved.' }
      ]
    }
  };

  class AVLVisualizer {
    constructor(root) {
      this.root = root;
      this.caseName = 'LL';
      this.step = 0;
      this.timer = null;
      this.renderShell();
      this.bind();
      this.render();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'avl-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header">
          <div><p class="ds-viz__eyebrow">Animated structural repair</p><h3>AVL rotations</h3></div>
          <span class="ds-viz__complexity">rotation O(1) · update O(log n)</span>
        </div>
        <div class="ds-viz__controls">
          <label>Case<select data-role="case"><option>LL</option><option>RR</option><option>LR</option><option>RL</option></select></label>
          <button type="button" data-action="previous">Previous</button>
          <button type="button" data-action="next">Next</button>
          <button type="button" data-action="play">Play</button>
          <button type="button" data-action="reset">Reset</button>
        </div>
        <div class="avl-viz__timeline" data-role="timeline"></div>
        <div class="avl-viz__canvas" data-role="canvas"></div>
        <div class="avl-viz__legend"><span><i class="is-danger"></i> unbalanced</span><span><i class="is-promoted"></i> promoted</span><span><i class="is-success"></i> balanced</span></div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics"><span>Case: <strong data-role="metric-case"></strong></span><span>Action: <strong data-role="action"></strong></span><span>Rotations: <strong data-role="rotations"></strong></span><span>Step: <strong data-role="progress"></strong></span></div>`;
    }

    bind() {
      this.select = this.root.querySelector('[data-role="case"]');
      this.select.addEventListener('change', () => { this.caseName = this.select.value; this.step = 0; this.stop(); this.render(); });
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => { this.stop(); this.step = 0; this.render(); });
    }

    go(delta) {
      this.stop();
      const max = CASES[this.caseName].steps.length - 1;
      this.step = Math.max(0, Math.min(max, this.step + delta));
      this.render();
    }

    play() {
      if (this.timer) return this.stop();
      if (this.step >= CASES[this.caseName].steps.length - 1) this.step = 0;
      this.root.classList.add('is-playing');
      this.root.querySelector('[data-action="play"]').textContent = 'Pause';
      this.render();
      this.timer = window.setInterval(() => {
        if (this.step >= CASES[this.caseName].steps.length - 1) return this.stop();
        this.step += 1;
        this.render();
      }, 1450);
    }

    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
      this.root.classList.remove('is-playing');
      const button = this.root.querySelector('[data-action="play"]');
      if (button) button.textContent = 'Play';
    }

    render() {
      const data = CASES[this.caseName];
      const state = data.steps[this.step];
      const nodeByKey = new Map(state.nodes.map(node => [node[0], node]));
      const edgeMarkup = state.edges.map(([from, to], index) => {
        const a = nodeByKey.get(from); const b = nodeByKey.get(to);
        return `<line class="avl-viz__edge" style="--edge-delay:${index * 90}ms" x1="${a[1]}" y1="${a[2]}" x2="${b[1]}" y2="${b[2]}"></line>`;
      }).join('');
      const nodeMarkup = state.nodes.map(([key, x, y, bf], index) => {
        const classes = ['avl-viz__node'];
        if ((state.active || []).includes(key)) classes.push('is-active');
        if ((state.danger || []).includes(key)) classes.push('is-danger');
        if ((state.pivot || []).includes(key)) classes.push('is-pivot');
        if ((state.promoted || []).includes(key)) classes.push('is-promoted');
        if ((state.success || []).includes(key)) classes.push('is-success');
        if ((state.moving || []).includes(key)) classes.push('is-moving');
        return `<g class="${classes.join(' ')}" style="--node-delay:${index * 90}ms" transform="translate(${x} ${y})"><circle r="7.2"></circle><text text-anchor="middle" dy=".35em">${key}</text><g class="avl-viz__bf" transform="translate(8 -7)"><rect x="-5" y="-4" width="10" height="7" rx="3.5"></rect><text text-anchor="middle" dy=".5">bf ${bf > 0 ? '+' : ''}${bf}</text></g></g>`;
      }).join('');
      const arrow = state.arrow ? `<g class="avl-viz__rotation-arrow avl-viz__rotation-arrow--${state.arrow}"><path d="M 50 7 C ${state.arrow === 'left' ? 78 : 22} 5, ${state.arrow === 'left' ? 82 : 18} 31, 50 37"></path><polygon points="${state.arrow === 'left' ? '48,33 55,37 49,41' : '52,33 45,37 51,41'}"></polygon></g>` : '';
      this.root.querySelector('[data-role="canvas"]').innerHTML = `<svg viewBox="0 0 100 82" role="img" aria-label="AVL rotation case ${this.caseName}">${arrow}${edgeMarkup}${nodeMarkup}</svg>`;
      this.root.querySelector('[data-role="timeline"]').innerHTML = data.steps.map((item, index) => `<button type="button" class="${index === this.step ? 'is-current' : ''} ${index < this.step ? 'is-done' : ''}" data-step="${index}"><span>${index + 1}</span><small>${item.phase}</small></button>`).join('');
      this.root.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => { this.stop(); this.step = Number(button.dataset.step); this.render(); }));
      this.root.querySelector('[data-role="title"]').textContent = data.title;
      this.root.querySelector('[data-role="text"]').textContent = state.text;
      this.root.querySelector('[data-role="metric-case"]').textContent = this.caseName;
      this.root.querySelector('[data-role="action"]').textContent = state.phase;
      this.root.querySelector('[data-role="rotations"]').textContent = (this.caseName === 'LR' || this.caseName === 'RL') ? '2' : '1';
      this.root.querySelector('[data-role="progress"]').textContent = `${this.step + 1}/${data.steps.length}`;
    }
  }

  function initialise() {
    document.querySelectorAll('[data-avl-rotations-viz]').forEach(root => {
      if (root.dataset.initialised) return;
      root.dataset.initialised = 'true';
      new AVLVisualizer(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
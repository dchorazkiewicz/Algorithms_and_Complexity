(() => {
  const CASES = {
    LL: {
      title: 'LL imbalance → right rotation',
      steps: [
        { nodes: [[30,50,12],[20,30,38],[10,18,64]], edges: [[30,20],[20,10]], active:[30], text:'Insertion into the left child’s left subtree makes node 30 left-heavy: balance factor +2.' },
        { nodes: [[30,50,12],[20,30,38],[10,18,64]], edges: [[30,20],[20,10]], active:[30,20], text:'Choose a single right rotation around 30. Node 20 becomes the local root.' },
        { nodes: [[20,50,12],[10,30,64],[30,70,64]], edges: [[20,10],[20,30]], active:[20], text:'Rotation complete. Inorder order 10, 20, 30 is preserved and all balance factors return to 0.' }
      ]
    },
    RR: {
      title: 'RR imbalance → left rotation',
      steps: [
        { nodes: [[10,50,12],[20,70,38],[30,82,64]], edges: [[10,20],[20,30]], active:[10], text:'Insertion into the right child’s right subtree makes node 10 right-heavy: balance factor −2.' },
        { nodes: [[10,50,12],[20,70,38],[30,82,64]], edges: [[10,20],[20,30]], active:[10,20], text:'Choose a single left rotation around 10. Node 20 becomes the local root.' },
        { nodes: [[20,50,12],[10,30,64],[30,70,64]], edges: [[20,10],[20,30]], active:[20], text:'Rotation complete. Search order is unchanged and the subtree height is reduced.' }
      ]
    },
    LR: {
      title: 'LR imbalance → double rotation',
      steps: [
        { nodes: [[30,50,12],[10,28,38],[20,40,64]], edges: [[30,10],[10,20]], active:[30], text:'Node 30 is left-heavy, but its left child 10 is right-heavy. This is a zig-zag LR case.' },
        { nodes: [[30,50,12],[20,28,38],[10,16,64]], edges: [[30,20],[20,10]], active:[10,20], text:'First rotate left around child 10. The zig-zag becomes a straight LL shape.' },
        { nodes: [[20,50,12],[10,30,64],[30,70,64]], edges: [[20,10],[20,30]], active:[20,30], text:'Then rotate right around 30. Node 20 becomes the balanced local root.' }
      ]
    },
    RL: {
      title: 'RL imbalance → double rotation',
      steps: [
        { nodes: [[10,50,12],[30,72,38],[20,60,64]], edges: [[10,30],[30,20]], active:[10], text:'Node 10 is right-heavy, but its right child 30 is left-heavy. This is a zig-zag RL case.' },
        { nodes: [[10,50,12],[20,72,38],[30,84,64]], edges: [[10,20],[20,30]], active:[20,30], text:'First rotate right around child 30. The zig-zag becomes a straight RR shape.' },
        { nodes: [[20,50,12],[10,30,64],[30,70,64]], edges: [[20,10],[20,30]], active:[10,20], text:'Then rotate left around 10. Node 20 becomes the balanced local root.' }
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
      this.root.classList.add('ds-viz','avl-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header"><div><p class="ds-viz__eyebrow">Interactive trace</p><h3>AVL rotations</h3></div><span class="ds-viz__complexity">rotation O(1) · update O(log n)</span></div>
        <div class="ds-viz__controls">
          <label>Case<select data-role="case"><option>LL</option><option>RR</option><option>LR</option><option>RL</option></select></label>
          <button type="button" data-action="previous">Previous</button><button type="button" data-action="next">Next</button><button type="button" data-action="play">Play</button><button type="button" data-action="reset">Reset</button>
        </div>
        <div class="avl-viz__canvas" data-role="canvas"></div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics"><span>Case: <strong data-role="metric-case"></strong></span><span>Rotations: <strong data-role="rotations"></strong></span><span>Step: <strong data-role="progress"></strong></span></div>`;
    }

    bind() {
      this.select = this.root.querySelector('[data-role="case"]');
      this.select.addEventListener('change', () => { this.caseName = this.select.value; this.step = 0; this.stop(); this.render(); });
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => { this.stop(); this.caseName='LL'; this.select.value='LL'; this.step=0; this.render(); });
    }

    go(delta) { this.stop(); const max = CASES[this.caseName].steps.length - 1; this.step = Math.max(0, Math.min(max, this.step + delta)); this.render(); }
    play() {
      if (this.timer) return this.stop();
      if (this.step >= CASES[this.caseName].steps.length - 1) this.step = 0;
      this.root.querySelector('[data-action="play"]').textContent='Pause';
      this.timer = setInterval(() => { if (this.step >= CASES[this.caseName].steps.length - 1) return this.stop(); this.step += 1; this.render(); }, 1100);
    }
    stop() { if (this.timer) clearInterval(this.timer); this.timer=null; const b=this.root.querySelector('[data-action="play"]'); if (b) b.textContent='Play'; }

    render() {
      const data = CASES[this.caseName];
      const state = data.steps[this.step];
      const edge = ([a,b]) => { const n1=state.nodes.find(n=>n[0]===a), n2=state.nodes.find(n=>n[0]===b); return `<line x1="${n1[1]}" y1="${n1[2]}" x2="${n2[1]}" y2="${n2[2]}"></line>`; };
      this.root.querySelector('[data-role="canvas"]').innerHTML = `<svg viewBox="0 0 100 82" role="img" aria-label="AVL rotation case ${this.caseName}">${state.edges.map(edge).join('')}${state.nodes.map(([key,x,y])=>`<g class="avl-viz__node ${state.active.includes(key)?'is-active':''}" transform="translate(${x} ${y})"><circle r="7"></circle><text text-anchor="middle" dy=".35em">${key}</text><small></small></g>`).join('')}</svg>`;
      this.root.querySelector('[data-role="title"]').textContent = data.title;
      this.root.querySelector('[data-role="text"]').textContent = state.text;
      this.root.querySelector('[data-role="metric-case"]').textContent = this.caseName;
      this.root.querySelector('[data-role="rotations"]').textContent = (this.caseName==='LR'||this.caseName==='RL') ? '2' : '1';
      this.root.querySelector('[data-role="progress"]').textContent = `${this.step+1}/${data.steps.length}`;
    }
  }

  function initialise() {
    document.querySelectorAll('[data-avl-rotations-viz]').forEach(root => {
      if (root.dataset.initialised) return;
      root.dataset.initialised='true';
      new AVLVisualizer(root);
    });
  }
  if (typeof document$ !== 'undefined') document$.subscribe(initialise);
  else document.addEventListener('DOMContentLoaded', initialise);
})();
(() => {
  const GRAPH = { A:['B','C'], B:['D','E'], C:['F'], D:['C'], E:['F'], F:['B'] };
  const POS = { A:[50,10], B:[25,35], C:[75,35], D:[12,68], E:[38,68], F:[75,68] };

  class IterativeDFSViz {
    constructor(root){ this.root=root; this.steps=[]; this.index=0; this.timer=null; this.renderShell(); this.bind(); this.prepare(); }
    renderShell(){
      this.root.classList.add('ds-viz','iterative-dfs-viz');
      this.root.innerHTML=`
        <div class="ds-viz__header"><div><p class="ds-viz__eyebrow">Explicit worklist trace</p><h3>Iterative depth-first search</h3></div><span class="ds-viz__complexity">time O(V + E) · space O(V)</span></div>
        <div class="ds-viz__controls">
          <label>Start<select data-role="start">${Object.keys(GRAPH).map(v=>`<option>${v}</option>`).join('')}</select></label>
          <label>Marking<select data-role="mode"><option value="push">mark on push</option><option value="pop">mark on pop</option></select></label>
          <button type="button" data-action="prepare">Prepare trace</button><button type="button" data-action="previous">Previous</button><button type="button" data-action="next">Next</button><button type="button" data-action="play">Play</button><button type="button" data-action="reset">Reset</button>
        </div>
        <div class="iterative-dfs-viz__layout">
          <div class="iterative-dfs-viz__graph" data-role="graph"></div>
          <div class="iterative-dfs-viz__side">
            <section><h4>Explicit stack <span>top</span></h4><div class="iterative-dfs-viz__stack" data-role="stack"></div></section>
            <section><h4>Visited</h4><div class="iterative-dfs-viz__chips" data-role="visited"></div></section>
            <section><h4>Order</h4><div class="iterative-dfs-viz__chips" data-role="order"></div></section>
            <section><h4>Adjacency list</h4><pre data-role="adjacency"></pre></section>
          </div>
        </div>
        <div class="ds-viz__status"><strong data-role="phase"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics"><span>Pops: <strong data-role="pops">0</strong></span><span>Pushes: <strong data-role="pushes">0</strong></span><span>Duplicates skipped: <strong data-role="duplicates">0</strong></span><span>Step: <strong data-role="progress"></strong></span></div>`;
    }
    bind(){
      this.root.querySelector('[data-action="prepare"]').addEventListener('click',()=>this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click',()=>this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click',()=>this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click',()=>this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click',()=>{this.stop();this.root.querySelector('[data-role="start"]').value='A';this.root.querySelector('[data-role="mode"]').value='push';this.prepare();});
    }
    snap(stack,visited,order,active,edge,phase,text,pops,pushes,duplicates){ return {stack:[...stack],visited:[...visited],order:[...order],active,edge,phase,text,pops,pushes,duplicates}; }
    prepare(){
      this.stop(); const start=this.root.querySelector('[data-role="start"]').value; const mode=this.root.querySelector('[data-role="mode"]').value;
      const stack=[start], visited=new Set(mode==='push'?[start]:[]), order=[]; let pops=0,pushes=1,duplicates=0; this.steps=[];
      this.steps.push(this.snap(stack,visited,order,start,null,'Initialise',`Push ${start} onto the explicit stack.`,pops,pushes,duplicates));
      while(stack.length){
        const v=stack.pop(); pops++; this.steps.push(this.snap(stack,visited,order,v,null,'Pop',`Pop ${v}. It becomes the next vertex to process.`,pops,pushes,duplicates));
        if(mode==='pop' && visited.has(v)){ duplicates++; this.steps.push(this.snap(stack,visited,order,v,null,'Skip duplicate',`${v} was already visited, so this stack entry is discarded.`,pops,pushes,duplicates)); continue; }
        if(mode==='pop') visited.add(v);
        order.push(v); this.steps.push(this.snap(stack,visited,order,v,null,'Visit',`Mark ${v} and append it to the traversal order.`,pops,pushes,duplicates));
        [...GRAPH[v]].reverse().forEach(n=>{
          if(!visited.has(n)){
            stack.push(n); pushes++; if(mode==='push') visited.add(n);
            this.steps.push(this.snap(stack,visited,order,v,[v,n],'Push neighbour',`Inspect ${v} → ${n}; push ${n}. Reverse neighbour order preserves left-to-right DFS behaviour.`,pops,pushes,duplicates));
          } else this.steps.push(this.snap(stack,visited,order,v,[v,n],'Skip edge',`Inspect ${v} → ${n}; ${n} is already discovered.`,pops,pushes,duplicates));
        });
      }
      this.steps.push(this.snap([],visited,order,null,null,'Finished','The explicit stack is empty, so every reachable vertex has been processed.',pops,pushes,duplicates)); this.index=0; this.render();
    }
    go(delta){ this.stop(); this.index=Math.max(0,Math.min(this.steps.length-1,this.index+delta)); this.render(); }
    play(){ if(this.timer) return this.stop(); if(this.index===this.steps.length-1)this.index=0; this.root.querySelector('[data-action="play"]').textContent='Pause'; this.timer=setInterval(()=>{ if(this.index===this.steps.length-1)return this.stop(); this.index++; this.render(); },1000); }
    stop(){ if(this.timer)clearInterval(this.timer); this.timer=null; const b=this.root.querySelector('[data-action="play"]'); if(b)b.textContent='Play'; }
    render(){
      const s=this.steps[this.index];
      const edges=Object.entries(GRAPH).flatMap(([a,ns])=>ns.map(b=>[a,b]));
      const edgeMarkup=edges.map(([a,b])=>{const [x1,y1]=POS[a],[x2,y2]=POS[b];const hot=s.edge&&s.edge[0]===a&&s.edge[1]===b;return `<line class="${hot?'is-active':''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`}).join('');
      const nodeMarkup=Object.keys(GRAPH).map(v=>{const [x,y]=POS[v];const cls=[s.visited.includes(v)?'is-visited':'',s.active===v?'is-active':''].join(' ');return `<g class="iterative-dfs-viz__node ${cls}" transform="translate(${x} ${y})"><circle r="7"></circle><text text-anchor="middle" dy=".35em">${v}</text></g>`}).join('');
      this.root.querySelector('[data-role="graph"]').innerHTML=`<svg viewBox="0 0 100 82"><defs><marker id="iter-dfs-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z"></path></marker></defs>${edgeMarkup}${nodeMarkup}</svg>`;
      this.root.querySelector('[data-role="stack"]').innerHTML=s.stack.length?s.stack.map((v,i)=>`<div class="${i===s.stack.length-1?'is-top':''}">${v}</div>`).reverse().join(''):'<em>empty</em>';
      this.root.querySelector('[data-role="visited"]').innerHTML=s.visited.map(v=>`<span>${v}</span>`).join('')||'<em>∅</em>';
      this.root.querySelector('[data-role="order"]').innerHTML=s.order.map((v,i)=>`<span>${i+1}. ${v}</span>`).join('')||'<em>∅</em>';
      this.root.querySelector('[data-role="adjacency"]').textContent=Object.entries(GRAPH).map(([v,ns])=>`${v}: ${ns.join(', ')}`).join('\n');
      this.root.querySelector('[data-role="phase"]').textContent=s.phase; this.root.querySelector('[data-role="text"]').textContent=s.text;
      ['pops','pushes','duplicates'].forEach(k=>this.root.querySelector(`[data-role="${k}"]`).textContent=s[k]);
      this.root.querySelector('[data-role="progress"]').textContent=`${this.index+1}/${this.steps.length}`;
    }
  }
  const init=()=>document.querySelectorAll('[data-iterative-dfs-viz]').forEach(root=>{if(!root.dataset.initialised){root.dataset.initialised='true';new IterativeDFSViz(root);}});
  if(typeof document$!=='undefined')document$.subscribe(init);else document.addEventListener('DOMContentLoaded',init);
})();
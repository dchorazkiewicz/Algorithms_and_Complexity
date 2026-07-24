(() => {
  class LinkedListViz {
    constructor(root) {
      this.root = root; this.steps = []; this.i = 0; this.timer = null;
      root.classList.add('ds-viz','linked-list-viz');
      root.innerHTML = `
      <div class="ds-viz__header"><div><p class="ds-viz__eyebrow">Interactive trace</p><h3>Singly linked list: pointer rewiring</h3></div><span class="ds-viz__complexity" data-role="cost">Known node: O(1)</span></div>
      <div class="ds-viz__controls">
        <label>Operation<select data-role="op"><option value="insert">Insert after node</option><option value="delete">Delete after node</option><option value="reverse">Reverse list</option></select></label>
        <label data-role="index-label">Known node index<input data-role="index" type="number" min="0" max="3" value="1"></label>
        <label data-role="value-label">New value<input data-role="value" type="number" value="25"></label>
        <button data-action="prepare">Prepare trace</button><button data-action="prev">Previous</button><button data-action="next">Next</button><button data-action="play">Play</button><button data-action="reset">Reset</button>
      </div>
      <div class="linked-list-viz__legend"><span class="is-current">known/current</span><span class="is-saved">saved successor</span><span class="is-new">new/changed</span></div>
      <div class="linked-list-viz__stage" data-role="stage"></div>
      <div class="linked-list-viz__pointers" data-role="pointers"></div>
      <div class="ds-viz__status"><strong data-role="phase"></strong><span data-role="text"></span></div>
      <div class="ds-viz__metrics"><span>Pointer writes: <strong data-role="writes">0</strong></span><span>Traversed nodes: <strong data-role="walk">0</strong></span><span>Step: <strong data-role="progress"></strong></span></div>`;
      this.op=root.querySelector('[data-role="op"]'); this.index=root.querySelector('[data-role="index"]'); this.value=root.querySelector('[data-role="value"]');
      this.op.onchange=()=>{const r=this.op.value==='reverse'; root.querySelector('[data-role="index-label"]').hidden=r; root.querySelector('[data-role="value-label"]').hidden=r||this.op.value==='delete';};
      root.querySelector('[data-action="prepare"]').onclick=()=>this.prepare(); root.querySelector('[data-action="prev"]').onclick=()=>this.go(-1); root.querySelector('[data-action="next"]').onclick=()=>this.go(1); root.querySelector('[data-action="play"]').onclick=()=>this.play(); root.querySelector('[data-action="reset"]').onclick=()=>this.reset();
      this.prepare();
    }
    snap(values,next,phase,text,marks={},ptr={},writes=0,walk=0){return {values:[...values],next:[...next],phase,text,marks,ptr,writes,walk};}
    prepare(){
      this.stop(); const v=[10,20,30,40], n=[1,2,3,null], idx=Number(this.index.value); this.steps=[];
      if(this.op.value!=='reverse'&&(!Number.isInteger(idx)||idx<0||idx>=v.length)){this.steps=[this.snap(v,n,'Invalid input','Choose a valid node index.')];}
      else if(this.op.value==='insert') this.insert(v,n,idx,Number(this.value.value));
      else if(this.op.value==='delete') this.remove(v,n,idx);
      else this.reverse(v,n);
      this.i=0; this.render();
    }
    insert(v,n,idx,x){
      if(!Number.isFinite(x)){this.steps=[this.snap(v,n,'Invalid input','New value must be numeric.')];return;}
      this.steps.push(this.snap(v,n,'Known node available',`A reference to node ${v[idx]} is already known. No traversal is required.`,{current:idx},{known:idx},0,0));
      const old=n[idx], vv=[...v,x], nn=[...n,null], ni=vv.length-1;
      this.steps.push(this.snap(vv,nn,'Create new node',`Create node ${x} and save the old successor ${old===null?'null':v[old]}.`,{current:idx,saved:old,new:ni},{known:idx,successor:old,newNode:ni},0,0));
      nn[ni]=old; this.steps.push(this.snap(vv,nn,'Connect new node',`Set new.next to the saved successor.`,{current:idx,saved:old,new:ni},{known:idx,successor:old,newNode:ni},1,0));
      nn[idx]=ni; this.steps.push(this.snap(vv,nn,'Insertion complete',`Set known.next to the new node. The suffix remains reachable.`,{current:idx,new:ni},{known:idx,newNode:ni},2,0));
    }
    remove(v,n,idx){
      const rem=n[idx]; if(rem===null){this.steps=[this.snap(v,n,'Invalid input','The selected node has no successor to delete.')];return;}
      const succ=n[rem]; this.steps.push(this.snap(v,n,'Known node available',`Node ${v[idx]} is known.`,{current:idx},{known:idx},0,0));
      this.steps.push(this.snap(v,n,'Save successor',`The node ${v[rem]} will be removed. Save its successor ${succ===null?'null':v[succ]}.`,{current:idx,new:rem,saved:succ},{known:idx,removed:rem,successor:succ},0,0));
      const nn=[...n]; nn[idx]=succ; this.steps.push(this.snap(v,nn,'Bypass removed node',`Set known.next to the saved successor.`,{current:idx,new:rem,saved:succ},{known:idx,removed:rem,successor:succ},1,0));
      this.steps.push(this.snap(v,nn,'Deletion complete',`Node ${v[rem]} is unreachable from head; no remaining node moved.`,{current:idx,new:rem},{known:idx},1,0));
    }
    reverse(v,n){
      let next=[...n], prev=null, cur=0, writes=0, walk=0;
      this.steps.push(this.snap(v,next,'Initial state','previous = null, current = head.',{current:cur},{previous:prev,current:cur},writes,walk));
      while(cur!==null){const succ=next[cur]; this.steps.push(this.snap(v,next,'Save successor',`Save successor ${succ===null?'null':v[succ]} before changing current.next.`,{current:cur,saved:succ},{previous:prev,current:cur,successor:succ},writes,walk)); next=[...next]; next[cur]=prev; writes++; this.steps.push(this.snap(v,next,'Reverse one link',`Set ${v[cur]}.next to ${prev===null?'null':v[prev]}.`,{current:cur,new:cur,saved:succ},{previous:prev,current:cur,successor:succ},writes,walk)); prev=cur; cur=succ; walk++; this.steps.push(this.snap(v,next,'Advance pointers',`Move previous forward and continue with the saved successor.`,{current:cur,new:prev},{previous:prev,current:cur},writes,walk));}
      this.steps.push(this.snap(v,next,'Reversal complete',`previous points to the new head ${v[prev]}.`,{new:prev},{previous:prev,current:null},writes,walk));
    }
    order(s){const seen=new Set(), out=[]; let cur=0; while(cur!==null&&!seen.has(cur)){seen.add(cur);out.push(cur);cur=s.next[cur];} for(let j=0;j<s.values.length;j++) if(!seen.has(j)) out.push(j); return out;}
    render(){const s=this.steps[this.i], order=this.order(s); const cls=j=>j===s.marks.current?' is-current':j===s.marks.saved?' is-saved':j===s.marks.new?' is-new':''; this.root.querySelector('[data-role="stage"]').innerHTML=order.map(j=>`<div class="linked-list-viz__item"><div class="linked-list-viz__node${cls(j)}"><span>${s.values[j]}</span><small>${s.next[j]===null?'null':'next'}</small></div>${s.next[j]!==null?'<div class="linked-list-viz__arrow">→</div>':''}</div>`).join(''); this.root.querySelector('[data-role="pointers"]').innerHTML=Object.entries(s.ptr).map(([k,j])=>`<span><strong>${k}</strong> → ${j===null?'null':s.values[j]}</span>`).join(''); this.root.querySelector('[data-role="phase"]').textContent=s.phase; this.root.querySelector('[data-role="text"]').textContent=s.text; this.root.querySelector('[data-role="writes"]').textContent=s.writes; this.root.querySelector('[data-role="walk"]').textContent=s.walk; this.root.querySelector('[data-role="progress"]').textContent=`${this.i+1}/${this.steps.length}`; this.root.querySelector('[data-role="cost"]').textContent=this.op.value==='reverse'?'Time O(n) · space O(1)':'Known node: O(1)';}
    go(d){this.stop(); this.i=Math.max(0,Math.min(this.steps.length-1,this.i+d));this.render();}
    play(){if(this.timer)return this.stop(); if(this.i===this.steps.length-1)this.i=0; const b=this.root.querySelector('[data-action="play"]');b.textContent='Pause';this.timer=setInterval(()=>{if(this.i===this.steps.length-1)return this.stop();this.i++;this.render();},1100);}
    stop(){if(this.timer)clearInterval(this.timer);this.timer=null;const b=this.root.querySelector('[data-action="play"]');if(b)b.textContent='Play';}
    reset(){this.op.value='insert';this.index.value='1';this.value.value='25';this.root.querySelector('[data-role="index-label"]').hidden=false;this.root.querySelector('[data-role="value-label"]').hidden=false;this.prepare();}
  }
  function init(){const p=location.pathname.replace(/\/$/,''); if(!p.endsWith('/02-singly-linked-lists'))return; let root=document.querySelector('[data-linked-list-viz]'); if(!root){const h=[...document.querySelectorAll('.md-content h2')].find(x=>x.textContent.includes('Insertion after a known node')); if(!h)return; root=document.createElement('div');root.dataset.linkedListViz='';h.parentNode.insertBefore(root,h);} if(!root.dataset.initialised){root.dataset.initialised='true';new LinkedListViz(root);}}
  if(typeof document$!=='undefined')document$.subscribe(init);else document.addEventListener('DOMContentLoaded',init);
})();
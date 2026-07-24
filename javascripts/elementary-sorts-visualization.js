(() => {
  const INITIAL = [5, 2, 4, 2, 8, 1];

  class ElementarySortsVisualizer {
    constructor(root) {
      this.root = root;
      this.steps = [];
      this.index = 0;
      this.timer = null;
      this.renderShell();
      this.bind();
      this.prepare();
    }

    renderShell() {
      this.root.classList.add('ds-viz', 'sorts-viz');
      this.root.innerHTML = `
        <div class="ds-viz__header"><div><p class="ds-viz__eyebrow">Algorithm comparison</p><h3>Elementary sorting algorithms</h3></div><span class="ds-viz__complexity">worst case O(n²)</span></div>
        <div class="ds-viz__controls">
          <label>Algorithm<select data-role="algorithm"><option value="selection">Selection sort</option><option value="insertion">Insertion sort</option><option value="bubble">Bubble sort</option></select></label>
          <label>Values<input data-role="values" value="5, 2, 4, 2, 8, 1"></label>
          <button type="button" data-action="prepare">Prepare trace</button><button type="button" data-action="previous">Previous</button><button type="button" data-action="next">Next</button><button type="button" data-action="play">Play</button><button type="button" data-action="reset">Reset</button>
        </div>
        <div class="sorts-viz__stage" data-role="stage"></div>
        <div class="sorts-viz__legend"><span><i class="is-active"></i> compared</span><span><i class="is-candidate"></i> candidate / key</span><span><i class="is-sorted"></i> established sorted region</span></div>
        <div class="ds-viz__status"><strong data-role="title"></strong><span data-role="text"></span></div>
        <div class="ds-viz__metrics"><span>Comparisons: <strong data-role="comparisons">0</strong></span><span>Swaps: <strong data-role="swaps">0</strong></span><span>Shifts: <strong data-role="shifts">0</strong></span><span>Step: <strong data-role="progress">0/0</strong></span></div>`;
    }

    bind() {
      this.algorithm = this.root.querySelector('[data-role="algorithm"]');
      this.values = this.root.querySelector('[data-role="values"]');
      this.root.querySelector('[data-action="prepare"]').addEventListener('click', () => this.prepare());
      this.root.querySelector('[data-action="previous"]').addEventListener('click', () => this.go(-1));
      this.root.querySelector('[data-action="next"]').addEventListener('click', () => this.go(1));
      this.root.querySelector('[data-action="play"]').addEventListener('click', () => this.play());
      this.root.querySelector('[data-action="reset"]').addEventListener('click', () => { this.stop(); this.algorithm.value = 'selection'; this.values.value = INITIAL.join(', '); this.prepare(); });
    }

    parseValues() {
      const parsed = this.values.value.split(',').map(v => Number(v.trim()));
      if (!parsed.length || parsed.some(v => !Number.isFinite(v)) || parsed.length > 10) throw new Error('Enter 1–10 comma-separated numbers.');
      return parsed;
    }

    push(values, title, text, meta = {}) {
      this.steps.push({ values: [...values], title, text, active: [], candidate: [], sorted: [], comparisons: 0, swaps: 0, shifts: 0, ...meta });
    }

    selection(values) {
      let comparisons = 0, swaps = 0;
      this.push(values, 'Start selection sort', 'The sorted prefix is empty.');
      for (let boundary = 0; boundary < values.length - 1; boundary++) {
        let smallest = boundary;
        this.push(values, 'Choose a boundary', `Find the minimum in positions ${boundary}…${values.length - 1}.`, { candidate:[smallest], sorted:[...Array(boundary).keys()], comparisons, swaps });
        for (let i = boundary + 1; i < values.length; i++) {
          comparisons++;
          const previous = smallest;
          if (values[i] < values[smallest]) smallest = i;
          this.push(values, 'Compare with current minimum', `Compare ${values[i]} with ${values[previous]}.`, { active:[i], candidate:[smallest], sorted:[...Array(boundary).keys()], comparisons, swaps });
        }
        if (smallest !== boundary) { [values[boundary], values[smallest]] = [values[smallest], values[boundary]]; swaps++; }
        this.push(values, 'Place the minimum', `Position ${boundary} is now final.`, { active:[boundary, smallest], sorted:[...Array(boundary + 1).keys()], comparisons, swaps });
      }
      this.push(values, 'Sorted', 'The entire array is ordered.', { sorted:[...values.keys()], comparisons, swaps });
    }

    insertion(values) {
      let comparisons = 0, shifts = 0;
      this.push(values, 'Start insertion sort', 'The first element forms a sorted prefix.', { sorted:[0] });
      for (let boundary = 1; boundary < values.length; boundary++) {
        const key = values[boundary]; let i = boundary;
        this.push(values, 'Take the next key', `Save ${key} and open a position in the sorted prefix.`, { candidate:[boundary], sorted:[...Array(boundary).keys()], comparisons, shifts });
        while (i > 0) {
          comparisons++;
          this.push(values, 'Compare key with predecessor', `Compare ${values[i - 1]} with key ${key}.`, { active:[i - 1], candidate:[i], sorted:[...Array(boundary).keys()], comparisons, shifts });
          if (values[i - 1] <= key) break;
          values[i] = values[i - 1]; shifts++; i--;
          this.push(values, 'Shift right', `Move ${values[i]} one position right.`, { active:[i, i + 1], candidate:[i], sorted:[...Array(boundary).keys()], comparisons, shifts });
        }
        values[i] = key;
        this.push(values, 'Insert the key', `Place ${key} at index ${i}.`, { candidate:[i], sorted:[...Array(boundary + 1).keys()], comparisons, shifts });
      }
      this.push(values, 'Sorted', 'The sorted prefix now covers the entire array.', { sorted:[...values.keys()], comparisons, shifts });
    }

    bubble(values) {
      let comparisons = 0, swaps = 0;
      this.push(values, 'Start bubble sort', 'No sorted suffix has been established yet.');
      for (let end = values.length; end > 1; end--) {
        let swapped = false;
        for (let i = 0; i < end - 1; i++) {
          comparisons++;
          const sorted = [...Array(values.length - end).keys()].map(k => values.length - 1 - k);
          this.push(values, 'Inspect adjacent pair', `Compare ${values[i]} and ${values[i + 1]}.`, { active:[i, i + 1], sorted, comparisons, swaps });
          if (values[i] > values[i + 1]) {
            [values[i], values[i + 1]] = [values[i + 1], values[i]]; swaps++; swapped = true;
            this.push(values, 'Repair inversion', 'Swap the adjacent out-of-order values.', { active:[i, i + 1], sorted, comparisons, swaps });
          }
        }
        const sorted = [...Array(values.length - end + 1).keys()].map(k => values.length - 1 - k);
        this.push(values, 'Pass complete', `The maximum of the active region is fixed at index ${end - 1}.`, { sorted, comparisons, swaps });
        if (!swapped) break;
      }
      this.push(values, 'Sorted', 'No inversions remain.', { sorted:[...values.keys()], comparisons, swaps });
    }

    prepare() {
      this.stop();
      try {
        const values = this.parseValues(); this.steps = [];
        if (this.algorithm.value === 'selection') this.selection(values);
        else if (this.algorithm.value === 'insertion') this.insertion(values);
        else this.bubble(values);
        this.index = 0; this.render();
      } catch (error) {
        this.steps = [{ values:[], title:'Invalid input', text:error.message, active:[], candidate:[], sorted:[], comparisons:0, swaps:0, shifts:0 }]; this.index = 0; this.render();
      }
    }

    go(delta) { this.stop(); this.index = Math.max(0, Math.min(this.steps.length - 1, this.index + delta)); this.render(); }
    play() { if (this.timer) return this.stop(); if (this.index >= this.steps.length - 1) this.index = 0; this.root.querySelector('[data-action="play"]').textContent = 'Pause'; this.timer = setInterval(() => { if (this.index >= this.steps.length - 1) return this.stop(); this.index++; this.render(); }, 900); }
    stop() { if (this.timer) clearInterval(this.timer); this.timer = null; const b = this.root.querySelector('[data-action="play"]'); if (b) b.textContent = 'Play'; }

    render() {
      const s = this.steps[this.index]; const max = Math.max(1, ...s.values.map(v => Math.abs(v)));
      this.root.querySelector('[data-role="stage"]').innerHTML = `<div class="sorts-viz__bars">${s.values.map((v,i) => `<div class="sorts-viz__item ${s.active.includes(i)?'is-active':''} ${s.candidate.includes(i)?'is-candidate':''} ${s.sorted.includes(i)?'is-sorted':''}"><span class="sorts-viz__bar" style="--h:${Math.max(14, Math.abs(v)/max*100)}%"></span><strong>${v}</strong><small>${i}</small></div>`).join('')}</div>`;
      this.root.querySelector('[data-role="title"]').textContent = s.title;
      this.root.querySelector('[data-role="text"]').textContent = s.text;
      this.root.querySelector('[data-role="comparisons"]').textContent = s.comparisons;
      this.root.querySelector('[data-role="swaps"]').textContent = s.swaps;
      this.root.querySelector('[data-role="shifts"]').textContent = s.shifts;
      this.root.querySelector('[data-role="progress"]').textContent = `${this.index + 1}/${this.steps.length}`;
    }
  }

  const initialise = () => document.querySelectorAll('[data-elementary-sorts-viz]').forEach(root => { if (!root.dataset.initialised) { root.dataset.initialised = 'true'; new ElementarySortsVisualizer(root); } });
  if (typeof document$ !== 'undefined') document$.subscribe(initialise); else document.addEventListener('DOMContentLoaded', initialise);
})();
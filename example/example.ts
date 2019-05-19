import { loadWbFromFile, selectSheet, sheet2JSON, selectColumn, selectCell, allRowValues } from '../lib/index';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

;(() => {
  document
    .getElementById('file')
    .addEventListener('change', async (evt?: HTMLInputEvent) => {
      const file = evt.target.files[0]
      const wb = await loadWbFromFile(file)
      const sheet = selectSheet(0, wb)

      const [
        cellsEl, rowValuesEl, columnEl, jsonEl
      ] = ['.cells', '.row-values', '.column', '.json']
          .map((s) => document.querySelector(s))
      
      cellsEl.innerHTML = JSON.stringify(selectCell(['A1', 'B2', 'C2'], sheet))
      
      rowValuesEl.innerHTML = JSON.stringify(allRowValues(sheet)[2])

      columnEl.innerHTML = JSON.stringify(selectColumn({ A: 'type', B: 'code'}, sheet))

      jsonEl.innerHTML = JSON.stringify(sheet2JSON(sheet))
    })
})()
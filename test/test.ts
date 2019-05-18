import {  loadWbFromFile, selectSheet, sheet2JSON, selectColumn, selectCell } from '../index';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

;(() => {
  document
    .getElementById('file')
    .addEventListener('change', async (evt?: HTMLInputEvent) => {
      const file = evt.target.files[0]
      const wb = await  loadWbFromFile(file)
      const sheet = selectSheet(0, wb)
      console.log(44444, sheet, sheet2JSON(selectSheet(0, wb)));
      console.log(55555, selectColumn({ A: 'bizName', B: 'code' }, sheet));
      console.log(66666, selectCell('U2', sheet));
      Object.assign(window, { wb })
    })
})()
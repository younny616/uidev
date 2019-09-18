import * as helpers from './helpers';

;((def) => {
  def(window.Cafe24 = window.Cafe24 || {});
})((window) => {
  for (let f in helpers) {
    if(typeof helpers[f] === 'object' || typeof helpers[f] === 'function') {
      Cafe24[f] = helpers[f];
    } else {
      return;
    }
  }
});

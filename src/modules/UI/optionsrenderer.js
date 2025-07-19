// @ts-check
import UIManager from "./uimanager.js"; 

class OptionsRenderer {
  #ui;
  /**
   * @param {UIManager} uiManager - An instance of UIManager to perform DOM operations.
   */
  constructor(uiManager) {
    this.#ui = uiManager;
  }

  /**
   * Renders a list of options in the sidebar
   * @param {Node} parentElement - The DOM element where the options will be appended.
   * @param {Array<{name: string, value: string}>} options - An array of option objects, each with a name and value.
   *
   * */
  renderOptions(parentElement, options){
    


  }
}

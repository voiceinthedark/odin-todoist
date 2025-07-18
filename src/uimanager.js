// @ts-check
//
class UIManager {
  #container;
  /**
   * @param {Node} appContainer - Node element for the application container 
   * */
  constructor(appContainer) {
    this.#container = appContainer;
  }

  /**
   * @param {Node} parent - Parent element to add div to 
   * @param {string} cls - css class to add to div element
   * */
  addDiv(parent, cls) {
    const div = document.createElement('div');
    div.classList.add(cls);
    parent.appendChild(div);
  }

  /**
   * @param {string} type - type of node element
   * @param {Node} parent - parent node of the element 
   * @param {string} cls - css class of the element
   * @returns {Node} - created element
   * */
  addElement(type, parent, cls){
    const elem = document.createElement(type);
    elem.classList.add(cls);
    parent.appendChild(elem);

    return elem;

  }
}


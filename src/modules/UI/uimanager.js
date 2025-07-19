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

  /**
   * @param {Node} parent - parent element of the removed child 
   * @param {Node} element - the Element to be removed
   * @returns {[Node, number] | number} - returns an array containing the removed element and parent childs count
   * */
  removeElement(parent, element){
    if(parent.childNodes.length === 0){
      return 0;
    }
    const removed = parent.removeChild(element);
    const parentLength = parent.childNodes.length;

    return [removed, parentLength];
  }

  get container(){
    return this.#container;
  }
}

export default UIManager;

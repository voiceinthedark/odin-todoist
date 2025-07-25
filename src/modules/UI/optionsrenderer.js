// @ts-check
import UIManager from "./uimanager.js";

/**
 * @class OptionsRenderer
 * @classdesc A UI Renderer for the options on the website sidebar
 * @author voiceinthedark
 * */
class OptionsRenderer {
  #ui;
  /**
   * @class
   * @param {UIManager} uiManager - An instance of UIManager to perform DOM operations.
   */
  constructor(uiManager) {
    this.#ui = uiManager;
  }

  /**
   * Renders a list of options in the sidebar
   * @param {Node} parentElement - The DOM element where the options will be appended.
   * @param {Array<{name: string, icon: string, value: Function}>} options - An array of option objects, each with a name and value.
   *
   * */
  renderOptions(parentElement, options) {
    const optionsContainer = document.createElement("div");
    parentElement.appendChild(optionsContainer);

    const optionsList = this.#ui.addElement(
      "ul",
      optionsContainer,
      "options-list",
    );
    options.forEach((option) => {
      const optionItem = this.#ui.addElement("li", optionsList, "option-item");
      const optionButton = this.#ui.addElement(
        "button",
        optionItem,
        "option-button",
      );
      optionButton.textContent = option.name;
      if (optionButton instanceof HTMLButtonElement) {
        optionButton.innerHTML = `<span class="${option.name}"></span> ${option.name}`;
      }
      optionButton.addEventListener("click", () => {
        if (typeof option.value === "function") {
          option.value();
        } else {
          console.warn(`Option value for ${option.name} is not a function.`);
        }
      });
    });
    return optionsContainer;
  }
}

export default OptionsRenderer;

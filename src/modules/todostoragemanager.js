// @ts-check

/**
 * @class TodoStorageManager
 * @classdesc A Storage manager to add and get the todo lists
 * @author voiceinthedark@github.io.com
 * */
class TodoStorageManager {
  #storage;
  /**
   * @class
   * @param {Storage | object} storage
   * */
  constructor(storage) {
    if (
      !storage ||
      typeof storage.setItem !== "function" ||
      typeof storage.getItem !== "function"
    ) {
      throw new Error("Storage must implement setItem and getItem methods.");
    }
    this.#storage = storage;
  }

  /**
   * @method setItem saves an item to the storage
   * @param {string} key
   * @param {string} val
   * */
  setItem(key, val) {
    this.#storage.setItem(key, val);
  }

  /**
   * @method getItem get an item from the storage by key
   * @param {string} key
   * @returns {string | null}
   * */
  getItem(key) {
    return this.#storage.getItem(key);
  }

  /**
   * @method - set the storage type (default: localStorage)
   * @param {Storage} val - the storage window.localStorage (default), Firebase, etc
   * */
  set storage(val) {
    if (
      !val ||
      typeof val.setItem !== "function" ||
      typeof val.getItem !== "function"
    ) {
      throw new Error("Storage must implement setItem and getItem methods.");
    }
    this.#storage = val;
  }
}

/**
 * @exports a singleton instance of storageManager with default options
 * */
const storageManager = new TodoStorageManager(window.localStorage);
export default storageManager;

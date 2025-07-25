import AppController from "./modules/appController";
import "./styles/styles.css";
import "./styles/fontawesome.min.css";
import "./styles/regular.min.css";
import "./styles/solid.min.css";
import "./webfonts/fa-solid-900.ttf";

const appContainer = document.getElementById("container");

const appController = new AppController(appContainer);

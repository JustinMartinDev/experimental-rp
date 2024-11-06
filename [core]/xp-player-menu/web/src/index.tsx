import { render } from "preact";

import "./style.css";
import "@lib/preact-menu-ui/dist/style.css";

import { App } from "./app";

render(
  <App/>,
  document.getElementById("app")
);

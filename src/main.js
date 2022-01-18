import "./styles/global.css";
import App from "./components/App.svelte";

const app = new App({
  target: document.getElementsByTagName("body")[0],
});

export default app;

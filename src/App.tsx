import ReactLogo from "@/assets/react.svg?react";
import viteLogo from "/vite.svg";
import "./App.css";
import { useCountStore } from "./store/store";
function App() {
  const count = useCountStore.use.count();
  const { increase, decrease } = useCountStore.use.actions();
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <ReactLogo />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increase}>increase : count is {count}</button>
        <button onClick={decrease}>decrease : count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

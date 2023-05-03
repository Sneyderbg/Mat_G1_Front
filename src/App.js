import "./App.css";
import { MainPage } from "./components/MainPage";
import cfg from "./config.json";

function App() {
  return (
    <div>
      <MainPage cfg={cfg}></MainPage>
    </div>
  );
}

export default App;

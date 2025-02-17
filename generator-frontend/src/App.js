import "./App.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageGenerator from "./components/ImageGenerator";
import RecipeGenerator from "./components/RecipeGenerator";

function App() {
  return (
    <div className="App flex flex-col items-center justify-center">
      <Tabs
        defaultActiveKey="image"
        id="justify-tab"
        className="mb-3 mt-6 w-50"
        justify
      >
        <Tab eventKey="image" title="Image-Generator" className="bold">
          <ImageGenerator/>
        </Tab>
        <Tab eventKey="recipe" title="Recipe Generator">
          <RecipeGenerator/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;

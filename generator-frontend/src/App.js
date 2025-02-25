import "./App.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageGenerator from "./components/ImageGenerator";
import RecipeGenerator from "./components/RecipeGenerator";
import { IoChatboxEllipses } from "react-icons/io5";
import { React, useState } from "react";
import ChatComponent from "./components/ChatComponent";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <div className="App flex flex-col items-center justify-center">
      <Tabs
        defaultActiveKey="image"
        id="justify-tab"
        className="mb-3 mt-6 w-50"
        justify
      >
        <Tab eventKey="image" title="Image-Generator" className="bold w-full">
          <ImageGenerator />
        </Tab>
        <Tab eventKey="recipe" title="Recipe Generator" className="w-full">
          <RecipeGenerator />
        </Tab>
      </Tabs>
      <IoChatboxEllipses
        className="w-16 h-16 text-blue-500 mt-2 fixed bottom-6 right-6 cursor-pointer"
        onClick={() => setIsChatOpen(!isChatOpen)}
      />

      {isChatOpen && (
        <ChatComponent setIsChatOpen={setIsChatOpen} />
      )}
    </div>
  );
}

export default App;

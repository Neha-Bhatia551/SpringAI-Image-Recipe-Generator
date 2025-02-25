import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import '../App.css';
import Spinner from "react-bootstrap/Spinner"; // Import Spinner


const ImageGenerator = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [numberOfImages, setNumberOfImages] = useState("1");
  const [loading, setLoading] = useState(false); // Loading state

  const generateImage = async () => {
    console.log(
      "Generating image with prompt: ",
      prompt + "number of images: ",
      numberOfImages
    );
    if(numberOfImages < 1 || numberOfImages > 4) {
      alert("Please select a number between 1 and 4");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/generate-images-with-options?prompt=${prompt}&n=${numberOfImages}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // Assuming the response is JSON
      console.log("Generated images: ", data);
  
      setImageUrls(data);
    } catch (error) {
      console.error("Error generating image: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-[90%] sm:max-w-[700px] lg:max-w-[900px] mx-auto mt-10 p-4">
      <h2 className="flex items-center justify-center">Generate an Image</h2>
      <InputGroup className="mb-3 mt-8">
        <Form.Control
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for image generation"
        />
      </InputGroup>
      <Form.Label>Select Number of Images you need</Form.Label>
      <Form.Select
        size="sm"
        onChange={(e) => setNumberOfImages(e.target.value)}
      >
        <option value="1" selected>
          One
        </option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      {/* Show spinner if loading */}
      {loading ? (
        <div className="flex justify-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Button variant="dark" className="mt-3" onClick={generateImage} disabled={loading}>
          Generate Image
        </Button>
      )}

      <CardGroup className="mt-4 card-group1">
        {imageUrls.map((url, index) => (
          // <Image key={index} src={url} rounded />
          <div className="m-3 w-full h-full">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Card.Img variant="top" src={url} />
            </a>
          </div>
        ))}
      </CardGroup>
    </div>
  );
};

export default ImageGenerator;

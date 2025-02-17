import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const ImageGenerator = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [numberOfImages, setNumberOfImages] = useState("1");
  const generateImage = async () => {
    console.log("Generating image with prompt: ", prompt + "number of images: ", numberOfImages);
    try {
      const response = await fetch(
        `http://localhost:8080/generate-images-with-options?prompt=${prompt}&n=${numberOfImages}`
      );
    } catch (error) {
      console.error("Error generating image: ", error);
    }
  };
  return (
    <div className="w-[898px] mt-10">
      <h2 className="flex items-center justify-center">Generate an Image</h2>
      <InputGroup className="mb-3 mt-8">
        <Form.Control
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for image generation"
        />
      </InputGroup>
      <Form.Label>Select Number of Images you need</Form.Label>
        <Form.Select size="sm" onChange={(e) => setNumberOfImages(e.target.value)}>
          <option value="1" selected>One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      <Button variant="dark" className="mt-3" onClick={generateImage}>
        Generate Image
      </Button>
      <div className="image-urls">
        {imageUrls.map((url, index) => (
          <Image key={index} src={url} rounded />
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;

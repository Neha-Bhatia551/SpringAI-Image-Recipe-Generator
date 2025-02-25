import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const createRecipe = async () => {
    console.log(
      "Generating recipe with ingredients: " +
        ingredients +
        " restrictions: " +
        restrictions +
        " cuisine: " +
        cuisine
    );

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/recipe-creator?ingredients=${ingredients}&dietRestrictions=${restrictions}&cusine=${cuisine}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text(); // Assuming the response is JSON
      console.log("Generated recipe: ", data);

      setRecipe(data);
    } catch (error) {
      console.error("Error generating recipe  : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[90%] sm:max-w-[700px] lg:max-w-[900px] mx-auto mt-10 p-4">
      <h2 className="flex items-center justify-center">Generate a Recipe</h2>
      <InputGroup className="mb-3 mt-8">
        <Form.Control
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
        />
      </InputGroup>
      <InputGroup className="mb-3 mt-8">
        <Form.Control
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Enter cuisine"
        />
      </InputGroup>
      <InputGroup className="mb-3 mt-8">
        <Form.Control
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
          placeholder="Please enter any dietary restrictions"
        />
      </InputGroup>
      {/* Show spinner if loading */}
      {loading ? (
        <div className="flex justify-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Button
          variant="dark"
          className="mt-3"
          onClick={createRecipe}
          disabled={loading}
        >
          Generate Recipe
        </Button>
      )}
      <div className="output flex items-center justify-center">
        <pre className="recipe-text">{recipe}</pre>
      </div>
    </div>
  );
};

export default RecipeGenerator;

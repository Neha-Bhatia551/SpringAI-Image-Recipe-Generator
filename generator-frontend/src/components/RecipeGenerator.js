import {React, useState} from 'react'

const RecipeGenerator = () => {
  const[ingredients, setIngredients] = useState("");
  const[restrictions, setRestrictions] = useState("");
  const[cuisine, setCuisine] = useState(""); 
  const[recipe, setRecipe] = useState(" ");
  return (
    <div className="w-full max-w-[90%] sm:max-w-[700px] lg:max-w-[900px] mx-auto mt-10 p-4">
      <h2 className="flex items-center justify-center">Generate a Recipe</h2>
    </div>
  )
}

export default RecipeGenerator

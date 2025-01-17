import { useEffect, useState } from "react";
import type { Route } from "./+types/macros";

import { getMacros } from "~/utils/GetMacros";
import { useLocation, useParams, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "macros" },
    { name: "description", content: "the macros of the food" },
  ];
}

// const [foodDescriptionState, setFoodDescription] = useState("")

export async function clientLoader({params}: Route.LoaderArgs) {
  console.log("loader called")
  const foodDescription = params.foodDescription

  return await getMacros(foodDescription)
  // return {
  //   protein: 500,
  //   calories: 400,
  // }
}

export function hydrateFallback() {
  return (
    <div>
      <text>test</text>
    </div>
  )
}

export default function Macros({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate()
  const {foodDescription} = useParams()
  const [calories, setCalories] = useState(1000)
  const [protein, setProtein] = useState(1000)

  useEffect(() => {
    if (loaderData?.calories && loaderData?.protein) {
      setCalories(loaderData.calories)
      setProtein(loaderData.protein)

    }
  }) 

  const goToHomePage = () => {
    // Navigate to the home page and replace the history
    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-8">
        <h1 className="font-bold text-4xl">Macros</h1>
        <p> Prompt: {foodDescription} </p>
        
        <div className="flex flex-col items-center gap-2 border-4 border-purple-600 rounded-md px-4 py-1">
          <p>Calories: {calories}</p>
          <p>Protein: {protein}</p>
        </div>
        
        <button 
          onClick={goToHomePage}
          className="bg-violet-600 hover:bg-violet-700 w-1/2 max-w-24 rounded-full h-10 focus:outline-none focus:ring focus:ring-violet-400 font-bold transition-all duration-100"

        >Ok</button>
    </div>
  )
}

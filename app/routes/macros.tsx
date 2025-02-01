import { useEffect, useState } from "react";
import type { Route } from "./+types/macros";
import { useParams, useNavigate } from "react-router";
import HashLoader from "react-spinners/HashLoader";

import { getMacros } from "~/utils/GetMacros";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "macros" },
    { name: "description", content: "the macros of the food" },
  ];
}

interface ProteinAndCalories {
  protein: number,
  calories: number,
}

function testingMacros(): Promise<ProteinAndCalories> {
  return new Promise((res) => {
    setTimeout(() => res({
      protein: 20,
      calories: 100,
    })
  , 2000)})
}

function MacrosWidget({protein, calories}: {protein: number, calories: number}) {

  return (
    <div className="flex flex-col items-center gap-2 border-4 border-purple-600 rounded-md px-4 py-1">
      <p>Calories: {calories}</p>
      <p>Protein: {protein}</p>
    </div>
  )
}

export default function Macros() {
  const navigate = useNavigate()
  const {foodDescription} = useParams()
  const [calories, setCalories] = useState(0)
  const [protein, setProtein] = useState(0)
  const [isLoaded, setLoaded] = useState(false)

  const goToHomePage = () => {
    navigate('/', { replace: true });
  };

  async function loadMacros(description: string) {
    try {
      // const result = await testingMacros()
      const result = await getMacros(description)
      if (result) {
        setProtein(result.protein)
        setCalories(result.calories)
        setLoaded(true)
      }
      
    } catch (error) {
      console.error('Error fetching macros:', error);
    }
  }

  useEffect(() => {
    setLoaded(false)
    if (foodDescription !== undefined) {
      loadMacros(foodDescription)
    }
  }, [foodDescription])


  return (
    
    <div className="flex flex-col items-center mt-10 gap-8">
       <h1 className="font-bold text-4xl">Macros</h1>
       <p> Prompt: {foodDescription} </p>
    
       <div className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-1000 ${
          isLoaded? "max-h-64" : "max-h-0"
        }`}>
          <MacrosWidget calories={calories} protein={protein}/>
          <button 
            onClick={goToHomePage}
            className="bg-violet-600 hover:bg-violet-700 w-1/2 max-w-24 rounded-full h-10 focus:outline-none focus:ring focus:ring-violet-400 font-bold transition-all duration-100"

          >Ok</button>
        </div>
        <HashLoader
          color={"#9d00ff"}
          loading={!isLoaded}
          size={50}
        />
       
  </div>
  )
}


// {isLoaded ? (
//   <div className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-500 ${
//     isLoaded? "max-h-64" : "max-h-0"
//   }`}>
//     <MacrosWidget calories={calories} protein={protein}/>
//     <button 
//       onClick={goToHomePage}
//       className="bg-violet-600 hover:bg-violet-700 w-1/2 max-w-24 rounded-full h-10 focus:outline-none focus:ring focus:ring-violet-400 font-bold transition-all duration-100"

//     >Ok</button>
//   </div>
// ) : (
//  <HashLoader
//   color={"#9d00ff"}
//   loading={true}
//   size={50}
//  />
// )}
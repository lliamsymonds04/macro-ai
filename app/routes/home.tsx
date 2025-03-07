import { NavLink, redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Macro AI" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const buttons = [
  {label: "input food", page: "/input_food"},
  {label: "use camera", page: "/camera"}
]

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-10 gap-5">
      <h1 className="font-bold text-4xl">Macro AI</h1>
      <p className="text-center max-w-fit">Use AI to determine calories and protein of food</p>
      <div/>
      
      {buttons.map((button, index) => (
        <NavLink 
          key={index}
          to={button.page}
          className="bg-violet-600 hover:bg-violet-700 w-1/2 max-w-52 rounded-full h-10 focus:outline-none focus:ring focus:ring-violet-400 font-bold flex items-center justify-center transition-all duration-100"
        >{button.label}</NavLink>
      ))}
    </div>
  )
}
import { NavLink } from "react-router";
import type { Route } from "./+types/input_food";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "input food" },
    { name: "description", content: "describe the food" },
  ];
}

export default function Test() {
  return (
    <div className="flex flex-col items-center mt-10 gap-8">
        <h1 className="font-bold text-4xl">Input Food</h1>
        <input 
          type="text" 
          placeholder="type here"
          
          className="bg-slate-50 placeholder-slate-500 rounded-full text-black w-5/6 max-w-96 text-center"
        />

        <NavLink
          to="/test"
          className="bg-violet-600 hover:bg-violet-700 w-1/3 max-w-36 rounded-full h-8 focus:outline-none focus:ring focus:ring-violet-400 font-bold flex items-center justify-center transition-all duration-100"
        >
          Submit
        </NavLink>
    </div>
  )
}

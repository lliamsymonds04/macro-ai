import type { Route } from "./+types/test";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "test" },
    { name: "description", content: "testing!" },
  ];
}

export default function Test() {
  return (
    <div>
        <h1>IT WORKED</h1>
    </div>
  )
}

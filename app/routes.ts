import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/test", "routes/test.tsx"),
    route("/input_food", "routes/input_food.tsx"),
    route("/camera", "routes/camera.tsx"),
    route("/macros/:foodDescription", "routes/macros.tsx")
] satisfies RouteConfig;

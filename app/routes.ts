import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./components/page-layout.tsx", [
    index("./routes/home.tsx"),
    route("/exhibitions", "./routes/exhibitions.tsx"),
    route("/exhibitions/:id", "./routes/exhibition-details.tsx"),
  ])
] satisfies RouteConfig;

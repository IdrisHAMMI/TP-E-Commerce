import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("articles", [
        index("routes/articles.tsx"),
        route(":articleId", "routes/articles/articles-details.tsx"),
    ]),
    route("cart", "routes/cart.tsx"),
    route("login", "routes/login.tsx"),
    route("admin", "routes/admin.tsx"),
] satisfies RouteConfig;


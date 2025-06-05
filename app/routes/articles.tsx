import type { Route } from "./+types/home";
import  ArticlesView from "../pages/ArticlesView/ArticlesView";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-Commerce App" },
    { name: "description", content: "E-Commerce App TP" },
  ];
}

export default function Articles() {
  return <ArticlesView />;
}

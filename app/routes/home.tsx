import type { Route } from "./+types/home";
import  HomeView from "../pages/HomeView/HomeView"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-Commerce App" },
    { name: "description", content: "E-Commerce App TP" },
  ];
}

export default function Home() {
  return <HomeView />;
}

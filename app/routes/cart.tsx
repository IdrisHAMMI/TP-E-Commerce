import type { Route } from "./+types/home";
import  CartView from "../pages/CartView/CartView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-Commerce App" },
    { name: "description", content: "E-Commerce App TP" },
  ];
}

export default function Articles() {
  return <CartView />;
}

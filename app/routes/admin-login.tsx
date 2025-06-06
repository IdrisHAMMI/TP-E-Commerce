import type { Route } from "./+types/home";
import AdminLoginView from "../pages/AdminLoginView/AdminLoginView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-Commerce App" },
    { name: "description", content: "E-Commerce App TP" },
  ];
}
1
export default function Home() {
  return <AdminLoginView />;
}

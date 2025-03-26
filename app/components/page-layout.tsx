import { Outlet } from "react-router";
import { Header } from "./header";

export default () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

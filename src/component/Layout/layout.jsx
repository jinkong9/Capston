import React from "react";
import Nav from "../Nav/nav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

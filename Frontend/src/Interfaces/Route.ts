import { Component } from "react";

// import JsxInr
interface Route {
  index: boolean;
  path: string;
  title: string;
  element?: React.FC;
}
export default Route;

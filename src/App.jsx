import "./App.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/404";
import Dashboard from "./pages/Dashboard";

function App() {
  const AlocaRouter = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={AlocaRouter} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import RootLayout from "./Routes/RootLayout";
import Main, { loader as mainLoader } from "./Components/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Main />, loader: mainLoader }],
  },
]);
const App = () => <RouterProvider router={router} />;
export default App;

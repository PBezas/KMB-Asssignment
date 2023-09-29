import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import RootLayout from "./Routes/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);
const App = () => <RouterProvider router={router} />;
export default App;

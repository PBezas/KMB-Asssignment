import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import RootLayout from "./Routes/RootLayout";
import MainPage, { loader as mainPageLoader } from "./Components/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "main-page", element: <MainPage />, loader: mainPageLoader }],
  },
]);
const App = () => <RouterProvider router={router} />;
export default App;

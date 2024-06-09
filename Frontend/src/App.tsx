import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import paths from "./paths";
import viteLogo from "/vite.svg";
import { QueryClientProvider, QueryClient } from "react-query";
import RootLayout from "./Layouts/RootLayout";
import "./App.css";
import Background from "./Theme/BackgroundWrapper";
import HomePage from "./View/HomePage/HomePageView";
import ContactUsPage from "./View/ContactUs/ContactUsPage";
import KatnarPage from "./View/Katnar/KatnarPage";

const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Typography variant="h1">Error 404</Typography>,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: paths.APPLICATIONS,
          element: <Typography variant="h1">אפליקציות</Typography>,
        },
        {
          path: paths.INFO_SITES,
          element: <Typography variant="h1">אתרי ידע</Typography>,
        },
        {
          path: paths.KATNAR,
          element: <KatnarPage />,
        },
        {
          path: paths.CONTACT_US,

          element: <ContactUsPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

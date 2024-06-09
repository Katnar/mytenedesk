import { AppBar, Box, Button, Menu, Toolbar, Typography } from "@mui/material";
import tenelogo from "../assets/images/tenelogo.png";
import team100 from "../assets/images/team100_white.png";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import Background from "../Theme/BackgroundWrapper";

const routes = [
  // {
  //   title: 'חיל הטנ"א',
  //   path: "/",
  // },
  {
    title: 'דבר קטנא"ר',
    path: "/katnar",
  },
  {
    title: "אפליקציות",
    path: "/applications",
  },
  {
    title: "אתרי ידע",
    path: "/infosites",
  },
  {
    title: "צור קשר",
    path: "/contactus",
  },
];
const barBackground = "linear-gradient(90deg, #004AAD 0%, #5DE0E6 100%)";

const team100Box = (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      left: 0,
      display: "flex",
      padding: 1,
      maxWidth: "25%",
    }}
  >
    <Box
      component="img"
      src={team100}
      sx={{
        height: 100,
        width: 100,
      }}
    />
    <Typography variant="h4">פותח ע”י צוות מא”ה מדור מערכות מידע</Typography>
  </Box>
);
const RootLayout: React.FC = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  console.log(location);
  const appbar = (
    <AppBar
      sx={{
        padding: 1,
        background: barBackground,
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src={tenelogo}
          sx={{
            height: 60,
            width: 60,
          }}
        />
        <Button
          color="inherit"
          href={"/"}
          size="large"
          sx={{
            marginLeft: 10,
            fontSize: 30,
            fontWeight: "bold",
            color: pathname === "/" ? "black" : "inherit",
          }}
        >
          חיל הטנ"א
        </Button>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-around",
          }}
        >
          {routes.map((route) => (
            <Button
              href={route.path}
              size="large"
              sx={{
                marginLeft: 10,
                fontSize: 22,
                fontWeight: "bold",
                color: pathname === route.path ? "black" : "inherit",
              }}
            >
              {route.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
  return (
    <>
      {appbar}
      <Toolbar />
      <Outlet />
      {team100Box}
    </>
  );
};

export default RootLayout;

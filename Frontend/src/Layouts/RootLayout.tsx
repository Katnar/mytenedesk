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
      right: 0,
      display: "flex",
      padding: 1,
      maxWidth: "20%",
      color:"white"
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={team100}
        sx={{
          height: 50,
          width: 50,
        }}
      />
    </Box>
    <Box>
      <Typography variant="h5">פותח ע”י צוות מא”ה</Typography>
      <Typography variant="h5">מדור מערכות מידע</Typography>
    </Box>
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
        backgroundImage: barBackground,
        boxShadow:"none"
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

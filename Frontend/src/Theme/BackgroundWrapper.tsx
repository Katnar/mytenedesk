import { Box } from "@mui/material";
import { ReactNode } from "react";
import diamonds1 from "../assets/images/background_diamonds_big.png";
interface iBackgroundLayout {
  children: ReactNode | ReactNode[];
}
const Background: React.FC<iBackgroundLayout> = ({ children }) => {
  return (
    <Box position="relative">
      <Box
        sx={{
          position: "absolute",
          // top: "0px",
          // left: "0px",
          height: "100vh",
          width: "100vw",
          backgroundImage: `url(${diamonds1}), url(${diamonds1})`,
          backgroundSize: "250px 250px, 250px 250px",
          backgroundPosition: "left -125px bottom 100px, top 0px right 0px",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        {children}
      </Box>
      {/* <Box
        component="img"
        src={diamonds1}
        sx={{
          position: "absolute",
          width: "250px",
          left: "-125px",
          bottom: "100px",

          // zIndex: "relative",
        }}
      />
      <Box
        component="img"
        src={diamonds1}
        sx={{
          position: "absolute",
          width: "250px",
          top: "0px",
          right: "0px",
          // zIndex: "relative",
        }}
      /> */}
    </Box>
  );
};
export default Background;

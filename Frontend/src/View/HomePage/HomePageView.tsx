import { Box, Fade, Typography } from "@mui/material";
import tankbg from "../../assets/images/tankbg.png";
import flagbg from "../../assets/images/flagbg.png";
import sunsetbg from "../../assets/images/sunsetbg.png";
import soildersbg from "../../assets/images/soildersbg.png";
import SwitchingImage from "../../Components/ImagesCompoments/SwitchingImage";

const HomePage: React.FC = () => {
  return (
    <>
      <SwitchingImage
        switchTimeout={5000}
        transitionTimeout={2500}
        srcs={[tankbg, flagbg, soildersbg, sunsetbg]}
        sx={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          top: "0",
          left: "0",
          clipPath: "polygon(0% 100%, 30% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <Box
        position="absolute"
        sx={{
          paddingRight: 2,
          paddingTop: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
          }}
        >
          פורטל חיל הטכנולוגיה והאחזקה
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          שלום, (שם משתמש)
        </Typography>
      </Box>
    </>
  );
};

export default HomePage;

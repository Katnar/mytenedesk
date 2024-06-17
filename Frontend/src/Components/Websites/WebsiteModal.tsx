import React from "react";
import Website from "../../Interfaces/Website";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface Props {
  website: Website;
}
const WebsiteModal: React.FC<Props> = ({ website }) => {
  const navigate = useNavigate();
  const { _id, name, link, imagePath, teneDesk } = website;

  return (
    <Link to={link} style={{ textDecoration: "none", color: "white" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          padding: 3,
          "&:hover": {
            backgroundColor: "rgba(211, 211, 211,0.5)",
            color: "black",
          },
        }}
      >
        <Box
          component="img"
          src={imagePath}
          sx={{
            marginBottom: 1,
            height: "70px",
            width: "70px",
            // borderRadius: "50%",
            objectFit: "cover",
            // border: "2px solid white",
            // boxShadow: "0 0 5px white",
            filter: "drop-shadow(0 0 5px white)",
          }}
        />
        <Typography variant="h5">{name}</Typography>
      </Box>
    </Link>
  );
};

export default WebsiteModal;

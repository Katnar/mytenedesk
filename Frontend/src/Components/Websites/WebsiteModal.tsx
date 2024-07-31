import React, { useState } from "react";
import Website from "../../Interfaces/Website";
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import WebsiteForm from "../../Forms/Website/WebsiteForm";

interface Props {
  website: Website;
}
const WebsiteModal: React.FC<Props> = ({ website }) => {
  const navigate = useNavigate();
  const { _id, name, link, imagePath, teneDesk } = website;
  const [isEdit, setIsEdit] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const openEdit = () => {
    setIsEdit(true);
  };
  const closeEdit = () => {
    setIsEdit(false);
  };

  return (
    <>
      <Box
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          padding: 1,
          "&:hover": {
            backgroundColor: "rgba(211, 211, 211,0.25)",
            // color: "black",
          },
        }}
      >
        <Tooltip
          title={`ערוך ${teneDesk ? "אפליקציה" : "אתר ידע"} ${website.name}`}
          arrow
        >
          <IconButton
            sx={{
              alignSelf: "self-end",
              color: isHover ? "black" : "rgba(0,0,0,0)",
            }}
            onClick={openEdit}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Link to={link} style={{ textDecoration: "none", color: "white" }}>
          <Box
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: isHover ? "black" : "white",
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
      </Box>

      <Dialog open={isEdit} onClose={closeEdit} maxWidth="md" fullWidth>
        <DialogContent>
          <WebsiteForm isEdit={true} teneDesk={teneDesk} website={website} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WebsiteModal;

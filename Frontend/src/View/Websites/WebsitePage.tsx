import React, { useState } from "react";
import Website from "../../Interfaces/Website";
import {
  Autocomplete,
  Grid,
  Stack,
  TextField,
  InputAdornment,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import WebsiteModal from "../../Components/Websites/WebsiteModal";
import WebsiteForm from "../../Forms/Website/WebsiteForm";

interface Props {
  teneDesk: boolean;
}

const WebsitePage: React.FC<Props> = ({ teneDesk }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<String>("");
  console.log(search);
  const websites: Website[] = [
    {
      _id: "1",
      name: "יוטיוב",
      link: "https://www.youtube.com/",
      imagePath: "https://cdn-icons-png.flaticon.com/256/1384/1384060.png",
      teneDesk: true,
    },
    {
      _id: "2",
      name: "גוגל",
      link: "https://www.google.com/",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
      teneDesk: true,
    },
    {
      _id: "3",
      name: "פייסבוק",
      link: "https://www.facebook.com/",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      teneDesk: true,
    },
    {
      _id: "4",
      name: "טויטר",
      link: "https://www.twitter.com/",
      imagePath:
        "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_twitter-512.png",
      teneDesk: true,
    },
    {
      _id: "5",
      name: "אינסטגרם",
      link: "https://www.instagram.com/",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      teneDesk: true,
    },
    {
      _id: "6",
      name: "לינקד-אין",
      link: "https://www.linkedin.com/",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      teneDesk: true,
    },
    {
      _id: "7",
      name: "ויקיפדיה",
      link: "https://www.wikipedia.org/",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png",
      teneDesk: true,
    },
    {
      _id: "8",
      name: "אמזון",
      link: "https://www.amazon.com/",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
      teneDesk: true,
    },
    {
      _id: "9",
      name: "רדית",
      link: "https://www.reddit.com/",
      imagePath:
        "https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png",
      teneDesk: true,
    },
    {
      _id: "10",
      name: "נטפליקס",
      link: "https://www.netflix.com/",
      imagePath:
        "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png",
      teneDesk: true,
    },
  ];
  const teneDeskWebsites = websites.filter(
    (website) =>
      website.teneDesk === teneDesk &&
      (search && search.trim() !== "" ? website.name.includes(search) : true)
  );
  return (
    <Stack direction={"column"} padding={10}>
      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <WebsiteForm />
        </DialogContent>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
          gap: 2,
          position: "sticky",
          top: "120px",
          zIndex: 10,
        }}
      >
        {/* <Box
          sx={{
            //   display: "flex",
            //   justifyContent: "flex-start",
            //   alignContent: "stretch",
            backgroundColor: "white",
            color: "black",
            borderRadius: 10,
            padding: 1,
            width: "30%",
            // width: "100%",
          }}
        > */}
        <Autocomplete
          renderOption={(props, option) => {
            return (
              <Typography
                variant="subtitle1"
                {...props}
                sx={{ color: "black" }}
              >
                {option}
              </Typography>
            );
          }}
          id="websites_search_bar"
          options={teneDeskWebsites.map((web) => web.name)}
          //   getOptionLabel={(option) => option.name}
          value={search}
          onChange={(event, newValue) => {
            setSearch(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                backgroundColor: "white",
                borderRadius: 10,
                width: 400,
                input: {
                  color: "black",
                  width: "100%",
                },
              }}
              id="website_searchfield"
              placeholder="חפש אתר"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                // {...params.InputProps}
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          )}
        />
        {/* </Box> */}
        <IconButton
          onClick={() => {
            setIsFormOpen(true);
          }}
          sx={{
            color: "white",
            borderWidth: 2,
            borderColor: "white",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {teneDeskWebsites.map((website) => (
          <Grid item xs={3}>
            <WebsiteModal website={website} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default WebsitePage;

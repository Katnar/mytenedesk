import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Icon,
} from "@mui/material";

import Katnar from "../../assets/images/Katnar.png";
const KatnarPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: 10,
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%,",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={3} padding={2}>
              <Box
                component={"img"}
                src={Katnar}
                width={"100%"}
                // alignSelf={"center"}
                borderRadius={2}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography fontSize={28}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vulputate nulla at ante rhoncus, vel efficitur felis
                condimentum. Proin odio odio. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Duis vulputate nulla at ante
                rhoncus, vel efficitur felis condimentum. Proin odio odio.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vulputate nulla at ante rhoncus, vel efficitur felis
                condimentum. Proin odio odio.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Duis vulputate nulla at ante
                rhoncus, vel efficitur felis condimentum. Proin odio odio.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vulputate nulla at ante rhoncus, vel efficitur felis
                condimentum. Proin odio odio.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KatnarPage;

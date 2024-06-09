import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Icon,
} from "@mui/material";
import PhoneIconPic from "../../assets/images/PhoneIconPic.png";
// import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { SxProps } from "@mui/material";
const ContactUsPage: React.FC = () => {
  const iconStyle: SxProps = {
    fontSize: 50,
  };
  const data = [
    {
      text: "technology.idf",
      icon: <InstagramIcon sx={iconStyle} />,
    },
    {
      text: "*9626",
      icon: <PhoneIcon sx={iconStyle} />,
    },
    {
      text: "052-7381356",
      icon: <WhatsAppIcon sx={iconStyle} />,
    },
    {
      text: "‘חיל הטכנולוגיה והאחזקה’",
      icon: <FacebookIcon sx={iconStyle} />,
    },
    {
      text: "לפנייה ישירה לחמ”ל זמינות",
      icon: <MailOutlineIcon sx={iconStyle} />,
    },
    {
      text: "פנייה ישירה לחדשנות",
      icon: <MailOutlineIcon sx={iconStyle} />,
    },
    {
      text: "פנייה ישירה לאחזקות בתעשייה",
      icon: <MailOutlineIcon sx={iconStyle} />,
    },
  ];
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
            <Grid item xs={6}>
              <Stack direction="column" alignItems="center" color="#051D40">
                <Box
                  component={"img"}
                  src={PhoneIconPic}
                  sx={{
                    height: 200,
                    width: 200,
                  }}
                />
                <Typography variant="h1" textAlign={"center"}>
                  צור איתנו{" "}
                </Typography>
                <Typography variant="h1" textAlign={"center"}>
                  קשר!{" "}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              {data.map((element) => (
                <Stack direction={"row"} marginBottom={1}>
                  <Icon
                    children={element.icon}
                    sx={{
                      fontSize: 50,
                    }}
                  />
                  <Typography variant="h4" marginRight={2}>
                    {element.text}
                  </Typography>
                </Stack>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactUsPage;

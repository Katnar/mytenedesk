import {
  TextField,
  Typography,
  Button,
  Stack,
  Box,
  Icon,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from "react-hook-form";
// import { RegisterOptions, UseFormRegister } from "react-hook-form";
import WebsiteFormFields from "../../Interfaces/WebsiteFromFields";
// import FileInput from "../../Components/Inputs/FileInput/FileInputNew";
import FileInput from "../../Components/Inputs/FileInput/FileInput";
import Website from "../../Interfaces/Website";
import ImageIcon from "@mui/icons-material/Image";

interface WebsiteFormProps {
  isEdit: boolean;
  teneDesk: boolean;
  website?: Website;
}
const WebsiteForm: React.FC<WebsiteFormProps> = ({
  isEdit,
  teneDesk,
  website,
}) => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<WebsiteFormFields>({
    defaultValues: {
      name: isEdit && website ? website.name : "",
      link: isEdit && website ? website.link : "",
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<WebsiteFormFields> = (data) => {
    console.log("served");
    console.log(data);
  };
  const IsImageFileValid = (file: File) =>
    file &&
    (file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg");

  const title = isEdit
    ? teneDesk
      ? "עריכת אפליקציה"
      : "עריכת אתר ידע"
    : teneDesk
    ? "יצירת אפליקציה"
    : "יצירת אתר ידע";

  const image = watch("image");

  const imageCompoment =
    image && IsImageFileValid(image) && !errors.image ? (
      <Box
        component="img"
        src={URL.createObjectURL(image)}
        sx={{
          marginTop: 2,
          alignSelf: "center",
          maxWidth: "100%",
          maxHeight: "200px",
        }}
      />
    ) : (
      <Icon
        children={<ImageIcon sx={{ fontSize: 50 }} />}
        sx={{ alignSelf: "center", color: "#051D40", fontSize: 50 }}
      />
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input className="MuiTextField-root" aria-label="label"/> */}
      <Stack direction={"column"} gap={2} paddingY={2} width={"100%"}>
        <Typography sx={{ alignSelf: "center" }} variant="h3">
          {title}
        </Typography>
        <Stack alignItems={"center"} direction={"row"} gap={2} width={"100%"}>
          <Typography variant="h5">{`שם ${
            teneDesk ? "האפליקציה" : "האתר"
          }:`}</Typography>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            rules={{
              required: "שם אתר ריק",
              minLength: { value: 3, message: "שם אתר קצר מידי" },
            }}
            render={({ field }) => (
              <TextField sx={{ flexGrow: 1 }} {...field} label="שם האתר" />
            )}
          />
        </Stack>
        <Typography color={"error"} variant="body1">
          {errors.name?.message}
        </Typography>
        <Typography variant="h5">{`תמונת ${
          teneDesk ? "האפליקציה" : "האתר"
        }:`}</Typography>
        <FileInput
          label={teneDesk ? "תמונת האפליקציה" : "תמונת האתר"}
          accept=".png,.jpg,.jpeg"
          {...register("image", {
            required: "נא להכניס תמונה",
            validate: (value) => {
              const isValid =
                value.type === "image/png" ||
                value.type === "image/jpg" ||
                value.type === "image/jpeg";
              if (!isValid) {
                console.log(value.type);
                return "הכנס בבקשה תמונה";
              }
              return true;
            },
          })}
        />
        <Typography color={"error"} variant="body1">
          {errors.image?.message}
        </Typography>
        {imageCompoment}
        <Stack alignItems={"center"} direction={"row"} gap={2} width={"100%"}>
          <Typography variant="h5">{`קישור ${
            teneDesk ? "האפליקציה" : "האתר"
          }:`}</Typography>
          <Controller
            control={control}
            name="link"
            rules={{ required: "קישור לאתר ריק" }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ flexGrow: 1 }}
                label="קישור לאתר"
                multiline
                maxRows={4}
              />
            )}
          />
        </Stack>
        <Typography color={"error"} variant="body1">
          {errors.link?.message}
        </Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{
            alignSelf: "end",
          }}
        >
          {isEdit ? "עדכון" : "הוספה"}
        </Button>
      </Stack>
    </form>
  );
};

export default WebsiteForm;

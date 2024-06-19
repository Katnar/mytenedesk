import { TextField, Typography, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { RegisterOptions, UseFormRegister } from "react-hook-form";
import WebsiteFormFields from "../../Interfaces/WebsiteFromFields";
import FileInput from "../../Components/Inputs/FileInput/FileInput";

const WebsiteForm: React.FC = () => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<WebsiteFormFields>({
    defaultValues: {
      name: "",
      link: "",
      image: undefined,
    },
  });
  const onSubmit: SubmitHandler<WebsiteFormFields> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input className="MuiTextField-root" aria-label="label"/> */}
      <Stack direction={"column"} gap={2} paddingY={2} width={"100%"}>
        <Typography variant="h3">הוספת מערכת</Typography>
        <Controller
          control={control}
          name="name"
          rules={{ required: "שם אתר ריק", maxLength: 5 }}
          render={({ field }) => <TextField {...field} label="שם האתר" />}
        />
        <Typography color={"error"} variant="body1">
          {errors.name?.message}
        </Typography>
        <FileInput
          label="תמונת מערכת"
          accept=".png,.jpg,.jpeg"
          {...register("image", {
            required: "נא להכניס תמונה",
            validate: (value) => {
              const isValid =
                value[0].type === "image/png" ||
                value[0].type === "image/jpg" ||
                value[0].type === "image/jpeg";
              if (!isValid) {
                console.log(value[0].type);
                return "הכנס בבקשה תמונה";
              }
              return true;
            },
          })}
        />
        <Typography color={"error"} variant="body1">
          {errors.image?.message}
        </Typography>
        <Controller
          control={control}
          name="link"
          rules={{ required: "קישור לאתר ריק" }}
          render={({ field }) => (
            <TextField {...field} label="קישור לאתר" multiline maxRows={4} />
          )}
        />
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
          הוספה
        </Button>
      </Stack>
    </form>
  );
};

export default WebsiteForm;

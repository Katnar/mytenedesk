import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
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
  console.log(errors);
  console.log(watch());
  const onSubmit: SubmitHandler<WebsiteFormFields> = (data) => {
    console.log(data);
  };
  return (
    <form>
      {/* <input className="MuiTextField-root" aria-label="label"/> */}
      <Stack direction={"column"} gap={2} paddingY={2} width={"100%"}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "שם אתר ריק", maxLength:5 }}
          render={({ field }) => <TextField {...field} label="שם האתר" />}
        />
        <FileInput label="image" accept=".png,.jpg,.jpeg" {...register("image")}/>
        {/* <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            accept=".png,.jpg,.jpeg"
            {...register("image", {
              required: true,
              validate: (value) => {
                if (![".png", ".jpg", ".jpeg"].includes(value.type)) {
                  return "טופס חייב להיות תמונה";
                }
                return true;
              },
            })}
          />
        </Button> */}
        {/* <Controller
          name="image"
          control={control}
          rules={{
            required: "הכנס תמונה",
          }}
          render={({ field }) => (
            <TextField
              type={"file"}
              inputProps={{ accept: ".png,.jpg,.jpeg" }}
              {...field}
            />
          )}
        /> */}
        <Controller
          control={control}
          name="link"
          rules={{ required: "קישור לאתר ריק" }}
          render={({ field }) => (
            <TextField {...field} label="קישור לאתר" multiline maxRows={4} />
          )}
        />
      </Stack>
    </form>
  );
};

export default WebsiteForm;

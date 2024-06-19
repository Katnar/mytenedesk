import React, { useEffect, useRef, useState } from "react";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import WebsiteFormFields from "../../../Interfaces/WebsiteFromFields";
import { Button, Box, Typography, IconButton } from "@mui/material";
import useInputFowardRef from "../../../hooks/useFowardRef";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const FileInput = React.forwardRef<
  HTMLInputElement,
  { label: string; accept: string } & ReturnType<
    UseFormRegister<WebsiteFormFields>
  >
>(({ onChange, onBlur, name, label, accept }, ref) => {
  const { inputRef, refFunc } = useInputFowardRef(ref);
  const [files, setFiles] = useState<FileList | null>(null);
//   const files = inputRef.current ? inputRef.current.files : null;
//   console.log(files);
  let elementsList = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const element = <Typography variant="button">{file.name}</Typography>;
        elementsList.push(element);
      }
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          borderBottomColor: "primary.main",
          borderBottomWidth: 2,
          borderBottomStyle: "solid",
        }}
      >
        <IconButton component="label">
          <input
            accept={accept}
            type="file"
            hidden
            name={name}
            ref={refFunc}
            onChange={(event) => {
                onChange(event);
                setFiles(event.target.files);
            }}
            onBlur={onBlur}
          />
          <AttachFileIcon />
        </IconButton>
        {elementsList.length > 0 ? (
          elementsList
        ) : (
          <Typography variant="button">{label}</Typography>
        )}
      </Box>
    </>
  );
});

export default FileInput;

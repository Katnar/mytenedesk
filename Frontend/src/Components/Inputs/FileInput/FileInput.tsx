import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Path, useForm, UseFormRegister, SubmitHandler, RegisterOptions } from "react-hook-form";
import WebsiteFormFields from "../../../Interfaces/WebsiteFromFields";
import { Button, Box, Typography, IconButton } from "@mui/material";
import useInputFowardRef from "../../../hooks/useFowardRef";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";

const FileInput = React.forwardRef<
  HTMLInputElement,
  { label: string; accept: string } & ReturnType<
    UseFormRegister<WebsiteFormFields>
  >
>(({ label, accept, onChange, onBlur, name, }, ref) => {
  const [file, setFile] = useState<File | null>(null);
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);
  // const { inputRef, refFunc } = useInputFowardRef(ref);
  const [files, setFiles] = useState<File>();
  let elementsList = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const element = (
          <Typography key={file.name} variant="button">
            {file.name}
          </Typography>
        );
        elementsList.push(element);
      }
    }
  }
  return (
    <>
      <input
        accept={accept}
        type="file"
        hidden
        value={file}
        name={name}
        ref={innerRef}
        onChange={(event) => {
          console.log(event);
          onChange(event);
          setFiles(event.target.files);
        }}
        onBlur={onBlur}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
          borderBottomColor: "primary.main",
          borderBottomWidth: 2,
          borderBottomStyle: "solid",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
          onClick={() => {
            innerRef.current?.click();
          }}
        >
          <IconButton component="label">
            <AttachFileIcon />
          </IconButton>
          {elementsList.length > 0 ? (
            elementsList
          ) : (
            <Typography variant="button">{label}</Typography>
          )}
        </Box>
        <IconButton
          sx={{
            justifySelf: "flex-end",
          }}
          onClick={(event) => {
            innerRef.current?.onchange();
            setFiles(null);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </>
  );
});

export default FileInput;

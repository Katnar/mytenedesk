import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  Path,
  useForm,
  UseFormRegister,
  SubmitHandler,
  RegisterOptions,
} from "react-hook-form";
import WebsiteFormFields from "../../../Interfaces/WebsiteFromFields";
import { Button, Box, Typography, IconButton } from "@mui/material";
import useInputFowardRef from "../../../hooks/useFowardRef";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";

interface FileInputProps
  extends ReturnType<UseFormRegister<WebsiteFormFields>> {
  label: string;
  accept: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, accept, onChange, onBlur, name }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);
    const [fileName, setFileName] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      onChange({
        target: {
          name,
          value: file,
        },
      });
      // setFile(event.target.files ? event.target.files[0] : null);
      setFileName(
        event.target.files && event.target.files[0]
          ? event.target.files[0].name
          : ""
      );
    };
    const handleClear = () => {
      if (innerRef.current) {
        innerRef.current.value = "";
        // setFile(null);
        setFileName("");
        onChange({
          target: {
            name,
            value: null,
          },
        });
      }
    };
    return (
      <>
        <input
          accept={accept}
          type="file"
          hidden
          // value={file}
          name={name}
          ref={innerRef}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
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
              <Typography variant="button">
                {fileName !== "" ? fileName : label}
              </Typography>
            </Box>
            <IconButton
              sx={{
                justifySelf: "flex-end",
              }}
              onClick={handleClear}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          {/* {file && (
          <Box
            component="img"
            src={URL.createObjectURL(file)}
            sx={{
              marginTop: 2,
              alignSelf: "center",
              maxWidth: "100%",
              maxHeight: "200px",
            }}
          />
        )} */}
        </Box>
      </>
    );
  }
);

export default FileInput;

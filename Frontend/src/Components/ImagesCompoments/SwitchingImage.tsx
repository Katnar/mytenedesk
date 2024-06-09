import { Box, Fade, SxProps } from "@mui/material";
import useImageSwap from "../../hooks/useImageSwap";
import { ReactNode } from "react";

type Props = {
  srcs: string[];
  sx: SxProps;
  switchTimeout: number;
  transitionTimeout: number;
  children?: ReactNode | ReactNode[];
};

const SwitchingImage: React.FC<Props> = ({
  srcs,
  sx,
  switchTimeout,
  transitionTimeout,
  children,
}) => {
  const { image: imageSrc, count } = useImageSwap(srcs, switchTimeout);

  const images = srcs.map((src) => (
    <Fade in={imageSrc === src} timeout={count > 0 ? transitionTimeout : 0}>
      <Box component="img" sx={sx} src={src}>
        {children}
      </Box>
    </Fade>
  ));

  return images;
};

export default SwitchingImage;

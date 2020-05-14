import { Box } from "grommet";
import React from "react";
import { User } from "grommet-icons";

export const Avatar = React.memo(({ url, ...rest }: { url?: string }) => (
  <Box
    height="xxsmall"
    width="xxsmall"
    round="full"
    background={url && `url(${url})`}
    {...rest}
  >
    {!url && <User/>}
  </Box>
));

export const SquareAvatar = React.memo(({ url, ...rest }: { url: string }) => (
  <Box height="xxsmall" width="xxsmall" background={url} {...rest} />
));

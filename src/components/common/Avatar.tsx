import { Box } from "grommet";
import React from "react";

export const Avatar = React.memo(({ url, ...rest }: { url: string }) => (
  <Box
    height="xxsmall"
    width="xxsmall"
    round="full"
    background={url}
    {...rest}
  />
));

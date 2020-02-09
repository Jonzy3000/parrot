import { TextInputProps, Text, Box, TextAreaProps } from "grommet";
import React from "react";

interface Props {
  label: string;
  children:
    | React.ReactElement<TextInputProps>
    | React.ReactElement<TextAreaProps>;
}

export const CustomInputWrapper = React.memo((props: Props) => {
  const CustomInput = React.cloneElement(props.children, { plain: true });
  return (
    <Box>
      <Text>{props.label}</Text>
      <Box
        background="light-2"
        margin={{ bottom: "xsmall" }}
        round="xsmall"
        onClick={() => {}}
      >
        {CustomInput}
      </Box>
    </Box>
  );
});

import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

type Props = {
  textFieldProps: {
    name: string;
    label: string;
  };
  submitButtonProps: {
    text: string;
    formId: string;
  };
  additionalButtonProps?: {
    text: string;
    callback: (...args: any[]) => any;
  };
};

const InputGroup = (props: Props) => {
  return (
    <InputContainer>
      <TextField
        required
        type="text"
        name={props.textFieldProps.name}
        id="outlined-basic"
        label={props.textFieldProps.label}
        variant="outlined"
      />

      {props.additionalButtonProps && (
        <Button
          variant="contained"
          onClick={props.additionalButtonProps.callback}
        >
          {props.additionalButtonProps.text}
        </Button>
      )}

      <Button
        type="submit"
        form={props.submitButtonProps.formId}
        variant="contained"
      >
        {props.submitButtonProps.text}
      </Button>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default InputGroup;

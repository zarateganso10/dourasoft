import React, {InputHTMLAttributes, useRef, useEffect} from 'react';
import { useField } from '@unform/core';

import { Input as InputContainer } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({name, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}
    />
  );
}

export default Input
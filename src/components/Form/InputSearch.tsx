import { useFormContext, useWatch } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import { ChangeEvent, useEffect, useState } from 'react';
import ControlWrapper from './ControlWrapper';
import { Input } from '@chakra-ui/react';

interface Props extends FormInputProps {
  placeholder?: string;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
}

const InputSearch = ({ name, label, placeholder, variant }: Props) => {
  const { setValue, unregister } = useFormContext();
  const [searchValue, setSearchValue] = useState('');
  const watch = useWatch({ name: name });

  useEffect(() => {
    if (!!watch) {
      setSearchValue(watch);
    } else {
      setSearchValue('');
      unregister(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(name, encodeURIComponent(searchValue));
    }, 400);
    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <ControlWrapper name={name} label={label}>
        <Input
          value={searchValue}
          variant={variant}
          placeholder={placeholder}
          onChange={onChange}
        />
      </ControlWrapper>
    </>
  );
};

export default InputSearch;

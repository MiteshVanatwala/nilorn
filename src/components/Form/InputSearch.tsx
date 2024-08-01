import { useFormContext, useWatch } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import { ChangeEvent, useEffect, useState } from 'react';
import ControlWrapper from './ControlWrapper';
import { Input } from '@chakra-ui/react';

interface Props extends FormInputProps {
  placeholder?: string;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
}

const useSearchValue = (
  initialValue: string
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(initialValue);

  const setEncodedValue = (newValue: string) => {
    setValue(encodeURIComponent(newValue));
  };

  return [value, setEncodedValue];
};

const InputSearch = ({ name, label, placeholder, variant }: Props) => {
  const { setValue, unregister, getValues } = useFormContext();
  const [searchValue, setSearchValue] = useSearchValue('');
  const watch = useWatch({ name: name });

  useEffect(() => {
    if (getValues(name)) {
      setSearchValue(getValues(name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues, name]);

  useEffect(() => {
    if (!watch) {
      setSearchValue('');
      unregister(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(name, searchValue);
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
          value={decodeURIComponent(searchValue)}
          variant={variant}
          placeholder={placeholder}
          onChange={onChange}
        />
      </ControlWrapper>
    </>
  );
};

export default InputSearch;

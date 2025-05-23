import { useFormContext, useWatch } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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

  const setEncodedValue = useCallback(
    (newValue: string) => {
      setValue(encodeURIComponent(newValue));
    },
    [setValue]
  );

  return [value, setEncodedValue];
};

const InputSearch = ({ name, label, placeholder, variant }: Props) => {
  const { setValue, unregister } = useFormContext();
  const watch = useWatch({ name: name });
  const [searchValue, setSearchValue] = useSearchValue(watch ?? '');

  useEffect(() => {
    if (!!watch) {
      setSearchValue(decodeURIComponent(watch));
    } else {
      unregister(name);
      setSearchValue('');
    }
  }, [watch, name, setSearchValue, unregister]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(name, searchValue);
    }, 400);
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, setValue, name]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <ControlWrapper name={name} label={label}>
      <Input
        value={decodeURIComponent(searchValue)}
        variant={variant}
        placeholder={placeholder}
        onChange={onChange}
      />
    </ControlWrapper>
  );
};

export default InputSearch;

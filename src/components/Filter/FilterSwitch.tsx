import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { COLORS, SPACE } from '../../theme/Constants';
import { useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import text from '../../theme/text';

type Props = {
  label: string;
  name: string;
  defaultChecked?: boolean;
};

const FilterSwitch = ({ label, name, defaultChecked = false }: Props) => {
  const { setValue, unregister } = useFormContext();
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const onChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        setValue(name, { value: true, label: label });
      } else {
        unregister(name);
      }
    },
    [name, setValue, label, unregister]
  );
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  useEffect(() => {
    onChange(checked);
  }, [checked, onChange]);

  return (
    <FormControl display="flex" alignItems="center">
      <Switch
        isChecked={checked}
        id={name}
        onChange={e => setChecked(e.target?.checked)}
      />
      <FormLabel variant={'thin'} htmlFor={name} ml={SPACE.XS} mb={0}>
        {label}
      </FormLabel>
    </FormControl>
  );
};

export default FilterSwitch;

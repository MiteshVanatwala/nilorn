import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';
import { useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';

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
    onChange(checked);
  }, [checked, onChange]);

  return (
    <FormControl display="flex" alignItems="center">
      <Switch
        defaultChecked={defaultChecked}
        id={name}
        onChange={e => setChecked(e.target?.checked)}
      />
      <FormLabel htmlFor={name} ml={SPACE.XS} mb={0} fontWeight={'400'}>
        {label}
      </FormLabel>
    </FormControl>
  );
};

export default FilterSwitch;

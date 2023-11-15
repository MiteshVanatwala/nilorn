import { useState } from 'react';

type Props = {
  label: string;
  paramName: string;
};

/**
 * Inputcomponent that is 100% controlled by searchParams.
 * @param param0
 * @returns
 */
export const InputComponent = ({ label, paramName }: Props) => {
  const [value, setValue] = useState<string | undefined>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramValue = searchParams.get(paramName);
    return paramValue !== null ? paramValue : undefined;
  });

  console.log('InputComponent', label);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    const searchParams = new URLSearchParams(window.location.search);
    if (newValue) {
      searchParams.set(paramName, newValue.toString());
    } else {
      searchParams.delete(paramName);
    }

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${searchParams.toString()}`
    );
  };

  return (
    <div>
      <label>{label}: </label>
      <input value={value || ''} onChange={handleChange} />
    </div>
  );
};

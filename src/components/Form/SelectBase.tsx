import React from 'react';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { FocusEventHandler } from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  ActionMeta,
  Select,
  SingleValue,
  components,
  PropsValue,
  GroupBase,
  OptionsOrGroups,
  MultiValue,
} from 'chakra-react-select';
import text from '../../theme/text';

const customSelectComponents = {
  DropdownIndicator: (props: any) => (
    <components.DropdownIndicator {...props}>
      {props.selectProps.isSearchable ? (
        <Text as={'i'} className="ri-search-2-line" />
      ) : (
        <Text as={'i'} className="ri-arrow-down-s-fill" />
      )}
    </components.DropdownIndicator>
  ),
  NoOptionsMessage: (props: any) => {
    const { t } = useTranslation();
    return (
      <components.NoOptionsMessage {...props}>
        <Text>
          <>{t('Common.NoOptions')}</>
        </Text>
      </components.NoOptionsMessage>
    );
  },
};

type SelectProps<IsMulti extends boolean = false> = {
  name: string;
  options:
    | OptionsOrGroups<
        {
          label: string;
          value: any;
        },
        GroupBase<{
          label: string;
          value: any;
        }>
      >
    | undefined;
  placeholder?: string;
  isMulti?: IsMulti;
  onChange: (
    newValue:
      | (true extends IsMulti
          ? MultiValue<{ label: string; value: any }>
          : never)
      | (false extends IsMulti
          ? SingleValue<{ label: string; value: any }>
          : never),
    actionMeta: ActionMeta<{
      label: string;
      value: any;
    }>
  ) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?:
    | PropsValue<{
        label: string;
        value: any;
      }>
    | undefined;
  defaultValue?: { label: string; value: string };
  isSearchable?: boolean;
  passRef?: any;
  components?: any;
  bgColor?: string;
  groupColor?: string;
  isControlled?: boolean;
  menuPlacement?: 'auto' | 'top';
};

const SelectBase = <IsMulti extends boolean = false>({
  name,
  options,
  placeholder,
  onChange,
  onBlur,
  passRef,
  value,
  defaultValue,
  components,
  isMulti,
  isSearchable = false,
  bgColor = COLORS.GRAY[10],
  groupColor = COLORS.GRAY[50],
  isControlled = true,
  menuPlacement = 'auto',
}: SelectProps<IsMulti>) => {
  const customComponents = { ...customSelectComponents, ...components };

  return (
    <Select
      isMulti={isMulti}
      isSearchable={isSearchable}
      variant="filled"
      name={name}
      ref={passRef}
      onChange={onChange as any}
      onBlur={onBlur}
      components={customComponents}
      value={isControlled ? value ?? '' : undefined}
      defaultValue={defaultValue}
      options={options}
      placeholder={placeholder}
      menuPlacement={menuPlacement}
      chakraStyles={{
        control: base => ({
          ...base,
          ...text.baseStyle,
          whiteSpace: 'noWrap',
          height: isMulti ? 'max-content' : '4.2rem',
          w: '100%',
          backgroundColor: bgColor,
          _hover: {
            backgroundColor: COLORS.GRAY[20],
            cursor: 'pointer',
          },
          _focusVisible: {
            backgroundColor: COLORS.GRAY[30],
          },
          _focus: {
            backgroundColor: COLORS.GRAY[30],
          },
        }),
        valueContainer: base => ({
          ...base,
          // backgroundColor: bgColor,
        }),
        menuList: base => ({
          ...base,
          rootProps: { position: 'relative' },
          position: 'absolute',
          right: 0,
          bottom: menuPlacement === 'top' ? '100%' : 'auto',
          padding: '0',
          margin: '0',
          color: COLORS.GRAY[80],
          // backgroundColor: COLORS.GRAY[20],
        }),
        placeholder: base => ({
          ...base,
          fontWeight: 900,
          color: COLORS.GRAY[80],
        }),
        input: base => ({
          ...base,
          color: COLORS.GRAY[80],
        }),
        indicatorsContainer: base => ({
          ...base,
          fontSize: SIZES.ICON.MD,
          color: COLORS.GRAY[80],
          // backgroundColor: bgColor,
        }),
        option: (base, { isSelected }) => ({
          ...base,
          ...text.baseStyle,
          whiteSpace: 'nowrap',
          height: SPACE.XL,
          backgroundColor: COLORS.GRAY[20],
          padding: SPACE.XS,
          '&:hover': {
            backgroundColor: COLORS.GRAY[10],
          },
          ...(isSelected && {
            backgroundColor: COLORS.GRAY[10],
            color: COLORS.BLACK,
          }),
        }),
        groupHeading: base => ({
          ...base,
          bgColor: groupColor,
          color: COLORS.WHITE,
        }),
        multiValue: base => ({
          ...base,
          bgColor: COLORS.GRAY[70],
          paddingX: SPACE.SM,
          paddingY: SPACE.XS,
        }),
        multiValueRemove: base => ({
          ...base,
          fontSize: SIZES.FONT.SM,
          fontWeight: 900,
          color: COLORS.WHITE,
          ml: SPACE.XS,
        }),
        multiValueLabel: base => ({
          ...base,
          color: COLORS.WHITE,
        }),
      }}
    />
  );
};
export default SelectBase;

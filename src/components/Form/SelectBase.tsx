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
  DropdownIndicator: (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <Text
          as={'i'}
          className={
            props.selectProps.isSearchable
              ? 'ri-search-2-line'
              : 'ri-arrow-down-s-fill'
          }
        />
      </components.DropdownIndicator>
    );
  },
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
  groupColor?: string;
  isControlled?: boolean;
  menuPlacement?: 'auto' | 'top';
  advanceFilter?: boolean;
  dark?: boolean;
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
  groupColor = COLORS.GRAY[50],
  isControlled = true,
  menuPlacement = 'auto',
  advanceFilter = false,
  dark = false,
}: SelectProps<IsMulti>) => {
  const customComponents = { ...customSelectComponents, ...components };

  const color = dark ? COLORS.WHITE : COLORS.GRAY[70];
  const bgColor = dark ? COLORS.GRAY[70] : COLORS.GRAY[10];

  return (
    <Select
      hideSelectedOptions={false}
      selectedOptionStyle={advanceFilter ? 'check' : undefined}
      controlShouldRenderValue={advanceFilter ? false : true}
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
      placeholder={true && isMulti ? '' : placeholder}
      menuPlacement={menuPlacement}
      chakraStyles={{
        control: base => ({
          ...base,
          ...text.baseStyle,
          whiteSpace: 'noWrap',
          height: isMulti ? 'max-content' : '4.2rem',
          w: '100%',
          backgroundColor: bgColor,
          color: color,
          _hover: {
            backgroundColor: COLORS.GRAY[20],
            cursor: 'pointer',
          },
          _focusVisible: {
            backgroundColor: COLORS.GRAY[60],
          },
          _focus: {
            backgroundColor: COLORS.GRAY[60],
          },
          _after: advanceFilter
            ? {
                h: '100%',
                w: '5rem',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                content: `"${placeholder}"`,
              }
            : undefined,
        }),
        valueContainer: base => ({
          ...base,
          backgroundColor: bgColor,
          color: color,
        }),
        menuList: base => ({
          ...base,
          rootProps: { position: 'relative' },
          position: 'absolute',
          right: 0,
          zIndex: 9,
          bottom: menuPlacement === 'top' ? '100%' : 'auto',
          padding: '0',
          margin: '0',
          color: color,
          backgroundColor: bgColor,
        }),
        placeholder: base => ({
          ...base,
          fontWeight: 900,
          color: color,
        }),
        input: base => ({
          ...base,
          color: color,
        }),
        indicatorsContainer: base => ({
          ...base,
          fontSize: SIZES.ICON.MD,
          color: color,
          backgroundColor: bgColor,
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
        multiValue: base =>
          advanceFilter && isMulti
            ? { display: 'none' }
            : {
                ...base,
                bgColor: COLORS.GRAY[70],
                paddingX: SPACE.SM,
                paddingY: SPACE.XS,
                position: 'relative',
              },
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
        menu: base => ({
          ...base,
          zIndex: 9,
          color: color,
        }),
      }}
    />
  );
};
export default SelectBase;

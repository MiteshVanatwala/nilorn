import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { FocusEventHandler } from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  ActionMeta,
  Select,
  components,
  PropsValue,
  GroupBase,
  OptionsOrGroups,
  MultiValue,
  DropdownIndicatorProps,
} from 'chakra-react-select';
import text from '../../theme/text';
import { SelectOption } from '../../app/types/types';

const customSelectComponents = {
  DropdownIndicator: (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <Text as={'i'} className={'ri-arrow-down-s-fill'} />
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
      | (true extends IsMulti ? MultiValue<SelectOption> : never)
      | (false extends IsMulti ? SelectOption : never),
    actionMeta: ActionMeta<SelectOption>
  ) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?:
    | PropsValue<{
        label: string;
        value: any;
      }>
    | undefined;
  defaultValue?: true extends IsMulti ? MultiValue<SelectOption> : SelectOption;
  isSearchable?: boolean;
  passRef?: any;
  components?: any;
  groupColor?: string;
  isControlled?: boolean;
  menuPlacement?: 'auto' | 'top';
  showSelectedCount?: boolean;
  dark?: boolean;
  invisible?: boolean;
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
  showSelectedCount = false,
  dark = false,
  invisible = false,
}: SelectProps<IsMulti>) => {
  const customComponents = { ...customSelectComponents, ...components };

  const color = dark
    ? COLORS.WHITE
    : invisible
    ? COLORS.GRAY[80]
    : COLORS.GRAY[70];
  const bgColor = dark
    ? COLORS.GRAY[70]
    : invisible
    ? COLORS.WHITE
    : COLORS.GRAY[10];
  const focus = dark ? COLORS.GRAY[90] : COLORS.GRAY[60];
  const hover = dark ? COLORS.GRAY[80] : COLORS.GRAY[20];

  return (
    <Select
      hideSelectedOptions={false}
      selectedOptionStyle={showSelectedCount ? 'check' : undefined}
      controlShouldRenderValue={showSelectedCount ? false : true}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={showSelectedCount ? false : undefined}
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
          height:
            isMulti && !showSelectedCount
              ? 'max-content'
              : invisible
              ? 'auto'
              : '4.2rem',
          w: '100%',
          backgroundColor: bgColor,
          borderColor: bgColor,
          border: '2px solid',
          _hover: {
            borderColor: hover,
            cursor: 'pointer',
            backgroundColor: bgColor,
          },
          _focusVisible: {
            borderColor: focus,
            backgroundColor: bgColor,
          },
          _focus: {
            borderColor: focus,
            backgroundColor: bgColor,
          },
        }),
        valueContainer: base => ({
          ...base,
          padding: invisible ? '0' : base.padding,
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
        }),
        placeholder: base => ({
          ...base,
          fontWeight: 400,
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
          display: invisible ? 'none' : 'relative',
        }),
        option: (base, { isSelected }) => ({
          ...base,
          ...text.baseStyle,
          whiteSpace: 'nowrap',
          height: SPACE.XL,
          backgroundColor: COLORS.GRAY[10],
          padding: SPACE.XS,
          '&:hover': {
            backgroundColor: COLORS.GRAY[20],
          },
          ...(isSelected && {
            backgroundColor: COLORS.GRAY[20],
            color: COLORS.BLACK,
          }),
        }),
        groupHeading: base => ({
          ...base,
          bgColor: groupColor,
          color: COLORS.WHITE,
        }),
        multiValue: base =>
          showSelectedCount && isMulti
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

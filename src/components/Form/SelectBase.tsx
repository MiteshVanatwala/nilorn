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
import RemixIcon from '../Icon/RemixIcon';
import { READ_ONLY_OPACITY } from '../../app/utils/constant';

const customSelectComponents = {
  DropdownIndicator: (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <RemixIcon component="Text" icon="ARROW_DOWN_S_FILL" />
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
  showSelectedCount?: boolean;
  dark?: boolean;
  invisible?: boolean;
  readOnly?: boolean;
  hideSelected?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  autoFocus?: boolean;
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
  readOnly,
  showSelectedCount = false,
  dark = false,
  invisible = false,
  hideSelected = false,
  isSelected = false,
  isDisabled,
  autoFocus = false,
}: SelectProps<IsMulti>) => {
  const customComponents = { ...customSelectComponents, ...components };

  const color = dark ? COLORS.WHITE : COLORS.BLACK;
  const placeHolderColor = dark ? COLORS.WHITE : COLORS.GRAY[80];
  const bgColor = dark
    ? COLORS.GRAY[70]
    : invisible
    ? COLORS.WHITE
    : COLORS.GRAY[10];
  const focus = dark ? COLORS.GRAY[90] : COLORS.GRAY[60];
  const hover = dark ? COLORS.GRAY[80] : COLORS.GRAY[20];

  return (
    <Select
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      hideSelectedOptions={hideSelected}
      selectedOptionStyle={showSelectedCount ? 'check' : undefined}
      controlShouldRenderValue={
        showSelectedCount || hideSelected ? false : true
      }
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={showSelectedCount || hideSelected ? false : undefined}
      variant="filled"
      name={name}
      ref={passRef}
      isReadOnly={readOnly}
      onChange={onChange as any}
      onBlur={onBlur}
      components={customComponents}
      value={isControlled ? value ?? '' : undefined}
      defaultValue={defaultValue}
      options={options}
      placeholder={placeholder}
      menuPosition={'fixed'}
      styles={{ menuPortal: base => ({ ...base, zIndex: 9 }) }}
      chakraStyles={{
        control: base => ({
          ...base,
          ...text.baseStyle,
          whiteSpace: 'noWrap',
          minHight:
            isMulti && !showSelectedCount
              ? 'max-content'
              : invisible
              ? 'auto'
              : '3.7rem',
          w: '100%',
          pt: '0',
          backgroundColor: bgColor,
          borderColor: bgColor,
          border: '2px solid',
          opacity: readOnly ? READ_ONLY_OPACITY : '',
          _hover: {
            borderColor: !readOnly ? hover : '',
            cursor: readOnly ? 'default' : 'pointer',
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
          pt: '0',
          minHeight: '3.7rem',
          mt: '-2px',
        }),
        menuList: base => ({
          ...base,
          rootProps: { position: 'relative' },
          right: 0,
          zIndex: 9,
          bottom: 'auto',
          padding: '0',
          margin: '0',
          color: color,
          maxW: '22rem',
          bg: COLORS.GRAY[10],
        }),
        placeholder: base => ({
          ...base,
          fontWeight: text.variants.bodyRegular.fontWeight,
          color: isSelected && showSelectedCount ? color : placeHolderColor,
        }),
        input: base => ({
          ...base,
          color: color,
        }),
        clearIndicator: base => ({
          ...base,
          fontSize: SIZES.ICON.MD,
          color: color,
        }),
        indicatorsContainer: base => ({
          display: invisible ? 'none' : 'relative',
        }),
        option: (base, { isSelected, isFocused }) => ({
          ...base,
          ...text.baseStyle,
          minHeight: SPACE.XL,
          backgroundColor: COLORS.GRAY[10],
          px: SPACE.XS,
          py: SPACE.XXS,
          wordWrap: 'break-word',
          '&:hover': {
            backgroundColor: COLORS.GRAY[20],
          },
          ...(isSelected && {
            backgroundColor: COLORS.GRAY[20],
            color: COLORS.BLACK,
          }),
          ...(isFocused && {
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
          maxH: components ? '22rem' : '',
          overflowY: components ? 'auto' : '',
        }),
      }}
    />
  );
};
export default SelectBase;

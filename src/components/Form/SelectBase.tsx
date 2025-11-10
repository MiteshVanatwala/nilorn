import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { FocusEventHandler, useState, useRef } from 'react';
import { Text, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  ActionMeta,
  Select,
  components,
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
  unselectedOptions?:
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
  value?: true extends IsMulti
    ? MultiValue<SelectOption> | null
    : SelectOption | null;
  defaultValue?: true extends IsMulti
    ? MultiValue<SelectOption> | null
    : SelectOption | null;
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
  isScrollable?: boolean;
};

const SelectBase = <IsMulti extends boolean = false>({
  name,
  options,
  unselectedOptions,
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
  isScrollable = false,
}: SelectProps<IsMulti>) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputCleared, setIsInputCleared] = useState(false);
  const [tabPressed, setTabPressed] = useState(false);
  const [previousInputValue, setPreviousInputValue] = useState('');
  const selectRef = useRef<any>(null);
  
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

  // Handle input change to track when input is cleared
  const handleInputChange = (inputValue: string) => {
    // Track when input is actually cleared (had content before, now empty)
    if (previousInputValue.length > 0 && inputValue === '') {
      setIsInputCleared(true);
      // When input is cleared, focus on the currently selected value
      if (selectRef.current && value) {
        selectRef.current.setState({
          focusedOption: value,
          inputValue: ''
        });
      } else if (selectRef.current) {
        // If no value is selected, clear the focused option
        selectRef.current.setState({
          focusedOption: null,
          inputValue: ''
        });
      }
    } else if (inputValue.length > 0) {
      setIsInputCleared(false);
    }
    
    setPreviousInputValue(inputValue);
    setInputValue(inputValue);
    
    return inputValue;
  };

  // Handle change to prevent unwanted selections when Tab was pressed or input was cleared
  const handleChange = (newValue: any, actionMeta: any) => {
    // Block selection if:
    // 1. Tab was just pressed, OR
    // 2. Input was just cleared manually and this is a select-option action
    if ((tabPressed || isInputCleared) && actionMeta.action === 'select-option' && actionMeta.option) {
      // Reset the states but don't proceed with the unwanted selection
      setTabPressed(false);
      setIsInputCleared(false);
      return;
    }
    
    // Reset states for any change action
    setIsInputCleared(false);
    setTabPressed(false);
    
    // Proceed with all changes (including programmatic setValue calls)
    if (onChange) {
      onChange(newValue, actionMeta);
    }
  };

  // Handle key down events to prevent Tab selection
  const handleKeyDown = (e: any) => {
    // If user presses Tab, reset input value and move to next element
    // Tab should be a navigation key, not a commit key
    if (e.key === 'Tab') {
      // Set flag that Tab was pressed
      setTabPressed(true);
      
      // Check if the dropdown menu is open or there's any input value or input was cleared
      const menuIsOpen = selectRef.current?.state?.menuIsOpen;
      
      if (menuIsOpen || inputValue || isInputCleared) {
        // Prevent Tab from selecting highlighted option
        e.preventDefault();
        
        // Reset the input value and clear internal react-select state
        setInputValue('');
        setIsInputCleared(true);
        
        // Close the dropdown and reset internal focused option
        if (selectRef.current) {
          selectRef.current.setState({
            focusedOption: null,
            inputValue: ''
          });
          selectRef.current.blur();
        }
        
        // Manually move focus to next element after a short delay
        setTimeout(() => {
          const nextElement = e.target.form?.elements[Array.from(e.target.form.elements).indexOf(e.target) + 1];
          if (nextElement) {
            nextElement.focus();
          }
          // Reset tab pressed flag after focus moves
          setTabPressed(false);
        }, 10); // Slightly longer delay to ensure selection is blocked
      } else {
        // Reset tab pressed flag immediately if no dropdown/input
        setTabPressed(false);
      }
    }
  };

  // Handle blur to reset the cleared state
  const handleBlur = (e: any) => {
    // Reset states when component loses focus
    setIsInputCleared(false);
    setInputValue('');
    setTabPressed(false);
    setPreviousInputValue('');
    
    // Call the original onBlur if it exists
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <>
      <Tooltip
        label={
          readOnly
            ? isMulti
              ? Array.isArray(value)
                ? value.map((v: any) => v?.label).join(', ')
                : ''
              : (value as any)?.label || ''
            : ''
        }
        placement={'top'}
        hasArrow>
        <div>
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
            ref={(ref) => {
              selectRef.current = ref;
              if (passRef) {
                if (typeof passRef === 'function') {
                  passRef(ref);
                } else {
                  passRef.current = ref;
                }
              }
            }}
            isReadOnly={readOnly}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            components={customComponents}
            value={isControlled ? value : undefined}
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
                overflowX: 'hidden',
                whiteSpace: 'normal',
              }),
              placeholder: base => ({
                ...base,
                fontWeight: text.variants.bodyRegular.fontWeight,
                color:
                  isSelected && showSelectedCount ? color : placeHolderColor,
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
              option: (base, { data, isSelected, isFocused }) => {
                const isUsed =
                  unselectedOptions !== undefined
                    ? !unselectedOptions?.filter(
                        (item: any) => item?.value === data.value
                      ).length
                    : false;

                return {
                  ...base,
                  ...text.baseStyle,
                  minHeight: SPACE.XL,
                  backgroundColor: COLORS.GRAY[10],
                  px: SPACE.XS,
                  py: SPACE.XXS,
                  wordWrap: 'break-word',
                  minWidth: 'fit-content',
                  wordBreak: 'break-word',
                  '&:hover': {
                    backgroundColor: COLORS.GRAY[20],
                  },
                  ...(isUsed && {
                    textDecoration: 'line-through',
                    opacity: '0.5',
                    pointerEvents: 'none',
                  }),
                  ...(isSelected && {
                    backgroundColor: COLORS.GRAY[20],
                    color: COLORS.BLACK,
                    textDecoration: 'none',
                    opacity: 1,
                  }),
                  ...(isFocused && {
                    backgroundColor: COLORS.GRAY[20],
                    color: COLORS.BLACK,
                  }),
                };
              },
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
                maxH: isScrollable ? '22rem' : '',
                overflowY: isScrollable ? 'auto' : '',
              }),
            }}
          />
        </div>
      </Tooltip>
    </>
  );
};
export default SelectBase;

import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import { Manager, Reference, Popper } from 'react-popper';
import matchSorter from 'match-sorter';

import {
  StyledSelectWrapper,
  StyledSelectButton,
  StyledSelectInput,
  StyledSelectMenu,
  PopperManagerStyles
} from './Select-styled';

import { FormControlContext } from '../Form/FormControl';

const Select = ({
  children,
  filterable,
  fullWidth,
  minimal,
  style,
  id,
  placeholder,
  selectedItem,
  selectedValue,
  menuStyle,
  wrapperStyle,
  horizontal,
  label,
  onChange,
  positionFixed,
  ...other
}) => {
  function getAnchorElement(params) {
    const {
      ref,
      getToggleButtonProps,
      getInputProps,
      placeholder,
      selectedItem
    } = params;

    if (filterable) {
      return (
        <FormControlContext.Consumer>
          {({ formControlContext }) => (
            <StyledSelectInput
              as="input"
              onClick={getToggleButtonProps().onClick}
              {...getInputProps({
                placeholder: placeholder,
                id: id || formControlContext._generatedId,
                fullWidth: fullWidth,
                minimal: minimal,
                style: style,
                ...other
              })}
              ref={ref}
            />
          )}
        </FormControlContext.Consumer>
      );
    }
    return (
      <FormControlContext.Consumer>
        {({ formControlContext }) => (
          <StyledSelectButton
            {...getToggleButtonProps()}
            {...getInputProps()}
            as="button"
            fullWidth={fullWidth}
            minimal={minimal}
            ref={ref}
            id={id || formControlContext._generatedId}
            style={style}
            {...other}
          >
            {itemToString(selectedItem)
              ? itemToString(selectedItem)
              : placeholder}
          </StyledSelectButton>
        )}
      </FormControlContext.Consumer>
    );
  }

  function itemToString(item) {
    let label = item;
    if (item && item.props) {
      label = item.props.label || item.props.children || item;
    }

    return label;
  }

  function downshiftOnChange(selectedItem, downshiftProps) {
    const value = selectedItem.props.value;
    onChange(value, selectedItem);
  }

  function _getItemFromValue(value) {
    if (!value) return null;

    return (
      children.filter(child => {
        return child.props.value === value;
      })[0] || null
    );
  }

  function getMenuItems(
    inputValue,
    getItemProps,
    highlightedIndex,
    selectedItem
  ) {
    // return the full list if they reopen the dropdown
    // filter if they change the inputValue
    const inputMatchesSelection = inputValue === itemToString(selectedItem);

    if (filterable && inputValue && !inputMatchesSelection) {
      return matchSorter(children, inputValue, {
        keys: ['props.children', 'props.value']
      }).map((child, index) =>
        React.cloneElement(child, {
          ...getItemProps({
            item: child,
            active: highlightedIndex === index,
            selected: selectedItem === child,
            key: index
          })
        })
      );
    }

    return children.map((child, index) =>
      React.cloneElement(child, {
        ...getItemProps({
          item: child,
          active: highlightedIndex === index,
          selected: selectedItem === child,
          key: index
        })
      })
    );
  }

  function getFullWidthStyle() {
    if (fullWidth) {
      return { minWidth: '100%' };
    }
  }

  return (
    <Manager style={{ ...PopperManagerStyles, ...wrapperStyle }}>
      <Downshift
        itemToString={itemToString}
        onChange={downshiftOnChange}
        selectedItem={selectedItem || _getItemFromValue(selectedValue)}
      >
        {({
          getRootProps,
          getToggleButtonProps,
          getInputProps,
          getItemProps,
          isOpen,
          selectedItem,
          highlightedIndex,
          inputValue
        }) => (
          <StyledSelectWrapper
            {...getRootProps({}, { suppressRefError: true })}
          >
            <Reference style={{ display: 'inline-block' }}>
              {({ ref }) => {
                return getAnchorElement({
                  ref,
                  getToggleButtonProps,
                  getInputProps,
                  placeholder,
                  selectedItem,
                  labelEl: label,
                  horizontal
                });
              }}
            </Reference>
            {isOpen ? (
              <Popper positionFixed={positionFixed} placement={other.placement}>
                {({ ref, style, placement }) => {
                  return (
                    <StyledSelectMenu
                      ref={ref}
                      style={{
                        ...style,
                        ...getFullWidthStyle(),
                        ...menuStyle
                      }}
                      data-placement={placement}
                      fullWidth={fullWidth}
                    >
                      {getMenuItems(
                        inputValue,
                        getItemProps,
                        highlightedIndex,
                        selectedItem
                      )}
                    </StyledSelectMenu>
                  );
                }}
              </Popper>
            ) : null}
          </StyledSelectWrapper>
        )}
      </Downshift>
    </Manager>
  );
};

Select.propTypes = {
  /** Nodes to be used as options in the Select */
  children: PropTypes.node,
  /** Toggle the select to use an input and allow filtering of the items */
  filterable: PropTypes.bool,
  /** Callback function fired when the value of the Select changes. */
  onChange: PropTypes.func,
  /** The selected item of the select */
  selectedItem: PropTypes.node,
  /** Value of the selected item */
  selectedValue: PropTypes.node,
  /** Placeholder text for the input */
  placeholder: PropTypes.string,
  /** Whether or not the select will fill its container's width */
  fullWidth: PropTypes.bool,
  /** A style variant for select inputs */
  minimal: PropTypes.bool,
  /** HTML prop for the Select, works together with a label's `for` prop */
  id: PropTypes.string,
  /** Style prop applied to the menu wrapper */
  menuStyle: PropTypes.object,
  /** Uses `position: fixed` on the tooltip allowing it to show up outside of containers that have `overflow: hidden` */
  positionFixed: PropTypes.bool,
  /** Specify where the menu should appear in relation to the Select element */
  placement: PropTypes.oneOf([
    'auto',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end'
  ])
};

Select.defaultProps = {
  placeholder: 'Select...',
  placement: 'bottom-start'
};

export default Select;

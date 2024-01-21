import * as React from 'react';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import {styled} from '@mui/system';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
        <BaseNumberInput
            slots={{
                root: StyledInputRoot,
                input: StyledInputElement,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: '▴',
                },
                decrementButton: {
                    children: '▾',
                },
            }}
            {...props}
            ref={ref}
        />
    );
});

export default function NumberInputBasic({onValueChange}) {
    const [value, setValue] = React.useState(0);

    const sendValue = (val) => {
        setValue(val);
        onValueChange(val);
    };

    return (
        <NumberInput
            aria-label="Demo number input"
            placeholder=""
            value={value}
            onChange={(event, val) => sendValue(val)}
            onInput={(event) => sendValue(event.target.value)}
        />
    );
}


const StyledInputRoot = styled('div')(
    ({theme}) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  background: #3c3c3c;
  border: 1px solid #3c3c3c;
  box-shadow: 0px 2px 2px #3c3c3c;
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding-left: 4px;
  padding-right: 6px;
  border-radius:3px;


  &:hover {
    border-color: #3c3c3c;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
    ({theme}) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: #21db9a;
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 1px 13px;
  outline: 0;
`,
);

const StyledButton = styled('button')(
    ({theme}) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding-top: 5px;
  width: 1px;
  height: 1px;
  font-family: system-ui, sans-serif;
  font-size: 1.3rem;
  line-height: 1;
  box-sizing: border-box;
  background: #21db9a;
  border: 0;
  color: #21db9a;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: #21db9a;
    border-color: #21db9a;
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    &:hover {
      cursor: pointer;
    }

  border-color: #3C3C3C;
  background: #3C3C3C;
  color: #21db9a;
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    &:hover {
      cursor: pointer;
    }

  border-color: #3C3C3C;
  background: #3C3C3C;
  color: #21db9a;
  }
  & .arrow {
    transform: translateY(-1px);
  }
`,
);
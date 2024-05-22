import { borderBottom, borderBottomColor, borderTop } from '@mui/system';
import Select from 'react-select';

export default function Dropdown (props) {

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '6px',
            opacity: state.isDisabled ? '0.6' : '1',
            backgroundColor: '#3C3C3C',
            minHeight: '30px',
            cursor: 'pointer',
        }),

        singleValue: (provided) => ({
            ...provided,
            color: '#21db9a',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            fontSize: '16px',
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: '#151516',
            borderRadius: '10px',
        }),

        menuList: (provided) => ({
            ...provided,
            maxHeight: '232px',
            border: '4px solid #3C3C3C',
            borderRadius: '13px',
            '::-webkit-scrollbar' : {
                width: '2px'
              },
            
              '::-webkit-scrollbar-thumb' : {
                backgroundColor: '#9E9E9E',
                borderRadius: '6px'
              },
            
              '::-webkit-scrollbar-track' : {
                backgroundColor: '#0E0E0F',
                borderRadius: '15px'
              }
        }),

        option: (provided, state) => ({
            ...provided,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            fontSize: '16px',
            borderTop: '1px solid #3c3c3c',
            backgroundColor: '#151516',
            color: state.isSelected ? '#21DB9A' : '#ababab',
            ':hover': {
                backgroundColor: '#151516',
                color: '#ffffff',
            },
        }),

        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: '#3c3c3c',
        }),

        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#21db9a',
            cursor: 'pointer',
            ':hover': {
                color: '#9e9e9e',
            },
        }),

        clearIndicator: (provided) => ({
            ...provided,
            color: '#21db9a',
            cursor: 'pointer',
            ':hover': {
                color: '#9e9e9e',
            },
        }),

        input: (provided) => ({
            ...provided,
            color: '#21db9a',
        }),
    }

    const handleChange = (selectedValue) => {
        props.onChange(selectedValue ? selectedValue.value : undefined);
    };
    

    return (
        <Select
            styles={customStyles}
            isClearable={true} 
            isSearchable={props.searchable === undefined ? true : props.searchable}
            isDisabled={props.disabled}
            options={props.options} 
            value={(props.value === null ) ? null : props.value && props.options.find(opt => opt.value === props.value)}
            placeholder={props.placeholder ? props.placeholder : ""}
            name={props.name}
            id={props.id}
            onChange={props.onChange && handleChange}
            onFocus={props.onFocus}
        />
    );
};



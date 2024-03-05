import Select from 'react-select';

export default function Dropdown (props) {

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '6px',
            backgroundColor: '#3C3C3C',
            minHeight: '30px',
            cursor: 'text',
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
            backgroundColor: '#1e1e1f',
            borderRadius: '10px',
        }),

        menuList: (provided) => ({
            ...provided,
            maxHeight: '145px',
            border: '3px solid #3C3C3C',
            borderRadius: '10px',
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
            borderRadius: '8px',
            backgroundColor: state.isSelected ? '#1e1e1f' : null,
            color: state.isSelected ? '#21DB9A' : '#9E9E9E',
            ':hover': {
                backgroundColor: '#1e1e1f',
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
            options={props.options} 
            defaultValue={props.defaultValue && props.options.filter(opt => opt.value === props.defaultValue)}
            placeholder={props.placeholder ? props.placeholder : ""}
            name={props.name}
            id={props.id}
            onChange={props.onChange && handleChange}
            onFocus={props.onFocus}
        />
    );
};



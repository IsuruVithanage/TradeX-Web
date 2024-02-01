import CreatableSelect from 'react-select/creatable';
import './Dropdown.css';

export default function Dropdown (props) {

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '6px',
            backgroundColor: '#3C3C3C58',
            minHeight: '30px',
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
            border: ' 1px solid #21db9a',
            borderRadius: '10px',
        }),

        option: (provided, state) => ({
            ...provided,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            fontSize: '16px',
            borderRadius: '8px',
            backgroundColor: state.isSelected ? '#21db9a' : null,
            color: state.isSelected ? '#ffffff' : '#21db9a',
            ':hover': {
                backgroundColor: '#3c3c3c',
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


    return (
        <CreatableSelect
            styles={customStyles}
            isClearable={true} 
            options={props.options} 
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
        />
    );
};



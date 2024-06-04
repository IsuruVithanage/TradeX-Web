import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";


const StyledButton = styled(Button)(( props ) => {
    const red = props.red === 'true' ? true : false
    if( props.outlined === 'true' ){
        return {
            color: red ? '#ff0000' : '#21DB9A',
            '&:hover': {
                backgroundColor: red ? '#FF00001A' : '#21DB9A1A',
            },
            '&.MuiButton-root': {
                width: '100%',
                height: '34px',
            },
            '&.Mui-disabled': {
                color: red ? '#ff0000 !important' : '#21DB9A !important',
                borderColor: red ? '#ff0000 !important' : '#21DB9A !important', 
                opacity: '0.4',
            },
            textTransform: 'none',
            fontSize: '16px',
            fontWeight:'400',
            fontFamily: 'inter',
            borderRadius:'6px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: red ? '#ff0000' : '21DB9A'
        }
    }else{
        return {
            color: '#ffffff',
            backgroundColor: red ? '#D60202' : '#00cd85',
            '&:hover': {
                backgroundColor: red ? '#FF0000' : '#21DB9A',
            },
            '&.MuiButton-root': {
                width: '100%',
                height: '34px'
            },
            '&.Mui-disabled': {
                opacity: '0.3',
                color: '#ffffff !important'
            },
            transition: 'opacity 0.3s ease-in-out',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight:'500',
            fontFamily: 'inter',
            borderRadius:'6px',
        }
    }
    
    
});

export default function ButtonMUI(props){
    return (
        <StyledButton
            style={props.style}
            onClick={() => props.onClick()}
            outlined={props.outlined ? 'true' : 'false'}
            red={props.red ? 'true' : 'false'}
            disabled={props.disabled && props.disabled}
        >
            {props.icon && <span className="icon">{props.icon}</span>}
            {props.value}
        </StyledButton>
    )
}










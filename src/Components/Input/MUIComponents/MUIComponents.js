import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Fab from '@mui/material/Fab';
import Switch from '@mui/material/Switch';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';


const StyledButton = styled(Button)(( props ) => {
    const red = props.red === 'true' ? true : false
    if( props.outlined === 'true' ){
        return {
            color: red ? '#ff0000' : '#21DB9A',
            '&:hover': {
                backgroundColor: red ? '#ff00001a' : '#21DB9A1A',
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
            backgroundColor: red ? '#ff0000' : '#21DB9A',
            '&:hover': {
                backgroundColor: red ? '#d60202' : '#1dbb85'
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

export function ButtonComponent(props){
    return (
        < StyledButton
            style={props.style}
            onClick={props.onClick}
            outlined={props.outlined ? 'true' : 'false'}
            red={props.red ? 'true' : 'false' } 
            disabled= {props.disabled && props.disabled}>
            {props.value}
        </StyledButton>
    )
}



const StyledFAB = styled(Fab)(() => {
    return {
        position: 'fixed',
        bottom: '50px',
        right: '35px',
        color: '#21DB9A',
        backgroundColor: '#0c281e',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        '&:hover': {
            backgroundColor: '#0f3e2d'
        }
    }
});

export function FABComponent(props){
    return (
        <StyledFAB id={props.id} style={props.style} onClick={props.onClick}>
            { props.icon ? props.icon : <NotificationAddOutlinedIcon style={{height: "50px"}}/> }   
        </StyledFAB>
    )
}





const StyledSwitch = styled(Switch)(() => {
    return {
        '&.MuiSwitch-root': {
            transform: 'translateX(10px)',
        },
        '& .MuiSwitch-switchBase': {
            color: '#9E9E9E',
            '&.Mui-checked': {
                color: '#21DB9A',
                '& + .MuiSwitch-track': {
                    backgroundColor: '#21DB9A60 !important',    
                },
            },
        },
        '& .MuiSwitch-track': {
            backgroundColor: '#3C3C3C !important',
            opacity: '1 !important',
            height: '14px',
            width: '40px',
        },
    }
});


export function SwitchComponent(props){
    const handleChange = (e) => {
        props.onChange(e.target.checked)
    }

    return (
        <label style={{
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginTop: "30px", 
                color: "#9E9E9E", 
                cursor: "pointer"
            }}>

            <span style={{
                fontFamily: "Inter, sans-serif", 
                fontSize: "16px", 
                fontWeight: "500"
            }} >{props.toggleLabel}</span>

            <StyledSwitch
                id={props.id}
                name={props.name}
                checked={props.checked}
                onChange={props.onChange && handleChange}
                onClick={props.onClick}
            />
        </label>
        
    )
}
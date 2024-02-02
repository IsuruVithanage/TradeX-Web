import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonComponent = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#000000'),
    backgroundColor: '#21DB9A',
    '&:hover': {
        backgroundColor: '#1dbb85'
    },
    '&.MuiButton-root': {
        width: '100%',
        height: '2.2em'
    },
    fontSize: '0.95em',
    fontWeight:'bold',
    fontFamily: 'inter',
    borderRadius:'6px',
    padding: '0'
}));



export default ButtonComponent;
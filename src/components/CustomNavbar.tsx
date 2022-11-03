import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ThemeContext } from '../context/themeContext/themeContext';
import SwitchThemeBtn from './SwitchThemeBtn';

const CustomNavbar = () => { 

    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    return ( 
        <Navbar expand="lg" variant={`${darkMode ? "dark" : "light"}`} bg={`${darkMode ? "dark" : "light"}`}>
            <Container>
                <Navbar.Brand href="/">YCP</Navbar.Brand>
                <SwitchThemeBtn />
            </Container>
        </Navbar>
     );
}
 
export default CustomNavbar;
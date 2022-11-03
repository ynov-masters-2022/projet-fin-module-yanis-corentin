import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/themeContext/themeContext';
import SwitchThemeBtn from './SwitchThemeBtn';

const CustomNavbar = () => { 

    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    return ( 
        <Navbar expand="lg" variant={`${darkMode ? "dark" : "light"}`} bg={`${darkMode ? "dark" : "light"}`}>
            <Container>
                <Link to={'/'}>
                    <Navbar.Brand>YCP</Navbar.Brand>
                </Link>
                <SwitchThemeBtn />
            </Container>
        </Navbar>
     );
}
 
export default CustomNavbar;
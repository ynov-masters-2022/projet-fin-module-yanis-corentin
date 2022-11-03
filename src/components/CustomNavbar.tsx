import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

const CustomNavbar = () => {
    return ( 
        <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
                <Link to={'/'}>
                    <Navbar.Brand>YCP</Navbar.Brand>
                </Link>
            </Container>
        </Navbar>
     );
}
 
export default CustomNavbar;
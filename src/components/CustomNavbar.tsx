import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const CustomNavbar = () => {
    return ( 
        <Navbar expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand href="#">YCP</Navbar.Brand>
            </Container>
        </Navbar>
     );
}
 
export default CustomNavbar;
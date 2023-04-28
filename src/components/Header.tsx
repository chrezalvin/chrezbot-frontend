import {Nav, Navbar, Container, Button} from "react-bootstrap";

function Header() {
  return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="mx-2" fluid={true}>
          <Navbar.Brand href="#home">
            Chrez Bot
          </Navbar.Brand>

          <Nav>
            <Nav.Link href="#home">
              <Button>Login</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Header;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Navbar.scss";

// const Navbar = ({ appProps, handleLogout }) => {
//   return (
//     !appProps.isAuthenticating && (
//       <div className="nav-wrapper">
//         <div className="nav-container-1">
//           <NavLink to="/" className="nav-link">
//             <h3>Pocketlist</h3>
//           </NavLink>
//           <NavLink to="/dashboard" className="nav-link">
//             <h3 className="nav-container-1-h3">Dashboard</h3>
//           </NavLink>
//           <NavLink to="/create" className="nav-link">
//             <h3 className="nav-container-1-h3">Create Item</h3>
//           </NavLink>
//           <NavLink to="/edit" className="nav-link">
//             <h3 className="nav-container-1-h3">Edit Item</h3>
//           </NavLink>
//         </div>
//         {appProps.isAuthenticated ? (
//           <button onClick={handleLogout}>Logout</button>
//         ) : (
//           <div className="nav-container-3">
//             <NavLink to="/signup" className="nav-link">
//               <h3 className="nav-container-3-h3">Signup</h3>
//             </NavLink>
//             <NavLink to="/login" className="nav-link">
//               <h3 className="nav-container-3-h3">Login</h3>
//             </NavLink>
//           </div>
//         )}
//       </div>
//     )
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavigationBar.scss";

const NavigationBar = ({ appProps, handleLogout }) => {
  return (
    !appProps.isAuthenticating && (
      <div className="NavigationBar container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Pocketlist</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {appProps.isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  );
};

export default NavigationBar;

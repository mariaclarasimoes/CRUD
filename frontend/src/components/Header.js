import React from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
    background-color: #333;
    padding: 10px 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavbarBrand = styled.a`
    font-size: 24px;
    text-decoration: none;
    color: white;
`;

const NavbarNav = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li`
    margin-right: 20px;
`;

const NavLink = styled.a`
    text-decoration: none;
    color: white;
    transition: color 0.3s ease;

    &:hover {
        color: #5873be;
    }
`;


const Header = () => {
    return (
        <Navbar>
            <NavbarBrand href="#">PETMANIA</NavbarBrand>
            <NavbarNav>
                <NavItem><NavLink href="#">Registrations</NavLink></NavItem>
                <NavItem><NavLink href="#">Appointments</NavLink></NavItem>
                <NavItem><NavLink href="#">Support</NavLink></NavItem>
            </NavbarNav>
        </Navbar>
    );
};

export default Header;

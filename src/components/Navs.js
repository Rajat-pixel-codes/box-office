import React from 'react';
import { useLocation } from 'react-router';
import { LinkStyled, NavList } from './Navs.styled';

const LINKS = [
  { to: '/', Text: 'Home' },
  { to: '/starred', Text: 'starred' },
];

function Navs() {
  const location = useLocation();
  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li key={item.to}>
            <LinkStyled
              to={item.to}
              className={item.to === location.pathname ? 'active' : ''}
            >
              {item.Text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
}

export default Navs;

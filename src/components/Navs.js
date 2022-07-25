import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', Text: 'Home' },
  { to: '/starred', Text: 'starred' },
];

function Navs() {
  return (
    <div>
      <ul>
        {LINKS.map(item => (
          <li key={item.to}>
            <Link to={item.to}>{item.Text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navs;

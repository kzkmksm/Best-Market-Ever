import React, { Fragment } from 'react';
import { logout } from '../../../store/user/middleware';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

function Header({ user, dispatch }) {

  const handleLogout = async () => {
    dispatch(logout());
  };

  let profileBlock;
  if (!user.isNotAuthenticated) {
    profileBlock = (
      <div className='header-profile'>
        {user.username + ' ' + user.balance.toFixed(2) + ' $'}
        <Button color='primary' className='space-left' onClick={handleLogout}>Sign out</Button>
      </div>
    );
  } else {
    profileBlock = (
      <nav className='header-profile header-nav'>
        <NavLink to='/authentication' className='link nav-link header-link' activeClassName='link-active'>Sign in</NavLink>
        <NavLink to='/registration' className='link nav-link header-link' activeClassName='link-active'>Sign up</NavLink>
      </nav>
    );
  }

  let links;
  if (!user.isNotAuthenticated) {
    links = (
      <NavLink to='/operations' className='link nav-link header-link' activeClassName='link-active'>Operations</NavLink>
    );
    if (user.type === 'admin') {
      links = (
        <Fragment>
          <NavLink to='/users' className='link nav-link header-link' activeClassName='link-active'>Users</NavLink>
          <NavLink to='/operations' className='link nav-link header-link' activeClassName='link-active'>Operations</NavLink>
        </Fragment>
      );
    }
  }

  return (
    <header className="app-header">
      <div className='header-left'>
        <Typography variant='h5'>Best Market Ever</Typography>
        <nav className='header-nav'>
          <NavLink to='/' className='link nav-link header-link' exact activeClassName='link-active'>Main</NavLink>
          { links }
        </nav>
      </div>
      { profileBlock }
    </header>
  );
}

export default Header;
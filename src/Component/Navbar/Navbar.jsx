import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@material-ui/core'

import logo from '../../asset/logo.jpg'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import useStyles from './styles'
import { Link ,useLocation} from 'react-router-dom'

const Navbar = ({ totalItem }) => {
  const classes = useStyles()
  const location=useLocation();
  return (
    <AppBar position='fixed' className={classes.appBar} color='inherit'>
      <Toolbar>
        <Typography component={Link}
            to='/'>
          <img
            src={logo}
            alt='commerce.js '
            height='25px'
            className={classes.image}
            
          />
          Commerce.js
        </Typography>
        <div className={classes.grow}> </div>
        <div className={classes.button}>
        {location?.pathname==="/" && <IconButton
            component={Link}
            to='/cart'
            area-label='show car items'
            color='inherit'
          >
           
            <Badge badgeContent={totalItem} color='secondary'>
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>}
          
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

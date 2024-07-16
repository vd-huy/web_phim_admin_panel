import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

// eslint-disable-next-line react/prop-types
const NavBar = ({handleShowSidebar}) => {
  return (
    <Box sx={{ position:'sticky',zIndex:99,top:0, width:'100%', height:'60px'}}>
      <AppBar position="static">
        <Toolbar sx={{ display:'flex'}}>
          <IconButton onClick={handleShowSidebar}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            News
          </Typography>
          <Button color="inherit" >Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar

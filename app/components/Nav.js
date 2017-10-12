import React from 'react'; 
import { NavLink } from 'react-router-dom'

const Nav = () =>{
 return(
    <div id='navContainer'>
      <p id='disclaimer'>Coupon codes on this website are not intended to indicate any affiliation with the merchant in question. Any copyrights are property of the respective merchant.</p>
      <ul id='navList'>     
        <li> 
          <NavLink exact className='navlink' activeClassName='active' to='/'>
            Home 
          </NavLink>
    	  </li>
        &nbsp;|&nbsp; 
        <li>
          <NavLink className='navlink' activeClassName='active' to='/contact'>
            Contact 
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

module.exports = Nav; 

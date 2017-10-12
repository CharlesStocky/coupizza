import { Switch, Route, BrowserRouter } from 'react-router-dom'; 
import React from 'react'; 
import Codelist from './Codelist'; 
import Home from './Home'; 
import Contact from './Contact'; 
import Nav from './Nav'; 
import css from './main.css'
import homePizza from '../../pizzaHome.jpg'

class App extends React.Component{ 
  render(){
    return(
      <BrowserRouter>
        <div>
          <Switch> 
            <Route exact path='/' component={Home} />
            <Route path='/codelist' component={Codelist} />
	          <Route path='/contact' component={Contact} />
          </Switch>
          <Nav />
        </div>
      </BrowserRouter>
    )
  }
}


module.exports = App; 

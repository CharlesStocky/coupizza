import React from 'react'; 
import Codelist from './Codelist'
import 'whatwg-fetch'

class FormComp extends React.Component{
  constructor(){
    super()
    this.state={
      zip: '' 
    } 
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    let value = e.target.value 
    this.setState({
      zip: value 
    })
  }
  handleSubmit(e){
    e.preventDefault()
    this.setState({
      zip: '' 
    })
    this.props.onSubmit(
      this.state.zip
    )
  }
  render(){
    return(
      <div id='form'>
        <h2 className="homeHead">Enter your zip code to find pizza codes!</h2>
        <form onSubmit={this.handleSubmit}>
          <input type='text' id='input' value={this.state.zip} onChange={this.handleChange} placeholder='Enter zip code' />
          <input type='submit' id='search' value='Search'/>
        </form>
        <div id='homePic'>
          <img id='homeImg' src={require('../../pizzaHome.jpg')}/>
        </div>  
      </div>
    ) 
  } 
}


class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
      zip: '' 
    } 
    this.handleSubmit = this.handleSubmit.bind(this)
    this.render = this.render.bind(this)
  }
  handleSubmit(zip){//update on searce
    this.props.history.push('/codelist?zip=' + zip)
  }
  render(){
    let codes = this.state.codes
    return (
      <div id='mainContain'>
        <FormComp onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

module.exports = Home; 

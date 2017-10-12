import React from 'react'; 
import queryString from 'query-string'; 
import 'whatwg-fetch'; 
import MapComp from './Map'
var GoogleMapsLoader =  require('google-maps')

class Codelist extends React.Component{
  constructor(){
    super()
    this.state={
      isLoading: true,
      latitude: 0,
      longitude: 0,
      codes: [] 
    } 
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount(){
    fetch('/api/codelist' + this.props.location.search) 
      .then((res)=>{
        return res.json() 
      })
      .then((arr)=>{
        this.setState({
          isLoading: false,
          codes: arr.codelist,
          longitude: arr.longitude,
          latitude: arr.latitude
        }) 
      })
  }
  render(){
    let i = 0
    return (
      <div id='codelistContainer'>
        <div id='header'>
          <h4>Codes available in your area:</h4>
        </div>
        <div id='codelist'>
          <ul className="codesLi">
            { 
              this.state.isLoading === true && 
                <p id='loading'>Loading...</p>
            }
            {
              this.state.codes.length > 0 &&   
                this.state.codes.map((codeObj)=>{
                  i++
                  return <li id='codes' key={i}>{codeObj.code}</li> 
                })
            }
            {
              this.state.codes.length === 0 && !this.state.isLoading &&
              <p id='noCodes'>No codes found.</p>
            }
          </ul>
          <div id='spacer'>
            <MapComp lati={this.state.latitude} long={this.state.longitude}/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Codelist; 

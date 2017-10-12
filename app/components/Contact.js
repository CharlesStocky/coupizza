import React from 'react'; 

class Contact extends React.Component{
  render(){
    return (
      <div id='contactDiv'>
        <p>If you have any questions or suggestions, feel free to send us a message!</p>
        <form method='POST' action={'mailto:t0mm4s70ck4@gmail.com'}>  
          <p>Email:</p>
          <input type='text' name='email'/>
          <p>Text:</p>
          <input type='text' name='text'/>
          <button type='submit'/>
        </form>
      </div>
    )  
  }
}

module.exports = Contact; 

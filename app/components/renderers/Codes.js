import React from 'react'; 

export default (codeObjects) =>{
  if(codeObjects.length > 0){
    let i = 0
    return(
      codeObjects.map((codeObject)=>{
        i++;
        return(
          <li key={i}>{codeObj.code}</li> 
        )  
      })
    )
  } 
}

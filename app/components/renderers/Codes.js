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
  return <h1>Something went wrong! Check back later. </h1>
}

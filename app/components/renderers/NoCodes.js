import React from 'react'; 

export default (codes, loading) =>{
  if(codes.length === 0 && loading === false){
    return <p>No codes found</p>  
  }
}

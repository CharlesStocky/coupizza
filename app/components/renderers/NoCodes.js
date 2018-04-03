import React from 'react'; 

export default (codes, loading) =>{
  if(codes.length === 0 && loading === false){
    return <div>No codes found</div>  
  }
}

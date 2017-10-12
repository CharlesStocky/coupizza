import express from 'express'; 
import filterCodes from '../filterCodes';  

const router = express.Router()

router.get('/', (req, res)=>{
  if(!req.query.zip){
    res.json({'codelist': [{'code': 'No zip code entered'}], 'latitude': 0, 'longitude': 0}) 
  }
  filterCodes(req.query.zip).then((arr)=>{
    res.json(arr);    
  })
})

module.exports = router; 



import { Description } from "@mui/icons-material"


const initialState={
    cart:{},
    

}
export default  function RootReducer(state=initialState,action)
{ 
  switch(action.type)
  { case 'ADD_TO_CART':
       state.cart[action.payload[0]]=action.payload[1]   
       console.log(state.cart)
       return ({cart:state.cart})
       
     default:
      return ({cart:state.cart})
 

  }

}

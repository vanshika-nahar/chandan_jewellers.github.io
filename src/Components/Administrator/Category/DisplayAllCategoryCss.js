import { createStyles, makeStyles } from '@mui/styles';
import { color } from '@mui/system';

 export  const  useStyles = makeStyles({
  
     maincontainer:{
       width:'100wh',
       height:'100vh',
       background:'#f5f6fa',
       justifyContent:'center',
       display:'flex'
    },

    box:{ borderRadius:20,
        width:'80%',
        height:'40%',
        background:'white ',
        marginTop:'3%'

    },
    heading:{
        fontSize:20,
        fontWeight:'bolder',
     
       
    },
    images:{
         height:30,
         width:40,
         borderRadius:5 ,
         marginLeft:100,
        
        },
   center:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
   }
  
});
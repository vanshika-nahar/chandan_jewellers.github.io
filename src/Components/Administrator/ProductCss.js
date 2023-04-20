import { createStyles, makeStyles } from '@mui/styles';
import { color } from '@mui/system';

 export  const  useStyles = makeStyles({
  
     maincontainer:{
       width:'100wh',
       height:'100vh',
       justifyContent:'center',
       alignItems:'center',
       display:'flex',
       background:'#f5f6fa',
    },

    box:{ borderRadius:20,
        width:'55%',
        height:'auto%',
        background:'white ',
        padding:'30px',

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
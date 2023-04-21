import { createStyles, makeStyles } from '@mui/styles';
import { color } from '@mui/system';

 export  const  useStyles = makeStyles({
  
     maincontainer:{
       width:'100wh',
       justifyContent:'center',
       display:'flex'
    },

    box:{ borderRadius:30,
        width:'40%',
        height:'50%',
        marginTop:'3%',
        background:'white ',
        padding:'30px',

    },
    headingContainer:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-between",
    },

    heading:{
        fontSize:32,
        fontVariant:"small-caps",
        fontWeight:'bolder',
        fontWeight:"bold"
    },
});
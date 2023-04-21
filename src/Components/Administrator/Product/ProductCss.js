import { createStyles, makeStyles } from '@mui/styles';
import { color } from '@mui/system';

export const useStyles = makeStyles({

    maincontainer: {
        width: '100wh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },

    box: {
        borderRadius: 20,
        width: '55%',
        height: 'auto%',
        background: 'white ',
        padding: '30px',
        marginTop:15

    },
    headingContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
    },

    heading: {
        fontSize: 32,
        fontVariant: "small-caps",
        fontWeight: 'bolder',
        fontWeight: "bold"
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
import Typography from '@mui/material/Typography';

function Header(){
    return(
        <div style = {{borderBottom: '2px solid gray'}}>
            <Typography height= "30px" width="250px" sx={{backgroundColor: '#3f9ac9', color: 'white', textAlign: 'center', fontSize: '20px'}}>
                DCCS Tuzla
            </Typography>
        </div>
    )
}

export default Header;
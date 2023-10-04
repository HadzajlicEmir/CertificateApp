import { Link } from "react-router-dom";
import CertificateOverview from "./CertificateOverview";
import { Button } from '@mui/material';

function Example1(){
return(
    <div>
        <Link to='/new-certificate'>
        <Button sx={{backgroundColor: '#c2cb38', width:'150px', border:'1px solid olive', textTransform:'none', margin: '5px', textDecoration: 'none', color: 'white', borderRadius: '0px', "&:hover":{backgroundColor: '#c2cb38'}}}>
            New certificate
        </Button>
        </Link>
        <CertificateOverview />
    </div>
)
}

export default Example1;
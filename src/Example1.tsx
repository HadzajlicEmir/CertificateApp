import { Link } from "react-router-dom";
import CertificateOverview from "./CertificateOverview";
import { Button } from '@mui/material';

function Example1(){
return(
    <div>
        <Button sx={{backgroundColor: 'olive'}}>
            <Link style={{textDecoration: 'none', color: 'white'}} to='/new-certificate'>New Certificate</Link>
            </Button>
        <CertificateOverview />
    </div>
)
}

export default Example1;
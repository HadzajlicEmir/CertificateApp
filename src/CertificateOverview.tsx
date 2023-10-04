import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Certificate } from './NewCertificate';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function CertificateOverview(){
    const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
    const [id, setId] = useState(0)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<SVGSVGElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setId(id)
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const columns = ["Supplier", "Certificate Type", "Valid from", "Valid to"];
    let certificates:Certificate[] = [];
    const certificatesString = localStorage.getItem('certificates');
    if (certificatesString){
     certificates = JSON.parse(certificatesString);
    }
    
    const handleDelete = () => {
        const updatedValues = certificates.filter(item => item.id !== id);
        localStorage.setItem('certificates', JSON.stringify(updatedValues));
        handleClose();
    }
    
    return(
        <div style={{padding: '10px', border: '2px solid lightgray', margin: '5px'}}>
        <TableContainer sx={{borderTop: '1px solid lightgray', margin:'5px'}}>
        <Table>
        <TableHead>
            <TableRow>
            <TableCell></TableCell>
            <TableCell style={{borderLeft:'1px solid lightgray', width:'250px'}}>Supplier</TableCell>
            <TableCell style={{borderLeft:'1px solid lightgray', width:'250px'}}>Certificate Type</TableCell>
            <TableCell style={{borderLeft:'1px solid lightgray', width:'250px'}}>Valid from</TableCell>
            <TableCell style={{borderLeft:'1px solid lightgray', width:'250px'}}>Valid to</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {certificates.map(row => (
                <TableRow key={row.id}>
                    <TableCell> <SettingsIcon onClick={(event) => handleClick(event, row.id)} /> </TableCell>
                    <Menu
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                    >
                    <Link style={{textDecoration:'none', color: 'black'}} to={'/new-certificate/'.concat(id.toString())}>
                    <MenuItem>Edit</MenuItem>
                    </Link>
                    <MenuItem sx={{color: 'black'}} onClick={() => handleDelete()}>
                    Delete
                    </MenuItem>
                    </Menu>
                    <TableCell>{row.supplier}</TableCell>
                    <TableCell>{row.certificateType}</TableCell>
                    <TableCell>{row.validFrom}</TableCell>
                    <TableCell>{row.validTo}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
        </TableContainer>
        </div>
    )

}

export default CertificateOverview;     
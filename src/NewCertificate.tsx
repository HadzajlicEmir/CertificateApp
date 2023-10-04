import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SupplierDialog from './SupplierDialog';
import UserDialog from './UserDialog';
import { User } from './UserDialog';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer'
import { UserContext } from './UserContext';
import { DesktopDatePicker } from '@mui/x-date-pickers';


export interface Certificate{
    id: number,
    supplier: string,
    certificateType: string,
    validFrom: string,
    validTo: string,
    users: User[]
}

function NewCertificate(){    
    
    const uniqueId = Math.floor(Math.random()*10000000000);
    const [newCertificate, setNewCertificate] = useState<Certificate>({id:uniqueId, supplier:'', certificateType:'', validFrom: '', validTo: '', users:[]});

    const {paramId} = useParams();
    useEffect(()=>{
        if (paramId){
            const certificatesString = localStorage.getItem('certificates');
        if(certificatesString){
            const certificates = JSON.parse(certificatesString);
            const certificate = certificates.find((item:Certificate) => item.id === Number.parseInt(paramId));
            if (certificate){
            setNewCertificate(certificate);
            } 
        }
        }
    }, [paramId])
    

    function changeSupplier(value: string){
        setNewCertificate({...newCertificate, supplier: value});
    }
    function changeCertificateType(value: string){
        setNewCertificate({...newCertificate, certificateType: value});
    }
    function changeValidFrom(value: string){
        setNewCertificate({...newCertificate, validFrom: value});
    }
    function changeValidTo(value: string){
        setNewCertificate({...newCertificate, validTo: value});
    }
    function changeUsers(value: User[]){
        setNewCertificate({...newCertificate, users: value});
    }
    function onSave(){
        const certificatesString = localStorage.getItem('certificates');
        if (paramId && certificatesString){
            let certificates:Certificate[] = JSON.parse(certificatesString);
            certificates.forEach((certificate:Certificate) => {
                if(certificate.id === Number.parseInt(paramId)){
                    certificate.supplier = newCertificate.supplier;
                    certificate.certificateType = newCertificate.certificateType;
                    certificate.validFrom = newCertificate.validFrom;
                    certificate.validTo = newCertificate.validTo;
                    certificate.users = newCertificate.users;
                }
            })
            localStorage.setItem('certificates', JSON.stringify(certificates));
                      
        }  
        else {
            if (certificatesString){
            let certificates = JSON.parse(certificatesString);
            certificates.push(newCertificate);
            localStorage.setItem('certificates', JSON.stringify(certificates));
            } 
            else {
            let certificates = [];
            certificates.push(newCertificate);
            localStorage.setItem('certificates', JSON.stringify(certificates));
            }
        }
    }
    function removeUser(value: User){
        changeUsers(newCertificate.users.filter(item => item.id !== value.id));
    }
  
    const [isOpen, setIsOpen] = useState(false);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

    const userContext = useContext(UserContext);

    return(
        <div style={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{ marginBottom: '10px'}}>
                <Typography fontSize={'14px'} sx={{fontStyle: 'italic', marginLeft:'10px'}}>Supplier: </Typography>
                <div style={{display:'flex', flexDirection:'row', marginLeft:'10px'}}>
                    <input readOnly onChange={(event) => changeSupplier(event.target.value)} type='text' value={newCertificate.supplier} style={{ width: '500px', height: '35px', border: '1px solid lightgray', borderRadius: '0px'}}/>
                    <Button sx={{backgroundColor: '#eaeaea', color: 'black', border: '1px solid lightgray', borderRadius: '0px', width:'65px'}} onClick={()=>setIsOpen(true)}><SearchIcon /></Button>
                    <Button sx={{backgroundColor: '#eaeaea', color: 'black', border: '1px solid lightgray', borderRadius: '0px', width:'65px'}} onClick={()=>changeSupplier("")}><ClearIcon /></Button>
                    <SupplierDialog open={isOpen} onClose={()=>setIsOpen(false)} selectSupplier={(value: string)=>changeSupplier(value)}/>
                </div>
                </div>
                <div style={{ marginBottom: '10px', marginLeft:'10px'}}>
                <Typography fontSize={'14px'} sx={{fontStyle: 'italic'}}>Certificate type:</Typography>
                <FormControl sx={{width: '635px'}}>
                <InputLabel>Select your option: </InputLabel>
                    <Select sx={{height: '45px', borderRadius: '0px', backgroundColor: '#fafafa'}}
                        label='Select your option'
                        value={newCertificate.certificateType}
                        onChange={(event) => changeCertificateType(event.target.value)}
                >  
                <MenuItem value='CCC Certificate'>CCC Certificate</MenuItem>
                <MenuItem value='Permission of Printing'>Permission of Printing</MenuItem>
                <MenuItem value='OHSAS 18001'>OHSAS 18001</MenuItem>
                </Select>
                </FormControl>
                </div>
                <div style={{ marginBottom: '10px', marginLeft:'10px'}}>
                    <Typography fontSize={'14px'} sx={{fontStyle: 'italic'}}>Valid from: </Typography>
                    <input value={newCertificate.validFrom} onChange={(event) => changeValidFrom(event.target.value)} style={{width: '630px'}} type='date' />
                </div>
                <div style={{ marginBottom: '10px', marginLeft:'10px'}}>
                    <Typography fontSize={'14px'} sx={{fontStyle: 'italic'}}>Valid to: </Typography>
                    <input value={newCertificate.validTo} onChange={(event) => changeValidTo(event.target.value)} style={{width: '630px'}} type='date' />
                </div>
                    <Typography sx={{marginLeft:'10px'}} fontStyle={'italic'} fontSize={'14px'}>Assigned users</Typography>
                    <Button sx={{color:'black', backgroundColor: '#eaeaea', width:'150px', textTransform:'none', marginLeft:'10px', borderRadius: '0px', border:'1px solid lightgray'}} onClick={()=>setIsUserDialogOpen(true)}>
                       <SearchIcon /> Add participant
                    </Button>
                    <UserDialog open={isUserDialogOpen} onClose={()=>setIsUserDialogOpen(false)} selectUsers={(value: User[])=>changeUsers(value)} initialValue={newCertificate.users}/>
                <div style={{padding: '10px', border: '2px solid lightgray', margin: '10px'}}>
                <TableContainer sx={{borderTop:'1px solid lightgray', width:'611px', maxHeight:'200px'}}>
                <Table stickyHeader>
                <TableHead>
            <TableRow>
            <TableCell sx={{width:'50px'}}></TableCell>
            <TableCell sx={{borderLeft:'1px lightgray solid', width: '200px'}}>Name</TableCell>
            <TableCell sx={{borderLeft:'1px lightgray solid', width: '200px'}}>Department</TableCell>
            <TableCell sx={{borderLeft:'1px lightgray solid', width: '200px'}}>E-mail</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {newCertificate.users.map(row => (
                <TableRow key={row.id}>
                    <TableCell><ClearIcon onClick={()=>removeUser(row)} /></TableCell>
                    <TableCell>{row.firstName.concat(', '.concat(row.lastName).concat(' (').concat(row.plant).concat(')'))}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.email}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table> 
        </TableContainer>
        </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'645px'}}>
                <div>
                <Link to='/example1'>
                <Button onClick = {onSave} sx={{backgroundColor: 'green', color: 'white', textTransform:'none', marginLeft:'10px', width:'100px', borderRadius: '0px', "&:hover":{backgroundColor: 'green'}}}>
                    Save
                </Button>
                <Button sx={{backgroundColor: '#eaeaea', color: 'black', textTransform:'none', marginLeft:'10px', width:'100px', borderRadius: '0px'}}>Cancel</Button>
                </Link>
                </div>
                <Button sx={{backgroundColor: '#3c9aca', borderRadius: '0px', textTransform: 'none', color: 'white', width: '120px', "&:hover":{backgroundColor: '#3c9aca'}}}>New comment</Button>
            </div>
            </div>
            <div style={{marginLeft:'100px'}}>
                <Button sx={{textTransform:'none', backgroundColor: '#3f9ac9', color: 'white', borderRadius: '0px', "&:hover":{backgroundColor: '#3f9ac9'}, marginTop:'20px', width:'100px'}}>Upload</Button>
                <div style={{border: '2px lightgray solid', width:'700px', height: '700px', marginTop:'5px'}}>
                </div>
            </div>
        </div>

    )
}

export default NewCertificate;
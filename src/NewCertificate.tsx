import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export interface Certificate{
    id: number,
    supplier: string,
    certificateType: string,
    validFrom: string,
    validTo: string
}

function NewCertificate(){
    const uniqueId = Math.floor(Math.random()*10000000000);
    const [newCertificate, setNewCertificate] = useState<Certificate>({id:uniqueId,supplier:'',certificateType:'',validFrom: '', validTo: ''});
    function changeSupplier(value: string){
        setNewCertificate({...newCertificate, supplier: value})
    }
    function changeCertificateType(value: string){
        setNewCertificate({...newCertificate, certificateType: value})
    }
    function changeValidFrom(value: string){
        setNewCertificate({...newCertificate, validFrom: value})
    }
    function changeValidTo(value: string){
        setNewCertificate({...newCertificate, validTo: value})
        console.log(newCertificate);
    }

    return(
        <div style={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{ marginBottom: '10px'}}>
                <Typography sx={{fontStyle: 'italic'}}>Supplier: </Typography>
                    <input onChange={(event) => changeSupplier(event.target.value)} type='text' style={{ width: '500px', height: '30px'}}/>
                    </div>
                <div style={{ marginBottom: '10px'}}>
                <Typography sx={{fontStyle: 'italic'}}>Certificate type:</Typography>
                <FormControl sx={{width: '500px' }}>
                <InputLabel id="demo-simple-select-helper-label">Select your option</InputLabel>
                    <Select 
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper-label"
                        label = 'Select your option'
                        value={newCertificate.certificateType}
                        onChange={(event) => changeCertificateType(event.target.value)}
                >  
                <MenuItem value='CCC Certificate'>CCC Certificate</MenuItem>
                <MenuItem value='Permission of Printing'>Permission of Printing</MenuItem>
                <MenuItem value='OHSAS 18001'>OHSAS 18001</MenuItem>
                </Select>
                </FormControl>
                </div>
                <div style={{ marginBottom: '10px'}}>
                    <Typography sx={{fontStyle: 'italic'}}>Valid from: </Typography>
                    <input onChange={(event) => changeValidFrom(event.target.value)} style={{width: '500px'}} type='date' />
                </div>
                <div style={{ marginBottom: '10px'}}>
                    <Typography sx={{fontStyle: 'italic'}}>Valid to: </Typography>
                    <input onChange={(event) => changeValidTo(event.target.value)} style={{width: '500px'}} type='date' />
                </div>
                    <Button sx={{backgroundColor: 'green', color: 'white'}}>Save</Button>
            </div>
            <div>
                <Button>Upload</Button>
                <div style={{border: '2px black solid', width:'500px', height: '700px'}}>

                </div>
            </div>
        </div>

    )
}

export default NewCertificate;

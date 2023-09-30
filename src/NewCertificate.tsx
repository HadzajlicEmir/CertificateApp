import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export interface Certificate{
    id: number,
    supplier: string,
    certificateType: string,
    validFrom: string,
    validTo: string
}

function NewCertificate(){    
    
    const uniqueId = Math.floor(Math.random()*10000000000);
    const [newCertificate, setNewCertificate] = useState<Certificate>({id:uniqueId, supplier:'', certificateType:'', validFrom: '', validTo: ''});

    const {paramId} = useParams();
    useEffect(()=>{
        if (paramId){
            const certificatesString = localStorage.getItem('certificates');
            console.log('emir');
        if(certificatesString){
            const certificates = JSON.parse(certificatesString);
            const certificate = certificates.find((item:Certificate) => item.id === Number.parseInt(paramId));
            console.log('emir2');
            if (certificate){
            setNewCertificate(certificate);
            console.log('emir3');
            } 
        }
        }
    }, [])
    

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
                }
            })
            localStorage.setItem('certificates', JSON.stringify(certificates));            
        } else {
        if (certificatesString){
        let certificates = JSON.parse(certificatesString);
        certificates.push(newCertificate);
        localStorage.setItem('certificates', JSON.stringify(certificates));
       } else {
        let certificates = [];
        certificates.push(newCertificate);
        localStorage.setItem('certificates', JSON.stringify(certificates));
       }
    }
}


    return(
        <div style={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{ marginBottom: '10px'}}>
                <Typography sx={{fontStyle: 'italic'}}>Supplier: </Typography>
                    <input onChange={(event) => changeSupplier(event.target.value)} type='text' value={newCertificate.supplier} style={{ width: '500px', height: '30px'}}/>
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
                    <input value={newCertificate.validFrom} onChange={(event) => changeValidFrom(event.target.value)} style={{width: '500px'}} type='date' />
                </div>
                <div style={{ marginBottom: '10px'}}>
                    <Typography sx={{fontStyle: 'italic'}}>Valid to: </Typography>
                    <input value={newCertificate.validTo} onChange={(event) => changeValidTo(event.target.value)} style={{width: '500px'}} type='date' />
                </div>
                    <Button onClick = {onSave} sx={{backgroundColor: 'green', color: 'white'}}>
                        Save
                    </Button>
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

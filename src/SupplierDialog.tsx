import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table'
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface SupplierDialog{
    open: boolean,
    onClose: () => void,
    selectSupplier: (value: string) => void
}

interface Supplier{
    id: number,
    supplierName: string,
    supplierIndex: string,
    supplierCity: string
}

function SupplierDialog(props: SupplierDialog){
    const suppliers = [
        {id:1, supplierName: 'ANDEMIS GmbH', supplierIndex: '1', supplierCity: 'Stuttgart'},    
        {id:2, supplierName: 'DAIMLER AG', supplierIndex: '1', supplierCity: 'Berlin'},
        {id:3, supplierName: 'DCCS', supplierIndex: '2', supplierCity:'Graz'},
        {id:4, supplierName: 'Mercedes', supplierIndex: '3', supplierCity:'Stuttgart'},
        {id:5, supplierName: 'Porsche', supplierIndex: '3', supplierCity:'Stuttgart'}
    ];

    const [supplierList, setSupplierList] = useState(suppliers);
    const [supplierNameSearch, setSupplierNameSearch] = useState("");
    const [supplierIndexSearch, setSupplierIndexSearch] = useState("");
    const [supplierCitySearch, setSupplierCitySearch] = useState("");

    const { onClose, open, selectSupplier } = props;
    
    function handleClose(){
        setSupplierList(suppliers);
        setSelectedSupplier({id: 0, supplierName: "", supplierIndex: "", supplierCity: ""});
        onClose();
     }

    function onSearch(){
        setSupplierList(suppliers.filter((item) => {
            if(
            item.supplierName.toLowerCase().includes(supplierNameSearch.toLowerCase()) &&
            item.supplierIndex.includes(supplierIndexSearch) &&
            item.supplierCity.toLowerCase().includes(supplierCitySearch.toLowerCase())
             ){ 
                return item;
            } 
        }));
    }
    function onReset() {
        setSupplierNameSearch("");
        setSupplierIndexSearch("");
        setSupplierCitySearch("");
        setSupplierList(suppliers);
    }
    function onSelect(){
        selectSupplier(selectedSupplier.supplierName.concat(", ").concat(selectedSupplier.supplierIndex).concat(", ").concat(selectedSupplier.supplierCity));
        setSelectedSupplier({id: 0, supplierName: "", supplierIndex: "", supplierCity: ""});
        onClose();
    }
    const[selectedSupplier, setSelectedSupplier] = useState<Supplier>({id: 0, supplierName: "", supplierIndex: "", supplierCity: ""});
return(
    <Dialog maxWidth={false} onClose={handleClose} open={open}>
        <div style={{display: 'flex', flexDirection:'row', border:'gray solid 1px', margin:'2px', justifyContent:'space-between'}}>
        <DialogTitle sx={{}}>Search for suppliers</DialogTitle>
        <Button sx={{}} onClick={handleClose}> <ClearIcon /> </Button>
        </div>
        <div style={{height: '800px', width: '1000px', backgroundColor: 'white'}} >
        <div style={{display: 'flex', flexDirection:'column', border:'gray solid 1px', margin:'10px',paddingBottom: '10px'}}>
            <Typography sx={{backgroundColor: '#3f9ac9', color:'white', height:'30px'}}><ArrowDropDownIcon/> Search criteria</Typography>
            <div style={{display: 'flex', flexDirection:'row'}}>
                <div style={{marginLeft: '5px'}}>
                <Typography fontStyle={'italic'}>Supplier name</Typography>
                <input onChange={(event) => setSupplierNameSearch(event.target.value)} type='text' value={supplierNameSearch} style={{width: '300px', height: '30px'}}></input>
                </div>
                <div style={{marginLeft: '5px'}}>
                <Typography fontStyle={'italic'}>Supplier index</Typography>
                <input onChange={(event) => setSupplierIndexSearch(event.target.value)} type='text' value={supplierIndexSearch} style={{width: '300px', height: '30px'}}></input>
                </div>
                <div style={{marginLeft: '5px'}}>
                <Typography fontStyle={'italic'}>City</Typography>
                <input onChange={(event) => setSupplierCitySearch(event.target.value)} type='text' value={supplierCitySearch} style={{width: '300px', height: '30px'}}></input>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection:'row', paddingTop: '30px', marginLeft: '5px'}}>
            <Button onClick={()=>onSearch()} sx={{width:'200px', backgroundColor: 'darkblue', color: 'white'}}>Search</Button>
            <Button onClick={()=>onReset()} sx={{width:'200px'}}>Reset</Button>
            </div>
        </div>
        <div style = {{margin:'10px', border:'1px solid gray'}}>
        <Typography sx={{backgroundColor: '#3f9ac9', color:'white', height:'30px'}}><ArrowDropDownIcon/>Supplier List</Typography>
        <Table sx={{border:'1px solid gray', margin:'10px', width:'950px'}}>
        <TableHead>
            <TableRow>
            <TableCell></TableCell>
            <TableCell>Supplier name</TableCell>
            <TableCell>Supplier Index</TableCell>
            <TableCell>City</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {supplierList.map(row => (
                <TableRow key={row.id}>
                    <TableCell> <Radio checked={row.id === selectedSupplier.id} value={row.supplierName} onChange={()=>setSelectedSupplier(row)} name='radio-options' /> </TableCell>
                    <TableCell>{row.supplierName}</TableCell>
                    <TableCell>{row.supplierIndex}</TableCell>
                    <TableCell>{row.supplierCity}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
        <div style={{display: 'flex', flexDirection:'row', paddingTop: '30px', marginLeft: '10px'}}>
            <Button onClick={() => onSelect()} sx={{backgroundColor:'orange', width:'200px'}}>Select</Button>
            <Button sx={{width:'200px'}} onClick={handleClose}>Cancel</Button>
        </div>
        </div>
        </div>
    </Dialog>
)
}

export default SupplierDialog;
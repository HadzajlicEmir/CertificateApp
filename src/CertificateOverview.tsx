import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Certificate{
    supplier: String,
    certificateType: String,
    validFrom: Date,
    validTo: Date
}

function CertificateOverview(){
    const columns = ["Supplier", "Certificate Type", "Valid from", "Valid to"];

    const certificates = [
    {supplier: "Prvo", certificateType: "Tip 1", validFrom: "24.5.2000", validTo: "23.3.2024"},
    {supplier: "Drugo", certificateType: "Tip 2", validFrom: "24.5.2000", validTo: "23.3.2024"},
    {supplier: "Trece", certificateType: "Tip 3", validFrom: "24.5.2000", validTo: "23.3.2024"}

];
 
    return(
        <Table>
        <TableHead>
            <TableRow>
            <TableCell>Supplier</TableCell>
            <TableCell>Certificate Type</TableCell>
            <TableCell>Valid from</TableCell>
            <TableCell>Valid to</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {certificates.map(row => (
                <TableRow key={row.supplier}>
                    <TableCell>{row.supplier}</TableCell>
                    <TableCell>{row.certificateType}</TableCell>
                    <TableCell>{row.validFrom}</TableCell>
                    <TableCell>{row.validTo}</TableCell>

                </TableRow>
            ))}
        </TableBody>
        </Table>
    )

}

export default CertificateOverview;
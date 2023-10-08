import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Certificate } from "./NewCertificate";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

const styles = {
  tableCellStyle: {
    borderLeft: "1px solid lightgray",
    width: "250px",
  },
};

function CertificateOverview() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [id, setId] = useState(0);
  const open = Boolean(anchorEl);
  let certificates: Certificate[] = [];

  const certificatesString = localStorage.getItem("certificates");
  if (certificatesString) {
    certificates = JSON.parse(certificatesString);
  }

  const handleClick = (event: React.MouseEvent<SVGSVGElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const updatedValues = certificates.filter((item) => item.id !== id);
    localStorage.setItem("certificates", JSON.stringify(updatedValues));
    handleClose();
  };

  return (
    <div
      style={{ padding: "10px", border: "2px solid lightgray", margin: "5px" }}
    >
      <TableContainer sx={{ borderTop: "1px solid lightgray", margin: "5px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={styles.tableCellStyle}>
                {t("supplier")}
              </TableCell>
              <TableCell style={styles.tableCellStyle}>
                {t("certificateType")}
              </TableCell>
              <TableCell style={styles.tableCellStyle}>
                {t("validFrom")}
              </TableCell>
              <TableCell style={styles.tableCellStyle}>
                {t("validTo")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {" "}
                  <SettingsIcon
                    onClick={(event) => handleClick(event, row.id)}
                  />{" "}
                </TableCell>
                <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={"/new-certificate/".concat(id.toString())}
                  >
                    <MenuItem>{t("edit")}</MenuItem>
                  </Link>
                  <MenuItem
                    sx={{ color: "black" }}
                    onClick={() => handleDelete()}
                  >
                    {t("delete")}
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
  );
}

export default CertificateOverview;

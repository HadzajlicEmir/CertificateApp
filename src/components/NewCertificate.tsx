import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SupplierDialog from "./SupplierDialog";
import UserDialog from "./UserDialog";
import { User } from "./UserDialog";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { commonStyles } from "../common-styles";
//import { DesktopDatePicker } from '@mui/x-date-pickers';

const mainButtonSettings = {
  border: "1px solid lightgray",
  borderRadius: "0px",
};

const styles = {
  icon: {
    backgroundColor: "#eaeaea",
    color: "black",
    width: "65px",
    ...mainButtonSettings,
  },
  supplierInputStyle: {
    width: "500px",
    height: "35px",
    ...mainButtonSettings,
  },
  addParticipantButton: {
    color: "black",
    backgroundColor: "#eaeaea",
    width: "200px",
    textTransform: "none",
    marginLeft: "10px",
    ...mainButtonSettings,
  },
  saveButton: {
    backgroundColor: "green",
    color: "white",
    textTransform: "none",
    marginLeft: "10px",
    width: "100px",
    ...mainButtonSettings,
    "&:hover": { backgroundColor: "green" },
  },
  cancelButton: {
    backgroundColor: "#eaeaea",
    color: "black",
    textTransform: "none",
    marginLeft: "10px",
    width: "100px",
    ...mainButtonSettings,
  },
  newCommentButton: {
    backgroundColor: "#3c9aca",
    ...mainButtonSettings,
    textTransform: "none",
    color: "white",
    width: "150px",
    "&:hover": { backgroundColor: "#3c9aca" },
  },
  commentButton: {
    backgroundColor: "#9f1924",
    color: "white",
    textTransform: "none",
    width: "100px",
    ...mainButtonSettings,
    marginTop: "10px",
  },
  uploadButton: {
    textTransform: "none",
    backgroundColor: "#3f9ac9",
    color: "white",
    ...mainButtonSettings,
    "&:hover": { backgroundColor: "#3f9ac9" },
    marginTop: "20px",
    width: "100px",
  },
};

export interface Certificate {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  users: User[];
  comments: Comment[];
  uploadedFile: string;
}

interface Comment {
  user: User;
  comment: string;
}

function NewCertificate() {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uniqueId = Math.floor(Math.random() * 10000000000);
  const [newCertificate, setNewCertificate] = useState<Certificate>({
    id: uniqueId,
    supplier: "",
    certificateType: "",
    validFrom: "",
    validTo: "",
    users: [],
    comments: [],
    uploadedFile: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [commentString, setCommentString] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { paramId } = useParams();

  useEffect(() => {
    if (paramId) {
      const certificatesString = localStorage.getItem("certificates");
      if (certificatesString) {
        const certificates = JSON.parse(certificatesString);
        const certificate = certificates.find(
          (item: Certificate) => item.id === Number.parseInt(paramId),
        );
        if (certificate) {
          setNewCertificate(certificate);
        }
      }
    }
  }, [paramId]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setNewCertificate({
            ...newCertificate,
            uploadedFile: event.target?.result.toString(),
          });
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function changeSupplier(value: string) {
    setNewCertificate({ ...newCertificate, supplier: value });
  }

  function changeCertificateType(value: string) {
    setNewCertificate({ ...newCertificate, certificateType: value });
  }

  function changeValidFrom(value: string) {
    setNewCertificate({ ...newCertificate, validFrom: value });
  }

  function changeValidTo(value: string) {
    setNewCertificate({ ...newCertificate, validTo: value });
  }

  function changeUsers(value: User[]) {
    setNewCertificate({ ...newCertificate, users: value });
  }

  function changeComments() {
    const newComment = {
      user: userContext.currentUser,
      comment: commentString,
    };
    setNewCertificate({
      ...newCertificate,
      comments: [...newCertificate.comments, newComment],
    });
    setCommentsVisible(false);
  }

  function onSave() {
    if (
      newCertificate.supplier !== "" &&
      newCertificate.certificateType !== "" &&
      newCertificate.validFrom !== "" &&
      newCertificate.validTo !== ""
    ) {
      const certificatesString = localStorage.getItem("certificates");
      if (paramId && certificatesString) {
        let certificates: Certificate[] = JSON.parse(certificatesString);
        certificates.forEach((certificate: Certificate) => {
          if (certificate.id === Number.parseInt(paramId)) {
            certificate.certificateType = newCertificate.certificateType;
            certificate.comments = newCertificate.comments;
            certificate.supplier = newCertificate.supplier;
            certificate.uploadedFile = newCertificate.uploadedFile;
            certificate.users = newCertificate.users;
            certificate.validFrom = newCertificate.validFrom;
            certificate.validTo = newCertificate.validTo;
          }
        });
        localStorage.setItem("certificates", JSON.stringify(certificates));
      } else {
        if (certificatesString) {
          let certificates = JSON.parse(certificatesString);
          certificates.push(newCertificate);
          localStorage.setItem("certificates", JSON.stringify(certificates));
        } else {
          let certificates = [];
          certificates.push(newCertificate);
          localStorage.setItem("certificates", JSON.stringify(certificates));
        }
      }
      navigate("/example1");
    } else {
      alert(t("warning"));
    }
  }

  function removeUser(value: User) {
    changeUsers(newCertificate.users.filter((item) => item.id !== value.id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "10px" }}>
          <Typography
            fontSize={"14px"}
            sx={{ fontStyle: "italic", marginLeft: "10px" }}
          >
            {t("supplier")}{" "}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "10px",
            }}
          >
            <input
              readOnly
              onChange={(event) => changeSupplier(event.target.value)}
              type="text"
              value={newCertificate.supplier}
              style={styles.supplierInputStyle}
            />
            <Button sx={styles.icon} onClick={() => setIsOpen(true)}>
              <SearchIcon />
            </Button>
            <Button sx={styles.icon} onClick={() => changeSupplier("")}>
              <ClearIcon />
            </Button>
            <SupplierDialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              selectSupplier={(value: string) => changeSupplier(value)}
            />
          </div>
        </div>
        <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
          <Typography fontSize={"14px"} sx={{ fontStyle: "italic" }}>
            {t("certificateType")}
          </Typography>
          <FormControl sx={{ width: "635px" }}>
            <InputLabel>{t("selectOption")} </InputLabel>
            <Select
              sx={{
                height: "45px",
                borderRadius: "0px",
                backgroundColor: "#fafafa",
              }}
              label="Select your option"
              value={newCertificate.certificateType}
              onChange={(event) => changeCertificateType(event.target.value)}
            >
              <MenuItem value="CCC Certificate">CCC Certificate</MenuItem>
              <MenuItem value="Permission of Printing">
                Permission of Printing
              </MenuItem>
              <MenuItem value="OHSAS 18001">OHSAS 18001</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
          <Typography fontSize={"14px"} sx={{ fontStyle: "italic" }}>
            {t("validFrom")}{" "}
          </Typography>
          <input
            value={newCertificate.validFrom}
            onChange={(event) => changeValidFrom(event.target.value)}
            style={{ width: "630px" }}
            type="date"
          />
        </div>
        <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
          <Typography fontSize={"14px"} sx={{ fontStyle: "italic" }}>
            {t("validTo")}{" "}
          </Typography>
          <input
            value={newCertificate.validTo}
            onChange={(event) => changeValidTo(event.target.value)}
            style={{ width: "630px" }}
            type="date"
          />
        </div>
        <Typography
          sx={{ marginLeft: "10px" }}
          fontStyle={"italic"}
          fontSize={"14px"}
        >
          {t("assignedUsers")}
        </Typography>
        <Button
          sx={styles.addParticipantButton}
          onClick={() => setIsUserDialogOpen(true)}
        >
          <SearchIcon />
          {t("addParticipant")}
        </Button>
        <UserDialog
          open={isUserDialogOpen}
          onClose={() => setIsUserDialogOpen(false)}
          selectUsers={(value: User[]) => changeUsers(value)}
          initialValue={newCertificate.users}
        />
        <div
          style={{
            padding: "10px",
            border: "2px solid lightgray",
            margin: "10px",
          }}
        >
          <TableContainer
            sx={{
              borderTop: "1px solid lightgray",
              width: "611px",
              maxHeight: "200px",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "50px" }}></TableCell>
                  <TableCell sx={commonStyles.tableCell}>Name</TableCell>
                  <TableCell sx={commonStyles.tableCell}>
                    {t("department")}
                  </TableCell>
                  <TableCell sx={commonStyles.tableCell}>E-mail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newCertificate.users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <ClearIcon onClick={() => removeUser(row)} />
                    </TableCell>
                    <TableCell>
                      {row.firstName.concat(
                        ", "
                          .concat(row.lastName)
                          .concat(" (")
                          .concat(row.plant)
                          .concat(")"),
                      )}
                    </TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "645px",
          }}
        >
          <div>
            <Button onClick={onSave} sx={styles.saveButton}>
              {t("save")}
            </Button>
            <Link to="/example1">
              <Button sx={styles.cancelButton}>{t("cancel")}</Button>
            </Link>
          </div>
          <Button
            onClick={() => setCommentsVisible(true)}
            sx={styles.newCommentButton}
          >
            {t("newComment")}
          </Button>
        </div>
        <div style={{ width: "635px", marginLeft: "10px", marginTop: "10px" }}>
          {newCertificate.comments.length > 0 && (
            <div
              style={{
                maxHeight: "80px",
                overflow: "auto",
                border: "1px solid lightgray",
                padding: "5px",
              }}
            >
              {newCertificate.comments.map((item) => (
                <div style={{ borderBottom: "1px solid lightgray" }}>
                  <Typography>
                    {t("user")}: {item.user.firstName}{" "}
                  </Typography>
                  <Typography>
                    {t("comment")}: {item.comment}{" "}
                  </Typography>
                </div>
              ))}
            </div>
          )}
          {commentsVisible && (
            <div
              style={{
                marginTop: "5px",
                border: "1px solid lightgray",
                display: "flex",
                flexDirection: "column",
                padding: "5px",
              }}
            >
              <Typography fontSize={"14px"} fontStyle={"italic"}>
                {userContext.currentUser.firstName} *
              </Typography>
              <textarea
                placeholder={t("comment")}
                rows={4}
                style={{ border: "1px solid lightgray", maxWidth: "615px" }}
                onChange={(event) => setCommentString(event.target.value)}
              />
              <Button
                onClick={() => changeComments()}
                sx={styles.commentButton}
              >
                {t("comment")}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginLeft: "100px" }}>
        <Button onClick={handleButtonClick} sx={styles.uploadButton}>
          {t("upload")}
          <input
            ref={fileInputRef}
            style={{ display: "none" }}
            id="fileSelect"
            type="file"
            onChange={handleFileChange}
          />
        </Button>
        <div
          style={{
            border: "2px lightgray solid",
            width: "700px",
            height: "700px",
            marginTop: "5px",
          }}
        >
          {newCertificate.uploadedFile && (
            <iframe
              width={"700px"}
              height={"700px"}
              title="iframe-view"
              id="iframeView"
              src={newCertificate.uploadedFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewCertificate;

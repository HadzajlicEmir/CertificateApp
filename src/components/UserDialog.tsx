import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import { commonStyles } from "../common-styles";

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  selectUsers: (value: User[]) => void;
  initialValue: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userId: string;
  department: string;
  plant: string;
  email: string;
}

export const users: User[] = [
  {
    id: 1,
    firstName: "Simon",
    lastName: "Zwolfer",
    userId: "ZWOELF",
    department: "ITM/FP",
    plant: "096",
    email: "simonz@mail.com",
  },
  {
    id: 2,
    firstName: "Wolfgang",
    lastName: "Stark",
    userId: "WOLFST",
    department: "ITM/FP",
    plant: "094",
    email: "wolfgangs@mail.com",
  },
  {
    id: 3,
    firstName: "Emir",
    lastName: "Hadzajlic",
    userId: "HADZEM",
    department: "PR",
    plant: "092",
    email: "emirh@mail.com",
  },
  {
    id: 4,
    firstName: "Wilt",
    lastName: "Chamberlain",
    userId: "CHAMWI",
    department: "HR",
    plant: "20000",
    email: "wiltc@mail.com",
  },
  {
    id: 5,
    firstName: "Edin",
    lastName: "Dzeko",
    userId: "DZEDIN",
    department: "FR",
    plant: "065",
    email: "edindz@mail.com",
  },
];

function UserDialog(props: UserDialogProps) {
  const { t } = useTranslation();
  const { open, onClose, selectUsers, initialValue } = props;
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  useEffect(() => {
    setSelectedUsers(initialValue);
  }, [initialValue]);

  function handleClose() {
    onClose();
  }
  const [userList, setUserList] = useState(users);
  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [lastNameSearch, setLastNameSearch] = useState("");
  const [userIdSearch, setUserIdSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [plantSearch, setPlantSearch] = useState("");

  function onSearch() {
    setUserList(
      users.filter((item) => {
        if (
          item.firstName
            .toLowerCase()
            .includes(firstNameSearch.toLowerCase()) &&
          item.lastName.toLowerCase().includes(lastNameSearch.toLowerCase()) &&
          item.userId.toLowerCase().includes(userIdSearch.toLowerCase()) &&
          item.department
            .toLowerCase()
            .includes(departmentSearch.toLowerCase()) &&
          item.plant.toLowerCase().includes(plantSearch.toLowerCase())
        ) {
          return item;
        }
      }),
    );
  }
  function onReset() {
    setFirstNameSearch("");
    setLastNameSearch("");
    setUserIdSearch("");
    setDepartmentSearch("");
    setPlantSearch("");
    setUserList(users);
  }
  function onSelect() {
    selectUsers(selectedUsers);
    handleClose();
  }

  function userSelection(checked: boolean, value: User) {
    if (checked) {
      setSelectedUsers([...selectedUsers, value]);
    } else {
      setSelectedUsers(selectedUsers.filter((item) => item.id !== value.id));
    }
  }
  function selectAllUsers(checked: boolean) {
    if (checked) {
      setSelectedUsers(userList);
    } else {
      setSelectedUsers([]);
    }
  }
  return (
    <Dialog maxWidth={false} onClose={handleClose} open={open}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "gray solid 1px",
          margin: "2px",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle>{t("searchForPersons")}</DialogTitle>
        <Button
          sx={{ border: "1px lightgray solid", margin: "5px", color: "black" }}
          onClick={handleClose}
        >
          {" "}
          <ClearIcon />{" "}
        </Button>
      </div>
      <div
        style={{ height: "850px", width: "1000px", backgroundColor: "#ffffff" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "gray solid 1px",
            margin: "10px",
            paddingBottom: "10px",
          }}
        >
          <Typography sx={commonStyles.blueHeadline}>
            {" "}
            <ArrowDropDownIcon />
            {t("searchCriteria")}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginLeft: "5px" }}>
              <Typography fontStyle={"italic"}>{t("firstName")}</Typography>
              <input
                onChange={(event) => setFirstNameSearch(event.target.value)}
                type="text"
                value={firstNameSearch}
                style={{ width: "300px", height: "30px" }}
              ></input>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <Typography fontStyle={"italic"}>{t("lastName")}</Typography>
              <input
                onChange={(event) => setLastNameSearch(event.target.value)}
                type="text"
                value={lastNameSearch}
                style={{ width: "300px", height: "30px" }}
              ></input>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <Typography fontStyle={"italic"}>{t("userId")}</Typography>
              <input
                onChange={(event) => setUserIdSearch(event.target.value)}
                type="text"
                value={userIdSearch}
                style={{ width: "300px", height: "30px" }}
              ></input>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginLeft: "5px" }}>
              <Typography fontStyle={"italic"}>{t("department")}</Typography>
              <input
                onChange={(event) => setDepartmentSearch(event.target.value)}
                type="text"
                value={departmentSearch}
                style={{ width: "300px", height: "30px" }}
              ></input>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <Typography fontStyle={"italic"}>{t("plant")}</Typography>
              <input
                onChange={(event) => setPlantSearch(event.target.value)}
                type="text"
                value={plantSearch}
                style={{ width: "300px", height: "30px" }}
              ></input>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "20px",
              marginLeft: "5px",
            }}
          >
            <Button onClick={() => onSearch()} sx={commonStyles.searchButton}>
              {t("search")}
            </Button>
            <Button onClick={() => onReset()} sx={commonStyles.resetButton}>
              {t("reset")}
            </Button>
          </div>
        </div>
        <div style={{ margin: "10px", border: "1px solid gray" }}>
          <Typography sx={commonStyles.blueHeadline}>
            <ArrowDropDownIcon />
            {t("personList")}
          </Typography>
          <Table
            sx={{ border: "1px solid gray", margin: "10px", width: "950px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    onChange={(event) => selectAllUsers(event.target.checked)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{t("firstName")}</TableCell>
                <TableCell>{t("lastName")}</TableCell>
                <TableCell>{t("userId")}</TableCell>
                <TableCell>{t("department")}</TableCell>
                <TableCell>{t("plant")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {" "}
                    <Checkbox
                      checked={
                        selectedUsers.find((item) => row.id === item.id)
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        userSelection(event.target.checked, row)
                      }
                      size="small"
                    />{" "}
                  </TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.plant}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "10px",
              paddingBottom: "10px",
              marginLeft: "10px",
            }}
          >
            <Button
              onClick={() => onSelect()}
              sx={commonStyles.selectInDialogButton}
            >
              {t("select")}
            </Button>
            <Button
              sx={commonStyles.cancelInDialogButton}
              onClick={handleClose}
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default UserDialog;

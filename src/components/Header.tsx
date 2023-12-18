import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { User, users } from "./UserDialog";

function Header() {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const languageContext = useContext(LanguageContext);

  function handleUserChange(value: User) {
    userContext.setCurrentUser(value);
  }

  const handleChange = (event: SelectChangeEvent) => {
    languageContext.setCurrentLanguage(event.target.value);
  };

  return (
    <div
      style={{
        borderBottom: "2px solid gray",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography
        height="40px"
        width="250px"
        sx={{
          backgroundColor: "#3f9ac9",
          color: "white",
          textAlign: "center",
          fontSize: "25px",
        }}
      >
        Company Tuzla
      </Typography>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          {t("language")}
          <Select
            sx={{ width: "120px", marginLeft: "5px", height: "40px" }}
            value={languageContext.currentLanguage}
            label={languageContext.currentLanguage}
            onChange={handleChange}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="de">German</MenuItem>
          </Select>
        </div>
        <div style={{ marginLeft: "5px" }}>
          {t("user")}:
          <Select
            value={userContext.currentUser.userId}
            sx={{ width: "120px", marginLeft: "5px", height: "40px" }}
          >
            {users.map((row) => (
              <MenuItem
                value={row.userId}
                onClick={() => {
                  handleUserChange(row);
                }}
              >
                {row.userId}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
//onChange={(event) => changeCertificateType(event.target.value)}

export default Header;

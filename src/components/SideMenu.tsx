import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

function SideMenu() {
  const { t } = useTranslation();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const machineLearningItems = ["example1", "example2", "example3"];

  const iconStyle = {
    fontSize: "30px",
    marginRight: "5px",
    marginLeft: "25px",
    color: "#3f9ac9",
  };

  const menuItems = [
    { label: "Start", icon: <HomeIcon sx={iconStyle} />, isDropDown: false },
    {
      label: "Machine Learning",
      icon: <MenuIcon sx={iconStyle} />,
      isDropDown: true,
      submenuItems: machineLearningItems,
    },
  ];

  function menuClick(isDropDown: boolean) {
    if (isDropDown) {
      setSubmenuOpen(!submenuOpen);
    }
  }

  function subMenuItemCLick(event: any) {
    event.stopPropagation();
  }

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#e8e9eb",
        height: "calc(100vh - 45px)",
        paddingTop: "20px",
      }}
    >
      {menuItems.map((item) => (
        <div onClick={() => menuClick(item.isDropDown)} key={item.label}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "7px",
              marginTop: "3px",
              color: "#3f9ac9",
            }}
          >
            {item.icon}
            {item.isDropDown ? (
              <div style={{ display: "flex" }}>
                <Typography sx={{}}>{item.label}</Typography>
                <ExpandMoreIcon sx={{ ml: "30px" }} />
              </div>
            ) : (
              <Link
                style={{ textDecoration: "none", color: "#3f9ac9" }}
                to={"/".concat(item.label.toLowerCase())}
              >
                {item.label}
              </Link>
            )}
          </div>
          {submenuOpen ? (
            <div
              onClick={(event) => subMenuItemCLick(event)}
              style={{ marginLeft: "45px", color: "#3f9ac9" }}
            >
              {item.submenuItems?.map((subItem) => (
                <div>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#3f9ac9",
                      margin: "25px",
                    }}
                    to={"/".concat(subItem.replaceAll(" ", "").toLowerCase())}
                  >
                    {t(subItem)}
                  </Link>
                </div>
              ))}
            </div>
          ) : undefined}
        </div>
      ))}
    </div>
  );
}

export default SideMenu;

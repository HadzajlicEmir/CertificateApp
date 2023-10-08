import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MenuItem {
  Label: String;
  Icon: React.ReactNode;
  isDropDown: boolean;
  submenuItems: String[];
}

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
    { Label: "Start", Icon: <HomeIcon sx={iconStyle} />, isDropDown: false },
    {
      Label: "Machine Learning",
      Icon: <MenuIcon sx={iconStyle} />,
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
      }}
    >
      {menuItems.map((item) => (
        <div onClick={() => menuClick(item.isDropDown)} key={item.Label}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              color: "#3f9ac9",
            }}
          >
            {item.Icon}{" "}
            {item.isDropDown ? (
              <div>
                {item.Label} <ExpandMoreIcon />
              </div>
            ) : (
              <Link
                style={{ textDecoration: "none", color: "#3f9ac9" }}
                to={"/".concat(item.Label.toLowerCase())}
              >
                {item.Label}
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
                    style={{ textDecoration: "none", color: "#3f9ac9" }}
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

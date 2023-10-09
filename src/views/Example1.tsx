import { Link } from "react-router-dom";
import CertificateOverview from "../components/CertificateOverview";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

function Example1() {
  const { t } = useTranslation();

  return (
    <div>
      <Link to="/new-certificate">
        <Button
          sx={{
            backgroundColor: "#c2cb38",
            width: "150px",
            border: "1px solid olive",
            textTransform: "none",
            margin: "5px",
            textDecoration: "none",
            color: "white",
            borderRadius: "0px",
            "&:hover": { backgroundColor: "#c2cb38" },
          }}
        >
          {t("newCertificate")}
        </Button>
      </Link>
      <CertificateOverview />
    </div>
  );
}

export default Example1;

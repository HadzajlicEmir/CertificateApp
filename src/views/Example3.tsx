import { useTranslation } from "react-i18next";

function Example3() {
  const { t } = useTranslation();

  return <div>{t("example3")}</div>;
}

export default Example3;

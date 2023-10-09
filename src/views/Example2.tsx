import { useTranslation } from "react-i18next";

function Example2() {
  const { t } = useTranslation();

  return <div>{t("example2")}</div>;
}

export default Example2;

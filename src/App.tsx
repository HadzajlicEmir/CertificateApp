import "./App.css";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./Start";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import NewCertificate from "./NewCertificate";
import { useState } from "react";
import { User, users } from "./UserDialog";
import { UserContext } from "./UserContext";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./LanguageContext";

function App() {
  const [user, setUser] = useState<User>(users[0]);
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  return (
    <UserContext.Provider
      value={{ currentUser: user, setCurrentUser: setUser }}
    >
      <LanguageContext.Provider
        value={{
          currentLanguage: language,
          setCurrentLanguage: changeLanguage,
        }}
      >
        <Router>
          <Header />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <SideMenu />
            <Routes>
              <Route path={"/start"} element={<Start />} />
              <Route path={"/example1"} element={<Example1 />} />
              <Route path={"/example2"} element={<Example2 />} />
              <Route path={"/example3"} element={<Example3 />} />
              <Route
                path={"/new-certificate/:paramId?"}
                element={<NewCertificate />}
              />
              <Route path={"/"} element={<Start />} />
            </Routes>
          </div>
        </Router>
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

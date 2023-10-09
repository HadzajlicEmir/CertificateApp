import "./App.css";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./views/Start";
import Example1 from "./views/Example1";
import Example2 from "./views/Example2";
import Example3 from "./views/Example3";
import NewCertificate from "./components/NewCertificate";
import { useState } from "react";
import { User, users } from "./components/UserDialog";
import { UserContext } from "./contexts/UserContext";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./contexts/LanguageContext";

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

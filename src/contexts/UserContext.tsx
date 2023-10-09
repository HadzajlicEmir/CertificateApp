import { createContext } from "react";
import { User, users } from "../components/UserDialog";

export interface UserContextValue {
  currentUser: User;
  setCurrentUser: (value: User) => void;
}

const defaultValue: UserContextValue = {
  currentUser: users[0],
  setCurrentUser: () => {},
};

export const UserContext = createContext(defaultValue);

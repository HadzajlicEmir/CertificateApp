import { createContext } from 'react';
import { User } from './UserDialog';
import { users } from './UserDialog';


export interface UserContextValue {
    currentUser: User
    setCurrentUser: (value: User) => void
}

const defaultValue: UserContextValue = {
    currentUser: users[0],
    setCurrentUser: () => {}
}

export const UserContext = createContext(defaultValue);
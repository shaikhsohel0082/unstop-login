import { createContext } from "react";
import type { LoginRes } from "./service/auth";
interface AppContextType {
    userData: LoginRes | undefined;
    setUserData: React.Dispatch<React.SetStateAction<LoginRes | undefined>>
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

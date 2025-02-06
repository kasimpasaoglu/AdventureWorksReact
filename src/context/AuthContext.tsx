import { createContext, useEffect, useState } from "react";
import { AddressConstants, LoginPostBody, RegisterUser } from "../types/user";
import { apiLogin, apiRegister, getConstants } from "../infrastructure/userRequests";

interface loginResponse {
    isSuccessful?: boolean;
    message: string;
    token?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (user: LoginPostBody) => Promise<loginResponse>;
    logout: () => void;
    constants?: AddressConstants;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => ({ message: "Not implemented" }),
    logout: () => { },
    constants: {}
})


function AuthContextProvider({ children }: { children: React.ReactNode }) {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [constants, setConstants] = useState<AddressConstants>({ states: [], addressTypes: [] })

    const login = async (user: LoginPostBody): Promise<loginResponse> => {
        try {
            const res = await apiLogin(user);

            if (!res.token) {
                return { message: "Invalid credentials", isSuccessful: false };
            }

            localStorage.setItem("token", res.token)
            setIsAuthenticated(true)
            res.isSuccessful = true;
            return res
        } catch (error: any) {
            console.error("Login error:", error);

            return {
                message: error.message || "Undexpected error",
                isSuccessful: false
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false)
    }


    useEffect(() => {
        getConstants().then(constants => {
            setConstants(constants);
        });
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login, logout,
            constants
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }
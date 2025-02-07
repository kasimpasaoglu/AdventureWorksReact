import { createContext, useEffect, useState } from "react";
import { AddressConstants, LoginPostBody } from "../types/user";
import { apiLogin, getConstants } from "../infrastructure/userRequests";

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
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => ({ message: "Not implemented" }),
    logout: () => { },
    constants: {},
    setIsAuthenticated: () => { },
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

        const token = localStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1])); // JWT decode işlemi
                const expirationTime = decodedToken.exp * 1000; // Milisaniyeye çevir
                const currentTime = Date.now();

                if (currentTime >= expirationTime) {
                    logout(); // Token süresi dolduğunda çıkış yap
                } else {
                    // logout için zamanlayıcı başlat
                    const timeoutId = setTimeout(logout, expirationTime - currentTime);

                    // Cleanup fonksiyonu ile önceki timeout'u temizle
                    return () => clearTimeout(timeoutId);
                }
            } catch (error) {
                console.error("Token decoding error:", error);
                logout(); // Token bozuksa çıkış yap
            }
        }
    }, []);



    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login, logout,
            constants,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }
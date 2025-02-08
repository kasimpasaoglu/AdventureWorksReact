import { AddressConstants, LoginPostBody, RegisterUser, User } from "../types/user";

const BASE_URL = "https://adventureworksapi-main.up.railway.app/api/User";

interface loginResponse {
    isSuccessful?: boolean;
    message: string;
    token?: string;
}

// ortak hata yonetimi
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        try {
            const errorData = await response.json();
            return Promise.reject(errorData);
        } catch {
            return Promise.reject({ message: "Request failed with status " + response.status });
        }
    }
    return await response.json();
};


// kullanici kayit islemi
export const apiRegister = async (user: RegisterUser): Promise<string> => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })

        return await handleResponse<string>(response)
    } catch (error: any) {
        console.error("Register error:", error)
        return error.message || "Registration failed Please try again later."
    }
};



// kullanici bilgilerini getirme
export const getUser = async (): Promise<User> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return handleResponse<User>(response);
};


// login cagrisi
export const apiLogin = async (loginUser: LoginPostBody): Promise<loginResponse> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
    });

    return handleResponse<loginResponse>(response);
};


// kullanici silme
export const deleteUser = async (): Promise<any> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    await handleResponse<any>(response);
};


// kullanici kaydini guncelleme
export const updateUser = async (userData: User): Promise<any> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
    });

    await handleResponse<any>(response);
};

export const getConstants = async (): Promise<AddressConstants> => {
    const response = await fetch(`${BASE_URL}/constants`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    return handleResponse<AddressConstants>(response);
}


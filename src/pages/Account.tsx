import { useContext, useEffect, useState } from "react";
import { deleteUser, getUser, updateUser } from "../infrastructure/userRequests"
import { User } from "../types/user";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { ArrowLeftEndOnRectangleIcon, ArrowPathIcon, TrashIcon } from "@heroicons/react/24/solid";

const defaultUser: User = {
    title: "",
    firstName: "",
    lastName: "",
    emailAddress1: "",
    password: "",
    addressTypeId: 4,
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
}

const Account = () => {

    const { constants, setIsAuthenticated, logout } = useContext(AuthContext)
    const addressTypes = constants?.addressTypes;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const [user, setUser] = useState<User>(defaultUser)
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!passwordRegex.test(user.password)) {
            setPasswordError("Password is not strong enough")
            return;
        }
        if (user.password !== confirmPassword) {
            setPasswordError("Passwords do not match")
        }
        setPasswordError(null)
        try {
            await updateUser(user)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: `There was an error updating your account ${error}`,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        Swal.fire({
            title: 'Success',
            text: 'Your account has been updated successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setUser({ ...user, password });

        if (!passwordRegex.test(password)) {
            setPasswordError("Password is not strong enough");
        } else if (confirmPassword && password !== confirmPassword) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError(null);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)

        if (user.password !== e.target.value) {
            setPasswordError("Passwords do not match")
        } else {
            setPasswordError(null);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser()
            localStorage.removeItem('token')
            setIsAuthenticated(false)
            Swal.fire({
                title: 'Success',
                text: 'Your account has been deleted successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: `There was an error deleting your account ${error}`,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    };

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    useEffect(() => {
        getUser()
            .then((data) => setUser(data))
            .catch((error) => console.error(error));
    }, [])

    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-100px)] relative'>

            <form
                onSubmit={handleSubmit}
                className=' my-10 grid grid-cols-1 md:grid-cols-2 max-w-[1700px] p-5 bg-darkblue rounded-3xl shadow-darkblue shadow-2xl min-w-[60vw]'
            >

                {/* Name Info */}
                <div className='p-5 text-cream flex flex-col justify-between gap-5 col-span-1 md:rounded-tl-2xl md:border-r bg-seablue bg-opacity-10'>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="title">Title</label>
                        <input className='text-darkblue p-1 bg-cream' type="text" name="title" value={user.title || ""} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="firstName">First Name</label>
                        <input className='text-darkblue p-1 bg-cream' type="text" name="firstName" value={user.firstName || ""} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="lastName">Last Name</label>
                        <input className='text-darkblue p-1 bg-cream' type="text" name="lastName" value={user.lastName || ""} onChange={handleChange} />
                    </div>
                </div>

                {/* Login Info */}
                <div className='text-cream p-5 flex flex-col justify-center gap-5 col-span-1 md:rounded-tr-2xl bg-seablue bg-opacity-10'>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="email">Email</label>
                        <input className='text-darkblue p-1 bg-cream' type="email" name="emailAddress1" value={user.emailAddress1 || ""} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col justify-center relative'>
                        <label htmlFor="password">Password</label>
                        <input required
                            className="text-darkblue p-1 bg-cream"
                            type="password"
                            name="password"
                            value={user.password || ""}
                            onChange={handlePasswordChange}
                        />
                        {passwordError &&
                            <div className='text-lightred absolute -bottom-2/3 left-1/3 bg-cream px-2 py-1 text-sm rounded-e-full rounded-bl-full'>
                                <p>{passwordError}</p>
                            </div>
                        }
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input required
                            className="text-darkblue p-1 bg-cream"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword || ""}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                </div>

                {/* Address Info */}
                <div className='p-5 text-cream flex flex-col justify-between gap-5 col-span-1 md:col-span-2 rounded-b-2xl border-t'>
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <p className="font-bold text-center">Address Type : </p>
                        {addressTypes?.map((x) => (
                            <label key={x.addressTypeId} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="addressTypeId"
                                    value={x.addressTypeId || ""}
                                    checked={user.addressTypeId === x.addressTypeId}
                                    onChange={(e) => setUser({ ...user, addressTypeId: Number(e.target.value) })}
                                />
                                {x.name}
                            </label>
                        ))}
                    </div>

                    <div className='flex flex-col justify-center'>
                        <label htmlFor="addressLine1">Address Line 1</label>
                        <input className='text-darkblue p-1 bg-cream' id="addressLine1" type="text" name="addressLine1" value={user.addressLine1 || ""} onChange={handleChange} ></input>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input className='text-darkblue p-1 bg-cream' id="addressLine2" type="text" name="addressLine2" value={user.addressLine2 || ""} onChange={handleChange} ></input>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="city">City</label>
                        <input className='text-darkblue p-1 bg-cream' type="text" id="city" name="city" value={user.city || ""} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col justify-center'>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input className='text-darkblue p-1 bg-cream' type="number" id="postalCode" name="postalCode" value={user.postalCode || ""} onChange={handleChange} />
                    </div>
                </div>

                {/* Buttons */}
                <div className='md:col-span-2 w-full flex flex-col md:flex-row gap-4 items-center justify-evenly'>

                    <button
                        onClick={handleLogout}
                        className='w-full flex justify-center px-16 py-2 items-center gap-4 duration-300 bg-skyblue font-extrabold text-lg rounded-full text-darkblue hover:bg-gray-400 hover:text-white' type="button"
                    >
                        <span>Logout</span>
                        <ArrowLeftEndOnRectangleIcon width={30} height={30} />
                    </button>

                    <button
                        className='w-full flex justify-center px-16 py-2 items-center gap-4 duration-300 bg-seablue font-extrabold text-lg rounded-full text-cream hover:bg-gray-600'
                        type="submit"
                    >
                        <span>Update</span>
                        <ArrowPathIcon width={30} height={30} />

                    </button>

                    <button
                        onClick={() => setIsWarningOpen(true)}
                        className='w-full flex justify-center px-16 py-2 items-center gap-4 duration-300 bg-lightred font-extrabold text-lg rounded-full text-cream hover:bg-red-900'
                        type="button"
                    >
                        <span>Delete</span>
                        <TrashIcon width={30} height={30} />
                    </button>

                </div>
            </form>

            <div
                className={clsx('bg-black/50 fixed bg-opacity-50 w-full h-full flex justify-center items-center duration-500', isWarningOpen ? 'z-10 opacity-100' : '-z-10 opacity-0')}>
                <div className="bg-seablue text-cream flex flex-col px-10 py-5 rounded-lg shadow-md gap-10">
                    <div className="flex flex-col gap-5">
                        <h3 className="font-extrabold">Are you sure?</h3>
                        <p className="font-bold">This action cannot be undone!</p>
                    </div>
                    <div className="flex justify-around">
                        <button onClick={handleDeleteAccount} className='bg-lightred text-cream px-4 py-2 rounded-full'>Confirm</button>
                        <button onClick={() => setIsWarningOpen(false)} className='bg-darkblue text-cream px-4 py-2 rounded-full'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
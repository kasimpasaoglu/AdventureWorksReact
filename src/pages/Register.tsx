import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { RegisterUser } from '../types/user';
import { apiRegister } from '../infrastructure/userRequests';
import Swal from 'sweetalert2'

const defaultFormData: RegisterUser = {
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

function Register() {

    const { constants } = useContext(AuthContext)
    const addressTypes = constants?.addressTypes
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    const [formData, setFormData] = useState<RegisterUser>(defaultFormData)
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()


        if (!passwordRegex.test(formData.password)) {
            setPasswordError("Password is not strong enough");
            return;
        }

        if (formData.password !== confirmPassword) {
            setPasswordError("Passwords do not match")
            return;
        }

        setPasswordError(null);
        try {
            await apiRegister(formData);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error on registering. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
        Swal.fire({
            title: 'Success!',
            text: 'You have successfully registered.',
            icon: 'success',
            confirmButtonText: 'Go to Login',
        }).then(() => navigate('/login'));
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setFormData({ ...formData, password });

        if (!passwordRegex.test(password)) {
            setPasswordError("Password is not strong enough");
        } else if (confirmPassword && password !== confirmPassword) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError(null);
        }
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)

        if (formData.password !== e.target.value) {
            setPasswordError("Passwords do not match")
        } else {
            setPasswordError(null);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-100px)] relative'>

            <form onSubmit={handleSubmit} className=' my-10 grid grid-cols-1 md:grid-cols-2 max-w-[1700px] p-5 bg-darkblue rounded-3xl shadow-darkblue shadow-2xl min-w-[60vw]'>

                {/* Name Info */}
                <div className='p-5 text-cream flex flex-col justify-between gap-5 col-span-1 md:rounded-tl-2xl md:border-r bg-seablue bg-opacity-10'>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="title">Title</label>
                        <input className='text-darkblue p-1 bg-cream' type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="firstName">First Name</label>
                        <input required className='text-darkblue p-1 bg-cream' type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="lastName">Last Name</label>
                        <input required className='text-darkblue p-1 bg-cream' type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                </div>

                {/* Login Info */}
                <div className='text-cream p-5 flex flex-col justify-center gap-5 col-span-1 md:rounded-tr-2xl bg-seablue bg-opacity-10'>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="email">Email</label>
                        <input required className='text-darkblue p-1 bg-cream' type="email" id="emailAddress1" name="emailAddress1" value={formData.emailAddress1} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col justify-center relative'>
                        <label htmlFor="password">Password</label>
                        <input required className="text-darkblue p-1 bg-cream" type="password" id="password" name="password" value={formData.password} onChange={handlePasswordChange} />
                        {passwordError &&
                            <div className='text-lightred absolute -bottom-2/3 left-1/3 bg-cream px-2 py-1 text-sm rounded-e-full rounded-bl-full'>
                                <p>{passwordError}</p>
                            </div>
                        }
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input required className={`text-darkblue p-1 bg-cream `} type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
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
                                    value={x.addressTypeId}
                                    checked={formData.addressTypeId === x.addressTypeId}
                                    onChange={(e) => setFormData({ ...formData, addressTypeId: Number(e.target.value) })}
                                />
                                {x.name}
                            </label>
                        ))}
                    </div>

                    <div className='flex flex-col justify-center'>
                        <label htmlFor="addressLine1">Address Line 1</label>
                        <input required className='text-darkblue p-1 bg-cream' id="addressLine1" type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} ></input>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input className='text-darkblue p-1 bg-cream' id="addressLine2" type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} ></input>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor="city">City</label>
                        <input required className='text-darkblue p-1 bg-cream' type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col justify-center'>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input required className='text-darkblue p-1 bg-cream' type="number" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                    </div>
                </div>
                {/* Submit Button */}
                <div className='md:col-span-2 w-full flex items-center justify-center'>
                    <button className='bg-seablue font-extrabold text-lg rounded-full text-cream p-2 w-52' type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register
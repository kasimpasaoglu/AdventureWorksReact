import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { LoginPostBody } from '../../types/user';
import { Link } from 'react-router-dom';

type Props = {}

function LoginForm({ }: Props) {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginPostBody>({ email: "", password: "" })
    const [error, setError] = useState<string | null>(null)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await login(formData);
        if (res.isSuccessful) {
            navigate("/Account");
        } else {
            setError(res.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center gap-8 p-10 bg-darkblue rounded-3xl text-cream">
            <h4 className="font-bold">Sign in to your account</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-80">
                <div className="flex flex-col">
                    <label htmlFor="email">Your email</label>
                    <input onChange={handleChange} className="p-2 text-darkblue" type="email" name="email" placeholder="name@domain.com" value={formData?.email} required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} className="p-2 text-darkblue" type="password" name="password" placeholder="••••••••" value={formData?.password} required />
                </div>
                <button className="bg-seablue px-7 py-2 rounded-full font-bold text-lg hover:bg-opacity-70 duration-200" type="submit">Login</button>
                {error && <p className="text-lightred">{error}</p>}
            </form>
            <p>Don't have an account? <Link className="underline text-skyblue hover:text-cream duration-200" to="/register">Sign up</Link></p>
        </div>
    )
}

export default LoginForm
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getFriendsList, login } from '../redux/Slices/AuthSlice';

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);

    }

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!loginData.email || !loginData.password) {
            toast.error("Please fill all the fields");
            return;
        }
        const res = await dispatch(login(loginData))
        if(res?.payload?.success)
            navigate('/app/welcome')

        setLoginData({
            email: '',
            password: '',
        });
    }
    return (
        <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-[#EFF6FC]">
            {/* <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-gray-700"> */}
            <div className="flex flex-[0.6] items-center justify-center rounded-[25px] p-1 text-white max-md:hidden">
                <img
                    src="https://res.cloudinary.com/ddxeed8fa/image/upload/v1730786516/loginWelcome_hkqssp.jpg"
                    alt="welcome"
                    className="bg-auto h-full w-full bg-center shadow-lg shadow-violet-700/20 rounded-[25px]"
                />
            </div>
            <div className="flex flex-[0.4] max-md:flex-1 items-center justify-center rounded-[25px] bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl shadow-violet-700/40 p-1">
                <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-80">
                    <div className="flex justify-center -mt-16">
                        <div className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-md">
                            <PersonOutlineOutlinedIcon />
                        </div>
                    </div>

                    <form action='' onSubmit={handleLogin} className="space-y-4 mt-8">
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <MailOutlineOutlinedIcon />
                            <input type="email"
                            placeholder="Email ID"
                            id='email'
                            name='email' className="bg-transparent outline-none text-white text-sm w-full pl-2" 
                            onChange={handleUserInput}
                            value={loginData.email}
                            required
                            />
                        </div>

                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <KeyOutlinedIcon />
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Password"
                                id='password'
                                name='password'
                                className="bg-transparent outline-none text-white text-sm w-full pl-2"
                                onChange={handleUserInput}
                                value={loginData.password}
                                required
                            />
                            <span className="icon cursor-pointer" onClick={togglePasswordVisibility}>
                                {
                                    isPasswordVisible ? (
                                        <RemoveRedEyeOutlinedIcon />
                                    )
                                        :
                                        (
                                            <VisibilityOffOutlinedIcon />
                                        )
                                }
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-white">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="form-checkbox text-blue-900 bg-transparent rounded-sm mr-2 cursor-pointer" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
                        </div>

                        <button className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-md py-2 font-semibold shadow-md">LOGIN</button>
                        <div className='text-center'><Link to="/signup" className='hover:underline'>Don't have an account? Register here</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
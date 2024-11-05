import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useDispatch } from 'react-redux';
import { register } from '../redux/Slices/AuthSlice';
import toast from 'react-hot-toast';

const Signup = () => {
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        showPassword: false
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setSignupData({
            ...signupData,
            showPassword: !signupData.showPassword
        });
    }

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (!signupData.username || !signupData.email || !signupData.password || !signupData.phone) {
            toast.error('Please fill all the fields');
            return;
        }
        // checking the name field length
        if (signupData.username.length < 5) {
            toast.error("username should be atleast of 5 characters");
            return;
        }

        // email validation using regex
        if (!signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            toast.error("Invalid email id");
            return;
        }

        if (!signupData.phone.match(/^[0-9]{10}$/)) {
            toast.error(
                "Phone number should be in 10 digits"
            );
            return;
        }

        // password validation using regex
        if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
            toast.error(
                "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
            );
            return;
        }
        const formData = new FormData();
        formData.append("userName", signupData.username);
        formData.append("email", signupData.email);
        formData.append("phone", signupData.phone);
        formData.append("password", signupData.password);

        const res = await dispatch(register(formData));

        if (res?.payload?.success)
            navigate('/');

        setSignupData({
            username: "",
            email: "",
            phone: "",
            password: "",
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

                    <form className="space-y-4 mt-8" action='' onSubmit={handleCreateAccount}>
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <PersonOutlineOutlinedIcon />
                            <input
                                type="text"
                                placeholder="Username"
                                id='username'
                                name='username'
                                className="bg-transparent outline-none text-white text-sm w-full pl-2"
                                value={signupData.username}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <MailOutlineOutlinedIcon />
                            <input
                                type="email"
                                placeholder="Email ID"
                                id='email'
                                name='email'
                                className="bg-transparent outline-none text-white text-sm w-full pl-2"
                                value={signupData.email}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <LocalPhoneOutlinedIcon />
                            <input
                                type="text"
                                placeholder="Phone"
                                id='phone'
                                name='phone'
                                className="bg-transparent outline-none text-white text-sm w-full pl-2"
                                value={signupData.phone}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <KeyOutlinedIcon />
                            <input
                                type={signupData.showPassword ? "text" : "password"}
                                placeholder="Password"
                                id='password'
                                name='password'
                                className="bg-transparent outline-none text-white text-sm w-full pl-2"
                                value={signupData.password}
                                onChange={handleUserInput}
                                required
                            />
                            <span className="icon cursor-pointer" onClick={togglePasswordVisibility}>
                                {
                                    signupData.showPassword ? (
                                        <RemoveRedEyeOutlinedIcon />
                                    )
                                        :
                                        (
                                            <VisibilityOffOutlinedIcon />
                                        )
                                }
                            </span>
                        </div>


                        <button className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-md py-2 font-semibold shadow-md">Sign-up</button>
                        <div className='text-center'><Link to="/" className='hover:underline'>Already have an account? Login here</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
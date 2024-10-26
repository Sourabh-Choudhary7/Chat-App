import React from 'react'
import { Link } from 'react-router-dom'
import welcomeImg from '../assets/loginWelcome.jpg'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const Signup = () => {
    return (
        <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-[#EFF6FC]">
            {/* <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-gray-700"> */}
            <div className="flex flex-[0.6] items-center justify-center rounded-[25px] p-1 text-white max-md:hidden">
                <img
                    src={welcomeImg}
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

                    <form className="space-y-4 mt-8">
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <PersonOutlineOutlinedIcon />
                            <input type="text" placeholder="Username" id='username' name='username' className="bg-transparent outline-none text-white text-sm w-full pl-2" />
                        </div>
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <MailOutlineOutlinedIcon />
                            <input type="email" placeholder="Email ID" id='email' name='email' className="bg-transparent outline-none text-white text-sm w-full pl-2" />
                        </div>
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <LocalPhoneOutlinedIcon />
                            <input type="text" placeholder="Phone" id='phone' name='phone' className="bg-transparent outline-none text-white text-sm w-full pl-2" />
                        </div>
                        <div className="flex items-center bg-blue-900/20 rounded-md p-2 text-white">
                            <KeyOutlinedIcon />
                            <input type="password" placeholder="Password" id='password' name='password' className="bg-transparent outline-none text-white text-sm w-full pl-2" />
                        </div>


                        <button className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-md py-2 font-semibold shadow-md">Sign-up</button>
                        <div className='text-center'><Link to="/login" className='hover:underline'>Already have an account? Login here</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
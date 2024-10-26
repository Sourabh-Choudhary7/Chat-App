import React from 'react';
import welcomeImg from '../assets/chats.png';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-[0.65] rounded-[25px] bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 shadow-2xl shadow-violet-700/40">
      <div className="w-1/2 p-4">
      <h2 className='text-white text-3xl font-bold mb-2 drop-shadow-lg'>Hi Sourabh,👋</h2>
        <h3 className="text-white text-xl font-medium mb-2 drop-shadow-lg">
          Welcome to ChatConnect!
        </h3>
        <p className="text-white font-italic text-sm drop-shadow-md">
          " Your personal hub for seamless communication. Connect with friends, family, and colleagues in real-time, stay updated with instant messaging, and enjoy a smooth, interactive chat experience. Dive in, start chatting, and keep your conversations flowing effortlessly! "
        </p>
        <p className='text-white px-2 py-1 bg-gradient-to-r from-violet-700 to-fuchsia-700 p-4 shadow-2xl rounded-lg w-fit mt-4'>Select a chat to start messaging</p>
      </div>
      <div className="w-1/2">
        <img
          src={welcomeImg}
          alt="welcome"
          className="h-[250px] w-[400px] rounded-lg shadow-lg shadow-violet-700/20"
        />
      </div>
    </div>
  );
};

export default Welcome;

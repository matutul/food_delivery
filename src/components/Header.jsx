import React, { useState } from 'react';
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { MdShoppingBasket, MdAddCircleOutline, MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { app } from '../firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const Header = () => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const loginHandler = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(auth, provider);
            dispatch({
                type: actionTypes.SET_USER,
                user: providerData[0],
            })
            localStorage.setItem('user', JSON.stringify(providerData[0]));
            console.log(providerData[0]);
        } else {
            setIsMenu(!isMenu);
        }
    }
    const logoutHandler = () => {
        if (user) {
            localStorage.removeItem('user');
            dispatch({
                type: actionTypes.SET_USER,
                user: null,
            })
        }
    }
    return (
        <header className='w-screen h-auto p-2 sm:p-6 sm:px-16'>
            {/* desktop and tablet version */}
            <div className="hidden sm:flex w-full h-full justify-between">
                <Link to={'/'} className="flex items-center gap-2">
                    <motion.img whileTap={{ scale: 0.6 }} src={Logo} className="w-8 cursor-pointer" alt="LogoImage" />
                    <p className="text-textColor font-semibold text-xl cursor-pointer hover:text-headingColor">City</p>
                </Link>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center h-full gap-8">
                        <li className="cursor-pointer text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Home</li>
                        <li className="cursor-pointer text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Buy</li>
                        <li className="cursor-pointer text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">About us</li>
                        <li className="cursor-pointer text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Service</li>
                    </ul>
                    <div className="relative group">
                        <MdShoppingBasket className='text-2xl text-textColor cursor-pointer group-hover:text-headingColor duration-100 transition-all ease-in-out' />
                        <div className="absolute rounded-full bg-cartNumBg text-white text-xs w-3 min-w-3 h-3 flex items-center justify-center p-2 -top-2 -right-2 content-fit cursor-pointer">2</div>
                    </div>
                    <div className="relative" onClick={loginHandler}>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:text-headingColor border-2 border-white" alt="ProfileImage" />

                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, top: 0 }}
                                animate={{ opacity: 1, top: 50 }}
                                exit={{ opacity: 0, top: 0 }}
                                className="absolute right-0 top-12 flex flex-col w-40 rounded-lg shadow-xl bg-white overflow-hidden">
                                {user && user.email == "ashrafujjamantutul@gmail.com" &&
                                    <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out flex items-center gap-3">New Item <MdAddCircleOutline /></p>
                                }
                                <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out flex items-center gap-3" onClick={logoutHandler}>Log out <MdLogout /></p>
                            </motion.div>
                        )
                        }
                    </div>
                </div>
            </div>

            {/* mobile version */}
            <div className="w-full flex justify-between sm:hidden">
                <Link to={'/'} className="flex items-center gap-2">
                    <motion.img whileTap={{ scale: 0.6 }} src={Logo} className="w-8 cursor-pointer" alt="LogoImage" />
                    <p className="text-textColor font-semibold text-xl cursor-pointer hover:text-headingColor">City</p>
                </Link>
                <div className="flex items-center gap-8">

                    <div className="relative group">
                        <MdShoppingBasket className='text-2xl text-textColor cursor-pointer group-hover:text-headingColor duration-100 transition-all ease-in-out' />
                        <div className="absolute rounded-full bg-cartNumBg text-white text-xs w-3 min-w-3 h-3 flex items-center justify-center p-2 -top-2 -right-2 content-fit cursor-pointer">2</div>
                    </div>
                    <div className="relative" onClick={loginHandler}>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:text-headingColor border-2 border-white" alt="ProfileImage" />

                        {/* menu items on mobile screen */}
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, top: 0 }}
                                animate={{ opacity: 1, top: 50 }}
                                exit={{ opacity: 0, top: 0 }}
                                className="absolute right-0 top-12 flex flex-col w-40 rounded-lg shadow-xl bg-white overflow-hidden">


                                {user && user.email == "ashrafujjamantutul@gmail.com" &&
                                    <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out flex items-center gap-3">New Item <MdAddCircleOutline /></p>
                                }
                                <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out">Home</p>
                                <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out">Buy</p>
                                <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out">About us</p>
                                <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out">Service</p>

                                <p className="p-1 px-3 cursor-pointer text-base text-textColor hover:text-headingColor hover:bg-gray-50 duration-100 transition-all ease-in-out flex items-center justify-center rounded-md m-2 shadow-md bg-gray-200 gap-3" onClick={logoutHandler}>Log out <MdLogout /></p>


                            </motion.div>
                        )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
import React from 'react';
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';
import { heroData } from './../utils/heroData';

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-6">
                <div className="flex items-center bg-orange-200 px-4 py-2 gap-2 rounded-full">
                    <p className="text-orange-700 font-medium">Bike Delivery</p>
                    <div className="w-8 h-8 bg-white rounded-full shadow-md">
                        <img src={Delivery} className="w-full h-full object-contain" alt="Bike Delivery" />
                    </div>
                </div>
                <div>
                    <p className="text-[2.5rem] lg:text-[4.2rem] tracking-wide font-semibold text-headingColor">The Fastest Delivery in <span className="text-orange-600 text-[3rem] lg:text-[4.7rem]">Your City</span></p>
                </div>
                <p className="text-base text-textColor md:w-[80%] text-center md:text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto eum voluptate accusamus possimus quidem quaerat ullam doloremque, corrupti numquam asperiores, eos at non dolor similique aspernatur reprehenderit ratione.</p>
                <button type="button" className="px-8 py-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg w-full md:w-auto hover:drop-shadow-lg transition-all duration-100 ease-in-out">Order Now</button>
            </div>
            <div className="flex-1 relative mt-8 md:mt-auto flex justify-center items-center">
                <img src={HeroBg} className="ml-auto w-full h-[440px] md:h-[600px] md:w-auto" alt="HeroBG" />
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
                    <div className="max-w-[500px] h-full p-2 flex justify-center items-center flex-wrap gap-4">
                        {
                            heroData && heroData.map(item => <div id={item.id} className="w-[150px] lg:w-[190px] h-auto p-4 bg-cardOverlay backdrop-blur-md drop-shadow-lg rounded-xl flex flex-col items-center justify-center border">
                                <img src={item.image} className="w-20 lg:w-40 h-auto -mt-8 md:-mt-24" alt={item.item} />
                                <p className='text-lg font-semibold text-textColor'>{item.item}</p>
                                <p className='text-sm text-lightTextGray font-semibold'>{item.desc}</p>
                                <p className='text-base text-headingColor font-semibold mt-2'><span className='text-sm text-red-500'>$ </span>{item.price}</p>
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
import React from 'react';
import Delivery from '../img/delivery.png';

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
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
            <div className="bg-amber-500"></div>
        </section>
    );
};

export default HomeContainer;
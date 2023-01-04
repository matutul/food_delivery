import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Header, CreateContainer, MainContainer } from "./components";

const App = () => {
    return (
        <AnimatePresence exitBeforeEnter>

            <div className="w-full h-auto flex flex-col bg-primary">
                <Header />
                <main className="w-full px-4 py-4 md:px-16 mt-0 md:mt-[80px]">
                    <Routes>
                        <Route path="/create_container" element={<CreateContainer />} />
                        <Route path="/*" element={<MainContainer />} />
                    </Routes>
                </main>
            </div>;
        </AnimatePresence>
    )
};

export default App;
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Header, CreateContainer, MainContainer } from "./components";

const App = () => {
    return (
        <AnimatePresence exitBeforeEnter>

            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />
                <main className="mt-18 p-8 w-full">
                    <Routes>
                        <Route path="/create_container" element={<CreateContainer />} />
                        <Route path="/main_container" element={<MainContainer />} />
                    </Routes>
                </main>
            </div>;
        </AnimatePresence>
    )
};

export default App;
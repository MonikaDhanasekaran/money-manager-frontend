import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login';
import Dashboard from './dashboard';
import Income from './income';
import Expense from './expense';

function RouterComponent(){
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expense" element={<Expense />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default RouterComponent;
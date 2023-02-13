import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ForgotPassword from '../Auth/ForgotPassword';
import Dashboard from '../Auth/dashboard';
import Income from '../Income/income';
import CreateIncome from '../Income/CreateIncome';
import UpdateIncome from '../Income/UpdateIncome';
import Expense from '../Expense/expense';
import CreateExpense from '../Expense/CreateExpense';
import UpdateExpense from '../Expense/UpdateExpense';

function RouterComponent(){
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="forgotpassword" element={<ForgotPassword />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/createIncome" element={ <CreateIncome /> } />
                        <Route path="/updateIncome/:dataID" element={ <UpdateIncome /> } />
                        <Route path="/expense" element={<Expense />} />
                        <Route path="/createExpense" element={ <CreateExpense /> } />
                        <Route path="/updateExpense/:dataID" element={ <UpdateExpense /> } />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default RouterComponent;
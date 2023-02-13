import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Box, AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import WalletIcon from '@mui/icons-material/Wallet';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import jwt from 'jsonwebtoken';
import axios from "axios";

function Dashboard() {

    const navigate = useNavigate();
    const [overview, setOverview] = useState([]);

    useEffect(() => {
        async function getOverview() {
            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/")
            } else {
                const response = await axios.get("https://money-manager-xvlt.onrender.com/overview/get", {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                });
                setOverview(response.data);
            }
        }
        getOverview();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleIncome = () => {
        navigate("/income");
    }

    const handleExpense = () => {
        navigate("/expense");
    }

    return (
        <div className='dashboard'>
            <Grid>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: "Verdana" }} >
                                MONEY MANAGER
                            </Typography>
                            <PaidIcon />
                            <Button color="inherit" onClick={() => handleIncome()}>Income</Button>
                            <WalletIcon />
                            <Button color="inherit" onClick={() => handleExpense()}>Expense</Button>
                            <LogoutIcon />
                            <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />
                <Grid container spacing={2}>
                    {overview.length && overview.map((row, index) => (
                        <Grid item key={index}>
                            <Card sx={{ minWidth: 285, borderRadius: "40px", marginLeft: "210%", marginTop: "40%" }}>
                                <CardContent>
                                     <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                         <strong>{row.name}</strong>
                                     </Typography>
                                     <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                         Weekly Income: {row.weeklyIncome}
                                     </Typography>
                                     <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                         Weekly Expense: {row.weeklyExpense}
                                     </Typography>
                                     <hr />
                                     <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                         Monthly Income: {row.monthlyIncome}
                                     </Typography>
                                     <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                         Monthly Expense: {row.monthlyExpense}
                                     </Typography>
                                     <hr />
                                     <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                         Yearly Income: {row.yearlyIncome}
                                     </Typography>
                                     <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                         Yearly Expense: {row.yearlyExpense}
                                     </Typography>
                                 </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;
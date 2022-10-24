import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Box, AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent }from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import WalletIcon from '@mui/icons-material/Wallet';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import jwt from "jsonwebtoken";
import axios from "axios";

function Dashboard() {

    const navigate = useNavigate();
    const [overview, setOverview] = useState([]);

    useEffect(() => {
        async function getOverview() {
            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/dashboard")
            } else {
                const response = await axios.get("http://localhost:3003/overview/get", {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                });
                setOverview(response.data);
            }
        }
        getOverview();
    }, []);

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
        <div className="dashboard">
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
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
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
                <Grid container spacing={2} style={{ padding: "5px", marginLeft: "38%", marginTop: "50px" }}>
                    {overview.map(row => (
                        <Grid item key={row._id}>
                            <Card sx={{ minWidth: 285 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                        <strong>{row.overview.name}</strong>
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Monthly Income: {row.overview.monthlyIncome}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Monthly Expense: {row.overview.monthlyExpense}
                                    </Typography>
                                    <hr />
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Weekly Income: {row.overview.weeklyIncome}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Weekly Expense: {row.overview.weeklyExpense}
                                    </Typography>
                                    <hr />
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Yearly Income: {row.overview.yearlyIncome}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Yearly Expense: {row.overview.yearlyExpense}
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
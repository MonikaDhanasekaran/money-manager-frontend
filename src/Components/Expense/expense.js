import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import jwt from 'jsonwebtoken';

function Expense() {

    const navigate = useNavigate();
    const [expense, setExpense] = useState([]);

    useEffect(() => {
        getExpense();
    }, []);

    const getExpense = async () => {
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/expense")
        } else {
            const response = await axios.get("https://money-manager-xvlt.onrender.com/expense/get", {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            setExpense(response.data);
        }
    }

    const handleDelete = async (userID) => {
        try {
            const response = await axios.delete(`https://money-manager-xvlt.onrender.com/expense/delete/${userID}`, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                getExpense();
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleHome = () => {
        navigate("/dashboard");
    }

    const handleAddExpense = () => {
        navigate("/createExpense");
    }

    return (
        <div className='expense'>
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
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: "Verdana" }}>
                                EXPENSE
                            </Typography>
                            <AddCircleIcon />
                            <Button color="inherit" onClick={handleAddExpense}>Add</Button>
                            <HomeIcon />
                            <Button color="inherit" onClick={() => handleHome()}>Home</Button>
                            <LogoutIcon />
                            <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />
                <Grid container spacing={2}>
                    {expense.length && expense.map((row, index) => (
                        <Grid item key={index}>
                            <Card sx={{ width: "290px", borderRadius: "40px", marginLeft: "30px", paddingBottom: "20px" }}>
                                <CardContent>
                                    <br />
                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                        <strong>{row.name}</strong>
                                    </Typography>
                                    <br />
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Expense: {row.expense}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Expense In: {row.expenseIn}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Expense For: {row.expenseFor}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Month : {row.month}
                                    </Typography>
                                </CardContent> 
                                <Link style={{ fontSize: "20px" }} className="btn btn-link" to={`/updateExpense/${row._id}`}><ModeIcon style={{ fontSize: "19px" }} />Edit</Link> &nbsp;
                                <Link style={{ fontSize: "20px" }} className="btn btn-link" onClick={() => handleDelete(row._id)}><DeleteIcon style={{ fontSize: "19px" }} />Delete</Link>
                                <br />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default Expense;
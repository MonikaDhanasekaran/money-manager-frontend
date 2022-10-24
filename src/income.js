import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import jwt from 'jsonwebtoken';

function Income() {

    const navigate = useNavigate();
    const [income, setIncome] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getIncome() {
            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/dashboard")
            } else {
                const response = await axios.get("http://localhost:3003/income/get", {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                });
                setIncome(response.data);
            }
        }
        getIncome();
    }, []);

    const handleAdd = async (value) => {
        console.log("Hello");
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/dashboard");
        } else {
            const response = await axios.post("http://localhost:3003/income/create",
                {
                    income: {
                        monthlyIncome: value,
                        month: value,
                    }
                },
                {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                }
            );
            // let incomeCopy = [...income];
            // const index = incomeCopy.findIndex((row) => row._id === id);
            // income[index].monthlyIncome = response.data.value.monthlyIncome;
            // income[index].month = response.data.value.month;
            setIncome(income);
        }
    };

    const handleEdit = async (id, value) => {
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/dashboard");
        } else {
            const response = await axios.put(`http://localhost:3003/income/update/${id}`,
                {
                    income: {
                        monthlyIncome: value,
                        month: value,
                    }
                },
                {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                }
            );
            let incomeCopy = [...income];
            const index = incomeCopy.findIndex((row) => row._id === id);
            income[index].monthlyIncome = response.data.value.monthlyIncome;
            income[index].month = response.data.value.month;
            setIncome(incomeCopy);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleHome = () => {
        navigate("/dashboard");
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='income'>
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
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                INCOME
                            </Typography>
                            <AddCircleIcon />
                            <Button color="inherit" onClick={handleClickOpen}>Add</Button>
                            <HomeIcon />
                            <Button color="inherit" onClick={() => handleHome()}>Home</Button>
                            <LogoutIcon />
                            <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <br />
                <Grid container spacing={12} style={{ padding: "20px" }}>
                    {income.map(row => (
                        <Grid item key={row._id}>
                            <Card sx={{ minWidth: 300 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                        <strong>{row.income.name}</strong>
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Income: {row.income.monthlyIncome}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Month: {row.income.month}
                                    </Typography>
                                </CardContent>
                                <Button color="primary" onClick={handleClickOpen} style={{ marginBottom: "20px" }}>Edit</Button>
                                <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
                                    <DialogTitle id="dialog-title">Edit Data</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Monthly Income"
                                            type="text"
                                            fullWidth
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Month"
                                            type="text"
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleEdit()} color="primary">
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Income Data</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Monthly Income"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Month"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleAdd()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default Income;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormGroup, Checkbox, FormControlLabel
}
    from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import jwt from 'jsonwebtoken';

function Expense() {

    const navigate = useNavigate();
    const [expense, setExpense] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getExpense() {
            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/dashboard")
            } else {
                const response = await axios.get("http://localhost:3003/expense/get", {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                });
                setExpense(response.data);
            }
        }
        getExpense();
    }, []);

    const handleAdd = async (value) => {
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/dashboard");
        } else {
            const response = await axios.post("http://localhost:3003/expense/create",
                {
                    income: {
                        expense: value,
                        expenseIn: value,
                        expenseFor: value,
                        month: value,
                    }
                },
                {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                }
            );
            const index = expense.findIndex((row) => row._id);
            let expenseCopy = [...expense];
            expense[index].expense = response.data.value.expense;
            expense[index].expenseIn = response.data.value.expenseIn;
            expense[index].expenseFor = response.data.value.expenseFor;
            expense[index].month = response.data.value.month;
            setExpense(expenseCopy);
            console.log(expense);
        }
    };

    const handleEdit = async (id, value) => {
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/dashboard");
        } else {
            const response = await axios.put(`http://localhost:3003/expense/update/${id}`,
                {
                    expense: {
                        expense: value,
                        expenseIn: value,
                        expenseFor: value,
                        month: value,
                    }
                },
                {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                }
            );
            let expenseCopy = [...expense];
            const index = expenseCopy.findIndex((row) => row._id === id);
            expense[index].expense = response.data.value.expense;
            expense[index].expenseIn = response.data.value.expenseIn;
            expense[index].expenseFor = response.data.value.expenseFor;
            expense[index].month = response.data.value.month;
            setExpense(expenseCopy);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleHome = () => {
        navigate("/dashboard");
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
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Expense
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
                <Grid container spacing={7} style={{ padding: "20px" }}>
                    {expense.map(row => (
                        <Grid item key={row._id}>
                            <Card sx={{ minWidth: 285 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                        <strong>{row.expense.name}</strong>
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Expense: {row.expense.expense}
                                    </Typography>
                                    <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                        Expenses In: {row.expense.expenseIn}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>
                                        Expenses For: {row.expense.expenseFor}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>
                                        Month: {row.expense.month}
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
                                            label="Expense"
                                            type="text"
                                            fullWidth
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Expenses In"
                                            type="text"
                                            fullWidth
                                        />
                                        <FormGroup>
                                            <p style={{ fontSize: "20px" }}>Expenses For</p>
                                            <FormControlLabel control={<Checkbox />} label="Fuel" />
                                            <FormControlLabel control={<Checkbox />} label="Food" />
                                            <FormControlLabel control={<Checkbox />} label="Clothes" />
                                            <FormControlLabel control={<Checkbox />} label="Others" />
                                        </FormGroup>
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
                    <DialogTitle id="form-dialog-title">Expense Data</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Expense"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Expenses In"
                            type="text"
                            fullWidth
                        />
                        <FormGroup>
                            <p style={{ fontSize: "20px" }}>Expenses For</p>
                            <FormControlLabel control={<Checkbox />} label="Fuel" />
                            <FormControlLabel control={<Checkbox />} label="Food" />
                            <FormControlLabel control={<Checkbox />} label="Clothes" />
                            <FormControlLabel control={<Checkbox />} label="Others" />
                        </FormGroup>
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

export default Expense;
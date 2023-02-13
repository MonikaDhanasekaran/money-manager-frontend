import React, { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Typography, Grid, Button, Box, AppBar, Toolbar, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateExpense = () => {

    const navigate = useNavigate();
    const [addExpense, setAddExpense] = useState({
        name: "",
        expense: "",
        expenseIn: "",
        expenseFor: "",
        month: "",
    });

    const handleInput = (value) => {
        return setAddExpense(data => {
            return { ...data, ...value }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/")
        } else {
            const response = await axios.post("https://money-manager-xvlt.onrender.com/expense/create", addExpense, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                setAddExpense({
                    name: "",
                    expense: "",
                    expenseIn: "",
                    expenseFor: "",
                    month: "",
                });
                navigate("/expense");
            }
            setAddExpense(response.data);
        }
    }

    const handleBack = () => {
        navigate("/expense");
    }

    return (
        <>
            <div id="CreateExpense">
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
                            <Typography variant="h6" component="div" id="createTipsTypo" sx={{ flexGrow: 1 }} style={{ fontFamily: "Verdana" }}>
                                Add Expense
                            </Typography>
                            <Button color="inherit" id="createTipsButton" onClick={handleBack}><ArrowBackIcon />Back</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid container>
                    <Card sx={{ margin: "10px", marginLeft: "35%", marginTop: "3%", borderRadius: "40px", padding: "20px", width: "30%" }}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h4" component="div"> Add Expense </Typography> <br />
                                <div>
                                    < TextField type="text" name="email" label="Name" style={{ minWidth: "240px" }}
                                        value={addExpense.name}
                                        onChange={(e) => handleInput({ name: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField type="text" name="monthlyIncome" label="Expense" style={{ minWidth: "240px" }}
                                        value={addExpense.expense}
                                        onChange={(e) => handleInput({ expense: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl style={{ minWidth: "240px" }}>
                                            <InputLabel id="demo-simple-select-label">Expense In</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={addExpense.expenseIn}
                                                label="Expense In"
                                                onChange={(e) => handleInput({ expenseIn: e.target.value })}
                                            >
                                                <MenuItem value="office">Office</MenuItem>
                                                <MenuItem value="personal">Personal</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <br />
                                <div>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl style={{ minWidth: "240px" }}>
                                            <InputLabel id="demo-simple-select-label">Expense For</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={addExpense.expenseFor}
                                                label="Expense For"
                                                onChange={(e) => handleInput({ expenseFor: e.target.value })}
                                            >
                                                <MenuItem value="fuel">Fuel</MenuItem>
                                                <MenuItem value="food">Food</MenuItem>
                                                <MenuItem value="clothes">Clothes</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <br />
                                <div>
                                    < TextField type="text" name="month" label="Month" style={{ minWidth: "240px" }}
                                        value={addExpense.month}
                                        onChange={(e) => handleInput({ month: e.target.value })}
                                    />
                                </div>
                                <br />
                                <Button variant="contained" type="submit" onClick={handleSubmit} style={{ width: "20%" }}> Add </Button> <br /><br />
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default CreateExpense;
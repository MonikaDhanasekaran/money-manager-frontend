import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Button, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateExpense = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dataID = params.dataID.toString();
    const [updateExpense, setUpdateExpense] = useState({
        expense: "",
        expenseIn: "",
        expenseFor: "",
        month: "",
    });

    useEffect(() => {
        axios.get(`https://money-manager-xvlt.onrender.com/expense/getOne/${dataID}`, {
            headers: {
                accesstoken: localStorage.getItem("token"),
            },
        }).then((response) => {
            setUpdateExpense(response.data);
        }).catch(error => {
            console.log("Error:", error);
        })
    }, [dataID]);

    const handleInput = (value) => {
        return setUpdateExpense(data => {
            return {
                ...data, ...value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://money-manager-xvlt.onrender.com/income/update/${dataID}`, updateExpense, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                setUpdateExpense({
                    expense: "",
                    expenseIn: "",
                    expenseFor: "",
                    month: "",
                });
                navigate("/expense");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleBack = () => {
        navigate("/expense");
    }

    return (
        <>
            <div id="UpdateExpense">
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
                                Update Expense
                            </Typography>
                            <Button color="inherit" onClick={handleBack}><ArrowBackIcon />Back</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid container>
                    <Card sx={{ margin: "10px", marginLeft: "40%", marginTop: "6%", borderRadius: "40px", padding: "20px" }}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h4" component="div"> Update Data </Typography> <br />
                                <div>
                                    < TextField type="text" name="expense" label="Expense"
                                        value={updateExpense.expense}
                                        onChange={(e) => handleInput({ expense: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField type="text" name="expenseIn" label="Expense In"
                                        value={updateExpense.expenseIn}
                                        onChange={(e) => handleInput({ expenseIn: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField type="text" name="expenseFor" label="Expense For"
                                        value={updateExpense.expenseFor}
                                        onChange={(e) => handleInput({ expenseFor: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField type="text" name="month" label="Month"
                                        value={updateExpense.month}
                                        onChange={(e) => handleInput({ month: e.target.value })}
                                    />
                                </div>
                                <br />
                                <Button variant="contained" type="submit"> Update </Button> <br /> <br />
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default UpdateExpense;
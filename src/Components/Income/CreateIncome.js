import React, { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Typography, Grid, Button, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateIncome = () => {

    const navigate = useNavigate();
    const [addIncome, setAddIncome] = useState({
        name: "",
        monthlyIncome: "",
        month: "",
    });

    const handleInput = (value) => {
        return setAddIncome(data => {
            return { ...data, ...value }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/")
        } else {
            const response = await axios.post("https://money-manager-xvlt.onrender.com/income/create", addIncome, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                setAddIncome({
                    name: "",
                    monthlyIncome: "",
                    month: "",
                });
                navigate("/income");
            }
            setAddIncome(response.data);
        }
    }

    const handleBack = () => {
        navigate("/income");
    }

    return (
        <>
            <div id="CreateIncome">
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
                                Add Income
                            </Typography>
                            <Button color="inherit" id="createTipsButton" onClick={handleBack}><ArrowBackIcon />Back</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid container>
                    <Card sx={{ margin: "10px", marginLeft: "40%", marginTop: "7%", borderRadius: "40px", padding: "20px" }}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h4" component="div"> Add Income </Typography> <br />
                                <div>
                                    < TextField type="text" name="email" label="Name"
                                        value={addIncome.name}
                                        onChange={(e) => handleInput({ name: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField type="text" name="monthlyIncome" label="Monthly Income"
                                        value={addIncome.monthlyIncome}
                                        onChange={(e) => handleInput({ monthlyIncome: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField type="text" name="month" label="Month"
                                        value={addIncome.month}
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

export default CreateIncome;
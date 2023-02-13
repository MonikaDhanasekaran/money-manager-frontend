import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Typography, Grid, Button, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateIncome = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dataID = params.dataID.toString();
    const [updateIncome, setUpdateIncome] = useState({
        name: "",
        monthlyIncome: "",
        month: "",
    });

    useEffect(() => {
        axios.get(`https://money-manager-xvlt.onrender.com/income/getOne/${dataID}`, {
            headers: {
                accesstoken: localStorage.getItem("token"),
            },
        }).then((response) => {
            setUpdateIncome(response.data);
        }).catch(error => {
            console.log("Error:", error);
        })
    }, [dataID]);

    const handleInput = (value) => {
        return setUpdateIncome(data => {
            return {
                ...data, ...value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://money-manager-xvlt.onrender.com/income/update/${dataID}`, updateIncome, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                setUpdateIncome({
                    name: "",
                    monthlyIncome: "",
                    month: "",
                });
                navigate("/income");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleBack = () => {
        navigate("/income");
    }

    return (
        <>
            <div id="UpdateIncome">
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
                            <Typography variant="h6" component="div" id="updateTipsTypo" sx={{ flexGrow: 1 }} style={{ fontFamily: "Verdana" }}>
                                Update Income
                            </Typography>
                            <Button color="inherit" id="updateTipsButton" onClick={handleBack}><ArrowBackIcon />Back</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid container>
                    <Card sx={{ margin: "10px", marginLeft: "40%", marginTop: "8%", borderRadius: "40px", padding: "20px" }}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography id="updateTypo" variant="h4" component="div"> Update Data </Typography> <br />
                                <div>
                                    < TextField id="updateMealTextField" type="text" name="income" label="Name"
                                        value={updateIncome.name}
                                        onChange={(e) => handleInput({ name: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField id="updateMealTextField" type="text" name="income" label="Income"
                                        value={updateIncome.monthlyIncome}
                                        onChange={(e) => handleInput({ monthlyIncome: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField id="updateTimingTextField" type="text" name="month" label="Month"
                                        value={updateIncome.month}
                                        onChange={(e) => handleInput({ month: e.target.value })}
                                    />
                                </div>
                                <br />
                                <Button variant="contained" id="updateButton" type="submit" style={{ width: "20%" }}> Update </Button> <br /> <br />
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default UpdateIncome;
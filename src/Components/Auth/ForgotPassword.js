import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

const ForgotPassword = () => {

    const [formStep, setFormStep] = useState(1);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleAccountExists = async (e) => {
        if (e && formData.email) {
            axios
                .post("https://money-manager-xvlt.onrender.com/moneyManager/forgotpassword", {
                    email: formData.email,
                })
                .then((response) => {
                    const data = response.data;
                    if (data && data.success) {
                        setFormStep(2);
                    }
                    if (!data.success) {
                        alert("Account Doesn't Exists");
                    }
                })
                .catch((e) => console.log(e));
        } else {
            alert("Email is empty");
        }
    }

    const handleSubmit = (e) => {
        if (formData.password.length < 1) {
            setError("Password is not valid");
            return;
        }
        if (
            e &&
            formData.password &&
            formData.password === formData.confirmPassword &&
            formData.password.length > 0
        ) {
            // FIRE API AND CHNAGE PASSWORD
            axios
                .post("https://money-manager-xvlt.onrender.com/moneyManager/changepassword", {
                    email: formData.email,
                    password: formData.password,
                })
                .then((response) => {
                    let data = response.data;
                    console.log(response, data);
                    if (data && response.status === 201 && data.success) {
                        navigate("/");
                    } else {
                        setError(data.message);
                    }
                })
                .catch((e) => console.log(e));
        } else {
            alert("Passwords doesnt match");
        }
    };

    return (
        <>
            <div id="forgotPasswordPage">
                {formStep === 1 && (
                    <>
                        <div className="mb-3">
                            <Grid container>
                                <Card id="cardForgotPassword">
                                    <CardContent>
                                        <SecurityRoundedIcon sx={{ fontSize: 50 }} color="secondary" />
                                        <Typography id="forgotPasswordTypo" variant="h4" component="div">Account Verification</Typography> <br />
                                        < TextField style={{ width: "80%" }} type="text" name="email" label="Enter Your Registered Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        <br /> <br />
                                        <Button variant="contained" id="forgotPasswordButton" type="submit" onClick={handleAccountExists}> Verify </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>
                    </>
                )}
                {formStep === 2 && (
                    <>
                        <div id="changePasswordPage">
                            <Grid container>
                                <Card id="cardChangePassword">
                                    <CardContent>
                                        <ChangeCircleRoundedIcon sx={{ fontSize: 60 }} color="primary"/>
                                        <Typography id="changePasswordTypo" variant="h4" component="div">Change Password</Typography> <br />
                                        < TextField type="password" name="email" label="New Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                        <br /> <br />
                                        < TextField type="password" name="email" label="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                        <br /> <br />
                                        <Button variant="contained" id="changePasswordButton" type="submit" onClick={handleSubmit} > Change Password </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ForgotPassword;
import React, { useState } from 'react';
import axios from 'axios';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { pink } from '@mui/material/colors';
import { validateEmail } from "../Validations/helpers";
import { useNavigate, Link } from 'react-router-dom';
import { Typography, TextField, Button, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        role: "",
    });

    const handleSubmit = async (e) => {
        if (validateEmail(formData.email || "")) {
            alert("Email is invalid");
        } else if (
            !formData.password ||
            !formData.confirmPassword ||
            String(formData.password).trim().toLocaleLowerCase() !== String(formData.confirmPassword).trim().toLocaleLowerCase()
        ) {
            alert("Passwords doesn't match");
        } else {
            e.preventDefault();
            const response = await axios.post("https://money-manager-xvlt.onrender.com/moneyManager/signup", {
                ...formData,
            });
            console.log(response);
            navigate("/");
        }
    }

    return (

        <div className="register"> <br /><br />
            <Card sx={{ width: "40%", marginLeft: "30%", marginTop: "2%", borderRadius: "50px" }}> <br />
                <CardContent>
                    <LockOpenIcon sx={{ color: pink[500], fontSize: 50 }} />
                        <Typography component="h1" variant="h4" style={{ fontSize: "40px", fontFamily: "Verdana" }}> Sign up </Typography> 
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        < TextField type="text" name="name" label="Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        < TextField type="text" name="uname" label="Username"
                                        value={formData.userName}
                                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    < TextField type="text" name="email" label="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Password" type="password" name="password" 
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Confirm Password" type="password" name="confirmPassword" 
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                </Grid> 
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Mobile Number" type="number" name="mobileNumber" 
                                    value={formData.mobileNumber}
                                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="filled" style={{ width: "90%" }}>
                                        <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            <MenuItem value="admin">Admin</MenuItem>
                                            <MenuItem value="user">User</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid> <br /> <br />
                        <Button variant="contained" type="submit" style={{ width: "30%" }}> Register </Button> <br /><br />
                        Already have an account? <Link to="/">Sign in</Link>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register;
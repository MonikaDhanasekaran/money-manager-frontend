import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { green } from '@mui/material/colors';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email === "" && formData.password === "") {
            alert("Please fill all values");
        } else {
            try {
                const response = await axios.post("https://money-manager-xvlt.onrender.com/moneyManager/signin", {
                    ...formData,
                });

                if (response) {
                    localStorage.setItem("token", response.data.Token);
                    navigate("/dashboard");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="login"><br /> <br />
            <form onSubmit={handleSubmit} >
                <Grid>
                    <Paper className="paper" elevation={10} style={{ padding: 10, height: "70vh", width: 350, marginTop: "4%", marginLeft: "36%", borderRadius: "50px" }}>
                        <Grid align="center"> <br />
                            <LoginIcon sx={{ color: green[500], fontSize: 50 }} />
                            <Typography variant="h4" component="div" style={{ fontSize: "40px", fontFamily: "Verdana" }}> Sign In </Typography> <br /> <br />
                            <TextField type="text"
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <br /><br />
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            /> <br /> <br /><br />
                            <Button variant="contained" type="submit" style={{ width: "30%" }}> Login </Button>
                            <br /><br />
                            Don't have an account? <Link to="/signup">Sign Up</Link> <br /> <br />
                            <Link to="/forgotpassword">forgot password?</Link>
                        </Grid>
                    </Paper>
                </Grid>
            </form>
        </div>
    )
}

export default Login;

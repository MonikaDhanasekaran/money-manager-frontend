import React,{ useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import {Typography, TextField, Button, Avatar, Grid, Paper} from '@mui/material';

function Login () {

    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:3003/user/signin",{
            ...formData,
        });
        if(response){
            localStorage.setItem("token",response.data);
            navigate("/dashboard");
        }
    }
    return(
        <div className="login"><br /> <br />
            <Typography variant="h4" component="div" style= {{ fontSize: "50px", color: "lightblue" }}> SIGN IN !!! </Typography> <br/> <br/>
                <form onSubmit={handleSubmit}>
                <Grid>
                    <Paper elevation={10} style={{ padding: 10, height: "60vh", width: 300, margin: "20px auto" }}>
                        <Grid align="center">
                            <Avatar style={{ backgroundColor: "#1bbd7e", marginTop: "20px", width: 50, height: 50 }}>
                                <LoginIcon />
                            </Avatar> <br /> <br />   

                            {/* Registered Email: "aa@gmail.com" and 
                            
                                Registered Password: "aaa123" */}

                            <TextField type="text" 
                            name="email" 
                            label="Email" 
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            /> <br /> <br />
                            <TextField 
                            label="Password" 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            /> <br /> <br /> <br />
                            <Button variant="contained" type="submit"> Sign in </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </form> 
        </div>
    )
}

export default Login;
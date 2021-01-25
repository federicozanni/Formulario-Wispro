import React, { useState } from "react";
import { makeStyles, Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Link } from '@material-ui/core';
import { db } from "./Firebase";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Singin = () => {

  const classes = useStyles();


  //valores iniciales del state
  const initialStateValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };


  //state donde se almacena la data
  const [values, setValues] = useState(initialStateValues);
  

  //state para alcamenar el id actual
  const [id, setId] = useState("");


  //agrega o edita un dato en firebase
  const addLink = async (linkObject) => {
      if (id === "") {
        await db.collection("links").doc().set(linkObject);
      } setId('');
  };


  //maneja el cambio del imput
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


  //valor del state actual
  const handleSubmit = (e) => {
    e.preventDefault();
    addLink(values);
    setValues({ ...initialStateValues });
  };


  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="fname"
                value={values.firstName}
                name="firstName"
                variant="outlined"
                required
                onChange={handleInputChange}
                fullWidth
                label="First Name"
                type="text"
                autoFocus
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                value={values.lastName}
                fullWidth
                onChange={handleInputChange}
                label="Last Name"
                name="lastName"
                id="lastName"
                type="text"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={values.email}
                fullWidth
                onChange={handleInputChange}
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={values.password}
                fullWidth
                onChange={handleInputChange}
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          > Sing in
          </Button>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"you have an account? Login"}
                </Link>
            </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Singin;
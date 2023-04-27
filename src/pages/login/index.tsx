import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useLogin} from "../../hooks/login/use_login";
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import {Navigate} from "react-router-dom";

const theme = createTheme();

interface LoginProps {
    setAuthToken :(token: string) => void
}

export const Login = ({setAuthToken}: LoginProps) => {
    const {
        onSubmitHandler,
        register,
        errors,
        loading,
        handleSubmit,
        errorMessage,
    } = useLogin(setAuthToken)

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {errorMessage !== "" && (
                        <Alert variant="filled" severity="error">
                            {errorMessage}
                        </Alert>
                    )}
                    <Box
                        component='form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            error={!!errors['email']}
                            helperText={errors['email'] ? errors['email'].message : ''}
                            {...register('email')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            error={!!errors['password']}
                            helperText={errors['password'] ? errors['password'].message : ''}
                            {...register('password')}
                        />
                        <LoadingButton
                            variant='contained'
                            fullWidth
                            type='submit'
                            loading={loading}
                            sx={{ py: '0.8rem', mt: '1rem' }}
                        >
                            Login
                        </LoadingButton>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
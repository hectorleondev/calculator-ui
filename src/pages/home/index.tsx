import {Link, Navigate} from "react-router-dom";
import * as React from "react";
import {useHome} from "../../hooks/home/use_home";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
    Button,
    CircularProgress, FormControl, Grid, InputLabel, MenuItem, Pagination, PaginationItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Alert from "@mui/material/Alert";

const theme = createTheme();
export const Home = () => {
    const {
        token,
        loading,
        errorMessage,
        calculationList,
        logout,
        onChange,
        operationList,
        onChangeOperation,
        operationType,
        onFilterClick
    } = useHome();

    return (
        <ThemeProvider theme={theme}>
            <Button variant="text" onClick={logout}>Logout</Button>
            {!token && (
                <Navigate to="/login" replace />
            )}
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {loading && (<CircularProgress />)}

                    {errorMessage !== "" && (
                        <Alert variant="filled" severity="error">
                            {errorMessage}
                        </Alert>
                    )}

                    {!loading && errorMessage === "" && (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Operation Type</InputLabel>
                                        <Select
                                            labelId="operation-type-label"
                                            id="operation-type-label"
                                            value={operationType}
                                            label="Operation Type"
                                            onChange={onChangeOperation}
                                        >
                                            <MenuItem value="">ALL</MenuItem>
                                            {operationList.operations.map((item)=> (
                                                <MenuItem value={item.operation_id}>{item.type}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={onFilterClick}>Apply Filters</Button>
                                </Grid>
                            </Grid>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Operation Type</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">User Balance</TableCell>
                                            <TableCell align="right">Operation Response</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {calculationList.records.map((item) => (
                                            <TableRow
                                                key={item.record_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {item.operation_type}
                                                </TableCell>
                                                <TableCell align="right">{item.amount}</TableCell>
                                                <TableCell align="right">{item.user_balance}</TableCell>
                                                <TableCell align="right">{item.operation_response}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {calculationList.total_records > 0 && (
                                <Pagination
                                    page={calculationList.page}
                                    count={calculationList.total_pages}
                                    onChange={(event, page)=>onChange(page)}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

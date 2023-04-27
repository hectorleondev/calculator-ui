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
import TextField from "@mui/material/TextField";
import {AddDialog} from "./add_dialog";

const theme = createTheme();
interface HomeProps {
    setAuthToken :(token: string) => void
}

export const Home = ({setAuthToken}: HomeProps) => {
    const {
        loading,
        errorMessage,
        calculationList,
        logout,
        onChange,
        operationList,
        onSubmitHandler,
        register,
        errors,
        handleSubmit,
        conditions_number,
        condition_string,
        onChangeOperation,
        onChangeAmount,
        onChangeUseBalance,
        onChangeOperationResponse,
        operationType,
        conditionAmount,
        conditionUseBalance,
        conditionOperationResponse,
        openAddDialog,
        handleClickOpenAddDialog,
        handleCloseAddDialog,
        onAfterAdd
    } = useHome(setAuthToken);

    return (
        <ThemeProvider theme={theme}>
            <Button variant="text" onClick={logout}>Logout</Button>
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
                            <Box
                                component='form'
                                noValidate
                                autoComplete='off'
                                onSubmit={handleSubmit(onSubmitHandler)}
                            >
                                    <Grid container spacing={4}>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="operation-type-label">Operation Type</InputLabel>
                                                <Select
                                                    labelId="operation-type-label"
                                                    id="operation-type-label"
                                                    label="Operation Type"
                                                    value={operationType}
                                                    onChange={onChangeOperation}
                                                >
                                                    <MenuItem value="">ALL</MenuItem>
                                                    {operationList.operations.map((item)=> (
                                                        <MenuItem value={item.operation_id}>{item.type}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="number"
                                                id="outlined-basic"
                                                label="Amount"
                                                variant="outlined"
                                                error={!!errors['amount']}
                                                helperText={errors['amount'] ? errors['amount'].message : ''}
                                                {...register('amount', {
                                                    setValueAs: (v) => v === "" ? undefined : parseInt(v, 10)
                                                })}
                                            />
                                            <FormControl>
                                                <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                                                <Select
                                                    labelId="condition-amount-label"
                                                    id="condition-amount-label"
                                                    label="Condition"
                                                    value={conditionAmount}
                                                    onChange={onChangeAmount}
                                                >
                                                    {conditions_number.map((item)=> (
                                                        <MenuItem value={item.value}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={4} sx={{marginTop: "10px"}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="number"
                                                id="outlined-basic"
                                                label="User Balance"
                                                variant="outlined"
                                                error={!!errors['user_balance']}
                                                helperText={errors['user_balance'] ? errors['user_balance'].message : ''}
                                                {...register('user_balance', {
                                                    setValueAs: (v) => v === "" ? undefined : parseInt(v, 10)
                                                })}
                                            />
                                            <FormControl>
                                                <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                                                <Select
                                                    labelId="condition-user-balance-label"
                                                    id="condition-user-balance-label"
                                                    label="Condition"
                                                    value={conditionUseBalance}
                                                    onChange={onChangeUseBalance}
                                                >
                                                    {conditions_number.map((item)=> (
                                                        <MenuItem value={item.value}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Operacion Response"
                                                variant="outlined"
                                                error={!!errors['operation_response']}
                                                helperText={errors['operation_response'] ? errors['operation_response'].message : ''}
                                                {...register('operation_response')}
                                            />
                                            <FormControl>
                                                <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                                                <Select
                                                    labelId="condition-operation-response-label"
                                                    id="condition-operation-response-label"
                                                    label="Condition"
                                                    value={conditionOperationResponse}
                                                    onChange={onChangeOperationResponse}
                                                >
                                                    {condition_string.map((item)=> (
                                                        <MenuItem value={item.value}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{marginTop: "10px", marginBottom: "10px"}}>
                                        <Grid item xs={6}>
                                            <Button variant="contained" color="primary" type="submit" >Apply Filters</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="contained" color="success" onClick={handleClickOpenAddDialog}>New Calculation</Button>
                                        </Grid>
                                    </Grid>
                            </Box>
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

            <AddDialog
                open={openAddDialog}
                handleClose={handleCloseAddDialog}
                operations={operationList.operations}
                onAfterAdd={onAfterAdd}
            />
        </ThemeProvider>
    );
};

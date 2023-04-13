import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem, Select
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Operation} from "../../api/operation/types";
import * as React from "react";
import {useAddDialog} from "../../hooks/home/use_add_dialog";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import Alert from "@mui/material/Alert";

interface AddDialogProps{
    open: boolean;
    handleClose: () => void;
    operations: Operation[],
    onAfterAdd: () => void;
}

export const AddDialog = ({open, handleClose, operations, onAfterAdd}:AddDialogProps) => {
    const {
        operationType,
        onChangeOperation,
        hiddenInputTwo,
        hiddenInputOne,
        labelOne,
        labelTwo,
        onClose,
        loading,
        valueOne,
        valueTwo,
        onChangeInput,
        disableButton,
        onAddClick,
        errorMessage
    } = useAddDialog(handleClose, onAfterAdd)
    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>New Calculation</DialogTitle>
            <DialogContentText></DialogContentText>
            <DialogContent>
                <Box
                    component='form'
                    noValidate>
                    <FormControl fullWidth>
                        <InputLabel id="operation-type-label">Operation Type</InputLabel>
                        <Select
                            labelId="operation-type-label"
                            id="operation-type-label"
                            label="Operation Type"
                            value={operationType}
                            onChange={onChangeOperation}
                        >
                            <MenuItem value="0"></MenuItem>
                            {operations.map((item)=> (
                                <MenuItem value={item.operation_id+";"+item.type}>{item.type} {item.cost}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {!hiddenInputOne && (
                        <TextField
                            type="number"
                            margin="dense"
                            id="name"
                            label={labelOne}
                            fullWidth
                            variant="outlined"
                            value={valueOne}
                            onChange={(e)=>onChangeInput(e, "value_one")}
                        />
                    )}
                    {!hiddenInputTwo && (
                        <TextField
                            type="number"
                            margin="dense"
                            id="name"
                            label={labelTwo}
                            fullWidth
                            variant="outlined"
                            value={valueTwo}
                            onChange={(e)=>onChangeInput(e, "value_two")}
                        />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <LoadingButton
                    loading={loading}
                    onClick={onAddClick}
                    disabled={disableButton}
                >
                    Add
                </LoadingButton>
            </DialogActions>

            {errorMessage !== "" && (
                <Alert variant="filled" severity="error">
                    {errorMessage}
                </Alert>
            )}
        </Dialog>
    )
}
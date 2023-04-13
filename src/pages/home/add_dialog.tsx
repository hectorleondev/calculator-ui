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

interface AddDialogProps{
    open: boolean;
    handleClose: () => void;
    operations: Operation[]
}

export const AddDialog = ({open, handleClose, operations}:AddDialogProps) => {
    const {
        operationType,
        onChangeOperation,
        hiddenInputTwo,
        hiddenInputOne,
        labelOne,
        labelTwo,
        onClose,
        loading
    } = useAddDialog(handleClose)
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
                            <MenuItem value="">ALL</MenuItem>
                            {operations.map((item)=> (
                                <MenuItem value={item.operation_id+";"+item.type}>{item.type}</MenuItem>
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
                        />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <LoadingButton
                    loading={loading}
                    onClick={onClose}
                >
                    Add
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
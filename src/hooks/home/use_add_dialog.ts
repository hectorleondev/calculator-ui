import {useCallback, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";

export const useAddDialog = (handleClose: ()=>void) => {
    const [operationType, setOperationType] = useState('');
    const [hiddenInputOne, setHiddenInputOne] = useState(false);
    const [hiddenInputTwo, setHiddenInputTwo] = useState(false);
    const [labelOne, setLabelOne] = useState('');
    const [labelTwo, setLabelTwo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUpForm('');
    }, []);

    const onChangeOperation = useCallback((event: SelectChangeEvent) => {
        const items = event.target.value.split(";");
        setOperationType(event.target.value);
        setUpForm(items[1]);
    }, []);

    const onClose = useCallback(() => {
        setUpForm('');
        handleClose()
        setLoading(false);
    }, []);

    const setUpForm = (value: string) => {
        if(value === ""){
            setLabelOne("");
            setLabelTwo("");
            setHiddenInputOne(true);
            setHiddenInputTwo(true);
        }
        if(value === "addition"){
            setLabelOne("Addend");
            setLabelTwo("Addend");
            setHiddenInputOne(false);
            setHiddenInputTwo(false);
        }
        if(value === "subtraction"){
            setLabelOne("Minuend");
            setLabelTwo("Subtrahend");
            setHiddenInputOne(false);
            setHiddenInputTwo(false);
        }
        if(value === "multiplication"){
            setLabelOne("Multiplicand");
            setLabelTwo("Multiplier");
            setHiddenInputOne(false);
            setHiddenInputTwo(false);
        }
        if(value === "division"){
            setLabelOne("Dividend");
            setLabelTwo("Divisor");
            setHiddenInputOne(false);
            setHiddenInputTwo(false);
        }
        if(value === "square_root"){
            setLabelOne("Radicand");
            setLabelTwo("");
            setHiddenInputOne(false);
            setHiddenInputTwo(true);
        }
        if(value === "random_string"){
            setLabelOne("Length String");
            setLabelTwo("");
            setHiddenInputOne(false);
            setHiddenInputTwo(true);
        }
    }


    return  {
        operationType,
        onChangeOperation,
        hiddenInputTwo,
        hiddenInputOne,
        labelOne,
        labelTwo,
        onClose,
        loading
    }
}
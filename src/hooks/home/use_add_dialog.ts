import {useCallback, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import CalculationService from "../../api/calculation";


export const useAddDialog = (handleClose: ()=>void, onAfterAdd: ()=>void) => {
    const [operationType, setOperationType] = useState('0');
    const [hiddenInputOne, setHiddenInputOne] = useState(false);
    const [hiddenInputTwo, setHiddenInputTwo] = useState(false);
    const [labelOne, setLabelOne] = useState('');
    const [labelTwo, setLabelTwo] = useState('');
    const [loading, setLoading] = useState(false);
    const [valueOne, setValueOne] = useState('')
    const [valueTwo, setValueTwo] = useState('')
    const [disableButton, setDisableButton] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUpForm('');
    }, []);

    const onChangeOperation = useCallback((event: SelectChangeEvent) => {
        const items = event.target.value.split(";");
        setOperationType(event.target.value);
        setValueOne('');
        setValueTwo('');
        setDisableButton(true);
        setUpForm(items[1]);
    }, []);

    const onClose = useCallback(() => {
        setOperationType("0");
        setUpForm('');
        setValueOne('');
        setValueTwo('');
        handleClose()
        setLoading(false);
        setDisableButton(true);
        setErrorMessage('');
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


    const onChangeInput = useCallback((e: any, field: string) => {
        const newValue = e.currentTarget.value;
        let newValueOne = valueOne;
        let newValueTwo = valueTwo;
        if(field === "value_one"){
            setValueOne(newValue);
            newValueOne = newValue;
        }
        if(field === "value_two"){
            setValueTwo(newValue);
            newValueTwo = newValue;
        }
        const items = operationType.split(";");
        if(newValueOne !== "" && newValueTwo !== ""
            && (items[1] === "addition" || items[1] === "subtraction" || items[1] === "multiplication" || items[1] === "division")){
            setDisableButton(false);
        } else if(newValueOne !== "" && (items[1] === "random_string" || items[1] === "square_root")){
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [valueOne, valueTwo, operationType]);

    const onAddClick = useCallback(() => {
        const items = operationType.split(";");
        let request_form: any = {
            "operation_id": items[0]
        };
        if(items[1] === "addition"){
            request_form["addend_one"] = parseFloat(valueOne);
            request_form["addend_two"] = parseFloat(valueTwo);
        }
        if(items[1] === "subtraction"){
            request_form["minuend"] = parseFloat(valueOne);
            request_form["subtrahend"] = parseFloat(valueTwo);
        }
        if(items[1] === "multiplication"){
            request_form["multiplicand"] = parseFloat(valueOne);
            request_form["multiplier"] = parseFloat(valueTwo);
        }
        if(items[1] === "division"){
            request_form["dividend"] = parseFloat(valueOne);
            request_form["divisor"] = parseFloat(valueTwo);
        }
        if(items[1] === "square_root"){
            request_form["radicand"] = parseFloat(valueOne);
        }
        if(items[1] === "random_string"){
            request_form["length_string"] = parseFloat(valueOne);
        }
        setLoading(true);
        const token: string | null = localStorage.getItem("auth_token")
        CalculationService.save_calculation(token || '', request_form)
            .then((res) => {
                onClose();
                onAfterAdd();
            })
            .catch((e: any) => {
                setErrorMessage(e.response.data.message);
            })
            .finally(()=>setLoading(false))

    }, [valueOne, valueTwo,operationType]);

    return  {
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
    }
}
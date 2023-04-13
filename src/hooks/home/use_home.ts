import {useCallback, useEffect, useState} from "react";
import CalculationService from "../../api/calculation";
import OperationService from "../../api/operation";
import {CalculationList} from "../../api/calculation/types";
import {OperationList} from "../../api/operation/types";
import {object, string, number, TypeOf} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ConditionItems} from "./types";
import {SelectChangeEvent} from "@mui/material";

export const useHome = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [calculationList, setCalculationList] = useState<CalculationList>({
        total_records: 0,
        page: 0,
        page_length: 0,
        total_pages: 0,
        records: []
    })

    const [operationList, setOperationList] = useState<OperationList>({
        operations: []
    })

    const conditionAmountItem: ConditionItems[] = [
        {value: "eq", name: "Equal"},
        {value: "gt", name: "Greater"},
        {value: "ge", name: "Greater Equal"},
        {value: "lt", name: "Less"},
        {value: "le", name: "Less Equal"},
    ]

    const conditionStringItem: ConditionItems[] = [
        {value: "eq", name: "Equal"},
        {value: "startswith", name: "Starts With"}
    ]

    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState("")

    const [operationType, setOperationType] = useState("")
    const [conditionAmount, setConditionAmount] = useState("eq")
    const [conditionUseBalance, setConditionUseBalance] = useState("eq")
    const [conditionOperationResponse, setConditionOperationResponse] = useState("eq")

    const filterSchema = object({
        amount: number().optional(),
        user_balance: number().optional(),
        operation_response: string(),
    });

    type FilterInput = TypeOf<typeof filterSchema>;

    const [openAddDialog, setOpenAddDialog ] = useState(false);

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<FilterInput>({
        resolver: zodResolver(filterSchema),
    });

    useEffect(() => {
        setLoading(true);
        setErrorMessage('');
        const load_data = async (current_page: number) => {
            const token: string | null = localStorage.getItem("auth_token")
            try {
                const operations = await OperationService.get_operation_list(token || '')
                setOperationList(operations.data);
                const response = await CalculationService.get_calculation_list(token || '', current_page)
                setCalculationList(response.data);
            } catch (error: any) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
        load_data(page);
    }, [page]);

    const onChange = useCallback((page_selected: number) => {
        setPage(page_selected);
        setLoading(true);
        setErrorMessage('');
        const token: string | null = localStorage.getItem("auth_token")
        CalculationService.get_calculation_list(token || '', page_selected, filters)
            .then((response)=>{
                setCalculationList(response.data);
            })
            .catch((e: any) => {
                setErrorMessage(e.response.data.message);
            })
            .finally(()=> {
                setLoading(false);
            });
    }, [filters]);


    const logout =() => {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
    }

    const onSubmitHandler: SubmitHandler<FilterInput> = (values) => {
        let filters = "";
        if(operationType !== ""){
            filters = filters + "operation_id,eq,"+operationType
        }
        if(values.amount !== undefined){
            if(filters !== ""){
                filters = filters + "**"
            }
            filters = filters + "amount,"+conditionAmount+","+values.amount
        }
        if(values.user_balance !== undefined){
            if(filters !== ""){
                filters = filters + "**"
            }
            filters = filters + "user_balance,"+conditionUseBalance+","+values.user_balance
        }
        if(values.operation_response !== ""){
            if(filters !== ""){
                filters = filters + "**"
            }
            filters = filters + "operation_response,"+conditionOperationResponse+","+values.operation_response
        }
        console.log(filters);
        setFilters(filters);
        setLoading(true);
        setErrorMessage('');
        const token: string | null = localStorage.getItem("auth_token")
        CalculationService.get_calculation_list(token || '', page, filters)
            .then((response)=>{
                setCalculationList(response.data);
            })
            .catch((e: any) => {
                setErrorMessage(e.response.data.message);
            })
            .finally(()=> {
                setLoading(false);
            });
    };

    const onChangeOperation = useCallback((event: SelectChangeEvent) => {
        setOperationType(event.target.value);
    }, []);

    const onChangeAmount = useCallback((event: SelectChangeEvent) => {
        setConditionAmount(event.target.value);
    }, []);

    const onChangeUseBalance = useCallback((event: SelectChangeEvent) => {
        setConditionUseBalance(event.target.value);
    }, []);

    const onChangeOperationResponse = useCallback((event: SelectChangeEvent) => {
        setConditionOperationResponse(event.target.value);
    }, []);

    const handleClickOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    return {
        loading,
        errorMessage,
        token: localStorage.getItem("auth_token"),
        calculationList,
        logout,
        onChange,
        operationList,
        onSubmitHandler,
        register,
        errors,
        handleSubmit,
        conditions_number: conditionAmountItem,
        condition_string: conditionStringItem,
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
        handleCloseAddDialog
    }
}
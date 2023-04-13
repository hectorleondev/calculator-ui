import {useCallback, useEffect, useState} from "react";
import CalculationService from "../../api/calculation";
import OperationService from "../../api/operation";
import {CalculationList} from "../../api/calculation/types";
import {OperationList} from "../../api/operation/types";
import {object, string, number, TypeOf} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

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

    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState("")

    const filterSchema = object({
        operation_type: string().default(""),
        condition_amount: string().default("eq"),
        condition_user_balance: string().default("eq"),
        condition_operation_response: string().default("eq"),
        amount: number().optional(),
        user_balance: number().optional(),
        operation_response: string(),
    });

    type FilterInput = TypeOf<typeof filterSchema>;

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
        if(values.operation_type !== ""){
            filters = filters + "operation_id,eq,"+values.operation_type
        }
        if(values.amount !== undefined){
            if(filters !== ""){
                filters = filters + "**"
            }
            filters = filters + "amount,"+values.condition_amount+","+values.amount
        }
        if(values.user_balance !== undefined){
            if(filters !== ""){
                filters = filters + "**"
            }
            filters = filters + "user_balance,"+values.condition_user_balance+","+values.user_balance
        }
        if(values.operation_response !== ""){
            if(filters !== ""){
                filters = filters + "**"
            }
            filters = filters + "operation_response,"+values.condition_operation_response+","+values.operation_response
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
    }
}
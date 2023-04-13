import {useCallback, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CalculationService from "../../api/calculation";
import OperationService from "../../api/operation";
import {CalculationList} from "../../api/calculation/types";
import {OperationList} from "../../api/operation/types";
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
    const [operationType, setOperationType] = useState('');

    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState("")

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

    const onFilterClick = useCallback(() => {
        let filters = "";
        if(operationType !== ""){
            filters = filters + "operation_id,eq,"+operationType
        }
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
    }, [page, operationType]);

    const onChangeOperation = useCallback((event: SelectChangeEvent) => {
        setOperationType(event.target.value);
    }, []);

    const logout =() => {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
    }

    return {
        loading,
        errorMessage,
        token: localStorage.getItem("auth_token"),
        calculationList,
        logout,
        onChange,
        operationList,
        onChangeOperation,
        operationType,
        onFilterClick
    }
}
import {useCallback, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CalculationService from "../../api/calculation";
import {CalculationList} from "../../api/calculation/types";

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

    useEffect(() => {
        setLoading(true);
        setErrorMessage('');
        const token: string | null = localStorage.getItem("auth_token")
        CalculationService.get_calculation_list(token || '', 1)
            .then((response)=>{
                setCalculationList(response.data);
            })
            .catch((e: any) => {
                setErrorMessage(e.response.data.message);
            })
            .finally(()=> {
                setLoading(false);
            });
    }, []);

    const onChange = useCallback((page_selected: number) => {
        setLoading(true);
        setErrorMessage('');
        const token: string | null = localStorage.getItem("auth_token")
        CalculationService.get_calculation_list(token || '', page_selected)
            .then((response)=>{
                setCalculationList(response.data);
            })
            .catch((e: any) => {
                setErrorMessage(e.response.data.message);
            })
            .finally(()=> {
                setLoading(false);
            });
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
        onChange
    }
}
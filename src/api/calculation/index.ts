import http from "../common";
import {CalculationList} from "./types";

class CalculationService {
    get_calculation_list(token: string, page: number, filters: string = "") {
        return http.get<CalculationList>("calculation?page="+page+"&filters="+filters, {headers: { Authorization: 'Bearer ' + token }})
    }
}
export default new CalculationService();
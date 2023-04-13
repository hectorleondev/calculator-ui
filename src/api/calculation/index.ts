import http from "../common";
import {CalculationList, SaveRecord} from "./types";

class CalculationService {
    get_calculation_list(token: string, page: number, filters: string = "") {
        return http.get<CalculationList>("calculation?page="+page+"&filters="+filters, {headers: { Authorization: 'Bearer ' + token }})
    }

    save_calculation(token: string, body: any) {
        return http.post<SaveRecord>("calculation?page=", body,{headers: { Authorization: 'Bearer ' + token }})
    }
}
export default new CalculationService();
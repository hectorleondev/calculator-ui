import http from "../common";
import {OperationList} from "./types";

class OperationService {
    get_operation_list(token: string) {
        return http.get<OperationList>("operation/list", {headers: { Authorization: 'Bearer ' + token }})
    }
}
export default new OperationService();
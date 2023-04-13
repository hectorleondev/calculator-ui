import http from "../common";
import {AuthUser, User} from "./types";

class AuthService {
    login(username: string, password: string) {
        return http.post<AuthUser>("login", {
                username,
                password
            })
    }

    logout() {
        localStorage.removeItem("auth_token");
    }

    getUser(token: string) {
        return http.get<User>('user', {headers: { Authorization: 'Bearer ' + token }})
    }
}
export default new AuthService();
export const useHome = () => {
    return {
        token: localStorage.getItem("auth_token")
    }
}
import axios from "axios";

export default axios.create({
    baseURL: "https://o01xgqczze.execute-api.us-east-1.amazonaws.com/dev/",
    headers: {
        "Content-type": "application/json"
    }
});
import axios from "axios";

export const api = axios.create({
    baseURL: "https://67ac71475853dfff53dab929.mockapi.io/api/v1",
    timeout: 5000
});

export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "https://dreamix-back.liara.run",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
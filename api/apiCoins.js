export const apiGetAllCoins = () => {
    return fetch(process.env.API_URL)
        .then((response) => response.json())
        .catch(err => Promise.reject(err))
};
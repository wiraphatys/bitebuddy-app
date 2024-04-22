const config = {
    api: "https://bitebuddy-api.vercel.app/api/v1",
    tokenName: 'token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "https://bitebuddy-api.vercel.app/"
            }
        }
    }
}

export default config
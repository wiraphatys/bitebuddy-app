const config = {
    api: "http://localhost:4000/api/v1",
    tokenName: 'token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:4000/"
            }
        }
    }
}

export default config

// https://bitebuddy-api.vercel.app/api/v1
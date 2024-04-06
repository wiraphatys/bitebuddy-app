const config = {
    api: "https://se-api-test.vercel.app/api/v1",
    tokenName: 'token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "https://se-api-test.vercel.app/"
            }
        }
    }
}

export default config
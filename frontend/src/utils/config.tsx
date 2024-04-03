const config = {
    api: "http://localhost:4000/api/v1",
    tokenName: 'token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    }
}

export default config
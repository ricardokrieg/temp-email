class Api {
  static async fetchNewEmailAddress(): Promise<string> {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    const response = await fetch('https://xi55apsux5.execute-api.us-east-1.amazonaws.com/getNewEmailAddress', requestOptions)
    const data = await response.json()

    return data.emailAddress
  }
}

export default Api;

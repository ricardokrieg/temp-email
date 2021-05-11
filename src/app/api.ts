import {IMessage} from "./Inbox/Inbox"

export interface IMessagesRequest {
  email: string,
  timestamp: number,
}

export interface IMessagesResponse {
  timestamp: number,
  messages: [IMessage?]
}

class Api {
  static async fetchNewEmailAddress(): Promise<string> {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    const url = 'https://xi55apsux5.execute-api.us-east-1.amazonaws.com/getNewEmailAddress'
    const response = await fetch(url, requestOptions)
    const data = await response.json()

    return data.emailAddress
  }

  static async fetchMessages(params: IMessagesRequest): Promise<IMessagesResponse> {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    const url = 'https://xi55apsux5.execute-api.us-east-1.amazonaws.com/getMessages'
    // @ts-ignore
    const response = await fetch(url + '?' + new URLSearchParams(params), requestOptions)
    const data = await response.json()

    return {
      timestamp: data.timestamp,
      messages: data.messages,
    }
  }
}

export default Api;

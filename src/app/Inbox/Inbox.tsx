import {useAppDispatch, useAppSelector} from "../hooks"
import EmailAddress from "./EmailAddress"
import ResetEmailAddress from "./ResetEmailAddress"
import Messages from "./Messages"
import Loading from "./Loading"
import {useEffect} from "react";

export interface IMessage {
  id: string
  sender: string
  receiver: string
  timestamp: number
  subject: string
  body: string
}

export interface IInbox {
  emailAddress: string
  timestamp: number
  messages: [IMessage?]
}

function Inbox() {
  const inbox = useAppSelector((state) => state.inbox)
  const {emailAddress, timestamp, messages} = inbox
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchMessages = (email: string, timestamp: number) => {
      dispatch({ type: 'FETCH_MESSAGES', payload: { email, timestamp } })
    }

    const intervalRef = setInterval(() => {
      if (emailAddress) {
        fetchMessages(emailAddress, timestamp)
      }
    }, 10000)

    return () => {
      console.log('Cleanup')
      clearInterval(intervalRef)
    }
  }, [emailAddress, timestamp, dispatch])

  if (!inbox.emailAddress) {
    return <Loading />
  }

  return (
    <div>
      <EmailAddress emailAddress={emailAddress} />
      <ResetEmailAddress />
      <Messages messages={messages} />
    </div>
  )
}

export default Inbox

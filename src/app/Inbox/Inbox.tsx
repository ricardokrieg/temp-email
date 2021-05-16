import {useAppDispatch, useAppSelector} from "../hooks"
import EmailAddress from "./EmailAddress"
import ResetEmailAddress from "./ResetEmailAddress"
import Messages from "./Messages"
import Loading from "./Loading"
import React, {useEffect, useRef, useState} from "react"
import {Route, Switch} from "react-router-dom"
import MessageDetails from "./MessageDetails"

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
  message: IMessage | null
}

function Inbox() {
  const inbox = useAppSelector((state) => state.inbox)
  const {emailAddress, timestamp, messages} = inbox
  const dispatch = useAppDispatch()
  const [isWorking, setIsWorking] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const fetchMessages = (email: string, timestamp: number) => {
      dispatch({ type: 'FETCH_MESSAGES', payload: { email, timestamp } })
    }

    setIsWorking(true)
    let requestCount = 1

    intervalRef.current = setInterval(() => {
      if (emailAddress) {
        console.log(`Request ${requestCount}`)

        if (requestCount >= 20) {
          console.log(`${requestCount} requests without new messages. Stopping`)
          setIsWorking(false)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return
        }
        requestCount++

        fetchMessages(emailAddress, timestamp)
      }
    }, 10000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [emailAddress, timestamp, dispatch])

  if (!inbox.emailAddress) {
    return <Loading />
  }

  return (
    <div>
      <EmailAddress emailAddress={emailAddress} />
      <ResetEmailAddress />

      <Switch>
        <Route path={`/:messageId`}>
          <MessageDetails />
        </Route>

        <Route path={`/`}>
          <Messages isWorking={isWorking} emailAddress={emailAddress} messages={messages} />
        </Route>
      </Switch>
    </div>
  )
}

export default Inbox

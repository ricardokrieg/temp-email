import {useAppDispatch, useAppSelector} from "../hooks"
import EmailAddress from "./EmailAddress"
import ResetEmailAddress from "./ResetEmailAddress"
import Messages from "./Messages"
import Loading from "./Loading"
import React, {useEffect, useRef, useState} from "react"
import {Route, Switch} from "react-router-dom"
import MessageDetails from "./MessageDetails"

const MAX_REQUESTS = 20
const INTERVAL = 10000

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
  loaded: boolean
  messages: [IMessage?]
  message: IMessage | null
}

function Inbox() {
  const inbox = useAppSelector((state) => state.inbox)
  const {emailAddress, timestamp, messages, loaded} = inbox
  const dispatch = useAppDispatch()
  const [isWorking, setIsWorking] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!emailAddress) {
      return
    }

    const fetchMessages = (email: string, timestamp: number) => {
      dispatch({ type: 'FETCH_MESSAGES', payload: { email, timestamp } })
    }

    setIsWorking(true)
    let requestCount = 1

    intervalRef.current = setInterval(() => {
      console.log(`Request ${requestCount}`)

      if (requestCount >= MAX_REQUESTS) {
        console.log(`${requestCount} requests without new messages. Stopping`)
        setIsWorking(false)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        return
      }
      requestCount++

      fetchMessages(emailAddress, timestamp)
    }, INTERVAL)

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
          <Messages isLoading={!loaded} isWorking={isWorking} emailAddress={emailAddress} messages={messages} />
        </Route>
      </Switch>
    </div>
  )
}

export default Inbox

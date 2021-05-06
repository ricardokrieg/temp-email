import {useAppSelector} from "../hooks"
import EmailAddress from "./EmailAddress"
import ResetEmailAddress from "./ResetEmailAddress"
import Loading from "./Loading"

export interface IMessage {
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

  if (!inbox.emailAddress) {
    return <Loading />
  }

  return (
    <div>
      <EmailAddress emailAddress={inbox.emailAddress} />
      <ResetEmailAddress />
    </div>
  )
}

export default Inbox

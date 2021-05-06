import {useAppDispatch, useAppSelector} from "../hooks"
import EmailAddress from "./EmailAddress"
import Loading from "./Loading"

export interface IEmail {
  sender: string
  receiver: string
  timestamp: number
  subject: string
  body: string
}

export interface IInbox {
  emailAddress: string
  timestamp: number
  emails: [IEmail?]
}

function Inbox() {
  const inbox = useAppSelector((state) => state.inbox)
  const dispatch = useAppDispatch()

  if (!inbox.emailAddress) {
    return <Loading />
  }

  return (
    <div>
      <EmailAddress emailAddress={inbox.emailAddress} />
    </div>
  )
}

export default Inbox

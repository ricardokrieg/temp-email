import {IMessage} from "./Inbox"
import {useAppSelector} from "../hooks"
import {useHistory} from "react-router-dom"

function MessageDetails() {
  const message: IMessage | null = useAppSelector((state) => state.inbox.message)
  const history = useHistory()

  if (!message) {
    history.push('/')
    return <div></div>
  }

  return (
    <div>
      {message.body}
    </div>
  )
}

export default MessageDetails

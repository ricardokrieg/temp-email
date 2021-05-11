import {map} from "lodash"
import {useHistory} from "react-router-dom"
import {IMessage} from "./Inbox"
import Message from "./Message"
import {useAppDispatch} from "../hooks"
import {setMessage} from "../reducer"

interface MessagesProp {
  messages: [IMessage?]
}

function Messages(prop: MessagesProp) {
  const {messages} = prop
  const history = useHistory()
  const dispatch = useAppDispatch()

  const onClick = (message: IMessage): void => {
    console.log(`Open ${message.subject}`)

    dispatch(setMessage(message))
    history.push(`/${message.id}`)
  }

  return (
    <div>
      {map(messages, (message: IMessage) =>
        <Message message={message} key={message.id} onClick={onClick} />
      )}
    </div>
  )
}

export default Messages

import {IMessage} from "./Inbox"

interface MessageProp {
  message: IMessage,
}

function Message(prop: MessageProp) {
  const {message} = prop

  return (
    <div>
      {message.subject}
    </div>
  )
}

export default Message

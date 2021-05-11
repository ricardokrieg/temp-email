import {IMessage} from "./Inbox"

interface MessageProp {
  message: IMessage,
  onClick: (message: IMessage) => void,
}

function Message(prop: MessageProp) {
  const {message, onClick} = prop

  return (
    <div onClick={() => { onClick(message) }}>
      {message.subject}
    </div>
  )
}

export default Message

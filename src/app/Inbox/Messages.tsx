import {map} from "lodash"
import {IMessage} from "./Inbox"
import Message from "./Message"

interface MessagesProp {
  messages: [IMessage?]
}

function Messages(prop: MessagesProp) {
  const {messages} = prop;

  return (
    <div>
      {map(messages, (message: IMessage) =>
        <Message message={message} key={message.id} />
      )}
    </div>
  )
}

export default Messages

import {map} from "lodash"
import {useHistory} from "react-router-dom"
import {IMessage} from "./Inbox"
import Message from "./Message"
import {useAppDispatch} from "../hooks"
import {setMessage} from "../reducer"

interface MessagesProp {
  isWorking: boolean,
  emailAddress: string,
  messages: [IMessage?]
}

function Messages(prop: MessagesProp) {
  const {isWorking, emailAddress, messages} = prop
  const history = useHistory()
  const dispatch = useAppDispatch()

  const onClick = (message: IMessage): void => {
    console.log(`Open ${message.subject}`)

    dispatch(setMessage(message))
    history.push(`/${message.id}`)
  }

  const onDelete = (message: IMessage): void => {
    console.log(`Delete ${message.subject}`)

    dispatch({ type: 'DELETE_MESSAGE', payload: { emailAddress, message } })
  }

  return (
    <div>
      {!isWorking && <div>Parado</div> }

      {map(messages, (message: IMessage) =>
        <Message message={message} key={message.id} onClick={onClick} onDelete={onDelete} />
      )}
    </div>
  )
}

export default Messages

import {map, isEmpty} from "lodash"
import {useHistory} from "react-router-dom"
import {IMessage} from "./Inbox"
import Message from "./Message"
import {useAppDispatch} from "../hooks"
import {setMessage} from "../reducer"

interface MessagesProp {
  isLoading: boolean,
  isWorking: boolean,
  emailAddress: string,
  messages: [IMessage?]
}

function Messages(prop: MessagesProp) {
  const {isLoading, isWorking, emailAddress, messages} = prop
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

  const renderMessages = () => {
    if (isEmpty(messages)) {
      return (<div>Nenhuma mensagem</div>)
    }

    return (map(messages, (message: IMessage) =>
      <Message message={message} key={message.id} onClick={onClick} onDelete={onDelete} />
    ))
  }

  if (isLoading) {
    return (<div>Carregando</div>)
  }

  return (
    <div>
      {!isWorking && <div>Parado</div>}

      {renderMessages()}
    </div>
  )
}

export default Messages

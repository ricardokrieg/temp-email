import {IMessage} from "./Inbox"

interface MessageProp {
  message: IMessage,
  onClick: (message: IMessage) => void,
  onDelete: (message: IMessage) => void,
}

function Message(prop: MessageProp) {
  const {message, onClick, onDelete} = prop

  const _onDelete = (e: any, message: IMessage) => {
    e.stopPropagation()
    const result = window.confirm('Tem certeza que quer excluir esse email?')
    if (result) {
      onDelete(message)
    }
  }

  return (
    <div onClick={() => onClick(message)}>
      {message.subject}

      <button onClick={(e) => _onDelete(e, message)}>Apagar</button>
    </div>
  )
}

export default Message

import {useAppDispatch} from "../hooks"

function ResetEmailAddress() {
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch({ type: 'FETCH_NEW_EMAIL_ADDRESS' })
  }

  return (
    <div>
      <button onClick={onClick}>
        Mudar
      </button>
    </div>
  )
}

export default ResetEmailAddress;

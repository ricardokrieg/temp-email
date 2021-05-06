import {useAppDispatch} from "../hooks"

function ResetEmailAddress() {
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch({ type: 'FETCH_NEW_EMAIL_ADDRESS' })
  }

  return (
    <div>
      <a href='javascript:void(0)' onClick={onClick}>
        Mudar
      </a>
    </div>
  )
}

export default ResetEmailAddress;

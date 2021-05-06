import React, {useEffect} from 'react'
import './App.css'
import Inbox from "./app/Inbox/Inbox"
import {useAppDispatch, useAppSelector} from "./app/hooks";

function App() {
  const inbox = useAppSelector((state) => state.inbox)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!inbox.emailAddress) {
      dispatch({ type: 'FETCH_NEW_EMAIL_ADDRESS' })
    }
  })

  return (
    <div>
      <Inbox />
    </div>
  )
}

export default App

import React, {useEffect} from 'react'
import './App.css'
import Inbox from "./app/Inbox/Inbox"
import {useAppDispatch, useAppSelector} from "./app/hooks"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

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
      <Router>
        <Switch>
          <Route path="/">
            <Inbox />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

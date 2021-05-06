import {IInbox} from "./Inbox/Inbox"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: IInbox = {
  emailAddress: '',
  timestamp: 0,
  messages: [],
}

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setEmailAddress: (state, action: PayloadAction<string>) => {
      state.emailAddress = action.payload
    }
  }
})

export const {setEmailAddress} = inboxSlice.actions
export default inboxSlice.reducer

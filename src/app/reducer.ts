import {IInbox, IMessage} from "./Inbox/Inbox"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {isEmpty} from 'lodash'

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
    },
    setTimestamp: (state, action: PayloadAction<number>) => {
      state.timestamp = action.payload
    },
    addMessages: (state, action: PayloadAction<[IMessage?]>) => {
      if (!isEmpty(action.payload)) {
        state.messages = [ ...state.messages, ...action.payload ]
      }
    },
  }
})

export const {setEmailAddress, setTimestamp, addMessages} = inboxSlice.actions
export default inboxSlice.reducer

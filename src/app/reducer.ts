import {IInbox, IMessage} from "./Inbox/Inbox"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {isEmpty} from 'lodash'

const initialState: IInbox = {
  emailAddress: '',
  timestamp: 0,
  messages: [],
  message: null,
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
    setMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = action.payload
    },
    removeMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = null
      // @ts-ignore
      state.messages = state.messages.filter(message => message?.id !== action.payload.id)
    },
  },
})

export const {setEmailAddress, setTimestamp, addMessages, setMessage, removeMessage} = inboxSlice.actions
export default inboxSlice.reducer

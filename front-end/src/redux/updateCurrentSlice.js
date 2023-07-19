import { createSlice } from '@reduxjs/toolkit'

const today = new Date().toISOString()
export const updatedCurrentSlice = createSlice(
    {
        name: 'current',
        initialState: { datetime: today },
        reducers: {
            setDateTime: (state) => {
                state.datetime = new Date().toISOString()
            },


        }
    }
)

export const { setDateTime } = updatedCurrentSlice.actions

export default updatedCurrentSlice.reducer
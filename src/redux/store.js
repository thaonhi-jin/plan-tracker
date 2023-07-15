import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './projectSlice'
import updateCurrentReducer from './updateCurrentSlice'

const store = configureStore({
    reducer: {
        projects: projectReducer,
        currentState: updateCurrentReducer
    }
})

export default store
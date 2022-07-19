
import { AppDispatch } from '..'
import axios from '../../axios'
import { authSlice } from '../slices/authSlice'

interface IAuthResponse {
  access: string
  refresh: string
}

interface IAuthData {
  username: string
  password: string
}

export const register = (data: IAuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<IAuthResponse>(`auth/register`, data)
      dispatch(authSlice.actions.login({
        username: data.username,
        access: response.data.access
      }))
    } catch (e) {
      throw e as Error
    }
  }
}

export const login = (data: IAuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<IAuthResponse>(`auth/login`, data)
      dispatch(authSlice.actions.login({
        username: data.username,
        access: response.data.access
      }))
    } catch (e) {
      throw e as Error
    }
  }
}
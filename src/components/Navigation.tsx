import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { authSlice } from '../store/slices/authSlice'

export default function Navigation() {

  const {isAuth, username} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    dispatch(authSlice.actions.logout())
  }

  return (
    <nav className="flex justify-around px-5 h-[50px] items-center bg-gray-200 shadow-md">
      <Link to="/">Airport</Link>

      { !isAuth && <Link to="/auth">Auth</Link> }

      { isAuth && <>
        <span className='font-bold'>{username}</span>
        <a href='#' onClick={logoutHandler}>Logout</a>
      </> }
    </nav>
  )
}

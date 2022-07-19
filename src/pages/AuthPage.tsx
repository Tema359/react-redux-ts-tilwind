import { useNavigate } from "react-router-dom"
import { useInput } from "../hooks/input"
import { useAppDispatch } from "../hooks/redux"
import { register, login } from "../store/actions/authActions"

export default function AuthPage() {
  const username = useInput("")
  const password = useInput("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isFormValid = () => username.value && password.value

  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault()

      if (isFormValid()) {
        await dispatch(
          register({
            username: username.value,
            password: password.value,
          })
        )
        navigate("/")
      } else {
        alert("INVALID FORM")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const loginHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault()

      if (isFormValid()) {
        await dispatch(
          login({
            username: username.value,
            password: password.value,
          })
        )
        navigate("/")
      } else {
        alert("INVALID FORM")
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form
      className="container mx-auto max-w-[760px] pt-8"
      onSubmit={submitHandler}
    >
      <div className="mb-2">
        <label htmlFor="username" className="block mb-2">
          Username
        </label>
        <input
          className="border pt-1 px-2 w-[300px]"
          type="text"
          {...username}
          id="username"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          className="border pt-1 px-2 w-[300px]"
          type="password"
          {...password}
          id="password"
        />
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-blue-400 border text-white mr-6"
      >
        Register
      </button>
      <button
        type="button"
        className="py-2 px-4 bg-gray-700 border text-white"
        onClick={loginHandler}
      >
        Login
      </button>
    </form>
  )
}

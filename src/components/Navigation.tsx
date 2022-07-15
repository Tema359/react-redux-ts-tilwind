import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="flex justify-around px-5 h-[50px] items-center bg-gray-200 shadow-md">
      <Link to="/">Airport</Link>
      <Link to="/auth">Auth</Link>
    </nav>
  )
}

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../axios"
import { useDebounce } from "../hooks/debounce"
import { useInput } from "../hooks/input"
import { IAirport, ServerResponse } from "../models/models"

export default function AirportSearch() {
  const input = useInput()
  const debouncedSearchTerm = useDebounce(input.value, 400)
  const [airports, setAirports] = useState<IAirport[]>([])
  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function searchAirports() {
      const response = await axios.get<ServerResponse<IAirport>>("airports", {
        params: {
          search: debouncedSearchTerm,
          count: 10,
        },
      })
      setAirports(response.data.results)
    }

    if (debouncedSearchTerm.length > 3) {
      searchAirports().then(() => {
        setDropDown(true)
      })
    } else {
      setDropDown(false)
    }
  }, [debouncedSearchTerm])

  return (
    <div className="mb-4 relative">
      <input
        className="border py-2 px-4 outline-0 w-full h-[42px]"
        type="text"
        placeholder="Type here something..."
        {...input}
      />

      { dropDown && airports.length > 0 &&
        <ul className="list-none absolute left-0 right-0 top-[42px] h-[200px] shadow-md bg-white overflow-y-scroll">
          {airports.map((airport) => (
            <li
              className="py-2 px-4 mb-2 border hover:bg-gray-500 cursor-pointer hover:transition-colors hover:text-white"
              key={airport.id}
              onClick={() => navigate(`/airport/${airport.id}`)}
            >
              {airport.name}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

import { useEffect, useRef, useState } from "react"
import AirportCard from "../components/AirportCard"
import AirportFilter from "../components/AirportFilter"
import AirportSearch from "../components/AirportSearch"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { fetchAirports } from "../store/actions/airportActions"

import ReactPaginate from "react-paginate"

const ITEMS_PER_PAGE = 50

export default function MainPage() {
  const dispatch = useAppDispatch()
  const page = useRef(1)
  const { error, loading, airports, count } = useAppSelector((state) => state.airport)

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE)

  const pageChangeHandler = ({selected}: {selected: number}) => {
    page.current = selected + 1
    dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
  }

  useEffect(() => {
    dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
  }, [dispatch, page])

  return (
    <div className="container mx-auto max-w-[760px] pt-5">
      <AirportSearch />

      <AirportFilter />

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-600">{error}</p>}
      {airports.map((airport) => (
        <AirportCard key={airport.id} airport={airport} />
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        forcePage={page.current - 1}
        onPageChange={pageChangeHandler}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        containerClassName='flex items-center'
        pageClassName='py-1 px-2 border mr-2'
        previousClassName='py-1 px-2 border mr-2'
        nextClassName='py-1 px-2 border'
        activeClassName='bg-blue-400 text-white'
      />

    </div>
  )
}

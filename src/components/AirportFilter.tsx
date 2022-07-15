import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IFilter } from '../models/models'
import { airportSlice } from '../store/slices/airportSlice'

export default function AirportFilter() {
  const dispatch = useAppDispatch()
  const { regions, countries, loading, types } = useAppSelector(state => state.handbook)
  const [hasFilter, setHasFilter] = useState(false)
  const [filter, setFilter] = useState<IFilter>({
    type: '',
    region: '',
    country: ''
  })

  const isFilterEnabled = () => {
    return filter.type || filter.region || filter.country
  }

  useEffect(() => {
    if (isFilterEnabled()) {
      setHasFilter(true)
    } else {
      setHasFilter(false)
    }

    dispatch(airportSlice.actions.filterAirports(filter))
  }, [filter])

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const clearFilter = () => {
    setFilter({
      type: '',
      region: '',
      country: ''
    })
  }
  if (loading) return <p className='text-center'>Loading...</p>

  return (
    <div className='border py-2 px-4 mb-2'>
      <span className='font-bold mr-4'>Filter</span>

      <select
        name='type'
        className='border py-1 px-2 mr-4'
        onChange={changeHandler}
        value={filter.type}
      >
        <option value="" disabled>Type</option>
        { types.map(t => <option key={t}>{ t }</option>)}
      </select>

      <select
        name='country'
        className='border py-1 px-2 mr-4'
        onChange={changeHandler}
        value={filter.country}
      >
        <option value="" disabled>Country</option>
        { countries.map(c => <option key={c}>{ c }</option>)}
      </select>

      <select
        name='region'
        className='border py-1 px-2 mr-4'
        onChange={changeHandler}
        value={filter.region}
      >
        <option value="" disabled>Region</option>
        { regions.map(r => <option key={r}>{ r }</option>)}
      </select>

      {
        hasFilter && <button
        className='py-1 px-4 bg-red-500 text-white rounded'
        onClick={clearFilter}
      >
        &times;
      </button>}
    </div>
  )
}

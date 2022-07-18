import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAirport, IFilter } from '../../models/models'

interface IAirportState {
  loading: boolean
  error: string
  count: number
  airports: IAirport[]
  airportsContainer: IAirport[]
}

const initialState: IAirportState = {
  loading: false,
  error: '',
  count: 0,
  airports: [],
  airportsContainer: []
}

interface IAirportPayload {
  airports: IAirport[]
  count: number
}

export const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    fetchSuccess(state, action: PayloadAction<IAirportPayload>) {
      state.loading = false
      state.airports = action.payload.airports
      state.airportsContainer = action.payload.airports
      state.count = action.payload.count
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
    filterAirports(state, action: PayloadAction<IFilter>) {
      state.airports = state.airportsContainer
        .filter(a => a.type.includes(action.payload.type))
        .filter(a => a.country.includes(action.payload.country))
        .filter(a => a.region.includes(action.payload.region))
    }
  }
})

export default airportSlice.reducer
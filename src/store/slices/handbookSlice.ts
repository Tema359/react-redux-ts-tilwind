import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAirportCountry, IAirportRegion, IAirportType, } from '../../models/models'

interface IHandbookState {
  loading: boolean
  types: IAirportType[]
  regions: IAirportRegion[]
  countries: IAirportCountry[]
}

interface IHandbookPayload {
  types: IAirportType[]
  countries: IAirportCountry[]
  regions: IAirportRegion[]
}

const initialState: IHandbookState = {
  loading: false,
  types: [],
  regions: [],
  countries: []
}

export const handbookSlice = createSlice({
  name: 'handbook',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    fetchSuccess(state, action: PayloadAction<IHandbookPayload>) {
      state.loading = false
      state.types = action.payload.types
      state.countries = action.payload.countries
      state.regions = action.payload.regions
    }
  }
})

export default handbookSlice.reducer
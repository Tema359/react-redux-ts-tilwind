import { useParams } from 'react-router-dom'

export default function AirportDetailPage() {

  const params = useParams<'id'>()

  return (
    <div>AirportDetailPage {params.id}</div>
  )
}

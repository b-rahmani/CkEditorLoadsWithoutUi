import { useLocation } from 'react-router-dom'

const useQuery = (key) => {

    const { search } = useLocation()

    const query = new URLSearchParams(search)

    return query.get(key)
}

export default useQuery

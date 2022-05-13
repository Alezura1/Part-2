import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ListCountry from './components/ListCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterParam, setFilterParam] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterParam(event.target.value)
  }

  const filteredCountry = filterParam === ''
    ? countries
    : countries.filter((country) =>
      country.name.common.toLowerCase().includes(filterParam.toLowerCase())
    )

  return (  
    <div>
      <Filter newFilter={filterParam} handleFilterChange={handleFilterChange} />
      <ListCountry countries={filteredCountry} setFilterParam={setFilterParam} />
    </div>
  )
}

export default App
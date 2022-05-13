import Country from './Country'

const ListCountry = ({ countries, setFilterParam }) => 
    countries.length === 1 
    ?  
        <div> 
            <Country country={countries} /> 
        </div>
    : countries.length > 10 
    ? 
        <div>
            Too many matches, specify another filter
        </div>
    :
      <div>
        {countries.map(country =>
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => setFilterParam(country.name.common)}>show</button>
          </div>)}
      </div>


export default ListCountry




  
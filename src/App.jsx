import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import React from 'react'
import './App.css'
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function App () {
  const [countries, setCountries] = useState([])
  const [addCountryName, setAddCountryName] = useState('')
  const [updatedDB, setUpdatedDB] = useState(false)
  const [removeCountryName, setRemoveCountryName] = useState('')
  const [updatecountryID, setUpdateCountryID] = useState('')
  const [updateCountryName, setUpdateCountryName] = useState('')

  useEffect(() => {
    const getCounties = async () => {
      console.log('Inside getCountries')
      const { data, error } = await supabase.from('countries').select()
      if (error) {
        console.error('Error fetching countries:', error)
      } else {
        console.log('data', data)
        setCountries(data)
      }
    }
    return () => getCounties()
  }, [updatedDB])

  const handleAddCountry = async () => {
    console.log('Country Name: ', addCountryName)
    const { data, error } = await supabase
      .from('countries')
      .insert([{ name: addCountryName }])
    if (error) {
      console.log('Error is: ', error)
      return
    }
    console.log('success: ', data)
  }

  const handleRemove = async () => {
    const { data, error } = await supabase
      .from('countries')
      .delete()
      .eq('name', removeCountryName)
    if (error) {
      console.log('Error:', error)
      return
    }
    console.log('success')
  }
  const handleRemoveAll = async () => {
    const { data, error } = await supabase
      .from('countries')
      .delete()
      .neq('id', -1)
    if (error) {
      console.log('error: ', error)
      return
    }
    console.log('Success')
  }

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('countries')
      .update({ name: updateCountryName })
      .eq('id', updatecountryID)
    if (error) {
      console.log('Error:', error)
      return
    }
    console.log('Success')
  }

  return (
    <div>
      <h1>Countries</h1>
      <button
        onClick={() => {
          setUpdatedDB(!updatedDB)
          console.log(updatedDB)
        }}
      >
        Read
      </button>
      <ul>
        {!countries ? (
          <p>loading</p>
        ) : (
          countries.map(country => {
            return (
              <li key={country.id}>
                {' '}
                {country.id}: {country.name}
              </li>
            )
          })
        )}
      </ul>
      <h1>Add Country</h1>
      <input
        type='text'
        value={addCountryName}
        onChange={e => setAddCountryName(e.target.value)}
        placeholder='AddCountryName'
      />
      <button onClick={handleAddCountry}>Add Country</button>
      <h1>Update</h1>
      <input
        type='text'
        value={updatecountryID}
        onChange={e => {
          setUpdateCountryID(e.target.value)
        }}
        required
        placeholder='ID'
      />

      <input
        type='text'
        value={updateCountryName}
        onChange={e => {
          setUpdateCountryName(e.target.value)
        }}
        required
        placeholder='Updated Name'
      />
      <button onClick={handleUpdate}>Update</button>
      <h1>Delete</h1>
      <input
        type='text'
        value={removeCountryName}
        onChange={e => {
          setRemoveCountryName(e.target.value)
        }}
      />
      <button onClick={handleRemove}>Remove</button>
      <button onClick={handleRemoveAll}>Remove All </button>
    </div>
  )
}

export default App

import { TextField, Container, InputAdornment, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Jobs from "./Jobs";

const SearchBar = () => {
  const [location, setLocation] = useState();
  const [jobTitle, setJobTitle] = useState('');
  const [ error, setError] = useState(null)
  const [info, setInfo] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [loading, isLoading] = useState(false)

  const handleLocation = (e) => {
    setLocation(e.target.value)
  }

  const handleTitle = (e) => {
    setJobTitle(e.target.value);
  }

  const fetchData = () => {
    setTriggerFetch(true)
  }

  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: `${jobTitle} in ${location}`,
      page: '1',
      num_pages: '1',
      date_posted: 'all'
    },
    headers: {
      'x-rapidapi-key': 'dd6a361973mshee08ebd16ba010dp1383efjsnf1f9cd97e498',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };
  useEffect(() => {
    if (triggerFetch) {
      const search = async () => {
        isLoading(true)
        try {
          const response = await axios.get(options.url, {
            headers: options.headers,
            params: options.params
          });
          setInfo(response.data.data)
          isLoading(false)
        } catch (error) {
          console.error(error.response.data.message);
          setError(error.response.data.message);
          isLoading(false)
        }
            
      }
      search()
      setTriggerFetch(false)
    }
  }, [triggerFetch, info, options.headers, options.params, options.url])



  return (
    <>
      <Container maxWidth="md" className="mt-5">
        <TextField
          placeholder="Job title"
          className="bg-white shadow-md shadow-slate-400 "
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              },
              
              width: {
                xs: "100%",
                lg: 400
              }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleTitle}
          />
            
        <TextField
          placeholder="Location"
          className="bg-white shadow-md shadow-slate-400"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              },
              width: {
                xs: "100%",
                lg: 400
              }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={fetchData}>Search</Button>
              </InputAdornment>
            ),
          }}
          onChange={handleLocation}
        />
      </Container>
      <Jobs jobs={info} loading={loading} error={error} />
    </>
  );
};

export default SearchBar;
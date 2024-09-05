import { Typography, Container, Button } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const JobDetails = () => {
    const { jobId } = useParams();
    const [details, setDetails] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/job-details',
            params: {
              job_id: `${jobId}`,
              extended_publisher_details: 'false'
            },
            headers: {
              'x-rapidapi-key': 'dd6a361973mshee08ebd16ba010dp1383efjsnf1f9cd97e498',
              'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        };
        
        const getDetails = async () => {
                
            try {
                const response = await axios.get(options.url, {
                    params: options.params,
                    headers: options.headers
                });
                setDetails(response?.data.data[0])
            } catch (error) {
                return;
            }
        }
          getDetails()
    }, [details, jobId])
    return (
        <Container>
            <Typography className="font-bold text-2xl mt-5">{details.job_title}</Typography>
            <Link className="underline" to='#' onClick={window.open(`${details.job_apply_link}`, '_blank')}>
                {details.employer_name}
                <ArrowOutwardIcon />
            </Link>
            <Typography >{details.job_city}</Typography>
            <hr style={{ border: '1px solid lightgray', marginTop: "1rem" }} />

            <Typography className="font-bold text-2xl mt-5">Job Details</Typography>
            <Typography className="mt-3 flex font-bold">
                <BusinessCenterIcon className="mr-3 text-gray-400" />
                Job type
            </Typography>
            <Typography
                color="text.secondary"
                className="bg-slate-100 w-fit p-2 rounded-md flex mt-3 ml-6 text-sm">
                {details.job_employment_type}
            </Typography>
            <hr style={{ border: '1px solid lightgray', marginTop: "1rem" }} />

            <Typography className="font-bold text-2xl mt-5">Location</Typography>
            <Typography className="mt-3 flex">
                <LocationOnIcon className="mr-3 text-gray-400" />
                {`${details.job_city} (${details.job_country})`}
            </Typography>

            <hr style={{ border: '1px solid lightgray', marginTop: "1rem" }} />
            <Typography className="font-bold text-2xl mt-5">Full job description</Typography>
            <Typography className="mt-5">
                {details.job_description}
            </Typography>

            <hr style={{ border: '1px solid lightgray', marginTop: "1rem" }} />
            <Button
                variant="contained"
                className="mt-5"
                endIcon={<ArrowOutwardIcon />}
                onClick={() => window.open(`${details.job_apply_link}`, '_blank')}
            >
                Apply now
            </Button>
        </Container>
    )
}

export default JobDetails
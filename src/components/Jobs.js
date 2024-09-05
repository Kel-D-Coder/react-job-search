import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Avatar
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const Jobs = ({ jobs, loading, error }) => {

  const navigate = useNavigate();
    
  return (
    <>

      <Container maxWidth="md" className="mt-20">
        <Grid container spacing={2} >
          {
            error && <h3 className={`m-auto text-2xl text-red-600`}>{ error }</h3>
          }
          {
            jobs.length === 0 && <h3 className={`m-auto text-2xl ${loading && 'hidden'} ${error && 'hidden'}`}>Search for a job</h3>
          }
          {
           
            loading ? <CircularProgress sx={{margin: 'auto'}} /> :
            
            jobs.map((job, index) => {
            return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardHeader
                  title={ job.job_title }
                  subheader={ `${job.employer_name} (${job.job_city})`}
                  avatar={ <Avatar image={job.employer_logo}></Avatar> }
                />
                <CardContent>
                  {
                    <Typography color="text.secondary" className="bg-slate-100 w-fit p-2 rounded-md flex">
                      <SendIcon className="text-blue-500 mr-0.5" />
                      {job.job_employment_type}
                    </Typography>
                    
                  }
                </CardContent>
                <CardActions>
                    <Typography variant="caption">{new Date(job.job_posted_at_datetime_utc).toDateString()}</Typography>
                  
                    <Button size="small" onClick={() => navigate(`/${job.job_id}`)}>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            )
            })
            
          }
        </Grid>
      </Container>
    </>
  );
};

export default Jobs;
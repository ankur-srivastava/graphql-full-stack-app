import JobList from './JobList';
import { fetchJobs } from '../graphql-client/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchJobs().then(data => {
      setJobs(data)
    }).catch(e => console.log(e))
  }, [])

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;

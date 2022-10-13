import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchCompany } from '../graphql-client/queries';

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null)

  useEffect(() => {
    fetchCompany(companyId).then(setCompany)
  }, [companyId])

  if(!company) {
    return <p>Loading ...</p>
  }
  
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyDetail;

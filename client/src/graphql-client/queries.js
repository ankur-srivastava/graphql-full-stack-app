import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const GQL_URL = 'http://localhost:9000/graphql'

export const client = new ApolloClient({
    uri: GQL_URL,
    cache: new InMemoryCache()
})

const JOB_FIELDS_FRAGMENT = gql`
    fragment JobFields on Job{
        id
        title
        company {
            id
            name
        }
        description
    }
`

export const JOB_QUERY = gql`
        query($id: ID!) {
            job(id: $id) {
                ...JobFields
            }
        }
        ${JOB_FIELDS_FRAGMENT}
    `
export const JOBS_QUERY = gql`
    query {
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }
    `

export const COMPANY_QUERY = gql`
query($id: ID!) {
    company(id: $id) {
        id
        name
        description
        jobs {
            id
            title
        }

    }
}
`

export const CREATE_JOB_MUTATION = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                ...JobFields
            }
        }
        ${JOB_FIELDS_FRAGMENT}
    `

// Get Jobs Data
// export const fetchJobDetail = async (id) => {
//     // You can copy the query from sandbox also
//     const variables = { id }
//     // const response = await request(GQL_URL, query, variables)
//     const { data: { job }} = await client.query({JOB_QUERY, variables})
//     return job
// }

// Get Jobs Data - not needed when using the useQuery hook
// export const fetchJobs = async () => {
//     // You can copy the query from sandbox also
//     const result = await client.query({JOBS_QUERY})
//     // const response = await request(GQL_URL, query)
//     return result.data.jobs
// }

// Get Companies Data
// export const fetchCompany = async (id) => {
//     const variables = { id }
//     // const { company } = await request(GQL_URL, query, variables)
//     // console.log(`company => ${company}`)
//     const { data: {company} } = await client.query({COMPANY_QUERY, variables})
//     return company
// }

// post a job
// export const postJob = async (input) => {
//     const mutation = gql`
//         mutation CreateJobMutation($input: CreateJobInput!) {
//             job: createJob(input: $input) {
//                 ...JobFields
//             }
//         }
//         ${JOB_FIELDS_FRAGMENT}
//     `
//     const variables = { input }
//     // const headers = {'Authorization': `Bearer ${getAccessToken()}`}
//     const context = {
//         headers: {'Authorization': `Bearer ${getAccessToken()}`},
//     }

//     try {
//         const response = await client.mutate({ 
//             mutation, 
//             variables, 
//             context, update: (cache, { data: {job} }) => {
//                 cache.writeQuery({
//                     query: JOB_QUERY,
//                     variables: { id: job.id },
//                     data: { job }
//                 })
//             } })
//         if(response) {
//             console.log(response)
//             const { data: {job} } = response
//             return job
//         }
//     } catch (error) {
//         console.log(error)
//         return undefined
//     }
// }
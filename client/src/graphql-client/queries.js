import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { getAccessToken } from '../auth'

const GQL_URL = 'http://localhost:9000/graphql'

const client = new ApolloClient({
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

const JOB_QUERY = gql`
        query($id: ID!) {
            job(id: $id) {
                ...JobFields
            }
        }
        ${JOB_FIELDS_FRAGMENT}
    `

// Get Jobs Data
export const fetchJobDetail = async (id) => {
    // You can copy the query from sandbox also
    const variables = { id }
    // const response = await request(GQL_URL, query, variables)
    const { data: { job }} = await client.query({JOB_QUERY, variables})
    return job
}

// Get Jobs Data
export const fetchJobs = async () => {
    // You can copy the query from sandbox also
    const query = gql`
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
    const result = await client.query({query})
    // const response = await request(GQL_URL, query)
    return result.data.jobs
}

// Get Companies Data
export const fetchCompany = async (id) => {
    const query = gql`
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
    const variables = { id }
    // const { company } = await request(GQL_URL, query, variables)
    // console.log(`company => ${company}`)
    const { data: {company} } = await client.query({query, variables})
    return company
}

// post a job
export const postJob = async (input) => {
    const mutation = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                ...JobFields
            }
        }
        ${JOB_FIELDS_FRAGMENT}
    `
    const variables = { input }
    // const headers = {'Authorization': `Bearer ${getAccessToken()}`}
    const context = {
        headers: {'Authorization': `Bearer ${getAccessToken()}`},
    }

    try {
        const response = await client.mutate({ 
            mutation, 
            variables, 
            context, update: (cache, { data: {job} }) => {
                cache.writeQuery({
                    query: JOB_QUERY,
                    variables: { id: job.id },
                    data: { job }
                })
            } })
        if(response) {
            console.log(response)
            const { data: {job} } = response
            return job
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}
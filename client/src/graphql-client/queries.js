import { request, gql } from 'graphql-request'

const GQL_URL = 'http://localhost:9000/graphql'

// Get Jobs Data
export const fetchJobDetail = async (id) => {
    // You can copy the query from sandbox also
    const query = gql`
        query($id: ID!) {
            job(id: $id) {
                id
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `
    const variables = { id }
    const response = await request(GQL_URL, query, variables)
    return response.job
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
                    name
                }
            }
        }
    `
    const response = await request(GQL_URL, query)
    return response.jobs
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
    const { company } = await request(GQL_URL, query, variables)
    console.log(`company => ${company}`)
    return company
}
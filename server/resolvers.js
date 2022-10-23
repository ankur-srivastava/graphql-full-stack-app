import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    job: (_root, {id}) => Job.findById(id),
    jobs: () => Job.findAll(),
    company: (_root, {id}) => Company.findById(id),
  },

  Mutation: {
    createJob: (_root, { input }, context) => {
      console.log('Mutation:createUser and user => ', context.user)
      if(!context.user) {
        throw Error('Unauthorized')
      }
      return Job.create({...input, companyId: context.user.companyId})
    },
    deleteJob: (_root, {id}, context) => {
      if(!context.user) {
        throw Error('Unauthorized')
      }
      Job.delete(id)
    },
    updateJob: (_root, { input }, context) => {
      if(!context.user) {
        throw Error('Unauthorized')
      }
      Job.update({...input, companyId: context.user.companyId})
    }
  },

  Job: {
    company: (job) => {
      return Company.findById(job.companyId)
    }
  },

  Company: {
    jobs: (company) => Job.findAll(job => job.companyId === company.id)
  }
}

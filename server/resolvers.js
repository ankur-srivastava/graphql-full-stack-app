import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    job: (_root, {id}) => Job.findById(id),
    jobs: () => Job.findAll(),
    company: (_root, {id}) => Company.findById(id),
  },

  Mutation: {
    createJob: (_root, { input }) => Job.create(input)
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

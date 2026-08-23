import Jobs from '../jobs/jobModel.js'

//Add Jobs

export const addJob = async (jobData) => {
 const job = await Jobs.create(jobData);
 return job;

} ;

// Fetch Jobs
export const getJobs = async () =>{
    return await Jobs.find();
};

//Update Jobs
export const updateJobStatus = async (id, status) => {
 return await Jobs.findByIdAndUpdate(
    id,
    { status },
    { new : true }
 );
};
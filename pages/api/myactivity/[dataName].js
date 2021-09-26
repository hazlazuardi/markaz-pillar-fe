import { myactivity } from '../../../dummy'

export default async ({ query: { dataId } }, res) => {
  const filtered = myactivity.filter((myact) => myact.id === parseInt(dataId))

  // Job with id exists
  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Data with id: ${dataId} not found.` })
  }
}
//
//const filtered = jobs.filter((job) => job.id === parseInt(jobId))
//
//  // Job with id exists
//  if (filtered.length > 0) {
//    res.status(200).json(filtered[0])
//  } else {
//    res.status(404).json({ message: `Job with id: ${jobId} not found.` })
//  }

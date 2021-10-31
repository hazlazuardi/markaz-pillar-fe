
const dummyActivity = [
  {
    id: 0,
    activityType: 'Donasi',
    date: '27-04-2001',
    donationTarget: '50.000.000',
    donationCollected: '10.000.000',
    status: 'Pembayaran Diterima'
  },
  {
    id: 1,
    activityType: 'Donasi',
    date: '27-04-2001',
    donationTarget: '50.000.000',
    donationCollected: '10.000.000',
    status: 'Pembayaran Diterima'
  },
  {
    id: 3,
    activityType: 'Volunteer',
    date: '27-04-2001',
    volunteeringActvity: 'Belajar Excel',
    donationDate: '30-04-2001',
    status: 'Pembayaran Diterima'
  },
  {
    id: 4,
    activityType: 'Volunteer',
    date: '27-04-2001',
    volunteeringActvity: 'Belajar Coding',
    donationDate: '30-04-2001',
    status: 'Pembayaran Ditolak'
  },

]


export default function handler(req, res) {
    res.status(200).json(dummyActivity)
  }
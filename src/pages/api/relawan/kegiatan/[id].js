export default function handler(_req, res) {
    return res.status(200).json(response)
}

const response = {
    "timestamp": "2021-11-20T20:43:53.191",
    "statusCode": 200,
    "message": "OK",
    "result": {
        "id": 2,
        "name": "program 2",
        "slug": "program-2",
        // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be\\static\\volunteer\\program\\thumbnail/image_2020-12-16_22-31-51_kIU1EOTy.png",
        "thumbnailURL": 'https://source.unsplash.com/random',
        "description": "test program",
        "volunteerNeeded": 0,
        "volunteerApplied": 0,
        "location": "jakarta",
        "term": "harus s1",
        "benefit": "duid",
        "schedule": "dari pagi sampe malem 24/7",
        "createdAt": "2021-11-20T20:43:20",
        "testimonies": [],
        "markaz": {
            "id": 2,
            "name": "Markaz Bogor"
        }
    }
}
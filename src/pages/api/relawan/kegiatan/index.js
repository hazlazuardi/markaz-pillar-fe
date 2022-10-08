export default function handler(_req, res) {
    const { random, status } = _req.query
    if (random) {
        return res.status(200).json(randomized)
    }

    if (status === 'done') {
        return res.status(200).json(done)
    }

    if (status === 'upcoming') {
        return res.status(200).json(upcoming)
    }

    return res.status(200).json(randomized)
}

const randomized = {
    "timestamp": "2021-11-20T20:47:00.558",
    "statusCode": 200,
    "message": "OK",
    "result": [
        {
            "id": 1,
            "name": "program 3",
            "slug": "program-3",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be\\static\\volunteer\\program\\thumbnail/image_2020-12-16_22-31-51_nt5SqBSM.png",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "description": "test edit program",
            "volunteerNeeded": 0,
            "volunteerApplied": 0,
            "location": "jakarta"
        },
        {
            "id": 2,
            "name": "program 2",
            "slug": "program-2",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be\\static\\volunteer\\program\\thumbnail/image_2020-12-16_22-31-51_kIU1EOTy.png",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "description": "test program",
            "volunteerNeeded": 0,
            "volunteerApplied": 0,
            "location": "jakarta"
        }
    ],
    "count": 2,
    "page": 0,
    "totalElement": 2,
    "totalPage": 1
}

const done = {
    "timestamp": "2021-11-20T20:47:00.558",
    "statusCode": 200,
    "message": "OK",
    "result": [
        {
            "id": 1,
            "name": "program 3",
            "slug": "program-3",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be\\static\\volunteer\\program\\thumbnail/image_2020-12-16_22-31-51_nt5SqBSM.png",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "description": "test edit program",
            "volunteerNeeded": 0,
            "volunteerApplied": 0,
            "location": "jakarta"
        },
        {
            "id": 2,
            "name": "program 2",
            "slug": "program-2",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be\\static\\volunteer\\program\\thumbnail/image_2020-12-16_22-31-51_kIU1EOTy.png",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "description": "test program",
            "volunteerNeeded": 0,
            "volunteerApplied": 0,
            "location": "jakarta"
        }
    ],
    "count": 2,
    "page": 0,
    "totalElement": 2,
    "totalPage": 1
}

const upcoming = {
    "timestamp": "2021-11-20T20:47:00.558",
    "statusCode": 200,
    "message": "OK",
    "result": [
        {
            "id": 1,
            "name": "program 3",
            "slug": "program-3",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be\\static\\volunteer\\program\\thumbnail/image_2020-12-16_22-31-51_nt5SqBSM.png",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "description": "test edit program",
            "volunteerNeeded": 0,
            "volunteerApplied": 0,
            "location": "jakarta"
        },
        {
            "id": 2,
            "name": "program 2",
            "slug": "program-2",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be\\static\\volunteer\\program\\thumbnail/image_2020-12-16_22-31-51_kIU1EOTy.png",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "description": "test program",
            "volunteerNeeded": 0,
            "volunteerApplied": 0,
            "location": "jakarta"
        }
    ],
    "count": 2,
    "page": 0,
    "totalElement": 2,
    "totalPage": 1
}

const error = {
    "timestamp": "2021-11-20T20:47:00.558",
    "statusCode": 404,
    "message": "Error: Please give params",
}
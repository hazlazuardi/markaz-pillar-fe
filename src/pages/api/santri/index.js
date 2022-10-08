export default function handler(_req, res) {
    return res.status(200).json(response)
}

const response = {
    "timestamp": "2021-10-09T20:26:26.336",
    "statusCode": 200,
    "message": "OK",
    "result": [
        {
            "id": 1,
            "slug": "santri-beneran",
            "name": "santri beneran",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be/static/215463_Uq2dvLfV.jpg",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "background": "pelajar yang baik"
        },
        {
            "id": 2,
            "slug": "santri-beneran-2",
            "name": "santri beneran 2",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be/static/215463_xTSgfu7w.jpg",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "background": "pelajar yang baik"
        }
    ],
    "count": 2,
    "page": 0,
    "totalElement": 2,
    "totalPage": 1
}
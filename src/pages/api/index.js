export default function handler(_req, res) {
    return res.status(200).json(response)
}

const response = {
    "timestamp": "2021-11-20T20:43:53.191",
    "statusCode": 200,
    "message": "OK",
    "result": {
        "markaz": {
            "id": 1,
            "name": 'Markaz Bogor',
            "background": 'Markaz Bogor adalah markaz yang ada di Bogor',
            "thumbnailURL": 'https://source.unsplash.com/random',
        },
        "santri": {
            "id": 1,
            "name": "Mukhlis Hasan",
            "background": "Hasan adalah anak yang baik.",
            "thumbnailURL": 'https://source.unsplash.com/random',
        },
        "program": {
            "id": 1,
            "name": "Menanam Apel",
            "description": "Kegiatan untuk menanam apel di kebun.",
            "thumbnailURL": 'https://source.unsplash.com/random',
        },
        "programCarousel": [
            {
                "id": 1,
                "name": "Menanam Apel",
                "description": "Kegiatan untuk menanam apel di kebun.",
                "location": "Jakarta",
                "volunteerApplied": 200,
                "volunteerNeeded": 300,
                "thumbnailURL": 'https://source.unsplash.com/random',

            }
        ]

    }
}
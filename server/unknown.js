const schools = await CustomSchool.aggregate([
    // The first stage of the pipeline is the same as before
    {
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [parseFloat(lat), parseFloat(lng)],
            },
            distanceField: "distance",
            spherical: true,
        },
    },
    {
        $lookup: {
            from: "favoriteschools",
            let: { schoolId: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [{ $eq: ["$school", "$$schoolId"] }, { $eq: ["$user", mongoose.Types.ObjectId(id)] }],
                        },
                    },
                },
            ],
            as: "favorite",
        },
    },
    {
        $addFields: {
            isFavorite: { $gt: [{ $size: "$favorite" }, 0] },
        },
    },
    {
        $project: {
            favorite: 0,
        },
    },
    {
        $sort: {
            distance: 1,
        },
    },
    // The $facet stage splits the pipeline into multiple independent pipelines
    {
        $facet: {
            // The 'results' pipeline computes the paginated results
            results: [
                {
                    $skip: (+page - 1) * (+limit || 5),
                },
                {
                    $limit: +limit || 5,
                },
            ],
            // The 'totalCount' pipeline computes the total count of documents
            totalCount: [
                {
                    $count: "count",
                },
            ],
        },
    },

    // The $unwind stage flattens the 'totalCount' result
    {
        $unwind: "$totalCount",
    },

    // The $project stage adds the pagination metadata
    {
        $project: {
            results: 1,
            totalCount: "$totalCount.count",
            currentPage: +page || 1,
            totalPages: {
                $ceil: { $divide: ["$totalCount.count", +limit || 5] },
            },
        },
    },
]);
let options = {
    ...schools[0],
    doc: schools[0].results.length,
    page: +page,
};
if (schools) {
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, options);
} else {
    return COMMON_SERVICE.apiResponse(res, "no school found", true, 404);
}

// ==========================
async function CalculateDistance(origin, destinatioon) {
    const origins = [origin.long, origin.lat];
    const destinations = [destinatioon.long, destinatioon.lat];
    // const origins = [75.82597833676631, 26.76834099017816];
    // const destinations = [75.81741672621688, 26.774758791228695];
    // let url2 = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62488a0b59af79954cd9b3757a4f41f89a5d&start=${origin.long},${origin.lat}&end=${destinatioon.long},${destinatioon.lat}`;

    // let getDist = await axios.get(url2);
    // console.log('11============', util.inspect(getDist.data.features[0].properties.segments[0], { depth: null }));

    let distTIme = await orsDirections.calculate({
        coordinates: [origins, destinations],
        profile: "driving-car",
        attributes: ["avgspeed"],
        units: "km",
        format: "json",
    });
    // console.log('direxc===============', distTIme.routes[0]);
    return distTIme.routes[0].summary;
}

// "dev": "concurrently \"nodemon app.js\" \"eslint . --quiet\""

[
    {
        __v: 0,
        _id: "64a98de843f08ccb77caa7ca",
        createdAt: "2023-07-08T16:25:12.770Z",
        location: {
            __v: 0,
            _id: "643ae16ec24549b36ea01d27",
            area: null,
            city: "Jaipur",
            country: null,
            createdAt: "2023-04-15T17:39:58.673Z",
            location: [Object],
            postcode: null,
            school: "643ae16ec24549b36ea01d25",
            schoolname: null,
            state: null,
            updatedAt: "2023-04-15T17:39:58.673Z",
        },
        school: {
            __v: 0,
            _id: "643ae16ec24549b36ea01d25",
            address: null,
            admissionOpen: false,
            affliation: null,
            board: null,
            canteenAvailable: null,
            createdAt: "2023-04-15T17:39:58.670Z",
            description: null,
            email: null,
            feature_image: null,
            gallery: [Array],
            hostelAvailable: null,
            isFavorite: false,
            lat: 0,
            lng: 0,
            medium: null,
            name: "School 4",
            phone: null,
            princple_name: null,
            rating: 0,
            sportsAvailable: null,
            totalStudents: null,
            totalTeachers: null,
            updatedAt: "2023-04-15T17:39:58.670Z",
            whenOpen: null,
        },
        updatedAt: "2023-07-08T16:25:12.770Z",
        user: {
            __v: 0,
            _id: "643aa8b1dcde8462fd4ee549",
            address: null,
            authType: null,
            avatar: null,
            city: null,
            country: null,
            createdAt: "2023-04-15T13:37:53.285Z",
            email: "mayank.sanyank@gmail.com",
            emailverifyotp: 763679,
            location: [Object],
            name: "Mayank Thakur",
            otp: 116960,
            password: "$2a$12$mmrHEjcsECpOdo/1Q4eonu9VttyQytPBt0t8FueWul.pD/jFPBohG",
            phoneno: null,
            postcode: null,
            school_address: null,
            school_class: null,
            school_medium: null,
            school_name: null,
            state: null,
            tokens: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNhYThiMWRjZGU4NDYyZmQ0ZWU1NDkiLCJpYXQiOjE2ODg4MDYyOTR9.-Ty7-hWvY5clmiaYTKjyTGvNeQaYOdZgH0Yc8G1F4p0",
            updatedAt: "2023-07-08T08:51:34.501Z",
            usertype: "student",
            verified: true,
        },
    },
];

// ==========================
const result = await SchoolLocationModel.aggregate([
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "location",
            as: "result",
        },
    },
    {
        $unwind: {
            path: "$result",
        },
    },
    {
        $facet: {
            toprated: [
                {
                    $addFields: {
                        averageRating: { $avg: "$result.rating" },
                    },
                },
                { $limit: 5 },
            ],
            featured: [{ $match: { featured: true } }, { $sort: { createdAt: -1 } }, { $limit: 5 }],
        },
    },
]);

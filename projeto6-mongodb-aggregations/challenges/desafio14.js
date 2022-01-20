db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duration: {
        $avg: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "minute",
          },
        },
      },
    },
  },
  { $sort: {
    duration: -1 },
  },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duration" },
    },
  },
]);

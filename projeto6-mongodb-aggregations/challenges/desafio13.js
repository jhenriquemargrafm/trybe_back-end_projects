db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duration: {
        $avg: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "minute",
          },
        } },
    } },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duration" },
    },
  },
]);

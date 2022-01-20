db.trips.aggregate([
  {
    $addFields: {
      diaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$diaSemana",
      count: { $sum: 1 },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$count",
    },
  },
]);

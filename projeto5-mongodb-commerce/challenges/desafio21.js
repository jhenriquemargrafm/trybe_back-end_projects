// Query 1 - Retorna o nome dos sanduíches em que curtidas é maior que vendidos
db.produtos.find(
  { $expr: {
      $gt: ["$curtidas", "$vendidos"],
  } },
  { _id: 0, nome: 1 },
);

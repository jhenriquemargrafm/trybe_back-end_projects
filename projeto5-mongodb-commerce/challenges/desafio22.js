// Query 1 - Retorna o nome e vendidos dos sanduíches em que vendidos é múltiplo de 5.
db.produtos.find(
  { vendidos: {
      $mod: [5, 0],
  } },
  { _id: 0, nome: 1, vendidos: 1 },
);

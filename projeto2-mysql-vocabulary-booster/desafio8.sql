SELECT C.ContactName AS 'Nome de contato',
  S.ShipperName AS 'Empresa que fez o envio',
  DATE(O.OrderDate) AS 'Data do pedido'
FROM w3schools.customers AS C
  INNER JOIN w3schools.orders AS O 
  ON C.CustomerID = O.CustomerID
  INNER JOIN w3schools.shippers AS S 
  ON O.ShipperID = S.ShipperID
WHERE S.ShipperID != 3
ORDER BY C.ContactName, S.ShipperName, DATE(O.OrderDate) ASC;

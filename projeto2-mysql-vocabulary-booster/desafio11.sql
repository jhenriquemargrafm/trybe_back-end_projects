SELECT C.ContactName AS 'Nome',
  C.Country AS 'País',
  COUNT(*) AS 'Número de compatriotas'
FROM
  w3schools.customers AS C,
  w3schools.customers AS self
WHERE C.Country = self.Country AND C.ContactName <> self.ContactName
GROUP BY C.ContactName, C.Country
ORDER BY C.ContactName;

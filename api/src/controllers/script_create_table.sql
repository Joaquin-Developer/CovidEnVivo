use example;

/* estructura de la tabla: */
create table if not exists cases_data(
  id int unsigned not null auto_increment,
  nameCountry varchar(200) not null default '',
  dateCases date not null,
  recovered int unsigned not null,
  confirmed int unsigned not null,
  deaths int unsigned not null,
  primary key(id)
);

/* query para obtener el último registro de un país: */
SELECT
  id,
  nameCountry as PAIS,
  dateCases as FECHA,
  confirmed as CONFIRMADOS,
  recovered as RECUPERADOS,
  deaths as MUERTES
FROM
  CASES_DATA
WHERE
  nameCountry = 'EXAMPLE_1'
  AND id = (
    SELECT
      MAX(id)
    FROM
      CASES_DATA
  )
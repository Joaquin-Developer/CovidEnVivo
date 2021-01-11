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

select id, nameCountry "Pais", dateCases "fecha", confirmed "confirmados", 
recovered "Recuperados", deaths "Muertes"
from cases_data
where nameCountry = "EXAMPLE_1" 
and id = (select max(id) from cases_data);


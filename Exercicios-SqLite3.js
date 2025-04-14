const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./chinook.db', (err) => {
  if (err) {
    return console.error(' Erro ao conectar coa BBDD:', err.message);
  }
  console.log(' Conectado á base de datos Chinook');
  //==============================EXERCICIO 1 ========================================
  // Lista a tabla  ‘customers’ onde o ‘City’ conteña ‘on’ e ‘as’
  const sql1 = `SELECT * FROM customers WHERE City LIKE '%on%' OR City LIKE '%as%';`;
  db.all(sql1, [], (err, rows) => {
    if (err) throw err;
    console.log(' Resultados do EXERCICIO 1:');
    rows.forEach((row) => console.log(row))
   });


    //==============================EXERCICIO 2 ========================================
    /*  Selecciona a táboa ‘invoices’ onde lle deberás aplicar o campo ‘Total’ un aumento de precio dun 10%,
     lembra que para realizar esta operación sería deste xeito:*/
    const sql2 = `SELECT InvoiceId, Total, Total * 0.10 + Total AS 'Total_Aumentado_10%' FROM invoices;`;
    db.all(sql2, [], (err, rows) => {
      if (err) throw err;
      console.log(' Resultados do EXERCICIO 2:');
      rows.forEach((row) => console.log(row));
    });

     //==============================EXERCICIO 3 ========================================
      // Saca nunha tabla os valores dos artistas ou grupo cos albums asociados
      const sql3 = `SELECT artists.Name AS Artista, albums.Title AS Album
                    FROM artists
                    INNER JOIN albums ON artists.ArtistId = albums.ArtistId;`;
      db.all(sql3, [], (err, rows) => {
        if (err) throw err;
        console.log(' Resultados do EXERCICIO 3:');
        rows.forEach((row) => console.log(row));
      });
  


    //==============================EXERCICIO 4 ========================================
    //Dime nunha táboa o título da canción, o autor e playlist á que pertence

    const sql4 = ` SELECT tracks.Name AS "Título da canción", artists.Name AS "Autor",playlists.Name AS "Playlist"
    FROM playlist_track
    JOIN tracks ON playlist_track.TrackId = tracks.TrackId
    JOIN albums ON tracks.AlbumId = albums.AlbumId
    JOIN artists ON albums.ArtistId = artists.ArtistId
    JOIN playlists ON playlist_track.PlaylistId = playlists.PlaylistId
    ORDER BY playlists.Name, artists.Name, tracks.Name;`;

  db.all(sql4, [], (err, rows) => {
  if (err) throw err;
  console.log('Resultados do EXERCICIO 4:');
  rows.forEach(row => console.log(row));
    });
  //==============================EXERCICIO 5 ========================================
  //Cáles son os ‘id’s’ das facturas dos clientes de Londres? 
    const sql5 = `SELECT invoices.InvoiceId FROM invoices
    JOIN customers ON invoices.CustomerID = customers.CustomerID
    WHERE customers.City = 'London';`;
    db.all(sql5, [], (err, rows) => {
      if (err) throw err; 
      console.log ('Resultado EXERCICIO 5:');
      rows.forEach(row => console.log(row));
        }); 
   //==============================EXERCICIO 6 ========================================
   /* Cómo relacionarías as tablas seguintes?:
      customers
      invoices
      invoice_items
      playlist_track
      tracks*/

 const sql6 = `SELECT customers.FirstName || ' ' || customers.LastName AS Cliente,
 tracks.Name AS Cancion FROM customers
JOIN invoices ON customers.CustomerId = invoices.CustomerId
JOIN invoice_items ON invoices.InvoiceId = invoice_items.InvoiceId
JOIN playlist_track ON invoice_items.TrackId = playlist_track.TrackId
JOIN tracks ON playlist_track.TrackId = tracks.TrackId`;

db.all(sql6, [], (err, rows) => {
  if (err) throw err;
  console.log('Resultado EXERCICIO 6:');
  rows.forEach(row => console.log(row));
});

    //==============================EXERCICIO 7 ========================================
    //Cál é a suma das facturas do cliente de londres?. Para isto deberás usar a función sum
    const sql7 = `SELECT SUM (invoices.Total) AS Total Gastado FROM invoices
    JOIN customers ON invoices.CustomerId = customers.CustomerId
    WHERE customers.City = 'London'`;
    db.all(sql7, [], (err, rows) => {
      if (err) throw err;
      console.log ('Resultado EXERCICIO 7:');
      rows.forEach(row => console.log(row));
    })
   //==============================EXERCICIO 8 ========================================
   /*Obtén o número de albums, para isto deberás usar a función ‘count’.
   A función Count pode traballar para un campo, de tal xeito, que se introduces dito campo,
    contará o número de veces que sae repetido*/
    const sql8 = `SELECT COUNT (*) AS TotalAlbums FROM albums`;
    db.all(sql8, [], (err, rows) => {
      if (err) throw err;
      console.log ('Resultado EXERCICIO 8:');
      rows.forEach(row => console.log(row));
    });


   //==============================EXERCICIO 9 ========================================
     //Obtén o número de clientes por países de la tabla clientes, ordéao por países. 
    const sql9 = `SELECT Country, COUNT (*) as NumeoClientes FROM customers
    GROUP BY Country ORDER BY Country`;
    db.all(sql9, [], (err, rows) => {
      if (err) throw err;
      console.log ('Resultado EXERCICIO 9:');
      rows.forEach(row => console.log(row))
    });

   //==============================EXERCICIO 10========================================
     /*Dime os países que teñan máis de 3 clientes, ordéaos de maneira ascendente e descendente. Utliza a cláusula ‘HAVING’.
    Esta cláusula traballa a partir dun resultado agrupado, fixádevos na diapositiva de ‘Introducción a sql 1’ nº 15.*/
    const sql10 = `SELECT Country, COUNT(*) AS NumeroClientes
    FROM customers GROUP BY Country
    HAVING COUNT(*) > 3 ORDER BY NumeroClientes ASC;`;
     db.all(sql10, [], (err, rows) => {
       if (err) throw err;
       console.log ('Resultado EXERCICIO 10:');
       rows.forEach(row => console.log(row))
     });
 //==============================EXERCICIO 11========================================
 //Tipo de media (campo MediaTypeId,Name da tabla ‘media_types’) de la lista de cancións para AC/DC
    const sql11 = `SELECT DISTINCT media_types.MediaTypeId, media_types.Name
      FROM tracks JOIN albums ON tracks.AlbumId = albums.AlbumId
      JOIN artists ON albums.ArtistId = artists.ArtistId
      JOIN media_types ON tracks.MediaTypeId = media_types.MediaTypeId
      WHERE artists.Name = 'AC/DC';`;
     db.all(sql11, [], (err, rows) => {
       if (err) throw err;
       console.log ('Resultado EXERCICIO 11:');
       rows.forEach(row => console.log(row))
     });

//==============================EXERCICIO 12========================================
/*Quén é o cliente coa máxima factura?.
Nesta ocasión deberás utilizar a función ‘max’, onde deberás introducir o campo adecuado*/
const sql12 = `SELECT customers.FirstName || ' ' || customers.LastName AS Cliente, invoices.Total
FROM invoices JOIN customers ON invoices.CustomerId = customers.CustomerId
WHERE invoices.Total = (SELECT MAX(Total) FROM invoices)`;
db.all(sql12, [], (err, rows) => {
  if (err) throw err;
  console.log ('Resultado EXERCICIO 12:');
  rows.forEach(row => console.log(row))
});

//==============================EXERCICIO 13========================================
//Suma das facturas por cliente. (lembra usar a función ‘sum’)

const sql13 = `SELECT customers.FirstName || ' ' || customers.LastName AS Cliente,  SUM(invoices.Total) AS TotalGastado
FROM invoices JOIN customers ON invoices.CustomerId = customers.CustomerId
GROUP BY customers.CustomerId ORDER BY TotalGastado DESC;`;
db.all(sql13, [], (err, rows) => {
  if (err) throw err;
  console.log ('Resultado EXERCICIO 13:');
  rows.forEach(row => console.log(row))
});

//==============================EXERCICIO 14========================================
//En qué cidades viven os empregados e cantos viven nesas cidades?.
const sql14 = `SELECT City, COUNT(*) AS NumEmpleados FROM employees 
GROUP BY City ORDER BY NumEmpleados DESC;`;
db.all(sql14, [], (err, rows) => {
  if (err) throw err;
  console.log ('Resultado EXERCICIO 14:');
  rows.forEach(row => console.log(row))
});


//==============================EXERCICIO 15========================================
//Quénes son os artistas que teñen albums?, ordéaos por albums
const sql15 = `SELECT artists.Name AS Artista, COUNT(albums.AlbumId) AS NumAlbums
FROM artists
JOIN albums ON artists.ArtistId = albums.ArtistId
GROUP BY artists.ArtistId
ORDER BY NumAlbums DESC ;`;
db.all(sql15, [], (err, rows) => {
  if (err) throw err;
  console.log ('Resultado EXERCICIO 15:');
  rows.forEach(row => console.log(row))
});

//==============================EXERCICIO 16========================================
/* Media das facturas por cliente. Agrúpaos polo id do cliente
Nesta ocasión deberás usar a función ‘avg’*/
const sql16 = `SELECT customers.CustomerId, customers.FirstName, customers.LastName, AVG(invoices.Total) AS MediaFactura
FROM invoices
JOIN customers ON invoices.CustomerId = customers.CustomerId
GROUP BY customers.CustomerId
ORDER BY MediaFactura DESC;`;
db.all(sql16, [], (err, rows) => {
  if (err) throw err;
  console.log ('Resultado EXERCICIO 16:');
  rows.forEach(row => console.log(row))
});








    
   
});



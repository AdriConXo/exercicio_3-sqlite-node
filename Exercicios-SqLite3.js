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

        

        
      });
    

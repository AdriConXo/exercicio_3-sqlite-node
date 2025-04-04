const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./chinook.db', (err) => {
  if (err) {
    return console.error(' Erro ao conectar coa BBDD:', err.message);
  }
  console.log(' Conectado á base de datos Chinook');

  // Ejercicio 1
  const sql1 = `SELECT * FROM customers WHERE City LIKE '%on%' OR City LIKE '%as%';`;
  db.all(sql1, [], (err, rows) => {
    if (err) throw err;
    console.log(' Resultados do EXERCICIO 1:');
    rows.forEach((row) => console.log(row));

    // Ejercicio 2
    const sql2 = `SELECT InvoiceId, Total, Total * 0.10 + Total AS 'Total_Aumentado_10%' FROM invoices;`;
    db.all(sql2, [], (err, rows) => {
      if (err) throw err;
      console.log(' Resultados do EXERCICIO 2:');
      rows.forEach((row) => console.log(row));

      // Ejercicio 3
      const sql3 = `SELECT artists.Name AS Artista, albums.Title AS Album
                    FROM artists
                    INNER JOIN albums ON artists.ArtistId = albums.ArtistId;`;
      db.all(sql3, [], (err, rows) => {
        if (err) throw err;
        console.log(' Resultados do EXERCICIO 3:');
        rows.forEach((row) => console.log(row));

        // Cerramos conexión SOLO al final
        db.close((err) => {
          if (err) return console.error(err.message);
          console.log(' Conexión pechada');
        });
      });
    });
  });
});

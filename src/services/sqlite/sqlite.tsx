import {
    ResultSet,
    SQLiteDatabase,
    enablePromise,
    openDatabase,
  } from 'react-native-sqlite-storage';

  
  enablePromise(true);
  
  let db: SQLiteDatabase;
  export const getDBConnection = async () => {
    return openDatabase({ location: 'default', name: 'hugin.db' });
  };
  
  let create = false;
  
  export const initDB = async () => {
    console.log('Initializing database..2');
    try {
      if (create) {
        return;
      }
      db = await getDBConnection();
      console.log('Got db connection');

      let query =
      `CREATE TABLE IF NOT EXISTS wallet (
        id INTEGER PRIMARY KEY,
        json TEXT
       )`;
      await db.executeSql(query);
  
      const acc = `CREATE TABLE IF NOT EXISTS account ( 
      publicKey TEXT,
      secretKey TEXT
    )`;
      await db.executeSql(acc);
  
      create = true;
    } catch (err) {
      console.log(err);
    }
  
    //Add some init test funcs during dev here:
  };
  
  export async function saveAccount(pk: string, sk: string) {
    console.log('Saving Account ', pk);
    try {
      const result = await db.executeSql(
        'REPLACE INTO account (publicKey, secretKey) VALUES (?, ?)',
        [pk, sk],
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function loadAccount() {
    const results = await db.executeSql('SELECT * FROM account');
    return results[0].rows.item(0);
  }

  function chunkString(string: string, size: number) {
    const numChunks = Math.ceil(string.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; i++, o += size) {
        chunks[i] = string.substr(o, size);
    }

    return chunks;
}

const databaseRowLimit = 1024 * 512; // 512 KB per chunk

export async function saveWallet(wallet: any) {
    // Serialize wallet into a JSON string
    const walletString = JSON.stringify(wallet);

    // Split the JSON string into manageable chunks
    const chunks = chunkString(walletString, databaseRowLimit);

    // Clear the wallet table
    await db.executeSql(`DELETE FROM wallet`);

    // Insert each chunk into the database
    for (let i = 0; i < chunks.length; i++) {
        await db.executeSql(
            `INSERT INTO wallet (id, json) VALUES (?, ?)`,
            [i, chunks[i]] // Use parameterized query to safely insert data
        );
    }
}

export async function loadWallet() {
  console.log('Loading wallet from db..')
  try {
      let [data] = await db.executeSql(
          `SELECT
              LENGTH(json) AS jsonLength
          FROM
              wallet`
      );
      

      if (data && data.rows && data.rows.length === 1) {
          const len = data.rows.item(0).jsonLength;
          let result = '';

          if (len > databaseRowLimit) {
              for (let i = 1; i <= len; i += databaseRowLimit) {
                  const [chunk] = await db.executeSql(
                      `SELECT
                          SUBSTR(json, ${i}, ${databaseRowLimit}) AS data
                      FROM
                          wallet`
                  );

                  if (chunk && chunk.rows && chunk.rows.length === 1) {
                      result += chunk.rows.item(0).data;
                  }
              }

              return [ result, undefined ];
          }
      }

      [data] = await db.executeSql(
          `SELECT
              json
          FROM
              wallet
          ORDER BY
              id ASC`
      );

      if (data && data.rows && data.rows.length >= 1) {
          const len = data.rows.length;

          let result = '';

          for (let i = 0; i < len; i++) {
              result += data.rows.item(i).json;
          }
          

          return [ result, undefined ];
      }
  } catch (err) {
      return [ undefined, err ];
  }

  return [ undefined, 'Wallet not found in database!' ];
}
  
  const deleteAllData = async () => {
    try {
      const results = await db.executeSql('DELETE FROM rooms');
      console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

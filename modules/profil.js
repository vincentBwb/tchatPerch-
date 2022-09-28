const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";


// reconnaitre l utilisateur 
// afficher ses données dans les champs
// verfier qu il ne fait pas d erreur : champs vide, mauvaise adresse mail 
// l user confirme les changements 
// remonter les changements dans la base de données, maj du profil
// changement réussi...

exports.changeProfil = function (req, res, mc, url, formidable) {
  //recupérer les données du formulaire
  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    query = { username: fields.username};

    getNumOfDocs(url, "tchatperche", "users", query, function (err, count) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Records count: ${count}`);

      //user existe et que le mot de passe concorde, donc il se connecte au /lobby
      if (count > 0) {
        
        console.log("pas possible");
      }
      //user existe pas il restera sur la meme page et une erreur apparaitra 
      else {
        /* monObjet = {
            email: fields.email,
            username: fields.username,
            password: fields.password
        };
 */
        mc.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("tchatperche");
            dbo.collection("users").insertOne(monObjet, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
        console.log("changements reussi");
      }
    });
  });
};

function getNumOfDocs(url, dbName, collectionName, query, callback) {
  MongoClient.connect(url, function (error, db) {
    if (error) return callback(error);
    let dbo = db.db(dbName);

    dbo.collection(collectionName).count(query, function (error, numOfDocs) {
      if (error) return callback(error);
      db.close();
      callback(null, numOfDocs);
    });
  });
}

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  // on rechercher souvent par l id .. permet de selectionner un document, on change ensuite ses propriétés et meme en rajouter dans ma nouvelle valeur 
  var myquery = { username: fields.username };
  // ma nouvelle valeur je veux remplacer la ou l adresse est valleyy 345 , le nom mickey et l adresse canyon 123
  // si je veux changer que l adresse je set que l adresse 
  var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    // je peux retourner result 
    console.log(result);
    db.close();
  });
})
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

exports.loginUser = function (req, res, mc, url, formidable) {
  //recupérer les données du formulaire
  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    query = { username: fields.username, password: fields.password };

    getNumOfDocs(url, "tchatperche", "users", query, function (err, count) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Records count: ${count}`);

      //user existe et que le mot de passe concorde, donc il se connecte au /lobby
      if (count > 0) {
        res.redirect("/lobby")
        console.log("Authentication réussie");
      }
      //user existe pas il restera sur la meme page et une erreur apparaitra 
      else {
        res.redirect("/login2")
        console.log("Authentication non réussie");
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

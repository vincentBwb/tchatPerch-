var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.createUser = function (req, res, mc, url, formidable, ) {
 
  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    query = { username: fields.username };

    monObjet = {
      email: fields.email,
      username: fields.username,
      password: fields.password
    };

    getNumOfDocs(url, "tchatperche", "users", query, function (err, count) {
      
      if (err) {
        return console.log(err.message);
      }
      console.log(`Records count: ${count}`);

      //user existe
      if (count > 0) {

        res.redirect("/signin2")


      } 
      //user existe pas
      else {
        mc.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("tchatperche");
          dbo.collection("users").insertOne(monObjet, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });

          dbo.collection("users_connectés").insertOne(monObjet, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });


        });
        res.redirect("/")
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

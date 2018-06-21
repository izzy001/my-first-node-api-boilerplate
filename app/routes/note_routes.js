/**Using the CRUD Routes
 * to CREATE a note, to READ your notes, to UPDATE a note, and to DELETE a note.
 * 
 */

 //Start with the C in CRUD- create
 //How would you create a note?
 /** 
  * Well, before you do that, you have to build a bit more infrastructure.
  * In Express, routes are wrapped in a function,
  * which takes the Express instance and a database as arguments.
 */

var ObjectID = require('mongodb').ObjectID;


 module.exports = function(app, db) {
     //READ route
     app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id) };
        db.collection('notes').findOne(details, (err,item) => {
            if (err) {
                res.send({'error' : 'An error has occured'});
            } else {
                res.send(item);
            }
        });
     });

     //CREATE route
    app.post('/notes', (req, res) => {
        //You'll create your note here.
        const note = { text: req.body.body, title:req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error' : 'An error has occured' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    //DELETE route
    app.delete('/notes/:id', (req, res) => {
        const id =  req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error' : 'An error has occured'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    
    //UPDATE route
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send ({'error': 'An error has occured'});
            } else {
                res.send(note);
            }
        });
    });

 };
 
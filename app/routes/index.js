const noteRoutes = require('./note_routes');

//export route for use.
module.exports = function(app, db) {
    noteRoutes(app, db);
    //Other route groups could go here in future
};
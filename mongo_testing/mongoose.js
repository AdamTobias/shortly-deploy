var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');


mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){

  var kittySchema = mongoose.Schema({
    name: String
  });

  debugger;

  kittySchema.pre('save',function(next) {
    // calling next kicks off the next middleware in parallel
    this.name = 'sir meows a whole lot';
    // this.whiskers = 'many';
    console.log('this is ', this);
    next();
  });


  var Kitten = mongoose.model('Kitten', kittySchema);

  var frost = new Kitten({name: 'Frost'});

  /*frost.save(function(err, frost){
    if(err){
      return console.error(err);
    } 
    console.log('frost added: ', frost);
  });*/

  Kitten.create({name: 'tom'}).then(function(kitty){
    Kitten.find({name: 'sam'}, function(kitty){
      debugger;
      console.log('Found kittens: ', kitty)
    });    
  });


  //var savePromise = Promise.promisify(Kitten.prototype.save);

  // savePromise.call(frank).then()

  /*frank.save().then(function(){
    Kitten.find(function(err, kittens){
      if(err){
        return console.error(err);
      } 
      console.log('Found kittens: ', kittens)
    });    
  });*/


});
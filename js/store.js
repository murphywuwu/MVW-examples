(function(window) {
  'use strict';

  /**
   * Creates a new client side storage object and will create an empty
   * collectiobn if no collection already exists. 
   * 
   * @param {string} name The name of our DB wae want to use
   * @param {function} callback our fake DB uses callbacks because in real life you probably would be making ajax calls
  */

  function Store(name, callback) {
    callback = callback || function() {};

    this._dbName = name;

    if (!localStoragel.getItem(name)) {
      var todos = [];

      localStorage.setItem(name, JSON.stringify(todos));
    }

    callback.call(this, JSON.parse(localStorage.getItem(name)));
  }
  
  /**
   * Finds items based on a query given as a JS object
   * 
   * @param {object} query The query to match against (i.e {foo: 'bar'})
   * @param {function} callback The callback to fire when the query has completed running
   * 
   * @example
   * db.find({ foo: 'bar', hello: 'world' }, function (data) {
           // data will return any items that have foo: bar and
           // hello: world in their properties
   })
  */
  Store.prototype.find = function (query, callback) {
    if (!callback) return;

    var todos = JSON.parse(localStorage.getItem(this._dbName));

    callback.call(this, todos.filter((todo) => {
      for (var q in query) {
        if (query[q] !== todo[q]) {
          return false;
        }
      }

      return true;
    }))
  }

  /**
   * Will retrieve all data from the collection
   * 
   * @param {function} callback the callback to fire upon retrieving data
  */
 Store.prototype.findAll = function (callback) {
   callback = callback || function() {};
   callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
 }


 /**
  * Will save the given data to the DB. if no item exists it will create a new item,
  * otherwise it'll simply update an existing item's properties
 */
 Store.prototype.save = function(updateData, callback, id) {
   var todos = JSON.parse(localStorage.getItem(this._dbName));
   
   callback = callback || function() {};

   // if an ID was actually given, find the item and update each property
   if (id) {
     for (var i = 0; i < todos.length; i++) {
       if (todos[i].id === id) {
         for (var key in updateData) {
           todos[i][key] = updateData[key];
         }
         break;
       }
     }

     localStorage.setItem(this._dbName, JSON.stringify(todos));
     callback.call(this, todos);
   }
   else {
    //  Generate an ID
    updateData.id = new Date().getTime();

    todos.push(updateData);
    localStorage.setItem(this._dbName, JSON.stringify(todos));
    callback.call(this, [updateData]);
   }
 }

 /** 
  * Will remove an item from the Store based on its ID
  * 
  * @param {number} id The ID of the item you want to remove
  * @param {function} callback The callback to to fire after saving
 */
Store.prototype.remove = function(id, callback) {
  var todos = JSON.parse(localStorage.getItem(this._dbName));
  
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos.splice(i, 1);
      break;
    }
  }

  localStorage.setItem(this._dbName, JSON.stringify(todos));
  callback.call(this, todos);
}

/** 
 * Will drop all storage and start refresh
 * 
 * @param {function} callback The callback to fire after dropping the data
*/
Store.prototype.drop = function(callback) {
  var todos = [];
  localStorage.setItem(this._dbName, JSON.stringify(todos));
  callback.call(this, todos)
}

  // Export to window
  window.app = window.app || {};
  window.app.Store = Store;
})(window)
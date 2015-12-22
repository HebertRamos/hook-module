# hook-module
Module hooks provider to use in a application. Inspired in wordpress hooks.


## How to use
```
   hookModule.add_action('my_hook', function(params){
        console.log('do something here');
   });

   hookModule.add_action('my_hook', function(params){
           console.log('do some stuff here');
   });
```
In other space
```
   var some_params = {};
   hookModule.do_action('my_hook', some_params);
```
And will output
```
> do something here
> do some stuff here
```

## Promises
hook-module work all time with angular promises, so if your hook function make some thing async you can return a promise.

```
    hookModule.add_action('my_hook', function(params){
         var deffered = $q.defer();

         $http.get('my_url_service')
          .success(function (response) {
            deffered.resolve(response);
          })
          .error(function (err) {
            deffered.reject(err);
          });
        return deffered.promise;
   });
```

## Run Unit test
```
bower install
npm install

grunt karma
```

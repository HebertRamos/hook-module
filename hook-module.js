/**
 * Module to provide hooks.
 */
define(['angular'], function (angular) {

    var self = {};
    var $q_;


    angular.injector(['ng']).invoke(['$q', function ($q) {
        $q_ = $q;
    }]);

    self.hooks_actions = [];

    /**
     * Function register hooks actions to trigger when is tag is called
     * @param tag
     * @param hookFunction
     * @returns {boolean}
     */
    self.add_action = function (tag, hookFunction) {

        if (!self.hooks_actions[tag]) {
            self.hooks_actions[tag] = [];
        }
        self.hooks_actions[tag].push(hookFunction);
        return true;
    };

    /**
     * Tigger the functions who was assigned to tag hook.
     * @param tag
     * @param params
     * @returns promise after all functions have yours resolutions
     */
    self.do_action = function (tag, params) {

        if (!self.hooks_actions.hasOwnProperty(tag)) {
            var deffered = $q_.defer();
            deffered.resolve();
            return deffered.promise;
        }

        if (self.hooks_actions[tag].length == 1) {
            var hookFunction = self.hooks_actions[tag][0];
            return do_single_action(hookFunction, params);
        }


        var deffered = $q_.defer();

        var promises = [];

        self.hooks_actions[tag].forEach(function (hookFunction) {
            promises.push(do_single_action(hookFunction, params));
        });

        call_next_resolution_promise(promises, 0, deffered);


        return deffered.promise;
    };

    /**
     * Do a sigle action and retur a promise if the action return a promise it is returned.
     * @param hookFunction
     * @param params
     * @returns {*}
     */
    function do_single_action (hookFunction, params) {
        var deffered;

        try {

            var returnHook = hookFunction(params);

            if (returnHook && returnHook.then) {
                return returnHook;
            }

            deffered = $q_.defer();
            deffered.resolve();

        } catch (e) {
            deffered = $q_.defer();
            deffered.reject(e);
        }

        return deffered.promise;
    }

    /**
     * Recursive function where all promises are handled, if some fails the master promise is rejected.
     * @param array_promise
     * @param index
     * @param defferedMaster
     */
    function call_next_resolution_promise (array_promise, index, defferedMaster) {
        var promise = array_promise[index];

        if (promise.catch) {
            promise
                .then(function () {
                    index++;
                    if (array_promise.length == index) {
                        defferedMaster.resolve();
                    } else {
                        call_next_resolution_promise(array_promise, index, defferedMaster);
                    }
                })
                .catch(function (err) {
                    defferedMaster.reject(err);
                });
        } else {
            promise
                .then(function () {
                    index++;
                    if (array_promise.length == index) {
                        defferedMaster.resolve();
                    } else {
                        call_next_resolution_promise(array_promise, index, defferedMaster);
                    }
                })
                .fail(function (err) {
                    defferedMaster.reject(err);
                });
        }
    }

    return self;
});

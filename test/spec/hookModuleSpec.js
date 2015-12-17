define(['jquery', './../../hook-module'], function (jquery, hookModule_) {

    describe('hookModuleSpec', function () {

        beforeEach(function(){
            hookModule_.hooks_actions = [];
        });

        describe('When add_action is called', function () {

            it(' passing one function must return true and add it in hooks_actions', function () {

                var my_hook = function () {
                };
                var hook_name = 'my_hook';

                var resp = hookModule_.add_action(hook_name, my_hook);

                expect(resp).toBeTruthy();
                expect(hookModule_.hooks_actions[hook_name][0]).toEqual(my_hook);
            });

            it('passing two functions with same tag must return true and add both in hooks_actions', function () {

                var my_hook1 = function () {
                };
                var my_hook2 = function () {
                };

                var hook_name = 'my_hook';

                var resp1 = hookModule_.add_action(hook_name, my_hook1);
                var resp2 = hookModule_.add_action(hook_name, my_hook2);

                expect(resp1).toBeTruthy();
                expect(resp2).toBeTruthy();

                expect(hookModule_.hooks_actions[hook_name][0]).toEqual(my_hook1);
                expect(hookModule_.hooks_actions[hook_name][1]).toEqual(my_hook2);
            });
        });

        describe('When do_action is called', function () {

            it('with a valid tag must call the function who was assigned', function (done) {
                var my_var = 1;
                var my_hook = function () {
                    my_var++;
                    return my_var;
                };
                var hook_name = 'my_hook';
                var resp1 = hookModule_.add_action(hook_name, my_hook);

                var my_var_return = hookModule_.do_action(hook_name);

                var my_var_expected = 2;

                my_var_return.then(function () {
                    expect(my_var).toEqual(my_var_expected);
                    done();
                });

            });

            it('with a valid tag must call the function who was assigned and call the obj passed by parameter', function (done) {
                var my_obj = {
                    my_var: 1,
                    add_var: function () {
                        this.my_var++;
                    }
                };
                var my_hook = function (obj) {
                    obj.add_var();
                };
                var hook_name = 'my_hook';
                var resp1 = hookModule_.add_action(hook_name, my_hook);

                var my_var_return = hookModule_.do_action(hook_name, my_obj);

                var my_var_expected = 2;

                my_var_return.then(function () {
                    expect(my_obj.my_var).toEqual(my_var_expected);
                    done();
                });
            });

            describe('with a valid tag was assigned to two or more hooks functions', function () {

                it('where one hook function return a promise and the other not', function (done) {
                    var my_var = 0;
                    var my_hook1 = function () {
                        ++my_var;
                        return;
                    };
                    var my_hook2 = function () {
                        var deffered = jquery.Deferred();
                        ++my_var;
                        deffered.resolve();
                        return deffered;
                    };

                    var hook_name = 'my_hook';

                    var resp1 = hookModule_.add_action(hook_name, my_hook1);
                    var resp2 = hookModule_.add_action(hook_name, my_hook2);

                    expect(resp1).toBeTruthy();
                    expect(resp2).toBeTruthy();

                    var my_var_return = hookModule_.do_action(hook_name);

                    var my_var_expected = 2;

                    my_var_return.then(function () {
                        expect(my_var).toEqual(my_var_expected);
                        done();
                    });


                });

                it('where a object is passed by parameter', function (done) {
                    var my_obj = {
                        my_var: 0,
                        add_var: function () {
                            this.my_var++;
                        }
                    };
                    var my_hook1 = function (obj) {
                        obj.add_var();
                        return;
                    };
                    var my_hook2 = function (obj) {
                        var deffered = jquery.Deferred();
                        obj.add_var();
                        deffered.resolve();
                        return deffered;
                    };

                    var hook_name = 'my_hook';

                    var resp1 = hookModule_.add_action(hook_name, my_hook1);
                    var resp2 = hookModule_.add_action(hook_name, my_hook2);

                    expect(resp1).toBeTruthy();
                    expect(resp2).toBeTruthy();

                    var my_var_return = hookModule_.do_action(hook_name, my_obj);

                    var my_var_expected = 2;

                    my_var_return.then(function () {
                        expect(my_obj.my_var).toEqual(my_var_expected);
                        done();
                    });

                });

                it('where some of promises from hooks functions is rejected', function (done) {
                    var my_obj = {
                        my_var: 0,
                        add_var: function () {
                            this.my_var++;
                        }
                    };

                    var obj_fail = {fail: 'fail'};

                    var my_hook1 = function (obj) {
                        var deffered = jquery.Deferred();
                        obj.add_var();
                        deffered.resolve();
                        return deffered;
                    };
                    var my_hook2 = function (obj) {
                        var deffered = jquery.Deferred();
                        obj.add_var();
                        deffered.reject(obj_fail);
                        return deffered;
                    };

                    var hook_name = 'my_hook';

                    var resp1 = hookModule_.add_action(hook_name, my_hook1);
                    var resp2 = hookModule_.add_action(hook_name, my_hook2);

                    expect(resp1).toBeTruthy();
                    expect(resp2).toBeTruthy();

                    var my_var_return = hookModule_.do_action(hook_name, my_obj);

                    var my_var_expected = 2;

                    my_var_return
                        .then(function () {
                            fail('must return on catch');
                            done();
                        })
                        .catch(function (err) {
                            expect(err).toEqual(obj_fail);
                            done();
                        });

                });

                it('where some of promises from hooks thow an Error', function (done) {
                    var my_obj = {
                        my_var: 0,
                        add_var: function () {
                            this.my_var++;
                        }
                    };

                    var obj_fail = {fail: 'fail'};

                    var my_hook1 = function (obj) {
                        throw obj_fail;
                        return;
                    };
                    var my_hook2 = function (obj) {
                        var deffered = jquery.Deferred();
                        obj.add_var();
                        deffered.resolve();
                        return deffered;
                    };

                    var hook_name = 'my_hook';

                    var resp1 = hookModule_.add_action(hook_name, my_hook1);
                    var resp2 = hookModule_.add_action(hook_name, my_hook2);

                    expect(resp1).toBeTruthy();
                    expect(resp2).toBeTruthy();

                    var my_var_return = hookModule_.do_action(hook_name, my_obj);

                    var my_var_expected = 2;

                    my_var_return
                        .then(function () {
                            fail('must return on catch');
                            done();
                        })
                        .catch(function (err) {
                            expect(err).toEqual(obj_fail);
                            done();
                        });

                    
                });

            });

            it('with an invalid tag do am ampty and resolved promise', function (done) {
                var hook_name = 'invalid_hook';
                    hookModule_
                    .do_action(hook_name).then(function(){
                        expect(1).toEqual(1);
                        done();
                    }).catch(function(err){
                        fail('fail');
                    });
            });

        });

    });
});

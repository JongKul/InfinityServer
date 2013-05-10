/**
 * Created with JetBrains WebStorm.
 * User: JK
 * Date: 12. 12. 4
 * Time: 오후 1:42
 * To change this template use File | Settings | File Templates.
 */


var Memcached = require('memcached');


var oneDay = 86400;


module.exports = function(connect){

    /**
     * Connect's Store.
     */

    var Store = connect.session.Store;

    /**
     * Initialize MemcachedStore with the given `options`.
     *
     * @param {Object} options
     * @api public
     */


    function MemcachedStore(options) {
        this.client = options;
        /*
        if( options ==  'function' )
        {

        }

        else {
            options = options || {};
            Store.call(this, options);
            if (!options.hosts) {
                options.hosts = '127.0.0.1:11211';
            }
            this.client = new Memcached(options.hosts, options);
        }
        */
        this.client.on("issue", function(issue) {
            console.log("MemcachedStore::Issue @ " + issue.server + ": " +
                issue.messages + ", " + issue.retries  + " attempts left");
        });
    };

    /**
     * Inherit from `Store`.
     */

    MemcachedStore.prototype.__proto__ = Store.prototype;

    /**
     * Attempt to fetch session by the given `sid`.
     *
     * @param {String} sid
     * @param {Function} fn
     * @api public
     */

    MemcachedStore.prototype.get = function(sid, fn) {
        var self = this;
        self.client.get(sid, function(err, data) {
            try {
                if (!data) {
                    return fn();
                }
                var data =  JSON.parse(data.toString());

                if(data.selected != true) {
                    data.selected = true;
                    data.selectedIndex++;
                    console.log("start :"  + data.selectedIndex);
                    var sessString = JSON.stringify(data);
                    self.client.set(sid, sessString,oneDay ,function(err) {
                        fn(null,data);
                    });
                }
                else {
                    setTimeout(function()
                        {
                            console.log("occured time Out" +   data.selectedIndex);
                            self.get(sid,fn);
                        }
                    )
                }
            } catch (err) {
                fn(err);
            }
        });
    };

    /**
     * Commit the given `sess` object associated with the given `sid`.
     *
     * @param {String} sid
     * @param {Session} sess
     * @param {Function} fn
     * @api public
     */

    MemcachedStore.prototype.set = function(sid, sess, fn) {
        var self = this;
        try {
            var maxAge = sess.cookie.maxAge
            var ttl = 'number' == typeof maxAge ? maxAge / 1000 | 0 : oneDay
            sess.selected = false;
            console.log("end :"  + sess.selectedIndex);
            var sessString = JSON.stringify(sess);


            self.client.set(sid, sessString , ttl, function() {
                fn && fn.apply(this, arguments);
            });
        } catch (err) {
            fn && fn(err);
        }
    };

    /**
     * Destroy the session associated with the given `sid`.
     *
     * @param {String} sid
     * @api public
     */

    MemcachedStore.prototype.destroy = function(sid, fn) {
        this.client.del(sid, fn);
    };

    /**
     * Fetch number of sessions.
     *
     * @param {Function} fn
     * @api public
     */

    MemcachedStore.prototype.length = function(fn) {
        this.client.items(fn);
    };

    /**
     * Clear all sessions.
     *
     * @param {Function} fn
     * @api public
     */

    MemcachedStore.prototype.clear = function(fn) {
        this.client.flush(fn);
    };

    return MemcachedStore;
};
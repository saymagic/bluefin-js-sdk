/*
 * Bluefin JavaScript SDK
 * The Bluefin JavaScript SDK is distributable under the GPL license.
 */
(function (root) {

    root.Bluefin = root.Bluefin || {};

    Bluefin.VERSION = '0.0.1';

    Bluefin.PING_PATH = "/api/v1/ping";

    Bluefin.LIST_ALL_APK_PATH = "/api/v1/apks";

    Bluefin.RETRACE_PATH = "/api/v1/{0}/{1}/mapping/";

    Bluefin.init = function(serverUrl){
        Bluefin._init(serverUrl);
    }

    Bluefin.ping = function(){
        return Bluefin._fetch(Bluefin._getPingPath());
    }

    Bluefin.listAllVersion = function() {
        return Bluefin._fetch(Bluefin._getListAllApkPath());
    }

    Bluefin.retrace = function(package, id){
        return Bluefin._fetch(Bluefin.getRetracePath(package, id));
    }

    //function below only belong to bluefin self. third part should not call.
    Bluefin._init = function(serverUrl){
        if(serverUrl === undefined){
            throw "server url is undefined!";
        }
        if(serverUrl.endsWith("/")){
            serverUrl = serverUrl.substring(0, serverUrl.lengths - 1);
        }
        Bluefin.serverUrl = serverUrl;
    }

    Bluefin._fetch = function(url, options){
        return fetch(url, options);
    }

    Bluefin._getPingPath = function(){
        Bluefin._checkServerUrl();
        return Bluefin.serverUrl + Bluefin.PING_PATH;
    }

    Bluefin._getListAllApkPath = function(){
        Bluefin._checkServerUrl();
        return Bluefin.serverUrl + Bluefin.LIST_ALL_APK_PATH;
    }

    Bluefin.getRetracePath = function(package, id){
        Bluefin._checkServerUrl();
        return Bluefin.serverUrl + Bluefin.RETRACE_PATH.bluefinformat(package, id);
    }

    Bluefin._checkServerUrl = function(){
        if(Bluefin.serverUrl === undefined){
            throw "server url is undefined!";
        }
    }

    String.prototype.bluefinformat = String.prototype.bluefinformat || function()
    {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function(m,i){
                return args[i];
        });
    }
}(this));

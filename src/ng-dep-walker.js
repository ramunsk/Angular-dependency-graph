(function(){

    'use strict';

    var appModuleName,
        allModules = {},
        memberTypes = {
            '$provideservicce': 'service',
            '$provideprovider': 'provider',
            '$providevalue': 'value',
            '$providefactory': 'factory',
            '$provideconstant': 'constant',
            '$compileProviderdirective': 'directive',
            '$filterProviderregister': 'filter',
            '$controllerProviderregister': 'controller',
            
            
        };
        
    // "$provide": {
    //     "service": null,
    //     "provider": null,
    //     "value": null,
    //     "factory": null,
    //     "constant": null
    // },
    // "$compileProvider": {
    //     "directive": null
    // },
    // "$filterProvider": {
    //     "register": null
    // },
    // "$controllerProvider": {
    //     "register": null
    // }

    function log(obj){
        console.log(JSON.stringify(obj, null, 4));
    }

    function scanModule(appModuleName){
        var module,
            moduleInfo;
        
        module = angular.module(appModuleName);
        allModules[module.name] = moduleInfo = {
            requires: module.requires
        };
        
        module.requires.forEach(function(req){
           scanModule(req); 
        });
        
        moduleInfo.members = scanModuleMembers(module.name);
    }

    function scanModuleMembers(moduleName){
        return angular.module(moduleName)._invokeQueue.map(function(qi){
            var deps = qi[2][1];
            if (Array.isArray(deps)) {
                deps = deps.slice(0, deps.length - 2)
            } else {
                deps = null;
            }
            return {
                name: qi[2][0],
                type: getMemberType(qi[0],qi[1]),
                dependencies: deps
            };
        });
    }
    
    function getMemberType (m1, m2){
        return memberTypes[m1 + m2];
    }


    var node = document.querySelector('[data-ng-app]');
    appModuleName = node.getAttribute('data-ng-app');

    //var appModule = getModuleInfo(appModuleName);

    scanModule(appModuleName);

    //log(allModules);
    console.log(allModules);
    
  






})();

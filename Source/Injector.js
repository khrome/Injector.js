var Injector = function(){};
Injector.count = 0;
Injector.global = this;
Injector.find = function(functionBody, scope, stack){
    if(!stack) stack = [];
    if(!scope) scope = this.global;
    if(scope == functionBody) return stack.join('.');
    Injector.count++;
    var thisOne;
    var thisAddy;
    if(!scope.marked) for(name in scope){
        thisAddy = stack.slice(0);
        thisAddy.push(name);
        thisOne = this.find(functionBody, scope[name], thisAddy);
        if(typeof thisOne == 'string') return thisOne;
        if(thisOne == false) continue;
        return thisAddy.join('.');
    }
    scope.marked = true;
    return false;
}
Injector.push = function(target, code, func, position){
    if(!position) position = 'top';
    var functionBodyText = func.toString().trim();
    if(position == 'top'){
        if(functionBodyText.substr(0, 8) == 'function' ){
            var function_start = functionBodyText.indexOf('{');
            functionBodyText = functionBodyText.substr(0, function_start+1)+' '+code+' '+functionBodyText.substr(function_start+1);
            eval(''+target+' = '+functionBodyText);
        }
    }
}
if(!Function.injectCode){
    Function.prototype.injectCode = function injectCode(code, callback, position){
            if(!position) position = 'top';
            var location = Injector.find(this);
            var env = this;
            //unlink from the current thread so the VM doesn't freak out when you replace the currently executing function
            setTimeout(function(){Injector.push(location, code, env, position); callback();},1);
        };
}
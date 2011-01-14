var FBDummy = function(){};
FBDummy.prototype.explosive_awesomness = function(something){
    console.log(something);
}
console.log(FBDummy.prototype.explosive_awesomness);
var something = new FBDummy();
something.explosive_awesomness.injectCode('console.log("something");', function(){
    something = new FBDummy();
    something.explosive_awesomness('blah');
    console.log(FBDummy.prototype.explosive_awesomness);
});
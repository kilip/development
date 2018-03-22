var i=0;
for(var i=0;i<=siapResources.length;i++){
    if(i===siapResources.length){
        document.getElementById('app-load').hidden = true;
    }else{
        var entry = siapResources[i];
        head.load(entry);
    }
}
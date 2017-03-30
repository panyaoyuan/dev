var imageBlod='';

var input = document.getElementById("inputImg");
var imageType = /image.*/;



input.addEventListener('change',readFile,false);

function readFile(){
    var file = input.files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("Please take a picture！");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        var img=new Image();
        img.src=this.result;
      
        if(img.height==0){
            readFile();
        }
        imageBlod=getBase64Image(img);
        $('#upLoadPicture').text($('#inputImg').val());
        //$('body').append(img);
    }
}

function getBase64Image(img){
    var canvas=document.createElement("canvas");
    var rate=800/img.width;
    var chanageHeight=img.height*rate;
    
    canvas.width=800;
    canvas.height=chanageHeight;
   
    var ctx=canvas.getContext("2d");
    ctx.drawImage(img,0,0,800,chanageHeight);
    var ext=img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL=canvas.toDataURL("image/jpeg");
    return dataURL;
}

function convertBase64UrlToBlob(urlData){
    
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
}



/**
 * jGrayScale v1.0.4
 * Volkan ŞENGÜL
 * http://volkansengul.com
 */
jQuery.fn.jGrayScale=function(options){
    var settings = jQuery.extend({color:false,effect:"normal"},options);

    if (settings.color){
        if (settings.effect=="fade"){
            $(this).animate({opacity:0.7},200,function(){
                $(this).css("filter","progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)").attr("src",$(this).attr("rel")).animate({opacity:1},200);
            });
        } else {
            $(this).attr("src",$(this).attr("rel")).css("filter","progid:DXImageTransform.Microsoft.BasicImage(grayScale=0)");
        }
    } else {
        this.each(function(){
            var canvas=document.createElement('canvas');
            var canvasContext=canvas.getContext('2d');
            var imgW=$(this).width();
            var imgH=$(this).height();
            canvas.width=imgW;
            canvas.height=imgH;
            canvasContext.drawImage($(this)[0],0,0);
            var imgPixels=canvasContext.getImageData(0,0,imgW,imgH);
            for(var y=0; y<imgPixels.height; y++){
                for(var x=0; x<imgPixels.width; x++){
                    var i=(y*4)*imgPixels.width+x*4;
                    var avg=(imgPixels.data[i]+imgPixels.data[i+1]+imgPixels.data[i+2])/3;
                    imgPixels.data[i]=avg;
                    imgPixels.data[i+1]=avg;
                    imgPixels.data[i+2]=avg;
                }}
            canvasContext.putImageData(imgPixels,0,0,0,0,imgPixels.width,imgPixels.height);

            if (settings.effect=="fade"){
                $(this).animate({opacity:0.7},200,function(){
                    $(this).attr("rel",$(this).attr("src"));
                    $(this).css("filter","progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)").attr("src",canvas.toDataURL()).animate({opacity:1},200);
                });
            } else {
                $(this).attr("rel",$(this).attr("src"));
                $(this).css("filter","progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)").attr("src",canvas.toDataURL());}
        });
    }
}
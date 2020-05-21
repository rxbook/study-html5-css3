var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');
//初始化设置
cxt.lineWidth=3;
cxt.strokeStyle="#000";
var flag=0;
var startX;
var endX;
var startY;
var endY;
//默认画笔工具

		
//设置按钮组
var Save=document.getElementById('save');
var Clear=document.getElementById('clear');
var Brush=document.getElementById('brush');
var Eraser=document.getElementById('eraser');
var Paint=document.getElementById('paint');
var Straw=document.getElementById('straw');
var Text=document.getElementById('text');
var Magnifier=document.getElementById('magnifier');
var Line=document.getElementById('line');
var Arc=document.getElementById('arc');
var Rect=document.getElementById('rect');
var Poly=document.getElementById('poly');
var ArcFill=document.getElementById('arcFill');
var RectFill=document.getElementById('rectFill');
var actions=[Save,Clear,Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,ArcFill,RectFill]
//设置属性组
var Width_1=document.getElementById('width_1');
var Width_3=document.getElementById('width_3');
var Width_5=document.getElementById('width_5');
var Width_8=document.getElementById('width_8');
var lineWidths=[Width_1,Width_3,Width_5,Width_8];
//设置颜色组
var red=document.getElementById('red');
var green=document.getElementById('green');
var blue=document.getElementById('blue');
var yellow=document.getElementById('yellow');
var white=document.getElementById('white');
var black=document.getElementById('black');
var pink=document.getElementById('pink');
var purple=document.getElementById('purple');
var cyan=document.getElementById('cyan');
var orange=document.getElementById('orange');
var colors=[red,green,blue,yellow,white,black,pink,purple,cyan,orange];
brush(3);
//按钮状态改变方法
function selectStatus(array,num,style){
	for(var i=0;i<array.length;i++){
		if(i==num){
			if(style==1){
				array[i].style.background='yellow';
			}else{
				array[i].style.border='1px solid #fff';
			}
			
		}else{
			if(style==1){
				array[i].style.background='#ccc';
			}else{
				array[i].style.border='1px solid #000';
			}
			
		}
	}
}

//保存图片
function saveas(num){
	//alert(111111111111);
	var data=canvas.toDataURL();
	var b64 = data.substring( 22 );  
	var imgdata=document.getElementById('imgdata');
	imgdata.value=b64;
	//alert(imgdata.value);
	//alert(b64);
	var form=document.getElementById('form');
	form.submit(); 
	
}
//清除画布
function clearAll(num){
	selectStatus(actions,num,1);
	cxt.clearRect(0,0,800,400);
	canvas.onmousedown=null;
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
//画笔工具
function brush(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			flag=1;
			//alert(mouseX+'——————————————'+mouseY);
			cxt.closePath();
			cxt.beginPath();
			cxt.moveTo(startX,startY); //起始位置
	}
		
	canvas.onmousemove=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			
			if(flag){
				cxt.lineTo(endX,endY);
				cxt.stroke();
				
			 }
	}
		
	canvas.onmouseup=function(evt){
			flag=0;
	}
	canvas.onmouseout=function(evt){
			flag=0;
	}
}
//橡皮工具
function eraser(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			flag=1;
			cxt.clearRect(startX-cxt.lineWidth,startY-cxt.lineWidth,cxt.lineWidth,cxt.lineWidth);
			
	}
		
	canvas.onmousemove=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			
			if(flag){
				cxt.clearRect(endX-cxt.lineWidth,endY-cxt.lineWidth,cxt.lineWidth,cxt.lineWidth);	
			}
	}
		
	canvas.onmouseup=function(evt){
			flag=0;
	}
	canvas.onmouseout=function(evt){
			flag=0;
	}
}
//油漆桶工具
function paint(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(){
		cxt.fillRect(0,0,800,400);
	}
	
}
//吸管工具
function straw(num){
	selectStatus(actions,num,1);
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
	canvas.onmousedown=function(evt){
		evt=evt?evt:window.event;
		X = evt.pageX - this.offsetLeft;
		Y = evt.pageY - this.offsetTop; 
		var imageData=cxt.getImageData(X,Y,1,1);
		//alert(imageData.data);
		var pxData=imageData.data;
		//alert(pxData);
		var color='rgba('+pxData[0]+','+pxData[1]+','+pxData[2]+','+pxData[3]+')';
		//alert(color);
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
	}
}
//文本工具
function text(num){
	selectStatus(actions,num,1);
	
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
	canvas.onmousedown=function(evt){
		evt=evt?evt:window.event;
		startX = evt.pageX - this.offsetLeft;
		startY = evt.pageY - this.offsetTop; 
		var content=window.prompt('请输入你的名字','');
		if(content){
			cxt.fillText(content,startX,startY);
		}
		
	}
}
//放大镜工具
function magnifier(num){
	selectStatus(actions,num,1);
	var scale=window.prompt('请输入缩放的倍数百分比','');
	var scaleX=780*scale/100;
	var scaleY=380*scale/100;
	canvas.style.width=parseInt(scaleX)+'px';
	canvas.style.height=parseInt(scaleY)+'px';
}
//画线工具
function line(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			cxt.closePath();
			cxt.beginPath();
			cxt.moveTo(startX,startY); //起始位置
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.lineTo(endX,endY);
			cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
	
	
}
//画圆圈工具
function arc(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			cxt.closePath();
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.arc(startX,startY,Math.sqrt(Math.pow((endX-startX),2)+Math.pow((endY-startY),2)),0,360,false);
			cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//画方框
function rect(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.strokeRect(startX,startY,endX-startX,endY-startY);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//画三角形
function poly(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.moveTo(endX,endY);
			cxt.lineTo(startX-(endX-startX),endY);
			cxt.lineTo(startX,startY-Math.sqrt(Math.sqrt(endX-startX,2)+Math.sqrt(endY-startY,2)));
			cxt.closePath();
			cxt.stroke();
			
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//画圆形
function arcFill(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			cxt.closePath();
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.arc(startX,startY,Math.sqrt(Math.pow((endX-startX),2)+Math.pow((endY-startY),2)),0,360,false);
			cxt.fill();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//画矩形
function rectFill(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.fillRect(startX,startY,endX-startX,endY-startY);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//设置线宽
function setWidth(num){
	selectStatus(lineWidths,num,1);
	switch(num){
		case 0:
			cxt.lineWidth=1;
			break;
		case 1:
			cxt.lineWidth=3;
			break;
		case 2:
			cxt.lineWidth=5;
			break;
		case 3:
			cxt.lineWidth=8;
			break;
		default:
			alert('滚犊子');
	}
	//alert(cxt.lineWidth);
}
//设置颜色
function setColor(obj,num){
	selectStatus(colors,num);
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
}
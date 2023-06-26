document.onmousemove=locate;
var xpos,ypos,wxpos,click=0,score;
var element;
var county=new Map([
	["new_taipei",0],
	["taipei",0],
	["taoyuan",0],
	["taichung",0],
	["tainan",0],
	["kaohsiung",0],
	["keelung",0],
	["hsinchu_city",0],
	["chiayi_city",0],
	["hsinchu",0],
	["miaoli",0],
	["changhua",0],
	["nantou",0],
	["yunlin",0],
	["chiayi",0],
	["pingtung",0],
	["taitung",0],
	["hualien",0],
	["yilan",0],
	["penghu",0],
	["kinmen",0],
	["lienchiang",0],
]);
function rLocate(){
	xpos=event.clientX-50;
	ypos=event.clientY-70;
	document.getElementById("tooltip").setAttribute("style","left:"+xpos+"px;top:"+ypos+"px;");
}
function locate(event){
	if(click)return;
	rLocate();
}
function rHover(){
	document.getElementById("tooltip").innerHTML=element.outerHTML.substr(element.outerHTML.search("name")+6,3);
	document.getElementById("tooltip").removeAttribute("hidden");
}
function rLeave(){
	document.getElementById("tooltip").setAttribute("hidden","");
	document.getElementById("selection").setAttribute("hidden","");
}
function onHover(obj){
	if(click)return;
	element=obj;
	rHover();
}
function onLeave(obj){
	if(click)return;
	rLeave();
}
function onClick(obj){
	if(click==2)return;
	if(click==1){
		offClick();
		onLeave(obj);
		document.getElementById("tooltip").setAttribute("style","left:"+xpos+"px;top:"+ypos+"px;");
	}
	onHover(obj);
	click=2;
	wxpos=xpos+110;
	document.getElementById("selection").setAttribute("style","left:"+wxpos+"px;top:"+ypos+"px;");
	document.getElementById("selection").removeAttribute("hidden");
}
window.addEventListener("click",function(e){
	console.log(click);
	if(click==2)click--;
	else if(click){
		if(document.getElementById("selection").contains(e.target))offClick();
		else{
			click=0;
			if(document.getElementById(element.id).contains(e.target)){
				onClick(document.getElementById(element.id));
			}
			else{
				rLeave();
			}
		}
	}
});
function offClick(){
	document.getElementById("selection").setAttribute("hidden","");
	rLeave();
	rLocate();
	click=0;
}
function color(c){
	for(var i=0;i<5;i++){
		document.getElementById(element.id).classList.remove("lv"+i);
	}
	document.getElementById(element.id).classList.add("lv"+c);
	county.set(element.id,c);
	score=0;
	for(var v of county.values()){
		score+=v;
	}
	document.getElementById("score").innerHTML=score;
}
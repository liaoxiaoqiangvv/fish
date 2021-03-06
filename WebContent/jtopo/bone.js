//文本换行函数
	CanvasRenderingContext2D.prototype.wrapText = function(str,x,y){
	    var textArray = str.split('\n');
	    if(textArray==undefined||textArray==null)return false;

	    var rowCnt = textArray.length;
	    var i = 0,imax  = rowCnt,maxLength = 0;maxText = textArray[0];
	    for(;i<imax;i++){
	        var nowText = textArray[i],textLength = nowText.length;
	        if(textLength >=maxLength){
	            maxLength = textLength;
	            maxText = nowText;
	        }
	    }
	    var maxWidth = this.measureText(maxText).width;
	    var lineHeight = this.measureText("元").width;
	    x-= lineHeight*2;
	    for(var j= 0;j<textArray.length;j++){
	        var words = textArray[j];
	        this.fillText(words,-(maxWidth/2),y-textArray.length*lineHeight/2);
	        y+= lineHeight;
	    }
	};
	//定义画布、舞台以及场景
var canvas = document.getElementById('canvas');//获取画布id

var stage = new JTopo.Stage(canvas);//在画布上新建舞台
     stage.wheelZoom = 0.85
var scene = new JTopo.Scene(stage);//将舞台添加到场景中
scene.background = './images/background.jpg';//设置背景图片

//绘制鱼头
var fishBrain = new JTopo.Node();
fishBrain.text = '待解决问题';// 文字
fishBrain.id = "10";
fishBrain.textPosition = 'Middle_Center';// 文字居中
fishBrain.textOffsetY =-8;
fishBrain.font = '18px 微软雅黑';// 字体
fishBrain.fontColor = "0,0,0";
fishBrain.setLocation(800, 320);// 位置
fishBrain.setSize(180, 60);// 尺寸
fishBrain.borderRadius = 10;// 圆角
fishBrain.borderWidth = 2;// 边框的宽度
fishBrain.fillColor = '255,222,173';//边框颜色
 fishBrain.dragable = false;
fishBrain.layout = {type: 'tree'}
scene.add(fishBrain);
var aa = fishBrain.getBound();
//console.log(aa);

/**
 * 绘制鱼身函数
 */
function mainBone(mainNode){
    var link = new JTopo.Link(fishBrain, mainNode);
    link.lineWidth = 3;
    link.strokeColor = '0,0,0';
    scene.add(link);
    return link;
}

/**
 * 定义六个主骨的位置
 */

function IniLine(x1, y1, x2, y2, text){
	
	var pointNode = new JTopo.Node(); 
	pointNode.id = text;
	pointNode.setLocation(x1, y1);
	pointNode.setSize(1, 1);
	pointNode.layout = {type: 'tree'}
	scene.add(pointNode);
	mainBone(pointNode);

    //定义六个相关节点的信息
    var subNode = new JTopo.Node();
    if (y2>350){
        subNode.setLocation(x2+100, y2-198);
        subNode.rotate = -1.2;
    }else{
        subNode.setLocation(x2+92, y2+198);
        subNode.rotate = 1.2;
    }
    subNode.id = text;
    subNode.text = text;// 文字
    subNode.textPosition = 'Middle_Center';// 文字居中
    subNode.textOffsetY =-8;
    subNode.font = '16px 微软雅黑';// 字体
    subNode.fontColor = "0,0,0";
    subNode.setSize(80, 30);// 尺寸
    subNode.borderRadius = 10;// 圆角
    subNode.borderWidth = 2;// 边框的宽度
    subNode.fillColor = '0,191,255';//填充颜色
    subNode.dragable = false;
    subNode['endx'] = 0;
    subNode['endy'] = 0;
    // subNode.dragable = false;
    scene.add(subNode);
    //连线
    if(y2<350){
        var link = new JTopo.FlexionalLink(pointNode, subNode,null,[0, 0, 0, 0, 0, 0, 0, 0]);
    }else{
        link = new JTopo.FlexionalLink(pointNode, subNode,null,[0, 0, 0, 0, 0, 0, 0, 0]);
    }
    link.direction = 'horizontal' || 'horizontal';
    link.lineWidth = 1;
    link.strokeColor = '0,0,0';
    scene.add(link);
    return [link, subNode, pointNode];
}
//人员
var manNodeLink= IniLine(150, 350, 0, 575, "人员");
var manNode = manNodeLink[2];
var bigMan = manNodeLink[1];
manNodeLink[0];
//机器
var machineNodeLink= IniLine(270, 350, 130, 95, "机器");
var machineNode = machineNodeLink[2];
var bigMachine = machineNodeLink[1];
machineNodeLink[0];
//材料
var materialNodeLink= IniLine(390, 350, 240, 575, "材料");
var materialNode = materialNodeLink[2];
var bigMaterial = materialNodeLink[1];
materialNodeLink[0];
//方法
var methodNodeLink= IniLine(510, 350, 370, 95, "方法");
var methodNode = methodNodeLink[2];
var bigMethod = methodNodeLink[1];
methodNodeLink[0];
//环境
var environmentNodeLink= IniLine(630, 350, 480, 575, "环境");
var environmentNode = environmentNodeLink[2];
var bigEnvironment = environmentNodeLink[1];
environmentNodeLink[0];
//测量
var measureNodeLink= IniLine(750, 350, 610, 95, "测量");
var measureNode = measureNodeLink[2];
var bigMeasure = measureNodeLink[1];
measureNodeLink[0];

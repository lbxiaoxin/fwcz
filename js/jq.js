$('nav a').click(function(){
	$(this).addClass('act').siblings().removeClass('act')
});
$('.nav_2 a').click(function(){
	$(this).addClass('act').siblings().removeClass('act')
});
$('.fy a').click(function(){
	$(this).addClass('active').siblings().removeClass('active')
});



var t=null;
	var index=0; // 设置初始图片序号
	var speed=500; // 一幅图片切换时间
	var interval=2000; // 自动轮播图片的切换时间间隔
	var w=$('.lunbo').width(); // 图片宽度
	var n=$('.imgs').find('li').size(); // 图片总数(追加辅助图片之前)
	for(var i=0;i<n;i++){
		$('.btns').append('<li>'); // 循环生成所需的点
	}
	var btns=$('.btns').find('li'); // 所有圆点
	var first=$('.imgs').find('li').first(); // 图片列表中的第一幅图
	var last=$('.imgs').find('li').last(); // 图片列表中的最后一幅图
	$('.imgs').append(first.clone()); // 在图片列表最后添加上第一幅图
	$('.imgs').prepend(last.clone()); // 在图片列表最前添加上最后一幅图
	n=$('.imgs').find('li').size(); // 图片总数(追加辅助图片之后)
	$('.imgs').width(w*n).css('left',-(index+1)*w+'px'); // 设置.imgs的宽度，并且根据index的设置，显示相应的图片
	setBtns(); // 根据index的设置，设置圆点的默认激活位置
	function move() { // 显示指定的图片
		$('.imgs').animate({
			left: -(index+1)*w+'px'},
			speed, function() { // 回调函数，越界处理
			if($('.imgs').css('left')=='-'+w*(n-1)+'px'){
				$('.imgs').css('left','-'+w+'px');
			}
			if($('.imgs').css('left')=='0px'){
				$('.imgs').css('left','-'+w*(n-2)+'px');
			}
		});
		// 越界处理
		if(index==n-2){
			index=0;
		}
		if(index==-1){
			index=n-3;
		}
	}
	function setBtns() {
		btns.eq(index).addClass('active').siblings().removeClass('active'); // 将index对应的按钮添加激活类，其他按钮去掉激活类
	}
	$('.prev').click(function() {
		index--;
		move();
		setBtns();
	});
	$('.next').click(function() {
		index++;
		move();
		setBtns();
	});
	btns.click(function() {
		index=$(this).index();
		move();
		setBtns();
	});
	$('.lunbo').hover(function() {
		clearInterval(t);
	},function() {
		t=setInterval("$('.next').click()",interval);
	});
	$('.lunbo').mouseout();








function diy_select(){this.init.apply(this,arguments)};
diy_select.prototype={
     init:function(opt)
     {
        this.setOpts(opt);
        this.o=this.getByClass(this.opt.TTContainer,document,'div');//容器
        this.b=this.getByClass(this.opt.TTDiy_select_btn);//按钮
        this.t=this.getByClass(this.opt.TTDiy_select_txt);//显示
        this.l=this.getByClass(this.opt.TTDiv_select_list);//列表容器
        this.ipt=this.getByClass(this.opt.TTDiy_select_input);//列表容器
        this.lengths=this.o.length;
        this.showSelect();
     },
     addClass:function(o,s)//添加class
     {
        o.className = o.className ? o.className+' '+s:s;
     },
     removeClass:function(o,st)//删除class
     {
        var reg=new RegExp('\\b'+st+'\\b');
        o.className=o.className ? o.className.replace(reg,''):'';
     },
     addEvent:function(o,t,fn)//注册事件
     {
        return o.addEventListener ? o.addEventListener(t,fn,false):o.attachEvent('on'+t,fn);
     },
     showSelect:function()//显示下拉框列表
     {
        var This=this;
        var iNow=0;
        this.addEvent(document,'click',function(){
             for(var i=0;i<This.lengths;i++)
             {
                This.l[i].style.display='none';
             }
        })
        for(var i=0;i<this.lengths;i++)
        {
            this.l[i].index=this.b[i].index=this.t[i].index=i;
            this.t[i].onclick=this.b[i].onclick=function(ev)  
            {
                var e=window.event || ev;
                var index=this.index;
                This.item=This.l[index].getElementsByTagName('li');

                This.l[index].style.display= This.l[index].style.display=='block' ? 'none' :'block';
                for(var j=0;j<This.lengths;j++)
                {
                    if(j!=index)
                    {
                        This.l[j].style.display='none';
                    }
                }
                This.addClick(This.item);
                e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true); //阻止冒泡
            }
        }
     },
     addClick:function(o)//点击回调函数
     {

        if(o.length>0)
        {
            var This=this;
            for(var i=0;i<o.length;i++)
            {
                o[i].onmouseover=function()
                {
                    This.addClass(this,This.opt.TTFcous);
                }
                o[i].onmouseout=function()
                {
                    This.removeClass(this,This.opt.TTFcous);
                }
                o[i].onclick=function()
                {
                    var index=this.parentNode.index;//获得列表
                    This.t[index].innerHTML=This.ipt[index].value=this.innerHTML.replace(/^\s+/,'').replace(/\s+&/,'');
                    This.l[index].style.display='none';
                }
            }
        }
     },
     getByClass:function(s,p,t)//使用class获取元素
     {
        var reg=new RegExp('\\b'+s+'\\b');
        var aResult=[];
        var aElement=(p||document).getElementsByTagName(t || '*');

        for(var i=0;i<aElement.length;i++)
        {
            if(reg.test(aElement[i].className))
            {
                aResult.push(aElement[i])
            }
        }
        return aResult;
     },

     setOpts:function(opt) //以下参数可以不设置  //设置参数
     { 
        this.opt={
             TTContainer:'diy_select',//控件的class
             TTDiy_select_input:'diy_select_input',//用于提交表单的class
             TTDiy_select_txt:'diy_select_txt',//diy_select用于显示当前选中内容的容器class
             TTDiy_select_btn:'diy_select_btn',//diy_select的打开按钮
             TTDiv_select_list:'diy_select_list',//要显示的下拉框内容列表class
             TTFcous:'focus'//得到焦点时的class
        }
        for(var a in opt)  //赋值 ,请保持正确,没有准确判断的
        {
            this.opt[a]=opt[a] ? opt[a]:this.opt[a];
        }
     }
}


var TTDiy_select=new diy_select({  //参数可选
    TTContainer:'diy_select',//控件的class
    TTDiy_select_input:'diy_select_input',//用于提交表单的class
    TTDiy_select_txt:'diy_select_txt',//diy_select用于显示当前选中内容的容器class
    TTDiy_select_btn:'diy_select_btn',//diy_select的打开按钮
    TTDiv_select_list:'diy_select_list',//要显示的下拉框内容列表class
    TTFcous:'focus'//得到焦点时的class
});//如同时使用多个时请保持各class一致.
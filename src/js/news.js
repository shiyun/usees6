import ajax from '../util/ajax';
import './class/jquery.bxslider';
import './class/jquery.monthpicker';

/*
let tmp = {number: 10, type: 1};
ajax.get(ajax.api.GET_NEWS_INFO, 
	tmp, 
	function(data){			
		console.log(data);			
	},
	function(err){
		console.log(err);
	});
*/

let pageSize = 9;
let tmp1 = { number: 4, type: 1 };
ajax.get(ajax.api.GET_NEWS_INFO, tmp1, (data)=>{
	console.log(data);
	let _html = '';
	for(let i=0; i<data.res.length; i++) {
		_html += 	
		'	<li class="slide"  data-href="/newsDetail/'+data.res[i].id+'">' +
		'		<a href="/newsDetail/'+data.res[i].id+'" class="newsImg fl"><img src="'+data.res[i].mid_pic +'" /></a> ' +
		'			<div class="newsContent oh"> ' +
		'  			<h3 class="mt30 mb20"><a href="#" class="tit-news">'+ data.res[i].title+'</a></h3>' +
		'				<div class="newsCont">' +data.res[i].description+
		'				</div> '+
		'				<p class="newsDate">'+data.res[i].create_date+'</p> ' +
		'		</div> '+
		'	</li>';
	}
	// console.log(_html);
	$('.list-topFour').append(_html);

	$('.list-topFour li').click(function(){
			window.location.href = $(this).data('href');
	});

	$('.list-topFour').lightSlider({
		item: 1,
		controls: false,
		auto: true,
		loop: true,
		pause: 4000
	});
});

let tmp2 = { number: 3, type: 2};
ajax.get(ajax.api.GET_NEWS_INFO, tmp2, (data)=>{
	//console.log(data);
	let _html = '', description='';
	for(let i=0; i<data.res.length; i++) {
		description = data.res[i].description == null ? '' : data.res[i].description;
		_html += 
		'<li class="topImg"  data-href="/newsDetail/'+data.res[i].id+'">'+
		'	<a href="/newsDetail/'+data.res[i].id+'" class="newsImg"><img src="'+data.res[i].sm_pic+'" /></a>' +			
		'	<div class="newsContent">'+
		'		<h3 class="mt20 mb20"><a href="#" class="tit-news">'+data.res[i].title+'</a></h3>' +
		'		<div class="newsCont">'+ description+'</div>' +
		'		<p class="newsDate">'+data.res[i].create_date+'</p>'+
		'	</div>'+			
		'</li>'
	}
	// console.log(_html);
	$('.list-news:eq(0)').append(_html);

	$('.list-news:eq(0) li').click(function(){
			window.location.href = $(this).data('href');
	});
});

let page3 = 1;
let getNewsList = ()=>{
	let listNews = $('#initNewList').find('.list-news1');
	let tmp3 = { pageSize:pageSize, pageNumber: page3 };
	ajax.get(ajax.api.GET_NEWS_LIST,tmp3, function(data){
		let _html = '';
		//console.log(data);
		//console.log(data.res.length);
		if(data.res.length <= 0 ) {
			$('.btn-loadNews').hide();
			if(!listNews.find('li').length){
				listNews.html('<li class="noMoreNews">没有更多新闻了</li>');//$('.noMoreNews').show();
			}else{
				listNews.append('<li class="noMoreNews">没有更多新闻了</li>');//$('.noMoreNews').show();
			}
		}
		if(pageSize >= data.res.length){
			$('.btn-loadNews').hide();
		}
		for(let i=0;i<data.res.length;i++) {
			_html += '<li class="newsContent" data-href="/newsDetail/'+data.res[i].id+'">'+
					'	<div class="newsContent">'+
					'		<h3 class="mt20 mb20"><a href="#" class="tit-news">'+data.res[i].title+'</a></h3>'+
					'		<div class="newsCont">'+data.res[i].description+'</div>'+
					'		<p class="newsDate">'+data.res[i].create_date+'</p>'+
					'	</div>'
					'</li>';	
		}

		$('.list-news1').append(_html);
		$('.loading').hide();

		$('.list-news1 li:not(".noMoreNews")').click(function(){
			window.location.href = $(this).data('href');
		});
	});
	// $(document).on("click",'.list-news1 li',function(){
	// 	let link = $(this).data('href');
	// 	console.log(link);
	// 	window.location.href = link;
	// });
};
getNewsList();

$('.btn-loadNews').off('click').on('click', function(){
	page3+=1;
	getNewsList();
});

let page4 = 0;
let getNewsListByMonth = (create) => {
	let listNews = $('#searchCont').find('.list-news');
	page4 += 1;
	let tmp4 = { pageSize:pageSize, pageNumber: page4, createtime: create};
	ajax.get(ajax.api.GET_NEWS_LIST,tmp4, function(data){
		let _html = '';
		$('.list-news').find('.noMoreNews').remove();
		$('#btn-loadSearch').show();
		console.log(data);
		//console.log(data.res.length);
		if(data.res.length <= 0 ) {
			if(!listNews.find('li').length){
				listNews.html('<li class="noMoreNews">没有更多新闻了</li>');//$('.noMoreNews').show();
			}else{
				listNews.append('<li class="noMoreNews">没有更多新闻了</li>');//$('.noMoreNews').show();
			}
			$('#btn-loadSearch').hide();
		}
		if(pageSize >= data.res.length) {
			$('.btn-loadNews1').hide();
		}
		for(let i=0;i<data.res.length;i++) {
			_html += '<li class="newsContent" data-href="/newsDetail/'+data.res[i].id+'">'+
					'	<div class="newsContent">'+
					'		<h3 class="mt20 mb20"><a href="#" class="tit-news">'+data.res[i].title+'</a></h3>'+
					'		<div class="newsCont">'+data.res[i].description+'</div>'+
					'		<p class="newsDate">'+data.res[i].create_date+'</p>'+
					'	</div>'
					'</li>';	
		}

		$('#searchCont .list-news').append(_html);
		$('.loading').hide();
		$('#searchCont li:not(".noMoreNews")').click(function(){
			window.location.href = $(this).data('href');
		});
	});
};

// 按月份检索新闻
$('#monthly').monthpicker({
	years: [2016, 2015, 2014, 2013],
	topOffset: 6,
	onMonthSelect: function(m, y) {        
		$('#initNewList').hide();
		$('#searchCont').removeClass('hidden');
		$('#searchCont .list-news').children().remove();
		let month = (m+1)<10 ? '0'+(m+1) : m+1;
		$('#monthly').val(y+'年'+month+'月');
		let create = new Date(y+'-'+month).getTime();
		//console.log(create);
		page4 = 0;
		getNewsListByMonth(create);
	}
});	

$('.btn-loadNews1').off('click').on('click', function(){
	let year = $('#monthly').val().split('年')[0];
	let month = $('#monthly').val().split('年')[1].split('月')[0];
	let totalTime = year + '-' + month;
	let create = new Date(totalTime).getTime();
	getNewsListByMonth(create);
});
$(function(){
	addActive_index();
	claimSchedule();
});

function addActive_index(){
		$(".collapse ul li a[href='claimSchedule.jsp']").parent().addClass("active");
}

var claimSchedule =function(){
	$.ajax({
		url:"/pocForUser/showClaims",
		type:"POST",
		dataType:"json",
		success:function(data){
			if(data!=""){
			var tableInfo ="";
			var i=1;
			$.each(data,function(i,claim){
				i++;
				tableInfo +="<tr><td>" +i+"</td>"+
				"<td>"+claim['caseid'] +"</td>"+
				"<td>"+claim['plateNumber'] +"</td>"+
				"<td>"+"¥"+claim['sum'] +"</td>"+
				"<td>"+claim['claimTime'] +"</td>"+
				"<td>"+claim['status'] +"</td>"+
				"<td><a href='#'>详 情</a></td></tr>";
			});
			$("#hiddenresult").html(tableInfo);
			$("#Pagination").pagination(data.length, {
				prev_text: "« 上一页",
                next_text: "下一页 »",
				num_edge_entries: 1, //边缘页数
				num_display_entries: 4, //主体页数
				callback: pageselectCallback,
				items_per_page:10,//每页显示10项
			});
           //$("#tbody_showAllPolicyByUser").html(tableInfo);	
			};
		},
		error:function(data,XMLHttpRequest, textStatus, errorThrow){
				alert("服务器index未响应,请重新操作");
	    },
	});
};

var pageselectCallback =function(page_index, jq){
	var new_content = "";
	for(var i=(page_index*10);i>=(page_index*10)&&i<(page_index+1)*10;i++){
		new_content+="<tr>"+$("#hiddenresult tr:eq("+i+")").html()+"</tr>";
	}
	$("#tbody_claimSchedule").empty().html(new_content); //装载对应分页的内容
	return false;
};
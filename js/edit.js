function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.href);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var itemId =  getParameterByName("id"),
month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function main()
{

	if(isNaN(itemId)){ alert("Invalid Item ID"); return false; }
}
main();

function GetDistinctData(arr_name, field_name,  field_selector, obj) {
    var arr_name = new Array(),
        arr_distinct = new Array();

    for(var i=0;i<obj.length;i++)
    {
    	arr_name.push(obj.fields.field_name);
    }
        
    
    
    $(arr_name).each(function(index, item) {
        if ($.inArray(item, arr_distinct) == -1)
            arr_distinct.push(item);
    });
    $(arr_distinct).each(function(index, item) {
        $(field_selector).append('<option value="' + item + '">' + item + '</option>');
    });
}

function setGallery(stock_no)
{
    $.ajax({
        url:"//vehicles.cbo.me/ajax/brookvalemazda.php?type=image&stock_number="+stock_no,
        cache:true,
        success:function(obj){
            var result_len = obj.result.length,
            large_image = '',
            small_image = [],
            n = 0;

            for (var i = 1; i <= result_len; i++){
            large_image += '<li>';

            large_image += '<img src="/files/images/'+stock_no+'_'+i+'.jpg?Action=thumbnail&Width=488" alt="" />';

            large_image += '</li>';


            small_image.push('<img src="/files/images/'+stock_no+'_'+i+'.jpg?Action=thumbnail&Width=83" alt="" width="120" />');

            n++;
            }
			if(result_len == 0)
            {
                large_image += '<li>';

                large_image += '<img src="/Images/Car_Just_Arrived.jpg" alt="" />';

                large_image += '</li>';
				$(".vehicles-slider").addClass("no-child");

            }
            $('.vehicles-slider').append(large_image);
            
            

                  $('.vehicles-slider').slidesjs({
                            width: 940,
                            height: 528,
                            navigation: false,
                            pagination:{
                                active: true
                            },
                            effect: {
                              fade: {
                                speed: 400
                              }
                            }
                          });
                  for(var i=0;i<small_image.length;i++){
                    $(".vehicles-slider .slidesjs-pagination li:eq("+i+") a").html(small_image[i]); 
                  }
                  


        }
    });
}


var request = $.ajax({
    "url": "/api/v2/admin/sites/current/webapps/Vehicle Search Engine/items/"+itemId,
    "headers": {
        "Authorization": $.cookie('access_token')
    },
    "contentType": "application/json",
    "cache":true
});

request.done(function (obj) {
	var date_added = new Date(obj.createDate);
	var dateString = month[date_added.getMonth()]+" "+date_added.getDate()+" "+date_added.getFullYear();

    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = date_added;
    var secondDate = new Date();
    var age = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    var location = (obj.fields.Location != "0") ? obj.fields.Location : "";
    var comment = (obj.fields.Comment) ? obj.fields.Comment : "None";
	var price = "$"+parseInt(obj.fields.Price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	price = ("$0.00" == price ) ? "POA" : price; 

	$("#td-vehicle-type").text(obj.fields.Type);
	$("#td-make").text(obj.fields.MakeCode);
	$("#td-model").text(obj.fields.Model);
	$("#td-colour").text(obj.fields.Color);
	$("#td-build-year").text(obj.fields.Build);
	$("#td-transmission").text(obj.fields.Transmission);
	$("#td-badge-series").text(obj.fields.Badge + " "+ obj.fields.Series);
	$("#td-km").text(obj.fields.Miles);
	$("#td-stock_no").text(obj.fields.StockNumber);
	$("#td-body").text(obj.fields.Body);
	$("#td-status").text(obj.fields.Status);
	$("#td-date-added").text(dateString);
    $("#td-location").text(location);
    $("#td-age").text(age+" days");
	$("#td-comment").text(comment);
	$("#span-price").text(price);
	$("#item-name").text(obj.name);
    setGallery(obj.fields.StockNumber);
	
	if(obj.fields.Color =="")
	{
		$("#td-colour").parent().remove();
	}
	
	if(location =="")
	{
		$("#td-location").parent().remove();
	}
});

request.fail(function (jqXHR) {
    console.log("Get site list failed.");
    console.log("Error code: " + jqXHR.status);
    console.log("Error text: " + jqXHR.statusText);
    console.log("Response text: " + jqXHR.responseText);
});


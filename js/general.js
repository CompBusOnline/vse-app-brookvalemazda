$(document).ready(function() {
	function formatPrice()
	{
		$('.td-price').each(function(){
			if("$0" == $(this).text())
			{
				$(this).text("POA");
			}else{
				$(this).text("$"+$(this).data("price").toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
			}
			
		});
	}
	function formatKm()
	{
		$('.td-kms').each(function(){
			$(this).text($(this).data("kms").toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		});
	}

	function prepareImage()
	{
		$('.thumb-img').each(function(){
			var stock_no = $(this).data('stock_no');
			$.ajax({
				url:"//vehicles.cbo.me/ajax/brookvalemazda.php?type=image&stock_number="+stock_no,
				success:function(obj)
				{
					if(obj.result.length > 0 )
					{
						$("#stock_"+stock_no).attr({"src":"/files/images/"+obj.result[0]+"?Action=thumbnail&Width=100"});	
					}
					
				}
			});
		});
	}

	var dt = $('#all-vehicles-tbl').DataTable({
		 
		  "columns": [
			{ "width": "5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" },
			{ "width": "9.5%" }
		  ],
		   "sDom": 'rt<"bottom"pli><"clear">',
		   "oLanguage": {
		         "oPaginate": {
		           "sNext": "<i class='fa fa-chevron-right'></i>",
		           "sPrevious": "<i class='fa fa-chevron-left'></i>",
		           "sFirst": "<i class='fa fa-step-backward></i>",
		            "sLast": '<i class="fa fa-step-forward"></i>'
		         },
		         "sLengthMenu": 'Page size <select>'+
			        '<option value="10">10</option>'+
			        '<option value="20">20</option>'+
			        '<option value="30">30</option>'+
			        '<option value="40">40</option>'+
			        '<option value="50">50</option>'+
			        '<option value="-1">All</option>'+
			        '</select>',
			      "sInfo": "Showing _START_ to _END_ of _TOTAL_ items"
		       },
		    "order": [ 0, 'desc' ],

		    "aoColumns": [{ "bSortable": false },null,null,null,null,null,null,null,null,null,null],
		    "aoColumnDefs": [  { "bSortable": false, "aTargets": [0] }  ] 
		});


$('.input-filter-wrapper button.blue-btn').on("click",function(){
	var make = $("select[name='makeCode']").val();
	var status = $("select[name='status']").val();
	var model = $("select[name='model']").val();
	var keyword = $("#keyword").val();
	var search_str = make+' '+status+' '+model+' '+keyword;
   dt.search( search_str ).draw();
})

$('.reset-btn').on("click",function(){
	$("select[name='makeCode']").val('');
	$("select[name='status']").val('');
	$("select[name='model']").val('');
	$("#keyword").val('');
   dt.search('').draw();
})

$('#all-vehicles-tbl').on( 'draw.dt', function () {
    formatPrice();
    prepareImage();
    formatKm();
} );
 
 	formatKm();
 	formatPrice();
 	prepareImage();
} );



$("select[name='makeCode'], select[name='model'],select[name='body']").html("<option value=''> -- Select -- </option>");
$.ajax({
    url: "//vehicles.cbo.me/ajax/brookvalemazda.php?type=get_distinct",
    dataType: "json",
    type:"GET",
    success:function(json)
    {
    	if(json.make.length > 0)
      {
        var n = '';
        for(var i=0;i<json.make.length;i++)
        {
          n += "<option value='"+json.make[i]+"'>"+json.make[i]+"</option>";
        }
        $("select[name='makeCode']").append(n);
      }
       
     if(json.model.length > 0)
      {
        var n = '';
        for(var i=0;i<json.model.length;i++)
        {
          n += "<option value='"+json.model[i]+"'>"+json.model[i]+"</option>";
        }
        $("select[name='model']").append(n);
      }
     
    }
   });




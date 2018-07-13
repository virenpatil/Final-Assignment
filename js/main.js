

var productList ;
var token ="";

function load(){
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        // create cart if not
        if (!(localStorage.getItem("cartArray"))) {
            var cart = new Array;
            localStorage.setItem("cartArray", JSON.stringify(cart));

        }else{
            // update cart value
            var localObj = JSON.parse(localStorage.getItem("cartArray"));     
            $("#cartCount").html(`<span class="glyphicon glyphicon glyphicon-shopping-cart"/> MY CART(`+localObj.length+`)`);
        }
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://oe-final.herokuapp.com/products/",
            "method": "GET",
            "headers": {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNDQ3YTBlNGY4NDZkMDAxNDc2NzUyZCIsImlhdCI6MTUzMTI4MjQzMX0.4-ZJbvd7l16D_BaUKnIlpbTcKh_TWghVXnok5-LGrDE"
            }
          }
          
          $.ajax(settings).done(function (res) {
              let itemsList = res.items;
              productList = itemsList;
            for(let i = 0 ; i< itemsList.length; i++){
                // addToCart(itemsList[i]);
                
                let t = `
                <div id="item-body" class=" col-xs-12  col-sm-6 col-md-3 containe">
                    <div class="item ">
                        <div class="item-img">
                            <img src="`+ itemsList[i].primaryFullImageURL +`" class="img-responsive" alt="`+itemsList[i].primaryImageAltText+`"  >
                        </div>
                        <div class="item-title">
                            <h3>`+itemsList[i].displayName+`</h3>
                        </div>
                        <div class="item-descript">
                            <p>`+itemsList[i].description+`</p>
                        </div>
                        <div class="row item-info"  >
                            <div class="col-md-6 col-sm-  col-xs-6">SUK:00000</div>
                            <div class="col-md-6 col-sm-6 col-xs-6">*****</div>
                        </div>
                        
                        <div class="row item-price">
                            <div class="col-xs-6 ">
                                <span>
                                    $00.00
                                </span>
                            </div>
                            <div class="col-xs-6 ">
                                <span>
                                    $`+itemsList[i].listPrice+` 
                                </span>
                            </div>
                        </div>
                        <div class="row" style="justify-content: space-between;">
                            <div class="col-xs-6 ">
                            <a href="pdp.html?id=`+ itemsList[i].id+`">
                                <button class="btn btn-info btn-sm">View Product</button>
                            </a>
                            </div>
    
                            <div class="col-xs-6">
                                <button class="btn btn-success btn-sm" id="`+itemsList[i].id+`"  name="`+itemsList[i].id+`" >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                $("#productCart").append(t);
                $("#"+itemsList[i].id).bind("click",function (){
                    
                    console.log($(this).attr("name"));
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": " https://oe-final.herokuapp.com/products/"+ $(this).attr("name"),
                        "method": "GET",
                        "headers": {
                          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNDQ3YTBlNGY4NDZkMDAxNDc2NzUyZCIsImlhdCI6MTUzMTI4MjQzMX0.4-ZJbvd7l16D_BaUKnIlpbTcKh_TWghVXnok5-LGrDE"
                        }
                      }
                      
                      $.ajax(settings).done(function (res) {
                        var localObj = JSON.parse(localStorage.getItem("cartArray"));     
                        localObj.push(res);
                        localStorage.setItem("cartArray", JSON.stringify(localObj));
                        $("#cartCount").html(`<span class="glyphicon glyphicon glyphicon-shopping-cart"/> MY CART(`+localObj.length+`)`);
                      });

                    
                });

            }
          });
    } else {
        window.location.href = "index.html";
    }
    
}




$("document").ready(load());
function search(){
    document.getElementById("myInput").addEventListener("keyup",function(){
        var text,text2,val =$("#myInput").val().toLowerCase();
        var re = new RegExp(val,"i");
               
        $("#myInputautocomplete-list").empty();
        for(let i =0 ; i< productList.length;i++){
            text = productList[i].displayName.toLowerCase();
            text2 = text.match(re);
            console.log(text2);
            if (text2 == val) {
                t =  `
                <div class="search-items">
                    <a href="pdp.html?id=`+ productList[i].id+`">
                        `+productList[i].displayName+`
                    </a>
                </div>
                `;
                $("#myInputautocomplete-list").append(t);
            }
            
        }     
    });

}
search();


$("#search-form").on("submit",function(ev){
    ev.preventDefault();
});
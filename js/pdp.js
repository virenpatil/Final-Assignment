var product = "";
function load(){
    var test = new URLSearchParams(window.location.search);
    var id = test.get("id");
    if (localStorage.getItem("token") && id != null ) {
        token = localStorage.getItem("token");
        // update cart value
        var localObj = JSON.parse(localStorage.getItem("cartArray"));     
        $("#cartCount").html(`<span class="glyphicon glyphicon glyphicon-shopping-cart"/> MY CART(`+localObj.length+`)`);
       
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": " https://oe-final.herokuapp.com/products/"+ id,
            "method": "GET",
            "headers": {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNDQ3YTBlNGY4NDZkMDAxNDc2NzUyZCIsImlhdCI6MTUzMTI4MjQzMX0.4-ZJbvd7l16D_BaUKnIlpbTcKh_TWghVXnok5-LGrDE"
            }
          }
          
          $.ajax(settings).done(function (res) {
            //   console.log(res);
            product = res;
            console.log(res);
              let disp = `
              <div class="container">	
              <div class="col-md-5">
                  <div class="product col-md-8 ">
                      <img id="item-display" src="`+res.primaryFullImageURL+`" alt=""></img>
                  </div>
                  
                  <div class="  col-sm-4 col-md-4 ">
                      <center>
                          <div class="service2">
                                  <img src="`+res.primaryFullImageURL+`" alt=""></img>
                          </div>
                          <div class="service2">
                                  <img src="`+res.primaryFullImageURL+`" alt=""></img>
                              
                          </div><div class="service2">
                                  <img src="`+res.primaryFullImageURL+`" alt=""></img>
                          </div>
                      </center>
                  </div>
              </div>
                  
              <div class="col-md-7">
                  <div class="product-title">`+res.displayName+`</div>
                  <div class="product-desc">`+res.longDescription+`</div>
                  <div class="product-rating"><i class="fa fa-star"></i> <i class="fa fa-star "></i> <i class="fa fa-star "></i> <i class="fa fa-star "></i> <i class="fa fa-star-o"></i> </div>
                  <hr>
                  <div class="product-price">`+res.listPrice+`</div>
                  <div class="product-stock">In Stock</div>
                  <hr>
                  <div class="btn-group cart">
                      <button type="button" class="btn btn-success" onclick="clickAddCart()">
                          Add to cart 
                      </button>
                  </div>
                  
              </div>
          </div>


              `;
              $("#productDisplay").append(disp);
          });
    } else {
        window.location.href = "index.html";
    }
}
$("document").ready(load());

function clickAddCart(){
     
    var localObj = JSON.parse(localStorage.getItem("cartArray"));  
    localObj.push(product);   
    $("#cartCount").html(`<span class="glyphicon glyphicon glyphicon-shopping-cart"/> MY CART(`+localObj.length+`)`);
    localStorage.setItem("cartArray", JSON.stringify(localObj));        
       
}
var Total = 0;
function load(){
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        if (localStorage.getItem("cartArray")) {
            cart = JSON.parse(localStorage.getItem("cartArray")); 
            $("#cartCount").html(`<span class="glyphicon glyphicon glyphicon-shopping-cart"/> MY CART(`+cart.length+`)`);
            cart.forEach(e => {
                Total = Total + e.listPrice;
                
                let test = `
                <div class="row">
                    <div class="col-sm-2"><img  class="img-responsive" src="`+e.primaryFullImageURL+`">
                    </div>
                    <div class="col-sm-4">
                        <h4  class="product-name"><strong>`+ e.displayName+`</strong></h4>
                        <h4><small>`+e.description+`</small></h4>
                    </div>
                    <div class="col-sm-6">
                        <div class="col-sm-6 text-right">
                            <h6><strong>`+e.listPrice+` <span class="text-muted">x</span></strong></h6>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control input-sm" value="1" readonly>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-link btn-xs">
                                <span class="glyphicon glyphicon-trash"> </span>
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
                
                `;
    
               $("#cart-product").prepend(test);
            });
            $("#Total").html(`Total <strong>$`+Total+`</strong>`);
        }
        else{
            $("#cart-product").empty();
            $("#cart-product").prepend(`
                <div><center>Cart is empty</center></div>
            `);
        }
    }else{
        window.location.href = "index.html";
    }
    

}

$("document").ready(load());

$("#clear-cart").on("click",function(){
    if(localStorage.getItem("cartArray")){       
        $("#cartCount").html(`<span class="glyphicon glyphicon glyphicon-shopping-cart"/> MY CART(0)`);
        localStorage.removeItem("cartArray");
        $("#cart-product").empty();
        $("#cart-product").prepend(`
            <div><center>Cart is empty</center></div>
        `);
    }else{
        $("#cart-product").empty();
        $("#cart-product").prepend(`
            <div><center>Cart is empty</center></div>
            <div><center>Please go to Home Page...</center></div>
        `);
    }
    
    
});  

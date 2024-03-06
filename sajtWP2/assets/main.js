const BASEURL = "assets/data/";
function ajaxCallBack(imefajla, rezultat){
    $.ajax({
        url: BASEURL + imefajla,
        method: "get",
        dataType: "json", 
        success: rezultat,
        error: function(xhr){
            console.error(xhr);
        }
    })
}

function ubacivanje(naziv, vrednost){
    localStorage.setItem(naziv, JSON.stringify(vrednost));
}
function dohvatanje(naziv){
    return JSON.parse(localStorage.getItem(naziv));
}
//korpa ...........................................
/*$(document).ready(function() {
    $.ajax({
        url: "assets/data/meni.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            ispisNavigacija(data);
        },
        error: function(xhr, status, error){
            console.log(status + ": "+error);
        }
    });
});
*/
function showNavigation(navItems) {
    let cnt = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Logo</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">`;

    navItems.forEach((element) => {
      cnt += `<li class="nav-item"><a class="nav-link" href="${element.href}">${element.text}</a></li>`;
    });

    cnt += `    <li class="nav-item d-flex">
                    <a class="nav-link" data-toggle="modal" id="cartButton" href="#cartModal">
                      <i class="fa-solid fa-cart-shopping fa-xl"></i>
                    </a>
                    <div class="d-flex justify-content-center align-items-center rounded-circle bg-warning" id="cart-num-items">
                      <span id="numberOfItems">0</span>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>`;

    document.getElementById("navbarResponsive").innerHTML = cnt;
  }

  // Poziv AJAX-a i prikaz navigacije nakon što se učita JSON fajl
  ajaxCallBack("meni.json", function(navItems) {
    showNavigation(navItems);
});

var nasloviBlok1= ["Mobilni telefoni", "Pametni satovi", "Oprema"];
var slikeBlok1 = ["assets/img/A34.png","assets/img/A53.png", "assets/img/A34.png"];

var ispisBlok1 = "";
for(var i = 0; i<nasloviBlok1.length; i++){
    ispisBlok1 += `<div class="col-lg-4 col-sm-6 py-3">
                    <a href="prodavnica.html">
                        <div class = "text-center">
                            <h2 class="text-center">${nasloviBlok1[i]}</h2>
                            <img class="slikeBlok1" src="${slikeBlok1[i]}" alt="${nasloviBlok1[i]}" />
                        </div>
                    </a>
                </div>`;
}
document.getElementById("blok1").innerHTML = ispisBlok1;

function ispisiNaziv(proizvodID, lokalniStorage){
    let nizLS = dohvatanje(lokalniStorage);

    let naziv = "";
    for(let obj of nizLS){
        if(obj.id == id){
            naziv = obj.ime;
            break;
        }
    }
    return naziv;
}



function ispisProizvoda(nizZaIspis){
    let sviProizvodi=document.querySelector("#proizvodi");
    let proizvod = "";
    if(nizZaIspis.length==0)
    {
        proizvod+=`<h3 id="Prazno">Trenutno nema proizvoda za izabranu kategorija.</h3>`
    }
    else{
        for(let obj of nizZaIspis){
            var ocena="";
            for(var i = 0;i<obj.ocenaid;i++)
            {
                ocena+=`<i class="fas fa-star"></i>`;
            }
            var specIspis="";
            for(var i of obj.specifikacije)
            {
                if(i.vrednost==1)
                {
                    specIspis+=i.ime+"\n ";                   
                }
            }
            if(obj.new){
                var novo ="NOVO!"
            proizvod += `
            <div class="col-md-4 product-men mt-5">
                <div class="men-pro-item simpleCart_shelfItem">
                    <div class="men-thumb-item text-center">
                        <div class="img-product">
                            <div class="discount-sticker">${New}</div>
                            <img src="${obj.slike.slika1}" alt="${obj.slike.alt}" class="initial-img" />
                        </div>
                        <div class="OpisProizvoda">
                            <div class="product-details">
                                <p>${ispisiNaziv(obj.brandId, "savBrend")}-${obj.model}</p>
                                <p>${obj.boja}-${obj.ekran}</p>
                                <p>${ispisiNaziv(obj.ramId, "savRam")}/${obj.memorija}</p>
                                <p>${obj.kamera}</p>
                                <p>${obj.sistem}-${obj.procesor}</p>
                                <p>${specIspis}</p>
                                <p>${ocena}</p>
                            </div>
                            <input type="button" class="toggleButton1" value="About" />
                        </div> 
                    </div>
                    <div class="item-info-product text-center border-top mt-4">
                        <div class="info-product-price my-2 similar-block">
                            <span class="item_price">${obj.model}</span></br>
                            <span class="item_price">${ispisiNaziv(obj.popustId, "savPopust")}  ${obj.cena.nova}</span>
                            <del>${obj.cena.stara}</del>
                        </div>
                        <div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                            <form action="" method="">
                                <button class="button btn korpa" data-proizvodid="${obj.id}">Add to cart</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            `
            }
            else{
                proizvod += `
            <div class="col-md-4 product-men mt-5">
                <div class="men-pro-item simpleCart_shelfItem">
                    <div class="men-thumb-item text-center">
                        <div class="img-product">
                            <img src="${obj.slike.slika1}" alt="${obj.slike.alt}" class="initial-img" />
                        </div>
                        <div class="OpisProizvoda">
                            <div class="product-details">
                                <p>${ispisiNaziv(obj.brandId, "savBrend")}-${obj.model}</p>
                                <p>${obj.boja}-${obj.ekran}</p>
                                <p>${ispisiNaziv(obj.ramId, "savRam")}/${obj.memorija}</p>
                                <p>${obj.kamera}</p>
                                <p>${obj.sistem}-${obj.procesor}</p>
                                <p>${specIspis}</p>
                                <p>${ocena}</p>
                            </div>
                            <input type="button" class="toggleButton1" value="About" />
                        </div> 
                    </div>
                    <div class="item-info-product text-center border-top mt-4">
                        <div class="info-product-price my-2 similar-block">
                            <span class="item_price">${obj.model}</span></br>
                            <span class="item_price">${ispisiNaziv(obj.popustId, "savPopust")}  ${obj.cena.nova}</span>
                            <del>${obj.cena.stara}</del>
                        </div>
                        <div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                            <form action="" method="">
                                <button class="button btn korpa" data-proizvodid="${obj.id}">Add to cart</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            `
            }
        }
    }
    sviProizvodi.innerHTML = proizvod;
}
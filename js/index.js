document.querySelectorAll(".wishlist-btn").forEach(button=>{

button.addEventListener("click",function(){

let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

const product={

id:this.dataset.id,
name:this.dataset.name,
price:this.dataset.price,
image:this.dataset.image

};

const exist=wishlist.find(item=>item.id===product.id);

if(exist){

alert("Already in Wishlist");

return;

}

wishlist.push(product);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

alert("❤ Added to Wishlist");

});

});

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const overlay = document.getElementById("overlay");

const closeSidebar = document.getElementById("closeSidebar");

menuBtn.onclick = function(){

sidebar.classList.add("active");

overlay.style.display="block";

}

closeSidebar.onclick = function(){

sidebar.classList.remove("active");

overlay.style.display="none";

}

overlay.onclick = function(){

sidebar.classList.remove("active");

overlay.style.display="none";

}








const slider = document.getElementById("productSlider");

document.getElementById("leftBtn").onclick = function () {
    slider.scrollBy({
        left: -300,
        behavior: "smooth"
    });
};

document.getElementById("rightBtn").onclick = function () {
    slider.scrollBy({
        left: 300,
        behavior: "smooth"
    });
};



let isDown=false;

let startX;

let scrollLeft;

productSlider.addEventListener("mousedown",(e)=>{

isDown=true;

startX=e.pageX-productSlider.offsetLeft;

scrollLeft=productSlider.scrollLeft;

});

productSlider.addEventListener("mouseleave",()=>{

isDown=false;

});

productSlider.addEventListener("mouseup",()=>{

isDown=false;

});

productSlider.addEventListener("mousemove",(e)=>{

if(!isDown)return;

e.preventDefault();

const x=e.pageX-productSlider.offsetLeft;

const walk=(x-startX)*2;

productSlider.scrollLeft=scrollLeft-walk;

});




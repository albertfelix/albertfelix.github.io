let image1 = document.querySelector("#kitten1")
let image2 = document.querySelector("#kitten2")
let body = document.querySelector("body")
image1.onclick = toggleClass1;
image2.onclick = toggleClass2;

function toggleClass1(){
  if(image1.className == 'image1'){
      image1.setAttribute("class", "")
    	body.setAttribute("class", "")
  } else {
      image1.setAttribute("class", "image1")
      body.setAttribute("class", "body-red")
  }
}

function toggleClass2(){
  if(image2.className == 'image2'){
      image2.setAttribute("class", "")
    	body.setAttribute("class", "")
  } else {
      image2.setAttribute("class", "image2")
      body.setAttribute("class", "body-blue")
  }
}
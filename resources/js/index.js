async function getData(linkrss) {
  try {
    let r = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=" + linkrss
    );
    if (r.ok) {
      let res = await r.json();
      // console.log(res);
      return res;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

function setAccordion(mag) {
  // console.log(mag);
  let acc_Div = document.getElementById("accordionId");
  let cnt = 0;
  mag.forEach((x) => {
    let outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "card");
    outerDiv.id = "card" + cnt;
    let cardHead = document.createElement("div");
    cardHead.setAttribute("class", "card-header");
    cardHead.id = "heading" + cnt;

    let btn = document.createElement("button");
    if (cnt == 0) {
      btn.setAttribute("class", "btn btn-link show");
      btn.setAttribute("aria-expanded", "true");
    } else {
      btn.setAttribute("class", "btn btn-link collapsed");
      btn.setAttribute("aria-expanded", "false");
    }
    btn.setAttribute("type", "button");
    btn.setAttribute("data-toggle", "collapse");
    btn.setAttribute("data-target", "#collapse" + cnt);
    btn.setAttribute("aria-controls", "#collapse" + cnt);
    btn.innerHTML = "abajdvjv";

    cardHead.appendChild(btn);
    outerDiv.appendChild(cardHead);

    let innerDiv = document.createElement("div");
    innerDiv.id = "collapse" + cnt;

    if (cnt == 0) {
      innerDiv.setAttribute("class", "collapse show");
    } else {
      innerDiv.setAttribute("class", "collapse");
    }
    innerDiv.setAttribute("data-parent", "#accordionId");
    innerDiv.setAttribute("aria-labelledby", "heading" + cnt);

    outerDiv.appendChild(innerDiv);
    acc_Div.appendChild(outerDiv);
    cnt += 1;
  });
}

async function setCarousel(mag) {
  let l = mag.length;
  let cnt = 0;
  for (let i = 0; i < l; i++) {
    let x = await getData(mag[i]);
    let c_items = x.items;
    document.querySelector("#heading" + cnt + " > button").innerHTML =
      x.feed.title;
    let c_length = c_items.length;
    let accBody = document.getElementById("collapse" + cnt);

    let innerDiv = document.createElement("div");
    accBody.appendChild(innerDiv);
    innerDiv.id = "carouselControls" + cnt;
    innerDiv.setAttribute("class", "carousel slide");
    innerDiv.setAttribute("data-ride", "carousel");

    let carouselInner = document.createElement("div");
    carouselInner.setAttribute("class", "carousel-inner");
    innerDiv.appendChild(carouselInner);

    for (let j = 0; j < c_length; j++) {
      let c_inner_div = document.createElement("div");
      carouselInner.appendChild(c_inner_div);
      if (j == 0) {
        c_inner_div.setAttribute("class", "carousel-item active");
      } else {
        c_inner_div.setAttribute("class", "carousel-item");
      }
      let innercard = document.createElement("div");
      innercard.setAttribute("class", "card");
      c_inner_div.appendChild(innercard);
      c_link = document.createElement("a");
      c_link.href = c_items[j].link;
      c_link.id = "c_link";
      innercard.appendChild(c_link);
      let c_img = document.createElement("img");
      c_img.classList.add("carousel-img", "card-img-top");
      c_img.src = c_items[j].enclosure.link;
      c_link.appendChild(c_img);

      let cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");
      c_link.appendChild(cardBody);
      let c_body_title = document.createElement("h4");
      c_body_title.setAttribute("class", "card-title");
      let c_body_line = document.createElement("p");
      c_body_line.style.fontSize = "12px";
      let c_body_author = c_items[j].author;
      let date = c_items[j].pubDate.split(" ")[0].split("-");
      let dd = date[2];
      let mm = date[1];
      let yyyy = date[0];
      let c_body_date = dd + "/" + mm + "/" + yyyy;
      c_body_line.innerHTML = c_body_author + " • " + c_body_date;
      let c_hr = document.createElement("hr");
      let c_body_desc = document.createElement("p");
      c_body_desc.setAttribute("class", "card-text");
      cardBody.appendChild(c_body_title);
      cardBody.appendChild(c_body_line);
      cardBody.appendChild(c_hr);
      cardBody.appendChild(c_body_desc);
      c_body_title.innerHTML = c_items[j].title;
      c_body_desc.innerHTML = c_items[j].description;
    }

    let leftbtn = document.createElement("a");
    innerDiv.appendChild(leftbtn);
    leftbtn.setAttribute("class", "carousel-control-prev");
    leftbtn.setAttribute("role", "button");
    leftbtn.setAttribute("href", "#carouselControls" + cnt);
    leftbtn.setAttribute("data-slide", "prev");
    leftbtn.innerHTML =
      '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

    let rightbtn = document.createElement("a");
    innerDiv.appendChild(rightbtn);
    rightbtn.setAttribute("class", "carousel-control-next");
    rightbtn.setAttribute("role", "button");
    rightbtn.setAttribute("href", "#carouselControls" + cnt);
    rightbtn.setAttribute("data-slide", "next");
    rightbtn.innerHTML =
      '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
    cnt += 1;
  }
}

setAccordion(magazines);
setCarousel(magazines);

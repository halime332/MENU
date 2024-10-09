import { buttonsData, menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";


//! fonksiyonlar

const searchCategory = (e) => {
    //*Tıkladığımız butonun data özelliklerine eriştik ve değişkene aktardık
    const category = e.target.dataset.category;
    //* Tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile eşleşirse
    //*bu ürünleri getir
    const filtredMenu = menu.filter((item) => item.category === category);
    //* Tıkladığınız butonun kategorisi 'all' ise renderMenuItems fonksiyonunu çalıştır ve parametre
    //* parametre olarak bütün menüyü gönder
    if (category === "all") {
        renderMenuItems(menu);
    } else {
        renderMenuItems(filtredMenu);
    }
    renderButtons(category);
};
const renderMenuItems = (menuItems) => {
    //* gönderilen verileri dönüp her bir olay izleyicisi için bir a etiketi oluştur
    let menuHTML = menuItems.map(
        (item) => `
        <a id="card" class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
            href="./ProductDetail.html?id=${item.id}&category=${item.category}
            &price=${calculatePrice(item.price)}""
        >  
            <img src="${item.img}" alt="" class="rounded shadow">
            <div>
                <div class="d-flex justify-content-between align-items-center">
                    <h5>${item.title}</h5>
                    <p class="text-success">${calculatePrice(item.price)}</p>
                </div>
                <p class="lead">${item.desc}
                </p>
            </div>
        </a>
       `
    );
    menuHTML = menuHTML.join("");
    //*Oluşturduğumuz menuHTML değişkenini ekrana aktardık
    elements.menuArea.innerHTML = menuHTML
};
const renderButtons = (active) => {
    elements.buttonsArea.innerHTML = "";

    buttonsData.forEach((btn) => {
        //*Herbir veri için bir html 'button' etiketi oluştur
        const buttonEle = document.createElement("button");
        //*Oluşturduğumuz butonlara class atadık
        buttonEle.className = "btn btn-outline-dark filter-btn";
        //* Oluşturduğumuz butonun içerisine döndüğümüz verilerden texti aktardık
        buttonEle.textContent = btn.text;
        //* Oluşturduğumuz butonun hangi kategoride olduğu bilgisini button elementine ekledik
        buttonEle.dataset.category = btn.value;

        if (btn.value === active) {
            buttonEle.classList.add("bg-dark", "text-light");
        }
        //* HTML'e gönderme
        elements.buttonsArea.appendChild(buttonEle);
    });

};


//!olay izleyicileri
//* Sayfa yüklendiği anda renderMenuItems fonksiyonunu çalıştır ve menu parametresine gönder
document.addEventListener("DOMContentLoaded", renderMenuItems(menu));
document.addEventListener("DomContentLoaded", renderButtons());


document.addEventListener("DOMContentLoaded", () => {
    renderMenuItems(menu);
    renderButtons("all");
});

elements.buttonsArea.addEventListener("click", searchCategory);
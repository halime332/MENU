export const elements = {
    menuArea: document.getElementById("menu-area"),
    buttonsArea: document.getElementById("buttons-area"),
    outlet: document.getElementById("outlet"),
};
//*gönderilen ücreti yenileyip dışarı gönderdik
export const calculatePrice = (price) => {
    let newPrice = price * 15;
    return newPrice.toFixed(2);
};
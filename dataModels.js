
class product {
    constructor(name, id, price, imgSrc = null, sale) {
        this.name = name;
        this.id = id;
        this.imgSrc = imgSrc;
        this.price = price;
        this.sale = sale;
    };
};

class user {
    constructor(name, code, id) {
        this.name = name;
        this.code = code;
        this.id = id;
    };
};
class ShoppingCart {
    constructor(  id, amount, TotalPrice){
        this.id=id;
        this.amount=amount;
        this.TotalPrice=TotalPrice;
    };
};



let products = [
    new product("טיסת לונדון", 1, 1500, "tripsImegs/london.jpg", "קנה 2 קבל 1"),
    new product("טיסת ניו יורק", 2, 2200, "tripsImegs/ניו יורק.jpg", "הנחה של 10%"),
    new product("טיסת פריז", 3, 1800, "tripsImegs/פריז.jpg", "הנחה של 5%"),
    new product("טיסת דובאי", 4, 2500, "tripsImegs/דובאי.webp", "מבצע מיוחד!"),
    new product("טיסת בנגקוק", 5, 3000, "tripsImegs/בנקוק.jpg", "קנה 1 קבל 1"),
    new product("טיסת רומא", 6, 1700, "tripsImegs/רומא.jpg", "הנחה של 15%"),
    new product("טיסת ברצלונה", 7, 2000, "tripsImegs/ברצלונה.webp", "מבצע קיץ!"),
    new product("טיסת הונגריה", 8, 2100, "tripsImegs/הונגריה.jpg", "הנחה של 20%"),
    new product("טיסת אמסטרדם", 9, 2100, "tripsImegs/אמסטרדם.jpg", "הנחה של 20%"),
    new product("טיסת טוקיו", 10, 3500, "tripsImegs/טוקיו.jpg", "מבצע אביב!"),
    new product("טיסת סידני", 11, 4000, "tripsImegs/סידני.jpg", "הנחה של 10%"),
    new product("טיסת ריו דה ז'ניירו", 12, 3200, "tripsImegs/ריו דה ז'ניירו.jpg", "מבצע מיוחד!")
];

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name: item.name,
            price: item.price,
            imgSrc: item.imgSrc,
            quantity: 1
        });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(` "${item.name}" נוסף לסל הקניות!`);
};


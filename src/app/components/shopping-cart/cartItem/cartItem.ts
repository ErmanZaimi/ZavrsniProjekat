export class CartItem {
    private categoryId: number;
    private productName: string;
    public productPrice: string;
    private productImgSrc: string;
    public productId: number;
    public quantity: number = 1;
    public totalPrice: number;
    private id: number | undefined;


    constructor(categoryId: number, productId: number, name: string, price: string, imgSrc: string, id: number | undefined, quantity: number) {
        this.categoryId = categoryId;
        this.productName = name;
        this.productPrice = price;
        this.productImgSrc = imgSrc;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = parseFloat(price.replace("$", "")) * this.quantity;
        this.id = id;
    }
    getId() {
        return this.id;
    }
}

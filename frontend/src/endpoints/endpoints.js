// apiEndpoints.js

class ApiEndpoints {


    static BASE_URL =  import.meta.env.MODE === "development"
    ? "http://localhost:3333/api/v1"
    : "/api/v1";

    // Static properties for endpoints
    //auth url
    static LOGIN = `${this.BASE_URL}/auth/login/` //post
    static REGISTER = `${this.BASE_URL}/auth/create-user`//post
    static GET_USER = `${this.BASE_URL}/auth/get-user`


    //product url
    static GET_SINGLE_PRODUCT(product_id) {
        return `${this.BASE_URL}/product/get-product/${product_id}`
    }
    static GET_PRODUCTS(page, search, category) {
        let url = `${this.BASE_URL}/product/get-products?page=${page || 1}`
        if (search) url += `&search=${encodeURIComponent(search)}`
        if (category) url += `&category=${encodeURIComponent(category)}`
        return url
    }
    static ADD_WISHLIST = `${this.BASE_URL}/product/add-wishlist` //post
    static GET_CATEGORIES = `${this.BASE_URL}/product/get-categories`
    static GET_CART = `${this.BASE_URL}/product/get-cart`
    static GET_WHISHLISTS = `${this.BASE_URL}/product/get-wishlists`
    static ADD_CART = `${this.BASE_URL}/product/add-cart`//post
    static ADD_WISHLISTS = `${this.BASE_URL}/product/add-wishlists`//post
    static REMOVE_WISHLIST = `${this.BASE_URL}/product/remove-wishlist`//delete
    static REMOVE_CART = `${this.BASE_URL}/product/remove-cart`//delete

    // For dynamic endpoints (with parameters)
    static getUser(userId) {
        return `${this.BASE_URL}/users/${userId}`
    }

    //order url
    static ADD_ADDRESS = `${this.BASE_URL}/order/create-address` //post
    static GET_ADDRESS = `${this.BASE_URL}/order/get-address`
    static CREATE_ORDER = `${this.BASE_URL}/order/create-order`
    static VERIFY_PAYMENT = `${this.BASE_URL}/order/verify-payment`
}

export default ApiEndpoints

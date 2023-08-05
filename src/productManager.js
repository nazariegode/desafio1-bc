
const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadData();
    }

    loadData() {
        try {
            // Leer los datos existentes desde el archivo y cargarlos en this.products
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            // Si hay un error al leer el archivo o no existe, inicializamos la lista de productos vacía.
            this.products = [];
        }
    }

    saveData() {
        try {
            // Guardar los datos de this.products en el archivo
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data);
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    }

    addProduct() {
        // Crear un nuevo producto y agregarlo a la lista de productos
        const new_id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const product = {
            id: new_id,
            title: "Sushi Bacon",
            description: "El mejor sushi",
            price: 5000,
            thumbnail: 'https://assets.unileversolutions.com/recipes-v2/237341.jpg',
            code: 1234,
            stock: 10
        };
        this.products.push(product);
        this.saveData();
    }

    getProducts() {
        // Retornar todos los productos
        return this.products;
    }

    getProductById(product_id) {
        // Buscar y retornar el producto correspondiente al id proporcionado
        const product = this.products.find(product => product.id === product_id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    updateProduct() {
        // Buscar el producto con el id dado y actualizar sus campos
        const productIndex = this.products.findIndex(product => product.id === product_id);
        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                id: new_id,
                title: "Sushi Bacon",
                description: "El mejor sushi",
                price: 5000,
                thumbnail: 'https://assets.unileversolutions.com/recipes-v2/237341.jpg',
                code: 1234,
                stock: 10
            };
            this.saveData();
            return true;
        }
        return false;
    }

    deleteProduct(product_id) {
        // Eliminar el producto con el id proporcionado de la lista de productos
        this.products = this.products.filter(product => product.id !== product_id);
        this.saveData();
    }
}

module.exports = ProductManager;

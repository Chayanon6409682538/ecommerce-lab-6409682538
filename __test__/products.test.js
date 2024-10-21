const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {
    // Write your test cases here
    // GET /products - Get all products test
    describe('GET /products', () => {
        it('should return all products', async () => {
            const res = await request(app).get('/products');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });
    // GET /products/:id - Get a product by ID test
    describe('GET /products/:id', () => {
        it('should return a product by ID', async () => {
            const res = await request(app).get('/products/1');
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(1);
        });
        //Error Handling
        it('should return 404 if product not found', async () => {
            const res = await request(app).get('/products/999');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

    // POST /products - Add a new product test
    describe('POST /products', () => {
        it('should add a new product', async () => {
            const newProduct = { name: 'PC', price: 3000, stock: 15 };
            const res = await request(app).post('/products').send(newProduct);
            expect(res.status).toBe(201);
            expect(res.body.id).toBe(3);
            expect(res.body).toHaveProperty('name', 'PC');
            expect(res.body).toEqual({ id: 3, ...newProduct });
        });
    });

    // PUT /products/:id - Update a product by ID test
    describe('PUT /products/:id', () => {
        it('should update an existing product', async () => {
            const updatedProduct = { name: 'Updated Laptop', price: 1000, stock: 3 };
            const res = await request(app).put('/products/1').send(updatedProduct);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'Updated Laptop');
            expect(res.body).toEqual({ id: 1, ...updatedProduct });
        });
        //Error Handling
        it('should return 404 if product not found', async () => {
            const res = await request(app).put('/products/999').send({name: 'Updated Laptop'});
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

    // DELETE /products/:id - Delete a product by ID test
    describe('DELETE /products/:id', () => {
        it('should delete a product', async () => {
            const res = await request(app).delete('/products/3');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Product deleted');
        });
        //Error Handling
        it('should return 404 if product not found', async () => {
            const res = await request(app).delete('/products/999');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

});
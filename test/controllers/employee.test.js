const request = require('supertest');
const app = require('../../index.js');

describe('Employees Endpoints', () => {

    let newEmployee = {};

    it('should create a new employee', async() => {
        const res = await request(app)
            .post('/api/employees')
            .send({
                name: 'Edilberto',
                salary: 23000
            });

        newEmployee = res.body;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should fetch a employee', async() => {
        const id = newEmployee.id;
        const res = await request(app).get(`/api/employees/${id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should update a employee', async() => {
        const res = await request(app)
            .put(`/api/employees/${newEmployee.id}`)
            .send({
                id: newEmployee.id,
                name: 'Edilberto Ramos',
                salary: 30000
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('salary', 30000);
    });

    it('should delete a employee', async() => {
        const res = await request(app).delete(`/api/employees/${newEmployee.id}`);
        expect(res.statusCode).toEqual(200);
    });

    it('should fetch all employees', async() => {
        const res = await request(app).get('/api/employees');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should Not found', async() => {
        const res = await request(app)
            .put(`/api/employees/${newEmployee.id}`)
            .send({
                id: newEmployee.id,
                name: 'edy',
                salary: 1
            });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    });

});
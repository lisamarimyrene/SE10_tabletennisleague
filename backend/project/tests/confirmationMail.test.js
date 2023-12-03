// import confirmationMail from '../utils/confirmationMail';
const request = require('supertest');
const app = require('../utils/server')

// End-to-end test
// ! Connecte til databasen/serveren?
describe('confirmationEmail', () => {
    // Test if it recieves sucess result if email sent successfully
    it('should send email and return success message', async () => {
        const res = await request(app)
            .post('/confEmail')
            .send({
                username: 'testUser',
                email: 'l.m.m_97@hotmail.com',
                password: 'testPassword',
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Player registered successfully");
    });

    // Test if it recieves error message if user tries to send to non-hotmail.com address
    it('should fail to send email and return error message for non-hotmail account', async () => {
        const res = await request(app)
            .post('/confEmail')
            .send({
                username: 'testUser',
                email: 'l.m.m_97@online.com',
                password: 'testPassword',
            });
        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Email must belong to hotmail.com domain");
    });

})


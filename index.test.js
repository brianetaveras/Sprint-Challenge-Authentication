const supertest = require("supertest")
const db = require("./database/dbConfig")
const server = require("./index")


test("welcome route", async () => {
	const res = await supertest(server).get("/")
	expect(res.statusCode).toBe(200)
	expect(res.type).toBe("application/json")
	expect(res.body.message).toBe("Welcome!")
})

test('authenticate middleware', async ()=>{
    const res = await supertest(server).get('/api/jokes');
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json")

})
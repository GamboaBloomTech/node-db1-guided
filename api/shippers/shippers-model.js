const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

// GET /Shippers
async function get() {
  // SELECT * FROM Shippers
  const shippers = db('shippers')
  return shippers
}

// GET /Shippers/:id
async function getById(shipperId) {
  // SELECT * FROM Shippers WHERE shipperid = 1
  const shipper = db('shippers').where('shipperid', shipperId).first();
  return shipper
}

// POST /Shippers
async function create({shipperName, phone}) {
  // INSERT INTO shippers (shippername, phone) VALUES ('ACME.CORP', '12345')
  const [shipperId] = await db('shippers').insert({shipperName, phone})
  return getById(shipperId)
}

// PUT /Shippers/:id
async function update(shipperId, {shipperName, phone}) {
  // UPDATE shippers SET shippername = "newName", phone= "(12356)" where shipperid =1;
  await db('shippers').where('shipperId', shipperId).update({shipperName, phone});
  return getById(shipperId)
}


// DELETE /Shippers/:id
async function remove(shipperId) {
  // DELETE FROM shippers WHERE shipperId = 1
  await db('shippers').where('shipperId', shipperId).del();
  return {"message": "deleted shipper with id " + shipperId}
}

const { db } = require('../configs/Database.js');

async function getAllProductByLimit(limit) {
    return await db.Product.findAll({ limit, order: [['updated_at', 'DESC']] });
}

async function getAllProduct(where, page, per_page) {
    return await db.Product.findAndCountAll({
        where,
        order: [["updated_at", "DESC"]],
        offset: (page - 1) * 10,
        limit: per_page,
        distinct: true,
    });
}

async function doEdit(id, data, transaction) {
    if (transaction) {
        return await db.Product.update(data, { where: { id }, returning: true, plain: true, transaction });
    } else {
        return await db.Product.update(data, { where: { id }, returning: true });
    }

}

async function getProductCluster(productId) {
    return await db.Product.findOne({
        include: [{
            model: db.Cluster, required: true,
            include: [
                { model: db.ClusterImage, required: true, attributes: ['id', 'clusterId', 'image'] },
                { model: db.Facility, required: false, attributes: ['id', 'name', 'image'] }
            ]
        }],
        where: {
            id: productId
        }
    })
}

async function addProduct(data, transaction) {

    if (transaction != null) {
        return await db.Product.create(data, { transaction, returning: true });
    } else {
        return await db.Product.create(data, { returning: true });
    }
}

async function getProductById(id) {
    return await db.Product.findOne({ where: { id } });
}

async function updateProduct(productId, data) {
    return await db.Product.update(data, { where: { id: productId } });
}

module.exports = { getAllProductByLimit, getAllProduct, doEdit, getProductCluster, addProduct, getProductById, updateProduct }

const { db } = require('../configs/Database.js');
const { Op } = require('sequelize');

async function getDetail(where) {
    return await db.News.findOne({ where });
}

async function getAllNews(where, page, per_page) {
    return await db.News.findAndCountAll({
        where,
        order: [["updated_at", "DESC"]],
        offset: (page - 1) * per_page,
        limit: per_page,
        distinct: true,
    });
}

async function getAllNewsByLimit(limit) {
    return await db.News.findAll({ limit, order: [['updated_at', 'DESC']] });
}

async function getNewsList(where, page, limit) {

    return await db.News.findAndCountAll({
        where,
        order: [["id", "DESC"]],
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true,
    });
};

async function nextNews(currentId) {
    let where = {};
    where.id = { [Op.gt]: currentId }
    return await db.News.findOne({ attributes: ['id', 'title'], limit: 1, where });
}

async function prevNews(currentId) {
    let where = {};
    where.id = { [Op.lt]: currentId }
    return await db.News.findOne({ attributes: ['id', 'title'], limit: 1, where });
}


module.exports = { getAllNews, getAllNewsByLimit, getDetail, getNewsList, nextNews, prevNews }

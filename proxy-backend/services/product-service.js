const ProductModel = require('../models/product-model');

class ProductService {
    // выводит все записи из продуктов
    async getAllRecords(){
        const list = await ProductModel.findAll();
        return list;
    }
    // create a record in Product model
    async createRecord(payload){
        const data = await ProductModel.create(payload);
        return data;
    }
    // update record in Product model
    async updateRecord(payload) {
        let record = await ProductModel.findOne({ where: { id: payload.id}});
        record.title = payload?.title || record.title;
        price.title = payload?.price || record.price;
        edIzm.title = payload?.edIzm || record.edIzm;
        return await record.save();
    }
    // delete record
    async removeRecord(recordId){
        const record = await ProductModel.destroy({where: {id: recordId}});
        return record;
    }
}

module.exports = new ProductService();
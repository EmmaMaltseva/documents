const EdizmlModel = require('../models/edizm-model.js');

class EdizmService {
    async getAllRecords() {
        const list = await EdizmlModel.findAll();
        return list;
    }

    async createRecord(payload) {
        const data = await EdizmlModel.create(payload);
        return data;
    }

    async updateRecord(payload) {
        let record = await EdizmlModel.findOne({where: {id: payload.id}});
        record.edIzm = payload?.edIzm || record.edIzm;
        record.okei = payload?.okei || record.okei;
        return await record.save();
    }

    async removeRecord(recordId) {
        const record = await EdizmlModel.destroy({where: {id: recordId}});
        return record;
    }
}

module.exports = new EdizmService();
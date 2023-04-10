const KontragentModel = require('../models/kontragent-model');

class KontragentService {
    async getAllRecords() {
        const list = await KontragentModel.findAll();
        return list;
    }

    async createRecord(payload) {
        const data = await KontragentModel.create(payload);
        return data;
    }

    async updateRecord(payload) {
        let record = await KontragentModel.findOne({where: {id: payload.id}});
        record.title = payload?.title || record.title;
        record.inn = payload?.inn || record.inn;
        record.kpp = payload?.kpp || record.kpp;
        record.adres = payload?.adres || record.adres;
        record.telephone = payload?.telephone || record.telephone;
        record.bank = payload?.bank || record.bank;
        record.bik = payload?.bik || record.bik;
        record.korSchet = payload?.korSchet || record.korSchet;
        return await record.save();
    }

    async removeRecord(recordId) {
        const record = await KontragentModel.destroy({where: {id: recordId}});
        return record;
    }
}

module.exports = new KontragentService();
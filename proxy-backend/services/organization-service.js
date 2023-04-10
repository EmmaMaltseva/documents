const OrganizationModel = require('../models/organization-model');

class OrganizationService {
    async getAllRecords() {
        const list = await OrganizationModel.findAll();
        return list;
    }

    async createRecord(payload) {
        const data = await OrganizationModel.create(payload);
        return data;
    }

    async updateRecord(payload) {
        let record = await OrganizationModel.findOne({where: {id: payload.id}});
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
        const record = await OrganizationModel.destroy({where: {id: recordId}});
        return record;
    }
}

module.exports = new OrganizationService();
const ProxyHeaderHakModel = require('../models/proxy-header-nak-model');

class ProxyHeaderNakService {
    async getAllRecords() {
        const list = await ProxyHeaderHakModel.findAll();
        return list;
    }

    async getOneRecord(recordId) {
        const record = await ProxyHeaderHakModel.findOne({where: {id: recordId}});
        return record;
    }

    async createRecord(payload) {
        const data = await ProxyHeaderHakModel.create(payload);
        return data;
    }

    async updateRecord(payload) {
        let record = await ProxyHeaderHakModel.findOne({where: {id: payload.id}});
        record.number = payload?.number || record.number;
        record.dateSost = payload?.dateSost || record.dateSost;
        record.organizGruzootpId = payload?.organizGruzootpId || record.organizGruzootpId;
        record.kontrGruzopolId = payload?.kontrGruzopolId || record.kontrGruzopolId;
        record.organizPostavId = payload?.organizPostavId || record.organizPostavId;
        record.kontrPlatId = payload?.kontrPlatId || record.kontrPlatId;
        record.osnovan = payload?.osnovan || record.osnovan;
        record.struktPodr = payload?.struktPodr || record.struktPodr;
        return await record.save();
    }

    async removeRecord(recordId) {
        const record = await ProxyHeaderHakModel.destroy({where: {id: recordId}});
        return record;
    }
}

module.exports = new ProxyHeaderNakService();
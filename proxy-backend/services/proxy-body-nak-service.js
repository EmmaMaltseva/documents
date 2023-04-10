const ProxyBodyNakModel = require('../models/proxy-body-nak-model');

class ProxyBodyNakService {
    async getAllHeadersRecords(headerId) {
        const list = await ProxyBodyNakModel.findAll({where: {proxyHeaderNakId: headerId}});
        return list;
    }

    async createRecord(payload) {
        const data = await ProxyBodyNakModel.create(payload);
        return data;
    }

    async updateRecord(payload) {
        let record = await ProxyBodyNakModel.findOne({where: {id: payload.id}});
        record.number = payload?.number || record.number;
        record.productId = payload?.productId || record.productId;
        record.edIzmId = payload?.edIzmId || record.edIzmId;
        record.vidUp = payload?.vidUp || record.vidUp;
        record.kolVOdnom = payload?.kolVOdnom || record.kolVOdnom;
        record.kolMest = payload?.kolMest || record.kolMest;
        record.massaBr = payload?.massaBr || record.massaBr;
        record.kol_massaNet = payload?.kol_massaNet || record.kol_massaNet;
        record.stavkaNDS = payload?.stavkaNDS || record.stavkaNDS;
        record.proxyHeaderNakId = payload?.proxyHeaderNakId || record.proxyHeaderNakId;
        
        return await record.save();
    }

    async removeRecord(recordId) {
        const record = await ProxyBodyNakModel.destroy({where: {id: recordId}});
        return record;
    }
}

module.exports = new ProxyBodyNakService();
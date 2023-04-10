const ProxyHeaderNakService = require('../services/proxy-header-nak-service');

class ProxyHeaderNakController{
    async getAllRecords(req, res){
        try {
            const list = await ProxyHeaderNakService.getAllRecords();
            return res
                .status(200)
                .json(list);
        }   catch(e) {
                return res
                    .status(500)
                    .json(e);
        }
    }

    async getOneRecord(req, res){
        try {
            const recordId = req.params.id;
            const record = await ProxyHeaderNakService.getOneRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async createRecord(req, res){
        try{
            const record = await ProxyHeaderNakService.createRecord(req.body);
            return res
                .status(200)
                .json(record);
        }   catch (e) {
                return res
                    .status(500)
                    .json(e);
        }
    }

    async updateRecord(req, res) {
        try {
            const record = await ProxyHeaderNakService.updateRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async removeRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await ProxyHeaderNakService.removeRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }
}

module.exports = new ProxyHeaderNakController();
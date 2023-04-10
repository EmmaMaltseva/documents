const EdizmService = require('../services/edizm-service.js');

class EdizmController{
    async getAllRecords(req, res){
        try {
            const list = await EdizmService.getAllRecords();
            return res
                .status(200)
                .json(list);
        }   catch(e) {
                return res
                    .status(500)
                    .json(e);
        }
    }

    async createRecord(req, res){
        try{
            const record = await EdizmService.createRecord(req.body);
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
            const record = await EdizmService.updateRecord(req.body);
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
            const record = await EdizmService.removeRecord(recordId);
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

module.exports = new EdizmController();
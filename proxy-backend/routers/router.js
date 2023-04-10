const Router = require("express").Router;
const ProductController = require('../controllers/product-controller');
const EdizmController = require('../controllers/edizm-controller');
const KontragentController = require('../controllers/kontragent-controller');
const OrgatizationController = require('../controllers/organization-controller');
const IndividualController = require('../controllers/individual-controller');
const ProxyBodyController = require('../controllers/proxy-body-controller');
const ProxyBodyNakController = require('../controllers/proxy-body-nak-controller');
const ProxyHeaderController = require('../controllers/proxy-header-controller');
const ProxyHeaderNakController = require('../controllers/proxy-header-nak-controller');

const router = new Router();

router.get
    (
        '/products',
        ProductController.getAllRecords,
    );

router.post
    (
        '/products',
        ProductController.createRecord,
    );

router.put
    (
        '/products',
        ProductController.updateRecord,
    );

router.delete
    (
        '/products/:id',
        ProductController.removeRecord,
    );

router.get
    (
        '/edizms',
       EdizmController.getAllRecords,
    );

router.post
    (
        '/edizms',
        EdizmController.createRecord,
    );

router.put
    (
        '/edizms',
        EdizmController.updateRecord,
    );

router.delete
    (
        '/edizms/:id',
        EdizmController.removeRecord,
    );

router.get
    (
        '/kontragents',
        KontragentController.getAllRecords,
    );

router.post
    (
        '/kontragents',
        KontragentController.createRecord,
    );

router.put
    (
        '/kontragents',
        KontragentController.updateRecord,
    );

router.delete
    (
        '/kontragents/:id',
        KontragentController.removeRecord,
    );

router.get
    (
        '/organizations',
        OrgatizationController.getAllRecords,
    );

router.post
    (
        '/organizations',
        OrgatizationController.createRecord,
    );

router.put
    (
        '/organizations',
        OrgatizationController.updateRecord,
    );

router.delete
    (
        '/organizations/:id',
        OrgatizationController.removeRecord,
    );

router.get
    (
        '/individuals',
        IndividualController.getAllRecords,
    );

router.post
    (
        '/individuals',
        IndividualController.createRecord,
    );

router.put
    (
        '/individuals',
        IndividualController.updateRecord,
    );

router.delete
    (
        '/individuals/:id',
        IndividualController.removeRecord,
    );

    router.get
    (
        '/proxy-bodies/:headerId',
        ProxyBodyController.getAllHeadersRecords,
    )

    router.post
    (
        '/proxy-bodies',
        ProxyBodyController.createRecord,
    )

    router.put
    (
        '/proxy-bodies',
        ProxyBodyController.updateRecord,
    )

    router.delete
    (
        '/proxy-bodies/:id',
        ProductController.removeRecord
    )

    router.get
    (
        '/proxy-bodies-nak/:headerId',
        ProxyBodyNakController.getAllHeadersRecords,
    )

    router.post
    (
        '/proxy-bodies-nak',
        ProxyBodyNakController.createRecord,
    )

    router.put
    (
        '/proxy-bodies-nak',
        ProxyBodyNakController.updateRecord,
    )

    router.delete
    (
        '/proxy-bodies-nak/:id',
        ProxyBodyNakController.removeRecord
    )

router.get
    (
        '/proxy-headers',
        ProxyHeaderController.getAllRecords,
    );

router.get
    (
        '/proxy-headers/:id',
        ProxyHeaderController.getOneRecord,
    );

router.post
    (
        '/proxy-headers',
        ProxyHeaderController.createRecord,
    );

router.put
    (
        '/proxy-headers',
        ProxyHeaderController.updateRecord,
    );

router.delete
    (
        '/proxy-headers/:id',
        ProxyHeaderController.removeRecord,
    );

router.get
    (
        '/proxy-headers-nak',
        ProxyHeaderNakController.getAllRecords,
    );

router.get
    (
        '/proxy-headers-nak/:id',
        ProxyHeaderNakController.getOneRecord,
    );

router.post
    (
        '/proxy-headers-nak',
        ProxyHeaderNakController.createRecord,
    );

router.put
    (
        '/proxy-headers-nak',
        ProxyHeaderNakController.updateRecord,
    );

router.delete
    (
        '/proxy-headers-nak/:id',
        ProxyHeaderNakController.removeRecord,
    );

module.exports = router;
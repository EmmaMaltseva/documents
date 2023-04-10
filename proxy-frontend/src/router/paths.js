export const ROUTE_PATHS = {
    products: 'products',           // страница для справочника товаров
    edizms: 'edizms',           // страница для единиц измерения
    individuals: 'individuals',     // страница для справочника физ. лиц
    kontragents: 'kontragents',     // страница для справочника физ. лиц
    organizations: 'organizations', // страница для справочника организаций
    proxy: {
        list: 'proxy',              // страница списка документов доверенность
        proxy: 'proxy/:id',         // страница конкретного документа доверенности со списком товаров 
        listNak: 'proxy-nak',
        proxyNak: 'proxy-nak/:id',
    }
}

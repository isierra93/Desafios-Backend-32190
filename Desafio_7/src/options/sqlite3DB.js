const optionsSql3 = {
    client:`sqlite3`,
    connection: {
        filename: `./db/ecommerce.sqlite`
    },
    useNullAsDefault: true,
}

module.exports = {
    optionsSql3
};
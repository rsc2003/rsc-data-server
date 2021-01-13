async function getNews({
    token,
    id = -1,
    terms = '',
    page = 0,
    category = -1,
    before = -1,
    after = -1
}) {
    const queryHandler = this.server.queryHandler;

    const { pages, articles } = queryHandler.getNews({
        id,
        terms,
        page,
        category: category > -1 ? category - 1 : category,
        before,
        after
    });

    this.socket.sendMessage({ token, articles, pages });
}

async function addNews({ token, title, date, category, body }) {
    const queryHandler = this.server.queryHandler;
    date = date || Math.floor(Date.now() / 1000);

    try {
        queryHandler.insertNews({ title, category, body, date });
        this.socket.sendMessage({ token, success: true });
    } catch (e) {
        this.socket.sendMessage({ token, success: false });
    }
}

async function editNews({ token, id, title, category, body }) {}

async function addFile({ token, name, file }) {}

async function getFile({ token, name }) {
    const queryHandler = this.server.queryHandler;
    let file = queryHandler.getFile(name);
    file = file ? file.toString('base64') : null;

    this.socket.sendMessage({ token, file });
}

async function getGodLetter({ token, id }) {
    const queryHandler = this.server.queryHandler;

    this.socket.sendMessage({ token, letters: queryHandler.getGodLetter(id) });
}

module.exports = {
    getNews,
    addNews,
    editNews,
    addFile,
    getFile,
    getGodLetter
};
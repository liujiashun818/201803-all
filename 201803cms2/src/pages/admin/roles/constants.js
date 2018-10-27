export default {
    changeState(payload) {
        return { type: 'roles/changeState', payload };
    },
    confirmSetUsers() {
        return { type: 'roles/confirmSetUsers' }
    },
    confirmSetResources() {
        return { type: 'roles/confirmSetResources' }
    },
    search(payload) {
        return { type: 'roles/search', payload }
    },
    delMulti() {
        return { type: 'roles/delMulti' }
    },
    remove(id) {
        return { type: 'roles/remove', payload: id }
    },
    create(payload) {
        return { type: 'roles/create', payload }
    },
    update(payload) {
        return { type: 'roles/update', payload }
    },
    getList(payload) {
        return { type: 'roles/getList', payload }
    }
}
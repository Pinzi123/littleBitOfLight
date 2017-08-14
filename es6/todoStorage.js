const STORAGE_KEY = 'searchHistory'
export default {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return todos
  },
  save: function (todos) {
    let length = todos.length
    if (length > 5) {
      todos = todos.slice(length - 6, length)
    }
    console.log('搜索历史记录变更为', todos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const Origin = require('node-aho-corasick')

class Ahocorasick extends Origin {
  search (string) {
    if (!this._root) throw Error('please build before search')
    const data = string.split('').map(function (it) {
      return it.charCodeAt(0)
    })
    const res = []
    for (let state = this._root, i = 0; i < data.length;) {
      state = state.push(data[i++])
      const next = state.next

      if (state.value) {
        for (let cur = state; cur.value; cur = cur.next) {
          res.push(cur.value)
        }
      } else if (next.value) {
        for (let cur = next; cur.value; cur = cur.next) {
          res.push(cur.value)
        }
      }
    }
    return res
  }
}

module.exports = Ahocorasick

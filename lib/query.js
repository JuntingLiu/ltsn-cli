/**
 * 数据的查询
 * @Author: Junting
 * @Date: 2020-07-09 21:04:50
 * @Last Modified by: Junting
 * @Last Modified time: 2020-07-09 21:15:26
 */
const Table = require('cli-table');

function query(dists) {
  const keys = Object.keys(dists[0]);

  const table = new Table({
    head: keys
  })

  // 拼接出表格的每一行
  return dists.reduce((res, item) => {
    table.push(
      Object.values(item)
    )
    return res
  }, table).toString()
}

module.exports = query
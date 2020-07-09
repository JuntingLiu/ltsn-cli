/**
 * 数据源的获取与更新
 * @Author: Junting
 * @Date: 2020-07-09 21:11:21
 * @Last Modified by: Junting
 * @Last Modified time: 2020-07-09 22:35:32
 */
const axios = require('axios')
const compareVersions = require('compare-versions')
const terminalLink = require('terminal-link')
const color = require('cli-color')

module.exports = async (v) => {
  // 获取所有 Node 版本
  const { data } = await axios.get('https://nodejs.org/dist/index.json')

  // 将 LTS 版本都筛选出来
  return data.filter((node) => {
    // compareVersions('10.0.1', '10.0.1'); //  0
    // compareVersions('10.1.1', '10.2.2'); // -1
    // console.log(node.version, 'v'+v+'.0.0')
    // console.log(compareVersions(node.version, 'v' + v + '.0.0'))
    const cp = v ? (compareVersions(node.version, 'v' + v + '.0.0') >= 0) : true
    return node.lts && cp
  }).map(it => {
    // 去掉 file 这个字段，其他全返回
    const { files, ... rest } = it;
    const doc = color.yellow(terminalLink('API', `https://nodejs.org/dist/${it.version}/docs/api/documentation.html`))
    return {...rest, doc};
  })
}
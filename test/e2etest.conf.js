exports.config = {

  //実際にスクレイピングする指示書置き場（テストSpec）
  specs: ['e2e/**/*.coffee'],
  //動かすブラウザ
  capabilities:{
    'browserName': 'phantomjs',
    'phantomjs.cli.args': ['--ignore-ssl-errors=true',  '--web-security=false'],
    'phantomjs.binary.path': './node_modules/.bin/phantomjs'
  }
}

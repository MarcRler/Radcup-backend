/*Datenbank Konfiguartion, enthält ein dummy "dockerweb" welcher durch sed Skript
bei dockerstart getauscht wird*/
var db = {
  production: 'mongodb://root:toor@dockerweb:27017/radcupProduction',
  development: 'mongodb://root:toor@dockerweb:27017/radcupDevelopment',
  test: 'mongodb://root:toor@dockerweb:27017/radcupTest'
}

module.exports = db[process.env.NODE_ENV || 'development']

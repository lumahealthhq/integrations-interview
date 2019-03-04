var configValues = {
  userName: "test",
  password: "test123"
}

module.exports = {
  getDbConnectionString: function() {
    return 'mongodb://'+ configValues.userName+':'+configValues.password + '@ds151382.mlab.com:51382/lumahealth';
  }
}

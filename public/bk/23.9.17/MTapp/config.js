

module.exports = {
  'development': {
     "secret": "bd17ddffc6694d25834a99ac2708a498",
    // "secret":"iloveindia",
    "database": "mongodb://localhost:27017/mtsproject",
    // "siteUrl": "http://localhost:3000",
      "siteUrl":"http://13.59.161.144:3000",
    "email": {
      "from": "ranjit.gorain@appideasinc.com", //mail change
      "host": "smtp-pulse.com",
      "port": 465,
      "auth": {
        "user":"ranjit.gorain@appideasinc.com", //mail change
        "pass": 'DQE5c6ddtJP3'
      }
     },
    // 'aws': {
    //   'accessKeyId': 'AKIAJQ66SOY2N3RPPO5A',
    //   'secretAccessKey': '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',
    //   'region': 'ap-southeast-1',
    //   's3Endpoint': 's3-ap-southeast-1.amazonaws.com',
    //   'fileBucketName': '',
    //   'documentBucketName': '',
    // }
  }
};

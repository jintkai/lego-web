import axios from 'axios'

var $http = function (request) {
  return new Promise((resolve, reject) => {
    axios({
      method: request['method'] ? request['method'] : 'Get',
      url: request['url'],
      data: request['data'] ? request['data'] : {}
    }).then(response => {
      if (response.status === 200) {
        if (response.data.code !== 200) {
          return reject({
            code: response.data.code,
            msg:response.data.msg.toString()
          })
        } else
          return resolve(response.data)
      } else {
        return reject({
          code: response.status,
          msg: response.statusText
        })
      }

    }).catch(err => {
      return reject({
        code: 500,
        msg: err
      })
    })
  })
}

export default $http

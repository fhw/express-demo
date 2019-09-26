const express = require('express')
const router = express.Router()
const axios = require('axios')

let accessToken = ''

router.get('/', async function (req, res, next) {
  await getAccessToken()
  res.send(accessToken)
})

router.get('/setMenu', async function (req, res, next) {
  await getAccessToken()
  await setMenu().then(data=>{
    res.json(data.data)
  })
})

function getAccessToken () {
  // if (!accessToken) {
    return axios.get('https://api.weixin.qq.com/cgi-bin/token', {
      params: {
        grant_type: 'client_credential',
        appid: 'wx04c46118bca64621',
        secret: 'a6ed181401c3065c527837db8cb74c63'
      }
    }).then(data => {
      console.log(data.data)
      accessToken = data.data.access_token
    }).catch(err => {
      console.error(err)
    })
  // }
}

function setMenu () {
  return axios({
    url:`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`,
    method: 'post',
    data: {
      button: [
        {
          type: 'click',
          name: '今日热榜',
          sub_button: [
            {
              type: 'view',
              name: 'printf520',
              url: 'https://www.printf520.com/hot.html'
            },
            {
              type: 'view',
              name: 'tophub',
              url: 'https://tophub.today/'
            }
          ]
        },
        {
          type: 'view',
          name: '主页',
          url: 'http://10.10.20.146'
        }
      ]
    }
  }).then(data => {
    console.dir(data.data)
    return data
  }).catch(err => {
    console.error(err)
  })
}

module.exports = router

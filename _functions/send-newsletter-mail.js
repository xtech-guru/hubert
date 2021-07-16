const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION",
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function isValidEmail(email) {
  return emailRegex.test(String(email).toLowerCase())
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 404 }
  }

  const { email } = JSON.parse(event.body || "{}")

  if (!isValidEmail(email)) {
    return { statusCode: 400 }
  }

  try {
    const request = await mailjet.post("contact").request({
      Email: email,
    })

    console.log(request.body)

    return {
      statusCode: request.response.status,
      body: JSON.stringify(request.body),
      headers,
    }
  } catch ({ statusCode }) {
    console.log(statusCode)

    return { statusCode }
  }
}

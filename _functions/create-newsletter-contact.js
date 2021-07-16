const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION",
}

// any regex would exclude some valid emails, e.g. those with non latin characters
// so we just check that there is a '@' in the middle, a vliadation email will
// be sent anyway
const emailRegex = /^\S+@\S+$/

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

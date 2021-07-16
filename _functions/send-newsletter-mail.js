const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
)

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function isValidEmail(email) {
  return emailRegex.test(String(email).toLowerCase())
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 404,
    }
  }

  const { from } = JSON.parse(event.body || "{}")

  if (!isValidEmail(from)) {
    return {
      statusCode: 400,
    }
  }

  const message = {
    From: { Email: from },
    To: [
      {
        Email: "fekhergh93@gmail.com",
      },
    ],
    Subject: "Newsletter request",
  }

  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [message],
    })

    console.log(request.body)
  } catch (err) {
    console.log(err.statusCode)
  }
}

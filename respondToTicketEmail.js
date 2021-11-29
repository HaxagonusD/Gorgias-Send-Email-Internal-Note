import fetch from "node-fetch";
import retriveRequesterEmail from "./retrieveRequesterEmail.js";
import { Buffer } from "buffer";

/*
 *   adds response to ticket
 *
 *   @param ticketId { Number } id of the the ticket
 *   @param user { String } user email (the "from" field)
 *   @param  emailText { String } body of teh message
 *   @param  channel { String } method of communication can be 'email' or 'internal-note' or any other method of
 *   communication supported by Gorgias
 *   @param authObject { Object } contains authentication information in the format: {
 *      @param username: { String } username provied by gorgias (it is usally an email),
 *      @param password: { String } Api key provided by Gogias,
 *      @param base_url: { String } base url provided by Gorgias
 *
 *   }
 *   @returns {Object} response from Gorgias api request
 */
const respondToTicketEmail = async (ticketId, user, emailText, authObject) => {
  const requesterEmail = await retriveRequesterEmail(ticketId, authObject);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`${authObject.username}:${authObject.password}`).toString(
          "base64"
        ),
    },
    body: JSON.stringify({
      receiver: { email: requesterEmail },
      sender: { email: user },
      source: {
        to: [{ address: requesterEmail }],
        from: { address: user },
        type: "email",
      },
      channel: "email",
      body_text: emailText,
      body_html: `<p>${emailText}</p>`,
      from_agent: true,
      via: "api",
    }),
  };

  const response = await fetch(
    `${authObject.base_url}tickets/${ticketId}/messages`,
    options
  )
    // .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};

const authObject = {
  username: "julianq.js@gmail.com",
  password: "397daf8bd0019d7d20e4d7057e85370e12c9e43cf347cadad9b505687ea66b9b",
  base_url: "https://julianq.gorgias.com/api/",
};

const response = await respondToTicketEmail(
  9324390,
  "julianq.js@gmail.com",
  "This is a test after the itnervierw a day later to see if it works",
  authObject
);

console.log(response);

export default respondToTicketEmail;

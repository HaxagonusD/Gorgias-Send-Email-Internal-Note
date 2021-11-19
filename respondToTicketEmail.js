import fetch from "node-fetch"
import retriveRequesterEmail from "./retrieveRequesterEmail.js"


const respondToTicketEmail = async (ticketId, user, emailText, via ,authObject) =>{
  const requesterEmail = await retriveRequesterEmail(ticketId, authObject)

  const options = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${authObject.username}:${authObject.password}`).toString("base64")
      },
      body: JSON.stringify({
            receiver: {email: requesterEmail},
            sender: {email: user},
            source: {
                to: [{ address: requesterEmail}],
                from: { address: user},
                type: via

            },
            channel: via,
            body_text: emailText,
            from_agent: true,
            via: via,
            channel: 'email'
      })
  };

  const response  = await fetch(`${authObject.base_url}tickets/${ticketId}/messages`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;

}


export default  respondToTicketEmail;

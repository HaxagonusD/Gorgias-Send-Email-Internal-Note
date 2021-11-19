import fetch from "node-fetch"
import retriveRequesterEmail from "./retrieveRequesterEmail.js"
import { Buffer } from 'buffer';



const respondToTicketEmail = async (ticketId, user, emailText, via ,authObject) =>{
  // adds response to ticket 
  // @params
  // ticketId: (Number)id of the the ticket
  // user: (String) user email (the "from" field)
  // emailText: (String) body of teh message
  // via: (String) method of communication can be 'email' or 'internal-note' or any other emthod of communication supported by Gorgias
  // authObject: (Object) contains authentication information in the format: {
  //    username: (String) username provied by gorgias (it is usally an email), 
  //    password: (String) Api key provided by Gogias,
  //    base_url: (String) base url provided by Gorgias
  //
  // }
  // @returns response from Gorgias api request
  //
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

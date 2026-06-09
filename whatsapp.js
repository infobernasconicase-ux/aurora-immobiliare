exports.handler = async (event) => {
  // Meta webhook verification
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];
    
    if (mode === 'subscribe' && token === 'aurora2026') {
      return {
        statusCode: 200,
        body: challenge
      };
    }
    return { statusCode: 403, body: 'Forbidden' };
  }

  // Incoming WhatsApp message
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];
      
      if (message) {
        const from = message.from;
        const text = message.text?.body || '';
        console.log(`Message from ${from}: ${text}`);
        // Here you can add auto-reply logic
      }
    } catch(e) {
      console.error(e);
    }
    return { statusCode: 200, body: 'OK' };
  }

  return { statusCode: 405, body: 'Method not allowed' };
};

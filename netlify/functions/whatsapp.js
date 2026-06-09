exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];
    if (mode === 'subscribe' && token === 'aurora2026') {
      return { statusCode: 200, body: challenge };
    }
    return { statusCode: 403, body: 'Forbidden' };
  }
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      if (message) console.log('Messaggio da:', message.from, '-', message.text?.body);
    } catch(e) { console.error(e); }
    return { statusCode: 200, body: 'OK' };
  }
  return { statusCode: 405, body: 'Method not allowed' };
};

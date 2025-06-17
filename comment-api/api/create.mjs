import { sanity } from "../sanity.js";

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { username, text, postId } = data;

    if (!username || !text || !postId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const newComment = await sanity.create({
      _type: 'comment',
      username,
      text,
      timestamp: new Date().toISOString(),
      postId: {
        _type: 'reference',
        _ref: postId,
      },
    });

    return {
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Origin": "http://localhost:4321",
      },
      body: JSON.stringify({ success: true, id: newComment._id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong', details: err.message }),
    };
  }
}
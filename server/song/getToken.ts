/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fetch from 'node-fetch';
// Probably not the best place to store this information at all
const client_id = '38be6f7be77c467a824e814c54fda7e1';
const client_secret = 'bd0ab7507c6244bcb69d84ea6304d3d4';
const encodedData = Buffer.from(client_id + ':' + client_secret).toString(
  'base64'
);

export async function getAuthToken() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const response: any = await fetch('https://accounts.spotify.com/api/token', {
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: 'Basic ' + encodedData,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  });

  if (response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const datajson = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/dot-notation
    return datajson['access_token'];
  }
}

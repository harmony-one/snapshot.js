import fetch from 'cross-fetch';
import { formatUnits } from '@ethersproject/units';

export const author = 'haodi';
export const version = '0.1.0';

export async function strategy(
  space,
  network,
  provider,
  addresses,
  options,
  snapshot
) {
  let api_url = options.api + '/' + options.strategy;

  const response = await fetch(api_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      network: network,
      snapshot: snapshot,
      addresses: addresses,
    })
  });
  const data = await response.json();
  return Object.fromEntries(
    data.score.map((value) => [
      value.address,
      parseFloat(formatUnits(value.score.toString(), options.decimals))
    ])
  );
}

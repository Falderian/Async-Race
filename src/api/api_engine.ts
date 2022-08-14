import { baseUrl } from './api_garage';

const engine = `${baseUrl}/engine`;

export const startEngineAPI = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngineAPI = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const driveEngineAPI = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

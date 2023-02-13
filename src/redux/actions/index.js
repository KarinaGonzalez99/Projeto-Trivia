export const USER = 'USER';
export const SCORE = 'SCORE';

export const user = (payload) => ({
  type: USER,
  payload,
});

export const score = (payload) => ({
  type: SCORE,
  payload,
});

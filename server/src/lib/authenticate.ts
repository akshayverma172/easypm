import * as bcrypt from 'bcrypt';

export const cryptPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  const match = bcrypt.compareSync(password, hash);
  return match;
};

export const getHashByUser = (username: string) => {
  return 'test';
};

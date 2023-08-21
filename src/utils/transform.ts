import * as bcrypt from 'bcrypt';

export function passwordHash(password: string): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

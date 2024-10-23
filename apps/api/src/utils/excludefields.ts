export function excludeFields(user: any, fields: string[]): any {
  const userObject = user.toObject ? user.toObject() : user;
  fields.forEach((field) => delete userObject[field]);
  return userObject;
}

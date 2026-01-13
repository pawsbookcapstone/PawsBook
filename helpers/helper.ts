export const generateChatId = (user1: any, user2: any) => {
  const users = [user1, user2].sort();
  return users.join("_");
};

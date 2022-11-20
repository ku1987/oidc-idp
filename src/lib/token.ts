// TODO: Modify claims of the token depending on the scope
export const generateToken = () => {
  const accessToken = {
    locale: 'en-US',
    name: 'Micah Silverman',
    preferred_username: 'micah+okta@afitnerd.com',
    sub: '...',
    updated_at: 1650198843,
    zoneinfo: 'America/Los_Angeles',
  };
  const idToken = {
    locale: 'en-US',
    name: 'Micah Silverman',
    preferred_username: 'micah+okta@afitnerd.com',
    sub: '...',
    updated_at: 1650198843,
    zoneinfo: 'America/Los_Angeles',
  };
  return {
    accessToken,
    idToken,
  };
};

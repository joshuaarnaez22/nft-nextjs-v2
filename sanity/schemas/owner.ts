export default {
  name: 'owner',
  type: 'document',
  title: 'Owner',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'walletAddress',
      title: 'Wallet Address',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
    },
    {
      name: 'igHandle',
      title: 'Instagram Handler',
      type: 'string',
    },
    {
      name: 'twitterHandle',
      title: 'Twitter Handler',
      type: 'string',
    },
  ],
}

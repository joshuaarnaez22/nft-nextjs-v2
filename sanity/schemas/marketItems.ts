export default {
  name: 'marketItems',
  type: 'document',
  title: 'Market Items',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'contractAddress',
      type: 'string',
      title: 'Contract Address',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
    },
    {
      name: 'createdBy',
      type: 'reference',
      title: 'Created By',
      to: [{type: 'owner'}],
    },
    {
      name: 'floorPrice',
      type: 'number',
      title: 'Floor Price',
    },
    {
      name: 'volumeTraded',
      type: 'string',
      title: 'Volume Traded',
    },
    {
      name: 'owners',
      type: 'array',
      title: 'Owners',
      of: [{type: 'reference', to: [{type: 'creator'}]}],
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
  ],
}

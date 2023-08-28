const getId = (item: { _id: string } | string) => {
  if (typeof item === 'string') return item;
  return item._id;
};

export default getId;

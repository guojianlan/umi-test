export default function (initialState: any) {
  console.log(initialState);
  const current_user = initialState?.current_user;

  return {
    canRead: false,
    canReadTest: true,
    canReadItem: false,
  };
}

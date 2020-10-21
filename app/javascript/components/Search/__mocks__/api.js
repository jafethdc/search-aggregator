export const search = jest.fn().mockReturnValue(
  Promise.resolve({
    data: [
      {
        title: 'Kendrick Lamar | Good Kid Maad City',
        description: 'Second Studio Album',
        url: 'https://en.wikipedia.org/wiki/Good_Kid,_M.A.A.D_City',
      },
    ],
  }),
)

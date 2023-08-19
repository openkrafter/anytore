import { rest } from 'msw'

export const handlers = [
  rest.get('/training-items', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          name: 'ランニング',
          type: 'aerobic', // aerobic, anaerobic
          unit: 'hour', // minute, hour, count, distance
          kcal: '150',
        },
        {
          name: 'プール',
          type: 'aerobic', // aerobic, anaerobic
          unit: 'minute', // minute, hour, count, distance
          kcal: '5',
        }
      )
    )
  }),
]

import { rest } from 'msw'

export const trainingItems = [
  // ListTraningItem
  rest.get('/training-items', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          id: 1,
          name: 'ランニング',
          type: 'aerobic', // aerobic, anaerobic
          unit: 'hour', // minute, hour, count, distance
          kcal: 150,
        },
        {
          id: 2,
          name: 'プール',
          type: 'aerobic', // aerobic, anaerobic
          unit: 'minute', // minute, hour, count, distance
          kcal: 5,
        }
      )
    )
  }),

  // CreateTraningItem
  rest.post('/training-items', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json())
  }),

  // GetTraningItem
  rest.get('/training-items/:training-item-id', (_req, res, ctx) => {
    const { trainingItemId } = req.params
    return res(
      ctx.status(200),
      ctx.json({
        id: trainingItemId,
        name: 'プール',
        type: 'aerobic', // aerobic, anaerobic
        unit: 'minute', // minute, hour, count, distance
        kcal: 5,
      })
    )
  }),
]

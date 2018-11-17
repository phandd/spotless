import { schema } from 'normalizr'

const trackSchema = new schema.Entity('track', {}, {
  idAttribute: track => track.id
})

export { trackSchema }

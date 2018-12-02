import { schema } from 'normalizr'

export const trackSchema = new schema.Entity('track', {}, {
  idAttribute: track => track.id
})

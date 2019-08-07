import React from 'react'
import { Typography } from '@material-ui/core'
import { t } from '../../utils/translate'

const NotFound = () => (
  <div className="card">
    <Typography color="primary" variant="h2">
      404
    </Typography>
    <Typography color="secondary" variant="h5">
      {t('notFound')}
    </Typography>
  </div>
)

export default NotFound

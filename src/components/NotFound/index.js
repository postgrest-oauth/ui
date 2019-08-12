import React from 'react'
import { Typography } from '@material-ui/core'
import withTranslation from '../../services/withTranslation'

const NotFound = props => {
  const { t } = props
  return (
    <div className="card">
      <Typography color="primary" variant="h2">
        404
      </Typography>
      <Typography color="secondary" variant="h5">
        {t('notFound')}
      </Typography>
    </div>
  )
}
export default withTranslation(NotFound)

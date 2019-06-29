import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Body from './Body'
import H1 from './H1'
import Text from './Text'
import Description from './Description'
import Span from '../../components/Span'
import Favorites from '../Favorites'
import Picture from '../../components/Picture'
import { moduleName, fetchCar } from '../../ducks/car'

function CarPage({ match, fetchCar, error, loading, data }) {
  const { stockNumber } = match.params
  const {
    mileage,
    fuelType,
    color,
    manufacturerName,
    modelName,
    pictureUrl
  } = data
  const fetchByStockNumber = useCallback(() => {
    fetchCar(stockNumber)
  }, [stockNumber, fetchCar])

  useEffect(() => {
    fetchByStockNumber()
  }, [fetchByStockNumber])

  if (error) {
    return <h1>{error.message}</h1>
  }
  if (loading || !Object.keys(data).length) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <div>
        <Picture lg url={pictureUrl} />
        <Body>
          <Description>
            <H1>
              {manufacturerName}-{modelName}
            </H1>
            <Span>
              stock # {stockNumber} - {mileage.number}&nbsp;
              <Span uppercase>{mileage.unit}</Span>
              &nbsp; - {fuelType}
              &nbsp;- {color}
            </Span>

            <Text>
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </Text>
          </Description>
          <Favorites />
        </Body>
      </div>
    </>
  )
}

CarPage.propTypes = {
  data: PropTypes.shape({
    stockNumber: PropTypes.number,
    manufacturerName: PropTypes.string,
    color: PropTypes.string,
    mileage: PropTypes.shape({
      number: PropTypes.number,
      unit: PropTypes.string
    }),
    fuelType: PropTypes.string,
    pictureUrl: PropTypes.string
  }),
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
}
export default connect(
  state => ({
    data: state[moduleName].data,
    loading: state[moduleName].loading,
    error: state[moduleName].error
  }),
  {
    fetchCar
  }
)(CarPage)

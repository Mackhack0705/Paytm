import PropTypes from 'prop-types';

const HeadingComponent = ({label}) => {
  return (
    <div className='font-bold text-4xl pt-6'>
        {label}
    </div>
  )
}

HeadingComponent.propTypes = {
  label: PropTypes.string
}

export default HeadingComponent
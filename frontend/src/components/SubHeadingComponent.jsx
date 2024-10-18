import PropTypes from 'prop-types';

const SubHeadingComponent = ({label}) => {
  return (
    <div className="text-slate-500 text-md pt-1 px-4 pb-4">{label}</div>
  )
}

SubHeadingComponent.propTypes = {
  label: PropTypes.string
}

export default SubHeadingComponent
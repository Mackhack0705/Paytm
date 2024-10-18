import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const BottomWarningComponent = ({label, buttonText, to}) => {
  return (
    <div className='py-2 text-sm flex justify-center mb-6'>
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>{buttonText}</Link>
    </div>
  )
}

BottomWarningComponent.propTypes = {
  label: PropTypes.string,
  buttonText: PropTypes.string,
  to: PropTypes.string
}

export default BottomWarningComponent
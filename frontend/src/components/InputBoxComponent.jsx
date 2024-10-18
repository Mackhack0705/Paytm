import PropTypes from 'prop-types';

const InputBoxComponent = ({register, name, label, placeholder}) => {
  return (
    <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input {...register(name)} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
  )
}

InputBoxComponent.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string
}

export default InputBoxComponent
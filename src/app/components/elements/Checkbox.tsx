interface Param {
 label: string
}

const Checkbox = ({ label }: Param) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
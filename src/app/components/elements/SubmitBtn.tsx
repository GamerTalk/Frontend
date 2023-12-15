interface Prpos {
  word: string
};

const SubmitButton = (props:Prpos) => { 
  const { word } = props;

  return (
    <button
      className="w-[82%] h-11 font-xl mt-8 bg-buttonBackground text-white rounded-xl shadow-sm border-1 border-white active:box-shadow-none active:bg-blue-600 "
      type="submit"
    >
      {word}
    </button>
  );
}

export default SubmitButton;
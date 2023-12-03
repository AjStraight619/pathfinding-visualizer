type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="sm:p-[0.1rem] md:p-[0.3rem] lg:p-[0.6rem]  bg-blue-400 rounded-md focus:scale-103 hover:scale-105 hover:bg-blue-500 active:scale-105 text-gray-50"
    >
      {children}
    </button>
  );
};

export default Button;

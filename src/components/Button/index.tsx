interface ButtonInterface {
  label: string;
  onClick?: () => void;
}

const Button = ({ label }: ButtonInterface) => {
  return <div>{label}</div>;
};

export default Button;

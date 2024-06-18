type Props = {
  onSubmit: () => void;
  children: JSX.Element | JSX.Element[];
};

const Form = ({ onSubmit, children }: Props) => {
  function preventEnterSubmit(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  return (
    <form onSubmit={onSubmit} onKeyDown={preventEnterSubmit}>
      {children}
    </form>
  );
};

export default Form;

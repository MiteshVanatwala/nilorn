type Props = {
  onSubmit: () => void;
  children: JSX.Element | JSX.Element[];
};

const Form = ({ onSubmit, children }: Props) => {
  function preventEnterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitButton = event.currentTarget.querySelector(
      'button[type="submit"]'
    );
    if (submitButton && document.activeElement === submitButton) {
      onSubmit();
    }
  }

  return <form onSubmit={preventEnterSubmit}>{children}</form>;
};

export default Form;

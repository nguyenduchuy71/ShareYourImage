interface IButton {
  typeButton: any;
  classNameValue: string;
  nameButton: string;
  action?: any;
  isDisabled?: boolean;
  isHidden?: boolean;
}

export const ButtonItem = ({
  typeButton,
  classNameValue,
  nameButton,
  action = null,
  isDisabled = false,
  isHidden = false,
}: IButton) => {
  return (
    !isHidden && (
      <button onClick={action} disabled={isDisabled} type={typeButton} className={classNameValue}>
        {nameButton}
      </button>
    )
  );
};

import styles from './error-message.module.css';

type Props = { message: string };

const ErrorMessage = ({ message }: Props) => (
  <div className={styles.message}>{message}</div>
);

export default ErrorMessage;

import '../types/apiErrorMessageTypes';
import styles from '../styles/ApiErrorMessage.module.css';

const ApiErrorMessage = (props: ApiErrorMessageProps) => {
  return (
    <article>
      <p className={styles.error}>
        That's embarrassing. There's a problem with the {props.apiName} API.
      </p>
    </article>
  );
};

export default ApiErrorMessage;
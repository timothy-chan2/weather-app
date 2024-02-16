import styles from '../styles/ApiErrorMessage.module.css';

type Props = {
  apiName: string
};

const ApiErrorMessage = (props: Props) => {
  return (
    <article>
      <p className={styles.error}>
        That's embarrassing. There's a problem with the {props.apiName} API.
      </p>
    </article>
  );
};

export default ApiErrorMessage;
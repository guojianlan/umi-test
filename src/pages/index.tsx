import styles from './index.less';
import { Link } from 'umi';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/permission">go to permission</Link>
      <Link to="/login">go to login</Link>
    </div>
  );
}

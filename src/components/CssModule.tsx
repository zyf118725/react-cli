import Card from 'antd/es/card/Card';
import styles from './cssModule.module.less';
export default function CssModule() {
  return (
    <Card>
      <div className={styles.tbox}>CssModule</div>
    </Card>
  );
}

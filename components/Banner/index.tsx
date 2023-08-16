import Image, { StaticImageData } from "next/image";
import classNames from 'classnames';
import styles from './index.module.scss';
import { useEffect, useState } from "react";

interface IProps {
  data: { title: string; image: StaticImageData }[]
}

const Banner = (props: IProps) => {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex < data.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, data]);
  return <div className={styles.bannerContent}>
    {data.map((item, index) => <div className={classNames({
      [styles.bannerItem]: true,
      [styles.active]: activeIndex === index
    })} key={item.title}>
      <Image layout="fixed" className={styles.bannerImage} alt="" src={item.image} />
    </div>)}
    <div className={styles.bannerDot}>
      {data.map((_, index) => <i key={index} className={classNames({
        [styles.dotIcon]: true,
        [styles.active]: activeIndex === index
      })}></i>)}
    </div>
  </div>
}

export default Banner;

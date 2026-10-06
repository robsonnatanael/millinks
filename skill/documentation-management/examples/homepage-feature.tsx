import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      message: 'Feature Title',
      id: 'features.myfeature.title',
    }),
    image: require('@site/static/img/myfeature.png').default,
    description: (
      <Translate id="features.myfeature.description">
        Feature description with support for JSX and i18n components.
      </Translate>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

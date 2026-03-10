import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({message: 'Centralize your links', id: 'features.centralize.title'}),
    image: require('@site/static/img/centralize.png').default,
    description: (
      <Translate id="features.centralize.description">
        Connect your audience through a single, shared link on social media. 
        Perfect for biografies, portfolios and personal pages.
      </Translate>
    ),
  },
  {
    title: translate({message: 'Modern Architecture', id: 'features.architecture.title'}),
    image: require('@site/static/img/architecture.png').default,
    description: (
      <Translate id="features.architecture.description">
        Built with Next.js, TypeScript, and Material UI, ensuring performance 
        and a great developer experience.
      </Translate>
    ),
  },
  {
    title: translate({message: 'Docker Ready', id: 'features.docker.title'}),
    image: require('@site/static/img/docker.png').default,
    description: (
      <Translate id="features.docker.description">
        Easily deployable using Docker. Includes pre-configured Dockerfile 
        and Compose for productive environments.
      </Translate>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
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

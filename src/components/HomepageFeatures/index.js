import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>Machnet is designed to be developer-friendly, offering an easy-to-use
      API and pre-configured tools that simplify the setup for high-performance
      networking applications. Its core focus is on reducing complexity while
      providing robust, low-latency communication for distributed systems,
      making it accessible even for developers without extensive experience in
      high-performance networking.</> 
    ),
  },
  {
    title: 'Blazingly fast',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
      Machnet provides applications like databases and finance an easy way to
      access low-latency DPDK-based messaging on public cloud VMs. 750K RPS on
      Azure at 61 us P99.9.
      </>
    ),
  },
  {
    title: 'Test a drive!',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      You have a go! Enjoy!
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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

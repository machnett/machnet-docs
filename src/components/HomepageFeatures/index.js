import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy_to_use.svg').default,
    description: (
      <>Machnet is built with simplicity in mind. It offers a clean,
      developer-friendly API and ready-to-use tools that streamline setup for
      high-performance networking. Whether you're building distributed systems
      or data pipelines, Machnet reduces complexity—so even developers new to
      low-latency networking can get started quickly.</> 
    ),
  },
  {
    title: 'Blazingly fast',
    Svg: require('@site/static/img/blazingly-fast.svg').default,
    description: (
      <> Machnet delivers exceptional performance out of the box. It enables
      applications like databases and trading systems to achieve ultra-low
      latency with DPDK-based messaging on public cloud VMs. Benchmark results:
      750K requests per second with a 61μs P99.9 latency on Azure.  </>
    ),
  },
  {
    title: 'Test a drive!',
    Svg: require('@site/static/img/test-a-drive.svg').default,
    description: (
      <> Get hands-on with Machnet in seconds. Launch the dashboard, configure
      your environment, and start sending real traffic. Whether you're testing
      speed, control, or just exploring, the Test Drive puts the power of
      Machnet in your hands—no setup headaches, just results.</>
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

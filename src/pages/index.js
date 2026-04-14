import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HeroSection() {
  return (
    <header className="hero-machnet">
      <div className="container">
        <Heading as="h1" className="hero__title">
          Sub-100&micro;s Messaging<br />for Cloud Applications
        </Heading>
        <p className="hero__subtitle">
          Machnet is an open-source, DPDK-based networking stack that gives your
          distributed applications kernel-bypass performance on public cloud VMs
          — with zero DPDK expertise required.
        </p>
        <div className="hero-buttons">
          <Link className="button button--lg button--primary-cta" to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--lg button--outline-cta"
            to="https://github.com/microsoft/machnet">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsBar() {
  const stats = [
    { value: '750K', label: 'Requests / sec' },
    { value: '61\u00B5s', label: 'P99.9 Latency' },
    { value: '1KB', label: 'Message Size' },
    { value: '3+', label: 'Cloud Providers' },
  ];
  return (
    <section className="stats-bar">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyMachnet() {
  const features = [
    {
      icon: '\u26A1',
      title: 'Ultra-Low Latency',
      desc: 'Achieve sub-100\u00B5s tail latency with DPDK kernel-bypass. No kernel overhead, no context switches \u2014 just raw speed for your critical path.',
    },
    {
      icon: '\uD83D\uDD27',
      title: 'Zero DPDK Expertise Needed',
      desc: 'Use a simple sockets-like API. No need to compile your application with DPDK or understand PMDs, mbufs, or ring buffers.',
    },
    {
      icon: '\u2601\uFE0F',
      title: 'Built for Public Cloud',
      desc: 'Tested and optimized for Azure, AWS, and GCP VMs. Works with cloud-native NICs out of the box \u2014 no bare metal required.',
    },
    {
      icon: '\uD83D\uDCE6',
      title: 'Run as a Sidecar',
      desc: 'Machnet runs as a separate process and mediates NIC access. Multiple applications on the same machine can share one Machnet instance.',
    },
    {
      icon: '\uD83D\uDC33',
      title: 'Docker-Ready',
      desc: 'Pull our pre-built Docker image and start benchmarking in minutes. No custom kernel modules, no complex build chains.',
    },
    {
      icon: '\uD83D\uDCCA',
      title: 'Production Benchmarks',
      desc: '750K RPC/s at 61\u00B5s P99.9 on Azure F8s_v2. Over 1M RPC/s on bare metal. Every claim is backed by reproducible benchmarks.',
    },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <h2>Why Machnet?</h2>
          <p>
            Traditional kernel networking adds milliseconds of latency. Machnet
            removes the kernel from the data path so your applications can
            communicate at wire speed.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Start Machnet',
      desc: 'Launch the Machnet Docker container on each VM. It binds to a dedicated NIC and manages all DPDK operations.',
    },
    {
      num: '2',
      title: 'Connect Your App',
      desc: 'Use the lightweight C API to attach to Machnet via shared memory. No DPDK linking or recompilation needed.',
    },
    {
      num: '3',
      title: 'Send Messages',
      desc: 'Call machnet_send() and machnet_recv(). Machnet handles all the kernel-bypass magic under the hood.',
    },
  ];
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section__header">
          <h2>How It Works</h2>
          <p>
            Machnet acts as a userspace networking sidecar. Your application
            talks to it over shared memory; it talks to the network over DPDK.
          </p>
        </div>
        <div className="how-it-works-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeShowcase() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <h2>Simple, Familiar API</h2>
          <p>
            If you can use sockets, you can use Machnet. Five function calls is
            all it takes.
          </p>
        </div>
        <div className="code-showcase">
          <div className="code-showcase__header">
            <span className="code-showcase__dot code-showcase__dot--red" />
            <span className="code-showcase__dot code-showcase__dot--yellow" />
            <span className="code-showcase__dot code-showcase__dot--green" />
          </div>
          <div className="code-showcase__body">
            <pre>{
`// Initialize and attach to Machnet
machnet_init();
MachnetChannelCtx_t *ctx = machnet_attach();

// Listen for incoming connections
machnet_listen(ctx, local_ip, port);

// Connect to a remote Machnet peer
MachnetFlow_t flow;
machnet_connect(ctx, local_ip, remote_ip, port, &flow);

// Send and receive messages
machnet_send(ctx, flow, buf, len, &msg_id);
machnet_recv(ctx, buf, buf_size, &flow);`
            }</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section__header">
          <h2>Architecture</h2>
          <p>
            Machnet decouples your application from DPDK. It runs as a separate
            process and multiplexes NIC access for all local applications.
          </p>
        </div>
        <div className="architecture-block">
          <pre>{
`  +-------------+   +-------------+   +-------------+
  |   App A      |   |   App B      |   |   App C      |
  +------+-------+   +------+-------+   +------+-------+
         |                   |                   |
         |  Shared Memory    |  Shared Memory    |  Shared Memory
         |  (sockets-like)   |  (sockets-like)   |  (sockets-like)
         v                   v                   v
  +------------------------------------------------------+
  |                  Machnet Process                      |
  |                                                      |
  |   Channel Mgr  |  Flow Mgr  |  Packet Engine         |
  +------------------------------------------------------+
         |
         |  DPDK (kernel-bypass)
         v
  +------------------------------------------------------+
  |                   NIC (SmartNIC / Cloud NIC)          |
  +------------------------------------------------------+`
          }</pre>
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  const platforms = [
    { name: 'Azure', detail: 'F8s_v2, CX4-Lx' },
    { name: 'AWS', detail: 'c5.xlarge, ENA' },
    { name: 'GCP', detail: 'gVNIC' },
    { name: 'Bare Metal', detail: 'E810, Bluefield-2, CX5/6' },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <h2>Runs Everywhere You Deploy</h2>
          <p>
            Tested across major cloud providers and bare-metal hardware with a
            variety of NICs and DPDK drivers.
          </p>
        </div>
        <div className="platforms-row">
          {platforms.map((p, i) => (
            <div className="platform-badge" key={i}>
              <strong>{p.name}</strong>
              <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>{p.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Ready to Eliminate Kernel Latency?</h2>
        <p>
          Get started with Machnet in minutes. Pull the Docker image, follow the
          tutorial, and see sub-100&micro;s latency for yourself.
        </p>
        <div className="cta-buttons">
          <Link className="button button--lg button--primary-cta" to="/docs/tutorial-basics/machnet-intro">
            Quick Start Guide
          </Link>
          <Link
            className="button button--lg button--outline-cta"
            to="https://arxiv.org/abs/2502.09281">
            Read the White Paper
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="High-Performance Kernel-Bypass Messaging"
      description="Machnet provides sub-100 microsecond latency messaging for distributed cloud applications using DPDK kernel-bypass. Open source, Docker-ready, no DPDK expertise required.">
      <HeroSection />
      <StatsBar />
      <WhyMachnet />
      <HowItWorks />
      <CodeShowcase />
      <Architecture />
      <Platforms />
      <CTASection />
    </Layout>
  );
}

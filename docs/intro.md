---
sidebar_label: 'Machnet: Intro'
sidebar_position: 1
---

# Introduction

## Machnet: Easy kernel-bypass messaging between cloud VMs

[![Build](https://github.com/microsoft/machnet/actions/workflows/build.yml/badge.svg?event=push)](https://github.com/microsoft/machnet)

Machnet provides an easy way for applications to reduce their datacenter
networking latency via kernel-bypass (DPDK-based) messaging. Distributed
applications like databases and finance can use Machnet as the networking
library to get sub-100 microsecond tail latency at high message rates, e.g.,
**750,000 1KB request-reply messages per second on Azure F8s_v2 VMs with 61
microsecond P99.9 round-trip latency**. We support a variety of cloud (Azure,
AWS, GCP) and bare-metal platforms, OSs and NICs, evaluated in
[docs/PERFORMANCE_REPORT.md](docs/performance_report.md).

While there are several other DPDK-based network stacks, Machnet provides the
following unique benefits:

- Specifically designed for and tested on public cloud VM environments
- Multiple applications on the same machine can use Machnet
- No need for DPDK expertise, or compiling the application with DPDK

**Architecture**: Machnet runs as a separate process on all machines where the
application is deployed and mediates access to the DPDK NIC. Applications
interact with Machnet over shared memory with a sockets-like API. Machnet
processes in the cluster communicate with each other using DPDK.
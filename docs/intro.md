---
sidebar_label: 'Overview'
sidebar_position: 1
slug: /intro
---

# What is Machnet?

**Machnet** is an open-source, DPDK-based networking stack that provides
kernel-bypass messaging between cloud VMs. It enables distributed applications
like databases, trading systems, and data pipelines to achieve **sub-100
microsecond tail latency** at high message rates — without requiring any DPDK
expertise.

[![Build](https://github.com/microsoft/machnet/actions/workflows/build.yml/badge.svg?event=push)](https://github.com/microsoft/machnet)

## Key Results

| Metric | Value |
|---|---|
| Throughput | **750,000 req/s** (1KB messages) |
| P99.9 Latency | **61 microseconds** |
| Platform | Azure F8s_v2 VMs |

## Why Machnet?

Traditional kernel networking stacks add milliseconds of overhead through
context switches, buffer copies, and interrupt handling. DPDK bypasses the
kernel entirely, but requires deep expertise and forces applications to link
against complex libraries.

**Machnet solves this by running as a sidecar process:**

- **No DPDK expertise needed.** Use a simple C API (`machnet_send`, `machnet_recv`) — no need to learn PMDs, mbufs, or ring buffers.
- **No recompilation.** Your application communicates with Machnet over shared memory, not DPDK libraries.
- **Multi-tenant.** Multiple applications on the same machine can share a single Machnet instance and NIC.
- **Cloud-native.** Designed for and tested on public cloud VMs (Azure, AWS, GCP), not just bare metal.

## Architecture

Machnet runs as a separate process on each machine. Applications attach to it
over shared memory using a sockets-like API. Machnet processes across machines
communicate via DPDK.

```
+-------------+   +-------------+   +-------------+
|   App A      |   |   App B      |   |   App C      |
+------+-------+   +------+-------+   +------+-------+
       |                   |                   |
       |  Shared Memory    |  Shared Memory    |  Shared Memory
       v                   v                   v
+------------------------------------------------------+
|                  Machnet Process                      |
|   Channel Mgr  |  Flow Mgr  |  Packet Engine         |
+------------------------------------------------------+
       |
       |  DPDK (kernel-bypass)
       v
+------------------------------------------------------+
|                   NIC (Cloud or SmartNIC)             |
+------------------------------------------------------+
```

## Supported Platforms

| Cloud / Hardware | NIC | DPDK Driver |
|---|---|---|
| Azure F8s_v2 | ConnectX-4 Lx | netvsc |
| AWS c5.xlarge | ENA | ena |
| GCP | gVNIC | gvnic |
| Bare metal | Intel E810 | ice / iavf |
| Bare metal | Bluefield-2 | mlx5 |
| Bare metal | ConnectX-5/6 | mlx5 |

## Next Steps

- **[Quick Start Guide](tutorial-basics/machnet-intro)** — Set up two VMs and send your first message in 5 minutes.
- **[API Reference](api-reference)** — Full documentation of the Machnet C API.
- **[Performance Report](performance-report)** — Detailed benchmarks across platforms.
- **[Contributing](contributing)** — How to contribute to the project.

## White Paper

For the full research context, read our paper on arXiv:
[Machnet: Easy Kernel-Bypass Messaging Between Cloud VMs](https://arxiv.org/abs/2502.09281).

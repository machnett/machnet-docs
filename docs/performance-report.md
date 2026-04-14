---
sidebar_label: 'Performance Report'
sidebar_position: 4
---

# Performance Report

All benchmarks use the `msg_gen` request-response benchmark with 1KB messages.
A client sends requests to a server, which replies immediately. The client
controls the number of messages in flight for pipelining.

:::caution
Performance varies significantly across cloud VM pairs even within the same
provider. Compare results across platforms with caution.
:::

---

## Benchmark Setup

Start the Machnet Docker container on both client and server:

```bash
# Server
./machnet.sh --mac <server_MAC> --ip <server_IP>

# Client
./machnet.sh --mac <client_MAC> --ip <client_IP>
```

Run `msg_gen`:

```bash
MSG_GEN="docker run -v /var/run/machnet:/var/run/machnet \
  ghcr.io/microsoft/machnet/machnet:latest \
  release_build/src/apps/msg_gen/msg_gen"

# Server
${MSG_GEN} --local_ip <server_IP> --msg_size 1024

# Client: Latency test (1 message in flight)
${MSG_GEN} --local_ip <client_IP> --remote_ip <server_IP> \
  --msg_window 1 --tx_msg_size 1024

# Client: Throughput test (32 messages in flight)
${MSG_GEN} --local_ip <client_IP> --remote_ip <server_IP> \
  --msg_window 32 --tx_msg_size 1024
```

---

## Results: Cloud VMs

| Platform | NIC / Driver | Test | P50 | P99 | P99.9 | RPC/s |
|---|---|---|---|---|---|---|
| **Azure F8s_v2** | CX4-Lx, netvsc | Latency | 18 us | 19 us | 25 us | 54K |
| | | Throughput | 41 us | 54 us | **61 us** | **753K** |
| **AWS c5.xlarge** | ENA, ena | Latency | 42 us | 66 us | 105 us | 22K |
| | | Throughput | 61 us | 132 us | 209 us | 122K |

*Azure VMs tested without proximity placement groups. AWS VMs tested with
proximity groups and `--msg_window 8`.*

---

## Results: Bare Metal

| Hardware | NIC / Driver | Test | P50 | P99 | P99.9 | RPC/s |
|---|---|---|---|---|---|---|
| **Intel E810 PF** | ice | Latency | 18 us | 21 us | 22 us | 55K |
| Mariner 2.0 | | Throughput | 30 us | 33 us | 37 us | **1,043K** |
| **Intel E810 VF** | iavf | Latency | 18 us | 22 us | 22 us | 55K |
| Mariner 2.0 | | Throughput | 31 us | 35 us | 41 us | **1,003K** |
| **Bluefield-2** | mlx5 | Latency | 9 us | 12 us | 13 us | 99K |
| Ubuntu 22.04 | | Throughput | 24 us | 26 us | **28 us** | **1,320K** |

---

## Highlights

- **750K+ RPC/s** on a single Azure VM pair with 61 us P99.9
- **1.3M+ RPC/s** on bare metal with Bluefield-2 at 28 us P99.9
- **9 us P50 latency** on Bluefield-2 — approaching hardware limits
- Single-message latency consistently under 25 us on all platforms

---

## Reproduce These Results

All benchmarks can be reproduced using the `msg_gen` tool included in the Docker
image. See the [Quick Start Guide](/docs/tutorial-basics/machnet-intro) for
setup instructions.

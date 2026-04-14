---
sidebar_label: 'Quick Start'
sidebar_position: 2
---

# Quick Start Guide

Get Machnet running between two cloud VMs and send your first message. This
guide uses Azure as an example, but the steps are similar for AWS and GCP.

## Prerequisites

- Two cloud VMs with accelerated networking (e.g., Azure F8s_v2)
- Docker installed on both VMs
- A GitHub account (for pulling the Docker image)

---

## Step 1: Set Up Two VMs with Two NICs

Machnet requires a **dedicated NIC** on each machine. This NIC is exclusively
managed by Machnet via DPDK; your regular SSH and management traffic stays on
the primary NIC.

**On Azure:**

1. Create two VMs with accelerated networking enabled. Each VM starts with one
   NIC (`eth0`) — this NIC is **never** used by Machnet.
2. Shut down the VMs.
3. Create two new accelerated NICs (no public IPs) and attach one to each VM.
4. Restart the VMs. Each should now have an additional NIC named `eth1`.

:::tip
The `examples` directory in the Machnet repository contains detailed
scripts and instructions for launching VMs on each cloud provider.
:::

---

## Step 2: Pull the Docker Image

The pre-built Machnet Docker image is hosted on GitHub Container Registry.

1. Generate a [GitHub personal access token](https://github.com/settings/tokens)
   with the `read:packages` scope.
2. If using a GitHub org with SSO, configure SSO for the token.

```bash
# Install dependencies
sudo apt-get update
sudo apt-get install -y docker.io net-tools driverctl uuid-dev

# Allow non-root Docker usage
sudo usermod -aG docker $USER && sudo reboot

# Log in and pull the image
echo ${GITHUB_PAT} | docker login ghcr.io -u <github_username> --password-stdin
docker pull ghcr.io/microsoft/machnet/machnet:latest
```

---

## Step 3: Start the Machnet Process

Before this step, **note down the IP and MAC address** of `eth1` — the NIC will
be unbound from the OS and will disappear from tools like `ifconfig`.

```bash
# Record NIC info
MACHNET_IP_ADDR=$(ifconfig eth1 | grep -w inet | tr -s " " | cut -d' ' -f 3)
MACHNET_MAC_ADDR=$(ifconfig eth1 | grep -w ether | tr -s " " | cut -d' ' -f 3)
```

**Unbind the NIC (Azure):**

```bash
sudo modprobe uio_hv_generic
DEV_UUID=$(basename $(readlink /sys/class/net/eth1/device))
sudo driverctl -b vmbus set-override $DEV_UUID uio_hv_generic
```

**Unbind the NIC (other platforms):**

```bash
sudo <dpdk_dir>/usertools/dpdk-devbind.py --bind=vfio-pci <PCIe_address>
```

**Start Machnet on both VMs:**

```bash
git clone --recursive https://github.com/microsoft/machnet.git
cd machnet
./machnet.sh --mac $MACHNET_MAC_ADDR --ip $MACHNET_IP_ADDR
```

:::info
If you lose the NIC info, Azure's metadata service can help:
```bash
curl -s -H Metadata:true --noproxy "*" \
  "http://169.254.169.254/metadata/instance?api-version=2021-02-01" \
  | jq '.network.interface[1]'
```
:::

---

## Step 4: Run Hello World

With Machnet running on both VMs, test end-to-end connectivity:

```bash
# Build the helper library and example (on both VMs)
./build_shim.sh
cd examples

# VM 1: Start the server
./hello_world --local <eth1_IP_of_VM1>

# VM 2: Start the client — this prints the server's reply
./hello_world --local <eth1_IP_of_VM2> --remote <eth1_IP_of_VM1>
```

---

## Step 5: Run the Benchmark

The Docker image includes the `msg_gen` benchmark for measuring throughput and
latency:

```bash
MSG_GEN="docker run -v /var/run/machnet:/var/run/machnet \
  ghcr.io/microsoft/machnet/machnet:latest \
  release_build/src/apps/msg_gen/msg_gen"

# VM 1: Server
${MSG_GEN} --local_ip <eth1_IP_of_VM1>

# VM 2: Client (latency test — 1 message in flight)
${MSG_GEN} --local_ip <eth1_IP_of_VM2> \
  --remote_ip <eth1_IP_of_VM1> --msg_window 1 --tx_msg_size 1024

# VM 2: Client (throughput test — 32 messages in flight)
${MSG_GEN} --local_ip <eth1_IP_of_VM2> \
  --remote_ip <eth1_IP_of_VM1> --msg_window 32 --tx_msg_size 1024
```

The client prints message rate and latency percentile statistics. Run
`msg_gen --help` for all available options.

:::tip Building from source
You can also build `msg_gen` from source without DPDK or rdma_core:
```bash
cd machnet
rm -rf build && mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release .. && make -j
```
:::

---

## Next Steps

- **[API Reference](/docs/api-reference)** — Learn the full Machnet C API.
- **[Performance Report](/docs/performance-report)** — See benchmarks across cloud providers and hardware.
- **[Contributing](/docs/contributing)** — Help improve Machnet.

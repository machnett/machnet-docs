---
sidebar_label: 'API Reference'
sidebar_position: 3
---

# Machnet API Reference

Machnet exposes a simple C API defined in
[`src/ext/machnet.h`](https://github.com/microsoft/machnet/blob/main/src/ext/machnet.h).
Applications interact with the Machnet sidecar process over shared memory using
the functions below.

---

## Lifecycle

### `machnet_init()`

Initialize the Machnet client library. Must be called once before any other
Machnet function.

```c
int machnet_init(void);
```

**Returns:** `0` on success, `-1` on failure.

---

### `machnet_attach()`

Create a new shared-memory channel to the Machnet process. Each application
thread should call this to get its own channel context.

```c
MachnetChannelCtx_t *machnet_attach(void);
```

**Returns:** Pointer to the channel context, or `NULL` on failure.

---

## Connection Management

### `machnet_listen()`

Listen for incoming connections on a given IP and port.

```c
int machnet_listen(MachnetChannelCtx_t *ctx,
                   const char *local_ip,
                   uint16_t port);
```

| Parameter | Description |
|---|---|
| `ctx` | Channel context from `machnet_attach()` |
| `local_ip` | Local IP address of the Machnet NIC |
| `port` | Port number to listen on |

**Returns:** `0` on success, `-1` on failure.

---

### `machnet_connect()`

Establish a connection (flow) to a remote Machnet peer.

```c
int machnet_connect(MachnetChannelCtx_t *ctx,
                    const char *local_ip,
                    const char *remote_ip,
                    uint16_t remote_port,
                    MachnetFlow_t *flow);
```

| Parameter | Description |
|---|---|
| `ctx` | Channel context from `machnet_attach()` |
| `local_ip` | Local IP address of the Machnet NIC |
| `remote_ip` | IP address of the remote Machnet peer |
| `remote_port` | Port on the remote peer |
| `flow` | Output: flow handle for sending/receiving |

**Returns:** `0` on success, `-1` on failure.

---

## Messaging

### `machnet_send()`

Send a message to a connected remote peer.

```c
int machnet_send(MachnetChannelCtx_t *ctx,
                 MachnetFlow_t flow,
                 const void *buf,
                 size_t len,
                 MachnetMsgId_t *msg_id);
```

| Parameter | Description |
|---|---|
| `ctx` | Channel context |
| `flow` | Flow handle from `machnet_connect()` |
| `buf` | Pointer to the message buffer |
| `len` | Length of the message in bytes |
| `msg_id` | Output: unique message identifier |

**Returns:** `0` on success, `-1` on failure.

---

### `machnet_recv()`

Receive a message from any connected peer.

```c
int machnet_recv(MachnetChannelCtx_t *ctx,
                 void *buf,
                 size_t buf_size,
                 MachnetFlow_t *flow);
```

| Parameter | Description |
|---|---|
| `ctx` | Channel context |
| `buf` | Buffer to receive the message into |
| `buf_size` | Size of the receive buffer |
| `flow` | Output: flow handle identifying the sender |

**Returns:** Number of bytes received, or `-1` on failure.

---

## Typical Usage Pattern

```c
#include "machnet.h"

int main() {
    // 1. Initialize
    machnet_init();
    MachnetChannelCtx_t *ctx = machnet_attach();

    // 2. Server: listen for connections
    machnet_listen(ctx, "10.0.1.5", 5000);

    // 3. Client: connect to server
    MachnetFlow_t flow;
    machnet_connect(ctx, "10.0.1.6", "10.0.1.5", 5000, &flow);

    // 4. Send a message
    const char *msg = "Hello, Machnet!";
    MachnetMsgId_t id;
    machnet_send(ctx, flow, msg, strlen(msg), &id);

    // 5. Receive a reply
    char buf[1024];
    MachnetFlow_t sender;
    int n = machnet_recv(ctx, buf, sizeof(buf), &sender);

    return 0;
}
```

---

## Building with Machnet

Applications link against the Machnet shim library, **not** DPDK. Build the
shim with:

```bash
cd machnet
./build_shim.sh
```

Then link your application against the resulting shared library. See the
`examples/` directory for complete build examples.

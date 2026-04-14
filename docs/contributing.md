---
sidebar_label: 'Contributing'
sidebar_position: 5
---

# Contributing to Machnet

We welcome contributions! Machnet follows
[Google's C++ Style Guide](https://google.github.io/styleguide/cppguide.html).

## Development Setup

```bash
# Install linting and formatting tools
sudo apt install clang-format cppcheck  # or equivalent for your OS
pip install pre-commit

# Set up pre-commit hooks
cd machnet
pre-commit install
```

## Building from Source

```bash
git clone --recursive https://github.com/microsoft/machnet.git
cd machnet
rm -rf build && mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make -j
```

## Submitting Changes

1. Fork the repository and create a feature branch.
2. Make your changes, ensuring all pre-commit hooks pass.
3. Write clear commit messages describing what and why.
4. Open a pull request against `main`.

## Reporting Issues

Open an issue on [GitHub](https://github.com/microsoft/machnet/issues) with:

- A clear description of the problem
- Steps to reproduce
- Platform details (cloud provider, VM type, OS, NIC)
- Any relevant logs or error messages

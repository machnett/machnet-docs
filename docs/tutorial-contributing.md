---
sidebar_label: 'Machnet: Open source contribution'
sidebar_position: 4
---


# Contributing

The codebase follows [Google's C++
standard](https://google.github.io/styleguide/cppguide.html).

Some tools are required for linting, checking, and code formatting:

```bash
sudo apt install clang-format cppcheck # Or equivalent for your OS
pip install pre-commit
cd ${REPOROOT}
pre-commit install
```

For instructions on how to build and test Machnet, see [README.md](README.md).
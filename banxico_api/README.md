Banxico
==============================

__Version:__ 0.0.0

Banxico S

## Getting up and running

Minimum requirements: **pip, python3.7, redis & [MySQL 5.17.36][install-mysql]**, setup is tested on Ubuntu 20.04 only.

```
sudo apt-get install python3 mysql-client
```

[install-mysql]: https://www.configserverfirewall.com/ubuntu-linux/ubuntu-install-mysql-client/

In your terminal, type or copy-paste the following:

    cd banxico_api; make install

Useful commands:

- `make run` - start [django server](http://localhost:8000/)
- `make deploy_docs` - deploy docs to server
- `make test` - run the test locally with ipdb

**NOTE:** Checkout `Makefile` for all the options available and how they do it.


## Contributing

Golden Rule:

> Anything in **master** is always **deployable for production**.
> Anything in **develop** is always **deployable for stage**.

Avoid working on `develop` branch, create a new branch with meaningful name, send pull request ASAP.

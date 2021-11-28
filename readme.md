## Goal

The main goal of this project is to explore the log distributing solution `Fluentd` and possible benefits in managing logs by using Docker + `Fluentd` plugin.

## Concept

A docker container runs a simple http server (Nodejs + Fastify). Docker's stdout stream pipes into `Fuentd` stdin stream.

Whenever user calls API endpoint it will print JSON string into `stdout`. The data from Docker's `stdout` will be sent to Fluentd's `stdin` and processed according Fluentd config file `default.conf`.


## Configuration

----

**Build api container**

```sh
docker build -t agent:1.0 .
```

**Run API container**

```sh
docker run \
  --name agent \
  --init \
  --rm --network=bridge \
  --log-driver=fluentd \
  --log-opt tag="{{.ImageName}}/{{.Name}}/{{.ID}}" \
  -p3000:3000 \
  --memory 512m \
  --volume `pwd`/src:/home/node/src \
  agent:1.0
```

**API Spec**

```sh
curl -XPOST -d`{}` http://localhost/api/
```


**Fluentd**

The fluentd logging driver sends container logs to the Fluentd collector as structured log data.
Developer can use any of the various output [plugins](https://www.fluentd.org/plugins) of Fluentd to write these logs to various destinations.

In addition to the log message itself, the fluentd log driver sends the following metadata in the structured log message:

- container_id
- container_name
- source
- log

For example, to provide a bespoke config and make fluentd verbose, then

**Example of running a container using fluentd logging pluging:**

```sh
docker run \
  -it --rm --network=bridge \
  -p 24224:24224/tcp \
  -p 24224:24224/udp \
  -v `pwd`/fluentd/etc:/fluentd/etc \
  -e FLUENTD_CONF=default.conf \
  --memory 512m \
  fluent/custom:latest
```

> Note. There is a possibility to make `fluend` a default log driver for the docker. [Read more](https://docs.docker.com/config/containers/logging/fluentd/#usage)

**Customise tag**

When running applications in Docker you probably want to modify `tag` option to hame move visibility on the log source.

If you wish to change the tag output value set the following option to a specific container:

```sh
--log-opt tag="{{.ImageName}}/{{.Name}}/{{.ID}}"
```

This format will print something like that `fastify/fluentd:0.4/api/cbb0b8186c6d` as the result.

> Note: In order for `fluentd` to match this tag we need to modify `match` section. Set `<match **>` to capture everything, or provide an explicite format. Example: `<match */*:*.*>` to match `fastify/fluentd:0.4/api/f6ef04266249` value

```
<match **>
  @type stdout
</match>
```


Read more: [Customize log driver output](https://docs.docker.com/config/containers/logging/log_tags/)


- Subscribe to S3, pull JSON string and put them throw filters
- `RegexFilter` - filters out none mathing results

```sh
node ./bin/subscribe --aws --sns
```

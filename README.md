# django-redis-blog
Simple Blog API created with Django with Redis Caching.

# Setup
- Install [Poetry](https://poetry.eustace.io/docs/).
- Install [Docker](https://docs.docker.com/install/).
- Clone this repository.
```shell
$ git clone https://github.com/shakib609/django-redis-blog.git
```
- Install the dependendencies.
```shell
$ cd backend
$ poetry install
```
- Migrate Database.
```shell
$ cd backend
$ poetry run python manage.py migrate
```
- Start up a redis instance with **Docker**
```shell
# The below command might be different based on your system
$ sudo systemctl start docker
# You might need to give sudo permissions to docker
$ [sudo] docker run -p 6379:6379 redis:latest
```
- Run Django Server
```shell
$ cd backend
$ poetry run python manage.py runserver
```


P.S. For Testing purposes you should turn off the `DEBUG` setting.

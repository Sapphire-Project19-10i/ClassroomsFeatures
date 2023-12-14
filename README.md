# Classroom Features: Group 10i 
## Final Documentation Part 2
### Tasks 
- [x] Update the database and STRAPI dump files in your file directory
- [x] Update ReadMe

### List of all project features implemented and associated screenshots of features developed
Feature 1: Discussion Board Creation/Management
![](https://cdn.discordapp.com/attachments/1162461689489404026/1184704218439876718/image.png?ex=658cf0c8&is=657a7bc8&hm=ab288e2224b5c382786a13c8575bac38c20bf4373c8cd876851f65c592444043&)
![](https://cdn.discordapp.com/attachments/1162461689489404026/1184704294356791316/image.png?ex=658cf0da&is=657a7bda&hm=e0392a1a474b16c7131d572cfd1a5451ce7db478d564ca0a0a247e0604f8d8fd&)

Feature 2: Syllabus
![](https://cdn.discordapp.com/attachments/1162461689489404026/1184704360089911376/image.png?ex=658cf0ea&is=657a7bea&hm=684978b99931436778fc69fdc01fd1310cc0c567db1f96448042ef4a24f6a448&)
![](https://cdn.discordapp.com/attachments/1162461689489404026/1184704464838475867/image.png?ex=658cf103&is=657a7c03&hm=bf4f9490ff08e6d53822032ce44a2a2aac12e91ab9f298a2889cfb44756e0095&)
![](https://cdn.discordapp.com/attachments/1162461689489404026/1184704537957769258/image.png?ex=658cf114&is=657a7c14&hm=9d619b1ba3c50be6c69c6d2b831fffce6754964809d2c2a71ffb8e80bb00d558&)

Feature 3: Lesson Creator/Editor
![](https://cdn.discordapp.com/attachments/1162461689489404026/1184704607792943224/image.png?ex=658cf125&is=657a7c25&hm=c5ba9c9d3168332eda44c99c51a3f4a6ca4f1b06422fdc165f68da452296661c&)
![](https://cdn.discordapp.com/attachments/1162461689489404026/1184704683122626641/image.png?ex=658cf137&is=657a7c37&hm=d02c198281002f6342edb3578b8e98b68d465a4f277f444d46a97b21e7534527&)

### Instructions for how to run the project locally 
```
git clone https://github.com/Sapphire-Project19-10i/ClassroomsFeatures.git
cd ClassroomFeatures
```
Follow the [client](/client#setup) setup
```
cd client
yarn start
```
Install [docker](https://docs.docker.com/get-docker/)
From a new terminal in the /ClassroomFeatures directory run
```
docker compose up
```
  
### Built Upon
#### [Draft.js](https://draftjs.org/)
- Helped us to build the rich text editor 

<br/>

# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit
